async function registrarCliente(nombre, correo, contrasena) {

  // db.auth.signUp() NO toca ninguna tabla tuya todavía — habla directo con
  // el sistema de autenticación interno de Supabase (algo así como una
  // tabla especial, auth.users, que tú no administras a mano). Le mandas
  // correo y contraseña, y Supabase por detrás: valida el formato del
  // correo, guarda la contraseña de forma segura (nunca en texto plano),
  // y crea un identificador único nuevo (un uuid) para esta persona.
  //
  // El resultado llega en dos partes, igual que en todas las llamadas a
  // Supabase que ya conoces (data / error):
  //   - data.user   → los datos del usuario recién creado. data.user.id
  //                   es el uuid real — EL MISMO que vamos a usar como id
  //                   en clientes_practica, dos líneas más abajo.
  //   - data.session → si tu proyecto exige confirmar el correo antes de
  //                   dejar entrar (ver guía, sección 7), esto llega en
  //                   null: el usuario ya existe, pero todavía no hay
  //                   sesión iniciada hasta que confirme.
  const { data, error } = await db.auth.signUp({
    email: correo,
    password: contrasena,
  });

  // Mismo patrón de "revisar error antes de seguir" que ya usaste en el
  // CRUD de productos — si signUp() falló (correo repetido, contraseña
  // muy corta, etc.), ni siquiera intentamos el segundo paso.
  if (error) {
    console.log('Error al registrar:', error);
    return null;
  }

  // Ahora sí tocamos una tabla tuya: clientes_practica. Este insert() es
  // igual al que ya usaste en agregarProducto() — la única diferencia es
  // que aquí SÍ mandamos el id a mano (data.user.id), en vez de dejar que
  // Supabase lo autogenere, porque este id tiene que coincidir exactamente
  // con el que Auth le acaba de asignar al usuario.
  const { data: cliente, error: errorCliente } = await db
    .from('clientes practica')
    .insert([{ id: data.user.id, nombre, correo, rol: 'cliente' }])
    .select();

  if (errorCliente) {
    console.log('Error al crear el perfil:', errorCliente);
    return null;
  }

  return cliente[0];
}

// 'submit' es el evento que dispara un <form> cuando alguien hace clic en
// su botón de tipo submit (o presiona Enter dentro de un campo). Por
// defecto, ese evento hace que el navegador RECARGUE la página entera —
// comportamiento heredado de cuando los formularios mandaban sus datos a
// otra página de servidor, décadas atrás. Como aquí todo lo manejamos con
// JavaScript (sin recargar nada), hay que apagar ese comportamiento a
// propósito.
document.getElementById('form-registro').addEventListener('submit', async (event) => {

  // event.preventDefault() le dice al navegador "no hagas lo que harías
  // normalmente con este evento" — en este caso, no recargues la página.
  // Sin esta línea, la página se refrescaría apenas se hiciera clic en
  // "Crear cuenta", y perderías cualquier mensaje que fueras a mostrar.
  event.preventDefault();

  // event.target es el elemento que disparó el evento — en un 'submit',
  // siempre es el propio <form>. Lo guardamos en una variable para poder
  // usarlo más abajo (form.reset()) sin tener que volver a buscarlo.
  const form = event.target;

  const cliente = await registrarCliente(
    document.getElementById('registro-nombre').value.trim(),
    document.getElementById('registro-correo').value.trim(),
    document.getElementById('registro-password').value
  );

  if (cliente) {
    form.reset(); // vacía los 3 campos del formulario, para la próxima persona
    // Con "Confirm email" desactivado, signUp() también deja la sesión
    // iniciada — por eso se refresca el estado en vez de asumir que
    // falta iniciar sesión a mano.
    mostrarEstadoSesion();
  } else {
    document.getElementById('estado-sesion').textContent =
      'No se pudo crear la cuenta. Revisa la consola.';
  }
});

// mostrarEstadoSesion() vive a nivel de archivo (no dentro de ningún
// listener) a propósito: así "btn-logout" y la carga inicial de la
// página pueden llamarla también. Si quedara declarada dentro del
// listener de "form-registro", solo existiría ahí dentro — cualquier
// otro código que la llame desde afuera daría
// "ReferenceError: mostrarEstadoSesion is not defined".
// Dentro de la única sección "Mi cuenta" hay dos bloques que nunca se
// ven juntos: "bloque-perfil" (tus datos, editables) si hay sesión, o
// "bloque-invitado" (login/registro) si no. Alternar entre los dos es
// lo que hace que, al entrar con sesión activa, lo primero que se vea
// sean tus propios datos listos para modificar.
async function mostrarEstadoSesion() {
  const { data } = await db.auth.getUser();
  const estado = document.getElementById('estado-sesion');
  const bloquePerfil = document.getElementById('bloque-perfil');
  const bloqueInvitado = document.getElementById('bloque-invitado');

  if (data.user) {
    estado.textContent = `Sesión iniciada como ${data.user.email}`;
    cargarPerfil(data.user.id);
    bloquePerfil.style.display = 'block';
    bloqueInvitado.style.display = 'none';
  } else {
    estado.textContent = 'No has iniciado sesión.';
    document.getElementById('form-perfil').reset();
    bloquePerfil.style.display = 'none';
    bloqueInvitado.style.display = 'block';
  }
}

// READ: trae los datos del cliente logueado desde "clientes practica"
// y los pone en el formulario de perfil — el mismo patrón de
// buscarProductoPorId() que ya usaste (filtrar por id con .eq(), y
// .single() porque esperamos exactamente una fila, no un array).
async function cargarPerfil(id) {
  const { data: cliente, error } = await db
    .from('clientes practica')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log('Error al cargar el perfil:', error);
    return;
  }

  document.getElementById('perfil-nombre').value = cliente.nombre;
  document.getElementById('perfil-correo').value = cliente.correo;
}

// UPDATE: mismo patrón que modificarProducto() — .update(cambios).eq('id', id).
// Aquí "cambios" son los valores que el usuario acaba de editar en su
// propio formulario de perfil.
document.getElementById('form-perfil').addEventListener('submit', async (event) => {
  event.preventDefault();

  const { data: sesion } = await db.auth.getUser();
  if (!sesion.user) {
    console.log('No hay sesión activa, no se puede actualizar el perfil.');
    return;
  }

  const { data: actualizado, error } = await db
    .from('clientes practica')
    .update({
      nombre: document.getElementById('perfil-nombre').value.trim(),
      correo: document.getElementById('perfil-correo').value.trim(),
    })
    .eq('id', sesion.user.id)
    .select();

  if (error) {
    console.log('Error al actualizar el perfil:', error);
    document.getElementById('estado-sesion').textContent =
      'No se pudo actualizar el perfil. Revisa la consola.';
    return;
  }

  document.getElementById('estado-sesion').textContent =
    `Perfil actualizado: ${actualizado[0].nombre}`;
});

// Iniciar sesión (db.auth.signInWithPassword): a diferencia de signUp(),
// esto no crea nada nuevo — solo valida el correo/contraseña contra la
// cuenta que ya existe en auth.users y, si coincide, guarda una sesión
// activa en el navegador.
document.getElementById('form-login').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;

  const { data, error } = await db.auth.signInWithPassword({
    email: document.getElementById('login-correo').value.trim(),
    password: document.getElementById('login-password').value,
  });

  if (error) {
    console.log('Error al iniciar sesión:', error);
    document.getElementById('estado-sesion').textContent =
      'No se pudo iniciar sesión. Revisa correo y contraseña.';
    return;
  }

  form.reset();
  mostrarEstadoSesion();
});

document.getElementById('btn-logout').addEventListener('click', async () => {
  await db.auth.signOut();
  mostrarEstadoSesion();
});

// Al cargar la página, revisa si ya había una sesión activa (ej. si
// recargaste sin cerrar sesión) — antes esto vivía atrapado dentro del
// listener de "form-registro" y nunca se ejecutaba al abrir la página.
mostrarEstadoSesion();