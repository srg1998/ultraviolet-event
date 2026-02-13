import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "60%" });
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const newTop = Math.random() * 80 + "%";
    const newLeft = Math.random() * 80 + "%";
    setNoPosition({ top: newTop, left: newLeft });
  };

  const handleYes = () => {
    setAccepted(true);
    audioRef.current.play();
  };

  return (
    <div className="container">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
      />

      {!accepted ? (
        <>
          <h1>Chinnu 💕</h1>
          <h2>Will You Be My Valentine? 💖</h2>
          <p>
            You are the most beautiful girl on this planet 🌍💗 <br />
            Even when you are angry at me 😤
          </p>

          <div className="buttons">
            <button className="yes" onClick={handleYes}>
              Yes Obviously 😌💘
            </button>

            <button
              className="no"
              style={{
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={moveNoButton}
            >
              No (Try Catch Me 😝)
            </button>
          </div>
        </>
      ) : (
        <div className="celebration">
          <h1>YAYYYY CHINNUUU 💘💘💘</h1>
          <p>
            You just made me the happiest person alive 😭💕 <br />I promise to:
          </p>

          <ul>
            <li>💗 Hold your hand forever</li>
            <li>🫂 Take care of you till I die</li>
            <li>😂 Laugh at your bad jokes</li>

            <li>💍 Love you more every day</li>
          </ul>

          <h2>Happy Valentine's Day, my cutieeee 🥰</h2>
        </div>
      )}

      <Hearts />
    </div>
  );
}

function Hearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 20,
        duration: Math.random() * 3 + 2,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 5000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

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
          💗
        </div>
      ))}
    </>
  );
}
