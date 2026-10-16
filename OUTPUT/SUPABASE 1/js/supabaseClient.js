/* supabaseClient.js */

// Pega aquí tu Project URL y tu anon public key
// (Project Settings → API, en el panel de Supabase)
const SUPABASE_URL      = "https://dgnmfiuoffyghimbqgrb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnbm1maXVvZmZ5Z2hpbWJxZ3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwODA3NDgsImV4cCI6MjEwNzY1Njc0OH0.THurjoqHvM-WJv6RSN3uvMEcOHI725XCBbditPdy_VE";

// El script del CDN crea una variable global "supabase" que trae
// la función createClient(). La usamos para crear NUESTRO propio
// cliente, y lo guardamos en una variable con otro nombre (db) para
// no confundirla con el objeto global de la librería.
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
