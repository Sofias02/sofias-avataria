// utils/uploadImage.js
import { supabase } from '../supabase';

export const uploadAvatarImage = async (file, id) => {
  if (!file || !id) return null;

  console.log("📦 Intentando subir archivo:", file);

  try {
    const fileExt = file.name.split('.').pop();
    const sanitizedName = file.name.replace(/[^a-z0-9_\-\.]/gi, '_');
    const fileName = `${id}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('❌ Error al subir imagen:', uploadError.message);
      throw uploadError;
    }

    const { data: urlData, error: urlError } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError || !urlData?.publicUrl) {
      console.error('❌ Error al obtener la URL pública:', urlError?.message);
      return null;
    }

    console.log('✅ Imagen subida. URL pública:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (err) {
    console.error('🔥 Excepción general al subir imagen:', err);
    return null;
  }
};
