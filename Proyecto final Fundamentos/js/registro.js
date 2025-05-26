document.addEventListener('DOMContentLoaded', function() {
    inicializarFormulario();
});

// Inicializar el formulario
function inicializarFormulario() {
    const form = document.getElementById('form-receta');
    form.addEventListener('submit', validarYRegistrar);
    
    // Validación en tiempo real
    document.getElementById('codigo').addEventListener('input', validarCodigoTiempoReal);
    document.getElementById('nombre').addEventListener('input', validarNombreTiempoReal);
    document.getElementById('precio').addEventListener('input', formatearPrecio);
}

// Función principal de validación y registro
function validarYRegistrar(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value,
        precio: parseInt(document.getElementById('precio').value),
        codigo: document.getElementById('codigo').value.trim(),
        tiempoPreparacion: document.getElementById('tiempo').value.trim() || 'No especificado',
        ingredientes: ['Ingredientes', 'por', 'especificar'] // Placeholder
    };
    
    // Validar campos requeridos
    if (!validarCamposRequeridos(datos)) {
        mostrarError('Por favor, completa todos los campos obligatorios marcados con *');
        return;
    }
    
    // Validar nombre (máximo 20 caracteres)
    if (!validarNombre(datos.nombre)) {
        mostrarError('El nombre no puede superar los 20 caracteres.');
        marcarCampoError('nombre');
        return;
    }
    
    // Validar precio (solo números, formato pesos)
    if (!validarPrecio(datos.precio)) {
        mostrarError('El precio debe ser un número válido mayor a 0.');
        marcarCampoError('precio');
        return;
    }
    
    // Validar código único
    if (codigoYaExiste(datos.codigo)) {
        mostrarError('Ya existe una receta con ese código. Por favor usa uno diferente.');
        marcarCampoError('codigo');
        return;
    }
    
    // Validar código (requisitos específicos del PDF)
    if (!validarCodigo(datos.codigo)) {
        mostrarError('El código no cumple con los requisitos.');
        marcarCampoError('codigo');
        // Redirigir a indicaciones como especifica el PDF
        setTimeout(() => {
            alert('Serás redirigido a la página de indicaciones para revisar los requisitos.');
            window.location.href = 'indicaciones.html';
        }, 2000);
        return;
    }
    
    // Si todas las validaciones pasan, guardar la receta
    guardarNuevaReceta(datos);
    registroExitoso(datos);
}

// Verificar si el código ya existe
function codigoYaExiste(codigo) {
    // Verificar en recetas originales
    const existeEnOriginales = recetas.some(receta => receta.codigo === codigo);
    if (existeEnOriginales) return true;
    
    // Verificar en recetas guardadas
    const recetasGuardadas = obtenerRecetasGuardadas();
    return recetasGuardadas.some(receta => receta.codigo === codigo);
}

// Guardar nueva receta
function guardarNuevaReceta(datos) {
    // Determinar la ruta de imagen
    let rutaImagen;
    if (datos.imagen.startsWith('http')) {
        rutaImagen = datos.imagen;
    } else {
        rutaImagen = `images/${datos.imagen}`;
    }
    
    const nuevaReceta = {
        nombre: datos.nombre,
        categoria: datos.categoria,
        imagen: rutaImagen,
        precio: datos.precio,
        codigo: datos.codigo,
        tiempoPreparacion: datos.tiempoPreparacion,
        ingredientes: ['Ingredientes', 'por', 'especificar'],
        fechaCreacion: new Date().toISOString(),
        esNueva: true
    };
    
    // Solo usar localStorage si está disponible
    if (typeof(Storage) !== "undefined") {
        try {
            let recetasGuardadas = obtenerRecetasGuardadas();
            recetasGuardadas.push(nuevaReceta);
            localStorage.setItem('recetasPersonalizadas', JSON.stringify(recetasGuardadas));
        } catch (error) {
            // Si hay error con localStorage, continuar sin guardar
        }
    }
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

// Validar campos requeridos
function validarCamposRequeridos(datos) {
    return datos.nombre && datos.categoria && datos.imagen && datos.precio && datos.codigo;
}

// Validar nombre (String, máximo 20 caracteres)
function validarNombre(nombre) {
    return nombre && nombre.length <= 20;
}

// Validar precio (solo números, formato pesos)
function validarPrecio(precio) {
    const precioNum = parseInt(precio);
    return !isNaN(precioNum) && precioNum > 0;
}

// Validar código (Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 2 números)
function validarCodigo(codigo) {
    if (!codigo || codigo.length < 8) {
        return false;
    }
    
    const tieneMayuscula = /[A-Z]/.test(codigo);
    const tieneMinuscula = /[a-z]/.test(codigo);
    const tieneNumeros = (codigo.match(/\d/g) || []).length >= 2;
    
    return tieneMayuscula && tieneMinuscula && tieneNumeros;
}

// Validación en tiempo real del código
function validarCodigoTiempoReal() {
    const codigo = this.value;
    const campo = document.getElementById('codigo');
    
    if (codigo.length === 0) {
        limpiarEstadoCampo('codigo');
        return;
    }
    
    // Verificar si ya existe
    if (codigoYaExiste(codigo)) {
        marcarCampoError('codigo');
        return;
    }
    
    if (validarCodigo(codigo)) {
        marcarCampoExito('codigo');
    } else {
        marcarCampoError('codigo');
    }
}

// Validación en tiempo real del nombre
function validarNombreTiempoReal() {
    const nombre = this.value;
    
    if (nombre.length === 0) {
        limpiarEstadoCampo('nombre');
        return;
    }
    
    if (validarNombre(nombre)) {
        marcarCampoExito('nombre');
    } else {
        marcarCampoError('nombre');
    }
}

// Formatear precio en tiempo real
function formatearPrecio() {
    const precio = this.value;
    // Solo permitir números
    this.value = precio.replace(/[^0-9]/g, '');
}

// Marcar campo con error
function marcarCampoError(campoId) {
    const campo = document.getElementById(campoId);
    campo.classList.remove('success');
    campo.classList.add('error');
}

// Marcar campo exitoso
function marcarCampoExito(campoId) {
    const campo = document.getElementById(campoId);
    campo.classList.remove('error');
    campo.classList.add('success');
}

// Limpiar estado del campo
function limpiarEstadoCampo(campoId) {
    const campo = document.getElementById(campoId);
    campo.classList.remove('error', 'success');
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    const errorAnterior = document.querySelector('.error-message-global');
    if (errorAnterior) {
        errorAnterior.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-global';
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
        text-align: center;
        font-weight: bold;
    `;
    errorDiv.textContent = mensaje;
    
    const form = document.getElementById('form-receta');
    form.insertBefore(errorDiv, form.firstChild);
    
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Registro exitoso
function registroExitoso(datos) {
    const errorAnterior = document.querySelector('.error-message-global');
    if (errorAnterior) {
        errorAnterior.remove();
    }
    
    const exitoDiv = document.createElement('div');
    exitoDiv.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #c3e6cb;
        text-align: center;
        font-weight: bold;
        font-size: 1.1em;
    `;
    exitoDiv.innerHTML = `
        <h3 style="margin-top: 0; color: #155724;">✅ ¡Receta registrada con éxito!</h3>
        <p style="margin-bottom: 0;">La receta "${datos.nombre}" ha sido añadida al menú del restaurante.</p>
        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">Redirigiendo a la vista de recetas...</p>
    `;
    
    const form = document.getElementById('form-receta');
    form.insertBefore(exitoDiv, form.firstChild);
    
    exitoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Redirigir a la vista principal después de 3 segundos
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 3000);
}

// Limpiar todos los campos del formulario
function limpiarCampos() {
    const form = document.getElementById('form-receta');
    form.reset();
    
    const campos = ['nombre', 'codigo', 'precio'];
    campos.forEach(campoId => {
        limpiarEstadoCampo(campoId);
    });
    
    const errorAnterior = document.querySelector('.error-message-global');
    if (errorAnterior) {
        errorAnterior.remove();
    }
    
    const form_section = document.querySelector('.form-section');
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        background-color: #fff3cd;
        color: #856404;
        padding: 10px 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        border: 1px solid #ffeaa7;
        text-align: center;
    `;
    mensaje.textContent = 'Campos limpiados correctamente';
    
    form_section.insertBefore(mensaje, form_section.firstChild);
    
    setTimeout(() => {
        if (mensaje.parentNode) {
            mensaje.remove();
        }
    }, 2000);
}