import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const BinkooChatbot: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // ... existing useEffect code ...
    // ========== CONFIGURATION ==========
    const WEBHOOK_URL = 'https://n8n.srv1090303.hstgr.cloud/webhook/d60df4a0-1428-4d3f-8e76-1ef0fb576c4d/chat';
    let sessionId: string | null = null;
    let isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // ========== ÉLÉMENTS DOM ==========
    const toggle = document.getElementById('binkoo-chat-toggle');
    const chatWindow = document.getElementById('binkoo-chat-window');
    const closeBtn = document.getElementById('binkoo-chat-close');
    const messagesContainer = document.getElementById('binkoo-chat-messages');
    const input = document.getElementById('binkoo-chat-input') as HTMLInputElement;
    const sendBtn = document.getElementById('binkoo-chat-send');
    const typing = document.querySelector('.chat-typing');
    const welcomeBubbles = document.getElementById('binkoo-welcome-bubbles');

    // ========== GESTION BULLES DE BIENVENUE ==========
    // Vérifier si les bulles ont déjà été affichées
    const welcomeShown = localStorage.getItem('binkoo-welcome-shown-v2');

    if (welcomeShown === 'true') {
      // Les bulles ont déjà été affichées, les cacher immédiatement
      if (welcomeBubbles) {
        welcomeBubbles.style.display = 'none';
      }
    } else {
      // Première visite : afficher les bulles et marquer comme affichées
      localStorage.setItem('binkoo-welcome-shown-v2', 'true');

      // Les bulles s'affichent normalement via l'animation CSS
      setTimeout(hideWelcomeBubbles, 10000);
    }

    function hideWelcomeBubbles() {
      welcomeBubbles?.classList.add('hide');
      setTimeout(() => {
        if (welcomeBubbles) welcomeBubbles.style.display = 'none';
      }, 500);
    }

    function hideWelcomeBubblesOnOpen() {
      if (welcomeBubbles && !welcomeBubbles.classList.contains('hide')) {
        hideWelcomeBubbles();
      }
    }

    // ========== GESTION SESSION ==========
    function getSessionId() {
      if (!sessionId) {
        sessionId = localStorage.getItem('binkoo-session-id');
        if (!sessionId) {
          sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('binkoo-session-id', sessionId);
        }
      }
      return sessionId;
    }

    // ========== FONCTIONS UI ==========
    function toggleChat() {
      chatWindow?.classList.toggle('active');

      if (chatWindow?.classList.contains('active')) {
        hideWelcomeBubblesOnOpen();
        if (!isMobileOrTablet) {
          setTimeout(() => input?.focus(), 100);
        }
      }
    }

    function addMessage(text: string, isUser = false) {
      const message = document.createElement('div');
      message.className = `chat-message ${isUser ? 'user' : 'bot'}`;
      message.textContent = text;
      messagesContainer?.appendChild(message);
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    function showTyping() {
      typing?.classList.add('active');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    function hideTyping() {
      typing?.classList.remove('active');
    }

    function setLoading(loading: boolean) {
      if (sendBtn) (sendBtn as HTMLButtonElement).disabled = loading;
      if (input) (input as HTMLInputElement).disabled = loading;
      if (loading) {
        showTyping();
      } else {
        hideTyping();
      }
    }

    // ========== ENVOI MESSAGE ==========
    async function sendMessage() {
      const message = input?.value.trim();
      if (!message) return;

      addMessage(message, true);
      if (input) input.value = '';
      setLoading(true);

      try {
        const response = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'sendMessage',
            sessionId: getSessionId(),
            chatInput: message
          })
        });

        if (!response.ok) {
          throw new Error('Erreur réseau');
        }

        const data = await response.json();

        if (data.output) {
          addMessage(data.output);
        } else if (data.message) {
          addMessage(data.message);
        } else {
          addMessage("Désolé, je n'ai pas pu traiter votre message. Essayez à nouveau.");
        }
      } catch (error) {
        console.error('Erreur:', error);
        addMessage("Une erreur s'est produite. Veuillez réessayer.");
      } finally {
        setLoading(false);
        if (!isMobileOrTablet) {
          input?.focus();
        }
      }
    }

    // ========== EVENT LISTENERS ==========
    toggle?.addEventListener('click', toggleChat);
    closeBtn?.addEventListener('click', toggleChat);
    sendBtn?.addEventListener('click', sendMessage);

    input?.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    toggle?.addEventListener('click', hideWelcomeBubblesOnOpen);

    window.addEventListener('load', () => {
      getSessionId();
    });

    // Cleanup
    return () => {
      toggle?.removeEventListener('click', toggleChat);
      closeBtn?.removeEventListener('click', toggleChat);
      sendBtn?.removeEventListener('click', sendMessage);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ========== VARIABLES CSS ========== */
        :root {
            --chatbot-primary: #FF2A00;
            --chatbot-white: #FFFFFF;
            --chatbot-black: #000000;
            --chatbot-gray: #F5F5F5;
            --chatbot-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            --chatbot-radius: 16px;
            --chatbot-transition: 0.3s ease;
        }

        /* ========== BULLES DE BIENVENUE ========== */
        #binkoo-welcome-bubbles {
            position: fixed;
            bottom: 100px;
            right: 40px; /* Aligned with new button position (md:right-10 = 40px) */
            z-index: 9997;
            display: flex;
            flex-direction: column;
            gap: 8px;
            max-width: 320px;
            opacity: 0;
            transform: translateY(20px);
            animation: bubbleIn 0.5s ease forwards 0.5s;
        }

        #binkoo-welcome-bubbles.hide {
            animation: bubbleOut 0.5s ease forwards;
        }

        @keyframes bubbleIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bubbleOut {
            to {
                opacity: 0;
                transform: translateY(20px);
                pointer-events: none;
            }
        }

        .welcome-bubble {
            background: var(--chatbot-white);
            padding: 14px 18px;
            border-radius: 16px;
            box-shadow: var(--chatbot-shadow);
            font-size: 14px;
            line-height: 1.5;
            color: var(--chatbot-black);
            border: 1px solid #E5E5E5;
            position: relative;
            animation: float 3s ease-in-out infinite;
        }

        .welcome-bubble:nth-child(2) {
            animation-delay: 0.2s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }

        .welcome-bubble::after {
            content: '';
            position: absolute;
            bottom: -8px;
            right: 28px; /* Adjusted to center over button */
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid var(--chatbot-white);
            filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
        }

        /* ========== BOUTON DE TOGGLE ========== */
        /* Styles moved to Tailwind classes on the element directly */
        
        /* Pulse animation keyframes still needed */
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        /* ========== FENÊTRE DE CHAT ========== */
        #binkoo-chat-window {
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 400px;
            height: 600px;
            background: var(--chatbot-white);
            border-radius: var(--chatbot-radius);
            box-shadow: var(--chatbot-shadow);
            z-index: 9999;
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: slideIn 0.3s ease;
        }

        #binkoo-chat-window.active {
            display: flex;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* ========== HEADER ========== */
        #binkoo-chat-header {
            background: var(--chatbot-black);
            color: var(--chatbot-white);
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid var(--chatbot-primary);
        }

        #binkoo-chat-header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        #binkoo-chat-header img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--chatbot-white);
            padding: 4px;
        }

        #binkoo-chat-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }

        #binkoo-chat-header p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }

        #binkoo-chat-close {
            background: none;
            border: none;
            color: var(--chatbot-white);
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: background var(--chatbot-transition);
        }

        #binkoo-chat-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        /* ========== MESSAGES ========== */
        #binkoo-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chatbot-gray);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        #binkoo-chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        #binkoo-chat-messages::-webkit-scrollbar-thumb {
            background: var(--chatbot-primary);
            border-radius: 3px;
        }

        .chat-message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
            animation: messageIn 0.3s ease;
        }

        @keyframes messageIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .chat-message.bot {
            background: var(--chatbot-white);
            color: var(--chatbot-black);
            align-self: flex-start;
            border: 1px solid #E5E5E5;
        }

        .chat-message.user {
            background: var(--chatbot-primary);
            color: var(--chatbot-white);
            align-self: flex-end;
        }

        .chat-typing {
            display: none;
            align-self: flex-start;
            background: var(--chatbot-white);
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid #E5E5E5;
        }

        .chat-typing.active {
            display: block;
        }

        .chat-typing span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--chatbot-black);
            margin: 0 2px;
            animation: typing 1.4s infinite;
        }

        .chat-typing span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .chat-typing span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.7;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }

        /* ========== INPUT ========== */
        #binkoo-chat-input-container {
            padding: 16px 20px;
            background: var(--chatbot-white);
            border-top: 1px solid #E5E5E5;
            display: flex;
            gap: 8px;
        }

        #binkoo-chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #E5E5E5;
            border-radius: 24px;
            font-size: 14px;
            outline: none;
            transition: border-color var(--chatbot-transition);
            font-family: inherit;
        }

        #binkoo-chat-input:focus {
            border-color: var(--chatbot-primary);
        }

        #binkoo-chat-send {
            width: 44px;
            height: 44px;
            background: var(--chatbot-primary);
            color: var(--chatbot-white);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: transform var(--chatbot-transition), opacity var(--chatbot-transition);
            flex-shrink: 0;
        }

        #binkoo-chat-send:hover:not(:disabled) {
            transform: scale(1.1);
        }

        #binkoo-chat-send:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
            /* #binkoo-chat-toggle styles removed in favor of Tailwind utility classes */

            #binkoo-chat-window {
                width: calc(100vw - 32px);
                height: calc(100vh - 120px);
                bottom: 90px;
                right: 16px;
                max-width: 400px;
            }

            #binkoo-welcome-bubbles {
                bottom: 88px;
                right: 20px;
                max-width: calc(100vw - 100px);
            }

            .welcome-bubble {
                font-size: 13px;
                padding: 12px 16px;
            }
        }

        @media (max-width: 480px) {
            #binkoo-chat-window {
                width: 100vw;
                height: 100dvh;
                top: 0;
                bottom: auto;
                right: 0;
                border-radius: 0;
            }

            /* #binkoo-chat-toggle styles removed */

            #binkoo-welcome-bubbles {
                bottom: 84px;
                right: 16px;
                max-width: calc(100vw - 88px);
            }

            .welcome-bubble {
                font-size: 12px;
                padding: 10px 14px;
            }

            #binkoo-chat-input {
                font-size: 16px;
            }
        }
      `}} />

      {/* Bulles de bienvenue */}
      <div id="binkoo-welcome-bubbles">
        <div className="welcome-bubble">
          👋🏿 Salut! Comment puis-je aider mon humain préféré ? 😻
        </div>
        <div className="welcome-bubble">
          Au fait, Nous pouvons créer un agent comme ça pour VOTRE site ! 😮
        </div>
      </div>

      {/* Bouton de toggle */}
      <button
        id="binkoo-chat-toggle"
        aria-label="Ouvrir le chat"
        className={`fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-red-500/20 transition-all duration-300 hover:scale-110 focus:outline-none animate-fade-in group border-none ${location.pathname === '/' ? 'lg:hidden' : ''}`}
        style={location.pathname === '/' && window.innerWidth >= 1024 ? { display: 'none' } : {}}
      >
        <div className="animate-wiggle w-full h-full flex items-center justify-center group-hover:animate-glow-pulse rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="currentColor">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        </div>
      </button>

      {/* Fenêtre de chat */}
      <div id="binkoo-chat-window">
        {/* Header */}
        <div id="binkoo-chat-header">
          <div id="binkoo-chat-header-content">
            <img src="https://i.postimg.cc/VLRRc9K5/IMG-1941.jpg" alt="Bino" />
            <div>
              <h3>Bino</h3>
              <p>BinkoO Digital Lab</p>
            </div>
          </div>
          <button id="binkoo-chat-close" aria-label="Fermer le chat">×</button>
        </div>

        {/* Messages */}
        <div id="binkoo-chat-messages">
          <div className="chat-message bot">
            Bonjour ! 👋 Je suis Bino, l'assistant de BinkoO Digital Lab. Comment puis-je vous aider aujourd'hui ?
          </div>
        </div>

        {/* Indicateur de frappe */}
        <div className="chat-typing">
          <span></span><span></span><span></span>
        </div>

        {/* Input */}
        <div id="binkoo-chat-input-container">
          <input
            type="text"
            id="binkoo-chat-input"
            placeholder="Écrivez votre message..."
            aria-label="Message"
          />
          <button id="binkoo-chat-send" aria-label="Envoyer">➤</button>
        </div>
      </div>
    </>
  );
};