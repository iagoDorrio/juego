// ============================================
//   🐄 GENERADOR DE ANIMALES DE GRANJA SVG
//   Sin dependencias externas
// ============================================

const FarmAnimalsGenerator = {
    // Colores para los animales
    colores: {
        vaca: { cuerpo: '#FFFFFF', manchas: '#000000', nariz: '#FFB6C1' },
        oveja: { cuerpo: '#F5F5F5', cabeza: '#E0E0E0', patas: '#8B7355' },
        cerdo: { cuerpo: '#FFB6C1', nariz: '#FF69B4', patas: '#D8789B' },
        pollo: { cuerpo: '#FFA500', cresta: '#FF0000', pico: '#FFD700' },
        caballo: { cuerpo: '#8B4513', crin: '#654321', patas: '#5C4033' },
        conejo: { cuerpo: '#F0F0F0', orejas: '#FFB6C1', nariz: '#FF69B4' }
    },

    /**
     * Genera un animal de granja en SVG
     * @param {string} tipo - Tipo de animal
     * @param {number} size - Tamaño del animal
     * @returns {string} SVG del animal
     */
    generarAnimal(tipo, size = 100) {
        const funciones = {
            'vaca': this.generarVaca,
            'oveja': this.generarOveja,
            'cerdo': this.generarCerdo,
            'pollo': this.generarPollo,
            'caballo': this.generarCaballo,
            'conejo': this.generarConejo
        };
        const generador = funciones[tipo] || funciones.vaca;
        return generador.call(this, size);
    },

    generarVaca(size = 100) {
        const c = this.colores.vaca;
        return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="30" ry="25" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="40" cy="50" rx="8" ry="10" fill="${c.manchas}"/><ellipse cx="60" cy="60" rx="10" ry="8" fill="${c.manchas}"/><circle cx="45" cy="65" r="5" fill="${c.manchas}"/><ellipse cx="50" cy="30" rx="15" ry="18" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="38" cy="25" rx="5" ry="8" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="62" cy="25" rx="5" ry="8" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><circle cx="45" cy="28" r="3" fill="#000"/><circle cx="55" cy="28" r="3" fill="#000"/><circle cx="46" cy="27" r="1" fill="#FFF"/><circle cx="56" cy="27" r="1" fill="#FFF"/><ellipse cx="50" cy="38" rx="8" ry="6" fill="${c.nariz}" stroke="#000" stroke-width="1"/><circle cx="47" cy="37" r="2" fill="#000"/><circle cx="53" cy="37" r="2" fill="#000"/><rect x="35" y="75" width="6" height="20" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><rect x="45" y="75" width="6" height="20" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><rect x="50" y="75" width="6" height="20" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><rect x="60" y="75" width="6" height="20" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><path d="M 75 55 Q 85 50, 85 45" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    },

    generarOveja(size = 100) {
        const c = this.colores.oveja;
        return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><circle cx="45" cy="55" r="8" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><circle cx="55" cy="55" r="8" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><circle cx="40" cy="60" r="8" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><circle cx="50" cy="60" r="10" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><circle cx="60" cy="60" r="8" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><circle cx="45" cy="65" r="8" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><circle cx="55" cy="65" r="8" fill="${c.cuerpo}" stroke="#CCC" stroke-width="2"/><ellipse cx="50" cy="40" rx="12" ry="14" fill="${c.cabeza}" stroke="#000" stroke-width="2"/><ellipse cx="40" cy="38" rx="4" ry="6" fill="${c.cabeza}" stroke="#000" stroke-width="2"/><ellipse cx="60" cy="38" rx="4" ry="6" fill="${c.cabeza}" stroke="#000" stroke-width="2"/><circle cx="45" cy="38" r="2" fill="#000"/><circle cx="55" cy="38" r="2" fill="#000"/><rect x="38" y="70" width="5" height="18" fill="${c.patas}" stroke="#000" stroke-width="1"/><rect x="48" y="70" width="5" height="18" fill="${c.patas}" stroke="#000" stroke-width="1"/><rect x="58" y="70" width="5" height="18" fill="${c.patas}" stroke="#000" stroke-width="1"/></svg>`;
    },

    generarCerdo(size = 100) {
        const c = this.colores.cerdo;
        return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="28" ry="22" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="50" cy="35" rx="16" ry="15" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="40" cy="28" rx="5" ry="7" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="60" cy="28" rx="5" ry="7" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><circle cx="45" cy="33" r="2.5" fill="#000"/><circle cx="55" cy="33" r="2.5" fill="#000"/><ellipse cx="50" cy="43" rx="10" ry="8" fill="${c.nariz}" stroke="#000" stroke-width="2"/><circle cx="47" cy="42" r="2" fill="#000"/><circle cx="53" cy="42" r="2" fill="#000"/><rect x="35" y="72" width="6" height="18" fill="${c.patas}" stroke="#000" stroke-width="2"/><rect x="45" y="72" width="6" height="18" fill="${c.patas}" stroke="#000" stroke-width="2"/><rect x="50" y="72" width="6" height="18" fill="${c.patas}" stroke="#000" stroke-width="2"/><rect x="60" y="72" width="6" height="18" fill="${c.patas}" stroke="#000" stroke-width="2"/><path d="M 73 55 Q 78 52, 78 48 Q 78 44, 75 43" stroke="#000" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
    },

    generarPollo(size = 100) {
        const c = this.colores.pollo;
        return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="22" ry="25" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><circle cx="50" cy="30" r="12" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><path d="M 45 20 Q 48 15, 50 20 Q 52 15, 55 20" fill="${c.cresta}" stroke="#000" stroke-width="1"/><circle cx="46" cy="28" r="2" fill="#000"/><circle cx="54" cy="28" r="2" fill="#000"/><circle cx="47" cy="27" r="0.8" fill="#FFF"/><circle cx="55" cy="27" r="0.8" fill="#FFF"/><polygon points="50,32 46,36 54,36" fill="${c.pico}" stroke="#000" stroke-width="1"/><ellipse cx="60" cy="55" rx="8" ry="15" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><line x1="45" y1="78" x2="45" y2="88" stroke="${c.pico}" stroke-width="3"/><line x1="55" y1="78" x2="55" y2="88" stroke="${c.pico}" stroke-width="3"/><path d="M 42 88 L 45 88 L 48 88" stroke="${c.pico}" stroke-width="2" fill="none"/><path d="M 52 88 L 55 88 L 58 88" stroke="${c.pico}" stroke-width="2" fill="none"/></svg>`;
    },

    generarCaballo(size = 100) {
        const c = this.colores.caballo;
        return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="28" ry="20" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><rect x="45" y="20" width="10" height="20" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="50" cy="20" rx="10" ry="12" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><polygon points="45,13 43,8 47,12" fill="${c.cuerpo}" stroke="#000" stroke-width="1"/><polygon points="55,13 57,8 53,12" fill="${c.cuerpo}" stroke="#000" stroke-width="1"/><circle cx="46" cy="19" r="2" fill="#000"/><circle cx="54" cy="19" r="2" fill="#000"/><ellipse cx="50" cy="26" rx="6" ry="4" fill="#8B6C4F"/><rect x="30" y="70" width="6" height="20" fill="${c.patas}" stroke="#000" stroke-width="2"/><rect x="42" y="70" width="6" height="20" fill="${c.patas}" stroke="#000" stroke-width="2"/><rect x="52" y="70" width="6" height="20" fill="${c.patas}" stroke="#000" stroke-width="2"/><rect x="64" y="70" width="6" height="20" fill="${c.patas}" stroke="#000" stroke-width="2"/><path d="M 75 55 Q 85 58, 85 65" stroke="${c.crin}" stroke-width="4" fill="none"/></svg>`;
    },

    generarConejo(size = 100) {
        const c = this.colores.conejo;
        return `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><ellipse cx="50" cy="60" rx="20" ry="22" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><circle cx="50" cy="35" r="14" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="42" cy="15" rx="4" ry="15" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="58" cy="15" rx="4" ry="15" fill="${c.cuerpo}" stroke="#000" stroke-width="2"/><ellipse cx="42" cy="18" rx="2" ry="10" fill="${c.orejas}"/><ellipse cx="58" cy="18" rx="2" ry="10" fill="${c.orejas}"/><circle cx="45" cy="33" r="2" fill="#000"/><circle cx="55" cy="33" r="2" fill="#000"/><circle cx="50" cy="40" r="3" fill="${c.nariz}"/><path d="M 50 40 L 48 45" stroke="#000" stroke-width="1"/><path d="M 50 40 L 52 45" stroke="#000" stroke-width="1"/><rect x="38" y="78" width="5" height="12" fill="${c.cuerpo}" stroke="#000" stroke-width="1"/><rect x="57" y="78" width="5" height="12" fill="${c.cuerpo}" stroke="#000" stroke-width="1"/><circle cx="65" cy="65" r="5" fill="${c.cuerpo}" stroke="#000" stroke-width="1"/></svg>`;
    },

    /**
     * Obtiene un animal aleatorio
     */
    obtenerAnimalAleatorio() {
        const tipos = ['vaca', 'oveja', 'cerdo', 'pollo', 'caballo', 'conejo'];
        return tipos[Math.floor(Math.random() * tipos.length)];
    },

    /**
     * Genera múltiples animales del mismo tipo
     */
    generarGrupoAnimales(tipo, cantidad, size = 80) {
        const animales = [];
        for (let i = 0; i < cantidad; i++) {
            animales.push(this.generarAnimal(tipo, size));
        }
        return animales;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.FarmAnimalsGenerator = FarmAnimalsGenerator;
}