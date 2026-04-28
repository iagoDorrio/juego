// 🌸 EL JARDÍN DE LAS LETRAS DE RAQUEL 🌸
// Motor de juego - Lógica de todos los módulos

const GameEngine = {
    // Estado actual del juego
    estadoActual: {
        moduloActivo: null,
        letraActual: 0,
        palabraActual: 0,
        intentos: 0,
        aciertos: 0,
        vidas: 3,
        tipoLetra: 'mayuscula', // 'mayuscula' o 'minuscula'
        tiempoInicio: null
    },
    
    // ==========================================
    // MÓDULO 1: CONOCE LAS LETRAS
    // ==========================================
    conoceLetras: {
        letras: DATOS_JUEGO.abecedario,
        indiceActual: 0,
        
        iniciar() {
            GameEngine.estadoActual.moduloActivo = 'conoce-letras';
            this.indiceActual = 0;
            this.mostrarLetra(this.indiceActual);
        },
        
        mostrarLetra(indice) {
            const letra = this.letras[indice];
            const container = document.getElementById('flor-letra-grande');
            
            if (container) {
                const letraParaMostrar = GameEngine.estadoActual.tipoLetra === 'mayuscula' ? 
                    letra : letra.toLowerCase();
                
                container.innerHTML = LetterGenerator.generarLetraFlor(letraParaMostrar, 300, indice);
                
                // Pronunciar la letra
                setTimeout(() => {
                    AudioSynth.pronunciarLetra(letra);
                }, 300);
                
                // Guardar progreso
                StorageManager.agregarLetraDominada(letra);
            }
        },
        
        siguiente() {
            this.indiceActual = (this.indiceActual + 1) % this.letras.length;
            this.mostrarLetra(this.indiceActual);
        },
        
        anterior() {
            this.indiceActual = (this.indiceActual - 1 + this.letras.length) % this.letras.length;
            this.mostrarLetra(this.indiceActual);
        },
        
        repetir() {
            const letra = this.letras[this.indiceActual];
            AudioSynth.pronunciarLetra(letra);
        },
        
        cambiarTipo(tipo) {
            GameEngine.estadoActual.tipoLetra = tipo;
            this.mostrarLetra(this.indiceActual);
        }
    },
    
    // ==========================================
    // MÓDULO 2: ENCUENTRA LA LETRA
    // ==========================================
    encuentraLetra: {
        letraObjetivo: null,
        opciones: [],
        intentos: 0,
        aciertos: 0,
        maxIntentos: 10,
        vidas: 3,
        
        iniciar() {
            GameEngine.estadoActual.moduloActivo = 'encuentra-letra';
            this.intentos = 0;
            this.aciertos = 0;
            this.vidas = 3;
            this.nuevaRonda();
        },
        
        nuevaRonda() {
            if (this.intentos >= this.maxIntentos) {
                this.finalizarJuego();
                return;
            }
            
            // Seleccionar letra objetivo
            const progreso = StorageManager.obtenerProgreso();
            const letrasDisponibles = progreso.letrasDominadas.length > 0 ? 
                progreso.letrasDominadas : DATOS_JUEGO.vocales;
            
            this.letraObjetivo = letrasDisponibles[
                Math.floor(Math.random() * letrasDisponibles.length)
            ];
            
            // Generar opciones (3-4 letras)
            this.opciones = this.generarOpciones(this.letraObjetivo, 4);
            
            // Renderizar opciones
            this.renderizarOpciones();
            
            // Pronunciar la letra objetivo
            setTimeout(() => {
                AudioSynth.pronunciarInstruccion(`Encuentra la letra ${this.letraObjetivo}`);
                setTimeout(() => AudioSynth.pronunciarLetra(this.letraObjetivo), 2000);
            }, 500);
        },
        
        generarOpciones(letraCorrecta, cantidad) {
            const opciones = [letraCorrecta];
            const todasLetras = DATOS_JUEGO.abecedario.filter(l => l !== letraCorrecta);
            
            while (opciones.length < cantidad) {
                const letra = todasLetras[Math.floor(Math.random() * todasLetras.length)];
                if (!opciones.includes(letra)) {
                    opciones.push(letra);
                }
            }
            
            // Mezclar opciones
            return opciones.sort(() => Math.random() - 0.5);
        },
        
        renderizarOpciones() {
            const container = document.getElementById('opciones-letras');
            if (!container) return;
            
            container.innerHTML = '';
            
            this.opciones.forEach(letra => {
                const div = document.createElement('div');
                div.className = 'opcion-letra';
                div.innerHTML = LetterGenerator.generarLetraFlor(letra, 120);
                div.onclick = () => this.verificarRespuesta(letra);
                container.appendChild(div);
            });
        },
        
        verificarRespuesta(letraSeleccionada) {
            this.intentos++;
            
            if (letraSeleccionada === this.letraObjetivo) {
                // ¡Acierto!
                this.aciertos++;
                AudioSynth.celebrar();
                StorageManager.agregarEstrellas(1);
                StorageManager.actualizarEstadisticas(true);
                
                // Actualizar UI
                document.getElementById('aciertos').textContent = this.aciertos;
                document.getElementById('total-intentos').textContent = this.maxIntentos;
                
                // Nueva ronda después de 1.5 segundos
                setTimeout(() => this.nuevaRonda(), 1500);
            } else {
                // Error
                this.vidas--;
                AudioSynth.animar();
                StorageManager.actualizarEstadisticas(false);
                
                // Actualizar vidas
                document.getElementById('corazones').textContent = '❤️'.repeat(this.vidas);
                
                if (this.vidas <= 0) {
                    this.finalizarJuego();
                } else {
                    // Dar otra oportunidad
                    AudioSynth.pronunciarLetra(this.letraObjetivo);
                }
            }
        },
        
        finalizarJuego() {
            AudioSynth.pronunciarInstruccion(`Juego terminado. Acertaste ${this.aciertos} de ${this.maxIntentos} letras`);
            StorageManager.agregarEstrellas(this.aciertos);
            setTimeout(() => {
                mostrarCelebracion(`¡Terminaste! ${this.aciertos}/${this.maxIntentos} aciertos`);
            }, 2000);
        }
    },
    
    // ==========================================
    // MÓDULO 3: FORMA PALABRAS
    // ==========================================
    formaPalabras: {
        palabras: DATOS_JUEGO.palabras,
        palabraActual: null,
        indiceActual: 0,
        letrasColocadas: [],
        
        iniciar() {
            GameEngine.estadoActual.moduloActivo = 'forma-palabras';
            this.indiceActual = 0;
            console.log('Iniciando Forma Palabras. Total palabras:', this.palabras.length);
            this.nuevaPalabra();
        },
        
        nuevaPalabra() {
            if (this.indiceActual >= 10) {
                this.finalizarJuego();
                return;
            }
            
            this.palabraActual = this.palabras[this.indiceActual];
            this.letrasColocadas = [];
            
            console.log('Palabra actual:', this.palabraActual);
            
            // Actualizar número de palabra
            const numeroPalabra = document.getElementById('numero-palabra');
            if (numeroPalabra) {
                numeroPalabra.textContent = this.indiceActual + 1;
            }
            
            // Mostrar ilustración
            const ilustracion = document.getElementById('ilustracion-palabra');
            if (ilustracion && this.palabraActual && this.palabraActual.palabra) {
                ilustracion.innerHTML = SVGIllustrations.generar(this.palabraActual.palabra, 200);
            }
            
            // Generar letras desordenadas
            this.generarLetras();
            
            // Pronunciar palabra
            setTimeout(() => {
                AudioSynth.pronunciarPalabra(this.palabraActual.palabra);
            }, 500);
        },
        
        generarLetras() {
            if (!this.palabraActual || !this.palabraActual.palabra) {
                console.error('No hay palabra actual definida');
                return;
            }
            
            const letras = this.palabraActual.palabra.split('');
            const letrasDesordenadas = [...letras].sort(() => Math.random() - 0.5);
            
            const containerDisponibles = document.getElementById('letras-disponibles');
            const containerConstruccion = document.getElementById('zona-construccion');
            
            if (containerDisponibles) {
                containerDisponibles.innerHTML = '';
                letrasDesordenadas.forEach((letra, index) => {
                    const div = document.createElement('div');
                    div.className = 'letra-draggable';
                    const svgLetra = LetterGenerator.generarLetraSimple(letra, { tamano: 60 });
                    div.appendChild(svgLetra);
                    div.draggable = true;
                    div.dataset.letra = letra;
                    div.dataset.index = index;
                    div.onclick = () => this.moverLetra(letra, index);
                    containerDisponibles.appendChild(div);
                });
            }
            
            if (containerConstruccion) {
                containerConstruccion.innerHTML = '';
            }
        },
        
        moverLetra(letra, index) {
            this.letrasColocadas.push(letra);
            
            // Remover de disponibles
            const disponibles = document.getElementById('letras-disponibles');
            const construccion = document.getElementById('zona-construccion');
            
            if (disponibles && construccion) {
                const letraElement = disponibles.querySelector(`[data-index="${index}"]`);
                if (letraElement) {
                    disponibles.removeChild(letraElement);
                    construccion.appendChild(letraElement.cloneNode(true));
                }
            }
            
            // Pronunciar letra
            AudioSynth.pronunciarLetra(letra);
        },
        
        verificar() {
            const palabraFormada = this.letrasColocadas.join('');
            
            if (palabraFormada === this.palabraActual.palabra) {
                // ¡Correcto!
                AudioSynth.celebrar();
                StorageManager.agregarPalabraCompletada(this.palabraActual.palabra);
                StorageManager.agregarEstrellas(2);
                StorageManager.actualizarEstadisticas(true);
                
                mostrarCelebracion('¡Muy Bien!');
                
                setTimeout(() => {
                    this.indiceActual++;
                    this.nuevaPalabra();
                }, 2000);
            } else {
                // Incorrecto
                AudioSynth.animar();
                StorageManager.actualizarEstadisticas(false);
                
                // Reiniciar
                this.letrasColocadas = [];
                this.generarLetras();
            }
        },
        
        finalizarJuego() {
            AudioSynth.celebrar();
            mostrarCelebracion('¡Completaste todas las palabras!');
        }
    },
    
    // ==========================================
    // MÓDULO 4: JARDÍN DE SÍLABAS
    // ==========================================
    jardinSilabas: {
        familiaActual: null,
        silabas: [],
        
        iniciar() {
            GameEngine.estadoActual.moduloActivo = 'jardin-silabas';
            // Pronunciar instrucción
            setTimeout(() => {
                AudioSynth.pronunciarInstruccion('Selecciona una familia de sílabas');
            }, 500);
            // Seleccionar automáticamente la primera familia (M)
            setTimeout(() => {
                this.seleccionarFamilia('M');
            }, 2000);
        },
        
        seleccionarFamilia(consonante) {
            this.familiaActual = consonante;
            this.silabas = DATOS_JUEGO.familiasSilabicas[consonante];
            this.mostrarSilabas();
        },
        
        mostrarSilabas() {
            const container = document.getElementById('contenedor-silabas');
            if (!container) return;
            
            container.innerHTML = '';
            
            this.silabas.forEach(silaba => {
                const div = document.createElement('div');
                div.className = 'opcion-letra';
                const svgSilaba = LetterGenerator.generarLetraSimple(silaba, { tamano: 100 });
                div.appendChild(svgSilaba);
                div.onclick = () => this.pronunciarSilaba(silaba);
                container.appendChild(div);
            });
            
            // Guardar progreso
            this.silabas.forEach(silaba => {
                StorageManager.agregarSilabaAprendida(silaba);
            });
        },
        
        pronunciarSilaba(silaba) {
            AudioSynth.pronunciarSilaba(silaba);
            StorageManager.agregarEstrellas(1);
        }
    },
    
    // ==========================================
    // MÓDULO 5: CAMINO DEL ABECEDARIO
    // ==========================================
    caminoAbecedario: {
        iniciar() {
            GameEngine.estadoActual.moduloActivo = 'camino-abecedario';
            this.generarMapa();
        },
        
        generarMapa() {
            const container = document.getElementById('mapa-abecedario');
            if (!container) return;
            
            container.innerHTML = '';
            
            const progreso = StorageManager.obtenerProgreso();
            
            DATOS_JUEGO.abecedario.forEach((letra, index) => {
                const div = document.createElement('div');
                div.className = 'nodo-letra';
                
                const bloqueado = !progreso.letrasDominadas.includes(letra);
                if (bloqueado) {
                    div.classList.add('bloqueado');
                }
                
                div.innerHTML = LetterGenerator.generarLetraFlor(letra, 80, index);
                
                if (!bloqueado) {
                    div.onclick = () => {
                        AudioSynth.pronunciarLetra(letra);
                        StorageManager.agregarEstrellas(1);
                    };
                }
                
                container.appendChild(div);
            });
        }
    }
};

// Funciones auxiliares globales para los botones del HTML
function letraAnterior() {
    GameEngine.conoceLetras.anterior();
}

function letraSiguiente() {
    GameEngine.conoceLetras.siguiente();
}

function repetirAudio() {
    GameEngine.conoceLetras.repetir();
}

function cambiarTipo(tipo) {
    GameEngine.conoceLetras.cambiarTipo(tipo);
    
    // Actualizar UI
    document.querySelectorAll('.boton-tipo').forEach(btn => {
        btn.classList.remove('activo');
    });
    event.target.classList.add('activo');
}

function reproducirLetraObjetivo() {
    if (GameEngine.encuentraLetra.letraObjetivo) {
        AudioSynth.pronunciarLetra(GameEngine.encuentraLetra.letraObjetivo);
    }
}

function verificarPalabra() {
    GameEngine.formaPalabras.verificar();
}

function seleccionarFamilia(consonante) {
    GameEngine.jardinSilabas.seleccionarFamilia(consonante);
}

function toggleAudio() {
    if (typeof AudioSynth !== 'undefined' && AudioSynth.toggle) {
        AudioSynth.toggle();
        const btn = document.getElementById('btn-audio');
        if (btn) {
            btn.textContent = AudioSynth.habilitado ? '🔊' : '🔇';
        }
    }
}

// Exportar funciones globalmente
window.letraAnterior = letraAnterior;
window.letraSiguiente = letraSiguiente;
window.repetirAudio = repetirAudio;
window.cambiarTipo = cambiarTipo;
window.reproducirLetraObjetivo = reproducirLetraObjetivo;
window.verificarPalabra = verificarPalabra;
window.seleccionarFamilia = seleccionarFamilia;
window.toggleAudio = toggleAudio;
