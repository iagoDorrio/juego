// 🌸 EL JARDÍN DE LAS LETRAS DE RAQUEL 🌸
// Controlador principal de la aplicación

// Estado de la aplicación
const App = {
    pantallaActual: 'pantalla-bienvenida',
    
    // Inicializar aplicación
    init() {
        console.log('🌸 Iniciando El Jardín de las Letras...');
        
        // Inicializar sistemas
        StorageManager.init();
        AudioSynth.init();
        
        // Cargar progreso
        this.cargarProgreso();
        
        // Generar flores decorativas
        this.generarFloresDecorativas();
        
        // Configurar event listeners
        this.configurarEventos();
        
        console.log('✅ Aplicación iniciada correctamente');
    },
    
    // Cargar progreso del usuario
    cargarProgreso() {
        const progreso = StorageManager.obtenerProgreso();
        const estadisticas = StorageManager.obtenerEstadisticas();
        
        // Actualizar UI del menú principal
        const estrellasTotalEl = document.getElementById('estrellas-total');
        const letrasDominadasEl = document.getElementById('letras-dominadas');
        
        if (estrellasTotalEl) {
            estrellasTotalEl.textContent = progreso.estrellas || 0;
        }
        
        if (letrasDominadasEl) {
            letrasDominadasEl.textContent = progreso.letrasDominadas.length || 0;
        }
        
        // Actualizar estadísticas
        const tiempoJugadoEl = document.getElementById('tiempo-jugado');
        const totalEstrellasEl = document.getElementById('total-estrellas');
        const letrasAprendidasEl = document.getElementById('letras-aprendidas');
        const aciertosTotalesEl = document.getElementById('aciertos-totales');
        
        if (tiempoJugadoEl) {
            tiempoJugadoEl.textContent = Math.floor(estadisticas.tiempoJugado / 60);
        }
        if (totalEstrellasEl) {
            totalEstrellasEl.textContent = progreso.estrellas || 0;
        }
        if (letrasAprendidasEl) {
            letrasAprendidasEl.textContent = progreso.letrasDominadas.length || 0;
        }
        if (aciertosTotalesEl) {
            aciertosTotalesEl.textContent = estadisticas.aciertos || 0;
        }
    },
    
    // Generar flores decorativas en pantalla de bienvenida
    generarFloresDecorativas() {
        const container = document.getElementById('flores-decorativas');
        if (!container) return;
        
        for (let i = 0; i < 5; i++) {
            const div = document.createElement('div');
            div.innerHTML = LetterGenerator.generarFlorDecorativa(60);
            container.appendChild(div);
        }
    },
    
    // Configurar eventos
    configurarEventos() {
        // Prevenir refresh accidental en móviles
        document.body.addEventListener('touchmove', (e) => {
            if (e.target === document.body) {
                e.preventDefault();
            }
        }, { passive: false });
    },
    
    // Mostrar pantalla
    mostrarPantalla(idPantalla) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.pantalla').forEach(pantalla => {
            pantalla.classList.remove('activa');
        });
        
        // Mostrar pantalla seleccionada
        const pantalla = document.getElementById(idPantalla);
        if (pantalla) {
            pantalla.classList.add('activa');
            this.pantallaActual = idPantalla;
        }
    }
};

// Funciones globales para navegación (llamadas desde HTML)
function mostrarMenu() {
    App.mostrarPantalla('menu-principal');
    App.cargarProgreso();
}

function volverAlMenu() {
    AudioSynth.detener();
    App.mostrarPantalla('menu-principal');
    App.cargarProgreso();
}

function iniciarModulo(moduloId) {
    switch(moduloId) {
        case 'conoce-letras':
            App.mostrarPantalla('pantalla-conoce-letras');
            GameEngine.conoceLetras.iniciar();
            break;
        case 'encuentra-letra':
            App.mostrarPantalla('pantalla-encuentra-letra');
            GameEngine.encuentraLetra.iniciar();
            break;
        case 'forma-palabras':
            App.mostrarPantalla('pantalla-forma-palabras');
            GameEngine.formaPalabras.iniciar();
            break;
        case 'jardin-silabas':
            App.mostrarPantalla('pantalla-jardin-silabas');
            GameEngine.jardinSilabas.iniciar();
            break;
        case 'camino-abecedario':
            App.mostrarPantalla('pantalla-camino-abecedario');
            GameEngine.caminoAbecedario.iniciar();
            break;
    }
}

function mostrarEstadisticas() {
    App.mostrarPantalla('pantalla-estadisticas');
    App.cargarProgreso();
}

function mostrarCelebracion(mensaje) {
    const modal = document.getElementById('modal-celebracion');
    const mensajeEl = document.getElementById('mensaje-celebracion');
    
    if (modal && mensajeEl) {
        mensajeEl.textContent = mensaje;
        modal.classList.add('activo');
        
        // Crear partículas de celebración
        crearParticulas();
    }
}

function cerrarModal() {
    const modal = document.getElementById('modal-celebracion');
    if (modal) {
        modal.classList.remove('activo');
    }
}

function crearParticulas() {
    const modal = document.getElementById('modal-celebracion');
    if (!modal) return;
    
    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'fixed';
        particula.style.fontSize = '2rem';
        particula.textContent = ['⭐', '🌸', '🌼', '🌺', '✨'][Math.floor(Math.random() * 5)];
        particula.style.left = Math.random() * window.innerWidth + 'px';
        particula.style.top = Math.random() * window.innerHeight + 'px';
        particula.style.pointerEvents = 'none';
        particula.style.zIndex = '9999';
        particula.style.animation = 'particulas 2s ease-out forwards';
        
        document.body.appendChild(particula);
        
        setTimeout(() => particula.remove(), 2000);
    }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

function reiniciarJuego() {
    const confirmacion = confirm(
        '⚠️ ¿Estás seguro de que quieres reiniciar el juego?\n\n' +
        'Esto borrará:\n' +
        '• Todas las estrellas ganadas\n' +
        '• Todas las letras aprendidas\n' +
        '• Todas las palabras completadas\n' +
        '• Todas las estadísticas\n\n' +
        'Esta acción NO se puede deshacer.'
    );
    
    if (confirmacion) {
        // Borrar todo el progreso
        StorageManager.resetear();
        
        // Recargar la página para aplicar los cambios
        location.reload();
    }
}

// Exportar funciones globalmente
window.App = App;
window.mostrarMenu = mostrarMenu;
window.volverAlMenu = volverAlMenu;
window.iniciarModulo = iniciarModulo;
window.mostrarEstadisticas = mostrarEstadisticas;
window.mostrarCelebracion = mostrarCelebracion;
window.cerrarModal = cerrarModal;
window.reiniciarJuego = reiniciarJuego;

// Protección contra errores
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
});
