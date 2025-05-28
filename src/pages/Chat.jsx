import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import openai from '../openaiClient';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [memorySummary, setMemorySummary] = useState('');

  useEffect(() => {
    const loadChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_id')
        .eq('id', user.id)
        .single();

      if (!profile?.avatar_id) return;

      const { data: avatar } = await supabase
        .from('avatars')
        .select('*')
        .eq('id', profile.avatar_id)
        .single();

      setAvatar(avatar);

      const { data: history } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('avatar_id', avatar.id)
        .order('created_at');

      setMessages(history || []);

      const { data: memory } = await supabase
        .from('memory_snapshots')
        .select('summary')
        .eq('user_id', user.id)
        .eq('avatar_id', avatar.id)
        .single();

      if (memory?.summary) setMemorySummary(memory.summary);
    };

    loadChat();
  }, []);

  const uploadFile = async (file) => {
    const filename = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('chat-uploads').upload(filename, file);
    if (error) {
      console.error('Error al subir archivo:', error.message);
      return null;
    }
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

  const summarizeMemory = async (pastMessages) => {
    const summaryPrompt = [
      { role: 'system', content: 'Resume esta conversación en una sola frase para futura referencia:' },
      ...pastMessages.map(m => ({ role: m.role === 'avatar' ? 'assistant' : 'user', content: m.content }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: summaryPrompt,
    });

    return response.choices[0].message.content;
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

    await supabase.from('messages').insert(userMsg);

    const recentMsgs = messages.slice(-15);
    const context = [
      { role: 'system', content: avatar.prompt },
      { role: 'system', content: memorySummary || '' },
      ...recentMsgs.map(m => ({ role: m.role === 'avatar' ? 'assistant' : 'user', content: m.content })),
      { role: 'user', content: contentToSend },
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

    await supabase.from('messages').insert(botMsg);

    const updatedSummary = await summarizeMemory([...recentMsgs, userMsg, botMsg]);
    setMemorySummary(updatedSummary);

    await supabase.from('memory_snapshots').upsert({
      user_id: user.id,
      avatar_id: avatar.id,
      summary: updatedSummary,
      updated_at: new Date()
    }, { onConflict: ['user_id', 'avatar_id'] });

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
    setFile(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-700 text-white text-xl font-bold p-4">
        Chat con {avatar?.name || '...'}
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
    </div>
  );
}
