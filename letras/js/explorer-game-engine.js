// Motor del Juego Raquel Exploradora 🗺️

const ExplorerGameEngine = {
    // Estado del juego
    estado: {
        actividadActual: null,
        nivel: 1,
        puntos: 0,
        tesorosEncontrados: 0
    },

    // Datos de mapas del tesoro
    mapas: [
        {
            id: 1,
            nivel: 'facil',
            cuadricula: 3,
            tesoro: { x: 2, y: 0 },
            instruccion: 'Ve 2 pasos a la DERECHA →',
            inicio: { x: 0, y: 0 }
        },
        {
            id: 2,
            nivel: 'facil',
            cuadricula: 3,
            tesoro: { x: 0, y: 2 },
            instruccion: 'Ve 2 pasos ABAJO ↓',
            inicio: { x: 0, y: 0 }
        },
        {
            id: 3,
            nivel: 'facil',
            cuadricula: 3,
            tesoro: { x: 2, y: 2 },
            instruccion: 'Ve 2 DERECHA → y 2 ABAJO ↓',
            inicio: { x: 0, y: 0 }
        },
        {
            id: 4,
            nivel: 'medio',
            cuadricula: 3,
            tesoro: { x: 1, y: 2 },
            instruccion: 'Ve 1 DERECHA →, 2 ABAJO ↓',
            inicio: { x: 0, y: 0 }
        },
        {
            id: 5,
            nivel: 'medio',
            cuadricula: 4,
            tesoro: { x: 3, y: 2 },
            instruccion: 'Ve 3 DERECHA →, 2 ABAJO ↓',
            inicio: { x: 0, y: 0 }
        }
    ],

    // Datos de secuencias
    secuencias: [
        // Nivel 1-3: Números simples
        { id: 1, tipo: 'numeros', serie: ['1️⃣', '2️⃣', '3️⃣', '❓'], respuestaCorrecta: '4️⃣', opciones: ['4️⃣', '5️⃣', '2️⃣'] },
        { id: 2, tipo: 'numeros', serie: ['2️⃣', '4️⃣', '6️⃣', '❓'], respuestaCorrecta: '8️⃣', opciones: ['8️⃣', '7️⃣', '5️⃣'] },
        { id: 3, tipo: 'numeros', serie: ['5️⃣', '4️⃣', '3️⃣', '❓'], respuestaCorrecta: '2️⃣', opciones: ['2️⃣', '1️⃣', '6️⃣'] },
        
        // Nivel 4-6: Colores
        { id: 4, tipo: 'colores', serie: ['🔴', '🔵', '🔴', '❓'], respuestaCorrecta: '🔵', opciones: ['🔵', '🟢', '🟡'] },
        { id: 5, tipo: 'colores', serie: ['🟡', '🟢', '🟡', '🟢', '❓'], respuestaCorrecta: '🟡', opciones: ['🟡', '🔴', '🔵'] },
        { id: 6, tipo: 'colores', serie: ['🔵', '🔵', '🟢', '🟢', '❓'], respuestaCorrecta: '🔵', opciones: ['🔵', '🟡', '🔴'] },
        
        // Nivel 7-9: Formas
        { id: 7, tipo: 'formas', serie: ['⭐', '⭐', '💗', '💗', '❓'], respuestaCorrecta: '⭐', opciones: ['⭐', '💗', '🌟'] },
        { id: 8, tipo: 'formas', serie: ['🌙', '⭐', '🌙', '⭐', '❓'], respuestaCorrecta: '🌙', opciones: ['🌙', '💗', '⭐'] },
        { id: 9, tipo: 'formas', serie: ['💗', '💗', '💗', '⭐', '⭐', '⭐', '❓'], respuestaCorrecta: '💗', opciones: ['💗', '⭐', '🌙'] },
        
        // Nivel 10-12: Animales
        { id: 10, tipo: 'animales', serie: ['🐱', '🐶', '🐱', '❓'], respuestaCorrecta: '🐶', opciones: ['🐶', '🐭', '🐰'] },
        { id: 11, tipo: 'animales', serie: ['🐸', '🐸', '🦋', '🦋', '❓'], respuestaCorrecta: '🐸', opciones: ['🐸', '🦋', '🐛'] },
        { id: 12, tipo: 'animales', serie: ['🦁', '🐯', '🐻', '🦁', '🐯', '❓'], respuestaCorrecta: '🐻', opciones: ['🐻', '🦁', '🐯'] },
        
        // Nivel 13-15: Mezclados difíciles
        { id: 13, tipo: 'frutas', serie: ['🍎', '🍌', '🍎', '🍌', '❓'], respuestaCorrecta: '🍎', opciones: ['🍎', '🍌', '🍊'] },
        { id: 14, tipo: 'emojis', serie: ['😊', '😢', '😊', '😢', '😊', '❓'], respuestaCorrecta: '😢', opciones: ['😢', '😊', '😂'] },
        { id: 15, tipo: 'creciente', serie: ['1️⃣', '3️⃣', '5️⃣', '7️⃣', '❓'], respuestaCorrecta: '9️⃣', opciones: ['9️⃣', '8️⃣', '6️⃣'] }
    ],

    // Datos de libro de colores (cargados desde archivo externo)
    get paginasColorear() {
        return window.PAGINAS_COLOREAR || [];
    },

    // Paleta de colores disponibles
    paletaColores: [
        { nombre: 'Rojo', hex: '#FF0000', emoji: '🔴' },
        { nombre: 'Rosa', hex: '#FF69B4', emoji: '🌸' },
        { nombre: 'Naranja', hex: '#FFA500', emoji: '🟠' },
        { nombre: 'Amarillo', hex: '#FFD700', emoji: '🟡' },
        { nombre: 'Verde', hex: '#32CD32', emoji: '🟢' },
        { nombre: 'Azul', hex: '#1E90FF', emoji: '🔵' },
        { nombre: 'Morado', hex: '#9370DB', emoji: '🟣' },
        { nombre: 'Marrón', hex: '#8B4513', emoji: '🟤' },
        { nombre: 'Negro', hex: '#000000', emoji: '⚫' },
        { nombre: 'Blanco', hex: '#FFFFFF', emoji: '⚪' }
    ],

    // Datos de "Encuentra las Diferencias"
    diferencias: [
        // Nivel 1: Fácil (3 diferencias)
        {
            id: 1,
            nombre: 'Jardín',
            cuadricula: 3,
            imagenBase: ['🌸', '🦋', '🌺', '🌻', '🐝', '🌷', '🌼', '🌹', '🌿'],
            diferenciasPos: [1, 4, 7], // Posiciones donde hay diferencias
            imagenDiferencias: ['🌸', '🐛', '🌺', '🌻', '🦋', '🌷', '🌼', '💐', '🌿']
        },
        // Nivel 2: Fácil (3 diferencias)
        {
            id: 2,
            nombre: 'Granja',
            cuadricula: 3,
            imagenBase: ['🐄', '🐷', '🐔', '🐴', '🐑', '🐓', '🐖', '🐮', '🌾'],
            diferenciasPos: [2, 5, 6],
            imagenDiferencias: ['🐄', '🐷', '🐥', '🐴', '🐑', '🐣', '🐏', '🐮', '🌾']
        },
        // Nivel 3: Medio (4 diferencias)
        {
            id: 3,
            nombre: 'Océano',
            cuadricula: 3,
            imagenBase: ['🐠', '🐟', '🐡', '🦈', '🐙', '🦀', '🐚', '⭐', '🌊'],
            diferenciasPos: [0, 3, 6, 7],
            imagenDiferencias: ['🐬', '🐟', '🐡', '🦑', '🐙', '🦀', '🐋', '🦐', '🌊']
        },
        // Nivel 4: Medio (4 diferencias)
        {
            id: 4,
            nombre: 'Bosque',
            cuadricula: 3,
            imagenBase: ['🌲', '🦊', '🌳', '🐿️', '🍄', '🦌', '🌲', '🦉', '🌿'],
            diferenciasPos: [1, 3, 5, 7],
            imagenDiferencias: ['🌲', '🐻', '🌳', '🐇', '🍄', '🦝', '🌲', '🦅', '🌿']
        },
        // Nivel 5: Difícil (5 diferencias)
        {
            id: 5,
            nombre: 'Espacio',
            cuadricula: 3,
            imagenBase: ['🌟', '🚀', '🌙', '⭐', '🛸', '🌠', '🪐', '☄️', '🌌'],
            diferenciasPos: [0, 2, 4, 6, 8],
            imagenDiferencias: ['⭐', '🚀', '🌛', '⭐', '🛰️', '🌠', '🌍', '☄️', '✨']
        },
        // Nivel 6: Difícil (5 diferencias - 4x4)
        {
            id: 6,
            nombre: 'Fiesta',
            cuadricula: 4,
            imagenBase: ['🎈', '🎂', '🎁', '🎉', '🎊', '🍰', '🎀', '🎪', '🎨', '🎭', '🎪', '🎺', '🎸', '🎻', '🎵', '🎶'],
            diferenciasPos: [1, 5, 8, 11, 14],
            imagenDiferencias: ['🎈', '🧁', '🎁', '🎉', '🎊', '🍩', '🎀', '🎪', '🖍️', '🎭', '🎪', '🎷', '🎸', '🎻', '🎤', '🎶']
        },
        // Nivel 7: Medio (4 diferencias)
        {
            id: 7,
            nombre: 'Frutas',
            cuadricula: 3,
            imagenBase: ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🍒', '🍑', '🍍'],
            diferenciasPos: [0, 3, 5, 7],
            imagenDiferencias: ['🍏', '🍌', '🍊', '🥝', '🍓', '🍈', '🍒', '🥭', '🍍']
        },
        // Nivel 8: Medio (4 diferencias)
        {
            id: 8,
            nombre: 'Vehículos',
            cuadricula: 3,
            imagenBase: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒'],
            diferenciasPos: [1, 4, 6, 8],
            imagenDiferencias: ['🚗', '🚖', '🚙', '🚌', '🚐', '🏎️', '🚔', '🚑', '🚚']
        },
        // Nivel 9: Difícil (5 diferencias)
        {
            id: 9,
            nombre: 'Comida',
            cuadricula: 3,
            imagenBase: ['🍕', '🍔', '🌭', '🍟', '🍿', '🥨', '🥐', '🥪', '🌮'],
            diferenciasPos: [0, 2, 4, 6, 8],
            imagenDiferencias: ['🍝', '🍔', '🥖', '🍟', '🧀', '🥨', '🥯', '🥪', '🌯']
        },
        // Nivel 10: Muy Difícil (6 diferencias - 4x4)
        {
            id: 10,
            nombre: 'Naturaleza',
            cuadricula: 4,
            imagenBase: ['🌺', '🌸', '🌼', '🌻', '🌷', '🌹', '🥀', '🌴', '🌲', '🌳', '🍀', '🌿', '🍂', '🍁', '🌾', '🌱'],
            diferenciasPos: [2, 5, 7, 9, 12, 14],
            imagenDiferencias: ['🌺', '🌸', '💐', '🌻', '🌷', '🏵️', '🥀', '🎋', '🌲', '🎄', '🍀', '🌿', '🌵', '🍁', '🌿', '🌱']
        }
    ],

    // Datos de "Emparejar Sombras"
    sombras: [
        // Nivel 1: Fácil (3 pares)
        {
            id: 1,
            nombre: 'Animales',
            objetos: ['🐱', '🐶', '🐭']
        },
        // Nivel 2: Fácil (3 pares)
        {
            id: 2,
            nombre: 'Frutas',
            objetos: ['🍎', '🍌', '🍊']
        },
        // Nivel 3: Medio (4 pares)
        {
            id: 3,
            nombre: 'Vehículos',
            objetos: ['🚗', '✈️', '🚂', '🚲']
        },
        // Nivel 4: Medio (4 pares)
        {
            id: 4,
            nombre: 'Naturaleza',
            objetos: ['🌸', '🌳', '🌞', '⭐']
        },
        // Nivel 5: Medio (5 pares)
        {
            id: 5,
            nombre: 'Objetos',
            objetos: ['⚽', '🎈', '🎁', '📚', '🎨']
        },
        // Nivel 6: Difícil (5 pares)
        {
            id: 6,
            nombre: 'Comida',
            objetos: ['🍕', '🍔', '🍰', '🍦', '🥤']
        },
        // Nivel 7: Difícil (6 pares)
        {
            id: 7,
            nombre: 'Insectos',
            objetos: ['🦋', '🐝', '🐞', '🦗', '🐛', '🕷️']
        },
        // Nivel 8: Muy Difícil (6 pares)
        {
            id: 8,
            nombre: 'Mar',
            objetos: ['🐠', '🐙', '🦀', '🐚', '⭐', '🐬']
        }
    ],

    // Datos de "Unir Parejas"
    parejas: [
        // Nivel 1: Animales y su comida (3 pares)
        {
            id: 1,
            nombre: 'Animales y su Comida',
            izquierda: [
                { emoji: '🐱', id: 'gato' },
                { emoji: '🐶', id: 'perro' },
                { emoji: '🐰', id: 'conejo' }
            ],
            derecha: [
                { emoji: '🐟', id: 'gato' },
                { emoji: '🦴', id: 'perro' },
                { emoji: '🥕', id: 'conejo' }
            ]
        },
        // Nivel 2: Animales y su casa (3 pares)
        {
            id: 2,
            nombre: 'Animales y su Casa',
            izquierda: [
                { emoji: '🐝', id: 'abeja' },
                { emoji: '🐟', id: 'pez' },
                { emoji: '🐦', id: 'pajaro' }
            ],
            derecha: [
                { emoji: '🏠', id: 'abeja' },
                { emoji: '🌊', id: 'pez' },
                { emoji: '🌳', id: 'pajaro' }
            ]
        },
        // Nivel 3: Objetos y su uso (4 pares)
        {
            id: 3,
            nombre: 'Objetos y su Uso',
            izquierda: [
                { emoji: '✏️', id: 'lapiz' },
                { emoji: '🍴', id: 'tenedor' },
                { emoji: '🔑', id: 'llave' },
                { emoji: '☂️', id: 'paraguas' }
            ],
            derecha: [
                { emoji: '📝', id: 'lapiz' },
                { emoji: '🍽️', id: 'tenedor' },
                { emoji: '🚪', id: 'llave' },
                { emoji: '🌧️', id: 'paraguas' }
            ]
        },
        // Nivel 4: Bebés y adultos (4 pares)
        {
            id: 4,
            nombre: 'Bebés y Adultos',
            izquierda: [
                { emoji: '🐣', id: 'pollo' },
                { emoji: '🐛', id: 'mariposa' },
                { emoji: '👶', id: 'persona' },
                { emoji: '🌱', id: 'arbol' }
            ],
            derecha: [
                { emoji: '🐔', id: 'pollo' },
                { emoji: '🦋', id: 'mariposa' },
                { emoji: '👨', id: 'persona' },
                { emoji: '🌳', id: 'arbol' }
            ]
        },
        // Nivel 5: Frutas y colores (4 pares)
        {
            id: 5,
            nombre: 'Frutas y Colores',
            izquierda: [
                { emoji: '🍎', id: 'manzana' },
                { emoji: '🍌', id: 'platano' },
                { emoji: '🍊', id: 'naranja' },
                { emoji: '🍇', id: 'uvas' }
            ],
            derecha: [
                { emoji: '🔴', id: 'manzana' },
                { emoji: '🟡', id: 'platano' },
                { emoji: '🟠', id: 'naranja' },
                { emoji: '🟣', id: 'uvas' }
            ]
        },
        // Nivel 6: Vehículos y lugar (5 pares)
        {
            id: 6,
            nombre: 'Vehículos y Lugar',
            izquierda: [
                { emoji: '🚗', id: 'coche' },
                { emoji: '✈️', id: 'avion' },
                { emoji: '🚢', id: 'barco' },
                { emoji: '🚂', id: 'tren' },
                { emoji: '🚁', id: 'helicoptero' }
            ],
            derecha: [
                { emoji: '🛣️', id: 'coche' },
                { emoji: '☁️', id: 'avion' },
                { emoji: '🌊', id: 'barco' },
                { emoji: '🛤️', id: 'tren' },
                { emoji: '🏔️', id: 'helicoptero' }
            ]
        },
        // Nivel 7: Clima y ropa (5 pares)
        {
            id: 7,
            nombre: 'Clima y Ropa',
            izquierda: [
                { emoji: '☀️', id: 'sol' },
                { emoji: '❄️', id: 'nieve' },
                { emoji: '🌧️', id: 'lluvia' },
                { emoji: '🌊', id: 'playa' },
                { emoji: '🍂', id: 'otoño' }
            ],
            derecha: [
                { emoji: '🕶️', id: 'sol' },
                { emoji: '🧤', id: 'nieve' },
                { emoji: '☂️', id: 'lluvia' },
                { emoji: '🩱', id: 'playa' },
                { emoji: '🧥', id: 'otoño' }
            ]
        },
        // Nivel 8: Profesiones y herramientas (5 pares)
        {
            id: 8,
            nombre: 'Profesiones y Herramientas',
            izquierda: [
                { emoji: '👨‍🍳', id: 'cocinero' },
                { emoji: '👨‍⚕️', id: 'doctor' },
                { emoji: '👨‍🏫', id: 'profesor' },
                { emoji: '👨‍🚒', id: 'bombero' },
                { emoji: '👨‍🎨', id: 'artista' }
            ],
            derecha: [
                { emoji: '🍳', id: 'cocinero' },
                { emoji: '💊', id: 'doctor' },
                { emoji: '📚', id: 'profesor' },
                { emoji: '🚒', id: 'bombero' },
                { emoji: '🎨', id: 'artista' }
            ]
        }
    ],

    // Datos de "Simon Dice"
    simonDice: [
        { id: 1, nivel: 'facil', longitud: 2, nombre: 'Nivel 1 - Muy Fácil' },
        { id: 2, nivel: 'facil', longitud: 3, nombre: 'Nivel 2 - Fácil' },
        { id: 3, nivel: 'medio', longitud: 3, nombre: 'Nivel 3 - Fácil+' },
        { id: 4, nivel: 'medio', longitud: 4, nombre: 'Nivel 4 - Medio' },
        { id: 5, nivel: 'medio', longitud: 5, nombre: 'Nivel 5 - Medio+' },
        { id: 6, nivel: 'dificil', longitud: 6, nombre: 'Nivel 6 - Difícil' },
        { id: 7, nivel: 'dificil', longitud: 6, nombre: 'Nivel 7 - Difícil+' },
        { id: 8, nivel: 'muy-dificil', longitud: 7, nombre: 'Nivel 8 - Experto' }
    ],

    // Colores para Simon Dice
    coloresSimon: [
        { nombre: 'Rojo', color: '#FF4444', colorClaro: '#FF8888', emoji: '🔴' },
        { nombre: 'Azul', color: '#4444FF', colorClaro: '#8888FF', emoji: '🔵' },
        { nombre: 'Verde', color: '#44FF44', colorClaro: '#88FF88', emoji: '🟢' },
        { nombre: 'Amarillo', color: '#FFD700', colorClaro: '#FFE55C', emoji: '🟡' }
    ],

    // Datos de "Clasificar Colores"
    clasificarColores: [
        // Nivel 1-2: 2 colores, 4 objetos
        {
            id: 1,
            nombre: 'Nivel 1 - Muy Fácil',
            colores: [
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Azul', hex: '#4444FF', emoji: '🔵' }
            ],
            objetos: [
                { emoji: '🍎', color: 'Rojo' },
                { emoji: '🌊', color: 'Azul' },
                { emoji: '🍓', color: 'Rojo' },
                { emoji: '🦋', color: 'Azul' }
            ]
        },
        {
            id: 2,
            nombre: 'Nivel 2 - Fácil',
            colores: [
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Verde', hex: '#44FF44', emoji: '🟢' }
            ],
            objetos: [
                { emoji: '🍅', color: 'Rojo' },
                { emoji: '🌳', color: 'Verde' },
                { emoji: '🌹', color: 'Rojo' },
                { emoji: '🍀', color: 'Verde' },
                { emoji: '❤️', color: 'Rojo' }
            ]
        },
        // Nivel 3-4: 3 colores, 6 objetos
        {
            id: 3,
            nombre: 'Nivel 3 - Fácil+',
            colores: [
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Azul', hex: '#4444FF', emoji: '🔵' },
                { nombre: 'Amarillo', hex: '#FFD700', emoji: '🟡' }
            ],
            objetos: [
                { emoji: '🍎', color: 'Rojo' },
                { emoji: '🌊', color: 'Azul' },
                { emoji: '🌟', color: 'Amarillo' },
                { emoji: '🚗', color: 'Rojo' },
                { emoji: '🐟', color: 'Azul' },
                { emoji: '🍌', color: 'Amarillo' }
            ]
        },
        {
            id: 4,
            nombre: 'Nivel 4 - Medio',
            colores: [
                { nombre: 'Verde', hex: '#44FF44', emoji: '🟢' },
                { nombre: 'Naranja', hex: '#FFA500', emoji: '🟠' },
                { nombre: 'Morado', hex: '#9370DB', emoji: '🟣' }
            ],
            objetos: [
                { emoji: '🌳', color: 'Verde' },
                { emoji: '🍊', color: 'Naranja' },
                { emoji: '🍇', color: 'Morado' },
                { emoji: '🍀', color: 'Verde' },
                { emoji: '🥕', color: 'Naranja' },
                { emoji: '👾', color: 'Morado' },
                { emoji: '🦖', color: 'Verde' }
            ]
        },
        // Nivel 5-6: 4 colores, 8 objetos
        {
            id: 5,
            nombre: 'Nivel 5 - Medio+',
            colores: [
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Azul', hex: '#4444FF', emoji: '🔵' },
                { nombre: 'Verde', hex: '#44FF44', emoji: '🟢' },
                { nombre: 'Amarillo', hex: '#FFD700', emoji: '🟡' }
            ],
            objetos: [
                { emoji: '🍎', color: 'Rojo' },
                { emoji: '🌊', color: 'Azul' },
                { emoji: '🌳', color: 'Verde' },
                { emoji: '🌟', color: 'Amarillo' },
                { emoji: '🚗', color: 'Rojo' },
                { emoji: '🦋', color: 'Azul' },
                { emoji: '🍀', color: 'Verde' },
                { emoji: '🍌', color: 'Amarillo' }
            ]
        },
        {
            id: 6,
            nombre: 'Nivel 6 - Difícil',
            colores: [
                { nombre: 'Rosa', hex: '#FF69B4', emoji: '🩷' },
                { nombre: 'Marrón', hex: '#8B4513', emoji: '🟤' },
                { nombre: 'Negro', hex: '#333333', emoji: '⚫' },
                { nombre: 'Blanco', hex: '#F0F0F0', emoji: '⚪' }
            ],
            objetos: [
                { emoji: '🌸', color: 'Rosa' },
                { emoji: '🐻', color: 'Marrón' },
                { emoji: '🐈‍⬛', color: 'Negro' },
                { emoji: '☁️', color: 'Blanco' },
                { emoji: '💗', color: 'Rosa' },
                { emoji: '🍫', color: 'Marrón' },
                { emoji: '🦇', color: 'Negro' },
                { emoji: '🐑', color: 'Blanco' }
            ]
        },
        // Nivel 7-8: 5 colores, 10 objetos
        {
            id: 7,
            nombre: 'Nivel 7 - Difícil+',
            colores: [
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Verde', hex: '#44FF44', emoji: '🟢' },
                { nombre: 'Azul', hex: '#4444FF', emoji: '🔵' },
                { nombre: 'Amarillo', hex: '#FFD700', emoji: '🟡' },
                { nombre: 'Naranja', hex: '#FFA500', emoji: '🟠' }
            ],
            objetos: [
                { emoji: '🍎', color: 'Rojo' },
                { emoji: '🌳', color: 'Verde' },
                { emoji: '🌊', color: 'Azul' },
                { emoji: '🌟', color: 'Amarillo' },
                { emoji: '🍊', color: 'Naranja' },
                { emoji: '❤️', color: 'Rojo' },
                { emoji: '🍀', color: 'Verde' },
                { emoji: '🦋', color: 'Azul' },
                { emoji: '🍌', color: 'Amarillo' },
                { emoji: '🥕', color: 'Naranja' }
            ]
        },
        {
            id: 8,
            nombre: 'Nivel 8 - Experto',
            colores: [
                { nombre: 'Morado', hex: '#9370DB', emoji: '🟣' },
                { nombre: 'Rosa', hex: '#FF69B4', emoji: '🩷' },
                { nombre: 'Marrón', hex: '#8B4513', emoji: '🟤' },
                { nombre: 'Negro', hex: '#333333', emoji: '⚫' },
                { nombre: 'Verde', hex: '#44FF44', emoji: '🟢' }
            ],
            objetos: [
                { emoji: '🍇', color: 'Morado' },
                { emoji: '🌸', color: 'Rosa' },
                { emoji: '🐻', color: 'Marrón' },
                { emoji: '🐈‍⬛', color: 'Negro' },
                { emoji: '🌳', color: 'Verde' },
                { emoji: '👾', color: 'Morado' },
                { emoji: '💗', color: 'Rosa' },
                { emoji: '🍫', color: 'Marrón' },
                { emoji: '🦇', color: 'Negro' },
                { emoji: '🍀', color: 'Verde' }
            ]
        },
        // Nivel 9-10: 6 colores, 12 objetos
        {
            id: 9,
            nombre: 'Nivel 9 - Maestro',
            colores: [
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Azul', hex: '#4444FF', emoji: '🔵' },
                { nombre: 'Verde', hex: '#44FF44', emoji: '🟢' },
                { nombre: 'Amarillo', hex: '#FFD700', emoji: '🟡' },
                { nombre: 'Morado', hex: '#9370DB', emoji: '🟣' },
                { nombre: 'Naranja', hex: '#FFA500', emoji: '🟠' }
            ],
            objetos: [
                { emoji: '🍎', color: 'Rojo' },
                { emoji: '🌊', color: 'Azul' },
                { emoji: '🌳', color: 'Verde' },
                { emoji: '🌟', color: 'Amarillo' },
                { emoji: '🍇', color: 'Morado' },
                { emoji: '🍊', color: 'Naranja' },
                { emoji: '🚗', color: 'Rojo' },
                { emoji: '🦋', color: 'Azul' },
                { emoji: '🍀', color: 'Verde' },
                { emoji: '🍌', color: 'Amarillo' },
                { emoji: '👾', color: 'Morado' },
                { emoji: '🥕', color: 'Naranja' }
            ]
        },
        {
            id: 10,
            nombre: 'Nivel 10 - Leyenda',
            colores: [
                { nombre: 'Rosa', hex: '#FF69B4', emoji: '🩷' },
                { nombre: 'Marrón', hex: '#8B4513', emoji: '🟤' },
                { nombre: 'Negro', hex: '#333333', emoji: '⚫' },
                { nombre: 'Blanco', hex: '#F0F0F0', emoji: '⚪' },
                { nombre: 'Rojo', hex: '#FF4444', emoji: '🔴' },
                { nombre: 'Azul', hex: '#4444FF', emoji: '🔵' }
            ],
            objetos: [
                { emoji: '🌸', color: 'Rosa' },
                { emoji: '🐻', color: 'Marrón' },
                { emoji: '🐈‍⬛', color: 'Negro' },
                { emoji: '☁️', color: 'Blanco' },
                { emoji: '🍎', color: 'Rojo' },
                { emoji: '🌊', color: 'Azul' },
                { emoji: '💗', color: 'Rosa' },
                { emoji: '🍫', color: 'Marrón' },
                { emoji: '🦇', color: 'Negro' },
                { emoji: '🐑', color: 'Blanco' },
                { emoji: '❤️', color: 'Rojo' },
                { emoji: '🦋', color: 'Azul' }
            ]
        }
    ],

    // Datos de "Copia el Dibujo" - Juego de pintura por cuadrícula
    copiarDibujo: [
        // Nivel 1: Muy fácil (3x3, 2 colores)
        { 
            id: 1, 
            nombre: 'Corazón Simple',
            tamano: 3,
            referencia: [
                ['⬜', '🔴', '⬜'],
                ['🔴', '🔴', '🔴'],
                ['⬜', '🔴', '⬜']
            ],
            colores: ['⬜', '🔴']
        },
        // Nivel 2: Fácil (3x3, 3 colores)
        { 
            id: 2, 
            nombre: 'Cara Feliz',
            tamano: 3,
            referencia: [
                ['🟡', '⬛', '🟡'],
                ['🟡', '🟡', '🟡'],
                ['⬛', '🟡', '⬛']
            ],
            colores: ['⬜', '🟡', '⬛']
        },
        // Nivel 3: Fácil (4x4, 3 colores)
        { 
            id: 3, 
            nombre: 'Flor',
            tamano: 4,
            referencia: [
                ['⬜', '🔴', '🔴', '⬜'],
                ['🔴', '🟡', '🟡', '🔴'],
                ['🔴', '🟡', '🟡', '🔴'],
                ['⬜', '🟢', '🟢', '⬜']
            ],
            colores: ['⬜', '🔴', '🟡', '🟢']
        },
        // Nivel 4: Medio (4x4, 4 colores)
        { 
            id: 4, 
            nombre: 'Casa',
            tamano: 4,
            referencia: [
                ['⬜', '🔴', '🔴', '⬜'],
                ['🟡', '⬛', '⬛', '🟡'],
                ['🟡', '⬛', '⬛', '🟡'],
                ['🟡', '🟡', '🟤', '🟡']
            ],
            colores: ['⬜', '🔴', '🟡', '⬛', '🟤']
        },
        // Nivel 5: Medio (5x5, 3 colores)
        { 
            id: 5, 
            nombre: 'Árbol',
            tamano: 5,
            referencia: [
                ['⬜', '⬜', '🟢', '⬜', '⬜'],
                ['⬜', '🟢', '🟢', '🟢', '⬜'],
                ['🟢', '🟢', '🟢', '🟢', '🟢'],
                ['⬜', '⬜', '🟤', '⬜', '⬜'],
                ['⬜', '⬜', '🟤', '⬜', '⬜']
            ],
            colores: ['⬜', '🟢', '🟤']
        },
        // Nivel 6: Difícil (5x5, 5 colores)
        { 
            id: 6, 
            nombre: 'Mariposa',
            tamano: 5,
            referencia: [
                ['🔴', '⬜', '⬛', '⬜', '🔴'],
                ['🔴', '🟡', '⬛', '🟡', '🔴'],
                ['⬛', '⬛', '⬛', '⬛', '⬛'],
                ['🟡', '🔵', '⬛', '🔵', '🟡'],
                ['🟡', '⬜', '⬛', '⬜', '🟡']
            ],
            colores: ['⬜', '🔴', '🟡', '🔵', '⬛']
        },
        // Nivel 7: Difícil (6x6, 3 colores)
        { 
            id: 7, 
            nombre: 'Coche',
            tamano: 6,
            referencia: [
                ['⬜', '⬜', '🔴', '🔴', '⬜', '⬜'],
                ['⬜', '🔴', '🔴', '🔴', '🔴', '⬜'],
                ['🔴', '🔴', '⬛', '🔴', '⬛', '🔴'],
                ['🔴', '🔴', '🔴', '🔴', '🔴', '🔴'],
                ['⬜', '⬛', '⬜', '⬜', '⬛', '⬜'],
                ['⬛', '⬛', '⬛', '⬛', '⬛', '⬛']
            ],
            colores: ['⬜', '🔴', '⬛']
        },
        // Nivel 8: Muy difícil (6x6, 6 colores)
        { 
            id: 8, 
            nombre: 'Arcoíris',
            tamano: 6,
            referencia: [
                ['⬜', '⬜', '🔴', '🔴', '⬜', '⬜'],
                ['⬜', '🔴', '🟠', '🟠', '🔴', '⬜'],
                ['⬜', '🟠', '🟡', '🟡', '🟠', '⬜'],
                ['⬜', '🟡', '🟢', '🟢', '🟡', '⬜'],
                ['⬜', '🟢', '🔵', '🔵', '🟢', '⬜'],
                ['⬜', '⬜', '🔵', '🔵', '⬜', '⬜']
            ],
            colores: ['⬜', '🔴', '🟠', '🟡', '🟢', '🔵']
        }
    ],

    // Datos de laberintos
    laberintos: [
        // Nivel 1-2: Muy fácil (5x5)
        {
            id: 1, nivel: 'facil', tamaño: 5,
            camino: [[0,0], [0,1], [0,2], [1,2], [2,2], [2,3], [2,4], [3,4], [4,4]],
            inicio: [0, 0], fin: [4, 4]
        },
        {
            id: 2, nivel: 'facil', tamaño: 5,
            camino: [[0,0], [1,0], [2,0], [2,1], [2,2], [3,2], [4,2], [4,3], [4,4]],
            inicio: [0, 0], fin: [4, 4]
        },
        
        // Nivel 3-4: Fácil (5x5 más complejo)
        {
            id: 3, nivel: 'facil', tamaño: 5,
            camino: [[0,0], [1,0], [1,1], [1,2], [2,2], [3,2], [3,3], [3,4], [4,4]],
            inicio: [0, 0], fin: [4, 4]
        },
        {
            id: 4, nivel: 'facil', tamaño: 5,
            camino: [[0,0], [0,1], [1,1], [2,1], [2,2], [2,3], [3,3], [4,3], [4,4]],
            inicio: [0, 0], fin: [4, 4]
        },
        
        // Nivel 5-6: Medio (6x6)
        {
            id: 5, nivel: 'medio', tamaño: 6,
            camino: [[0,0], [0,1], [1,1], [1,2], [2,2], [3,2], [3,3], [4,3], [4,4], [5,4], [5,5]],
            inicio: [0, 0], fin: [5, 5]
        },
        {
            id: 6, nivel: 'medio', tamaño: 6,
            camino: [[0,0], [1,0], [2,0], [2,1], [2,2], [3,2], [4,2], [4,3], [4,4], [5,4], [5,5]],
            inicio: [0, 0], fin: [5, 5]
        },
        
        // Nivel 7-8: Difícil (7x7)
        {
            id: 7, nivel: 'dificil', tamaño: 7,
            camino: [[0,0], [0,1], [1,1], [1,2], [2,2], [2,3], [3,3], [4,3], [4,4], [5,4], [5,5], [6,5], [6,6]],
            inicio: [0, 0], fin: [6, 6]
        },
        {
            id: 8, nivel: 'dificil', tamaño: 7,
            camino: [[0,0], [1,0], [2,0], [2,1], [2,2], [3,2], [4,2], [4,3], [4,4], [5,4], [6,4], [6,5], [6,6]],
            inicio: [0, 0], fin: [6, 6]
        }
    ],

    // Inicializar módulo
    iniciar() {
        console.log('🗺️ Iniciando Raquel Exploradora...');
        this.estado = {
            actividadActual: null,
            nivel: 1,
            puntos: 0,
            tesorosEncontrados: 0
        };
        this.mostrarMenuActividades();
    },

    // Mostrar menú de actividades
    mostrarMenuActividades() {
        const contenedor = document.getElementById('menu-actividades-explorer');
        if (!contenedor) return;

        contenedor.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; max-width: 800px; margin: 0 auto;">
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarMapasTesoro()" style="background: linear-gradient(135deg, #FFD700, #FFA500); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🗺️</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Mapas del Tesoro</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">5 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarSecuencias()" style="background: linear-gradient(135deg, #9370DB, #8A2BE2); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔢</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Secuencias</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">15 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarLaberintos()" style="background: linear-gradient(135deg, #32CD32, #228B22); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🌳</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Laberintos</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">8 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarLibroColores()" style="background: linear-gradient(135deg, #FF69B4, #FF1493); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎨</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Libro de Colores</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">10 dibujos</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarDiferencias()" style="background: linear-gradient(135deg, #FF6347, #FF4500); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Encuentra las Diferencias</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">10 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarSombras()" style="background: linear-gradient(135deg, #8B7355, #654321); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">👥</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Emparejar Sombras</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">8 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarUnirParejas()" style="background: linear-gradient(135deg, #20B2AA, #008B8B); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔗</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Unir Parejas</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">8 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarSimonDice()" style="background: linear-gradient(135deg, #FF6B6B, #EE5A6F); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎯</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Simon Dice</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">8 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarClasificarColores()" style="background: linear-gradient(135deg, #FF1493, #C71585); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎨</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Clasificar Colores</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">10 niveles</p>
                </div>
                
                <div class="tarjeta-actividad" onclick="ExplorerGameEngine.iniciarCopiarDibujo()" style="background: linear-gradient(135deg, #FF7F50, #FF6347); padding: 1.5rem; border-radius: 15px; text-align: center; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">🖼️</div>
                    <h3 style="color: white; font-size: 1rem; margin: 0;">Copia el Dibujo</h3>
                    <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin-top: 0.5rem;">8 niveles</p>
                </div>
            </div>
        `;

        // Añadir efecto hover
        document.querySelectorAll('.tarjeta-actividad').forEach(tarjeta => {
            tarjeta.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            tarjeta.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    },

    // === MAPAS DEL TESORO ===
    iniciarMapasTesoro() {
        this.estado.actividadActual = 'mapas';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarMapaTesoro(0);
        }
    },

    mostrarMapaTesoro(indice) {
        const mapa = this.mapas[indice];
        if (!mapa) {
            this.mostrarCelebracion('¡Has encontrado todos los tesoros! 🏆');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        const size = mapa.cuadricula;
        const cellSize = 70;

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="color: #FF69B4; font-size: 1.3rem;">🗺️ Sigue la pista para encontrar el tesoro</h3>
                <div style="background: white; padding: 1rem; border-radius: 10px; display: inline-block; margin-top: 1rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <p style="font-size: 1.2rem; font-weight: bold; color: #2C3E50; margin: 0;">${mapa.instruccion}</p>
                </div>
                <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">Nivel ${indice + 1} de ${this.mapas.length}</p>
            </div>
            <div id="cuadricula-mapa" style="display: grid; grid-template-columns: repeat(${size}, ${cellSize}px); gap: 5px; justify-content: center; margin: 2rem auto;"></div>
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="ExplorerGameEngine.mostrarMapaTesoro(${indice - 1})" class="boton-principal" ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>⬅️ Anterior</button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button onclick="ExplorerGameEngine.mostrarMapaTesoro(${indice + 1})" class="boton-principal" ${indice === this.mapas.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Siguiente ➡️</button>
            </div>
        `;

        // Crear cuadrícula
        const cuadricula = document.getElementById('cuadricula-mapa');
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const celda = document.createElement('div');
                celda.style.cssText = `
                    width: ${cellSize}px;
                    height: ${cellSize}px;
                    background: ${x === mapa.inicio.x && y === mapa.inicio.y ? '#90EE90' : '#E0E0E0'};
                    border: 3px solid #999;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    cursor: pointer;
                    transition: all 0.3s;
                `;
                
                if (x === mapa.inicio.x && y === mapa.inicio.y) {
                    celda.textContent = '🧒';
                }
                
                celda.dataset.x = x;
                celda.dataset.y = y;
                celda.onclick = () => this.verificarTesoro(x, y, mapa, indice);
                
                cuadricula.appendChild(celda);
            }
        }
    },

    verificarTesoro(x, y, mapa, indice) {
        const celda = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        
        if (x === mapa.tesoro.x && y === mapa.tesoro.y) {
            celda.textContent = '💎';
            celda.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            celda.style.transform = 'scale(1.2)';
            
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
            
            setTimeout(() => {
                this.estado.tesorosEncontrados++;
                this.mostrarCelebracion('¡Encontraste el tesoro! 💎✨');
                setTimeout(() => this.mostrarMapaTesoro(indice + 1), 1500);
            }, 500);
        } else {
            celda.textContent = '❌';
            celda.style.background = '#FFB6C1';
            setTimeout(() => {
                celda.textContent = '';
                celda.style.background = '#E0E0E0';
            }, 1000);
        }
    },

    // === PUZZLES ===
    iniciarPuzzles() {
        this.estado.actividadActual = 'puzzles';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarPuzzle(0);
        }
    },

    mostrarPuzzle(indice) {
        const puzzle = this.puzzles[indice];
        if (!puzzle) {
            this.mostrarCelebracion('¡Completaste todos los puzzles! 🎉');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        // Crear piezas del puzzle
        const piezas = [];
        for (let i = 0; i < puzzle.piezas; i++) {
            piezas.push({ id: i, colocada: false });
        }
        const piezasMezcladas = this.mezclarArray([...piezas]);

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="color: #FF69B4; font-size: 1.3rem;">🧩 Completa el puzzle: ${puzzle.nombre} ${puzzle.emoji}</h3>
                <p style="font-size: 1rem; color: #666;">Arrastra las piezas al tablero</p>
            </div>
            <div id="tablero-puzzle" style="display: grid; grid-template-columns: repeat(${Math.sqrt(puzzle.piezas)}, 80px); gap: 5px; justify-content: center; margin: 1rem auto; min-height: ${80 * Math.sqrt(puzzle.piezas)}px; background: rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 15px; border: 3px dashed #FF69B4;"></div>
            <div id="piezas-disponibles" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 2rem auto; max-width: 400px;"></div>
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="ExplorerGameEngine.mostrarLaberinto(${indice - 1})" class="boton-principal" ${indice === 0 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
                    ⬅️ Anterior
                </button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">
                    🏠 Volver al Menú
                </button>
                <button onclick="ExplorerGameEngine.mostrarLaberinto(${indice + 1})" class="boton-principal" ${indice >= this.laberintos.length - 1 ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
                    Siguiente ➡️
                </button>
            </div>
        `;

        // Crear espacios en el tablero
        const tablero = document.getElementById('tablero-puzzle');
        piezas.forEach((pieza, idx) => {
            const espacio = document.createElement('div');
            espacio.style.cssText = `
                width: 80px;
                height: 80px;
                background: white;
                border: 2px dashed #CCC;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
            `;
            espacio.dataset.posicion = idx;
            espacio.className = 'espacio-puzzle';
            tablero.appendChild(espacio);
        });

        // Crear piezas disponibles
        const contenedorPiezas = document.getElementById('piezas-disponibles');
        piezasMezcladas.forEach(pieza => {
            const piezaEl = document.createElement('div');
            piezaEl.style.cssText = `
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #FFB6D9, #FFC9E5);
                border: 3px solid #FF69B4;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                cursor: move;
                transition: transform 0.2s;
            `;
            piezaEl.textContent = puzzle.emoji;
            piezaEl.dataset.piezaId = pieza.id;
            piezaEl.draggable = true;
            
            piezaEl.ondragstart = (e) => {
                e.dataTransfer.setData('piezaId', pieza.id);
            };
            
            piezaEl.onmouseenter = () => piezaEl.style.transform = 'scale(1.1)';
            piezaEl.onmouseleave = () => piezaEl.style.transform = 'scale(1)';
            
            contenedorPiezas.appendChild(piezaEl);
        });

        // Configurar drop zones
        document.querySelectorAll('.espacio-puzzle').forEach(espacio => {
            espacio.ondragover = (e) => {
                e.preventDefault();
                espacio.style.background = '#FFF3CD';
            };
            
            espacio.ondragleave = () => {
                espacio.style.background = 'white';
            };
            
            espacio.ondrop = (e) => {
                e.preventDefault();
                const piezaId = e.dataTransfer.getData('piezaId');
                const piezaEl = document.querySelector(`[data-pieza-id="${piezaId}"]`);
                
                if (piezaEl && !espacio.hasChildNodes()) {
                    espacio.appendChild(piezaEl);
                    piezaEl.style.cursor = 'default';
                    piezaEl.draggable = false;
                    espacio.style.background = 'white';
                    espacio.style.border = '2px solid #4CAF50';
                    
                    // Verificar si está completo
                    setTimeout(() => {
                        const espaciosLlenos = document.querySelectorAll('.espacio-puzzle:has(div)').length;
                        if (espaciosLlenos === puzzle.piezas) {
                            this.completarPuzzle(puzzle, indice);
                        }
                    }, 300);
                }
            };
        });
    },

    completarPuzzle(puzzle, indice) {
        if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
        this.mostrarCelebracion(`¡Completaste el puzzle ${puzzle.nombre}! ${puzzle.emoji}✨`);
        setTimeout(() => this.mostrarPuzzle(indice + 1), 1500);
    },

    // === SECUENCIAS LÓGICAS ===
    iniciarSecuencias() {
        this.estado.actividadActual = 'secuencias';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarSecuencia(0);
        }
    },

    mostrarSecuencia(indice) {
        const secuencia = this.secuencias[indice];
        if (!secuencia) {
            this.mostrarCelebracion('¡Completaste todas las secuencias! 🎯');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        const opcionesMezcladas = this.mezclarArray([...secuencia.opciones]);

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h3 style="color: #FF69B4; font-size: 1.3rem;">🔢 ¿Qué viene después?</h3>
                <p style="font-size: 1rem; color: #666;">Completa la secuencia</p>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap; margin: 2rem auto;">
                ${secuencia.serie.map(item => `
                    <div style="width: 70px; height: 70px; background: white; border: 3px solid #9370DB; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        ${item}
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin: 2rem auto;">
                ${opcionesMezcladas.map(opcion => `
                    <div onclick="ExplorerGameEngine.verificarSecuencia('${opcion}', '${secuencia.respuestaCorrecta}', ${indice})" style="width: 80px; height: 80px; background: linear-gradient(135deg, #DDA0DD, #EE82EE); border: 3px solid #9370DB; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 3rem; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 8px rgba(0,0,0,0.2);" onmouseenter="this.style.transform='scale(1.1)'" onmouseleave="this.style.transform='scale(1)'">
                        ${opcion}
                    </div>
                `).join('')}
            </div>
            <div style="text-align: center; margin-top: 2rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="ExplorerGameEngine.mostrarSecuencia(${indice - 1})" class="boton-principal" ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>⬅️ Anterior</button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button onclick="ExplorerGameEngine.mostrarSecuencia(${indice + 1})" class="boton-principal" ${indice === this.secuencias.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Siguiente ➡️</button>
            </div>
        `;
    },

    verificarSecuencia(respuesta, correcta, indice) {
        if (respuesta === correcta) {
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
            this.mostrarCelebracion('¡Correcto! ✨');
            setTimeout(() => this.mostrarSecuencia(indice + 1), 1000);
        } else {
            this.mostrarCelebracion('Intenta de nuevo 🤔');
        }
    },

    // === LABERINTOS ===
    iniciarLaberintos() {
        this.estado.actividadActual = 'laberintos';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarLaberinto(0);
        }
    },

    mostrarLaberinto(indice) {
        const laberinto = this.laberintos[indice];
        if (!laberinto) {
            this.mostrarCelebracion('¡Completaste todos los laberintos! 🌟');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        const size = laberinto.tamaño;
        const cellSize = 50;
        this.laberintoActual = {
            ...laberinto,
            posicionActual: [...laberinto.inicio],
            visitadas: [laberinto.inicio.join(',')]
        };

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="color: #FF69B4; font-size: 1.3rem;">🌳 Ayuda a Raquel a llegar a la meta</h3>
                <p style="font-size: 1rem; color: #666;">Usa las flechas o toca las celdas</p>
            </div>
            <div id="cuadricula-laberinto" style="display: grid; grid-template-columns: repeat(${size}, ${cellSize}px); gap: 2px; justify-content: center; margin: 2rem auto; background: #E0E0E0; padding: 5px; border-radius: 10px;"></div>
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button onclick="ExplorerGameEngine.mostrarLaberinto(${indice - 1})" class="boton-principal" ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>⬅️ Anterior</button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button onclick="ExplorerGameEngine.mostrarLaberinto(${indice + 1})" class="boton-principal" ${indice >= this.laberintos.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>Siguiente ➡️</button>
            </div>
        `;

        // Crear cuadrícula del laberinto
        const cuadricula = document.getElementById('cuadricula-laberinto');
        const caminoSet = new Set(laberinto.camino.map(pos => pos.join(',')));

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const celda = document.createElement('div');
                const posKey = `${y},${x}`;
                const esCamino = caminoSet.has(posKey);
                const esInicio = y === laberinto.inicio[0] && x === laberinto.inicio[1];
                const esFin = y === laberinto.fin[0] && x === laberinto.fin[1];

                celda.style.cssText = `
                    width: ${cellSize}px;
                    height: ${cellSize}px;
                    background: ${esCamino ? (esInicio ? '#90EE90' : esFin ? '#FFD700' : 'white') : '#8B4513'};
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    cursor: ${esCamino ? 'pointer' : 'default'};
                    transition: background 0.3s;
                `;

                if (esInicio) celda.textContent = '🧒';
                if (esFin) celda.textContent = '🏆';

                celda.dataset.y = y;
                celda.dataset.x = x;

                if (esCamino) {
                    celda.onclick = () => this.moverEnLaberinto(y, x, indice);
                }

                cuadricula.appendChild(celda);
            }
        }
    },

    moverEnLaberinto(y, x, indice) {
        const [actualY, actualX] = this.laberintoActual.posicionActual;
        const laberinto = this.laberintoActual;

        // Verificar si es movimiento adyacente válido
        const distancia = Math.abs(y - actualY) + Math.abs(x - actualX);
        if (distancia !== 1) return;

        // Verificar si es parte del camino
        const posKey = `${y},${x}`;
        const caminoSet = new Set(laberinto.camino.map(pos => pos.join(',')));
        if (!caminoSet.has(posKey)) return;

        // Actualizar posición
        const celdaAnterior = document.querySelector(`[data-y="${actualY}"][data-x="${actualX}"]`);
        if (celdaAnterior) {
            celdaAnterior.textContent = '✓';
            celdaAnterior.style.background = '#C8E6C9';
        }

        this.laberintoActual.posicionActual = [y, x];
        this.laberintoActual.visitadas.push(posKey);

        const celdaActual = document.querySelector(`[data-y="${y}"][data-x="${x}"]`);
        if (celdaActual) {
            celdaActual.textContent = '🧒';
        }

        // Verificar si llegó al fin
        if (y === laberinto.fin[0] && x === laberinto.fin[1]) {
            setTimeout(() => {
                if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                this.mostrarCelebracion('¡Llegaste a la meta! 🏆✨');
                setTimeout(() => this.mostrarLaberinto(indice + 1), 1500);
            }, 500);
        }
    },

    // === LIBRO DE COLORES ===
    iniciarLibroColores() {
        this.estado.actividadActual = 'colores';
        this.colorSeleccionado = null;
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarPaginaColorear(0);
        }
    },

    mostrarPaginaColorear(indice) {
        const pagina = JSON.parse(JSON.stringify(this.paginasColorear[indice])); // Clonar para resetear colores
        if (!pagina) {
            this.mostrarCelebracion('¡Terminaste todos los dibujos! 🎨✨');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        this.paginaActual = pagina;
        this.colorSeleccionado = null;

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="color: #FF69B4; font-size: 1.3rem;">🎨 Colorea: ${pagina.nombre}</h3>
                <p style="color: #666; font-size: 0.9rem;">Página ${indice + 1} de ${this.paginasColorear.length}</p>
                <p style="color: #666; font-size: 0.9rem;">Selecciona un color y toca una parte del dibujo</p>
            </div>

            <!-- Canvas SVG para dibujar -->
            <div style="display: flex; justify-content: center; margin: 1rem auto;">
                <svg id="canvas-colorear" width="500" height="500" viewBox="0 0 140 120" style="background: white; border: 3px solid #FF69B4; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                    ${pagina.partes.map((parte, idx) => `
                        <path 
                            id="parte-${idx}" 
                            d="${parte.forma}" 
                            fill="${parte.color || 'white'}" 
                            stroke="${parte.stroke ? (parte.color || '#999') : '#333'}" 
                            stroke-width="${parte.stroke ? '4' : '2'}" 
                            style="cursor: pointer; transition: opacity 0.2s;"
                            onmouseenter="this.style.opacity='0.7'"
                            onmouseleave="this.style.opacity='1'"
                            onclick="ExplorerGameEngine.colorearParte(${idx})"
                        />
                    `).join('')}
                </svg>
            </div>

            <!-- Paleta de colores -->
            <div style="text-align: center; margin-top: 1.5rem;">
                <h4 style="color: #FF69B4; margin-bottom: 0.5rem;">Elige un color:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 400px; margin: 0 auto;">
                    ${this.paletaColores.map((color, idx) => `
                        <div 
                            id="color-${idx}"
                            onclick="ExplorerGameEngine.seleccionarColor('${color.hex}', ${idx})" 
                            style="width: 50px; height: 50px; background: ${color.hex}; border: 3px solid ${color.hex === '#FFFFFF' ? '#CCC' : color.hex}; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: transform 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
                            onmouseenter="this.style.transform='scale(1.15)'"
                            onmouseleave="this.style.transform='scale(1)'"
                            title="${color.nombre}"
                        >
                            ${color.emoji}
                        </div>
                    `).join('')}
                </div>
                <p id="color-seleccionado-texto" style="margin-top: 1rem; font-size: 1rem; color: #666;">Selecciona un color</p>
            </div>

            <!-- Botones -->
            <div style="text-align: center; margin-top: 1rem;">
                <button onclick="ExplorerGameEngine.limpiarDibujo()" style="background: #FFA500; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold;">🔄 Limpiar</button>
            </div>
            <div style="text-align: center; margin-top: 1rem; display: flex; gap: 10px; justify-content: center; align-items: center;">
                <button 
                    onclick="ExplorerGameEngine.anteriorPagina(${indice})" 
                    style="background: #4A90E2; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; ${indice === 0 ? 'opacity: 0.5; cursor: not-allowed;' : ''}" 
                    ${indice === 0 ? 'disabled' : ''}>
                    ⬅️ Anterior
                </button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal" style="background: #9370DB;">🏠 Volver al Menú</button>
                <button 
                    onclick="ExplorerGameEngine.siguientePagina(${indice})" 
                    style="background: #32CD32; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; ${indice >= this.paginasColorear.length - 1 ? 'opacity: 0.5; cursor: not-allowed;' : ''}" 
                    ${indice >= this.paginasColorear.length - 1 ? 'disabled' : ''}>
                    Siguiente ➡️
                </button>
            </div>
        `;
    },

    seleccionarColor(hex, idx) {
        this.colorSeleccionado = hex;
        
        // Resetear todos los bordes
        document.querySelectorAll('[id^="color-"]').forEach(el => {
            const originalColor = this.paletaColores[parseInt(el.id.split('-')[1])].hex;
            el.style.border = `3px solid ${originalColor === '#FFFFFF' ? '#CCC' : originalColor}`;
        });
        
        // Destacar color seleccionado
        const colorEl = document.getElementById(`color-${idx}`);
        if (colorEl) {
            colorEl.style.border = `4px solid #000`;
            colorEl.style.transform = 'scale(1.2)';
        }
        
        // Actualizar texto
        const texto = document.getElementById('color-seleccionado-texto');
        if (texto) {
            const colorNombre = this.paletaColores[idx].nombre;
            texto.textContent = `Color seleccionado: ${colorNombre} ${this.paletaColores[idx].emoji}`;
            texto.style.color = hex;
            texto.style.fontWeight = 'bold';
        }
    },

    colorearParte(indiceParteEl) {
        if (!this.colorSeleccionado) {
            this.mostrarCelebracion('Primero selecciona un color 🎨');
            return;
        }

        const parte = document.getElementById(`parte-${indiceParteEl}`);
        if (!parte) return;

        // Actualizar el color de la parte
        if (this.paginaActual.partes[indiceParteEl].stroke) {
            // Si es stroke, cambiar el color del stroke
            parte.setAttribute('stroke', this.colorSeleccionado);
        } else {
            // Si no, cambiar el fill
            parte.setAttribute('fill', this.colorSeleccionado);
        }

        // Actualizar el estado
        this.paginaActual.partes[indiceParteEl].color = this.colorSeleccionado;

        // Animación de éxito
        parte.style.transform = 'scale(1.1)';
        setTimeout(() => {
            parte.style.transform = 'scale(1)';
        }, 200);
    },

    limpiarDibujo() {
        if (!this.paginaActual) return;
        
        // Resetear colores
        this.paginaActual.partes.forEach((parte, idx) => {
            const parteEl = document.getElementById(`parte-${idx}`);
            if (parteEl) {
                if (parte.stroke) {
                    parteEl.setAttribute('stroke', '#999');
                } else {
                    parteEl.setAttribute('fill', 'white');
                }
                parte.color = null;
            }
        });
        
        this.mostrarCelebracion('Dibujo limpio 🧹');
    },

    siguientePagina(indiceActual) {
        this.mostrarPaginaColorear(indiceActual + 1);
    },

    // === ENCUENTRA LAS DIFERENCIAS ===
    iniciarDiferencias() {
        this.estado.actividadActual = 'diferencias';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarDiferencias(0);
        }
    },

    mostrarDiferencias(indice) {
        const nivel = this.diferencias[indice];
        if (!nivel) {
            this.mostrarCelebracion('¡Encontraste todas las diferencias! 🎉🔍');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        const size = nivel.cuadricula;
        const cellSize = 70;
        
        // Estado del nivel actual
        this.diferenciaActual = {
            ...nivel,
            encontradas: [],
            totalDiferencias: nivel.diferenciasPos.length
        };

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <h3 style="color: #FF69B4; font-size: 1.3rem;">🔍 ${nivel.nombre}: Encuentra las diferencias</h3>
                <p style="color: #666; font-size: 1rem;">Haz clic en las diferencias de la imagen derecha</p>
                <div style="background: white; padding: 0.8rem; border-radius: 10px; display: inline-block; margin-top: 0.5rem; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    <p style="font-size: 1.1rem; font-weight: bold; color: #FF6347; margin: 0;" id="contador-diferencias">
                        Encontradas: <span id="num-encontradas">0</span>/${nivel.diferenciasPos.length}
                    </p>
                </div>
                <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">Nivel ${indice + 1} de ${this.diferencias.length}</p>
            </div>
            
            <div style="display: flex; gap: 2rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 2rem auto;">
                <!-- Imagen Base (Izquierda) -->
                <div>
                    <h4 style="text-align: center; color: #2C3E50; margin-bottom: 0.5rem;">Imagen Original</h4>
                    <div id="cuadricula-base" style="display: grid; grid-template-columns: repeat(${size}, ${cellSize}px); gap: 3px; padding: 10px; background: #F0F0F0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);"></div>
                </div>
                
                <!-- Imagen con Diferencias (Derecha) -->
                <div>
                    <h4 style="text-align: center; color: #FF6347; margin-bottom: 0.5rem;">Encuentra las diferencias</h4>
                    <div id="cuadricula-diferencias" style="display: grid; grid-template-columns: repeat(${size}, ${cellSize}px); gap: 3px; padding: 10px; background: #FFF5EE; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);"></div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button 
                    onclick="ExplorerGameEngine.mostrarDiferencias(${indice - 1})" 
                    class="boton-principal" 
                    ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    ⬅️ Anterior
                </button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button 
                    onclick="ExplorerGameEngine.mostrarDiferencias(${indice + 1})" 
                    class="boton-principal"
                    ${indice >= this.diferencias.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    Siguiente ➡️
                </button>
            </div>
        `;

        // Crear cuadrícula base
        const cuadriculaBase = document.getElementById('cuadricula-base');
        nivel.imagenBase.forEach((emoji, idx) => {
            const celda = document.createElement('div');
            celda.style.cssText = `
                width: ${cellSize}px;
                height: ${cellSize}px;
                background: white;
                border: 2px solid #CCC;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
            `;
            celda.textContent = emoji;
            cuadriculaBase.appendChild(celda);
        });

        // Crear cuadrícula con diferencias (clicable)
        const cuadriculaDiferencias = document.getElementById('cuadricula-diferencias');
        nivel.imagenDiferencias.forEach((emoji, idx) => {
            const celda = document.createElement('div');
            celda.style.cssText = `
                width: ${cellSize}px;
                height: ${cellSize}px;
                background: white;
                border: 2px solid #CCC;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                cursor: pointer;
                transition: all 0.3s;
            `;
            celda.textContent = emoji;
            celda.dataset.posicion = idx;
            
            celda.onmouseenter = () => {
                celda.style.transform = 'scale(1.1)';
                celda.style.borderColor = '#FF6347';
            };
            celda.onmouseleave = () => {
                if (!this.diferenciaActual.encontradas.includes(idx)) {
                    celda.style.transform = 'scale(1)';
                    celda.style.borderColor = '#CCC';
                }
            };
            
            celda.onclick = () => this.verificarDiferencia(idx, indice);
            
            cuadriculaDiferencias.appendChild(celda);
        });
    },

    verificarDiferencia(posicion, indice) {
        const nivel = this.diferenciaActual;
        
        // Si ya fue encontrada, no hacer nada
        if (nivel.encontradas.includes(posicion)) return;
        
        const celda = document.querySelector(`#cuadricula-diferencias [data-posicion="${posicion}"]`);
        if (!celda) return;
        
        // Verificar si es una diferencia válida
        if (nivel.diferenciasPos.includes(posicion)) {
            // ¡Correcto!
            nivel.encontradas.push(posicion);
            celda.style.background = 'linear-gradient(135deg, #90EE90, #32CD32)';
            celda.style.border = '3px solid #228B22';
            celda.style.transform = 'scale(1.15)';
            
            // Actualizar contador
            const numEncontradas = document.getElementById('num-encontradas');
            if (numEncontradas) {
                numEncontradas.textContent = nivel.encontradas.length;
            }
            
            // Verificar si completó el nivel
            if (nivel.encontradas.length === nivel.totalDiferencias) {
                setTimeout(() => {
                    if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                    this.mostrarCelebracion('¡Encontraste todas las diferencias! 🎉✨');
                    setTimeout(() => this.mostrarDiferencias(indice + 1), 1500);
                }, 500);
            }
        } else {
            // Incorrecto
            celda.style.background = '#FFB6C1';
            celda.style.border = '3px solid #FF1493';
            setTimeout(() => {
                celda.style.background = 'white';
                celda.style.border = '2px solid #CCC';
            }, 1000);
        }
    },

    // === EMPAREJAR SOMBRAS ===
    iniciarSombras() {
        this.estado.actividadActual = 'sombras';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarSombras(0);
        }
    },

    mostrarSombras(indice) {
        const nivel = this.sombras[indice];
        if (!nivel) {
            this.mostrarCelebracion('¡Emparejaste todas las sombras! 👥✨');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        // Estado del nivel actual
        this.sombraActual = {
            ...nivel,
            objetoSeleccionado: null,
            emparejados: []
        };

        // Mezclar objetos y sombras para diferentes posiciones
        const objetosMezclados = this.mezclarArray([...nivel.objetos]);
        const sombrasMezcladas = this.mezclarArray([...nivel.objetos]);

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="color: #FF69B4; font-size: 1.1rem; margin: 0 0 0.5rem 0;">👥 ${nivel.nombre}</h3>
                <p style="color: #666; font-size: 0.85rem; margin: 0 0 0.5rem 0;">Toca un objeto y luego su sombra</p>
                <div style="background: white; padding: 0.6rem; border-radius: 10px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="font-size: 0.95rem; font-weight: bold; color: #8B7355; margin: 0;" id="contador-sombras">
                        <span id="num-emparejados">0</span>/${nivel.objetos.length} ✓
                    </p>
                </div>
                <p style="color: #666; font-size: 0.75rem; margin-top: 0.3rem;">Nivel ${indice + 1}/${this.sombras.length}</p>
            </div>
            
            <div style="display: flex; gap: 0.8rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 0.5rem auto; padding: 0 0.5rem;">
                <!-- Objetos (Izquierda) -->
                <div>
                    <h4 style="text-align: center; color: #FF69B4; margin-bottom: 0.5rem; font-size: 0.9rem;">Objetos</h4>
                    <div id="contenedor-objetos" style="display: flex; flex-direction: column; gap: 10px;">
                        ${objetosMezclados.map((objeto, idx) => `
                            <div 
                                id="objeto-${objeto}" 
                                onclick="ExplorerGameEngine.seleccionarObjeto('${objeto}', ${indice})"
                                style="width: 65px; height: 65px; background: linear-gradient(135deg, #FFE4E1, #FFC0CB); border: 3px solid #FF69B4; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 3px 6px rgba(0,0,0,0.2);"
                                ontouchstart="this.style.transform='scale(1.05)'"
                                ontouchend="this.style.transform=ExplorerGameEngine.sombraActual?.objetoSeleccionado === '${objeto}' ? 'scale(1.1)' : 'scale(1)'"
                            >
                                ${objeto}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Sombras (Derecha) -->
                <div>
                    <h4 style="text-align: center; color: #654321; margin-bottom: 0.5rem; font-size: 0.9rem;">Sombras</h4>
                    <div id="contenedor-sombras" style="display: flex; flex-direction: column; gap: 10px;">
                        ${sombrasMezcladas.map((sombra, idx) => `
                            <div 
                                id="sombra-${sombra}" 
                                data-objeto="${sombra}"
                                onclick="ExplorerGameEngine.verificarSombra('${sombra}', ${indice})"
                                style="width: 65px; height: 65px; background: linear-gradient(135deg, #8B7355, #654321); border: 3px solid #4A4A4A; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 3px 6px rgba(0,0,0,0.3); filter: brightness(0.4);"
                                ontouchstart="this.style.transform='scale(1.05)'"
                                ontouchend="this.style.transform='scale(1)'"
                            >
                                ${sombra}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button 
                    onclick="ExplorerGameEngine.mostrarSombras(${indice - 1})" 
                    class="boton-secundario"
                    style="${indice === 0 ? 'display: none;' : ''}"
                    ${indice === 0 ? 'disabled' : ''}>
                    ⬅️ Anterior
                </button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button 
                    onclick="ExplorerGameEngine.mostrarSombras(${indice + 1})" 
                    class="boton-secundario"
                    style="${indice === this.sombras.length - 1 ? 'display: none;' : ''}"
                    ${indice === this.sombras.length - 1 ? 'disabled' : ''}>
                    Siguiente ➡️
                </button>
            </div>
        `;
    },

    seleccionarObjeto(objeto, indice) {
        const estado = this.sombraActual;
        if (!estado) return;

        // Si ya está emparejado, no hacer nada
        if (estado.emparejados.includes(objeto)) return;

        // Deseleccionar anterior
        if (estado.objetoSeleccionado) {
            const anteriorEl = document.getElementById(`objeto-${estado.objetoSeleccionado}`);
            if (anteriorEl) {
                anteriorEl.style.border = '3px solid #FF69B4';
                anteriorEl.style.transform = 'scale(1)';
                anteriorEl.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }
        }

        // Seleccionar nuevo
        estado.objetoSeleccionado = objeto;
        const objetoEl = document.getElementById(`objeto-${objeto}`);
        if (objetoEl) {
            objetoEl.style.border = '4px solid #FF1493';
            objetoEl.style.transform = 'scale(1.15)';
            objetoEl.style.boxShadow = '0 6px 12px rgba(255,20,147,0.4)';
        }
    },

    verificarSombra(sombra, indice) {
        const estado = this.sombraActual;
        if (!estado) return;

        // Verificar que hay un objeto seleccionado
        if (!estado.objetoSeleccionado) {
            this.mostrarCelebracion('Primero selecciona un objeto 👆');
            return;
        }

        // Si ya está emparejado, no hacer nada
        if (estado.emparejados.includes(sombra)) return;

        const objetoEl = document.getElementById(`objeto-${estado.objetoSeleccionado}`);
        const sombraEl = document.getElementById(`sombra-${sombra}`);

        // Verificar si coinciden
        if (estado.objetoSeleccionado === sombra) {
            // ¡Correcto!
            estado.emparejados.push(sombra);

            // Marcar como emparejados con animación
            if (objetoEl) {
                objetoEl.style.background = 'linear-gradient(135deg, #90EE90, #32CD32)';
                objetoEl.style.border = '4px solid #228B22';
                objetoEl.style.cursor = 'default';
                objetoEl.onclick = null;
                objetoEl.style.opacity = '0.6';
            }

            if (sombraEl) {
                sombraEl.style.background = 'linear-gradient(135deg, #90EE90, #32CD32)';
                sombraEl.style.border = '4px solid #228B22';
                sombraEl.style.filter = 'brightness(1)';
                sombraEl.style.cursor = 'default';
                sombraEl.onclick = null;
                sombraEl.style.opacity = '0.6';
            }

            // Actualizar contador
            const numEmparejados = document.getElementById('num-emparejados');
            if (numEmparejados) {
                numEmparejados.textContent = estado.emparejados.length;
            }

            // Resetear selección
            estado.objetoSeleccionado = null;

            // Verificar si completó el nivel
            if (estado.emparejados.length === estado.objetos.length) {
                setTimeout(() => {
                    if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                    this.mostrarCelebracion('¡Emparejaste todos correctamente! 🎉👥');
                    setTimeout(() => this.mostrarSombras(indice + 1), 1500);
                }, 500);
            }
        } else {
            // Incorrecto - animación de error
            if (sombraEl) {
                sombraEl.style.background = 'linear-gradient(135deg, #FF6B6B, #FF4444)';
                sombraEl.style.border = '4px solid #FF0000';
                setTimeout(() => {
                    sombraEl.style.background = 'linear-gradient(135deg, #8B7355, #654321)';
                    sombraEl.style.border = '3px solid #4A4A4A';
                }, 1000);
            }

            this.mostrarCelebracion('Esa no es la sombra correcta 🤔');
        }
    },

    // === UNIR PAREJAS ===
    iniciarUnirParejas() {
        this.estado.actividadActual = 'parejas';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarUnirParejas(0);
        }
    },

    mostrarUnirParejas(indice) {
        const nivel = this.parejas[indice];
        if (!nivel) {
            this.mostrarCelebracion('¡Uniste todas las parejas! 🔗✨');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        // Estado del nivel actual
        this.parejaActual = {
            ...nivel,
            seleccionadoIzq: null,
            unidos: []
        };

        // Mezclar elementos
        const izqMezclados = this.mezclarArray([...nivel.izquierda]);
        const derMezclados = this.mezclarArray([...nivel.derecha]);

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="color: #FF69B4; font-size: 1.1rem; margin: 0 0 0.5rem 0;">🔗 ${nivel.nombre}</h3>
                <p style="color: #666; font-size: 0.85rem; margin: 0 0 0.5rem 0;">Toca un elemento y luego su pareja</p>
                <div style="background: white; padding: 0.6rem; border-radius: 10px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="font-size: 0.95rem; font-weight: bold; color: #20B2AA; margin: 0;" id="contador-parejas">
                        <span id="num-unidos">0</span>/${nivel.izquierda.length} ✓
                    </p>
                </div>
                <p style="color: #666; font-size: 0.75rem; margin-top: 0.3rem;">Nivel ${indice + 1}/${this.parejas.length}</p>
            </div>
            
            <div style="display: flex; gap: 0.8rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 0.5rem auto; padding: 0 0.5rem;">
                <!-- Columna Izquierda -->
                <div>
                    <div id="contenedor-izquierda" style="display: flex; flex-direction: column; gap: 10px;">
                        ${izqMezclados.map((item, idx) => `
                            <div 
                                id="izq-${item.id}" 
                                data-id="${item.id}"
                                onclick="ExplorerGameEngine.seleccionarIzquierda('${item.id}', '${item.emoji}')"
                                style="width: 65px; height: 65px; background: linear-gradient(135deg, #E0F7FA, #B2EBF2); border: 3px solid #20B2AA; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 3px 6px rgba(0,0,0,0.2);"
                                ontouchstart="this.style.transform='scale(1.05)'"
                                ontouchend="this.style.transform=ExplorerGameEngine.parejaActual?.seleccionadoIzq === '${item.id}' ? 'scale(1.1)' : 'scale(1)'"
                            >
                                ${item.emoji}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Columna Derecha -->
                <div>
                    <div id="contenedor-derecha" style="display: flex; flex-direction: column; gap: 10px;">
                        ${derMezclados.map((item, idx) => `
                            <div 
                                id="der-${item.id}" 
                                data-id="${item.id}"
                                onclick="ExplorerGameEngine.verificarDerecha('${item.id}', '${item.emoji}', ${indice})"
                                style="width: 65px; height: 65px; background: linear-gradient(135deg, #FFF9C4, #FFF59D); border: 3px solid #FFD54F; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 3px 6px rgba(0,0,0,0.2);"
                                ontouchstart="this.style.transform='scale(1.05)'"
                                ontouchend="this.style.transform='scale(1)'"
                            >
                                ${item.emoji}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                <button onclick="ExplorerGameEngine.mostrarUnirParejas(${indice - 1})" class="boton-principal" style="background: #6c757d;">⬅️ Nivel Anterior</button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button onclick="ExplorerGameEngine.mostrarUnirParejas(${indice + 1})" class="boton-principal" style="background: #28a745;">Nivel Siguiente ➡️</button>
            </div>
        `;
    },

    seleccionarIzquierda(id, emoji) {
        const estado = this.parejaActual;
        if (!estado) return;

        // Si ya está unido, no hacer nada
        if (estado.unidos.includes(id)) return;

        // Deseleccionar anterior
        if (estado.seleccionadoIzq) {
            const anteriorEl = document.getElementById(`izq-${estado.seleccionadoIzq}`);
            if (anteriorEl && !estado.unidos.includes(estado.seleccionadoIzq)) {
                anteriorEl.style.border = '3px solid #20B2AA';
                anteriorEl.style.transform = 'scale(1)';
                anteriorEl.style.boxShadow = '0 3px 6px rgba(0,0,0,0.2)';
            }
        }

        // Seleccionar nuevo
        estado.seleccionadoIzq = id;
        const elementoEl = document.getElementById(`izq-${id}`);
        if (elementoEl) {
            elementoEl.style.border = '4px solid #00796B';
            elementoEl.style.transform = 'scale(1.1)';
            elementoEl.style.boxShadow = '0 6px 12px rgba(0,121,107,0.4)';
        }
    },

    verificarDerecha(id, emoji, indice) {
        const estado = this.parejaActual;
        if (!estado) return;

        // Verificar que hay un elemento seleccionado
        if (!estado.seleccionadoIzq) {
            this.mostrarCelebracion('Primero toca un elemento de la izquierda 👈');
            return;
        }

        // Si ya está unido, no hacer nada
        if (estado.unidos.includes(id)) return;

        const izqEl = document.getElementById(`izq-${estado.seleccionadoIzq}`);
        const derEl = document.getElementById(`der-${id}`);

        // Verificar si coinciden (mismo id)
        if (estado.seleccionadoIzq === id) {
            // ¡Correcto!
            estado.unidos.push(id);

            // Marcar como unidos con animación
            if (izqEl) {
                izqEl.style.background = 'linear-gradient(135deg, #81C784, #66BB6A)';
                izqEl.style.border = '4px solid #388E3C';
                izqEl.style.cursor = 'default';
                izqEl.onclick = null;
                izqEl.style.opacity = '0.7';
            }

            if (derEl) {
                derEl.style.background = 'linear-gradient(135deg, #81C784, #66BB6A)';
                derEl.style.border = '4px solid #388E3C';
                derEl.style.cursor = 'default';
                derEl.onclick = null;
                derEl.style.opacity = '0.7';
            }

            // Actualizar contador
            const numUnidos = document.getElementById('num-unidos');
            if (numUnidos) {
                numUnidos.textContent = estado.unidos.length;
            }

            // Resetear selección
            estado.seleccionadoIzq = null;

            // Verificar si completó el nivel
            if (estado.unidos.length === this.parejaActual.izquierda.length) {
                setTimeout(() => {
                    if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                    this.mostrarCelebracion('¡Uniste todas las parejas! 🎉🔗');
                    setTimeout(() => this.mostrarUnirParejas(indice + 1), 1500);
                }, 500);
            }
        } else {
            // Incorrecto - animación de error
            if (derEl) {
                derEl.style.background = 'linear-gradient(135deg, #EF9A9A, #E57373)';
                derEl.style.border = '4px solid #D32F2F';
                setTimeout(() => {
                    derEl.style.background = 'linear-gradient(135deg, #FFF9C4, #FFF59D)';
                    derEl.style.border = '3px solid #FFD54F';
                }, 1000);
            }

            this.mostrarCelebracion('Esa no es la pareja correcta 🤔');
        }
    },

    // === SIMON DICE ===
    iniciarSimonDice() {
        this.estado.actividadActual = 'simon';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarSimonDice(0);
        }
    },

    mostrarSimonDice(indice) {
        const nivel = this.simonDice[indice];
        if (!nivel) {
            this.mostrarCelebracion('¡Completaste todos los niveles de Simon Dice! 🎯✨');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        // Generar secuencia aleatoria de colores
        const secuencia = this.generarSecuenciaSimon(nivel.longitud);

        // Estado del nivel actual
        this.simonActual = {
            ...nivel,
            secuencia: secuencia,
            secuenciaUsuario: [],
            mostrandoSecuencia: false,
            esperandoInput: false,
            indice: indice
        };

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="color: #FF69B4; font-size: 1.2rem; margin: 0 0 0.5rem 0;">🎯 Simon Dice</h3>
                <h4 style="color: #EE5A6F; font-size: 1rem; margin: 0 0 0.5rem 0;">${nivel.nombre}</h4>
                <div style="background: white; padding: 0.6rem 1rem; border-radius: 10px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="font-size: 0.95rem; font-weight: bold; color: #2C3E50; margin: 0;" id="instruccion-simon">
                        ¡Observa la secuencia!
                    </p>
                </div>
                <p style="color: #666; font-size: 0.75rem; margin-top: 0.3rem;">Nivel ${indice + 1}/${this.simonDice.length} - Secuencia de ${nivel.longitud} colores</p>
            </div>
            
            <!-- Botones de colores -->
            <div style="display: grid; grid-template-columns: repeat(2, 120px); gap: 15px; justify-content: center; margin: 1.5rem auto; max-width: 270px;">
                ${this.coloresSimon.map((colorObj, idx) => `
                    <div 
                        id="color-simon-${idx}" 
                        data-color="${idx}"
                        onclick="ExplorerGameEngine.registrarColorSimon(${idx})"
                        style="width: 120px; height: 120px; background: ${colorObj.color}; border: 4px solid #333; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 3rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 8px rgba(0,0,0,0.3); user-select: none;"
                        ontouchstart="this.style.transform='scale(0.95)'"
                        ontouchend="this.style.transform='scale(1)'"
                    >
                        ${colorObj.emoji}
                    </div>
                `).join('')}
            </div>
            
            <!-- Indicador de progreso -->
            <div style="text-align: center; margin-top: 1.5rem;">
                <div style="background: white; padding: 0.8rem 1.2rem; border-radius: 10px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="font-size: 0.9rem; color: #666; margin: 0;" id="progreso-simon">
                        Tu turno: <span style="font-weight: bold; color: #EE5A6F;">0</span>/${nivel.longitud}
                    </p>
                </div>
            </div>
            
            <!-- Navegación entre niveles -->
            <div style="display: flex; justify-content: center; gap: 10px; margin-top: 1.5rem;">
                <button 
                    onclick="ExplorerGameEngine.mostrarSimonDice(${indice - 1})" 
                    class="boton-principal"
                    ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    ⬅️ Anterior
                </button>
                <button 
                    onclick="ExplorerGameEngine.mostrarSimonDice(${indice + 1})" 
                    class="boton-principal"
                    ${indice === this.simonDice.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    Siguiente ➡️
                </button>
            </div>
            
            <div style="text-align: center; margin-top: 1rem;">
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
            </div>
        `;

        // Deshabilitar botones mientras se muestra la secuencia
        this.deshabilitarBotonesSimon(true);

        // Mostrar la secuencia después de un breve delay
        setTimeout(() => {
            this.mostrarSecuenciaSimon();
        }, 1000);
    },

    generarSecuenciaSimon(longitud) {
        const secuencia = [];
        for (let i = 0; i < longitud; i++) {
            secuencia.push(Math.floor(Math.random() * 4)); // 0-3 para los 4 colores
        }
        return secuencia;
    },

    async mostrarSecuenciaSimon() {
        if (!this.simonActual) return;

        this.simonActual.mostrandoSecuencia = true;
        this.simonActual.esperandoInput = false;
        this.deshabilitarBotonesSimon(true);

        const instruccion = document.getElementById('instruccion-simon');
        if (instruccion) {
            instruccion.textContent = '👀 ¡Observa bien!';
        }

        // Mostrar cada color en secuencia con animación
        for (let i = 0; i < this.simonActual.secuencia.length; i++) {
            const colorIdx = this.simonActual.secuencia[i];
            await this.iluminarColorSimon(colorIdx, 600);
            await this.esperar(200); // Pausa entre colores
        }

        // Terminar de mostrar, ahora es turno del usuario
        this.simonActual.mostrandoSecuencia = false;
        this.simonActual.esperandoInput = true;
        this.simonActual.secuenciaUsuario = [];
        this.deshabilitarBotonesSimon(false);

        if (instruccion) {
            instruccion.textContent = '🎯 ¡Ahora repite la secuencia!';
        }

        this.actualizarProgresoSimon();
    },

    async iluminarColorSimon(colorIdx, duracion) {
        const boton = document.getElementById(`color-simon-${colorIdx}`);
        if (!boton) return;

        const colorObj = this.coloresSimon[colorIdx];
        
        // Iluminar
        boton.style.background = colorObj.colorClaro;
        boton.style.transform = 'scale(1.15)';
        boton.style.boxShadow = `0 0 30px ${colorObj.color}`;
        
        // Sonido (opcional, si AudioSynth está disponible)
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playNote) {
            const notas = ['C4', 'E4', 'G4', 'C5'];
            AudioSynth.playNote(notas[colorIdx], 0.3);
        }

        await this.esperar(duracion);

        // Apagar
        boton.style.background = colorObj.color;
        boton.style.transform = 'scale(1)';
        boton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    },

    registrarColorSimon(colorIdx) {
        if (!this.simonActual || !this.simonActual.esperandoInput) return;

        // Añadir color a la secuencia del usuario
        this.simonActual.secuenciaUsuario.push(colorIdx);

        // Iluminar brevemente el botón presionado
        this.iluminarColorSimon(colorIdx, 300);

        // Actualizar progreso
        this.actualizarProgresoSimon();

        // Verificar si completó la secuencia
        const posActual = this.simonActual.secuenciaUsuario.length - 1;
        const colorCorrecto = this.simonActual.secuencia[posActual];

        if (colorIdx !== colorCorrecto) {
            // Error: color incorrecto
            this.simonActual.esperandoInput = false;
            this.deshabilitarBotonesSimon(true);

            setTimeout(() => {
                this.mostrarCelebracion('¡Oops! Inténtalo de nuevo 🤔');
                setTimeout(() => {
                    // Reiniciar el nivel mostrando la secuencia de nuevo
                    this.mostrarSecuenciaSimon();
                }, 1500);
            }, 500);

        } else if (this.simonActual.secuenciaUsuario.length === this.simonActual.secuencia.length) {
            // ¡Completó correctamente toda la secuencia!
            this.simonActual.esperandoInput = false;
            this.deshabilitarBotonesSimon(true);

            setTimeout(() => {
                if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                this.mostrarCelebracion('¡Perfecto! ✨🎯');
                setTimeout(() => {
                    this.mostrarSimonDice(this.simonActual.indice + 1);
                }, 1500);
            }, 500);
        }
    },

    deshabilitarBotonesSimon(deshabilitar) {
        for (let i = 0; i < 4; i++) {
            const boton = document.getElementById(`color-simon-${i}`);
            if (boton) {
                boton.style.cursor = deshabilitar ? 'not-allowed' : 'pointer';
                boton.style.opacity = deshabilitar ? '0.6' : '1';
                if (deshabilitar) {
                    boton.onclick = null;
                } else {
                    boton.onclick = () => this.registrarColorSimon(i);
                }
            }
        }
    },

    actualizarProgresoSimon() {
        const progreso = document.getElementById('progreso-simon');
        if (progreso && this.simonActual) {
            const actual = this.simonActual.secuenciaUsuario.length;
            const total = this.simonActual.secuencia.length;
            progreso.innerHTML = `Tu turno: <span style="font-weight: bold; color: #EE5A6F;">${actual}</span>/${total}`;
        }
    },

    esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // === CLASIFICAR COLORES ===
    iniciarClasificarColores() {
        this.estado.actividadActual = 'clasificar';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarClasificarColores(0);
        }
    },

    mostrarClasificarColores(indice) {
        const nivel = this.clasificarColores[indice];
        if (!nivel) {
            this.mostrarCelebracion('¡Clasificaste todos los colores! 🎨✨');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        // Estado del nivel actual
        this.clasificarActual = {
            ...nivel,
            clasificados: {},
            indice: indice
        };

        // Inicializar contador de clasificados por color
        nivel.colores.forEach(color => {
            this.clasificarActual.clasificados[color.nombre] = 0;
        });

        // Mezclar objetos
        const objetosMezclados = this.mezclarArray([...nivel.objetos]);

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="color: #FF69B4; font-size: 1.2rem; margin: 0 0 0.5rem 0;">🎨 Clasificar Colores</h3>
                <h4 style="color: #FF1493; font-size: 1rem; margin: 0 0 0.5rem 0;">${nivel.nombre}</h4>
                <div style="background: white; padding: 0.6rem 1rem; border-radius: 10px; display: inline-block; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="font-size: 0.95rem; font-weight: bold; color: #2C3E50; margin: 0;">
                        Arrastra cada objeto a su cubo de color
                    </p>
                </div>
                <p style="color: #666; font-size: 0.75rem; margin-top: 0.3rem;">Nivel ${indice + 1}/${this.clasificarColores.length}</p>
            </div>
            
            <!-- Cubos de colores (arriba) -->
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 1rem auto; padding: 0 0.5rem;">
                ${nivel.colores.map((colorObj, idx) => `
                    <div style="text-align: center;">
                        <div 
                            id="cubo-${colorObj.nombre}" 
                            data-color="${colorObj.nombre}"
                            style="width: 100px; height: 120px; background: linear-gradient(135deg, ${colorObj.hex}, ${colorObj.hex}DD); border: 4px solid ${colorObj.hex}; border-radius: 15px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.3); position: relative;"
                        >
                            <div style="font-size: 2rem; margin-bottom: 5px;">${colorObj.emoji}</div>
                            <div style="font-size: 0.7rem; font-weight: bold; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${colorObj.nombre}</div>
                            <div id="contador-${colorObj.nombre}" style="position: absolute; top: 5px; right: 5px; background: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">0</div>
                            <div id="objetos-${colorObj.nombre}" style="flex: 1; display: flex; flex-wrap: wrap; gap: 3px; align-items: flex-start; justify-content: center; margin-top: 5px; overflow: hidden;"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Objetos para clasificar (abajo) -->
            <div style="text-align: center; margin-top: 2rem;">
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">Arrastra los objetos:</p>
                <div id="objetos-clasificar" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding: 1rem; background: #F5F5F5; border-radius: 15px; margin: 0 auto; max-width: 600px; min-height: 100px;">
                    ${objetosMezclados.map((objeto, idx) => `
                        <div 
                            id="objeto-${idx}" 
                            draggable="true"
                            data-color="${objeto.color}"
                            data-emoji="${objeto.emoji}"
                            style="width: 60px; height: 60px; background: white; border: 3px solid #999; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: move; transition: all 0.3s; box-shadow: 0 3px 6px rgba(0,0,0,0.2);"
                        >
                            ${objeto.emoji}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button 
                    onclick="ExplorerGameEngine.mostrarClasificarColores(${indice - 1})" 
                    class="boton-principal"
                    ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    ⬅️ Anterior
                </button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button 
                    onclick="ExplorerGameEngine.mostrarClasificarColores(${indice + 1})" 
                    class="boton-principal"
                    ${indice === this.clasificarColores.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    Siguiente ➡️
                </button>
            </div>
        `;

        // Configurar drag and drop para objetos
        document.querySelectorAll('[id^="objeto-"]').forEach(objeto => {
            objeto.ondragstart = (e) => {
                e.dataTransfer.setData('objetoId', objeto.id);
                e.dataTransfer.setData('color', objeto.dataset.color);
                e.dataTransfer.setData('emoji', objeto.dataset.emoji);
                objeto.style.opacity = '0.5';
            };
            
            objeto.ondragend = (e) => {
                objeto.style.opacity = '1';
            };

            // Soporte táctil básico
            objeto.ontouchstart = (e) => {
                objeto.style.transform = 'scale(1.1)';
            };
            objeto.ontouchend = (e) => {
                objeto.style.transform = 'scale(1)';
            };
        });

        // Configurar drop zones en los cubos
        nivel.colores.forEach(colorObj => {
            const cubo = document.getElementById(`cubo-${colorObj.nombre}`);
            if (!cubo) return;

            cubo.ondragover = (e) => {
                e.preventDefault();
                cubo.style.transform = 'scale(1.05)';
                cubo.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
            };
            
            cubo.ondragleave = () => {
                cubo.style.transform = 'scale(1)';
                cubo.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            };
            
            cubo.ondrop = (e) => {
                e.preventDefault();
                const objetoId = e.dataTransfer.getData('objetoId');
                const colorObjeto = e.dataTransfer.getData('color');
                const emoji = e.dataTransfer.getData('emoji');
                
                this.clasificarObjeto(objetoId, colorObjeto, colorObj.nombre, emoji);
                
                cubo.style.transform = 'scale(1)';
                cubo.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            };
        });
    },

    clasificarObjeto(objetoId, colorObjeto, colorCubo, emoji) {
        const objetoEl = document.getElementById(objetoId);
        if (!objetoEl) return;

        if (colorObjeto === colorCubo) {
            // ¡Correcto!
            const contenedorObjetos = document.getElementById(`objetos-${colorCubo}`);
            if (contenedorObjetos) {
                // Crear mini versión del objeto en el cubo
                const miniObjeto = document.createElement('div');
                miniObjeto.style.cssText = 'font-size: 1.2rem;';
                miniObjeto.textContent = emoji;
                contenedorObjetos.appendChild(miniObjeto);
                
                // Actualizar contador
                this.clasificarActual.clasificados[colorCubo]++;
                const contador = document.getElementById(`contador-${colorCubo}`);
                if (contador) {
                    contador.textContent = this.clasificarActual.clasificados[colorCubo];
                }
                
                // Remover objeto original
                objetoEl.remove();
                
                // Verificar si completó el nivel
                const objetosRestantes = document.querySelectorAll('[id^="objeto-"]').length;
                if (objetosRestantes === 0) {
                    setTimeout(() => {
                        if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
                        this.mostrarCelebracion('¡Perfecto! Clasificaste todos los objetos 🎨✨');
                        setTimeout(() => {
                            this.mostrarClasificarColores(this.clasificarActual.indice + 1);
                        }, 1500);
                    }, 500);
                }
            }
        } else {
            // Incorrecto
            objetoEl.style.border = '4px solid #FF0000';
            objetoEl.style.transform = 'rotate(10deg)';
            setTimeout(() => {
                objetoEl.style.border = '3px solid #999';
                objetoEl.style.transform = 'rotate(0deg)';
            }, 500);
            this.mostrarCelebracion('¡Ese no es el color correcto! Intenta de nuevo 🤔');
        }
    },

    // === COPIA EL DIBUJO ===
    iniciarCopiarDibujo() {
        this.estado.actividadActual = 'copiar-dibujo';
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (menuActividades) menuActividades.style.display = 'none';
        if (contenedorActividades) {
            contenedorActividades.style.display = 'block';
            this.mostrarCopiarDibujo(0);
        }
    },

    mostrarCopiarDibujo(indice) {
        const nivel = this.copiarDibujo[indice];
        if (!nivel) {
            this.mostrarCelebracion('¡Completaste todos los dibujos! 🖼️✨');
            setTimeout(() => this.volverMenuActividades(), 2000);
            return;
        }

        const contenedor = document.getElementById('contenedor-actividades-explorer');
        if (!contenedor) return;

        // Inicializar estado del nivel
        this.copiarDibujoActual = {
            ...nivel,
            lienzo: Array(nivel.tamano).fill(null).map(() => Array(nivel.tamano).fill('⬜')),
            colorSeleccionado: null,
            indice: indice
        };

        const cellSize = 50;

        contenedor.innerHTML = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <h3 style="color: #FF69B4; font-size: 1.2rem; margin: 0 0 0.5rem 0;">🖼️ Copia el Dibujo</h3>
                <h4 style="color: #FF7F50; font-size: 1rem; margin: 0 0 0.5rem 0;">${nivel.nombre}</h4>
                <p style="color: #666; font-size: 0.85rem; margin: 0;">Selecciona un color y pinta en tu lienzo</p>
                <p style="color: #666; font-size: 0.75rem; margin-top: 0.3rem;">Nivel ${indice + 1}/${this.copiarDibujo.length}</p>
            </div>
            
            <div style="display: flex; gap: 2rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 1rem auto;">
                <!-- Imagen de referencia (Izquierda) -->
                <div>
                    <h4 style="text-align: center; color: #2C3E50; margin-bottom: 0.5rem; font-size: 0.9rem;">📷 Imagen Original</h4>
                    <div id="referencia-dibujo" style="display: grid; grid-template-columns: repeat(${nivel.tamano}, ${cellSize}px); gap: 2px; padding: 10px; background: #F0F0F0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);"></div>
                </div>
                
                <!-- Tu lienzo (Derecha) -->
                <div>
                    <h4 style="text-align: center; color: #FF7F50; margin-bottom: 0.5rem; font-size: 0.9rem;">🎨 Tu Dibujo</h4>
                    <div id="lienzo-dibujo" style="display: grid; grid-template-columns: repeat(${nivel.tamano}, ${cellSize}px); gap: 2px; padding: 10px; background: #FFF5EE; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);"></div>
                </div>
            </div>
            
            <!-- Paleta de colores -->
            <div style="text-align: center; margin-top: 1.5rem;">
                <h4 style="color: #FF69B4; margin-bottom: 0.5rem; font-size: 0.9rem;">🎨 Paleta de Colores</h4>
                <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; max-width: 500px; margin: 0 auto;">
                    ${nivel.colores.map((color, idx) => `
                        <div 
                            id="color-dibujo-${idx}"
                            onclick="ExplorerGameEngine.seleccionarColorDibujo('${color}', ${idx})"
                            style="width: 45px; height: 45px; background: white; border: 3px solid #999; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
                            ontouchstart="this.style.transform='scale(1.1)'"
                            ontouchend="this.style.transform='scale(1)'"
                        >
                            ${color}
                        </div>
                    `).join('')}
                </div>
                <p id="color-seleccionado-dibujo" style="margin-top: 0.8rem; font-size: 0.9rem; color: #666; font-weight: bold;">Selecciona un color para pintar</p>
            </div>
            
            <!-- Botones de acción -->
            <div style="text-align: center; margin-top: 1rem;">
                <button 
                    onclick="ExplorerGameEngine.limpiarLienzoDibujo()" 
                    style="background: #FFA500; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-right: 10px;"
                >
                    🔄 Limpiar
                </button>
                <button 
                    onclick="ExplorerGameEngine.verificarDibujoCompleto()" 
                    style="background: #32CD32; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
                >
                    ✓ Verificar
                </button>
            </div>
            
            <div style="text-align: center; margin-top: 1.5rem; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button 
                    onclick="ExplorerGameEngine.mostrarCopiarDibujo(${indice - 1})" 
                    class="boton-principal"
                    ${indice === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    ⬅️ Anterior
                </button>
                <button onclick="ExplorerGameEngine.volverMenuActividades()" class="boton-principal">🏠 Volver al Menú</button>
                <button 
                    onclick="ExplorerGameEngine.mostrarCopiarDibujo(${indice + 1})" 
                    class="boton-principal"
                    ${indice >= this.copiarDibujo.length - 1 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                >
                    Siguiente ➡️
                </button>
            </div>
        `;

        // Crear cuadrícula de referencia
        const referenciaDiv = document.getElementById('referencia-dibujo');
        nivel.referencia.forEach((fila, y) => {
            fila.forEach((color, x) => {
                const celda = document.createElement('div');
                celda.style.cssText = `
                    width: ${cellSize}px;
                    height: ${cellSize}px;
                    background: white;
                    border: 2px solid #CCC;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                `;
                celda.textContent = color;
                referenciaDiv.appendChild(celda);
            });
        });

        // Crear lienzo editable
        const lienzoDiv = document.getElementById('lienzo-dibujo');
        this.copiarDibujoActual.lienzo.forEach((fila, y) => {
            fila.forEach((color, x) => {
                const celda = document.createElement('div');
                celda.style.cssText = `
                    width: ${cellSize}px;
                    height: ${cellSize}px;
                    background: white;
                    border: 2px solid #CCC;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: all 0.2s;
                `;
                celda.textContent = color;
                celda.dataset.y = y;
                celda.dataset.x = x;
                
                celda.onclick = () => this.pintarCeldaDibujo(y, x);
                
                celda.onmouseenter = () => {
                    celda.style.transform = 'scale(1.1)';
                    celda.style.borderColor = '#FF7F50';
                };
                celda.onmouseleave = () => {
                    celda.style.transform = 'scale(1)';
                    celda.style.borderColor = '#CCC';
                };
                
                lienzoDiv.appendChild(celda);
            });
        });
    },

    seleccionarColorDibujo(color, idx) {
        if (!this.copiarDibujoActual) return;

        this.copiarDibujoActual.colorSeleccionado = color;

        // Resetear todos los bordes
        document.querySelectorAll('[id^="color-dibujo-"]').forEach(el => {
            el.style.border = '3px solid #999';
            el.style.transform = 'scale(1)';
        });

        // Destacar color seleccionado
        const colorEl = document.getElementById(`color-dibujo-${idx}`);
        if (colorEl) {
            colorEl.style.border = '4px solid #FF7F50';
            colorEl.style.transform = 'scale(1.15)';
            colorEl.style.boxShadow = '0 4px 8px rgba(255,127,80,0.4)';
        }

        // Actualizar texto
        const texto = document.getElementById('color-seleccionado-dibujo');
        if (texto) {
            texto.textContent = `Color seleccionado: ${color}`;
            texto.style.color = '#FF7F50';
        }
    },

    pintarCeldaDibujo(y, x) {
        if (!this.copiarDibujoActual || !this.copiarDibujoActual.colorSeleccionado) {
            this.mostrarCelebracion('Primero selecciona un color de la paleta 🎨');
            return;
        }

        // Actualizar el lienzo en memoria
        this.copiarDibujoActual.lienzo[y][x] = this.copiarDibujoActual.colorSeleccionado;

        // Actualizar visualmente
        const lienzoDiv = document.getElementById('lienzo-dibujo');
        const celdas = lienzoDiv.querySelectorAll('div');
        const indice = y * this.copiarDibujoActual.tamano + x;
        const celda = celdas[indice];
        
        if (celda) {
            celda.textContent = this.copiarDibujoActual.colorSeleccionado;
            celda.style.transform = 'scale(1.2)';
            setTimeout(() => {
                celda.style.transform = 'scale(1)';
            }, 200);
        }
    },

    limpiarLienzoDibujo() {
        if (!this.copiarDibujoActual) return;

        // Resetear lienzo
        this.copiarDibujoActual.lienzo = Array(this.copiarDibujoActual.tamano)
            .fill(null)
            .map(() => Array(this.copiarDibujoActual.tamano).fill('⬜'));

        // Actualizar visualmente
        const lienzoDiv = document.getElementById('lienzo-dibujo');
        if (lienzoDiv) {
            const celdas = lienzoDiv.querySelectorAll('div');
            celdas.forEach(celda => {
                celda.textContent = '⬜';
            });
        }

        this.mostrarCelebracion('Lienzo limpio 🧹');
    },

    verificarDibujoCompleto() {
        if (!this.copiarDibujoActual) return;

        const nivel = this.copiarDibujoActual;
        let errores = 0;
        let total = 0;

        // Comparar cada celda
        for (let y = 0; y < nivel.tamano; y++) {
            for (let x = 0; x < nivel.tamano; x++) {
                total++;
                if (nivel.lienzo[y][x] !== nivel.referencia[y][x]) {
                    errores++;
                }
            }
        }

        const porcentaje = Math.round(((total - errores) / total) * 100);

        if (errores === 0) {
            // ¡Perfecto!
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
            this.mostrarCelebracion('¡Perfecto! Copiaste el dibujo exactamente 🎨✨');
            setTimeout(() => {
                this.mostrarCopiarDibujo(nivel.indice + 1);
            }, 2000);
        } else if (porcentaje >= 80) {
            // Muy bien, pero no perfecto
            this.mostrarCelebracion(`¡Muy bien! ${porcentaje}% correcto. ¡Sigue así! 🎨`);
        } else {
            // Necesita mejorar
            this.mostrarCelebracion(`${porcentaje}% correcto. Revisa los colores 🔍`);
        }
    },

    // === FUNCIONES AUXILIARES ===
    
    volverMenuActividades() {
        const contenedorActividades = document.getElementById('contenedor-actividades-explorer');
        const menuActividades = document.getElementById('menu-actividades-explorer');
        
        if (contenedorActividades) contenedorActividades.style.display = 'none';
        if (menuActividades) {
            menuActividades.style.display = 'block';
            this.mostrarMenuActividades();
        }
    },

    anteriorPagina(indiceActual) {
        if (indiceActual > 0) {
            this.mostrarPaginaColorear(indiceActual - 1);
        }
    },

    mostrarCelebracion(mensaje) {
        const modal = document.getElementById('modal-celebracion');
        const mensajeEl = document.getElementById('mensaje-celebracion');
        
        if (modal && mensajeEl) {
            mensajeEl.textContent = mensaje;
            modal.classList.add('activo');
            
            setTimeout(() => {
                modal.classList.remove('activo');
            }, 1500);
        } else {
            // Si no hay modal, mostrar alerta simple
            alert(mensaje);
        }
    },

    mezclarArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.ExplorerGameEngine = ExplorerGameEngine;
}
