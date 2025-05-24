// Archivo: src/pages/ChatFree.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import openai from '../openaiClient';
import { avatarsFree } from '../utils/avatarsFree';
import { supabase } from '../supabase';

export default function ChatFree() {
  const { avatar } = useParams();
  const navigate = useNavigate();
  const config = avatarsFree[avatar];

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/auth');
    });
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    const context = [
      { role: 'system', content: config.prompt },
      ...updatedMessages.map((m) => ({
        role: m.role === 'avatar' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: context,
      });

      const botReply = response.choices[0].message.content;
      setMessages([...updatedMessages, { role: 'avatar', content: botReply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'avatar', content: 'Ha ocurrido un error al responder.' }]);
    }

    setInput('');
    setFile(null);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileClick = () => {
    alert('Estamos trabajando en esta función para que pronto puedas subir documentos, imágenes o audios.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-700 text-white text-xl font-bold p-4">Chat con {config?.name || '...'}</div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded-lg shadow ${
              m.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-white self-start'
            }`}
          >
            {m.content && <p>{m.content}</p>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <button
          onClick={handleFileClick}
          className="w-1/4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
        >
          Subir Archivo
        </button>
        <textarea
          ref={inputRef}
          className="flex-1 p-3 border rounded-lg resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
