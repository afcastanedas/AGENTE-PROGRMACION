// ===== ACCESO DE ADMINISTRADOR =====
// Mismo patrón que cliente.html/cliente.js (registro/login contra
// Supabase Auth), pero con un paso extra importante: aquí no basta con
// "hay sesión" para mostrar el CRUD — hay que confirmar que esa sesión
// SÍ corresponde a un administrador, buscando su fila en admin_practica
// (la policy "ver_perfil" que configuramos permite esa lectura).

async function registrarAdmin(nombre, correo, contrasena) {
  const { data, error } = await db.auth.signUp({ email: correo, password: contrasena });

  if (error) {
    console.log('Error al registrar admin:', error);
    return null;
  }

  // Igual que en cliente.js: el id del perfil tiene que ser el mismo
  // uuid que Auth le acaba de asignar, para que la policy
  // "auth.uid() = id" funcione más adelante.
  const { data: admin, error: errorAdmin } = await db
    .from('admin_practica')
    .insert([{ id: data.user.id, nombre, correo }])
    .select();

  if (errorAdmin) {
    console.log('Error al crear el perfil de administrador:', errorAdmin);
    return null;
  }

  return admin[0];
}

// Revisa si el usuario con sesión activa tiene fila en admin_practica.
// Si no existe ninguna fila (porque es un correo de cliente, o cualquier
// otra cuenta de Supabase Auth que no se registró aquí), "admin" llega
// null y el CRUD se mantiene oculto.
async function buscarAdminPorId(id) {
  const { data: admin, error } = await db
    .from('admin_practica')
    .select('*')
    .eq('id', id)
    .maybeSingle(); // a diferencia de .single(), no da error si no hay fila — devuelve null

  if (error) {
    console.log('Error al verificar administrador:', error);
    return null;
  }

  return admin;
}

async function mostrarEstadoSesionAdmin() {
  const { data } = await db.auth.getUser();
  const estado = document.getElementById('estado-sesion-admin');
  const bloqueLogin = document.getElementById('bloque-login-admin');
  const botonLogout = document.getElementById('btn-logout-admin');
  const panelCrud = document.getElementById('panel-crud');

  if (!data.user) {
    estado.textContent = 'No has iniciado sesión.';
    bloqueLogin.style.display = 'block';
    botonLogout.style.display = 'none';
    panelCrud.style.display = 'none';
    return;
  }

  const admin = await buscarAdminPorId(data.user.id);

  if (!admin) {
    // Hay sesión de Supabase Auth, pero esa cuenta no está en
    // admin_practica (ej. es una cuenta de cliente) — el CRUD sigue oculto.
    estado.textContent = `Sesión iniciada como ${data.user.email}, pero esta cuenta no es de administrador.`;
    bloqueLogin.style.display = 'none';
    botonLogout.style.display = 'inline-block';
    panelCrud.style.display = 'none';
    return;
  }

  estado.textContent = `Administrador: ${admin.nombre} (${admin.correo})`;
  bloqueLogin.style.display = 'none';
  botonLogout.style.display = 'inline-block';
  panelCrud.style.display = 'block';
}

document.getElementById('form-registro-admin').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;

  const admin = await registrarAdmin(
    document.getElementById('registro-admin-nombre').value.trim(),
    document.getElementById('registro-admin-correo').value.trim(),
    document.getElementById('registro-admin-password').value
  );

  if (admin) {
    form.reset();
    mostrarEstadoSesionAdmin();
  } else {
    document.getElementById('estado-sesion-admin').textContent =
      'No se pudo crear la cuenta de administrador. Revisa la consola.';
  }
});

document.getElementById('form-login-admin').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;

  const { error } = await db.auth.signInWithPassword({
    email: document.getElementById('login-admin-correo').value.trim(),
    password: document.getElementById('login-admin-password').value,
  });

  if (error) {
    console.log('Error al iniciar sesión:', error);
    document.getElementById('estado-sesion-admin').textContent =
      'No se pudo iniciar sesión. Revisa correo y contraseña.';
    return;
  }

  form.reset();
  mostrarEstadoSesionAdmin();
});

document.getElementById('btn-logout-admin').addEventListener('click', async () => {
  await db.auth.signOut();
  mostrarEstadoSesionAdmin();
});

// Al cargar la página, revisa si ya había sesión de administrador activa.
mostrarEstadoSesionAdmin();

// ===== FIN ACCESO DE ADMINISTRADOR =====

// Copia de referencia/comparación de los datos que viven en Supabase
// (tabla productos_practica) — esto NO es lo que usa la app para
// mostrar las tarjetas; esa consulta real sigue abajo, con
// db.from('productos_practica').select('*'). Este array solo sirve
// para comparar a simple vista si un valor cambió en la base de datos.
const productosReferencia = [
  {
    id: 1,
    nombre: "Audífonos Bluetooth X200",
    descripcion: "Audifonos inalambricos con cancelacion activa de ruido y 30 horas de bateria",
    precio: 150000,
    unidades: 25,
    descuento: 0.1,
    disponible: true,
    categorias: ["tecnologia", "audio", "bluetooth"],
    imagen: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?fm=jpg&q=60&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    nombre: "Camiseta Básica Algodón",
    descripcion: "Camiseta unisex 100% algodon organico, corte regular, disponible en 5 colores",
    precio: 45000,
    unidades: 120,
    descuento: 0,
    disponible: true,
    categorias: ["ropa", "basicos", "algodon"],
    imagen: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?fm=jpg&q=60&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    nombre: "Silla Gamer ProMax",
    descripcion: "Silla ergonomica con soporte lumbar ajustable, reposabrazos 4D y reclinacion 180 grados",
    precio: 680000,
    unidades: 0,
    descuento: 0.15,
    disponible: false,
    categorias: ["hogar", "oficina", "gaming", "muebles"],
    imagen: "https://images.unsplash.com/photo-1670946839270-cc4febd43b09?fm=jpg&q=60&w=800&auto=format&fit=crop"
  }
];

// Guarda la última lista de productos mostrada, para que el botón
// "Editar" pueda precargar TODOS los campos del producto (no solo el
// id) sin tener que volver a pedírselos a Supabase.
let ultimosProductos = [];

// Dibuja un array de productos como tarjetas dentro de #resultado.
// La usan tanto "Traer productos" como "Buscar" — mismo render, distinto
// origen de los datos (todos vs. filtrados por nombre). Cada tarjeta
// muestra su "id" y lleva botones de Editar/Eliminar con data-id, para
// no tener que escribir el id a mano en otro formulario aparte.
function mostrarProductos(lista) {
  ultimosProductos = lista;
  document.getElementById('resultado').innerHTML = lista.map(producto => {
    const { id, nombre, descripcion, precio, unidades, descuento, disponible, categorias, imagen } = producto;

    return `
    <div class="card">
      <img src="${imagen}" alt="${nombre}">
      <div class="card-body">
        <p class="card-id">id: ${id}</p>
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <p class="precio">$${precio.toLocaleString('es-CO')}</p>
        <p>Descuento: ${descuento * 100}%</p>
        <p>${disponible ? 'Unidades: ' + unidades : '<span class="agotado">Agotado</span>'}</p>
        <p>${categorias.join(', ')}</p>
        <div class="card-acciones">
          <button type="button" class="btn-editar" data-id="${id}" data-unidades="${unidades}">Editar</button>
          <button type="button" class="btn-eliminar" data-id="${id}" data-nombre="${nombre}">Eliminar</button>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// Delegación de eventos: en vez de poner un listener por cada botón
// (que no existen todavía cuando carga la página, se crean recién al
// hacer mostrarProductos), escuchamos los clics en el contenedor fijo
// #resultado y revisamos CUÁL botón se clickeó con event.target.
document.getElementById('resultado').addEventListener('click', async (evento) => {
  const botonEditar = evento.target.closest('.btn-editar');
  const botonEliminar = evento.target.closest('.btn-eliminar');

  if (botonEditar) {
    // Precarga el formulario de modificar con TODOS los campos de este
    // producto (buscándolo en ultimosProductos por su id), y lleva la
    // vista hasta ahí para que el usuario solo cambie lo que quiera.
    const id = Number(botonEditar.dataset.id);
    const producto = ultimosProductos.find(p => p.id === id);
    const formModificar = document.getElementById('form-modificar');

    formModificar.elements.id.value = producto.id;
    formModificar.nombre.value = producto.nombre;
    formModificar.descripcion.value = producto.descripcion;
    formModificar.precio.value = producto.precio;
    formModificar.unidades.value = producto.unidades;
    formModificar.descuento.value = producto.descuento;
    formModificar.categorias.value = producto.categorias.join(', ');
    formModificar.imagen.value = producto.imagen;
    formModificar.disponible.value = String(producto.disponible);

    formModificar.scrollIntoView({ behavior: 'smooth' });
    formModificar.nombre.focus();
  }

  if (botonEliminar) {
    const id = Number(botonEliminar.dataset.id);
    const nombre = botonEliminar.dataset.nombre;

    if (!confirm('¿Eliminar "' + nombre + '" (id ' + id + ')? Esta acción no se puede deshacer.')) return;

    const seElimino = await eliminarProducto(id);
    document.getElementById('mensaje').textContent = seElimino
      ? '✅ "' + nombre + '" eliminado.'
      : '❌ No se pudo eliminar.';

    // Quita la tarjeta de la vista sin tener que volver a pedirle todo a Supabase
    if (seElimino) botonEliminar.closest('.card').remove();
  }
});

// Estado inicial: en vez de dejar #resultado vacío sin ninguna pista,
// se explica qué botón hay que presionar primero.
document.getElementById('resultado').innerHTML = '<p class="vacio">Haz clic en "Traer productos" para ver el catálogo.</p>';

document.getElementById('btn-traer').addEventListener('click', async (evento) => {
  const boton = evento.target;
  boton.disabled = true;
  boton.textContent = 'Cargando...';

  // Mismo "async" que en el Paso 2: esta función necesita "await" para
  // esperar la respuesta real de Supabase antes de seguir.
  const { data, error } = await db.from('productos_practica').select('*');
  // ↑ El código se DETIENE en esta línea hasta que la base de datos
  //   responde. Compáralo con localStorage.getItem('productos'): esa
  //   llamada te devuelve el valor guardado EN EL MISMO INSTANTE, sin
  //   esperar nada, porque no sale de tu computador. Esta línea sí
  //   puede tardar (viaja a internet y vuelve) — por eso necesita await.

  boton.disabled = false;
  boton.textContent = 'Traer productos';

  if (error) {
    // Revisamos "error" ANTES de tocar "data": si la consulta falló,
    // "data" llega como null, y usar null más adelante (ej. null.map())
    // rompería el script. Mismo patrón de "validar antes de operar"
    // que ya usaste en el CRUD de la semana 7.
    document.getElementById('mensaje').textContent = 'Error: ' + error.message;
    return;
  }

  document.getElementById('mensaje').textContent = '';
  mostrarProductos(data);
});

// Buscar productos por nombre (sección 5.2 de la guía): .ilike() filtra
// en el servidor, insensible a mayúsculas/minúsculas. Los símbolos "%"
// significan "cualquier texto antes/después" — equivalente a
// .toLowerCase().includes(texto), pero corriendo en Supabase, no en el navegador.
document.getElementById('btn-buscar').addEventListener('click', async (evento) => {
  const boton = evento.target;
  const texto = document.getElementById('input-buscar').value.trim();

  boton.disabled = true;
  boton.textContent = 'Buscando...';

  const { data, error } = await db
    .from('productos_practica')
    .select('*')
    .ilike('nombre', `%${texto}%`);

  boton.disabled = false;
  boton.textContent = 'Buscar';

  if (error) {
    document.getElementById('mensaje').textContent = 'Error: ' + error.message;
    return;
  }

  if (data.length === 0) {
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('mensaje').textContent = 'No se encontraron productos con ese nombre.';
    return;
  }

  document.getElementById('mensaje').textContent = '';
  mostrarProductos(data);
});

//crud//

// Crear un nuevo producto desde el formulario (Supabase, sección 5.1).
// "submit" se dispara al dar clic en el botón del form o Enter en un
// input — preventDefault() evita que la página se recargue (comportamiento
// por defecto de los formularios HTML).
document.getElementById('form-agregar').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const form = evento.target;
  const boton = form.querySelector('button[type="submit"]');
  boton.disabled = true;
  boton.textContent = 'Agregando...';

  const datos = {
    nombre: form.nombre.value,
    descripcion: form.descripcion.value,
    precio: Number(form.precio.value),
    unidades: Number(form.unidades.value),
    descuento: Number(form.descuento.value),
    disponible: form.disponible.checked,
    // split(',') convierte "hogar, oferta" en ["hogar", " oferta"];
    // trim() le quita los espacios sobrantes a cada elemento
    categorias: form.categorias.value ? form.categorias.value.split(',').map(c => c.trim()) : [],
    imagen: form.imagen.value
  };

  // .insert() siempre recibe un ARRAY de objetos, aunque insertes uno
  // solo. .select() le pide a Supabase que devuelva la fila ya creada
  // (con su id nuevo) — sin esto, insert() no devuelve nada útil.
  const { data: creado, error: errorCrear } = await db
    .from('productos_practica')
    .insert([datos])
    .select();

  boton.disabled = false;
  boton.textContent = 'Agregar Producto';

  if (errorCrear) {
    document.getElementById('mensaje').textContent = 'Error al agregar: ' + errorCrear.message;
    return;
  }

  document.getElementById('mensaje').textContent = '✅ "' + creado[0].nombre + '" agregado con id ' + creado[0].id + '.';
  form.reset();
});

// UPDATE (sección 5.3 de la guía): Supabase resuelve "encontrar y
// actualizar" en una sola instrucción — .update(cambios).eq('id', id)
// se lee literalmente como "actualiza estos campos, donde el id sea
// igual a este valor". Solo toca las propiedades que vengan en "cambios",
// el resto del producto queda igual.
async function modificarProducto(id, cambios) {
  const { data, error } = await db
    .from('productos_practica')
    .update(cambios)
    .eq('id', id)
    .select();

  if (error) return null;
  return data[0];
}

document.getElementById('form-modificar').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const form = evento.target;
  const boton = form.querySelector('button[type="submit"]');
  boton.disabled = true;
  boton.textContent = 'Guardando...';

  // form.elements.id, NO form.id: los formularios ya tienen una
  // propiedad nativa "id" (el id del propio <form>), que choca con
  // un <input name="id"> y gana siempre — form.id sería un string,
  // nunca el input. form.elements sí respeta el nombre del campo.
  const id = Number(form.elements.id.value);

  // Solo se agrega al objeto "cambios" lo que el usuario sí llenó —
  // así .update(cambios) no pisa con texto vacío los campos que
  // quería dejar igual. value.trim() !== '' cubre texto; para
  // "disponible" el <select> usa "" como "no cambiar".
  const cambios = {};
  if (form.nombre.value.trim() !== '') cambios.nombre = form.nombre.value;
  if (form.descripcion.value.trim() !== '') cambios.descripcion = form.descripcion.value;
  if (form.precio.value !== '') cambios.precio = Number(form.precio.value);
  if (form.unidades.value !== '') cambios.unidades = Number(form.unidades.value);
  if (form.descuento.value !== '') cambios.descuento = Number(form.descuento.value);
  if (form.categorias.value.trim() !== '') cambios.categorias = form.categorias.value.split(',').map(c => c.trim());
  if (form.imagen.value.trim() !== '') cambios.imagen = form.imagen.value;
  if (form.disponible.value !== '') cambios.disponible = form.disponible.value === 'true';

  const actualizado = await modificarProducto(id, cambios);

  boton.disabled = false;
  boton.textContent = 'Guardar cambios';

  if (!actualizado) {
    document.getElementById('mensaje').textContent = '❌ No se pudo modificar. Revisa que el id exista.';
    return;
  }

  document.getElementById('mensaje').textContent = '✅ "' + actualizado.nombre + '" actualizado.';
  form.reset();
});

// DELETE (sección 5.4 de la guía): busca por id y elimina. Ya no hace
// falta splice() ni preocuparse por "correr" las posiciones del array
// — Supabase simplemente borra la fila, y la próxima vez que pidas los
// datos con select('*'), esa fila ya no va a estar.
//
// OJO: borrar con un id que no existe NO es un error para Postgres
// (0 filas que cumplen el filtro = operación "exitosa" sin filas
// afectadas). Por eso agregamos .select(): así vemos qué filas se
// borraron realmente. Si "data" llega vacío, no existía ese id.
async function eliminarProducto(id) {
  const { data, error } = await db
    .from('productos_practica')
    .delete()
    .eq('id', id)
    .select();

  if (error) return false;
  return data.length > 0;   // true solo si de verdad borró una fila
}

// El formulario standalone de eliminar se quitó: cada tarjeta ya tiene
// su propio botón "Eliminar" (ver el listener delegado en #resultado,
// arriba), así que mantener los dos caminos para la misma acción
// solo generaba confusión sobre cuál usar.
