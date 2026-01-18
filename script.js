function playAudio() {
  const text = document.getElementById("sentence").innerText;

  // Crear la frase hablada
  const utterance = new SpeechSynthesisUtterance(text);

  // Ajustes ideales para niños
  utterance.lang = "en-US";
  utterance.rate = 0.75;   // más lento
  utterance.pitch = 1.1;  // ligeramente más agudo

  // Intentar seleccionar una voz en inglés
  const voices = speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.lang.startsWith("en"));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  // Reproducir
  speechSynthesis.cancel(); // evita solapamientos
  speechSynthesis.speak(utterance);
}

// Solución al bug típico de móviles: forzar carga de voces
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}
