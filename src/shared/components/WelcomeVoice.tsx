import { useState } from "react";
import voice from '../../assets/VoiceApp.mp3'

const WelcomeVoice = () => {
  const [audioReproducido, setAudioReproducido] = useState(
    localStorage.getItem("audioReproducido") === "true"
  );

  const reproducirAudio = () => {
    const audio = new Audio(voice);
    audio.play()
      .then(() => {
        console.log("✅ Audio reproducido");
        localStorage.setItem("audioReproducido", "true");
        setAudioReproducido(true);
      })
      .catch((error) => {
        console.warn("🚫 Error al reproducir el audio:", error);
      });
  };

  if (audioReproducido) return null;

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", background: "#fff", padding: "10px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.2)", zIndex: '999' }}>
      <p>🎧 ¿Listo para comenzar?</p>
      <button onClick={reproducirAudio} style={{ padding: "8px 12px", cursor: "pointer" }}>
        Comenzar
      </button>
    </div>
  );
};

export default WelcomeVoice
