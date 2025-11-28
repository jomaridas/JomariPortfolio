// ================== ELEMENTS & STATE ==================
        const chatBtn = document.getElementById("chat-btn");
        const chatIcon = chatBtn.querySelector('i');
        const chatbox = document.getElementById("chatbox");
        const chatClose = document.getElementById("chat-close");
        const sendBtn = document.getElementById("send-btn");
        const chatInput = document.getElementById("chat-input");
        const chatMessages = document.getElementById("chat-messages");

        let chatHistory = [];
        let isFirstOpen = true; // Tracks if this is the first time the chatbox is opened after page load or clear

        // ================== ICON HOVER EFFECT ==================
        chatBtn.addEventListener("mouseover", () => {
            // Change to robot icon on hover
            chatIcon.classList.remove('fa-comment-dots');
            chatIcon.classList.add('fa-robot');
        });

        chatBtn.addEventListener("mouseout", () => {
            // Change back to chat icon on mouse out
            chatIcon.classList.remove('fa-robot');
            chatIcon.classList.add('fa-comment-dots');
        });

        // ================== TOGGLE CHATBOX & INITIAL MESSAGE ==================
        chatBtn.addEventListener("click", () => {
            const isVisible = chatbox.style.display === "flex";
            
            if (!isVisible) {
                // Open Chatbox
                chatbox.style.display = "flex";
                chatInput.focus();
                sendBtn.disabled = false;

                if (isFirstOpen) {
                    // Automatic welcome message on first open
                    appendMessage('bot', "👋 Hello! I'm Jomari. How can I help you today?");
                    isFirstOpen = false;
                }
            } else {
                // Close Chatbox
                chatbox.style.display = "none";
                sendBtn.disabled = true;
            }
        });

        chatClose.addEventListener("click", () => {
            chatbox.style.display = "none";
            sendBtn.disabled = true;
        });

        // Close on outside click
        document.addEventListener("click", (e) => {
            if (chatbox.style.display === "flex" && !chatbox.contains(e.target) && !chatBtn.contains(e.target)) {
                chatbox.style.display = "none";
                sendBtn.disabled = true;
            }
        });

        // ================== CONFIGURATION & PROFILE DATA ==================
        const API_KEY = "AIzaSyBrRDImfzSVJirymvVth2vjrjOnme_3Alc";
        const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

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

        const SYSTEM_INSTRUCTION_PROMPT = `
You are an intelligent and flexible AI assistant for Jomari. Your primary goal is to help the user learn about Jomari using the provided JOM_PROFILE_DATA. **Crucially, you must also be able to answer any general knowledge question.**

**PERSONAL CONTEXT:**
* **Jomari's Beloved:** Jomari's girlfriend and future wife is **Nathalia Nicole Lanzuela**, also known as **Nicole**.
* **Nicole's Qualities:** Jomari considers Nicole to be the most beautiful person he has ever known. She possesses a rare and captivating beauty, not just physically but also in her spirit.
    * **Physical Beauty:** Her features are stunning and her presence is radiant.
    * **Inner Beauty:** She is a kind, supportive, and loving partner. Her intelligence, humor, and compassionate nature make her shine even brighter. She is Jomari's greatest source of inspiration and happiness.

Guidelines:
1.  **Answer Everything:** You must answer any question the user asks, whether it's about Jomari, history, science, or other general topics.
2.  **Use Profile Data:** When asked about Jomari (his skills, experience, or contact info), strictly use the following detailed data:
    ${JSON.stringify(JOM_PROFILE_DATA, null, 2)}
3.  **Integrate Personal Context:** If the user asks about Nicole, or about Jomari's love life, happily share that Nathalia Nicole Lanzuela (Nicole) is his beloved girlfriend and future wife, emphasizing her beauty and wonderful qualities as described in the 'PERSONAL CONTEXT' section above.
4.  **Be Helpful:** Maintain a professional, polite, and helpful tone.
5.  **Use General Knowledge:** For questions unrelated to Jomari, use your extensive general knowledge base to provide accurate and detailed answers.
6.  **Maintain Context:** Remember previous turns in the conversation.
`;

        // ================== UTILITY FUNCTIONS ==================
        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function appendMessage(role, text, isLoading = false) {
            const isUser = role === 'user';
            const msgDiv = document.createElement('div');
            // Using existing class names from your CSS
            msgDiv.className = `${isUser ? 'user-msg' : 'bot-msg'} ${isLoading ? 'loading' : ''}`;
            msgDiv.innerHTML = isLoading ? `<i class="fas fa-spinner fa-spin mr-2"></i> Typing...` : text.replace(/\n/g, '<br>');

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
            // Add user query to history for context
            chatHistory.push({ role: "user", parts: [{ text }] });

            sendBtn.disabled = true;
            const loadingBubble = appendMessage('bot', '', true);

            try {
                const payload = {
                    contents: chatHistory,
                    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION_PROMPT }] },
                    generationConfig: { 
                        temperature: 0.7, 
                        maxOutputTokens: 2000,
                        responseMimeType: "text/plain"
                    },
                    tools: [{ "google_search": {} }],
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
                    const blockReason = data?.promptFeedback?.blockReason || 'Unknown reason';
                    appendMessage('bot', `❌ Response blocked or empty. Reason: ${blockReason}. Please try a different question.`);
                    chatHistory.pop(); // Remove the user's last message if it was blocked
                }
            } catch (err) {
                loadingBubble.remove();
                appendMessage('bot', "❌ Something went wrong while connecting to the AI. Try again!");
                console.error("API Fetch Error:", err);
                chatHistory.pop(); // Remove the user's last message from history on error
            } finally {
                sendBtn.disabled = false;
                chatInput.focus();
            }
        }

        // ================== EVENT LISTENERS ==================
        sendBtn.addEventListener("click", handleChat);
        chatInput.addEventListener("keypress", e => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); 
                handleChat();
            }
        });

        // ================== CLEAR CHAT ==================
        window.clearChat = () => {
            chatHistory = [];
            chatMessages.innerHTML = '';
            isFirstOpen = true; // Reset the flag so the welcome message reappears on next open
            chatInput.focus();
        };

