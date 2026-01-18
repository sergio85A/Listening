let voices = [];

// Cargar voces correctamente (CRÍTICO para Edge)
function loadVoices() {
  voices = speechSynthesis.getVoices();
}

// Edge necesita este evento
speechSynthesis.onvoiceschanged = () => {
  loadVoices();
};

// Llamada inicial (por si ya están)
loadVoices();

function playAudio() {
  const text = document.getElementById("sentence").value;
  if (!text) return;

  // Cancelar cualquier audio previo
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.75;
  utterance.pitch = 1.1;

  // Buscar voz inglesa
  const englishVoice = voices.find(v => v.lang.startsWith("en"));

  if (englishVoice) {
    utterance.voice = englishVoice;
  } else {
    console.warn("No English voice found, using default");
  }

  speechSynthesis.speak(utterance);
}
