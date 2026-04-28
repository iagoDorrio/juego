// Motor de Juego de Números - La Granja de Raquel

const NumbersGameEngine = {
    juegoConteo: { nivel: 1, aciertos: 0, vidas: 3, cantidadActual: 0, tipoAnimal: 'vaca', maxNivel: 10 },
    juegoSuma: { nivel: 1, aciertos: 0, vidas: 3, num1: 0, num2: 0, resultado: 0, tipoAnimal1: 'vaca', tipoAnimal2: 'oveja', maxNivel: 10 },
    decoracion: {
        monedas: 0,
        decoracionesCompradas: [],
        decoracionesColocadas: [],
        decoracionesDisponibles: [
            { id: 'casa', nombre: 'Casa', emoji: '🏠', size: 4.5 },
            { id: 'granero', nombre: 'Granero', emoji: '🏡', size: 4 },
            { id: 'arbol', nombre: 'Árbol', emoji: '🌳', size: 3.5 },
            { id: 'cerca', nombre: 'Cerca', emoji: '🪵', size: 3 },
            { id: 'molino', nombre: 'Molino', emoji: '🌾', size: 3 },
            { id: 'estanque', nombre: 'Estanque', emoji: '💧', size: 2.5 },
            { id: 'flor1', nombre: 'Flores', emoji: '🌻', size: 2 },
            { id: 'flor2', nombre: 'Tulipán', emoji: '🌷', size: 2 },
            { id: 'flor3', nombre: 'Rosa', emoji: '🌹', size: 2 },
            { id: 'vaca', nombre: 'Vaca', emoji: '🐄', size: 3.5 },
            { id: 'oveja', nombre: 'Oveja', emoji: '🐑', size: 3 },
            { id: 'cerdo', nombre: 'Cerdo', emoji: '🐷', size: 3 },
            { id: 'pollo', nombre: 'Pollo', emoji: '🐔', size: 2.5 },
            { id: 'caballo', nombre: 'Caballo', emoji: '🐴', size: 3.5 },
            { id: 'conejo', nombre: 'Conejo', emoji: '🐰', size: 2.5 }
        ]
    },

    iniciarJuegoConteo() {
        this.juegoConteo = { nivel: 1, aciertos: 0, vidas: 3, cantidadActual: 0, tipoAnimal: 'vaca', maxNivel: 10 };
        this.cargarNivelConteo();
    },

    cargarNivelConteo() {
        this.juegoConteo.cantidadActual = Math.min(this.juegoConteo.nivel, 10);
        this.juegoConteo.tipoAnimal = FarmAnimalsGenerator.obtenerAnimalAleatorio();
        this.mostrarAnimalesConteo();
        this.mostrarOpcionesConteo();
        this.actualizarUIConteo();
    },

    mostrarAnimalesConteo() {
        const zona = document.getElementById('zona-animales');
        if (!zona) return;
        zona.innerHTML = '';
        for (let i = 0; i < this.juegoConteo.cantidadActual; i++) {
            const div = document.createElement('div');
            div.innerHTML = FarmAnimalsGenerator.generarAnimal(this.juegoConteo.tipoAnimal, 80);
            div.style.cssText = 'display:inline-block;margin:10px;cursor:pointer;transition:transform 0.3s';
            div.onclick = () => {
                div.style.transform = 'scale(1.2)';
                setTimeout(() => div.style.transform = 'scale(1)', 200);
                // Efecto visual al tocar el animal
            };
            zona.appendChild(div);
        }
    },

    mostrarOpcionesConteo() {
        const opciones = document.getElementById('opciones-numeros');
        if (!opciones) return;
        opciones.innerHTML = '';
        const nums = this.generarOpcionesNumeros(this.juegoConteo.cantidadActual, 4);
        nums.forEach(num => {
            const btn = document.createElement('button');
            btn.textContent = num;
            btn.style.cssText = 'font-size:2rem;padding:1.5rem;margin:0.5rem;min-width:80px;background:linear-gradient(135deg,#FFD700,#FFA500);border:none;border-radius:15px;cursor:pointer;box-shadow:0 4px 8px rgba(0,0,0,0.2);font-weight:bold;color:#2C3E50';
            btn.onclick = () => this.verificarRespuestaConteo(num);
            opciones.appendChild(btn);
        });
    },

    verificarRespuestaConteo(respuesta) {
        if (respuesta === this.juegoConteo.cantidadActual) {
            this.juegoConteo.aciertos++;
            this.decoracion.monedas += 2;
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
            this.mostrarFeedback('¡Correcto! 🎉', true);
            setTimeout(() => {
                if (this.juegoConteo.nivel < this.juegoConteo.maxNivel) {
                    this.juegoConteo.nivel++;
                    this.cargarNivelConteo();
                } else this.finalizarJuegoConteo(true);
            }, 1500);
        } else {
            this.juegoConteo.vidas--;
            if (typeof AudioSynth !== 'undefined') AudioSynth.animar();
            this.mostrarFeedback('Intenta de nuevo 😊', false);
            this.actualizarVidas('corazones-conteo', this.juegoConteo.vidas);
            if (this.juegoConteo.vidas <= 0) setTimeout(() => this.finalizarJuegoConteo(false), 1000);
        }
    },

    iniciarJuegoSuma() {
        this.juegoSuma = { nivel: 1, aciertos: 0, vidas: 3, num1: 0, num2: 0, resultado: 0, tipoAnimal1: 'vaca', tipoAnimal2: 'oveja', maxNivel: 10 };
        this.cargarNivelSuma();
    },

    cargarNivelSuma() {
        const max = Math.min(this.juegoSuma.nivel + 2, 10);
        this.juegoSuma.num1 = Math.floor(Math.random() * max) + 1;
        this.juegoSuma.num2 = Math.floor(Math.random() * max) + 1;
        this.juegoSuma.resultado = this.juegoSuma.num1 + this.juegoSuma.num2;
        this.juegoSuma.tipoAnimal1 = FarmAnimalsGenerator.obtenerAnimalAleatorio();
        this.juegoSuma.tipoAnimal2 = FarmAnimalsGenerator.obtenerAnimalAleatorio();
        this.mostrarOperacionSuma();
        this.mostrarOpcionesSuma();
        this.actualizarUISuma();
    },

    mostrarOperacionSuma() {
        const g1 = document.getElementById('grupo1-suma');
        const g2 = document.getElementById('grupo2-suma');
        if (!g1 || !g2) return;
        g1.innerHTML = '';
        g2.innerHTML = '';
        for (let i = 0; i < this.juegoSuma.num1; i++) {
            const d = document.createElement('div');
            d.style.cssText = 'display:inline-block;margin:5px';
            d.innerHTML = FarmAnimalsGenerator.generarAnimal(this.juegoSuma.tipoAnimal1, 60);
            g1.appendChild(d);
        }
        for (let i = 0; i < this.juegoSuma.num2; i++) {
            const d = document.createElement('div');
            d.style.cssText = 'display:inline-block;margin:5px';
            d.innerHTML = FarmAnimalsGenerator.generarAnimal(this.juegoSuma.tipoAnimal2, 60);
            g2.appendChild(d);
        }
    },

    mostrarOpcionesSuma() {
        const opciones = document.getElementById('opciones-suma');
        if (!opciones) return;
        opciones.innerHTML = '';
        const nums = this.generarOpcionesNumeros(this.juegoSuma.resultado, 4);
        nums.forEach(num => {
            const btn = document.createElement('button');
            btn.textContent = num;
            btn.style.cssText = 'font-size:2rem;padding:1.5rem;margin:0.5rem;min-width:80px;background:linear-gradient(135deg,#90EE90,#32CD32);border:none;border-radius:15px;cursor:pointer;box-shadow:0 4px 8px rgba(0,0,0,0.2);font-weight:bold;color:#2C3E50';
            btn.onclick = () => this.verificarRespuestaSuma(num);
            opciones.appendChild(btn);
        });
    },

    verificarRespuestaSuma(respuesta) {
        if (respuesta === this.juegoSuma.resultado) {
            this.juegoSuma.aciertos++;
            this.decoracion.monedas += 3;
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
            this.mostrarFeedback('¡Excelente! 🌟', true);
            setTimeout(() => {
                if (this.juegoSuma.nivel < this.juegoSuma.maxNivel) {
                    this.juegoSuma.nivel++;
                    this.cargarNivelSuma();
                } else this.finalizarJuegoSuma(true);
            }, 1500);
        } else {
            this.juegoSuma.vidas--;
            if (typeof AudioSynth !== 'undefined') AudioSynth.animar();
            this.mostrarFeedback('Cuenta de nuevo 🤔', false);
            this.actualizarVidas('corazones-suma', this.juegoSuma.vidas);
            if (this.juegoSuma.vidas <= 0) setTimeout(() => this.finalizarJuegoSuma(false), 1000);
        }
    },

    iniciarDecoracion() {
        this.cargarMonedas();
        this.ocultarTiendaDecoraciones();
        this.inicializarCanvas();
        this.cargarDecoracionesIniciales();
    },
    
    ocultarTiendaDecoraciones() {
        const tienda = document.getElementById('tienda-decoraciones');
        if (tienda) tienda.style.display = 'none';
        const selector = document.querySelector('.selector-decoraciones');
        if (selector) selector.style.display = 'none';
    },
    
    cargarDecoracionesIniciales() {
        // Limpiar decoraciones previas
        this.decoracion.decoracionesColocadas = [];
        
        const canvas = document.getElementById('canvas-granja');
        if (!canvas) return;
        
        const rect = canvas.getBoundingClientRect();
        
        // Colocar cada decoración en una posición aleatoria
        this.decoracion.decoracionesDisponibles.forEach((dec, index) => {
            // Distribuir las decoraciones de manera más espaciada
            const x = (Math.random() * (rect.width - 150)) + 50;
            const y = (Math.random() * (rect.height - 150)) + 80;
            
            this.decoracion.decoracionesColocadas.push({
                id: dec.id,
                emoji: dec.emoji,
                size: dec.size,
                x: x,
                y: y
            });
            
            this.colocarDecoracionEnCanvas(dec.id, x, y, dec.emoji, dec.size);
        });
    },
    
    inicializarCanvas() {
        const canvas = document.getElementById('canvas-granja');
        if (!canvas) return;
        
        // Crear fondo de granja con cielo azul, sol brillante y campo verde
        canvas.innerHTML = `
            <div style="width:100%;height:100%;background:linear-gradient(180deg, #87CEEB 0%, #B0E7FF 40%, #90EE90 100%);position:relative;border-radius:15px;overflow:hidden;min-height:500px;">
                <!-- Sol brillante -->
                <div style="position:absolute;top:30px;right:50px;width:80px;height:80px;background:radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%);border-radius:50%;box-shadow:0 0 40px rgba(255,215,0,0.8),0 0 80px rgba(255,215,0,0.4);"></div>
                <div style="position:absolute;top:50px;right:70px;width:40px;height:40px;background:#FFD700;border-radius:50%;"></div>
                
                <!-- Campo verde en la parte inferior -->
                <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(180deg, rgba(76,175,80,0.3) 0%, #4CAF50 100%);"></div>
                
                <!-- Zona para decoraciones -->
                <div id="zona-decoraciones" style="position:absolute;top:0;left:0;right:0;bottom:0;"></div>
            </div>
        `;
        
        // Cargar decoraciones previamente colocadas
        this.cargarDecoracionesColocadas();
    },
    
    cargarDecoracionesColocadas() {
        const zona = document.getElementById('zona-decoraciones');
        if (!zona || !this.decoracion.decoracionesColocadas) return;
        
        this.decoracion.decoracionesColocadas.forEach(dec => {
            this.colocarDecoracionEnCanvas(dec.id, dec.x, dec.y, dec.emoji, dec.size || 3);
        });
    },
    
    colocarDecoracionEnCanvas(id, x, y, emoji, size = 3) {
        const zona = document.getElementById('zona-decoraciones');
        if (!zona) return;
        
        const div = document.createElement('div');
        div.id = `decoracion-${id}-${Date.now()}`;
        div.className = 'decoracion-colocada';
        div.innerHTML = emoji;
        div.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: ${size}rem;
            cursor: move;
            user-select: none;
            transition: transform 0.2s;
        `;
        
        // Hacer la decoración arrastrable
        this.hacerArrastrable(div);
        
        zona.appendChild(div);
    },
    
    hacerArrastrable(elemento) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        const onMouseDown = (e) => {
            isDragging = true;
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
            
            const rect = elemento.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            elemento.style.transform = 'scale(1.2)';
            elemento.style.zIndex = '1000';
        };
        
        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
            
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;
            
            const canvas = document.getElementById('canvas-granja');
            const canvasRect = canvas.getBoundingClientRect();
            
            let newX = initialX + deltaX - canvasRect.left;
            let newY = initialY + deltaY - canvasRect.top;
            
            // Limitar a los bordes del canvas
            newX = Math.max(0, Math.min(newX, canvasRect.width - 60));
            newY = Math.max(0, Math.min(newY, canvasRect.height - 60));
            
            elemento.style.left = newX + 'px';
            elemento.style.top = newY + 'px';
        };
        
        const onMouseUp = () => {
            isDragging = false;
            elemento.style.transform = 'scale(1)';
            elemento.style.zIndex = 'auto';
        };
        
        elemento.addEventListener('mousedown', onMouseDown);
        elemento.addEventListener('touchstart', onMouseDown, { passive: false });
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onMouseMove, { passive: false });
        
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchend', onMouseUp);
    },

    cargarMonedas() {
        const e = document.getElementById('monedas-decoracion');
        if (e) e.textContent = this.decoracion.monedas;
        const e2 = document.getElementById('puntos-granja');
        if (e2) e2.textContent = this.decoracion.monedas;
    },

    mostrarTiendaDecoraciones() {
        const tienda = document.getElementById('tienda-decoraciones');
        if (!tienda) return;
        tienda.innerHTML = '<h3 style="width:100%;text-align:center;color:#2C3E50;margin-bottom:15px;">Haz clic en una decoración para añadirla a tu granja</h3>';
        
        this.decoracion.decoracionesDisponibles.forEach(dec => {
            const div = document.createElement('div');
            div.style.cssText = `display:inline-block;margin:10px;padding:15px;background:#FFF;border-radius:15px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;cursor:pointer;min-width:120px;border:3px solid #4CAF50;transition:transform 0.2s;`;
            div.innerHTML = `<div style="font-size:3rem">${dec.emoji}</div><div style="font-weight:bold;margin:5px 0;color:#2C3E50;">${dec.nombre}</div><div style="color:#4CAF50;font-weight:bold;">¡Gratis!</div>`;
            
            // Al hacer hover
            div.onmouseenter = () => div.style.transform = 'scale(1.1)';
            div.onmouseleave = () => div.style.transform = 'scale(1)';
            
            // Al hacer clic, agregar al canvas
            div.onclick = () => this.agregarDecoracion(dec.id, dec.emoji);
            
            tienda.appendChild(div);
        });
    },

    agregarDecoracion(id, emoji) {
        // Colocar la decoración en una posición aleatoria del canvas
        const canvas = document.getElementById('canvas-granja');
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = Math.random() * (rect.width - 100) + 50;
            const y = Math.random() * (rect.height - 150) + 100;
            
            this.decoracion.decoracionesColocadas.push({
                id: id,
                emoji: emoji,
                x: x,
                y: y
            });
            
            this.colocarDecoracionEnCanvas(id, x, y, emoji);
            
            if (typeof AudioSynth !== 'undefined') AudioSynth.celebrar();
        }
    },

    generarOpcionesNumeros(correcto, cantidad) {
        const opciones = new Set([correcto]);
        let intentos = 0;
        const maxIntentos = 100;
        
        while (opciones.size < cantidad && intentos < maxIntentos) {
            intentos++;
            // Aumentar el rango para asegurar suficientes opciones
            const rango = Math.max(10, correcto + 5);
            const num = Math.floor(Math.random() * rango) + 1;
            if (num !== correcto && num >= 1 && num <= 20) {
                opciones.add(num);
            }
        }
        
        // Si aún no tenemos suficientes opciones, agregar números secuenciales
        if (opciones.size < cantidad) {
            for (let i = 1; i <= 20 && opciones.size < cantidad; i++) {
                if (i !== correcto) opciones.add(i);
            }
        }
        
        return Array.from(opciones).sort(() => Math.random() - 0.5);
    },

    actualizarUIConteo() {
        const e1 = document.getElementById('nivel-conteo');
        const e2 = document.getElementById('aciertos-conteo');
        if (e1) e1.textContent = this.juegoConteo.nivel;
        if (e2) e2.textContent = this.juegoConteo.aciertos;
        this.actualizarVidas('corazones-conteo', this.juegoConteo.vidas);
    },

    actualizarUISuma() {
        const e1 = document.getElementById('nivel-suma');
        const e2 = document.getElementById('aciertos-suma');
        if (e1) e1.textContent = this.juegoSuma.nivel;
        if (e2) e2.textContent = this.juegoSuma.aciertos;
        this.actualizarVidas('corazones-suma', this.juegoSuma.vidas);
    },

    actualizarVidas(id, vidas) {
        const e = document.getElementById(id);
        if (e) e.textContent = '❤️'.repeat(Math.max(0, vidas));
    },

    mostrarFeedback(mensaje, exito) {
        const modal = document.getElementById('modal-celebracion');
        const mensajeElem = document.getElementById('mensaje-celebracion');
        if (modal && mensajeElem) {
            mensajeElem.textContent = mensaje;
            modal.classList.add('activo');
            setTimeout(() => modal.classList.remove('activo'), 1200);
        }
    },

    finalizarJuegoConteo(gano) {
        const mensaje = gano ? `¡Completaste todos los niveles! 🎉\nAciertos: ${this.juegoConteo.aciertos}` : `Juego terminado. Aciertos: ${this.juegoConteo.aciertos}`;
        alert(mensaje);
        if (typeof volverAGranja === 'function') volverAGranja();
    },

    finalizarJuegoSuma(gano) {
        const mensaje = gano ? `¡Completaste todos los niveles! 🌟\nAciertos: ${this.juegoSuma.aciertos}` : `Juego terminado. Aciertos: ${this.juegoSuma.aciertos}`;
        alert(mensaje);
        if (typeof volverAGranja === 'function') volverAGranja();
    }
};

if (typeof window !== 'undefined') {
    window.NumbersGameEngine = NumbersGameEngine;
}
