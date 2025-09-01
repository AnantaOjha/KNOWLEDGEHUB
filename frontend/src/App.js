import React, { useState, useEffect } from "react";

function AIMessage({ text }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 40); // typing speed
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="answer-box fade-in">
      <h2>💡 AI Answer:</h2>
      <p className={isTyping ? "typing" : ""}>{displayedText}</p>
    </div>
  );
}

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) {
      alert("⚠️ Please type a question before asking.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setAnswer(data.answer || data.error || "⚠️ No response from AI.");
    } catch (error) {
      console.error("🔥 Error asking AI:", error);
      setAnswer("⚠️ Something went wrong. Check your backend server.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Background forest image */}
      <div className="background-image"></div>

      <div className="app-container">
        {/* Animated robot emoji */}
        <div className="robot-container" aria-label="Robot emoji" role="img">
          <div className="robot">🤖</div>
        </div>

        <h1 style={{ marginBottom: "1rem" }}>Ask Gemini AI</h1>

        <textarea
          rows="4"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
              handleAsk();
            }
          }}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "10px",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            resize: "vertical",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <button
          type="button"
          onClick={handleAsk}
          disabled={loading}
          className="ask-button"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {/* Typing effect AI Answer */}
        {answer && <AIMessage text={answer} />}
      </div>

      {/* Styles */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* Background forest image */
        .background-image {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: url(${process.env.PUBLIC_URL}/background1.jpg);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: -1;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
          padding: 2rem;
          background-color: rgba(255, 255, 255, 0.85);
          border-radius: 12px;
          max-width: 700px;
          margin: auto;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          position: relative;
          z-index: 1;
        }

        /* Robot container */
        .robot-container {
          width: 120px;
          height: 120px;
          margin-bottom: 1rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: bgColorPulse 6s ease-in-out infinite;
          box-shadow: 0 0 30px 8px rgba(37, 99, 235, 0.3),
                      0 0 60px 20px rgba(37, 99, 235, 0.15);
          user-select: none;
          background-color: #2563eb;
        }

        .robot {
          font-size: 5rem;
          animation: robotMove 3s ease-in-out infinite;
          z-index: 1;
        }

        .ask-button {
          background-color: #2563eb;
          color: white;
          padding: 10px 30px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          box-shadow: 0 4px 8px rgba(37, 99, 235, 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .ask-button:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
          box-shadow: none;
        }

        .ask-button:hover:not(:disabled) {
          background-color: #1e40af;
          box-shadow: 0 6px 12px rgba(30, 64, 175, 0.6);
        }

        .answer-box {
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f3f4f6;
          border-radius: 8px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          white-space: pre-wrap;
          animation: fadeIn 0.5s ease-in-out;
        }

        /* Fade-in animation */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Typing effect cursor */
        .typing::after {
          content: '|';
          animation: blink 0.8s infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        /* Animations */
        @keyframes robotMove {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes bgColorPulse {
          0% {
            background-color: #2563eb;
            box-shadow: 0 0 30px 8px rgba(37, 99, 235, 0.3),
                        0 0 60px 20px rgba(37, 99, 235, 0.15);
          }
          50% {
            background-color: #3b82f6;
            box-shadow: 0 0 40px 12px rgba(59, 130, 246, 0.4),
                        0 0 70px 25px rgba(59, 130, 246, 0.2);
          }
          100% {
            background-color: #2563eb;
            box-shadow: 0 0 30px 8px rgba(37, 99, 235, 0.3),
                        0 0 60px 20px rgba(37, 99, 235, 0.15);
          }
        }
      `}</style>
    </>
  );
}

export default App;
