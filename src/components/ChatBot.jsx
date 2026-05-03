import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";

const botIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/bot.png";
const userIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/user.png";

const INITIAL_BOT_MESSAGE =
  "Hey! I'm StreakBot. Want to learn how we turn plastic into power?";

const FAQ_RESPONSES = {
  why_gridstreak:
    "GridStreak offers a carbon-negative, low-cost, and scalable energy storage solution using plastic waste helping the planet while saving money.",
  what_does_gridstreak_do:
    "GridStreak converts plastic waste into thermal bricks that store clean energy, helping stabilize grids and reduce fossil fuel use.",
  who_can_use_gridstreak:
    "Governments, businesses, and industries looking to improve energy stability, cut carbon emissions, and eliminate plastic waste.",
  where_is_gridstreak_located: "GridStreak operates globally with its roots in Kenya.",
  how_to_contact: "I'll take you to our contact page right now!",
};

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

    const reply = FAQ_RESPONSES[faq.id] ?? "I'm not sure I understand yet";
    setTimeout(() => {
      setChatHistory((prev) => [...prev, { type: "bot", text: reply }]);
      setIsTyping(false);
    }, 1500);

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
        text: "Okay! Feel free to reach out anytime. Goodbye for now! ",
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
                <div className="bubble">{INITIAL_BOT_MESSAGE}</div>
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
