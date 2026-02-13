import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "60%" });
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const newTop = Math.random() * 60 + 20 + "%";
    const newLeft = Math.random() * 60 + 20 + "%";
    setNoPosition({ top: newTop, left: newLeft });
  };

  const handleYes = () => {
    setAccepted(true);
    // Slowly swell music volume for emotional impact
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.4;
      const swell = setInterval(() => {
        if (audio.volume < 0.95) {
          audio.volume = Math.min(audio.volume + 0.05, 1);
        } else {
          clearInterval(swell);
        }
      }, 200);
    }
  };

  useEffect(() => {
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    };

    attemptPlay();
    window.addEventListener("click", attemptPlay, { once: true });
    window.addEventListener("touchstart", attemptPlay, { once: true });

    return () => {
      window.removeEventListener("click", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
    };
  }, []);

  return (
    <div className={`container ${accepted ? "romantic-bg" : ""}`}>
      {/* 
        To use your own music:
        1. Name your file "song.mp3"
        2. Drag and drop it into the "public" folder of this project
      */}
      <audio ref={audioRef} loop autoPlay>
        <source src="song.mp3" type="audio/mp3" />
      </audio>

      {!accepted ? (
        <>
          <h1>Chinnu 💕</h1>

          <div className="image-container">
            <img src="chinnu_sree.jpg" alt="Us ❤️" />
            <div className="image-glow"></div>
          </div>

          <h2>Will you walk beside me this Valentine's Day?</h2>
          <p>
            In every lifetime, I would still choose you. <br />
            Even on the days you pretend to be mad at me.
          </p>

          <div className="buttons">
            <button className="yes" onClick={handleYes}>
              Yes, Always 💕
            </button>

            <button
              className="no"
              style={{
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
            >
              No
            </button>
          </div>
        </>
      ) : (
        <div className="celebration fade-in">
          <h1>You made my heart bloom, Chinnu 🌸</h1>
          <p>
            You just made me the happiest soul alive 💕 <br />I promise to:
          </p>

          <ul>
            <li>🤍 Hold your hand through every storm</li>
            <li>🫂 Take care of you till my last breath</li>
            <li>🌙 Be your safe place, always</li>
            <li>💍 Love you more with every sunrise</li>
          </ul>

          <h2>Happy Valentine's Day, my love 🌹</h2>

          <p className="forever-line">Forever with you. 💍</p>
        </div>
      )}

      <CherryBlossoms accepted={accepted} />
      <GoldenDust accepted={accepted} />
      <Hearts accepted={accepted} />
    </div>
  );
}

/* ─── Cherry Blossom Petals ─── */
function CherryBlossoms({ accepted }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const spawnRate = accepted ? 2000 : 800; // Slower on celebration
    const interval = setInterval(() => {
      const petal = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 2,
        symbol: Math.random() > 0.5 ? "🌸" : "✿",
      };
      setPetals((prev) => [...prev, petal]);

      setTimeout(() => {
        setPetals((prev) => prev.slice(1));
      }, 12000);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [accepted]);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}vw`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.symbol}
        </div>
      ))}
    </>
  );
}

/* ─── Golden Dust Particles ─── */
function GoldenDust({ accepted }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const spawnRate = accepted ? 200 : 400; // More gold on celebration
    const interval = setInterval(() => {
      const particle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        bottom: Math.random() * 30,
        size: Math.random() * (accepted ? 6 : 4) + 2,
        duration: Math.random() * 8 + 6,
      };
      setParticles((prev) => [...prev, particle]);

      setTimeout(() => {
        setParticles((prev) => prev.slice(1));
      }, 14000);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [accepted]);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="gold-particle"
          style={{
            left: `${p.left}vw`,
            bottom: `${p.bottom}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─── Subtle Floating Hearts (reduced) ─── */
function Hearts({ accepted }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const spawnRate = accepted ? 3000 : 1500; // Fewer hearts on celebration
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 14 + 12,
        duration: Math.random() * 4 + 4,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 8000);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [accepted]);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}vw`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          🤍
        </div>
      ))}
    </>
  );
}
