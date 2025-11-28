// ================== ELEMENTS ==================
const chatBtn = document.getElementById("chat-btn");
const chatbox = document.getElementById("chatbox");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const welcomeScreen = document.getElementById('welcome-screen');

// ================== TOGGLE CHATBOX ==================
chatBtn.addEventListener("click", () => {
    chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
});
chatClose.addEventListener("click", () => chatbox.style.display = "none");

document.addEventListener("click", (e) => {
    if (!chatbox.contains(e.target) && !chatBtn.contains(e.target)) {
        chatbox.style.display = "none";
    }
});

// ================== CONFIGURATION ==================
// REPLACE THIS WITH YOUR ACTUAL API KEY
const API_KEY = "AIzaSyBmuQwFK7BAWfHoE7I7l_CTNP36oEwxVSA"; 
const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

// Jomari profile data (Kept and will be used by the AI)
const JOM_PROFILE_DATA = {
    name: "Jomari",
    about: "I am an enthusiastic, self-motivated, reliable, responsible, and hardworking person...",
    hobbies: ["Watching movies", "Editing", "Drawing", "Traveling"],
    skills: {
        soft: ["Communication","Creativity","Time Management","Problem Solving","Adaptability"],
        hard: ["Free Hand","Typography","Layout","Acrobat","HTML/CSS","Sketching"],
        appDev: "Building Android/iOS apps"
    },
    experience: [
        { years: "2023 - Current", role: "Layout Ads Creator" },
        { years: "2022 - 2022", role: "Sales/Technician" },
        { years: "2021 - 2021", role: "Stock Clerk" },
        { years: "2019 - 2021", role: "Delivery Rider" },
        { years: "2016 - 2017", role: "Cellphone Technician" }
    ],
    education: [
        { years: "2023", course: "Information Technology" },
        { years: "2016", course: "Electronics Course" }
    ],
    contact: {
        email: "jomariabubo.grc@gmail.com",
        phone: "09659516196",
        location: "Caloocan City",
        willingToRelocate: true
    }
};

// UPDATED SYSTEM INSTRUCTION (In English): Makes the AI general-purpose while retaining Jomari's data
const SYSTEM_INSTRUCTION_PROMPT = `
You are an intelligent and flexible AI assistant. Your primary goal is to help the user learn about Jomari using the provided JOM_PROFILE_DATA. **Crucially, you must also be able to answer any general knowledge question.**

Guidelines:
1.  **Answer Everything:** You must answer any question the user asks, whether it's about Jomari, history, science, or other general topics.
2.  **Use Profile Data:** When asked about Jomari (his skills, experience, or contact info), strictly use the following detailed data: 
    ${JSON.stringify(JOM_PROFILE_DATA, null, 2)}
3.  **Be Helpful:** Maintain a professional, polite, and helpful tone.
4.  **Use General Knowledge:** For questions unrelated to Jomari, use your extensive general knowledge base to provide accurate and detailed answers.
5.  **Maintain Context:** Remember previous turns in the conversation.
`;

// ================== STATE ==================
let chatHistory = [];

// ================== UI FUNCTIONS ==================
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendMessage(role, text, isLoading = false) {
    if (welcomeScreen && welcomeScreen.style.opacity !== '0') {
        welcomeScreen.style.opacity = '0';
        setTimeout(() => welcomeScreen.style.display = 'none', 500);
    }

    const isUser = role === 'user';
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'} ${isLoading ? 'loading' : ''}`;
    msgDiv.textContent = isLoading ? "Typing..." : text;

    chatMessages.appendChild(msgDiv);
    scrollToBottom();
    return msgDiv;
}

// ================== LOGIC RESPONSES (REMOVED) ==================
// Removed getLogicResponse function. All answers now come from the AI model.

// ================== CHAT HANDLER ==================
async function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';
    appendMessage('user', text);
    chatHistory.push({ role: "user", parts: [{ text }] });

    sendBtn.disabled = true;
    const loadingBubble = appendMessage('bot', '', true);

    try {
        // Direct call to Gemini API for every query
        const payload = {
            contents: chatHistory,
            // Using the updated SYSTEM_INSTRUCTION_PROMPT that includes the profile data and general knowledge instruction
            systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION_PROMPT }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 2000 }
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        loadingBubble.remove();
        if (aiText) {
            appendMessage('bot', aiText);
            chatHistory.push({ role: "model", parts: [{ text: aiText }] });
        } else {
            appendMessage('bot', "❌ Response blocked or empty. Please check your API Key or try a different question.");
        }
    } catch (err) {
        loadingBubble.remove();
        appendMessage('bot', "❌ Something went wrong. Try again!");
        console.error("API Fetch Error:", err);
    } finally {
        sendBtn.disabled = false;
        chatInput.focus();
    }
}

// ================== EVENT LISTENERS ==================
sendBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keypress", e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // Prevent new line in input field
        handleChat();
    }
});

// ================== CLEAR CHAT ==================
window.clearChat = () => {
    chatHistory = [];
    chatMessages.innerHTML = '';
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
        setTimeout(() => welcomeScreen.style.opacity = '1', 10);
    }
};

// Initial welcome message (optional)
document.addEventListener('DOMContentLoaded', () => {
    if (welcomeScreen && chatMessages.children.length === 0) {
        welcomeScreen.innerHTML = `
            <h2>JOM AI Assistant</h2>
            <p>Hello! I'm JOM AI, Jomari's smart assistant. Ask me anything about Jomari or any general knowledge question!</p>
            <p style="font-size: 0.8em; color: #888;">Example: "What are Jomari's skills?" or "Tell me about the solar system."</p>
            <button onclick="document.getElementById('chat-input').focus()">Start Chatting</button>
        `;
    }
});
