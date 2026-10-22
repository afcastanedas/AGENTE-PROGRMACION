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

document.getElementById('btn-traer').addEventListener('click', async () => {

  // Mismo "async" que en el Paso 2: esta función necesita "await" para
  // esperar la respuesta real de Supabase antes de seguir.
  const { data, error } = await db.from('productos_practica').select('*');
  // ↑ El código se DETIENE en esta línea hasta que la base de datos
  //   responde. Compáralo con localStorage.getItem('productos'): esa
  //   llamada te devuelve el valor guardado EN EL MISMO INSTANTE, sin
  //   esperar nada, porque no sale de tu computador. Esta línea sí
  //   puede tardar (viaja a internet y vuelve) — por eso necesita await.

  if (error) {
    // Revisamos "error" ANTES de tocar "data": si la consulta falló,
    // "data" llega como null, y usar null más adelante (ej. null.map())
    // rompería el script. Mismo patrón de "validar antes de operar"
    // que ya usaste en el CRUD de la semana 7.
    document.getElementById('resultado').textContent = 'Error: ' + error.message;
    return;
  }

  // JSON.stringify(data, null, 2) convierte el array completo a texto,
  // con sangría (el "2") para que se lea ordenado. Esta línea SÍ es
  // sincrónica (no necesita await) — ya no estamos esperando nada de
  // Supabase, solo transformando el array "data" que ya llegó.
  document.getElementById('resultado').innerHTML = data.map(producto => {
    // Destructuring: sacamos cada propiedad del objeto "producto" y la
    // guardamos en su propia constante, en vez de escribir "producto.algo"
    // cada vez. Mismo objeto, solo una forma distinta de leerlo.
    const { nombre, descripcion, precio, unidades, descuento, disponible, categorias, imagen } = producto;

    return `
    <div class="card">
      <img src="${imagen}" alt="${nombre}">
      <div class="card-body">
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
        <p class="precio">$${precio.toLocaleString('es-CO')}</p>
        <p>Descuento: ${descuento * 100}%</p>
        <p>${disponible ? 'Unidades: ' + unidades : '<span class="agotado">Agotado</span>'}</p>
        <p>${categorias.join(', ')}</p>
      </div>
    </div>
  `;
  }).join('');
});

//crud//

// Crear un nuevo producto desde el formulario (Supabase, sección 5.1).
// "submit" se dispara al dar clic en el botón del form o Enter en un
// input — preventDefault() evita que la página se recargue (comportamiento
// por defecto de los formularios HTML).
document.getElementById('form-agregar').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const form = evento.target;

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

  if (errorCrear) {
    document.getElementById('resultado').textContent = 'Error al agregar: ' + errorCrear.message;
    return;
  }

  document.getElementById('resultado').textContent = '✅ "' + creado[0].nombre + '" agregado con id ' + creado[0].id + '.';
  form.reset();
});
