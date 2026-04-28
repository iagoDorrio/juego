// Motor del Juego de Memoria Mágica ✨

const MemoryGameEngine = {
    juego: {
        nivel: 'facil', // facil, medio, dificil, experto
        tema: 'animales',
        cartas: [],
        cartasVolteadas: [],
        parejasEncontradas: 0,
        movimientos: 0,
        tiempoInicio: null,
        bloqueado: false
    },

    niveles: {
        facil: { pares: 4, nombre: 'Fácil' },
        medio: { pares: 6, nombre: 'Medio' },
        dificil: { pares: 8, nombre: 'Difícil' },
        experto: { pares: 12, nombre: 'Experto' }
    },

    temas: {
        animales: [
            { id: 'perro', emoji: '🐕', nombre: 'Perro' },
            { id: 'gato', emoji: '🐱', nombre: 'Gato' },
            { id: 'conejo', emoji: '🐰', nombre: 'Conejo' },
            { id: 'pajaro', emoji: '🐦', nombre: 'Pájaro' },
            { id: 'pez', emoji: '🐠', nombre: 'Pez' },
            { id: 'mariposa', emoji: '🦋', nombre: 'Mariposa' },
            { id: 'abeja', emoji: '🐝', nombre: 'Abeja' },
            { id: 'tortuga', emoji: '🐢', nombre: 'Tortuga' },
            { id: 'rana', emoji: '🐸', nombre: 'Rana' },
            { id: 'leon', emoji: '🦁', nombre: 'León' },
            { id: 'elefante', emoji: '🐘', nombre: 'Elefante' },
            { id: 'jirafa', emoji: '🦒', nombre: 'Jirafa' }
        ],
        frutas: [
            { id: 'manzana', emoji: '🍎', nombre: 'Manzana' },
            { id: 'platano', emoji: '🍌', nombre: 'Plátano' },
            { id: 'naranja', emoji: '🍊', nombre: 'Naranja' },
            { id: 'uva', emoji: '🍇', nombre: 'Uva' },
            { id: 'fresa', emoji: '🍓', nombre: 'Fresa' },
            { id: 'sandia', emoji: '🍉', nombre: 'Sandía' },
            { id: 'cereza', emoji: '🍒', nombre: 'Cereza' },
            { id: 'pera', emoji: '🍐', nombre: 'Pera' },
            { id: 'melon', emoji: '🍈', nombre: 'Melón' },
            { id: 'piña', emoji: '🍍', nombre: 'Piña' },
            { id: 'mango', emoji: '🥭', nombre: 'Mango' },
            { id: 'limon', emoji: '🍋', nombre: 'Limón' }
        ],
        colores: [
            { id: 'rojo', emoji: '🔴', nombre: 'Rojo' },
            { id: 'azul', emoji: '🔵', nombre: 'Azul' },
            { id: 'amarillo', emoji: '🟡', nombre: 'Amarillo' },
            { id: 'verde', emoji: '🟢', nombre: 'Verde' },
            { id: 'morado', emoji: '🟣', nombre: 'Morado' },
            { id: 'naranja', emoji: '🟠', nombre: 'Naranja' },
            { id: 'rosa', emoji: '🩷', nombre: 'Rosa' },
            { id: 'marron', emoji: '🟤', nombre: 'Marrón' },
            { id: 'negro', emoji: '⚫', nombre: 'Negro' },
            { id: 'blanco', emoji: '⚪', nombre: 'Blanco' },
            { id: 'gris', emoji: '⚪', nombre: 'Gris' },
            { id: 'celeste', emoji: '🔵', nombre: 'Celeste' }
        ],
        profesiones: [
            { id: 'doctor', emoji: '👨‍⚕️', nombre: 'Doctor' },
            { id: 'bombero', emoji: '👨‍🚒', nombre: 'Bombero' },
            { id: 'policia', emoji: '👮', nombre: 'Policía' },
            { id: 'profesor', emoji: '👨‍🏫', nombre: 'Profesor' },
            { id: 'cocinero', emoji: '👨‍🍳', nombre: 'Cocinero' },
            { id: 'artista', emoji: '👨‍🎨', nombre: 'Artista' },
            { id: 'musico', emoji: '👨‍🎤', nombre: 'Músico' },
            { id: 'astronauta', emoji: '👨‍🚀', nombre: 'Astronauta' },
            { id: 'granjero', emoji: '👨‍🌾', nombre: 'Granjero' },
            { id: 'constructor', emoji: '👷', nombre: 'Constructor' },
            { id: 'piloto', emoji: '👨‍✈️', nombre: 'Piloto' },
            { id: 'cientifico', emoji: '👨‍🔬', nombre: 'Científico' }
        ]
    },

    iniciar() {
        // Resetear el juego
        this.juego = {
            nivel: null,
            tema: null,
            cartas: [],
            cartasVolteadas: [],
            parejasEncontradas: 0,
            movimientos: 0,
            bloqueado: false,
            tiempoInicio: null
        };
        
        // Mostrar selector y ocultar tablero
        const selector = document.getElementById('selector-nivel-tema');
        const tablero = document.getElementById('tablero-memoria');
        
        if (selector) {
            selector.style.display = 'block';
            this.mostrarSelectorNivelTema();
        }
        
        if (tablero) {
            tablero.style.display = 'none';
            tablero.innerHTML = '';
        }
        
        // Inicializar UI
        this.actualizarUI();
    },

    iniciarJuego(nivel, tema) {
        this.juego.nivel = nivel;
        this.juego.tema = tema;
        this.juego.movimientos = 0;
        this.juego.parejasEncontradas = 0;
        this.juego.cartasVolteadas = [];
        this.juego.bloqueado = false;
        this.juego.tiempoInicio = Date.now();
        
        this.generarCartas();
        this.mostrarTablero();
        this.actualizarUI();
    },

    generarCartas() {
        const numPares = this.niveles[this.juego.nivel].pares;
        const itemsTema = this.temas[this.juego.tema];
        
        // Seleccionar items aleatorios del tema
        const itemsSeleccionados = [];
        const itemsDisponibles = [...itemsTema];
        
        for (let i = 0; i < numPares; i++) {
            const randomIndex = Math.floor(Math.random() * itemsDisponibles.length);
            itemsSeleccionados.push(itemsDisponibles.splice(randomIndex, 1)[0]);
        }
        
        // Crear pares de cartas
        this.juego.cartas = [];
        itemsSeleccionados.forEach((item, index) => {
            this.juego.cartas.push({
                id: `carta-${index}-a`,
                itemId: item.id,
                emoji: item.emoji,
                nombre: item.nombre,
                encontrada: false
            });
            this.juego.cartas.push({
                id: `carta-${index}-b`,
                itemId: item.id,
                emoji: item.emoji,
                nombre: item.nombre,
                encontrada: false
            });
        });
        
        // Mezclar cartas
        this.mezclarCartas();
    },

    mezclarCartas() {
        for (let i = this.juego.cartas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.juego.cartas[i], this.juego.cartas[j]] = [this.juego.cartas[j], this.juego.cartas[i]];
        }
    },

    mostrarTablero() {
        const tablero = document.getElementById('tablero-memoria');
        if (!tablero) return;
        
        tablero.innerHTML = '';
        
        // Determinar columnas según nivel
        const columnas = this.juego.nivel === 'experto' ? 6 : 
                        this.juego.nivel === 'dificil' ? 4 : 
                        this.juego.nivel === 'medio' ? 4 : 3;
        
        tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
        
        this.juego.cartas.forEach(carta => {
            const cartaEl = document.createElement('div');
            cartaEl.className = 'carta-memoria';
            cartaEl.dataset.cartaId = carta.id;
            cartaEl.dataset.itemId = carta.itemId;
            
            cartaEl.innerHTML = `
                <div class="carta-interior">
                    <div class="carta-frente">❓</div>
                    <div class="carta-reverso">${carta.emoji}</div>
                </div>
            `;
            
            cartaEl.onclick = () => this.voltearCarta(carta.id);
            tablero.appendChild(cartaEl);
        });
    },

    voltearCarta(cartaId) {
        if (this.juego.bloqueado) return;
        if (this.juego.cartasVolteadas.length >= 2) return;
        
        const carta = this.juego.cartas.find(c => c.id === cartaId);
        if (!carta || carta.encontrada) return;
        if (this.juego.cartasVolteadas.includes(cartaId)) return;
        
        // Voltear visualmente
        const cartaEl = document.querySelector(`[data-carta-id="${cartaId}"]`);
        if (!cartaEl) return;
        
        cartaEl.classList.add('volteada');
        this.juego.cartasVolteadas.push(cartaId);
        
        if (typeof AudioSynth !== 'undefined') AudioSynth.animar();
        
        // Si se han volteado 2 cartas, verificar pareja
        if (this.juego.cartasVolteadas.length === 2) {
            this.juego.movimientos++;
            this.actualizarUI();
            this.verificarPareja();
        }
    },

    verificarPareja() {
        this.juego.bloqueado = true;
        
        const [id1, id2] = this.juego.cartasVolteadas;
        const carta1 = this.juego.cartas.find(c => c.id === id1);
        const carta2 = this.juego.cartas.find(c => c.id === id2);
        
        if (carta1.itemId === carta2.itemId) {
            // ¡Pareja encontrada!
            setTimeout(() => {
                carta1.encontrada = true;
                carta2.encontrada = true;
                
                const cartaEl1 = document.querySelector(`[data-carta-id="${id1}"]`);
                const cartaEl2 = document.querySelector(`[data-carta-id="${id2}"]`);
                
                cartaEl1.classList.add('encontrada');
                cartaEl2.classList.add('encontrada');
                
                this.juego.parejasEncontradas++;
                this.juego.cartasVolteadas = [];
                this.juego.bloqueado = false;
                
                if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                
                // Verificar si el juego ha terminado
                if (this.juego.parejasEncontradas === this.niveles[this.juego.nivel].pares) {
                    this.finalizarJuego();
                }
            }, 500);
        } else {
            // No es pareja, voltear de nuevo
            setTimeout(() => {
                const cartaEl1 = document.querySelector(`[data-carta-id="${id1}"]`);
                const cartaEl2 = document.querySelector(`[data-carta-id="${id2}"]`);
                
                cartaEl1.classList.remove('volteada');
                cartaEl2.classList.remove('volteada');
                
                this.juego.cartasVolteadas = [];
                this.juego.bloqueado = false;
            }, 1000);
        }
    },

    actualizarUI() {
        const movimientosEl = document.getElementById('movimientos-memoria');
        const parejasEl = document.getElementById('parejas-memoria');
        
        if (movimientosEl) {
            movimientosEl.textContent = this.juego.movimientos;
        }
        
        if (parejasEl) {
            if (this.juego.nivel && this.niveles[this.juego.nivel]) {
                const totalParejas = this.niveles[this.juego.nivel].pares;
                parejasEl.textContent = `${this.juego.parejasEncontradas}/${totalParejas}`;
            } else {
                parejasEl.textContent = '0/0';
            }
        }
    },

    finalizarJuego() {
        const tiempoTotal = Math.floor((Date.now() - this.juego.tiempoInicio) / 1000);
        const minutos = Math.floor(tiempoTotal / 60);
        const segundos = tiempoTotal % 60;
        
        setTimeout(() => {
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
            
            const mensaje = `¡Felicidades Raquel! 🎉✨\n\n` +
                          `Has completado el nivel ${this.niveles[this.juego.nivel].nombre}\n` +
                          `Movimientos: ${this.juego.movimientos}\n` +
                          `Tiempo: ${minutos}:${segundos.toString().padStart(2, '0')}\n\n` +
                          `¡Eres increíble! 🌟`;
            
            this.mostrarCelebracion(mensaje);
        }, 500);
    },

    mostrarCelebracion(mensaje) {
        const modal = document.getElementById('modal-celebracion');
        const mensajeElem = document.getElementById('mensaje-celebracion');
        
        if (modal && mensajeElem) {
            mensajeElem.textContent = mensaje;
            modal.classList.add('activo');
            
            // Crear partículas de celebración
            this.crearParticulasCelebracion();
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                modal.classList.remove('activo');
            }, 3000);
        }
    },
    
    crearParticulasCelebracion() {
        const emojis = ['⭐', '✨', '🎉', '🎊', '🌟', '💫'];
        for (let i = 0; i < 20; i++) {
            const particula = document.createElement('div');
            particula.style.position = 'fixed';
            particula.style.fontSize = '2rem';
            particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particula.style.left = Math.random() * window.innerWidth + 'px';
            particula.style.top = Math.random() * window.innerHeight + 'px';
            particula.style.pointerEvents = 'none';
            particula.style.zIndex = '9999';
            particula.style.animation = 'particulas 2s ease-out forwards';
            
            document.body.appendChild(particula);
            setTimeout(() => particula.remove(), 2000);
        }
    },
    
    mostrarSelectorNivelTema() {
        const contenedor = document.getElementById('selector-nivel-tema');
        if (!contenedor) return;
        
        contenedor.innerHTML = `
            <div style="text-align:center;padding:2rem;">
                <h3 style="color:#FF69B4;margin-bottom:2rem;">Selecciona el Nivel</h3>
                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem;">
                    <button class="boton-nivel" data-nivel="facil">Fácil (4 pares)</button>
                    <button class="boton-nivel" data-nivel="medio">Medio (6 pares)</button>
                    <button class="boton-nivel" data-nivel="dificil">Difícil (8 pares)</button>
                    <button class="boton-nivel" data-nivel="experto">Experto (12 pares)</button>
                </div>
                
                <h3 style="color:#FF69B4;margin-bottom:2rem;">Selecciona el Tema</h3>
                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                    <button class="boton-tema" data-tema="animales">🐶 Animales</button>
                    <button class="boton-tema" data-tema="frutas">🍎 Frutas</button>
                    <button class="boton-tema" data-tema="colores">🌈 Colores</button>
                    <button class="boton-tema" data-tema="profesiones">👨‍⚕️ Profesiones</button>
                </div>
            </div>
        `;
        
        // Agregar event listeners
        document.querySelectorAll('.boton-nivel').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.boton-nivel').forEach(b => b.classList.remove('seleccionado'));
                btn.classList.add('seleccionado');
                this.juego.nivel = btn.dataset.nivel;
                this.verificarInicioJuego();
            };
        });
        
        document.querySelectorAll('.boton-tema').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.boton-tema').forEach(b => b.classList.remove('seleccionado'));
                btn.classList.add('seleccionado');
                this.juego.tema = btn.dataset.tema;
                this.verificarInicioJuego();
            };
        });
    },
    
    verificarInicioJuego() {
        if (this.juego.nivel && this.juego.tema) {
            setTimeout(() => {
                this.iniciarJuego(this.juego.nivel, this.juego.tema);
                const selector = document.getElementById('selector-nivel-tema');
                if (selector) selector.style.display = 'none';
                const tablero = document.getElementById('tablero-memoria');
                if (tablero) tablero.style.display = 'grid';
            }, 300);
        }
    },
    
    reiniciar() {
        // Resetear el estado del juego
        this.juego = {
            nivel: null,
            tema: null,
            cartas: [],
            cartasVolteadas: [],
            parejasEncontradas: 0,
            movimientos: 0,
            bloqueado: false,
            tiempoInicio: null
        };
        
        // Mostrar el selector de nivel y tema
        const selector = document.getElementById('selector-nivel-tema');
        if (selector) {
            selector.style.display = 'block';
            this.mostrarSelectorNivelTema();
        }
        
        // Ocultar y limpiar el tablero
        const tablero = document.getElementById('tablero-memoria');
        if (tablero) {
            tablero.style.display = 'none';
            tablero.innerHTML = '';
        }
        
        // Resetear contadores en la UI
        this.actualizarUI();
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MemoryGameEngine = MemoryGameEngine;
}
