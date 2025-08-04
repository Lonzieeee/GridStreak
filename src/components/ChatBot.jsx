import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";

const botIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/bot.png";
const userIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/user.png";

const faqList = [
  {
    id: "why_gridstreak",
    question: "Why GridStreak?",
  },
  {
    id: "what_does_gridstreak_do",
    question: "What does GridStreak do?",
  },
  {
    id: "who_can_use_gridstreak",
    question: "Who can use GridStreak?",
  },
  {
    id: "where_is_gridstreak_located",
    question: "Where is GridStreak located?",
  },
  {
    id: "how_to_contact",
    question: "How can I get in touch?",
    routeTo: "/contact",
  },
];

const ChatBot = () => {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [remainingFaqs, setRemainingFaqs] = useState(faqList);
  const navigate = useNavigate();
  const ws = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      ws.current = new WebSocket("wss://gridstreak-production.up.railway.app");

      ws.current.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.current.onmessage = (event) => {
        const botMessage = event.data;

        setIsTyping(true);

        setTimeout(() => {
          setChatHistory((prev) => [...prev, { type: "bot", text: botMessage }]);
          setIsTyping(false);
        }, 1500);
      };

      ws.current.onclose = () => {
        console.log("WebSocket disconnected");
      };

      ws.current.onerror = (error) => {
        console.warn("WebSocket connection failed - server may be unavailable");
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    } catch (error) {
      console.warn("WebSocket initialization failed - server may be unavailable");
    }
  }, []);

  const handleQuestionClick = (faq) => {
    setRemainingFaqs((prev) =>
      prev.filter((item) => item.question !== faq.question)
    );

    setChatHistory((prev) => [
      ...prev,
      { type: "user", text: faq.question },
    ]);

    setIsTyping(true);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "faq", id: faq.id }));
    }

    if (faq.routeTo) {
      setTimeout(() => {
        navigate(faq.routeTo);
      }, 2000);
    }
  };

  const endConversation = () => {
    setChatHistory((prev) => [
      ...prev,
      {
        type: "bot",
        text: "Okay! Feel free to reach out anytime. Goodbye for now! 👋",
      },
    ]);
    setRemainingFaqs([]);
    setTimeout(() => setMinimized(true), 3000);
  };

  if (!visible) return null;

  return (
    <>
      {minimized ? (
        <div
          className="chat-toggle"
          onClick={() => {
            setMinimized(false);
            setChatHistory([]);
            setRemainingFaqs(faqList);
          }}
        >
          💬
        </div>
      ) : (
        <div className="chat-container slide-in">
          <div className="chat-header">
            StreakBot
            <button className="close-btn" onClick={() => setMinimized(true)}>
              &minus;
            </button>
          </div>

          <div className="chat-body">
            {chatHistory.length === 0 && (
              <div className="bot-msg">
                <span className="icon">
                  <img src={botIcon} alt="bot" width="20" height="20" />
                </span>
                <div className="bubble">Hey, I’m here to help you!</div>
              </div>
            )}

            {chatHistory.map((entry, idx) => (
              <div
                key={idx}
                className={entry.type === "bot" ? "bot-msg" : "user-msg"}
              >
                <span className="icon">
                  <img
                    src={entry.type === "bot" ? botIcon : userIcon}
                    alt={entry.type}
                    width="20"
                    height="20"
                  />
                </span>
                <div className="bubble">{entry.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="bot-msg">
                <span className="icon">
                  <img src={botIcon} alt="bot" width="20" height="20" />
                </span>
                <div className="bubble typing-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            )}

            {!isTyping && remainingFaqs.length > 0 && (
              <div className="btn-list">
                {remainingFaqs.map((faq, idx) => (
                  <button
                    key={idx}
                    className="faq-btn"
                    onClick={() => handleQuestionClick(faq)}
                  >
                    {faq.question}
                  </button>
                ))}
                <button className="end-btn" onClick={endConversation}>
                  No questions
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
