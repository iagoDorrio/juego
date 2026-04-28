// ============================================
// 🌸 SISTEMA DE ALMACENAMIENTO LOCAL
// Gestión de progreso con LocalStorage
// ============================================

const StorageManager = {
    // Clave para LocalStorage
    STORAGE_KEY: 'jardin_letras_raquel_progreso',
    
    // Estructura de datos por defecto
    datosDefecto: {
        nombre: 'Raquel',
        progreso: {
            vocalesDominadas: ['A', 'E', 'I', 'O', 'U'],
            consonantesDominadas: [],
            letrasDominadas: ['A', 'E', 'I', 'O', 'U'],
            palabrasCompletadas: [],
            silabasAprendidas: [],
            nivelActual: 1,
            estrellas: 0
        },
        estadisticas: {
            tiempoJugado: 0,
            intentosTotales: 0,
            aciertos: 0,
            palabrasFormadas: 0
        },
        configuracion: {
            audioHabilitado: true,
            velocidadVoz: 0.8,
            volumen: 1.0
        },
        ultimaFechaJuego: new Date().toISOString()
    },
    
    // Inicializar almacenamiento
    init() {
        const datos = this.cargar();
        if (!datos) {
            this.guardar(this.datosDefecto);
            return this.datosDefecto;
        }
        return datos;
    },
    
    // Cargar datos del LocalStorage
    cargar() {
        try {
            const datosJSON = localStorage.getItem(this.STORAGE_KEY);
            if (!datosJSON) return null;
            return JSON.parse(datosJSON);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            return null;
        }
    },
    
    // Guardar datos en LocalStorage
    guardar(datos) {
        try {
            datos.ultimaFechaJuego = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(datos));
            return true;
        } catch (error) {
            console.error('Error al guardar datos:', error);
            return false;
        }
    },
    
    // Actualizar progreso de letra
    agregarLetraDominada(letra) {
        const datos = this.cargar() || this.datosDefecto;
        if (!datos.progreso.letrasDominadas.includes(letra)) {
            datos.progreso.letrasDominadas.push(letra);
            
            // Agregar a vocales o consonantes según corresponda
            if (DATOS_JUEGO.vocales.includes(letra)) {
                datos.progreso.vocalesDominadas.push(letra);
            } else {
                datos.progreso.consonantesDominadas.push(letra);
            }
            
            this.guardar(datos);
        }
    },
    
    // Agregar palabra completada
    agregarPalabraCompletada(palabra) {
        const datos = this.cargar() || this.datosDefecto;
        if (!datos.progreso.palabrasCompletadas.includes(palabra)) {
            datos.progreso.palabrasCompletadas.push(palabra);
            datos.estadisticas.palabrasFormadas++;
            this.guardar(datos);
        }
    },
    
    // Agregar sílaba aprendida
    agregarSilabaAprendida(silaba) {
        const datos = this.cargar() || this.datosDefecto;
        if (!datos.progreso.silabasAprendidas.includes(silaba)) {
            datos.progreso.silabasAprendidas.push(silaba);
            this.guardar(datos);
        }
    },
    
    // Agregar estrellas
    agregarEstrellas(cantidad) {
        const datos = this.cargar() || this.datosDefecto;
        datos.progreso.estrellas += cantidad;
        this.guardar(datos);
    },
    
    // Actualizar estadísticas
    actualizarEstadisticas(acierto = true, tiempoSegundos = 0) {
        const datos = this.cargar() || this.datosDefecto;
        datos.estadisticas.intentosTotales++;
        if (acierto) {
            datos.estadisticas.aciertos++;
        }
        datos.estadisticas.tiempoJugado += tiempoSegundos;
        this.guardar(datos);
    },
    
    // Obtener progreso
    obtenerProgreso() {
        const datos = this.cargar() || this.datosDefecto;
        return datos.progreso;
    },
    
    // Obtener estadísticas
    obtenerEstadisticas() {
        const datos = this.cargar() || this.datosDefecto;
        return datos.estadisticas;
    },
    
    // Obtener configuración
    obtenerConfiguracion() {
        const datos = this.cargar() || this.datosDefecto;
        return datos.configuracion;
    },
    
    // Actualizar configuración
    actualizarConfiguracion(nuevaConfig) {
        const datos = this.cargar() || this.datosDefecto;
        datos.configuracion = { ...datos.configuracion, ...nuevaConfig };
        this.guardar(datos);
    },
    
    // Resetear progreso
    resetear() {
        this.guardar(this.datosDefecto);
    },
    
    // Exportar datos (para respaldo)
    exportar() {
        const datos = this.cargar();
        return JSON.stringify(datos, null, 2);
    },
    
    // Importar datos (desde respaldo)
    importar(datosJSON) {
        try {
            const datos = JSON.parse(datosJSON);
            this.guardar(datos);
            return true;
        } catch (error) {
            console.error('Error al importar datos:', error);
            return false;
        }
    }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    StorageManager.init();
});
