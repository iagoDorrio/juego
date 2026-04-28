// 🌸 EL JARDÍN DE LAS LETRAS DE RAQUEL 🌸
// Datos del juego - palabras, letras y configuración

const DATOS_JUEGO = {
    // Abecedario completo en español
    abecedario: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    
    // Vocales (Nivel 1 - Prioridad)
    vocales: ['A', 'E', 'I', 'O', 'U'],
    
    // Consonantes comunes (Nivel 2)
    consonantesComunes: ['M', 'P', 'S', 'T', 'L', 'N', 'D', 'R', 'C', 'B'],
    
    // Palabras simples para el módulo "Forma Palabras"
    palabras: [
        // Nivel 1: Vocales
        { palabra: 'OSO', categoria: 'animal', nivel: 1 },
        { palabra: 'OJO', categoria: 'cuerpo', nivel: 1 },
        { palabra: 'UVA', categoria: 'fruta', nivel: 1 },
        { palabra: 'AVE', categoria: 'animal', nivel: 1 },
        
        // Nivel 2: Palabras de 4 letras
        { palabra: 'MAMA', categoria: 'familia', nivel: 2 },
        { palabra: 'PAPA', categoria: 'familia', nivel: 2 },
        { palabra: 'PATO', categoria: 'animal', nivel: 2 },
        { palabra: 'GATO', categoria: 'animal', nivel: 2 },
        { palabra: 'CASA', categoria: 'lugar', nivel: 2 },
        { palabra: 'MESA', categoria: 'objeto', nivel: 2 },
        { palabra: 'SOPA', categoria: 'comida', nivel: 2 },
        { palabra: 'BOLA', categoria: 'juguete', nivel: 2 },
        
        // Nivel 3: Palabras de 5 letras
        { palabra: 'SOL', categoria: 'naturaleza', nivel: 3 },
        { palabra: 'LUNA', categoria: 'naturaleza', nivel: 3 },
        { palabra: 'SAPO', categoria: 'animal', nivel: 3 },
        { palabra: 'MONO', categoria: 'animal', nivel: 3 },
        { palabra: 'TAZA', categoria: 'objeto', nivel: 3 },
        { palabra: 'PERA', categoria: 'fruta', nivel: 3 },
        { palabra: 'PERRO', categoria: 'animal', nivel: 3 },
        { palabra: 'GLOBO', categoria: 'juguete', nivel: 3 }
    ],
    
    // Familias silábicas
    familiasSilabicas: {
        'M': ['MA', 'ME', 'MI', 'MO', 'MU'],
        'P': ['PA', 'PE', 'PI', 'PO', 'PU'],
        'S': ['SA', 'SE', 'SI', 'SO', 'SU'],
        'T': ['TA', 'TE', 'TI', 'TO', 'TU'],
        'L': ['LA', 'LE', 'LI', 'LO', 'LU'],
        'N': ['NA', 'NE', 'NI', 'NO', 'NU'],
        'D': ['DA', 'DE', 'DI', 'DO', 'DU'],
        'R': ['RA', 'RE', 'RI', 'RO', 'RU']
    },
    
    // Palabras por sílabas
    palabrasSilabicas: {
        'MA': ['MAMA', 'MANO', 'MASA'],
        'ME': ['MESA', 'META', 'MENTA'],
        'MI': ['MINA', 'MISA', 'MIMO'],
        'MO': ['MONO', 'MOTO', 'MOPA'],
        'MU': ['MULA', 'MURO', 'MUSICA'],
        'PA': ['PAPA', 'PATO', 'PALA'],
        'PE': ['PERA', 'PESO', 'PECA'],
        'PI': ['PINO', 'PISO', 'PIPA'],
        'PO': ['POZO', 'POLO', 'POMO'],
        'PU': ['PULPO', 'PUMA', 'PUÑO']
    },
    
    // Colores para las flores (se usarán en los generadores SVG)
    coloresFlores: [
        '#FF69B4', // Rosa
        '#FFD700', // Amarillo
        '#DDA0DD', // Morado
        '#FFA500', // Naranja
        '#4169E1', // Azul
        '#FF1493', // Rosa fuerte
        '#FF6347', // Rojo tomate
        '#9370DB'  // Púrpura medio
    ],
    
    // Mensajes de celebración
    mensajesCelebracion: [
        '¡Muy Bien!',
        '¡Excelente!',
        '¡Fantástico!',
        '¡Eres Genial!',
        '¡Increíble!',
        '¡Perfecto!',
        '¡Bravo!',
        '¡Lo Lograste!',
        '¡Qué Bien!',
        '¡Maravilloso!'
    ],
    
    // Mensajes de ánimo
    mensajesAnimo: [
        'Casi...¡Intenta de nuevo!',
        'No pasa nada, ¡vuelve a intentarlo!',
        '¡Tú puedes!',
        'Sigue intentándolo',
        '¡No te rindas!'
    ]
};

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATOS_JUEGO;
}