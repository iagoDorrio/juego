// ============================================
// 🌸 GENERADOR DE LETRAS COMO FLORES SVG
// Sin recursos externos - Todo generado con código
// ============================================

const LetterGenerator = {
    // Generar letra como flor SVG
    generarFlorLetra(letra, opciones = {}) {
        const {
            tamano = 300,
            colorFlor = this.obtenerColorAleatorio(),
            tipo = 'mayuscula'
        } = opciones;
        
        const letraFinal = tipo === 'mayuscula' ? letra.toUpperCase() : letra.toLowerCase();
        const radio = tamano / 2;
        const centroX = radio;
        const centroY = radio;
        
        // Crear SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', tamano);
        svg.setAttribute('height', tamano);
        svg.setAttribute('viewBox', `0 0 ${tamano} ${tamano}`);
        
        // Grupo para la flor
        const grupoFlor = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // Tallo
        const tallo = this.crearTallo(centroX, centroY, tamano);
        grupoFlor.appendChild(tallo);
        
        // Hojas
        const hoja1 = this.crearHoja(centroX - 30, centroY + tamano * 0.4, -20);
        const hoja2 = this.crearHoja(centroX + 30, centroY + tamano * 0.5, 20);
        grupoFlor.appendChild(hoja1);
        grupoFlor.appendChild(hoja2);
        
        // Pétalos (6 pétalos alrededor)
        const numeroPetalos = 6;
        const radioPetalos = tamano * 0.25;
        
        for (let i = 0; i < numeroPetalos; i++) {
            const angulo = (i * 360 / numeroPetalos) * Math.PI / 180;
            const petalox = centroX + radioPetalos * Math.cos(angulo);
            const petaloy = centroY + radioPetalos * Math.sin(angulo);
            
            const petalo = this.crearPetalo(petalox, petaloy, colorFlor, angulo);
            grupoFlor.appendChild(petalo);
        }
        
        // Centro de la flor (fondo para la letra)
        const centro = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        centro.setAttribute('cx', centroX);
        centro.setAttribute('cy', centroY);
        centro.setAttribute('r', tamano * 0.2);
        centro.setAttribute('fill', '#FFF59D');
        centro.setAttribute('stroke', '#F9A825');
        centro.setAttribute('stroke-width', '3');
        grupoFlor.appendChild(centro);
        
        // Texto de la letra
        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', centroX);
        texto.setAttribute('y', centroY);
        texto.setAttribute('text-anchor', 'middle');
        texto.setAttribute('dominant-baseline', 'central');
        texto.setAttribute('font-size', tamano * 0.25);
        texto.setAttribute('font-weight', 'bold');
        texto.setAttribute('font-family', 'Comic Sans MS, cursive');
        texto.setAttribute('fill', '#2C3E50');
        texto.textContent = letraFinal;
        grupoFlor.appendChild(texto);
        
        svg.appendChild(grupoFlor);
        
        return svg;
    },
    
    // Crear tallo
    crearTallo(x, y, altura) {
        const tallo = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        tallo.setAttribute('x', x - 5);
        tallo.setAttribute('y', y);
        tallo.setAttribute('width', '10');
        tallo.setAttribute('height', altura * 0.6);
        tallo.setAttribute('fill', '#4CAF50');
        tallo.setAttribute('rx', '5');
        return tallo;
    },
    
    // Crear hoja
    crearHoja(x, y, rotacion) {
        const hoja = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        hoja.setAttribute('cx', x);
        hoja.setAttribute('cy', y);
        hoja.setAttribute('rx', '25');
        hoja.setAttribute('ry', '15');
        hoja.setAttribute('fill', '#66BB6A');
        hoja.setAttribute('transform', `rotate(${rotacion} ${x} ${y})`);
        return hoja;
    },
    
    // Crear pétalo
    crearPetalo(x, y, color, angulo) {
        const petalo = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        petalo.setAttribute('cx', x);
        petalo.setAttribute('cy', y);
        petalo.setAttribute('rx', '35');
        petalo.setAttribute('ry', '50');
        petalo.setAttribute('fill', color);
        petalo.setAttribute('opacity', '0.9');
        petalo.setAttribute('transform', `rotate(${angulo * 180 / Math.PI} ${x} ${y})`);
        
        // Sombra interna del pétalo
        const sombraColor = this.oscurecerColor(color, 0.2);
        petalo.setAttribute('stroke', sombraColor);
        petalo.setAttribute('stroke-width', '2');
        
        return petalo;
    },
    
    // Obtener color aleatorio de la paleta
    obtenerColorAleatorio() {
        const colores = DATOS_JUEGO.coloresFlores;
        return colores[Math.floor(Math.random() * colores.length)];
    },
    
    // Oscurecer color para sombreado
    oscurecerColor(color, factor) {
        // Convertir hex a RGB
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Oscurecer
        const nr = Math.floor(r * (1 - factor));
        const ng = Math.floor(g * (1 - factor));
        const nb = Math.floor(b * (1 - factor));
        
        // Convertir de vuelta a hex
        return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
    },
    
    // Generar letra simple (sin flor, para opciones del juego)
    generarLetraSimple(letra, opciones = {}) {
        const {
            tamano = 120,
            colorFondo = this.obtenerColorAleatorio(),
            tipo = 'mayuscula'
        } = opciones;
        
        const letraFinal = tipo === 'mayuscula' ? letra.toUpperCase() : letra.toLowerCase();
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', tamano);
        svg.setAttribute('height', tamano);
        svg.setAttribute('viewBox', `0 0 ${tamano} ${tamano}`);
        svg.classList.add('opcion-letra');
        
        // Fondo circular
        const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circulo.setAttribute('cx', tamano / 2);
        circulo.setAttribute('cy', tamano / 2);
        circulo.setAttribute('r', tamano / 2 - 5);
        circulo.setAttribute('fill', colorFondo);
        circulo.setAttribute('stroke', this.oscurecerColor(colorFondo, 0.3));
        circulo.setAttribute('stroke-width', '4');
        svg.appendChild(circulo);
        
        // Texto
        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', tamano / 2);
        texto.setAttribute('y', tamano / 2);
        texto.setAttribute('text-anchor', 'middle');
        texto.setAttribute('dominant-baseline', 'central');
        texto.setAttribute('font-size', tamano * 0.5);
        texto.setAttribute('font-weight', 'bold');
        texto.setAttribute('font-family', 'Comic Sans MS, cursive');
        texto.setAttribute('fill', '#FFFFFF');
        texto.textContent = letraFinal;
        svg.appendChild(texto);
        
        return svg;
    },
    
    // Crear flores decorativas para la pantalla de bienvenida
    crearFloresDecorativas(cantidad = 5) {
        const contenedor = document.getElementById('flores-decorativas');
        if (!contenedor) return;
        
        contenedor.innerHTML = '';
        
        for (let i = 0; i < cantidad; i++) {
            const letra = DATOS_JUEGO.vocales[i % DATOS_JUEGO.vocales.length];
            const flor = this.generarFlorLetra(letra, {
                tamano: 100,
                colorFlor: DATOS_JUEGO.coloresFlores[i % DATOS_JUEGO.coloresFlores.length]
            });
            
            flor.style.display = 'inline-block';
            flor.style.margin = '10px';
            flor.style.animation = `float ${2 + i * 0.5}s ease-in-out infinite`;
            flor.style.animationDelay = `${i * 0.2}s`;
            
            contenedor.appendChild(flor);
        }
    },
    
    // Alias para compatibilidad con código existente
    generarLetraFlor(letra, tamano = 300, indice = 0) {
        const colores = DATOS_JUEGO.coloresFlores;
        const color = colores[indice % colores.length];
        const flor = this.generarFlorLetra(letra, {
            tamano: tamano,
            colorFlor: color
        });
        return flor.outerHTML;
    },
    
    generarFlorDecorativa(tamano = 60) {
        const letra = DATOS_JUEGO.vocales[Math.floor(Math.random() * DATOS_JUEGO.vocales.length)];
        const flor = this.generarFlorLetra(letra, {
            tamano: tamano,
            colorFlor: this.obtenerColorAleatorio()
        });
        return flor.outerHTML;
    }
};
