// ⚠️ CRÍTICO: Clave secreta (DEBE SER LA MISMA que en memory-game.js)
const SECRET_SALT = 'WOMEN_IN_TECH_2026_SECRET';

// Función para generar hash SHA-256
async function generateHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ⚠️ FUNCIÓN MEJORADA: Verificar certificado con validación REAL del hash
async function verifyCertificate() {
    const input = document.getElementById('certificateInput').value.trim();
    const resultDiv = document.getElementById('verificationResult');
    
    if (!input) {
        showResult(resultDiv, false, 'Por favor, pega un certificado para verificar.');
        return;
    }

    try {
        // Extraer datos del certificado usando expresiones regulares
        const playerMatch = input.match(/👤 Jugador:\s*(.+)/);
        const timeMatch = input.match(/⏱️\s+Tiempo:\s*(.+)/);
        const dateMatch = input.match(/📅 Fecha:\s*(.+)/);
        const hourMatch = input.match(/🕐 Hora:\s*(.+)/);
        const codeMatch = input.match(/🔐 Código:\s*(GAME-[a-f0-9]+)/);
        const tsMatch = input.match(/🔢 TS:\s*(\d+)/);

        // ⚠️ VALIDACIÓN: Todos los campos deben estar presentes
        if (!playerMatch || !timeMatch || !dateMatch || !hourMatch || !codeMatch || !tsMatch) {
            showResult(resultDiv, false, 'Formato de certificado inválido. Faltan campos requeridos (incluyendo timestamp).');
            return;
        }

        const playerName = playerMatch[1].trim();
        const gameTime = timeMatch[1].trim();
        const date = dateMatch[1].trim();
        const hour = hourMatch[1].trim();
        const code = codeMatch[1].trim();
        const gameStartTimestamp = tsMatch[1].trim();

        // ⚠️ VALIDACIÓN: Formato del código
        if (!code.startsWith('GAME-') || code.length !== 21) {
            showResult(resultDiv, false, 'Formato de código inválido. Debe ser GAME-XXXXXXXXXXXXXXXX');
            return;
        }

        // ⚠️ SEGURIDAD CRÍTICA: Regenerar el hash con los mismos datos
        const dataToHash = `${playerName}|${gameTime}|${gameStartTimestamp}|${SECRET_SALT}`;
        const expectedHash = await generateHash(dataToHash);
        const expectedCode = `GAME-${expectedHash.substring(0, 16)}`;

        // ⚠️ VALIDACIÓN PRINCIPAL: Comparar códigos
        if (code !== expectedCode) {
            const errorMsg = `❌ CERTIFICADO INVÁLIDO\n\nEl código de verificación NO coincide.\n\n⚠️ POSIBLE MANIPULACIÓN DETECTADA:\n- Código recibido: ${code}\n- Código esperado: ${expectedCode}\n\nEsto indica manipulación del certificado o cambio de hora durante el juego.`;
            showResult(resultDiv, false, errorMsg);
            return;
        }

        // ⚠️ VALIDACIÓN ADICIONAL: Verificar antigüedad del timestamp
        const tsDate = new Date(parseInt(gameStartTimestamp));
        const now = new Date();
        const daysDiff = (now - tsDate) / (1000 * 60 * 60 * 24);
        
        let ageWarning = '';
        if (daysDiff > 30) {
            ageWarning = '<p style="color: #f59e0b; margin-top: 10px;">⚠️ Advertencia: Este certificado tiene más de 30 días.</p>';
        } else if (daysDiff < 0) {
            showResult(resultDiv, false, '❌ CERTIFICADO INVÁLIDO\n\nEl timestamp indica fecha futura. MANIPULACIÓN DETECTADA.');
            return;
        }

        // ✅ Construir mensaje de éxito
        const details = `
            <div class="result-details">
                <p><strong>✅ Jugador:</strong> ${playerName}</p>
                <p><strong>⏱️ Tiempo:</strong> ${gameTime}</p>
                <p><strong>📅 Fecha:</strong> ${date}</p>
                <p><strong>🕐 Hora:</strong> ${hour}</p>
                <p><strong>🔐 Código:</strong> ${code}</p>
                <p><strong>🕐 Inicio:</strong> ${tsDate.toLocaleString('es-ES')}</p>
                <p><strong>📊 Antigüedad:</strong> ${Math.floor(daysDiff)} días</p>
                <hr style="margin: 15px 0; border: 1px solid #ccc;">
                <p style="color: #10b981; font-weight: bold;">✓ ¡CERTIFICADO AUTÉNTICO VERIFICADO!</p>
                <p style="color: #666; font-size: 0.9em; margin-top: 10px;">
                    <em>El hash coincide. Certificado genuino y sin manipular.</em>
                </p>
                ${ageWarning}
            </div>
        `;

        showResult(resultDiv, true, '¡Certificado Válido y Auténtico!', details);

    } catch (error) {
        console.error('Error al verificar:', error);
        showResult(resultDiv, false, 'Error al procesar el certificado. Verifica el formato.');
    }
}

// Función para mostrar resultado
function showResult(element, isValid, title, details = '') {
    element.className = 'result show ' + (isValid ? 'valid' : 'invalid');
    
    const icon = isValid ? '✅' : '❌';
    const formattedTitle = title.replace(/\n/g, '<br>');
    
    element.innerHTML = `
        <h4>${icon} ${isValid ? title : ''}</h4>
        ${isValid ? details : `<p style="white-space: pre-line;">${formattedTitle}</p>`}
    `;
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('certificateInput').value = '';
    const resultDiv = document.getElementById('verificationResult');
    resultDiv.className = 'result';
    resultDiv.innerHTML = '';
}