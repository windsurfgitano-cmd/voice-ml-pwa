# 🎙 Voice ML Runner PWA

PWA con control por voz para ejecutar modelos de IA en Huawei P40 Pro (y otros dispositivos móviles).

## 🚀 Características

- ✅ **Control 100% por voz** - Ideal para pantallas rotas
- 🎤 Web Speech API (Reconocimiento y Síntesis de voz)
- 🧠 TensorFlow.js para modelos de IA
- 📱 PWA instalable (funciona offline)
- 🌐 Compatible con Huawei Browser

## 🗣 Comandos de Voz

- **"Hola"** - Saludo inicial
- **"Ayuda"** - Lista de comandos
- **"Cargar modelo"** - Carga MobileNet
- **"Lista modelos"** - Modelos disponibles
- **"Detener"** - Para el reconocimiento de voz

## 📦 Instalación

### Opción 1: GitHub Pages (Recomendado)
1. Ve a Settings → Pages
2. Source: `main` branch
3. Accede desde: `https://windsurfgitano-cmd.github.io/voice-ml-pwa/`

### Opción 2: Servidor Local
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve
```

## 📱 Instalar en Huawei P40 Pro

1. Abre la URL en **Huawei Browser**
2. Menú (⋮) → **Agregar a pantalla de inicio**
3. ¡Listo! Funciona como app nativa

## 🧠 Modelos Soportados

- **MobileNet** - Clasificación de imágenes (4MB)
- **BERT-tiny** - Procesamiento de texto (17MB)
- **Whisper-tiny** - Transcripción de audio
- **Stable Diffusion Mobile** - Generación de imágenes

## 🔧 Personalizar

Edita `app.js` para agregar más comandos o modelos:

```javascript
processCommand(command) {
    const commands = {
        'tu comando': () => this.tuFuncion(),
        // Agregar más...
    };
}
```

## 🛠 Tecnologías

- HTML5 + CSS3 (Responsive)
- Vanilla JavaScript (Sin frameworks)
- Web Speech API
- TensorFlow.js
- Service Workers (PWA)

## 📄 Licencia

MIT - Úsalo libremente

---

Creado para Huawei P40 Pro con ❤️