// src/pages/Chat.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import openai from '../openaiClient';
import { useParams, useNavigate } from 'react-router-dom';

export default function Chat() {
  const { avatarId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [memorySummary, setMemorySummary] = useState('');
  const [showCall, setShowCall] = useState(false);

  useEffect(() => {
    const loadChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: avatarData } = await supabase
        .from('avatars')
        .select('*')
        .eq('id', avatarId)
        .single();

      setAvatar(avatarData);

      // Nuevo chat limpio
      setMessages([]);
      setMemorySummary('');
    };

    loadChat();
  }, [avatarId]);

  const uploadFile = async (file) => {
    const filename = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('chat-uploads').upload(filename, file);
    if (error) return null;
    const { data } = supabase.storage.from('chat-uploads').getPublicUrl(filename);
    return data.publicUrl;
  };

  const transcribeAudio = async (url) => {
    const blob = await fetch(url).then(res => res.blob());
    const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
      },
      body: formData
    });

    const data = await response.json();
    return data.text || '';
  };

  const handleSend = async () => {
    if (!input && !file) return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    let contentToSend = input;
    let attachmentUrl = null;

    if (file) {
      const url = await uploadFile(file);
      if (url) {
        attachmentUrl = url;
        if (url.endsWith('.mp3') || url.endsWith('.wav')) {
          contentToSend = await transcribeAudio(url);
        }
      }
    }

    const userMsg = {
      user_id: user.id,
      avatar_id: avatar.id,
      role: 'user',
      content: contentToSend,
      attachment: attachmentUrl
    };

    const updatedMessages = [...messages, userMsg];

    const context = [
      { role: 'system', content: avatar.prompt },
      ...updatedMessages.map(m => ({ role: m.role === 'avatar' ? 'assistant' : 'user', content: m.content }))
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: context,
    });

    const botContent = completion.choices[0].message.content;
    const botMsg = {
      user_id: user.id,
      avatar_id: avatar.id,
      role: 'avatar',
      content: botContent,
    };

    await supabase.from('messages').insert([userMsg, botMsg]);

    const summaryPrompt = [
      { role: 'system', content: 'Resume esta conversación en una sola frase para futura referencia:' },
      ...updatedMessages.map(m => ({ role: m.role === 'avatar' ? 'assistant' : 'user', content: m.content })),
      { role: 'assistant', content: botContent }
    ];

    const summaryResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: summaryPrompt
    });

    const updatedSummary = summaryResponse.choices[0].message.content;
    setMemorySummary(updatedSummary);

    await supabase.from('memory_snapshots').upsert({
      user_id: user.id,
      avatar_id: avatar.id,
      summary: updatedSummary,
      updated_at: new Date()
    }, { onConflict: ['user_id', 'avatar_id'] });

    setMessages([...updatedMessages, botMsg]);
    setInput('');
    setFile(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-700 text-white text-xl font-bold p-4 flex justify-between items-center">
        <button onClick={() => navigate('/catalogo')} className="text-white text-2xl">←</button>
        Chat con {avatar?.name || '...'}
        <button
          onClick={() => setShowCall(true)}
          className="bg-yellow-500 px-3 py-1 rounded text-sm hover:bg-yellow-600"
        >📞 Llamar</button>
      </div>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded-lg shadow ${
              m.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-white self-start'
            }`}
          >
            {m.content && <p>{m.content}</p>}
            {m.attachment && (
              <div className="mt-2">
                {m.attachment.endsWith('.mp3') || m.attachment.endsWith('.wav') ? (
                  <audio controls src={m.attachment} className="w-full" />
                ) : (
                  <img src={m.attachment} alt="archivo" className="rounded-lg max-h-64" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="file"
          accept="image/*,audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-1/4"
        />
        <input
          className="flex-1 p-3 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje o adjunta un archivo..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>

      {showCall && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <img src={avatar?.image_url} alt={avatar?.name} className="w-40 h-40 rounded-full shadow-lg mb-4" />
          <p className="text-white text-xl mb-4">Llamada con {avatar?.name} en curso...</p>
          <button
            onClick={() => setShowCall(false)}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Terminar Llamada
          </button>
        </div>
      )}
    </div>
  );
}
