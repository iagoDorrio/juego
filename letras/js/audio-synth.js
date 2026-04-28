// ============================================
// 🌸 SISTEMA DE AUDIO SINTETIZADO
// Web Speech API - Sin archivos de audio externos
// ============================================

const AudioSynth = {
    // Configuración
    habilitado: true,
    vozSeleccionada: null,
    vozesDisponibles: [],
    
    // Inicializar
    init() {
        if ('speechSynthesis' in window) {
            // Cargar voces disponibles
            this.cargarVoces();
            
            // Evento cuando las voces están disponibles
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = () => this.cargarVoces();
            }
            
            // Cargar configuración guardada
            const config = StorageManager.obtenerConfiguracion();
            this.habilitado = config.audioHabilitado;
        } else {
            console.warn('Web Speech API no disponible');
            this.habilitado = false;
        }
    },
    
    // Cargar voces disponibles
    cargarVoces() {
        this.vozesDisponibles = speechSynthesis.getVoices();
        
        // Buscar voz en español
        this.vozSeleccionada = this.vozesDisponibles.find(voz => 
            voz.lang.includes('es')
        ) || this.vozesDisponibles[0];
    },
    
    // Hablar texto
    hablar(texto, opciones = {}) {
        if (!this.habilitado || !texto) return;
        
        // Cancelar habla anterior
        speechSynthesis.cancel();
        
        // Crear utterance
        const utterance = new SpeechSynthesisUtterance(texto);
        
        // Configuración
        const config = StorageManager.obtenerConfiguracion();
        utterance.lang = 'es-ES';
        utterance.rate = opciones.velocidad || config.velocidadVoz || 0.8;
        utterance.pitch = opciones.tono || 1.2; // Tono más alto para niños
        utterance.volume = opciones.volumen || config.volumen || 1.0;
        
        // Asignar voz
        if (this.vozSeleccionada) {
            utterance.voice = this.vozSeleccionada;
        }
        
        // Callbacks opcionales
        if (opciones.onStart) {
            utterance.onstart = opciones.onStart;
        }
        if (opciones.onEnd) {
            utterance.onend = opciones.onEnd;
        }
        if (opciones.onError) {
            utterance.onerror = opciones.onError;
        }
        
        // Hablar
        speechSynthesis.speak(utterance);
    },
    
    // Pronunciar letra
    pronunciarLetra(letra) {
        this.hablar(letra, { velocidad: 0.7 });
    },
    
    // Pronunciar palabra
    pronunciarPalabra(palabra) {
        // Separar letras con espacio para pronunciación más clara
        const palabraSeparada = palabra.split('').join(' ');
        this.hablar(palabraSeparada, { velocidad: 0.6 });
    },
    
    // Pronunciar sílaba
    pronunciarSilaba(silaba) {
        this.hablar(silaba, { velocidad: 0.7 });
    },
    
    // Pronunciar instrucción
    pronunciarInstruccion(texto) {
        this.hablar(texto, { velocidad: 0.8, tono: 1.0 });
    },
    
    // Sonido de celebración
    celebrar() {
        const mensajes = DATOS_JUEGO.mensajesCelebracion;
        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
        this.hablar(mensaje, { velocidad: 1.0, tono: 1.5 });
    },
    
    // Sonido de ánimo
    animar() {
        const mensajes = DATOS_JUEGO.mensajesAnimo;
        const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
        this.hablar(mensaje, { velocidad: 0.9, tono: 1.3 });
    },
    
    // Detener audio
    detener() {
        speechSynthesis.cancel();
    },
    
    // Toggle audio
    toggle() {
        this.habilitado = !this.habilitado;
        StorageManager.actualizarConfiguracion({ audioHabilitado: this.habilitado });
        
        if (this.habilitado) {
            this.hablar('Audio activado');
        }
    },
    
    // Verificar si está hablando
    estaHablando() {
        return speechSynthesis.speaking;
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    AudioSynth.init();
});