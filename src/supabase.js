import { createClient } from '@supabase/supabase-js';

// Reemplaza con tus datos reales de Supabase
const supabaseUrl = 'https://lndcxtcpemhlpysvspvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZGN4dGNwZW1obHB5c3ZzcHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODE1OTQsImV4cCI6MjA2MzY1NzU5NH0.lYL50QJAeqPPGLN2-VzhdlTM99dSJyJtaDxnGhZQoxc';

export const supabase = createClient(supabaseUrl, supabaseKey);
