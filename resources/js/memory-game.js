// Datos del juego - Mujeres destacadas en ciencia e informática
const gameData = [
    { id: 1, image: 'resources/images/margarita-salas.jpg', name: 'Margarita Salas', achievement: 'Bioquímica española pionera, patentó la ADN polimerasa con 300+ aplicaciones biotecnológicas' },
    { id: 2, image: 'resources/images/fei-fei-li.jpg', name: 'Fei-Fei Li', achievement: 'Directora del Stanford AI Lab, creadora de ImageNet y pionera en IA visual' },
    { id: 3, image: 'resources/images/maria-blasco.jpg', name: 'María Blasco', achievement: 'Directora del CNIO, experta mundial en telómeros y envejecimiento celular' },
    { id: 4, image: 'resources/images/katherine-johnson.jpg', name: 'Katherine Johnson', achievement: 'Matemática de la NASA, calculó trayectorias espaciales del Apolo 11' },
    { id: 5, image: 'resources/images/radia-perlman.jpg', name: 'Radia Perlman', achievement: 'Creadora del protocolo STP, "Madre de Internet"' },
    { id: 6, image: 'resources/images/marie-curie.jpg', name: 'Marie Curie', achievement: 'Dos premios Nobel, descubrió el radio y el polonio' },
    { id: 7, image: 'resources/images/margaret-hamilton.jpg', name: 'Margaret Hamilton', achievement: 'Directora de software del programa Apolo de la NASA' },
    { id: 8, image: 'resources/images/carol-shaw.jpg', name: 'Carol Shaw', achievement: 'Primera diseñadora de videojuegos profesional, creó River Raid (1982)' },
    { id: 9, image: 'resources/images/sara-garcia-alonso.jpg', name: 'Sara García Alonso', achievement: 'Bióloga molecular y primera mujer española candidata a astronauta seleccionada por la ESA en 2022' },
    { id: 10, image: 'resources/images/stephanie-shirley.jpg', name: 'Stephanie Shirley', achievement: 'Fundó "FreelanceProgrammers" en 1962, empleando mujeres programadoras y revolucionando el trabajo remoto en tecnología' }
];

// Estado del juego
let selectedImage = null;
let selectedDescription = null;
let matches = 0;
let attempts = 0; // Contador de intentos
let isProcessing = false;
let gameStarted = false;
let startTime = null;
let timerInterval = null;
let finalTime = null;

// Clave secreta para hash (DEBE SER LA MISMA en verificador-codigos.js)
const SECRET_SALT = 'WOMEN_IN_TECH_2026_SECRET';

// Función para generar hash SHA-256
async function generateHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Función para mezclar array
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Crear carta
function createCard(data, type) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = data.id;
    card.dataset.type = type;

    const front = document.createElement('div');
    front.className = 'card-face card-front';
    
    // Usar icono de mujer para cartas de científicas, interrogación para logros
    if (type === 'image') {
        // Usar imagen icono-mujer.webp en lugar del emoji
        const iconoMujer = document.createElement('img');
        iconoMujer.src = 'resources/images/icono-mujer.png';
        iconoMujer.alt = 'Icono Mujer';
        iconoMujer.className = 'card-front-icon';
        front.appendChild(iconoMujer);
    } else {
        front.textContent = '?'; // Mantener interrogación para logros
    }

    const back = document.createElement('div');
    back.className = 'card-face card-back';
    
    if (type === 'image') {
        back.classList.add('image');
        const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.name;
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/150/667eea/ffffff?text=👩‍💻';
        };
        back.appendChild(img);
    } else {
        back.classList.add('description');
        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        nameDiv.textContent = data.name;
        
        const achievementDiv = document.createElement('div');
        achievementDiv.className = 'achievement';
        achievementDiv.textContent = data.achievement;
        
        back.appendChild(nameDiv);
        back.appendChild(achievementDiv);
    }

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => handleCardClick(card));

    return card;
}

// Manejar clic en carta
function handleCardClick(card) {
    if (!gameStarted || isProcessing || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    const type = card.dataset.type;
    card.classList.add('flipped');

    if (type === 'image') {
        if (selectedImage) {
            selectedImage.classList.remove('flipped');
        }
        selectedImage = card;
    } else {
        if (selectedDescription) {
            selectedDescription.classList.remove('flipped');
        }
        selectedDescription = card;
    }

    if (selectedImage && selectedDescription) {
        checkMatch();
    }
}

// Colores para las parejas coincidentes
const matchColors = [
    { light: '#9F7AEA', dark: '#7C3AED' }, // Violeta
    { light: '#F87171', dark: '#DC2626' }, // Rojo
    { light: '#60A5FA', dark: '#2563EB' }, // Azul
    { light: '#34D399', dark: '#059669' }, // Verde
    { light: '#FBBF24', dark: '#D97706' }, // Ámbar
    { light: '#A78BFA', dark: '#7C3AED' }, // Púrpura
    { light: '#F472B6', dark: '#DB2777' }, // Rosa
    { light: '#38BDF8', dark: '#0284C7' }, // Celeste
    { light: '#4ADE80', dark: '#16A34A' }, // Verde claro
    { light: '#FB923C', dark: '#C2410C' }  // Naranja
];

// Verificar coincidencia
function checkMatch() {
    isProcessing = true;

    const imageId = selectedImage.dataset.id;
    const descriptionId = selectedDescription.dataset.id;
    
    // Incrementar contador de intentos
    attempts++;
    updateAttemptsCounter();

    setTimeout(() => {
        if (imageId === descriptionId) {
            // Asignar el color según el ID (restando 1 para que sea 0-indexed)
            const colorIndex = parseInt(imageId) - 1;
            const matchColor = matchColors[colorIndex];
            
            selectedImage.classList.add('matched');
            selectedDescription.classList.add('matched');
            
            // Aplicar estilo directo con el color correspondiente
            const gradient = `linear-gradient(135deg, ${matchColor.light} 0%, ${matchColor.dark} 100%)`;
            selectedImage.querySelector('.card-back').style.background = gradient;
            selectedDescription.querySelector('.card-back').style.background = gradient;
            
            matches++;
            updateMatchCounter();

            if (matches === 10) {
                setTimeout(showVictory, 500);
            }
        } else {
            selectedImage.classList.remove('flipped');
            selectedDescription.classList.remove('flipped');
        }

        selectedImage = null;
        selectedDescription = null;
        isProcessing = false;
    }, 1000);
}

// Actualizar contador de parejas
function updateMatchCounter() {
    document.getElementById('matches').textContent = matches;
}

// Actualizar contador de intentos
function updateAttemptsCounter() {
    document.getElementById('attempts').textContent = attempts;
}

// Mostrar mensaje de victoria
function showVictory() {
    stopTimer();
    
    const victoryMsg = document.getElementById('victoryMessage');
    const timeText = document.getElementById('victoryText');
    timeText.innerHTML = `Has encontrado todas las parejas`;
    
    // Actualizar las cajas de estadísticas
    document.getElementById('finalTime').textContent = formatTime(finalTime);
    document.getElementById('finalAttempts').textContent = attempts;
    
    document.getElementById('nameForm').style.display = 'block';
    document.getElementById('certificateSection').style.display = 'none';
    
    document.getElementById('overlay').classList.add('show');
    victoryMsg.classList.add('show');
    
    // Mostrar la lista de científicas y sus logros
    displayScientistsList();
}

// Mostrar mensaje inspirador
function generateCertificate() {
    const playerName = document.getElementById('playerName').value.trim();
    
    if (!playerName) {
        alert('Por favor, introduce tu nombre');
        return;
    }

    // Mostrar la sección con el mensaje inspirador
    document.getElementById('nameForm').style.display = 'none';
    document.getElementById('scientistsList').style.display = 'none';
    document.getElementById('certificateSection').style.display = 'block';
    
    // Mostrar "Felicidades [nombre]" en la pantalla de reflexión
    const victoryText = document.getElementById('victoryText');
    victoryText.innerHTML = `<strong style="color: #0078d4; font-size: 1.5em;">¡ ${playerName} !</strong>`;
    victoryText.style.display = 'block';
}

// Mostrar la lista de científicas y sus logros
function displayScientistsList() {
    const scientistsContainer = document.getElementById('scientistsContainer');
    scientistsContainer.innerHTML = '';
    
    // Ordenar científicas alfabéticamente por nombre
    const sortedScientists = [...gameData].sort((a, b) => a.name.localeCompare(b.name));
    
    // Crear una lista con todas las científicas y sus logros
    sortedScientists.forEach((scientist, index) => {
        const scientistItem = document.createElement('div');
        scientistItem.className = 'scientist-item';
        
        // Usar colores del array matchColors para mantener consistencia visual
        const colorIndex = scientist.id - 1;
        const matchColor = matchColors[colorIndex];
        const gradient = `linear-gradient(135deg, ${matchColor.light} 0%, ${matchColor.dark} 100%)`;
        
        scientistItem.innerHTML = `
            <div class="scientist-header" style="background: ${gradient}">
                <span class="scientist-number">${index + 1}</span>
                <h4 class="scientist-name">${scientist.name}</h4>
            </div>
            <div class="scientist-achievement">${scientist.achievement}</div>
        `;
        
        scientistsContainer.appendChild(scientistItem);
    });
}

// Ocultar mensaje de victoria
function hideVictory() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('victoryMessage').classList.remove('show');
}

// Función para formatear el tiempo (con microsegundos)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds * 1000) % 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

// Actualizar cronómetro (con microsegundos)
function updateTimer() {
    if (startTime) {
        const elapsed = (performance.now() - startTime) / 1000;
        document.getElementById('timer').textContent = formatTime(elapsed);
    }
}

// Iniciar el juego
function startGame() {
    gameStarted = true;
    startTime = performance.now(); // ⚠️ CRÍTICO: Guardar timestamp de inicio con precisión de microsegundos
    finalTime = null;
    
    timerInterval = setInterval(updateTimer, 100); // Actualizar más frecuentemente para mostrar los microsegundos
    
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'inline-block';
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.pointerEvents = 'auto';
    });
}

// Detener cronómetro
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (startTime) {
        finalTime = (performance.now() - startTime) / 1000;
    }
}

// Inicializar juego
function initGame() {
    const imagesGrid = document.getElementById('images-grid');
    const descriptionsGrid = document.getElementById('descriptions-grid');

    imagesGrid.innerHTML = '';
    descriptionsGrid.innerHTML = '';

    const shuffledImages = shuffle(gameData);
    const shuffledDescriptions = shuffle(gameData);

    shuffledImages.forEach(data => {
        const card = createCard(data, 'image');
        imagesGrid.appendChild(card);
    });

    shuffledDescriptions.forEach(data => {
        const card = createCard(data, 'description');
        descriptionsGrid.appendChild(card);
    });

    if (!gameStarted) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.pointerEvents = 'none';
        });
    }
}

// Cerrar modal de victoria
function closeVictoryModal() {
    console.log('closeVictoryModal llamado');
    const overlay = document.getElementById('overlay');
    const victoryMessage = document.getElementById('victoryMessage');
    
    if (overlay) {
        overlay.classList.remove('show');
        overlay.style.display = 'none';
    }
    
    if (victoryMessage) {
        victoryMessage.classList.remove('show');
        victoryMessage.style.display = 'none';
    }
    
    return false;
}

function resetGame() {
    selectedImage = null;
    selectedDescription = null;
    matches = 0;
    attempts = 0; // Reiniciar contador de intentos
    isProcessing = false;
    gameStarted = false;
    startTime = null;
    finalTime = null;
    
    stopTimer();
    
    document.getElementById('timer').textContent = '00:00.000';
    document.getElementById('attempts').textContent = '0'; // Actualizar en la interfaz
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('resetBtn').style.display = 'none';
    
    // Volver a mostrar el bloque de texto para la próxima victoria
    const victoryText = document.getElementById('victoryText');
    victoryText.style.display = 'block';
    
    updateMatchCounter();
    hideVictory();
    initGame();
}

// Iniciar el juego al cargar la página
initGame();

// Asegurar que el botón de cerrar funcione
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que la modal sea visible y añadir el listener
    const observer = new MutationObserver(function() {
        const closeBtn = document.querySelector('.close-button');
        if (closeBtn && !closeBtn.hasAttribute('data-listener')) {
            closeBtn.setAttribute('data-listener', 'true');
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeVictoryModal();
            }, true);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
