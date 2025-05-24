import { supabase } from '../supabase';

export async function seedAvatars() {
  const avatars = [
    {
      name: 'Sofía',
      image_url: '/images/sofia.png',
      prompt: 'Sofía es una estratega analítica, siempre serena y clara. Experta en negocios e innovación.',
    },
    {
      name: 'Isabel',
      image_url: '/images/isabel.png',
      prompt: 'Isabel es empática, comunicativa, creativa. Especialista en relaciones y lenguaje emocional.',
    },
    {
      name: 'Carlos',
      image_url: '/images/carlos.png',
      prompt: 'Carlos es técnico, lógico y directo. Ideal para análisis de datos, procesos y programación.',
    },
  ];

  for (const avatar of avatars) {
    const { error } = await supabase
      .from('avatars')
      .upsert(avatar, { onConflict: 'name' });

    if (error) console.error(`❌ Error con ${avatar.name}:`, error.message);
    else console.log(`✅ Avatar sincronizado: ${avatar.name}`);
  }
}
