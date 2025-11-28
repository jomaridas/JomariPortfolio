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
            if (chatbox.style.display === "flex") {
                chatInput.focus();
            }
        });
        chatClose.addEventListener("click", () => chatbox.style.display = "none");

        // Close on outside click
        document.addEventListener("click", (e) => {
            // Check if the click is outside the chatbox and not on the chat button
            if (chatbox.style.display === "flex" && !chatbox.contains(e.target) && !chatBtn.contains(e.target)) {
                chatbox.style.display = "none";
            }
        });

        // ================== CONFIGURATION ==================
        // REPLACE THIS WITH YOUR ACTUAL API KEY
        const API_KEY = "AIzaSyAZseMBMPMXlEGIGRxD1Kcgl8hZ94_T2wk"; // Kept as empty string for security and runtime injection
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

        // UPDATED SYSTEM INSTRUCTION (In English): Makes the AI general-purpose while retaining Jomari's data and adding personal details about Nicole
        const SYSTEM_INSTRUCTION_PROMPT = `
You are an intelligent and flexible AI assistant for Jomari. Your primary goal is to help the user learn about Jomari using the provided JOM_PROFILE_DATA. **Crucially, you must also be able to answer any general knowledge question.**

**NEW PERSONAL CONTEXT:**
* **Jomari's Beloved:** Jomari's girlfriend and future wife is **Nathalia Nicole Lanzuela**, also known as **Nicole**.
* **Nicole's Qualities:** Jomari considers Nicole to be the most beautiful person he has ever known. She possesses a rare and captivating beauty, not just physically but also in her spirit.
    * **Physical Beauty:** Her features are stunning and her presence is radiant.
    * **Inner Beauty:** She is a kind, supportive, and loving partner. Her intelligence, humor, and compassionate nature make her shine even brighter. She is Jomari's greatest source of inspiration and happiness.

Guidelines:
1.  **Answer Everything:** You must answer any question the user asks, whether it's about Jomari, history, science, or other general topics.
2.  **Use Profile Data:** When asked about Jomari (his skills, experience, or contact info), strictly use the following detailed data:
    ${JSON.stringify(JOM_PROFILE_DATA, null, 2)}
3.  **Integrate Personal Context:** If the user asks about Nicole, or about Jomari's love life, happily share that Nathalia Nicole Lanzuela (Nicole) is his beloved girlfriend and future wife, emphasizing her beauty and wonderful qualities as described in the 'NEW PERSONAL CONTEXT' section above.
4.  **Be Helpful:** Maintain a professional, polite, and helpful tone.
5.  **Use General Knowledge:** For questions unrelated to Jomari, use your extensive general knowledge base to provide accurate and detailed answers.
6.  **Maintain Context:** Remember previous turns in the conversation.
`;

        // ================== STATE ==================
        let chatHistory = [];

        // ================== UTILITY FUNCTIONS ==================
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function appendMessage(role, text, isLoading = false) {
            if (welcomeScreen && welcomeScreen.style.opacity !== '0') {
                welcomeScreen.style.opacity = '0';
                // Use a short delay before hiding to allow fade-out effect
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
        
        // Simple Exponential Backoff for retries
        const maxRetries = 5;
        const initialDelay = 1000; // 1 second

        async function fetchWithRetry(url, options, retryCount = 0) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            } catch (error) {
                if (retryCount >= maxRetries) {
                    throw error;
                }
                const delay = initialDelay * Math.pow(2, retryCount) + Math.random() * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(url, options, retryCount + 1);
            }
        }


        // ================== CHAT HANDLER ==================
        async function handleChat() {
            const text = chatInput.value.trim();
            if (!text) return;

            chatInput.value = '';
            appendMessage('user', text);
            // Add to history for context
            chatHistory.push({ role: "user", parts: [{ text }] });

            sendBtn.disabled = true;
            const loadingBubble = appendMessage('bot', '', true);

            try {
                // Direct call to Gemini API for every query
                const payload = {
                    contents: chatHistory,
                    // Using the updated SYSTEM_INSTRUCTION_PROMPT that includes the profile data and general knowledge instruction
                    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION_PROMPT }] },
                    generationConfig: { 
                        temperature: 0.7, 
                        maxOutputTokens: 2000,
                        // Ensure it outputs markdown/text
                        responseMimeType: "text/plain"
                    }
                };
                
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

                const response = await fetchWithRetry(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

                loadingBubble.remove();
                if (aiText) {
                    appendMessage('bot', aiText);
                    // Add AI response to history
                    chatHistory.push({ role: "model", parts: [{ text: aiText }] });
                } else {
                    // Check for blocked reason (safety or other issues)
                    const blockReason = data?.promptFeedback?.blockReason || 'Unknown reason';
                    appendMessage('bot', `❌ Response blocked or empty. Reason: ${blockReason}. Please try a different question.`);
                    // Remove the user's last message from history if it was blocked
                    chatHistory.pop(); 
                }
            } catch (err) {
                loadingBubble.remove();
                appendMessage('bot', "❌ Something went wrong while connecting to the AI. Try again!");
                console.error("API Fetch Error:", err);
                // Remove the user's last message from history on error
                chatHistory.pop();
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
                chatInput.focus();
            }
        };

        // Initial welcome message (optional)
        document.addEventListener('DOMContentLoaded', () => {
            if (welcomeScreen && chatMessages.children.length === 0) {
                welcomeScreen.innerHTML = `
                    <div class="text-center">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">JOM AI Assistant</h2>
                        <p class="text-gray-600 mb-6">Hello! I'm JOM AI, Jomari's smart assistant. Ask me anything about his skills, experience, or even about his beloved future wife, Nicole!</p>
                        <p class="text-sm text-gray-400 mb-4">Example: "What are Jomari's skills?" or "Tell me about Nicole Lanzuela."</p>
                        <button onclick="document.getElementById('chat-input').focus(); clearWelcomeScreen()" class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-150">Start Chatting</button>
                    </div>
                `;
            }
        });
        
        function clearWelcomeScreen() {
             if (welcomeScreen) {
                welcomeScreen.style.opacity = '0';
                setTimeout(() => welcomeScreen.style.display = 'none', 500); 
            }
        }

