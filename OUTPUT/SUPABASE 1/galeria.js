// ============================================
// 1. ARRAY DE OBJETOS — Los datos de productos
//
// Por ahora es un array estático, copiado a mano de los 3 productos
// reales que ya existen en Supabase (tabla productos_practica), para
// que la galería se vea consistente con el resto del proyecto. Esto
// NO consulta Supabase todavía — es solo la aproximación visual/UX
// que pediste; conectarla a la base de datos real es un paso futuro
// (bastaría con reemplazar este array por un await db.from(...).select()
// como ya hiciste en admin.js).
// ============================================
const productos = [
  {
    id: 1,
    nombre: "Audífonos Bluetooth X200",
    descripcion: "Audífonos inalámbricos con cancelación activa de ruido y 30 horas de batería",
    precio: 150000,
    enStock: true,
    imagen: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?fm=jpg&q=60&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    nombre: "Camiseta Básica Algodón",
    descripcion: "Camiseta unisex 100% algodón orgánico, corte regular, disponible en 5 colores",
    precio: 45000,
    enStock: true,
    imagen: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?fm=jpg&q=60&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    nombre: "Silla Gamer ProMax",
    descripcion: "Silla ergonómica con soporte lumbar ajustable, reposabrazos 4D y reclinación 180 grados",
    precio: 680000,
    enStock: false,
    imagen: "https://images.unsplash.com/photo-1670946839270-cc4febd43b09?fm=jpg&q=60&w=400&auto=format&fit=crop"
  }
];


// ============================================
// 2. ESTADO DEL CARRITO
//    Un objeto donde la clave es el id del
//    producto y el valor es la cantidad
//    Ejemplo: { 1: 2, 3: 1 }
// ============================================
const carrito = {};
// Cantidad seleccionada por tarjeta (antes de agregar)
const cantidadesSeleccionadas = {};

// Inicializar cantidades en 1
productos.forEach(p => { cantidadesSeleccionadas[p.id] = 1; });


// ============================================
// 3. RENDERIZAR LA GALERÍA
//    Recorremos el array con forEach y por cada
//    objeto creamos una card HTML dinámicamente
// ============================================
function renderizarGaleria() {
  const galeria = document.getElementById('galeria');
  galeria.innerHTML = ''; // Limpiar antes de renderizar

  productos.forEach(producto => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = producto.id;

    // disabled="" en los botones si el producto está agotado —
    // así no se puede sumar cantidad ni agregarlo al carrito.
    const deshabilitado = producto.enStock ? '' : 'disabled';

    card.innerHTML = `
      <img
        class="card-img"
        src="${producto.imagen}"
        alt="${producto.nombre}"
      />
      <div class="card-body">
        <p class="card-nombre">${producto.nombre}</p>
        <p class="card-descripcion">${producto.descripcion}</p>
        <p class="card-precio">$${producto.precio.toLocaleString('es-CO')}</p>
        ${producto.enStock ? '' : '<span class="card-agotado">Agotado</span>'}
      </div>
      <div class="card-acciones">
        <button class="btn-restar" data-id="${producto.id}" ${deshabilitado}>−</button>
        <span class="cantidad-display" id="cant-${producto.id}">
          ${cantidadesSeleccionadas[producto.id]}
        </span>
        <button class="btn-sumar" data-id="${producto.id}" ${deshabilitado}>+</button>
        <button class="btn-agregar" data-id="${producto.id}" ${deshabilitado}>
          Agregar
        </button>
      </div>
    `;

    galeria.appendChild(card);
  });

  asignarEventosTarjetas();
}


// ============================================
// 4. EVENTOS DE LAS TARJETAS
//    Suma/resta la cantidad antes de agregar,
//    y el botón "Agregar" mete el producto
//    al carrito con la cantidad seleccionada
// ============================================
function asignarEventosTarjetas() {

  document.querySelectorAll('.btn-restar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      if (cantidadesSeleccionadas[id] > 1) {
        cantidadesSeleccionadas[id]--;
        document.getElementById(`cant-${id}`).textContent =
          cantidadesSeleccionadas[id];
      }
    });
  });

  document.querySelectorAll('.btn-sumar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      cantidadesSeleccionadas[id]++;
      document.getElementById(`cant-${id}`).textContent =
        cantidadesSeleccionadas[id];
    });
  });

  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const cantidad = cantidadesSeleccionadas[id];

      carrito[id] = (carrito[id] || 0) + cantidad;

      cantidadesSeleccionadas[id] = 1;
      document.getElementById(`cant-${id}`).textContent = 1;

      btn.textContent = '✓ Agregado';
      btn.style.background = '#4a7c59';
      setTimeout(() => {
        btn.textContent = 'Agregar';
        btn.style.background = '';
      }, 1200);

      actualizarCarrito();
    });
  });
}


// ============================================
// 5. ACTUALIZAR EL PANEL DE CARRITO
//    Recorre el objeto carrito y construye
//    los items en el panel lateral
// ============================================
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const badge = document.getElementById('contador-badge');
  const totalValor = document.getElementById('total-valor');

  let totalItems = 0;
  let totalPrecio = 0;

  const idsEnCarrito = Object.keys(carrito).filter(id => carrito[id] > 0);

  if (idsEnCarrito.length === 0) {
    lista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío 🛒</p>';
    badge.textContent = '0';
    totalValor.textContent = '$0';
    return;
  }

  lista.innerHTML = '';

  idsEnCarrito.forEach(id => {
    const producto = productos.find(p => p.id === parseInt(id));
    const qty = carrito[id];
    totalItems += qty;
    totalPrecio += producto.precio * qty;

    const item = document.createElement('div');
    item.classList.add('item-carrito');
    item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <div class="item-info">
        <strong>${producto.nombre}</strong>
        <span>$${producto.precio.toLocaleString('es-CO')} × ${qty}</span>
      </div>
      <span class="item-qty">$${(producto.precio * qty).toLocaleString('es-CO')}</span>
    `;
    lista.appendChild(item);
  });

  badge.textContent = totalItems;
  totalValor.textContent = '$' + totalPrecio.toLocaleString('es-CO');
}


// ============================================
// 6. ABRIR / CERRAR PANEL CARRITO
// ============================================
const panelCarrito = document.getElementById('panel-carrito');
const overlay = document.getElementById('overlay');

document.getElementById('btn-carrito').addEventListener('click', () => {
  panelCarrito.classList.add('abierto');
  overlay.classList.add('activo');
});

document.getElementById('btn-cerrar-carrito').addEventListener('click', cerrarCarrito);
overlay.addEventListener('click', cerrarCarrito);

function cerrarCarrito() {
  panelCarrito.classList.remove('abierto');
  overlay.classList.remove('activo');
}


// ============================================
// ▶ INICIAR
// ============================================
renderizarGaleria();
