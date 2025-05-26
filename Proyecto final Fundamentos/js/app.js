// Variables globales
let paginaActual = 1;
let recetasPorPagina = 15;
let productosFiltrados = [];
let paginaActualTabla = 1;
const resultadosPorPagina = 10;
let modoVista = 'tarjetas';
let todasLasRecetas = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarTodasLasRecetas();
    cargarTarjetas();
    configurarEventos();
    verificarConectividad();
});

// Cargar todas las recetas (originales + guardadas)
function cargarTodasLasRecetas() {
    const recetasGuardadas = obtenerRecetasGuardadas();
    todasLasRecetas = [...recetas, ...recetasGuardadas];
}

// Obtener recetas guardadas del localStorage
function obtenerRecetasGuardadas() {
    try {
        if (typeof(Storage) !== "undefined") {
            const recetasGuardadas = localStorage.getItem('recetasPersonalizadas');
            return recetasGuardadas ? JSON.parse(recetasGuardadas) : [];
        }
        return [];
    } catch (error) {
        return [];
    }
}

// Configurar todos los event listeners
function configurarEventos() {
    document.getElementById("boton-buscar").addEventListener("click", buscarRecetas);
    document.getElementById("boton-limpiar").addEventListener("click", limpiarFiltros);
    
    // Event listeners para paginación
    document.getElementById("anterior").addEventListener("click", () => cambiarPagina(-1));
    document.getElementById("siguiente").addEventListener("click", () => cambiarPagina(1));
}

// Función para determinar el placeholder correcto según el tipo de imagen
function obtenerPlaceholder(rutaImagen) {
    if (rutaImagen.startsWith('images/')) {
        return 'images/placeholder.jpg';
    } else {
        return 'https://via.placeholder.com/400x300/cccccc/666666?text=Imagen+No+Disponible';
    }
}

// Cargar tarjetas iniciales (primeras 15 recetas)
function cargarTarjetas() {
    const container = document.getElementById('lista-recetas');
    const inicio = (paginaActual - 1) * recetasPorPagina;
    const fin = inicio + recetasPorPagina;
    const recetasPagina = todasLasRecetas.slice(inicio, fin);
    
    container.innerHTML = '';
    
    recetasPagina.forEach(receta => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-receta';
        
        // Agregar clase especial para recetas nuevas
        if (receta.esNueva) {
            tarjeta.classList.add('receta-nueva');
        }
        
        const placeholderURL = obtenerPlaceholder(receta.imagen);
        
        tarjeta.innerHTML = `
            ${receta.esNueva ? '<div class="badge-nueva">✨ Nueva</div>' : ''}
            <img src="${receta.imagen}" 
                alt="${receta.nombre}" 
                onerror="this.src='${placeholderURL}'"
                loading="lazy">
            <h3>${receta.nombre}</h3>
            <p><strong>Categoría:</strong> ${receta.categoria}</p>
            <p><strong>Precio:</strong> $${receta.precio.toLocaleString()}</p>
            <p><strong>Código:</strong> ${receta.codigo}</p>
            <p><strong>Tiempo:</strong> ${receta.tiempoPreparacion}</p>
            <p><strong>Ingredientes:</strong> ${receta.ingredientes ? receta.ingredientes.join(', ') : 'No especificados'}</p>
        `;
        container.appendChild(tarjeta);
    });
    
    actualizarPaginacion();
}

// Actualizar controles de paginación
function actualizarPaginacion() {
    const totalPaginas = Math.ceil(todasLasRecetas.length / recetasPorPagina);
    const btnAnterior = document.getElementById('anterior');
    const btnSiguiente = document.getElementById('siguiente');
    const spanPagina = document.getElementById('pagina-actual');
    
    btnAnterior.disabled = paginaActual <= 1;
    btnSiguiente.disabled = paginaActual >= totalPaginas;
    spanPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;
}

// Función de búsqueda con simulación de carga
function buscarRecetas() {
    const nombre = document.getElementById("filtro-nombre").value.toLowerCase().trim();
    const categoria = document.getElementById("filtro-categoria").value;
    const precioMax = parseFloat(document.getElementById("filtro-precio-max").value);

    // Mostrar loading en el lugar de las tarjetas
    const gridRecetas = document.getElementById("lista-recetas");
    const paginacionTarjetas = document.getElementById("paginacion-tarjetas");
    
    gridRecetas.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; font-size: 1.2em; color: #667eea;">🔍 Cargando recetas...</div>';
    paginacionTarjetas.style.display = "none";

    // Simular proceso asíncrono con promesa
    new Promise((resolve) => {
        setTimeout(() => {
            // Filtrar recetas según los criterios
            productosFiltrados = todasLasRecetas.filter(receta => {
                const cumpleNombre = nombre === "" || receta.nombre.toLowerCase().includes(nombre);
                const cumpleCategoria = categoria === "" || receta.categoria === categoria;
                const cumplePrecio = isNaN(precioMax) || receta.precio <= precioMax;
                
                return cumpleNombre && cumpleCategoria && cumplePrecio;
            });
            
            resolve(productosFiltrados);
        }, 2000);
    }).then(() => {
        // Resetear paginación de resultados
        paginaActualTabla = 1;
        modoVista = 'resultados';
        
        // Mostrar resultados
        mostrarResultadosEnGrid();
    }).catch(error => {
        gridRecetas.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: red;">❌ Error en la búsqueda. Intenta de nuevo.</div>';
    });
}

// Mostrar resultados de búsqueda en el grid
function mostrarResultadosEnGrid() {
    const container = document.getElementById('lista-recetas');
    const paginacionTarjetas = document.getElementById("paginacion-tarjetas");
    
    container.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <h3 style="color: #666; margin-bottom: 20px;"> No se encontraron recetas</h3>
                <p style="color: #999; margin-bottom: 30px;">Intenta con otros filtros de búsqueda</p>
                <button onclick="limpiarBusqueda()" style="background-color: #667eea; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer;">
                    🔄 Mostrar todas las recetas
                </button>
            </div>
        `;
        paginacionTarjetas.style.display = "none";
        return;
    }
    
    // Mostrar resultados paginados (10 por página)
    const inicio = (paginaActualTabla - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    const resultadosPagina = productosFiltrados.slice(inicio, fin);
    
    // Crear encabezado de resultados
    const headerResultados = document.createElement('div');
    headerResultados.style.cssText = 'grid-column: 1/-1; text-align: center; margin-bottom: 30px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';
    headerResultados.innerHTML = `
        <h3 style="color: #333; margin-bottom: 10px;"> Resultados de la Búsqueda</h3>
        <p style="color: #666; margin-bottom: 20px;">Se encontraron <strong>${productosFiltrados.length}</strong> recetas</p>
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button onclick="limpiarBusqueda()" style="background-color: #6c757d; color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
                Regresar a Vista de Productos
            </button>
            <button onclick="limpiarFiltros()" style="background-color: #28a745; color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
                Limpiar Búsqueda
            </button>
        </div>
    `;
    container.appendChild(headerResultados);
    
    // Crear tabla de resultados
    const tablaContainer = document.createElement('div');
    tablaContainer.style.cssText = 'grid-column: 1/-1; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;';
    
    let html = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <th style="color: white; padding: 15px; text-align: center;">Imagen</th>
                    <th style="color: white; padding: 15px; text-align: center;">Título</th>
                    <th style="color: white; padding: 15px; text-align: center;">Categoría</th>
                    <th style="color: white; padding: 15px; text-align: center;">Precio</th>
                    <th style="color: white; padding: 15px; text-align: center;">Tiempo</th>
                    <th style="color: white; padding: 15px; text-align: center;">Ingredientes</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    // Agregar filas de datos
    resultadosPagina.forEach((receta, index) => {
        const placeholderURL = obtenerPlaceholder(receta.imagen);
        const bgColor = index % 2 === 0 ? '#f8f9fa' : 'white';
        
        html += `
        <tr style="background-color: ${bgColor};">
            <td style="padding: 12px; text-align: center;">
                <img src="${receta.imagen}" 
                    width="60" height="60" 
                    alt="${receta.nombre}" 
                    onerror="this.src='${placeholderURL}'"
                    loading="lazy"
                    style="border-radius: 8px; object-fit: cover;">
            </td>
            <td style="padding: 12px; text-align: center; font-weight: bold; color: #333;">${receta.nombre}</td>
            <td style="padding: 12px; text-align: center; color: #667eea;">${receta.categoria}</td>
            <td style="padding: 12px; text-align: center; font-weight: bold; color: #28a745;">$${receta.precio.toLocaleString()}</td>
            <td style="padding: 12px; text-align: center; color: #666;">${receta.tiempoPreparacion}</td>
            <td style="padding: 12px; text-align: center; color: #666; font-size: 0.9em;">${receta.ingredientes ? receta.ingredientes.slice(0, 3).join(', ') + (receta.ingredientes.length > 3 ? '...' : '') : 'N/A'}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    tablaContainer.innerHTML = html;
    container.appendChild(tablaContainer);
    
    // Actualizar paginación para resultados
    actualizarPaginacionResultados();
    paginacionTarjetas.style.display = "flex";
}

// Actualizar paginación para resultados de búsqueda
function actualizarPaginacionResultados() {
    const totalPaginas = Math.ceil(productosFiltrados.length / resultadosPorPagina);
    const btnAnterior = document.getElementById('anterior');
    const btnSiguiente = document.getElementById('siguiente');
    const spanPagina = document.getElementById('pagina-actual');
    
    btnAnterior.disabled = paginaActualTabla <= 1;
    btnSiguiente.disabled = paginaActualTabla >= totalPaginas || totalPaginas <= 1;
    
    if (totalPaginas > 0) {
        spanPagina.textContent = `Página ${paginaActualTabla} de ${totalPaginas} (${productosFiltrados.length} resultados)`;
    } else {
        spanPagina.textContent = `Sin resultados`;
    }
}

// Cambiar página (funciona para tarjetas y resultados)
function cambiarPagina(direccion) {
    if (modoVista === 'resultados') {
        const totalPaginas = Math.ceil(productosFiltrados.length / resultadosPorPagina);
        const paginaAnterior = paginaActualTabla;
        
        if (direccion === 1 && paginaActualTabla < totalPaginas) {
            paginaActualTabla++;
        } else if (direccion === -1 && paginaActualTabla > 1) {
            paginaActualTabla--;
        } else {
            return;
        }
        
        if (paginaAnterior !== paginaActualTabla) {
            mostrarResultadosEnGrid();
        }
    } else {
        const totalPaginas = Math.ceil(todasLasRecetas.length / recetasPorPagina);
        const paginaAnterior = paginaActual;
        
        if (direccion === 1 && paginaActual < totalPaginas) {
            paginaActual++;
        } else if (direccion === -1 && paginaActual > 1) {
            paginaActual--;
        } else {
            return;
        }
        
        if (paginaAnterior !== paginaActual) {
            cargarTarjetas();
        }
    }
}

// Cambiar página de tabla (para compatibilidad)
function cambiarPaginaTabla(nuevaPagina) {
    paginaActualTabla = nuevaPagina;
    if (modoVista === 'resultados') {
        mostrarResultadosEnGrid();
    }
}

// Limpiar filtros de búsqueda
function limpiarFiltros() {
    document.getElementById("filtro-nombre").value = "";
    document.getElementById("filtro-categoria").value = "";
    document.getElementById("filtro-precio-max").value = "";
}

// Limpiar búsqueda y regresar a productos
function limpiarBusqueda() {
    limpiarFiltros();
    productosFiltrados = [];
    paginaActualTabla = 1;
    modoVista = 'tarjetas';
    
    cargarTarjetas();
}

// Funciones de compatibilidad
function regresarAProductos() {
    limpiarBusqueda();
}

function mostrarTarjetas() {
    limpiarBusqueda();
}

function renderizarTabla() {
    mostrarResultadosEnGrid();
}

// Precargar imágenes locales
function precargarImagenesLocales() {
    recetas.slice(0, 10).forEach(receta => {
        if (receta.imagen.startsWith('images/')) {
            const img = new Image();
            img.src = receta.imagen;
        }
    });
}

// Verificar conectividad
function verificarConectividad() {
    precargarImagenesLocales();
    
    const imgTest = new Image();
    imgTest.src = 'https://images.unsplash.com/photo-1621996346565-e3dbc353d946?w=50&h=50&fit=crop';
    
    // Escuchar cambios cuando se regresa de otra página
    window.addEventListener('focus', function() {
        const recetasActuales = todasLasRecetas.length;
        cargarTodasLasRecetas();
        
        if (todasLasRecetas.length > recetasActuales && paginaActual === 1) {
            cargarTarjetas();
        }
    });
}

// Función para refrescar recetas manualmente
function refrescarRecetas() {
    cargarTodasLasRecetas();
    cargarTarjetas();
}