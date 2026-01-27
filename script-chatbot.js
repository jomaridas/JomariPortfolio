// Enhanced Configuration
const chatBtn = document.getElementById("chat-btn");
const chatIcon = chatBtn.querySelector('i');
const chatbox = document.getElementById("chatbox");
const chatboxWelcome = document.getElementById("chatbox-welcome");
const chatClose = document.getElementById("chat-close");
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const themeToggle = document.getElementById("theme-toggle");
const suggestionBtn = document.getElementById("suggestion-btn");
const suggestionModal = document.getElementById("suggestion-modal");
const closeSuggestions = document.getElementById("close-suggestions");
const suggestionGrid = document.getElementById("suggestion-grid");
const particleContainer = document.getElementById("particle-container");

let isFirstOpen = true;
let isSpeaking = false;
let synth = window.speechSynthesis;
let isSending = false;
let conversationHistory = [];
let isChatOpen = false;
let conversationContext = [];
let isDarkTheme = true;
let currentVolume = 1;

// Create floating particles
function createFloatingParticles() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('liquid-particle');
        
        // Random size
        const size = Math.random() * 100 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random color
        const colors = [
            'rgba(255, 105, 180, 0.1)',
            'rgba(0, 191, 255, 0.1)',
            'rgba(157, 78, 221, 0.1)',
            'rgba(255, 215, 0, 0.1)'
        ];
        particle.style.background = `radial-gradient(circle at 30% 30%, ${colors[Math.floor(Math.random() * colors.length)]}, transparent 70%)`;
        
        // Random animation delay and duration
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
        
        particleContainer.appendChild(particle);
    }
}

// COMPLETE JOMARI PROFILE DATA WITH ALL YOUR DETAILS
const JOM_PROFILE_DATA = {
    name: "Jomari",
    fullName: "Jomari Abubo",
    tagline: "BSIT Graduate | UI/UX Designer | Front-End Developer | IT Professional",
    
    // CONTACT INFORMATION
    contact: {
        phone: "09659516196",
        email: "Jomariabubo.grc@gmail.com",
        address: "118 Kabulusan 1, Caloocan City",
        languages: ["Tagalog", "English"]
    },
    
    // EXPERTISE
    expertise: {
        design: [
            "UI/UX Design",
            "Graphic Design",
            "Photo Editing",
            "Video Editing",
            "AI Tools"
        ],
        development: [
            "Front-End Development",
            "Web Programming",
            "Responsive Design"
        ],
        technical: [
            "Computer Troubleshooting",
            "Mobile Repair",
            "Hardware & Software Maintenance"
        ],
        business: [
            "Customer Service",
            "Sales Support",
            "Technical Support",
            "Microsoft Office"
        ],
        softSkills: [
            "Teamwork",
            "Fast Learning",
            "Adaptability",
            "Problem Solving"
        ]
    },
    
    // PORTFOLIO & OBJECTIVE
    portfolio: {
        objective: "BSIT graduate with a strong foundation in IT, multimedia design, and technical support, eager to contribute technical expertise and creativity to a forward-thinking organization. Committed to continuous learning, delivering innovative solutions, and driving team success while advancing personal and professional growth.",
        
        thesisRole: {
            title: "User Interface Designer & Coder",
            description: "Designed and developed the front-end interface, ensuring user-friendly navigation, responsive layouts, and aesthetic consistency."
        }
    },
    
    // TECHNICAL SKILLS
    technicalSkills: {
        programmingLanguages: [
            "HTML", "CSS", "JavaScript", "C#", "C++", "PHP", "SQL", "Java"
        ],
        designTools: [
            "Canva", "CapCut", "Adobe Photoshop", "Adobe Illustrator",
            "Adobe Lightroom", "Adobe Acrobat", "Adobe After Effects"
        ],
        officeTools: [
            "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint"
        ],
        hardware: "Basic knowledge in computer assembly, maintenance, and troubleshooting common hardware/software issues",
        aiTools: "Basic knowledge in AI-assisted design and productivity tools (e.g. ChatGPT, Gemini)",
        uiuxSkills: "Familiar with responsive design, layout optimization, and user experience principles",
        adaptability: "Highly willing and eager to learn any tools, software, or technologies required by the company"
    },
    
    // EDUCATION
    education: [
        {
            institution: "Global Reciprocal College",
            degree: "Bachelor of Science in Information Technology",
            status: "Graduate",
            year: "Recent"
        },
        {
            institution: "MFI Polytechnic Institute Inc.",
            degree: "NC2 Electronics Course",
            status: "Completed",
            year: "2016"
        }
    ],
    
    // EXPERIENCE
    experience: [
        {
            company: "LAB8 DIAGNOSTIC LABORATORY",
            position: "Multimedia Marketer",
            period: "March 2023 - May 2024",
            responsibilities: [
                "Designed compelling visuals and marketing materials that aligned with brand aesthetics",
                "Collaborated with cross-functional teams to execute strategic campaigns",
                "Applied attention to detail and creativity to produce high-quality content for digital and print platforms"
            ]
        },
        {
            company: "NWOW EBIKE",
            position: "Sales Representative & Technician",
            period: "February 2022 - August 2022",
            responsibilities: [
                "Provided exceptional customer service by matching clients with suitable eBike products",
                "Performed technical diagnostics, repairs, and maintenance",
                "Supported store operations, contributing to sales growth and customer satisfaction"
            ]
        },
        {
            company: "PATRICK CHEF KITCHEN",
            position: "Waiter",
            period: "September 2021 - January 2022",
            responsibilities: [
                "Delivered professional service at various events",
                "Collaborated with event planners to set up venues and manage service flow",
                "Handled customer requests efficiently"
            ]
        },
        {
            company: "BE CONNECTED (BENCH)",
            position: "Sales & Stock Clerk",
            period: "January 2020 - July 2021",
            responsibilities: [
                "Assisted customers in product selection, driving sales",
                "Managed inventory, received shipments, and ensured accurate stock records",
                "Maintained store organization and product presentation standards"
            ]
        },
        {
            company: "EBOYZ DELIVERY SERVICE INC.",
            position: "McDonalds Delivery Rider",
            period: "January 2017 - August 2019",
            responsibilities: [
                "Ensured timely and accurate deliveries using local route expertise",
                "Communicated effectively with dispatch and customers",
                "Managed payments and upheld customer service standards"
            ]
        },
        {
            company: "COSMIC TECHNOLOGIES INC.",
            position: "Cellphone Technician",
            period: "February 2016 - July 2016",
            responsibilities: [
                "Diagnosed and repaired mobile devices",
                "Utilized specialized tools and knowledge of electronic systems",
                "Maintained accurate repair records and provided technical advice"
            ]
        }
    ],
    
    // PERSONAL TRAITS
    personalTraits: [
        "Detail-oriented", "Creative", "Adaptable", "Collaborative",
        "Proactive", "Reliable", "Analytical", "Innovative"
    ],
    
    // WORK STYLE
    workStyle: "Combines technical expertise with creative problem-solving. Focuses on user-centered design principles and efficient solutions.",
    
    // FUTURE GOALS
    futureGoals: [
        "Lead design and development teams",
        "Create impactful digital experiences",
        "Contribute to innovative tech projects",
        "Continuous learning and skill development"
    ],
    
    // RATES
    rates: {
        hourly: "$25-40/hour",
        projectBased: "Custom quotes based on scope",
        availability: "Available for freelance projects and full-time opportunities"
    }
};

// ENHANCED AI ASSISTANT WITH COMPLETE PROFILE
class CompleteProfileAIAssistant {
    constructor(profileData) {
        this.profile = profileData;
        this.responseCache = new Map();
        this.conversationContext = [];
        this.userPreferences = {};
        this.lastInteractionTime = Date.now();
        this.sessionTopics = new Set();
        
        // Pre-cache common responses
        this.preCacheResponses();
    }

    preCacheResponses() {
        // Cache all responses based on your complete profile
        this.cacheResponse("hello", this.formatGreeting("neutral"));
        this.cacheResponse("hi", this.formatGreeting("neutral"));
        this.cacheResponse("hey", this.formatGreeting("neutral"));
        
        // Contact information
        this.cacheResponse("contact", this.formatContactInfo());
        this.cacheResponse("phone", this.formatContactInfo());
        this.cacheResponse("email", this.formatContactInfo());
        this.cacheResponse("address", this.formatContactInfo());
        this.cacheResponse("how to contact", this.formatContactInfo());
        
        // Skills and expertise
        this.cacheResponse("skills", this.formatSkills());
        this.cacheResponse("expertise", this.formatSkills());
        this.cacheResponse("what can you do", this.formatSkills());
        this.cacheResponse("technical skills", this.formatTechnicalSkills());
        this.cacheResponse("programming", this.formatTechnicalSkills());
        this.cacheResponse("design skills", this.formatDesignSkills());
        
        // Experience
        this.cacheResponse("experience", this.formatExperience());
        this.cacheResponse("work history", this.formatExperience());
        this.cacheResponse("jobs", this.formatExperience());
        this.cacheResponse("career", this.formatExperience());
        
        // Education
        this.cacheResponse("education", this.formatEducation());
        this.cacheResponse("degree", this.formatEducation());
        this.cacheResponse("school", this.formatEducation());
        
        // Portfolio
        this.cacheResponse("portfolio", this.formatPortfolio());
        this.cacheResponse("objective", this.formatPortfolio());
        this.cacheResponse("thesis", this.formatThesisRole());
        
        // About
        this.cacheResponse("about", this.formatAbout());
        this.cacheResponse("who are you", this.formatAbout());
        this.cacheResponse("introduce", this.formatAbout());
        
        // Availability and rates
        this.cacheResponse("available", this.formatAvailability());
        this.cacheResponse("hire", this.formatAvailability());
        this.cacheResponse("rates", this.formatRates());
        this.cacheResponse("pricing", this.formatRates());
        
        // Help
        this.cacheResponse("help", this.formatHelp());
        this.cacheResponse("what can you tell me", this.formatHelp());
    }

    cacheResponse(query, response) {
        const key = query.toLowerCase().trim();
        this.responseCache.set(key, response);
    }

    analyzeQuery(query) {
        const q = query.toLowerCase().trim();
        
        // Update conversation context
        this.updateContext(q);
        
        // Check cache first
        const cachedResponse = this.getCachedResponse(q);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Detect intent
        const intent = this.detectIntent(q);
        const sentiment = this.analyzeSentiment(q);
        
        // Generate response
        let response = this.generateResponse(q, intent, sentiment);
        
        // Cache the response
        this.cacheResponse(q, response);
        
        return response;
    }

    getCachedResponse(query) {
        const exactMatch = this.responseCache.get(query);
        if (exactMatch) return exactMatch;
        
        // Check for partial matches
        const words = query.split(' ');
        for (const [cachedQuery, response] of this.responseCache.entries()) {
            for (const word of words) {
                if (word.length > 3 && cachedQuery.includes(word)) {
                    return response;
                }
            }
        }
        
        return null;
    }

    detectIntent(query) {
        const intents = [
            { pattern: /(hello|hi|hey|greetings)/i, intent: 'greeting' },
            { pattern: /(contact|phone|email|address|reach|connect)/i, intent: 'contact' },
            { pattern: /(skill|expertise|proficient|good at|capable)/i, intent: 'skills' },
            { pattern: /(experience|work|job|career|employment)/i, intent: 'experience' },
            { pattern: /(education|degree|school|college|graduate)/i, intent: 'education' },
            { pattern: /(portfolio|objective|thesis|project)/i, intent: 'portfolio' },
            { pattern: /(about|who|introduce|describe)/i, intent: 'about' },
            { pattern: /(available|hire|work with|collaborate)/i, intent: 'availability' },
            { pattern: /(rate|price|cost|fee|budget)/i, intent: 'rates' },
            { pattern: /(help|assist|guide|what can)/i, intent: 'help' },
            { pattern: /(thanks|thank|appreciate)/i, intent: 'thanks' }
        ];

        for (const { pattern, intent } of intents) {
            if (pattern.test(query)) {
                this.sessionTopics.add(intent);
                return intent;
            }
        }
        return 'general';
    }

    analyzeSentiment(query) {
        const positive = /\b(great|awesome|amazing|wonderful|excellent|perfect|love|like|good|nice|impressive)\b/i;
        const negative = /\b(bad|poor|terrible|awful|hate|dislike|problem|issue|concern)\b/i;
        
        if (positive.test(query)) return 'positive';
        if (negative.test(query)) return 'negative';
        return 'neutral';
    }

    generateResponse(query, intent, sentiment) {
        switch(intent) {
            case 'greeting': return this.formatGreeting(sentiment);
            case 'contact': return this.formatContactInfo();
            case 'skills': return this.formatSkills();
            case 'experience': return this.formatExperience();
            case 'education': return this.formatEducation();
            case 'portfolio': return this.formatPortfolio();
            case 'about': return this.formatAbout();
            case 'availability': return this.formatAvailability();
            case 'rates': return this.formatRates();
            case 'help': return this.formatHelp();
            case 'thanks': return this.formatThanks(sentiment);
            default: return this.handleGeneralQuery(query);
        }
    }

    updateContext(query) {
        this.conversationContext.push({
            query,
            timestamp: Date.now()
        });
        
        if (this.conversationContext.length > 5) {
            this.conversationContext.shift();
        }
        
        this.lastInteractionTime = Date.now();
    }

    // Response formatters
    formatGreeting(sentiment) {
        const timeGreeting = this.getTimeBasedGreeting();
        const greetings = {
            positive: "Hello! 😊 Great to connect! I'm excited to share Jomari's professional profile with you.",
            neutral: "Hello! 👋 I'm here to help you learn about Jomari's professional background and skills.",
            negative: "Hello there. 👋 I'm here to provide information about Jomari's professional qualifications."
        };
        
        const randomGreeting = greetings[sentiment] || greetings.neutral;
        return `${timeGreeting} ${randomGreeting}\n\nI can tell you about: contact info, skills, experience, education, portfolio, and more!`;
    }

    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning!";
        if (hour < 18) return "Good afternoon!";
        return "Good evening!";
    }

    formatContactInfo() {
        return `**📞 Contact Information:**\n\n📱 **Phone:** ${this.profile.contact.phone}\n📧 **Email:** ${this.profile.contact.email}\n📍 **Address:** ${this.profile.contact.address}\n🗣️ **Languages:** ${this.profile.contact.languages.join(', ')}\n\n*Available for professional opportunities!*`;
    }

    formatSkills() {
        return `**🎯 Professional Expertise:**\n\n**Design & Creative:**\n${this.profile.expertise.design.map(s => `• ${s}`).join('\n')}\n\n**Development:**\n${this.profile.expertise.development.map(s => `• ${s}`).join('\n')}\n\n**Technical Support:**\n${this.profile.expertise.technical.map(s => `• ${s}`).join('\n')}\n\n**Business Skills:**\n${this.profile.expertise.business.map(s => `• ${s}`).join('\n')}\n\n**Soft Skills:**\n${this.profile.expertise.softSkills.map(s => `• ${s}`).join('\n')}`;
    }

    formatTechnicalSkills() {
        return `**💻 Technical Skills:**\n\n**Programming Languages:**\n${this.profile.technicalSkills.programmingLanguages.map(s => `• ${s}`).join('\n')}\n\n**Design Tools:**\n${this.profile.technicalSkills.designTools.map(s => `• ${s}`).join('\n')}\n\n**Office Tools:**\n${this.profile.technicalSkills.officeTools.map(s => `• ${s}`).join('\n')}\n\n**Hardware Skills:** ${this.profile.technicalSkills.hardware}\n\n**AI Tools:** ${this.profile.technicalSkills.aiTools}\n\n**UI/UX Skills:** ${this.profile.technicalSkills.uiuxSkills}\n\n**Adaptability:** ${this.profile.technicalSkills.adaptability}`;
    }

    formatDesignSkills() {
        return `**🎨 Design Skills:**\n\n${this.profile.technicalSkills.designTools.map(s => `• ${s}`).join('\n')}\n\n**Specialties:**\n• UI/UX Design\n• Graphic Design\n• Photo/Video Editing\n• AI-assisted Design\n\n*Creative problem-solver with attention to detail*`;
    }

    formatExperience() {
        let expText = `**💼 Professional Experience:**\n\n`;
        
        this.profile.experience.forEach((exp, index) => {
            expText += `**${index + 1}. ${exp.position}**\n`;
            expText += `🏢 ${exp.company}\n`;
            expText += `📅 ${exp.period}\n`;
            expText += `${exp.responsibilities.map(r => `• ${r}`).join('\n')}\n\n`;
        });
        
        expText += `*Diverse experience across multiple industries with strong customer service and technical skills.*`;
        return expText;
    }

    formatEducation() {
        return `**🎓 Education:**\n\n${this.profile.education.map(e => `• **${e.degree}**\n  ${e.institution} (${e.year})`).join('\n\n')}\n\n*Continuously learning and upgrading skills*`;
    }

    formatPortfolio() {
        return `**📁 Professional Portfolio:**\n\n**Career Objective:**\n${this.profile.portfolio.objective}\n\n**Thesis Role:**\n${this.profile.portfolio.thesisRole.description}\n\n**Personal Traits:**\n${this.profile.personalTraits.map(t => `• ${t}`).join('\n')}\n\n**Work Style:** ${this.profile.workStyle}`;
    }

    formatThesisRole() {
        return `**🎯 Thesis Project Role:**\n\n**Position:** ${this.profile.portfolio.thesisRole.title}\n\n**Responsibilities:**\n${this.profile.portfolio.thesisRole.description}\n\n*Demonstrated ability to combine design and development skills in practical projects.*`;
    }

    formatAbout() {
        return `**👤 About Jomari:**\n\n**Full Name:** ${this.profile.fullName}\n**Professional Tagline:** ${this.profile.tagline}\n\n**Career Focus:** IT professional with expertise in UI/UX design, front-end development, and technical support.\n\n**Key Strengths:**\n• Technical problem-solving\n• Creative design thinking\n• Customer service excellence\n• Fast learning and adaptability\n\n**Future Goals:**\n${this.profile.futureGoals.map(g => `• ${g}`).join('\n')}`;
    }

    formatAvailability() {
        return `**📅 Availability:**\n\n✅ **Status:** ${this.profile.rates.availability}\n💰 **Rate:** ${this.profile.rates.hourly}\n📋 **Project-Based:** ${this.profile.rates.projectBased}\n\n*Open to freelance projects, full-time positions, and collaborative opportunities.*`;
    }

    formatRates() {
        return `**💰 Service Rates:**\n\n**Hourly Rate:** ${this.profile.rates.hourly}\n**Project-Based:** ${this.profile.rates.projectBased}\n\n**Factors Considered:**\n• Project complexity\n• Timeline requirements\n• Specific deliverables\n• Additional services needed\n\n*Flexible pricing based on project scope and requirements.*`;
    }

    formatHelp() {
        return `**🆘 How I Can Help:**\n\nI can provide detailed information about:\n\n📞 **Contact Information** - Phone, email, address\n🎯 **Skills & Expertise** - Technical and professional skills\n💼 **Experience** - Work history and responsibilities\n🎓 **Education** - Academic background\n📁 **Portfolio** - Career objectives and projects\n👤 **About** - Professional profile and goals\n📅 **Availability** - Current work status\n💰 **Rates** - Service pricing\n\n*Ask me anything specific about Jomari's professional background!*`;
    }

    formatThanks(sentiment) {
        const responses = {
            positive: "You're very welcome! 😊 I'm glad I could help you learn about Jomari's professional qualifications!",
            neutral: "You're welcome! 👋 Happy to assist with your inquiries!",
            negative: "You're welcome. I hope the information was helpful for your needs."
        };
        return responses[sentiment] || responses.neutral;
    }

    handleGeneralQuery(query) {
        return `**I understand you're asking about:** "${query}"\n\nI can help you explore Jomari's complete professional profile. Here are some topics you might be interested in:\n\n📞 **Contact Information** - How to reach Jomari\n🎯 **Skills** - Technical and professional expertise\n💼 **Experience** - Work history and achievements\n🎓 **Education** - Academic background\n📁 **Portfolio** - Career objectives and projects\n👤 **About** - Professional profile\n📅 **Availability** - Current work status\n\n*Feel free to ask more specific questions!*`;
    }
}

const intelligentAI = new CompleteProfileAIAssistant(JOM_PROFILE_DATA);

// ENHANCED FUNCTIONS
function appendMessage(role, text, tempElement = null) {
    const isUser = role === 'user';
    
    if (role === 'typing') {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('bot-msg-container', 'flex', 'flex-col');
        
        const metaDiv = document.createElement('div');
        metaDiv.classList.add('bot-meta');
        metaDiv.innerHTML = `<span>JOM</span> Assistant`;
        typingDiv.appendChild(metaDiv);
        
        const bubble = document.createElement('p');
        bubble.classList.add('typing-indicator');
        bubble.innerHTML = 'Thinking<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        typingDiv.appendChild(bubble);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }
    
    const msgDiv = document.createElement('div');
    msgDiv.classList.add(isUser ? 'user-message-container' : 'bot-msg-container', 'flex', 'flex-col');
    
    if (isUser) {
        const content = document.createElement('div');
        content.classList.add('user-content');
        content.innerHTML = text;
        msgDiv.appendChild(content);
    } else {
        const metaDiv = document.createElement('div');
        metaDiv.classList.add('bot-meta');
        metaDiv.innerHTML = `<span>JOM</span> Assistant`;

        // Create volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = 0;
        volumeSlider.max = 1;
        volumeSlider.step = 0.1;
        volumeSlider.value = currentVolume;
        volumeSlider.classList.add('volume-slider');
        volumeSlider.title = "Adjust Volume";

        const speakerIcon = document.createElement('i');
        speakerIcon.classList.add('fas', 'fa-volume-mute', 'speaker-icon');
        speakerIcon.title = "Text-to-Speech";
        speakerIcon.style.cursor = 'pointer';
        speakerIcon.style.marginLeft = '12px';
        speakerIcon.style.transition = 'all 0.4s ease';
        speakerIcon.style.fontSize = '14px';
        
        metaDiv.appendChild(speakerIcon);
        metaDiv.appendChild(volumeSlider);
        msgDiv.appendChild(metaDiv);
        
        const content = document.createElement('div');
        content.classList.add('bot-content');
        content.innerHTML = text;
        msgDiv.appendChild(content);
        
        speakerIcon.addEventListener('click', () => {
            const contentText = msgDiv.querySelector('.bot-content').textContent;
            if (isSpeaking) {
                stopSpeaking();
                volumeSlider.classList.remove('show');
                speakerIcon.classList.remove('fa-volume-up');
                speakerIcon.classList.add('fa-volume-mute');
            } else {
                volumeSlider.classList.add('show');
                speakerIcon.classList.remove('fa-volume-mute');
                speakerIcon.classList.add('fa-volume-up');
                speak(contentText, volumeSlider.value);
            }
        });

        volumeSlider.addEventListener('input', (e) => {
            currentVolume = parseFloat(e.target.value);
            if (isSpeaking) {
                stopSpeaking();
                const contentText = msgDiv.querySelector('.bot-content').textContent;
                speak(contentText, currentVolume);
            }
        });
    }
    
    if (tempElement) {
        chatMessages.replaceChild(msgDiv, tempElement);
    } else {
        chatMessages.appendChild(msgDiv);
    }
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
}

function handleInitialWelcome() {
    const welcomeMsg = `👋 Welcome to JOM Professional Assistant!\n\nI'm your guide to ${JOM_PROFILE_DATA.fullName}'s complete professional profile.\n\n**Quick Access:**\n📞 Contact - Phone, email, address\n🎯 Skills - Technical & professional expertise\n💼 Experience - Work history & achievements\n🎓 Education - Academic background\n📁 Portfolio - Career objectives & projects\n👤 About - Professional profile\n📅 Availability - Current work status\n💰 Rates - Service pricing\n\nAsk anything - I'll provide detailed information!`;
    appendMessage('bot', welcomeMsg);
}

function handleResponseFormatting(text) {
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '• $1')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/📞/g, '<i class="fas fa-phone" style="color:var(--primary-color);"></i>')
        .replace(/📧/g, '<i class="fas fa-envelope" style="color:var(--secondary-color);"></i>')
        .replace(/📍/g, '<i class="fas fa-map-marker-alt" style="color:var(--accent-color);"></i>')
        .replace(/🗣️/g, '<i class="fas fa-comments" style="color:var(--primary-color);"></i>')
        .replace(/🎯/g, '<i class="fas fa-bullseye" style="color:var(--secondary-color);"></i>')
        .replace(/🎨/g, '<i class="fas fa-palette" style="color:var(--accent-color);"></i>')
        .replace(/💻/g, '<i class="fas fa-laptop-code" style="color:var(--primary-color);"></i>')
        .replace(/💼/g, '<i class="fas fa-briefcase" style="color:var(--secondary-color);"></i>')
        .replace(/🏢/g, '<i class="fas fa-building" style="color:var(--accent-color);"></i>')
        .replace(/📅/g, '<i class="fas fa-calendar-alt" style="color:var(--primary-color);"></i>')
        .replace(/🎓/g, '<i class="fas fa-graduation-cap" style="color:var(--secondary-color);"></i>')
        .replace(/📁/g, '<i class="fas fa-folder-open" style="color:var(--accent-color);"></i>')
        .replace(/👤/g, '<i class="fas fa-user" style="color:var(--primary-color);"></i>')
        .replace(/📅/g, '<i class="fas fa-calendar-check" style="color:var(--secondary-color);"></i>')
        .replace(/💰/g, '<i class="fas fa-money-bill-wave" style="color:var(--accent-color);"></i>')
        .replace(/🆘/g, '<i class="fas fa-life-ring" style="color:var(--primary-color);"></i>')
        .replace(/✅/g, '<i class="fas fa-check-circle" style="color:var(--secondary-color);"></i>')
        .replace(/👋/g, '<i class="fas fa-hand-wave" style="color:var(--accent-color);"></i>')
        .replace(/🎯/g, '<i class="fas fa-target" style="color:var(--primary-color);"></i>')
        .replace(/✨/g, '<i class="fas fa-star" style="color:var(--secondary-color);"></i>')
        .replace(/🌟/g, '<i class="fas fa-star" style="color:var(--accent-color);"></i>')
        .replace(/🚀/g, '<i class="fas fa-rocket" style="color:var(--primary-color);"></i>')
        .replace(/🤝/g, '<i class="fas fa-handshake" style="color:var(--secondary-color);"></i>')
        .replace(/💡/g, '<i class="fas fa-lightbulb" style="color:var(--accent-color);"></i>');
    return html;
}

// ENHANCED SUGGESTIONS WITH MODERN ICONS
function updateSuggestionGrid() {
    const width = window.innerWidth;
    
    // Clear existing suggestions
    suggestionGrid.innerHTML = '';
    
    // Define suggestions with icons
    const suggestions = [
        { text: "Contact Information", icon: "fa-phone", category: "contact" },
        { text: "Skills & Expertise", icon: "fa-code", category: "skills" },
        { text: "Work Experience", icon: "fa-briefcase", category: "experience" },
        { text: "Education Background", icon: "fa-graduation-cap", category: "education" },
        { text: "Portfolio & Projects", icon: "fa-folder-open", category: "portfolio" },
        { text: "About Jomari", icon: "fa-user", category: "about" },
        { text: "Availability", icon: "fa-calendar-check", category: "availability" },
        { text: "Service Rates", icon: "fa-money-bill-wave", category: "rates" },
        { text: "Technical Skills", icon: "fa-laptop-code", category: "technical" },
        { text: "Design Skills", icon: "fa-palette", category: "design" },
        { text: "Career Objective", icon: "fa-bullseye", category: "objective" },
        { text: "How can I help?", icon: "fa-question-circle", category: "help" }
    ];
    
    // Apply responsive grid layout
    if (width <= 480) {
        suggestionGrid.style.gridTemplateColumns = '1fr';
        suggestionGrid.style.gap = '8px';
    } else if (width <= 768) {
        suggestionGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        suggestionGrid.style.gap = '10px';
    } else {
        suggestionGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))';
        suggestionGrid.style.gap = '10px';
    }
    
    // Create suggestion items
    suggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item dynamic-font-small';
        suggestionItem.dataset.category = suggestion.category;
        
        const iconSpan = document.createElement('i');
        iconSpan.className = `fas ${suggestion.icon}`;
        
        const textSpan = document.createElement('span');
        textSpan.textContent = suggestion.text;
        
        suggestionItem.appendChild(iconSpan);
        suggestionItem.appendChild(textSpan);
        
        suggestionItem.addEventListener('click', () => {
            chatInput.value = suggestion.text;
            chatInput.style.height = '52px';
            chatInput.style.height = (chatInput.scrollHeight) + 'px';
            sendBtn.disabled = false;
            hideSuggestions();
            chatInput.focus();
            
            // Add animation
            suggestionItem.style.transform = 'scale(0.95)';
            setTimeout(() => {
                suggestionItem.style.transform = '';
            }, 150);
            
            // Create star particles
            createStarParticles(suggestionItem);
        });
        
        suggestionGrid.appendChild(suggestionItem);
    });
}

// Function to create star particles
function createStarParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.classList.add('star-particle');
        star.innerHTML = '✦';
        star.style.left = `${centerX}px`;
        star.style.top = `${centerY}px`;
        star.style.position = 'fixed';
        
        // Random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        star.style.setProperty('--tx', `${tx}px`);
        star.style.setProperty('--ty', `${ty}px`);
        
        document.body.appendChild(star);
        
        // Remove after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 1500);
    }
}

function showSuggestions() {
    updateSuggestionGrid();
    suggestionModal.style.display = 'block';
    suggestionBtn.style.transform = 'scale(1.2) rotate(-15deg)';
    
    // Create star particles
    createStarParticles(suggestionBtn);
    
    // Adjust modal position for mobile
    const width = window.innerWidth;
    if (width <= 480) {
        suggestionModal.style.top = '70px';
        suggestionModal.style.left = '15px';
        suggestionModal.style.right = '15px';
        suggestionModal.style.maxHeight = '240px';
    } else if (width <= 768) {
        suggestionModal.style.top = '70px';
        suggestionModal.style.left = '18px';
        suggestionModal.style.right = '18px';
        suggestionModal.style.maxHeight = '280px';
    } else {
        suggestionModal.style.top = '75px';
        suggestionModal.style.left = '25px';
        suggestionModal.style.right = '25px';
        suggestionModal.style.maxHeight = '350px';
    }
}

function hideSuggestions() {
    suggestionModal.style.display = 'none';
    suggestionBtn.style.transform = '';
}

// Chatbot Button Hover Effects
chatBtn.addEventListener('mouseenter', () => {
    if (!isChatOpen) {
        chatIcon.classList.replace('fa-robot', 'fa-comment-dots');
    }
});

chatBtn.addEventListener('mouseleave', () => {
    if (!isChatOpen) {
        chatIcon.classList.replace('fa-comment-dots', 'fa-robot');
    }
});

// Open chatbox - Now toggles close if already open
function openChatbox() {
    if (isChatOpen) {
        closeChatbox();
        return;
    }
    
    isChatOpen = true;
    chatbox.style.display = 'flex';
    chatIcon.classList.replace('fa-robot', 'fa-comment-dots');
    chatIcon.style.transform = 'scale(1.2)';
    chatInput.focus();
    sendBtn.disabled = chatInput.value.trim() === '';
    stopPulseAnimation();
    chatBtn.classList.add('ai-animation');

    // Show welcome message briefly
    chatboxWelcome.style.display = 'flex';
    setTimeout(() => {
        chatboxWelcome.style.display = 'none';
    }, 2500);
    
    // Trigger instant greeting
    if (isFirstOpen) { 
        handleInitialWelcome(); 
        isFirstOpen = false; 
    }
}

// Close chatbox
function closeChatbox() {
    if (!isChatOpen) return;
    isChatOpen = false;
    stopSpeaking();
    hideSuggestions();

    // Animate closing
    chatbox.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1)';
    chatbox.style.transform = 'scale(0) translateY(50px)';
    setTimeout(() => {
        chatbox.style.display = 'none';
        chatbox.style.transform = 'scale(1) translateY(0)';
        chatIcon.classList.replace('fa-comment-dots', 'fa-robot');
        chatIcon.style.transform = 'scale(1)';
        sendBtn.disabled = true;
        chatBtn.classList.remove('ai-animation');
    }, 700);
    setTimeout(() => {
        if (!isChatOpen) {
            startPulseAnimation();
        }
    }, 1000);
}

// Toggle theme
function toggleChatTheme() {
    isDarkTheme = !isDarkTheme;
    chatbox.classList.toggle('sun-theme');
    
    // Toggle icon
    const icon = document.querySelector('.theme-switch-icon i');
    if (isDarkTheme) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Update suggestion modal for theme
    updateSuggestionGrid();
}

// Show/hide suggestions
function toggleSuggestions() {
    if (suggestionModal.style.display === 'block') {
        hideSuggestions();
    } else {
        showSuggestions();
    }
}

// Event Listeners
document.getElementById('chat-btn').addEventListener('click', openChatbox);
document.getElementById('chat-close').addEventListener('click', closeChatbox);
document.getElementById('theme-toggle').addEventListener('click', toggleChatTheme);
document.getElementById('suggestion-btn').addEventListener('click', toggleSuggestions);
document.getElementById('close-suggestions').addEventListener('click', hideSuggestions);

// Add star particles when hovering suggestion button
suggestionBtn.addEventListener('mouseenter', () => {
    createStarParticles(suggestionBtn);
});

// Click outside to close
document.addEventListener('click', (e) => {
    if (isChatOpen && 
        !chatbox.contains(e.target) && 
        !chatBtn.contains(e.target) &&
        !suggestionModal.contains(e.target)) {
        closeChatbox();
    }
});

// Send message
async function sendMessage() {
    if (isSending) return;
    const userText = chatInput.value.trim();
    if (!userText) return;
    isSending = true;
    chatInput.value = '';
    chatInput.style.height = '52px';
    sendBtn.disabled = true;
    stopSpeaking();
    hideSuggestions();

    // Paper plane animation
    sendBtn.classList.add('sending');
    setTimeout(() => {
        sendBtn.classList.remove('sending');
    }, 1200);

    // Show immediate user message
    appendMessage('user', userText);
    // Show "thinking" indicator
    const loading = appendMessage('typing', '');

    // Get response
    const responseText = intelligentAI.analyzeQuery(userText);
    const formattedResponse = handleResponseFormatting(responseText);
    
    // Delay for thinking effect
    const delayTime = 800 + Math.random() * 400;
    
    // Replace typing indicator with actual response
    setTimeout(() => {
        appendMessage('bot', formattedResponse, loading);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        isSending = false;
        chatInput.focus();
    }, delayTime);
}

// Event for pressing Enter
document.getElementById('send-btn').addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Auto-resize textarea
chatInput.addEventListener('input', () => {
    chatInput.style.height = '52px';
    chatInput.style.height = (chatInput.scrollHeight) + 'px';
    sendBtn.disabled = chatInput.value.trim() === '';
});

// Speech synthesis
function speak(text, volume = 1) {
    if (!synth || synth.speaking) return;
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text.replace(/<[^>]*>/g, ''));
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = volume;
    utterance.onstart = () => { 
        isSpeaking = true; 
        document.querySelectorAll('.speaker-icon').forEach(icon => {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        });
    };
    utterance.onend = () => { 
        isSpeaking = false; 
        document.querySelectorAll('.speaker-icon').forEach(icon => {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        });
        document.querySelectorAll('.volume-slider').forEach(slider => {
            slider.classList.remove('show');
        });
    };
    synth.speak(utterance);
}

function stopSpeaking() {
    if (synth && synth.speaking) synth.cancel();
    isSpeaking = false;
    document.querySelectorAll('.speaker-icon').forEach(icon => {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    });
    document.querySelectorAll('.volume-slider').forEach(slider => {
        slider.classList.remove('show');
    });
}

// Pulse animation
function startPulseAnimation() {
    chatBtn.classList.add('pulse');
}

function stopPulseAnimation() {
    chatBtn.classList.remove('pulse');
}

// Clear chat function
function clearChat() {
    chatMessages.innerHTML = '';
    handleInitialWelcome();
}

// Initialize on load
window.onload = () => {
    handleInitialWelcome();
    startPulseAnimation();
    updateSuggestionGrid();
    createFloatingParticles();
};