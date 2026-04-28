// Datos de páginas para colorear - Archivo separado para mejor organización

const PAGINAS_COLOREAR = [
    // === DIBUJOS GRANDES (3) ===
    {
        id: 1,
        nombre: 'Mariposa Grande',
        tamaño: 'grande',
        partes: [
            { id: 'ala-izq', forma: 'M 70,60 Q 35,40 30,15 Q 45,25 60,45 Q 68,55 70,60 Z', color: null },
            { id: 'ala-der', forma: 'M 70,60 Q 105,40 110,15 Q 95,25 80,45 Q 72,55 70,60 Z', color: null },
            { id: 'cuerpo', forma: 'M 67,30 L 73,30 L 73,85 L 67,85 Z', color: null },
            { id: 'cabeza', forma: 'M 70,27 m -5,0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0', color: null }
        ]
    },
    {
        id: 2,
        nombre: 'Flor Grande',
        tamaño: 'grande',
        partes: [
            { id: 'petalo1', forma: 'M 70,40 Q 60,20 70,15 Q 80,20 70,40 Z', color: null },
            { id: 'petalo2', forma: 'M 77,45 Q 95,35 100,45 Q 90,50 77,48 Z', color: null },
            { id: 'petalo3', forma: 'M 77,53 Q 90,58 85,68 Q 80,60 75,55 Z', color: null },
            { id: 'petalo4', forma: 'M 70,60 Q 75,75 70,80 Q 65,75 70,60 Z', color: null },
            { id: 'petalo5', forma: 'M 63,53 Q 50,58 45,68 Q 52,60 63,55 Z', color: null },
            { id: 'petalo6', forma: 'M 63,45 Q 45,35 40,45 Q 50,50 63,48 Z', color: null },
            { id: 'centro', forma: 'M 70,50 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0', color: null },
            { id: 'tallo', forma: 'M 68,62 L 72,62 L 72,100 L 68,100 Z', color: null }
        ]
    },
    {
        id: 3,
        nombre: 'Casa Grande',
        tamaño: 'grande',
        partes: [
            { id: 'techo', forma: 'M 25,50 L 70,15 L 115,50 Z', color: null },
            { id: 'pared', forma: 'M 30,50 L 110,50 L 110,105 L 30,105 Z', color: null },
            { id: 'puerta', forma: 'M 55,75 L 75,75 L 75,105 L 55,105 Z', color: null },
            { id: 'ventana1', forma: 'M 40,60 L 55,60 L 55,72 L 40,72 Z', color: null },
            { id: 'ventana2', forma: 'M 85,60 L 100,60 L 100,72 L 85,72 Z', color: null }
        ]
    },
    
    // === DIBUJOS MEDIANOS (7) ===
    {
        id: 4,
        nombre: 'Corazón',
        partes: [
            { id: 'corazon', forma: 'M 70,85 Q 50,65 50,50 A 15,15 0 0,1 70,45 A 15,15 0 0,1 90,50 Q 90,65 70,85 Z', color: null }
        ]
    },
    {
        id: 5,
        nombre: 'Estrella',
        partes: [
            { id: 'estrella', forma: 'M 70,20 L 77,45 L 105,48 L 83,65 L 90,93 L 70,78 L 50,93 L 57,65 L 35,48 L 63,45 Z', color: null }
        ]
    },
    {
        id: 6,
        nombre: 'Sol',
        partes: [
            { id: 'centro', forma: 'M 70,50 m -18,0 a 18,18 0 1,0 36,0 a 18,18 0 1,0 -36,0', color: null },
            { id: 'rayo1', forma: 'M 70,20 L 67,28 L 73,28 Z', color: null },
            { id: 'rayo2', forma: 'M 95,32 L 90,37 L 95,41 Z', color: null },
            { id: 'rayo3', forma: 'M 108,50 L 100,48 L 100,52 Z', color: null },
            { id: 'rayo4', forma: 'M 95,68 L 90,63 L 95,59 Z', color: null },
            { id: 'rayo5', forma: 'M 70,80 L 67,72 L 73,72 Z', color: null },
            { id: 'rayo6', forma: 'M 45,68 L 50,63 L 45,59 Z', color: null },
            { id: 'rayo7', forma: 'M 32,50 L 40,48 L 40,52 Z', color: null },
            { id: 'rayo8', forma: 'M 45,32 L 50,37 L 45,41 Z', color: null }
        ]
    },
    {
        id: 7,
        nombre: 'Luna',
        partes: [
            { id: 'luna', forma: 'M 80,30 A 25,25 0 1,1 80,70 A 20,20 0 1,0 80,30 Z', color: null },
            { id: 'ojo1', forma: 'M 75,42 m -2,0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0', color: null },
            { id: 'boca', forma: 'M 70,52 Q 75,55 80,52', stroke: true, color: null }
        ]
    },
    {
        id: 8,
        nombre: 'Árbol',
        partes: [
            { id: 'copa', forma: 'M 70,45 m -25,0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0', color: null },
            { id: 'tronco', forma: 'M 65,50 L 75,50 L 75,85 L 65,85 Z', color: null },
            { id: 'raiz1', forma: 'M 65,85 Q 55,90 50,85', stroke: true, color: null },
            { id: 'raiz2', forma: 'M 75,85 Q 85,90 90,85', stroke: true, color: null }
        ]
    },
    {
        id: 9,
        nombre: 'Nube',
        partes: [
            { id: 'nube', forma: 'M 45,55 Q 40,45 50,42 Q 55,35 65,38 Q 75,35 82,40 Q 95,42 92,52 Q 95,60 85,62 Q 80,68 70,65 Q 60,68 52,64 Q 42,62 45,55 Z', color: null },
            { id: 'cara', forma: 'M 60,52 m -1,0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0 M 75,52 m -1,0 a 1,1 0 1,0 2,0 a 1,1 0 1,0 -2,0', color: null }
        ]
    },
    {
        id: 10,
        nombre: 'Pez',
        partes: [
            { id: 'cuerpo', forma: 'M 90,50 Q 75,35 55,35 Q 35,35 30,50 Q 35,65 55,65 Q 75,65 90,50 Z', color: null },
            { id: 'cola', forma: 'M 90,50 L 105,40 L 110,50 L 105,60 Z', color: null },
            { id: 'aleta-arr', forma: 'M 60,35 Q 55,25 65,28 Z', color: null },
            { id: 'aleta-aba', forma: 'M 60,65 Q 55,75 65,72 Z', color: null },
            { id: 'ojo', forma: 'M 45,48 m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0', color: null }
        ]
    }
];

// Exportar
if (typeof window !== 'undefined') {
    window.PAGINAS_COLOREAR = PAGINAS_COLOREAR;
}