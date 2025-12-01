// Voice ML Runner - Control por voz con TensorFlow.js

class VoiceMLApp {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.model = null;
        this.currentModel = null;
        this.init();
    }

    init() {
        this.setupVoiceRecognition();
        this.setupEventListeners();
        this.loadTensorFlow();
    }

    setupVoiceRecognition() {
        // Comprobar soporte de Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            this.updateStatus('❌ Error: Tu navegador no soporta reconocimiento de voz.', 'error');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'es-ES'; // Español
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        // Eventos
        this.recognition.onresult = (event) => this.handleVoiceResult(event);
        this.recognition.onerror = (event) => this.handleVoiceError(event);
        this.recognition.onend = () => this.handleVoiceEnd();

        this.updateStatus('✅ Reconocimiento de voz listo. Di "Hola" para probar.', 'success');
    }

    setupEventListeners() {
        const voiceBtn = document.getElementById('voiceBtn');
        const stopBtn = document.getElementById('stopBtn');

        voiceBtn.addEventListener('click', () => this.startListening());
        stopBtn.addEventListener('click', () => this.stopListening());
    }

    startListening() {
        if (!this.recognition) {
            this.updateStatus('❌ Reconocimiento de voz no disponible.', 'error');
            return;
        }

        try {
            this.recognition.start();
            this.isListening = true;

            document.getElementById('voiceBtn').style.display = 'none';
            document.getElementById('stopBtn').style.display = 'block';
            document.getElementById('stopBtn').classList.add('recording');

            this.updateStatus('🎧 Escuchando... Di un comando.', 'listening');
        } catch (err) {
            console.error('Error al iniciar:', err);
            this.updateStatus('❌ Error al iniciar voz.', 'error');
        }
    }

    stopListening() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.isListening = false;

        document.getElementById('voiceBtn').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'none';
        document.getElementById('stopBtn').classList.remove('recording');

        this.updateStatus('⏹️ Voz detenida. Presiona "Iniciar Voz" para continuar.', 'stopped');
    }

    handleVoiceResult(event) {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join(' ');

        this.updateTranscript(transcript);
        this.processCommand(transcript.toLowerCase());
    }

    handleVoiceError(event) {
        console.error('Error de voz:', event.error);

        if (event.error === 'no-speech') {
            this.updateStatus('🔇 No escuché nada. Inténtalo de nuevo.', 'warning');
        } else {
            this.updateStatus(`❌ Error: ${event.error}`, 'error');
        }
    }

    handleVoiceEnd() {
        if (this.isListening) {
            // Reiniciar automáticamente si está activo
            setTimeout(() => {
                if (this.isListening) {
                    try {
                        this.recognition.start();
                    } catch (e) {
                        console.log('No se pudo reiniciar', e);
                    }
                }
            }, 500);
        }
    }

    processCommand(command) {
        const commands = {
            'hola': () => this.speak('Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte?'),
            'ayuda': () => this.speak('Puedes decir: cargar modelo, listar modelos, o detener.'),
            'cargar modelo': () => this.loadModel('mobilenet'),
            'lista modelos': () => this.listModels(),
            'detener': () => this.stopListening()
        };

        // Buscar comando que coincida
        for (const [cmd, action] of Object.entries(commands)) {
            if (command.includes(cmd)) {
                action();
                break;
            }
        }
    }

    speak(text) {
        // Síntesis de voz
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);

        this.updateStatus(`💬 Respuesta: ${text}`, 'response');
    }

    async loadTensorFlow() {
        // Cargar TensorFlow.js dinámicamente
        if (typeof tf === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.17.0/dist/tf.min.js';
            script.onload = () => {
                console.log('TensorFlow.js cargado');
                this.updateStatus('🚀 TensorFlow.js listo', 'success');
            };
            document.head.appendChild(script);
        }
    }

    async loadModel(modelName) {
        this.updateStatus(`🔧 Cargando ${modelName}...`, 'loading');
        this.speak(`Cargando modelo ${modelName}`);

        // Simulación - en una app real, cargarías el modelo desde un URL
        setTimeout(() => {
            this.currentModel = modelName;
            document.querySelectorAll('.model-card').forEach(c => c.classList.remove('active'));
            document.getElementById('model1').classList.add('active');

            this.updateStatus(`✅ Modelo ${modelName} cargado y listo!`, 'success');
            this.speak(`Modelo ${modelName} cargado exitosamente`);
        }, 2000);
    }

    listModels() {
        const models = ['MobileNet', 'BERT-tiny', 'Whisper-tiny', 'Stable Diffusion Mobile'];
        const list = models.join(', ');
        this.speak(`Modelos disponibles: ${list}`);
        this.updateStatus(`📋 Modelos: ${list}`, 'info');
    }

    updateStatus(text, type) {
        const statusEl = document.getElementById('statusText');
        statusEl.textContent = text;
    }

    updateTranscript(text) {
        const transcriptEl = document.getElementById('transcriptText');
        const timestamp = new Date().toLocaleTimeString('es-CL');
        transcriptEl.innerHTML += `<div><strong>${timestamp}:</strong> ${text}</div>`;
        transcriptEl.scrollTop = transcriptEl.scrollHeight;
    }
}

// Iniciar la app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new VoiceMLApp());
} else {
    new VoiceMLApp();
}