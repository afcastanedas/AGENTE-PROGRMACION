/* app.js */

async function testConnection() {
  const { data, error } = await db.auth.getSession();

  if (error) {
    console.error("Error al conectar con Supabase:", error.message);
    return;
  }

  console.log("Conexión exitosa con Supabase.");
  console.log("Sesión actual:", data.session);
}

testConnection();
