import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";

const faqList = [
  {
    question: "Why GridStreak?",
    answer:
      "GridStreak offers a carbon-negative, low-cost, and scalable energy storage solution using plastic waste — helping the planet while saving money.",
  },
  {
    question: "What does GridStreak do?",
    answer:
      "GridStreak converts plastic waste into thermal bricks that store clean energy, helping stabilize grids and reduce fossil fuel use.",
  },
  {
    question: "Who can use GridStreak?",
    answer:
      "Governments, businesses, and industries looking to improve energy stability, cut carbon emissions, and eliminate plastic waste.",
  },
  {
    question: "Where is GridStreak located?",
    answer: "GridStreak operates globally with its roots in Kenya.",
  },
  {
    question: "How can I get in touch?",
    answer: "I'll take you to our contact page right now!",
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
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
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", text: faq.answer },
      ]);
      setIsTyping(false);

      if (faq.routeTo) {
        setTimeout(() => {
          navigate(faq.routeTo);
        }, 1000);
      }
    }, 1500);
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
            ⚡ StreakBot
            <button className="close-btn" onClick={() => setMinimized(true)}>
              &minus;
            </button>
          </div>

          <div className="chat-body">
            {chatHistory.length === 0 && (
              <div className="bot-msg">
                <span className="icon">🤖</span>
                <div className="bubble">Hey, I’m here to help you!</div>
              </div>
            )}

            {chatHistory.map((entry, idx) => (
              <div
                key={idx}
                className={entry.type === "bot" ? "bot-msg" : "user-msg"}
              >
                <span className="icon">
                  {entry.type === "bot" ? "🤖" : "🙋‍♀️"}
                </span>
                <div className="bubble">{entry.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="bot-msg">
                <span className="icon">🤖</span>
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
                  No, I'm good
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
