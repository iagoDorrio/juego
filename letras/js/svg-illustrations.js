// 🌸 EL JARDÍN DE LAS LETRAS DE RAQUEL 🌸
// Ilustraciones SVG simples para palabras

const SVGIllustrations = {
    // Generar ilustración según la palabra
    generar(palabra, tamano = 200) {
        const generadores = {
            'OSO': this.generarOso,
            'OJO': this.generarOjo,
            'UVA': this.generarUva,
            'AVE': this.generarAve,
            'MAMA': this.generarMama,
            'PAPA': this.generarPapa,
            'PATO': this.generarPato,
            'GATO': this.generarGato,
            'CASA': this.generarCasa,
            'MESA': this.generarMesa,
            'SOPA': this.generarSopa,
            'BOLA': this.generarBola,
            'SOL': this.generarSol,
            'LUNA': this.generarLuna,
            'SAPO': this.generarSapo,
            'MONO': this.generarMono,
            'TAZA': this.generarTaza,
            'PERA': this.generarPera,
            'PERRO': this.generarPerro,
            'GLOBO': this.generarGlobo
        };
        
        const generador = generadores[palabra];
        return generador ? generador.call(this, tamano) : this.generarDefault(tamano);
    },
    
    generarOso(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="70" cy="60" r="25" fill="#8B4513"/>
            <circle cx="130" cy="60" r="25" fill="#8B4513"/>
            <circle cx="100" cy="100" r="50" fill="#A0522D"/>
            <circle cx="85" cy="90" r="5" fill="#000"/>
            <circle cx="115" cy="90" r="5" fill="#000"/>
            <ellipse cx="100" cy="110" rx="15" ry="10" fill="#654321"/>
        </svg>`;
    },
    
    generarOjo(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="100" rx="80" ry="50" fill="#FFF" stroke="#000" stroke-width="3"/>
            <circle cx="100" cy="100" r="30" fill="#4169E1"/>
            <circle cx="100" cy="100" r="15" fill="#000"/>
            <circle cx="105" cy="95" r="5" fill="#FFF"/>
        </svg>`;
    },
    
    generarUva(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="60" r="20" fill="#800080"/>
            <circle cx="80" cy="80" r="20" fill="#800080"/>
            <circle cx="100" cy="80" r="20" fill="#800080"/>
            <circle cx="120" cy="80" r="20" fill="#800080"/>
            <circle cx="90" cy="100" r="20" fill="#800080"/>
            <circle cx="110" cy="100" r="20" fill="#800080"/>
            <circle cx="100" cy="120" r="20" fill="#800080"/>
            <path d="M100 40 Q100 20 110 15" stroke="#228B22" stroke-width="3" fill="none"/>
        </svg>`;
    },
    
    generarAve(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="80" r="30" fill="#FFD700"/>
            <circle cx="100" cy="120" r="40" fill="#FFD700"/>
            <path d="M60 120 L40 100 L60 110 Z" fill="#FFA500"/>
            <path d="M140 120 L160 100 L140 110 Z" fill="#FFA500"/>
            <circle cx="90" cy="75" r="4" fill="#000"/>
            <circle cx="110" cy="75" r="4" fill="#000"/>
            <path d="M95 85 L105 85" stroke="#FF6347" stroke-width="2"/>
        </svg>`;
    },
    
    generarMama(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="70" r="35" fill="#FFE4C4"/>
            <path d="M70 50 Q65 40 70 35" stroke="#8B4513" stroke-width="15" stroke-linecap="round" fill="none"/>
            <path d="M130 50 Q135 40 130 35" stroke="#8B4513" stroke-width="15" stroke-linecap="round" fill="none"/>
            <circle cx="85" cy="70" r="5" fill="#000"/>
            <circle cx="115" cy="70" r="5" fill="#000"/>
            <path d="M90 85 Q100 90 110 85" stroke="#000" stroke-width="2" fill="none"/>
            <rect x="70" y="105" width="60" height="70" rx="10" fill="#FF69B4"/>
            <line x1="100" y1="105" x2="100" y2="175" stroke="#FF1493" stroke-width="3"/>
        </svg>`;
    },
    
    generarPapa(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="70" r="35" fill="#FFE4C4"/>
            <rect x="85" y="45" width="30" height="15" fill="#4169E1"/>
            <circle cx="85" cy="70" r="5" fill="#000"/>
            <circle cx="115" cy="70" r="5" fill="#000"/>
            <path d="M90 85 Q100 90 110 85" stroke="#000" stroke-width="2" fill="none"/>
            <rect x="70" y="105" width="60" height="70" rx="10" fill="#4169E1"/>
            <rect x="97" y="105" width="6" height="70" fill="#87CEEB"/>
        </svg>`;
    },
    
    generarPato(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="120" rx="50" ry="40" fill="#FFD700"/>
            <circle cx="80" cy="80" r="25" fill="#FFD700"/>
            <ellipse cx="75" cy="75" rx="3" ry="5" fill="#000"/>
            <path d="M55 85 L45 80 L55 78 Z" fill="#FFA500"/>
            <rect x="85" y="150" width="8" height="25" fill="#FF6347"/>
            <rect x="107" y="150" width="8" height="25" fill="#FF6347"/>
        </svg>`;
    },
    
    generarGato(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="110" r="45" fill="#FFA500"/>
            <circle cx="100" cy="75" r="35" fill="#FFA500"/>
            <path d="M70 55 L60 25 L75 50 Z" fill="#FFA500"/>
            <path d="M130 55 L140 25 L125 50 Z" fill="#FFA500"/>
            <circle cx="85" cy="75" r="5" fill="#000"/>
            <circle cx="115" cy="75" r="5" fill="#000"/>
            <path d="M85 85 L100 90 L115 85" stroke="#000" stroke-width="2" fill="none"/>
        </svg>`;
    },
    
    generarCasa(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <rect x="50" y="100" width="100" height="80" fill="#FFE4C4"/>
            <path d="M40 100 L100 50 L160 100 Z" fill="#DC143C"/>
            <rect x="80" y="130" width="40" height="50" fill="#8B4513"/>
            <rect x="110" y="110" width="25" height="25" fill="#87CEEB"/>
        </svg>`;
    },
    
    generarMesa(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <rect x="30" y="80" width="140" height="15" rx="5" fill="#8B4513"/>
            <rect x="40" y="95" width="12" height="70" fill="#654321"/>
            <rect x="148" y="95" width="12" height="70" fill="#654321"/>
        </svg>`;
    },
    
    generarSopa(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="130" rx="60" ry="15" fill="#DC143C"/>
            <path d="M40 130 Q40 80 100 80 Q160 80 160 130" fill="#FF6347"/>
            <circle cx="80" cy="110" r="8" fill="#FFD700"/>
            <circle cx="100" cy="105" r="8" fill="#FFD700"/>
            <circle cx="120" cy="110" r="8" fill="#FFD700"/>
            <path d="M100 80 Q105 60 110 50" stroke="#999" stroke-width="2" fill="none"/>
            <path d="M110 65 Q112 62 115 60" stroke="#999" stroke-width="2" fill="none"/>
        </svg>`;
    },
    
    generarBola(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="60" fill="#FF69B4"/>
            <path d="M70 70 Q100 90 130 70" stroke="#FFF" stroke-width="4" fill="none"/>
            <path d="M70 130 Q100 110 130 130" stroke="#FFF" stroke-width="4" fill="none"/>
            <path d="M70 100 Q90 100 90 80" stroke="#FFF" stroke-width="4" fill="none"/>
            <path d="M130 100 Q110 100 110 80" stroke="#FFF" stroke-width="4" fill="none"/>
        </svg>`;
    },
    
    generarSol(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="40" fill="#FFD700"/>
            <line x1="100" y1="30" x2="100" y2="50" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="100" y1="150" x2="100" y2="170" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="30" y1="100" x2="50" y2="100" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="150" y1="100" x2="170" y2="100" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="45" y1="45" x2="60" y2="60" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="140" y1="140" x2="155" y2="155" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="155" y1="45" x2="140" y2="60" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
            <line x1="60" y1="140" x2="45" y2="155" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/>
        </svg>`;
    },
    
    generarLuna(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <path d="M120 50 Q80 100 120 150 Q160 100 120 50 Z" fill="#FFD700"/>
            <circle cx="110" cy="80" r="8" fill="#DAA520"/>
            <circle cx="105" cy="110" r="12" fill="#DAA520"/>
            <circle cx="115" cy="130" r="6" fill="#DAA520"/>
        </svg>`;
    },
    
    generarSapo(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="130" rx="60" ry="40" fill="#228B22"/>
            <circle cx="70" cy="90" r="25" fill="#228B22"/>
            <circle cx="130" cy="90" r="25" fill="#228B22"/>
            <circle cx="70" cy="85" r="12" fill="#FFF"/>
            <circle cx="130" cy="85" r="12" fill="#FFF"/>
            <circle cx="70" cy="85" r="6" fill="#000"/>
            <circle cx="130" cy="85" r="6" fill="#000"/>
            <path d="M90 135 Q100 140 110 135" stroke="#000" stroke-width="2" fill="none"/>
        </svg>`;
    },
    
    generarMono(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="50" fill="#8B4513"/>
            <circle cx="100" cy="80" r="40" fill="#D2691E"/>
            <circle cx="70" cy="60" r="15" fill="#8B4513"/>
            <circle cx="130" cy="60" r="15" fill="#8B4513"/>
            <circle cx="85" cy="75" r="5" fill="#000"/>
            <circle cx="115" cy="75" r="5" fill="#000"/>
            <ellipse cx="100" cy="90" rx="20" ry="15" fill="#FFE4C4"/>
        </svg>`;
    },
    
    generarTaza(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <rect x="60" y="80" width="80" height="80" rx="10" fill="#FF6347"/>
            <ellipse cx="100" cy="80" rx="40" ry="10" fill="#DC143C"/>
            <path d="M140 100 Q160 100 160 120 Q160 140 140 140" stroke="#DC143C" stroke-width="8" fill="none"/>
            <path d="M70 90 Q75 85 80 90" stroke="#FFF" stroke-width="2" fill="none"/>
        </svg>`;
    },
    
    generarPera(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="130" rx="45" ry="55" fill="#9ACD32"/>
            <ellipse cx="100" cy="70" rx="30" ry="35" fill="#9ACD32"/>
            <path d="M100 40 L95 20" stroke="#8B4513" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="90" cy="25" rx="8" ry="12" fill="#228B22" transform="rotate(-30 90 25)"/>
        </svg>`;
    },
    
    generarPerro(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="120" rx="50" ry="40" fill="#8B4513"/>
            <circle cx="80" cy="80" r="30" fill="#8B4513"/>
            <path d="M60 60 L50 40 L65 55 Z" fill="#8B4513"/>
            <path d="M100 60 L110 40 L105 55 Z" fill="#8B4513"/>
            <circle cx="70" cy="75" r="4" fill="#000"/>
            <circle cx="90" cy="75" r="4" fill="#000"/>
            <ellipse cx="80" cy="85" rx="8" ry="6" fill="#000"/>
            <path d="M140 130 Q160 120 165 140" stroke="#8B4513" stroke-width="8" stroke-linecap="round" fill="none"/>
        </svg>`;
    },
    
    generarGlobo(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <ellipse cx="100" cy="80" rx="50" ry="60" fill="#FF1493"/>
            <path d="M100 140 L100 170" stroke="#000" stroke-width="2"/>
            <path d="M100 170 L90 180 L110 180 Z" fill="#FFD700"/>
            <ellipse cx="90" cy="70" rx="15" ry="20" fill="#FFF" opacity="0.5"/>
        </svg>`;
    },
    
    generarDefault(t = 200) {
        return `<svg width="${t}" height="${t}" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="60" fill="#DDA0DD"/>
            <text x="100" y="120" font-size="40" text-anchor="middle" fill="#FFF">?</text>
        </svg>`;
    }
};
