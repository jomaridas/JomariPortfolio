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

        let isFirstOpen = true;
        let isSpeaking = false;
        let synth = window.speechSynthesis;
        let isSending = false;
        let conversationHistory = [];
        let isChatOpen = false;
        let conversationContext = [];
        let isDarkTheme = true;
        let currentVolume = 1;

        // Enhanced Jomari Profile Data with rates and keywords
        const JOM_PROFILE_DATA = {
            name: "Jomari",
            fullName: "Jomari Santos",
            tagline: "Creative Problem Solver & Design Enthusiast",
            email: "jomari.portfolio@example.com",
            phone: "+63 912 345 6789",
            location: "Manila, Philippines",
            availability: "Available for freelance projects",
            hourlyRate: "$25-50/hour",
            responseTime: "Usually within 24 hours",
            languages: ["English (Fluent)", "Tagalog (Native)"],
            hobbies: ["Watching movies", "Video/Photo Editing", "Digital Art", "Traveling", "Gaming", "UI/UX Design", "Reading tech blogs"],
            
            // RATES KEYWORD SYSTEM
            rates: {
                hourly: {
                    standard: "$25-50/hour",
                    beginner: "$25-35/hour (entry level)",
                    intermediate: "$35-45/hour (2-3 years exp)",
                    expert: "$45-50/hour (5+ years exp)"
                },
                projectBased: {
                    website: "$500-2000 (depending on complexity)",
                    logo: "$150-500",
                    branding: "$800-3000 (full package)",
                    uiux: "$1000-5000 (app design)"
                },
                packages: {
                    basic: "$500-1000 (single deliverable)",
                    standard: "$1000-2500 (multiple deliverables)",
                    premium: "$2500-5000 (complete solution)"
                },
                factors: ["Project complexity", "Timeline", "Revisions needed", "Additional services"],
                payment: ["50% upfront, 50% on delivery", "Milestone payments", "Monthly retainers available"]
            },
            
            skills: {
                creative: [
                    "Graphic Design", "Layout Design", "Typography", "Freehand Drawing", 
                    "Sketching", "Digital Illustration", "Logo Design", "Brand Identity"
                ],
                technical: [
                    "HTML/CSS", "Adobe Creative Suite", "Figma", "Video Editing", 
                    "Photo Manipulation", "Responsive Design", "Wireframing", "Prototyping"
                ],
                soft: [
                    "Communication", "Creativity", "Time Management", "Problem Solving", 
                    "Adaptability", "Teamwork", "Attention to Detail", "Client Relations",
                    "Project Management", "Critical Thinking"
                ],
                development: [
                    "Mobile App Design", "Web Design Basics", "UI/UX Principles", 
                    "Prototyping", "Wireframing", "User Research", "Usability Testing"
                ]
            },
            
            experience: [
                { 
                    years: "2023 - Present", 
                    role: "Creative Designer", 
                    company: "Freelance", 
                    description: "Designing engaging advertisements and digital content for various clients across multiple industries.",
                    achievements: [
                        "Increased client engagement by 40% through targeted design strategies",
                        "Reduced design turnaround time by 30% with optimized workflows",
                        "Maintained 95% client satisfaction rate"
                    ],
                    skills: ["Adobe Creative Suite", "Figma", "Brand Strategy", "Client Communication"]
                },
                { 
                    years: "2022", 
                    role: "Sales & Technical Support", 
                    company: "Tech Solutions Inc.", 
                    description: "Customer service, sales, and technical troubleshooting for software products.",
                    achievements: [
                        "Achieved 95% customer satisfaction rating",
                        "Top performer in Q3 2022",
                        "Reduced customer complaints by 35%"
                    ],
                    skills: ["Customer Service", "Technical Support", "Sales", "Problem Solving"]
                },
                { 
                    years: "2021", 
                    role: "Inventory Specialist", 
                    company: "Retail Plus", 
                    description: "Managed stock and optimized warehouse operations.",
                    achievements: [
                        "Reduced inventory errors by 25% through improved tracking systems",
                        "Streamlined warehouse processes reducing processing time by 20%"
                    ],
                    skills: ["Inventory Management", "Logistics", "Data Analysis", "Process Optimization"]
                }
            ],
            
            education: [
                { 
                    degree: "Bachelor's Degree in Multimedia Arts", 
                    school: "University of Creative Arts", 
                    year: "2020",
                    highlights: ["Graduated with honors", "Specialized in Digital Design", "Capstone project award winner"]
                },
                { 
                    degree: "UI/UX Design Certification", 
                    school: "Online Platform", 
                    year: "2022",
                    highlights: ["Completed advanced user research module", "Built 3 complete app prototypes"]
                },
                { 
                    degree: "Adobe Creative Suite Mastery", 
                    school: "Digital Arts Institute", 
                    year: "2021",
                    highlights: ["Photoshop expert certification", "Illustrator advanced techniques"]
                }
            ],
            
            tools: [
                { name: "Adobe Photoshop", proficiency: "Expert", years: 4 },
                { name: "Adobe Illustrator", proficiency: "Advanced", years: 3 },
                { name: "Figma", proficiency: "Advanced", years: 2 },
                { name: "Adobe Premiere Pro", proficiency: "Intermediate", years: 2 },
                { name: "VS Code", proficiency: "Intermediate", years: 1 },
                { name: "Procreate", proficiency: "Advanced", years: 2 }
            ],
            
            projects: [
                { 
                    name: "Portfolio Website Design", 
                    description: "Fully responsive portfolio website with custom animations and optimized performance",
                    category: "Web Design",
                    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
                    features: ["Mobile-first design", "Smooth animations", "SEO optimized"]
                },
                { 
                    name: "Mobile App UI/UX", 
                    description: "Complete mobile application design with user testing and iterative improvements",
                    category: "UI/UX",
                    technologies: ["Figma", "Adobe XD", "User Testing"],
                    features: ["User-centered design", "Prototyping", "Usability testing"]
                },
                { 
                    name: "Brand Identity Packages", 
                    description: "Complete branding including logo, colors, typography, and brand guidelines",
                    category: "Branding",
                    technologies: ["Adobe Illustrator", "InDesign", "Photoshop"],
                    features: ["Logo design", "Brand guidelines", "Marketing materials"]
                },
                { 
                    name: "Social Media Campaigns", 
                    description: "Multi-platform social media content and strategy for brand awareness",
                    category: "Marketing",
                    technologies: ["Canva", "Adobe Creative Suite", "Analytics"],
                    features: ["Content strategy", "Visual design", "Performance tracking"]
                }
            ],
            
            achievements: [
                "Best Design Award - Creative Showcase 2022",
                "Client Satisfaction Award - 2023",
                "Rapid Learner Award - Tech Institute",
                "Top Performer Q3 2022 - Tech Solutions Inc."
            ],
            
            personalityTraits: ["Detail-oriented", "Creative", "Adaptable", "Collaborative", "Proactive", "Reliable", "Analytical", "Innovative"],
            
            workStyle: "Combines analytical thinking with creative problem-solving to deliver innovative solutions. Focuses on user-centered design principles and data-driven decisions.",
            
            futureGoals: [
                "Lead design teams in tech companies",
                "Create impactful digital experiences for millions of users",
                "Mentor aspiring designers",
                "Contribute to open-source design systems"
            ],
            
            workPhilosophy: "Good design is not just about aesthetics - it's about solving problems, enhancing experiences, and creating value for users and businesses alike.",
            
            collaborationStyle: "Prefers collaborative environments with regular feedback loops. Open to both remote and in-person work arrangements.",
            
            pricing: {
                hourly: "$25-50/hour",
                projectBased: "Custom quotes based on scope",
                retainer: "Available for ongoing projects",
                packages: ["Basic", "Standard", "Premium"]
            }
        };

        // ENHANCED AI ASSISTANT WITH INSTANT RESPONSES AND RATES KEYWORD SYSTEM
        class InstantResponseAIAssistant {
            constructor(profileData) {
                this.profile = profileData;
                this.responseCache = new Map();
                this.conversationContext = [];
                this.userPreferences = {};
                this.lastInteractionTime = Date.now();
                this.sessionTopics = new Set();
                
                // Pre-cache common responses for instant access
                this.preCacheResponses();
            }

            preCacheResponses() {
                // Cache common greetings
                this.cacheResponse("hello", this.formatGreeting("neutral"));
                this.cacheResponse("hi", this.formatGreeting("neutral"));
                this.cacheResponse("hey", this.formatGreeting("neutral"));
                this.cacheResponse("good morning", this.formatGreeting("neutral"));
                this.cacheResponse("good afternoon", this.formatGreeting("neutral"));
                this.cacheResponse("good evening", this.formatGreeting("neutral"));
                
                // Cache rates and pricing responses
                this.cacheResponse("rates", this.formatRatesDetailed());
                this.cacheResponse("pricing", this.formatRatesDetailed());
                this.cacheResponse("how much", this.formatRatesDetailed());
                this.cacheResponse("cost", this.formatRatesDetailed());
                this.cacheResponse("price", this.formatRatesDetailed());
                this.cacheResponse("fee", this.formatRatesDetailed());
                this.cacheResponse("hourly rate", this.formatRatesDetailed());
                this.cacheResponse("budget", this.formatRatesDetailed());
                this.cacheResponse("payment", this.formatRatesDetailed());
                
                // Cache common questions
                this.cacheResponse("what are your skills", this.formatComprehensiveSkills(""));
                this.cacheResponse("tell me about skills", this.formatComprehensiveSkills(""));
                this.cacheResponse("what can you do", this.formatComprehensiveSkills(""));
                
                this.cacheResponse("what is your experience", this.formatDetailedExperience("", {}));
                this.cacheResponse("tell me about experience", this.formatDetailedExperience("", {}));
                this.cacheResponse("work history", this.formatDetailedExperience("", {}));
                
                this.cacheResponse("how to contact", this.formatCompleteContactInfo('low'));
                this.cacheResponse("contact information", this.formatCompleteContactInfo('low'));
                this.cacheResponse("email phone", this.formatCompleteContactInfo('low'));
                
                this.cacheResponse("what tools do you use", this.formatToolsProficiency());
                this.cacheResponse("software skills", this.formatToolsProficiency());
                this.cacheResponse("adobe figma", this.formatToolsProficiency());
                
                this.cacheResponse("what are your hobbies", this.formatPersonalHobbies());
                this.cacheResponse("interests", this.formatPersonalHobbies());
                this.cacheResponse("free time", this.formatPersonalHobbies());
                
                this.cacheResponse("show projects", this.formatProjectShowcase());
                this.cacheResponse("portfolio examples", this.formatProjectShowcase());
                this.cacheResponse("case studies", this.formatProjectShowcase());
                
                this.cacheResponse("education background", this.formatEducationDetails());
                this.cacheResponse("school degree", this.formatEducationDetails());
                this.cacheResponse("certifications", this.formatEducationDetails());
                
                this.cacheResponse("are you available", this.formatAvailabilityDetails('low'));
                this.cacheResponse("freelance availability", this.formatAvailabilityDetails('low'));
                this.cacheResponse("hire you", this.formatAvailabilityDetails('low'));
                
                this.cacheResponse("achievements", this.formatAchievementsList());
                this.cacheResponse("awards", this.formatAchievementsList());
                this.cacheResponse("recognition", this.formatAchievementsList());
                
                this.cacheResponse("work style", this.formatWorkStylePhilosophy());
                this.cacheResponse("work process", this.formatWorkProcess());
                this.cacheResponse("methodology", this.formatWorkProcess());
                
                this.cacheResponse("future goals", this.formatFutureGoalsVision());
                this.cacheResponse("career aspirations", this.formatFutureGoalsVision());
                this.cacheResponse("what next", this.formatFutureGoalsVision());
                
                this.cacheResponse("help", this.formatHelpGuide());
                this.cacheResponse("what can you help with", this.formatHelpGuide());
                this.cacheResponse("assist me", this.formatHelpGuide());
                
                this.cacheResponse("thanks", this.formatGratitudeResponse("positive"));
                this.cacheResponse("thank you", this.formatGratitudeResponse("positive"));
                this.cacheResponse("appreciate", this.formatGratitudeResponse("positive"));
                
                this.cacheResponse("who are you", this.formatCompleteAbout());
                this.cacheResponse("about you", this.formatCompleteAbout());
                this.cacheResponse("introduce yourself", this.formatCompleteAbout());
                
                this.cacheResponse("collaboration style", this.formatCollaborationStyle());
                this.cacheResponse("work together", this.formatCollaborationStyle());
                this.cacheResponse("teamwork", this.formatCollaborationStyle());
            }

            cacheResponse(query, response) {
                const key = query.toLowerCase().trim();
                this.responseCache.set(key, response);
            }

            analyzeQuery(query) {
                const q = query.toLowerCase().trim();
                
                // Update conversation context
                this.updateContext(q);
                
                // Check cache first (including partial matches)
                const cachedResponse = this.getCachedResponse(q);
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Quick intent detection for instant response
                const intent = this.quickDetectIntent(q);
                const sentiment = this.quickAnalyzeSentiment(q);
                
                // Generate response based on intent
                let response = this.generateQuickResponse(q, intent, sentiment);
                
                // Cache the response for future use
                this.cacheResponse(q, response);
                
                return response;
            }

            getCachedResponse(query) {
                const exactMatch = this.responseCache.get(query);
                if (exactMatch) return exactMatch;
                
                // Check for partial matches
                const words = query.split(' ');
                for (const [cachedQuery, response] of this.responseCache.entries()) {
                    // Check if any word in query matches cached query
                    for (const word of words) {
                        if (word.length > 3 && cachedQuery.includes(word)) {
                            return response;
                        }
                    }
                    
                    // Check if cached query contains any of our words
                    for (const cachedWord of cachedQuery.split(' ')) {
                        if (cachedWord.length > 3 && query.includes(cachedWord)) {
                            return response;
                        }
                    }
                }
                
                return null;
            }

            quickDetectIntent(query) {
                // Simple keyword matching for instant detection
                const intents = [
                    { pattern: /(hello|hi|hey|greetings|good morning|good afternoon|good evening)/i, intent: 'greeting' },
                    { pattern: /(rate|price|cost|fee|hourly|budget|payment|how much|charge|pricing)/i, intent: 'rates' },
                    { pattern: /(skill|expertise|good at|capable|proficient|knowledge|ability|talented)/i, intent: 'skills' },
                    { pattern: /(experience|job|work|career|background|professional|employment)/i, intent: 'experience' },
                    { pattern: /(contact|email|phone|hire|reach|connect|message|call)/i, intent: 'contact' },
                    { pattern: /(hobby|interest|free time|passion|enjoy|like|leisure)/i, intent: 'hobbies' },
                    { pattern: /(project|portfolio|work sample|case study|showcase|examples)/i, intent: 'projects' },
                    { pattern: /(tool|software|program|adobe|figma|app|platform)/i, intent: 'tools' },
                    { pattern: /(about|who is|introduce|tell me|describe)/i, intent: 'about' },
                    { pattern: /(education|degree|study|school|college|university|certification)/i, intent: 'education' },
                    { pattern: /(availability|available|freelance|hire|contract|project)/i, intent: 'availability' },
                    { pattern: /(achievement|award|recognition|accomplishment|success)/i, intent: 'achievements' },
                    { pattern: /(style|approach|method|process|workflow|philosophy)/i, intent: 'style' },
                    { pattern: /(goal|future|aspiration|plan|objective|ambition)/i, intent: 'goals' },
                    { pattern: /(help|support|assist|guide|how to|what can)/i, intent: 'help' },
                    { pattern: /(thanks|thank you|appreciate|grateful|thankful)/i, intent: 'thanks' },
                    { pattern: /(portfolio|website|showcase|gallery|work)/i, intent: 'portfolio' },
                    { pattern: /(service|offer|provide|do|make|create|design)/i, intent: 'services' },
                    { pattern: /(process|how you work|work process|steps|procedure)/i, intent: 'process' },
                    { pattern: /(collaborate|work together|team up|partner|join forces)/i, intent: 'collaboration' }
                ];

                for (const { pattern, intent } of intents) {
                    if (pattern.test(query)) {
                        this.sessionTopics.add(intent);
                        return intent;
                    }
                }
                return 'general';
            }

            quickAnalyzeSentiment(query) {
                const positive = /\b(great|awesome|amazing|wonderful|excellent|perfect|love|like|good|nice|impressive)\b/i;
                const negative = /\b(bad|poor|terrible|awful|hate|dislike|problem|issue|concern)\b/i;
                
                if (positive.test(query)) return 'positive';
                if (negative.test(query)) return 'negative';
                return 'neutral';
            }

            generateQuickResponse(query, intent, sentiment) {
                // Generate response based on detected intent
                switch(intent) {
                    case 'greeting': return this.formatGreeting(sentiment);
                    case 'rates': return this.formatRatesDetailed();
                    case 'skills': return this.formatComprehensiveSkills(query);
                    case 'experience': return this.formatDetailedExperience(query, {});
                    case 'contact': return this.formatCompleteContactInfo('low');
                    case 'hobbies': return this.formatPersonalHobbies();
                    case 'projects': return this.formatProjectShowcase();
                    case 'tools': return this.formatToolsProficiency();
                    case 'about': return this.formatCompleteAbout();
                    case 'education': return this.formatEducationDetails();
                    case 'availability': return this.formatAvailabilityDetails('low');
                    case 'achievements': return this.formatAchievementsList();
                    case 'style': return this.formatWorkStylePhilosophy();
                    case 'goals': return this.formatFutureGoalsVision();
                    case 'help': return this.formatHelpGuide();
                    case 'thanks': return this.formatGratitudeResponse(sentiment);
                    case 'portfolio': return this.formatPortfolioOverview();
                    case 'services': return this.formatServicesOffered();
                    case 'process': return this.formatWorkProcess();
                    case 'collaboration': return this.formatCollaborationStyle();
                    default: return this.handleGeneralQuery(query);
                }
            }

            updateContext(query) {
                this.conversationContext.push({
                    query,
                    timestamp: Date.now()
                });
                
                // Keep only last 5 interactions
                if (this.conversationContext.length > 5) {
                    this.conversationContext.shift();
                }
                
                this.lastInteractionTime = Date.now();
            }

            // Response formatters (optimized for speed)
            formatGreeting(sentiment) {
                const timeGreeting = this.getTimeBasedGreeting();
                const greetings = {
                    positive: ["Hello! 😊 Great to connect!", "Hi there! 👋 Your positive energy is contagious!"],
                    neutral: ["Hello! 👋 How can I help you learn about Jomari today?", "Hi! Ready to explore Jomari's professional journey?"],
                    negative: ["Hello there. 👋 I'm here to help clarify any questions.", "Hi. Let me assist you with information about Jomari."]
                };
                
                const randomGreeting = greetings[sentiment][Math.floor(Math.random() * greetings[sentiment].length)];
                return `${timeGreeting} ${randomGreeting}\n\nI can tell you about: skills, experience, projects, contact info, tools, education, rates, and more!`;
            }

            getTimeBasedGreeting() {
                const hour = new Date().getHours();
                if (hour < 12) return "Good morning!";
                if (hour < 18) return "Good afternoon!";
                return "Good evening!";
            }

            // ENHANCED RATES RESPONSE WITH KEYWORD SYSTEM
            formatRatesDetailed() {
                const rates = this.profile.rates;
                return `**💰 Detailed Pricing Information:**\n\n**Hourly Rates:**\n• ${rates.hourly.standard}\n• ${rates.hourly.beginner}\n• ${rates.hourly.intermediate}\n• ${rates.hourly.expert}\n\n**Project-Based Pricing:**\n• Website: ${rates.projectBased.website}\n• Logo Design: ${rates.projectBased.logo}\n• Branding Package: ${rates.projectBased.branding}\n• UI/UX Design: ${rates.projectBased.uiux}\n\n**Package Options:**\n• Basic: ${rates.packages.basic}\n• Standard: ${rates.packages.standard}\n• Premium: ${rates.packages.premium}\n\n**Factors Affecting Price:**\n${rates.factors.map(f => `• ${f}`).join('\n')}\n\n**Payment Options:**\n${rates.payment.map(p => `• ${p}`).join('\n')}\n\n*Note: All rates are negotiable based on project scope and timeline.*`;
            }

            formatComprehensiveSkills(query) {
                return `**🎨 Jomari's Skills:**\n\n**Creative Design:**\n${this.profile.skills.creative.map(s => `• ${s}`).join('\n')}\n\n**Technical Skills:**\n${this.profile.skills.technical.map(s => `• ${s}`).join('\n')}\n\n**Soft Skills:**\n${this.profile.skills.soft.slice(0, 8).map(s => `• ${s}`).join('\n')}\n\n*Combines technical precision with creative vision for innovative solutions.*`;
            }

            formatDetailedExperience(query, entities) {
                let expText = `**💼 Professional Experience:**\n\n`;
                
                this.profile.experience.forEach((exp, index) => {
                    expText += `**${index + 1}. ${exp.role}** at ${exp.company}\n`;
                    expText += `📅 ${exp.years}\n`;
                    expText += `${exp.description}\n\n`;
                });
                
                expText += `*Diverse background enhances problem-solving and innovation.*`;
                return expText;
            }

            formatCompleteContactInfo(urgency) {
                return `**📞 Contact Jomari:**\n\n📧 **Email:** ${this.profile.email}\n📱 **Phone:** ${this.profile.phone}\n📍 **Location:** ${this.profile.location}\n\n✅ **Availability:** ${this.profile.availability}\n💰 **Rate:** ${this.profile.hourlyRate}\n⏰ **Response:** ${this.profile.responseTime}\n\n*Open to new opportunities and collaborations!*`;
            }

            formatPersonalHobbies() {
                return `**🎯 Personal Interests:**\n\n${this.profile.hobbies.map(h => `• ${h}`).join('\n')}\n\n*These interests fuel creativity and provide inspiration for design work.*`;
            }

            formatProjectShowcase() {
                let projectsText = `**🚀 Notable Projects:**\n\n`;
                
                this.profile.projects.forEach((project, index) => {
                    projectsText += `**${index + 1}. ${project.name}**\n`;
                    projectsText += `📁 ${project.category}\n`;
                    projectsText += `${project.description}\n\n`;
                });
                
                projectsText += `*Each project demonstrates attention to detail and creative thinking.*`;
                return projectsText;
            }

            formatToolsProficiency() {
                return `**🛠️ Tools & Software:**\n\n${this.profile.tools.map(t => `• ${t.name} - ${t.proficiency}`).join('\n')}\n\n*Continuously learning new tools and technologies.*`;
            }

            formatCompleteAbout() {
                return `**👤 About Jomari:**\n\n${this.profile.fullName} - ${this.profile.tagline}\n\n**Personality:** ${this.profile.personalityTraits.slice(0, 6).join(', ')}\n\n**Work Style:** ${this.profile.workStyle}\n\n**Philosophy:** ${this.profile.workPhilosophy}`;
            }

            formatEducationDetails() {
                return `**🎓 Education:**\n\n${this.profile.education.map(e => `• ${e.degree} (${e.school}, ${e.year})`).join('\n')}\n\n*Continuous learning through courses and practical projects.*`;
            }

            formatAvailabilityDetails(urgency) {
                return `**📅 Availability:**\n\n✅ **Status:** ${this.profile.availability}\n💰 **Rate:** ${this.profile.hourlyRate}\n⏰ **Response:** ${this.profile.responseTime}\n\n*Currently accepting new projects. Early bookings recommended.*`;
            }

            formatPricingDetails() {
                return this.formatRatesDetailed();
            }

            formatAchievementsList() {
                return `**🏆 Achievements:**\n\n${this.profile.achievements.map(a => `• ${a}`).join('\n')}\n\n*Reflects dedication to excellence and continuous improvement.*`;
            }

            formatWorkStylePhilosophy() {
                return `**🎯 Work Style:**\n\n${this.profile.workStyle}\n\n**Process:**\n1. Discovery & Research\n2. Concept Development\n3. Design & Prototyping\n4. Feedback & Revision\n5. Final Delivery\n\n*User-centered design with focus on functionality and aesthetics.*`;
            }

            formatFutureGoalsVision() {
                return `**🚀 Future Goals:**\n\n${this.profile.futureGoals.map(g => `• ${g}`).join('\n')}\n\n*Committed to growth and meaningful contributions to the design field.*`;
            }

            formatHelpGuide() {
                return `**🆘 How I Can Help:**\n\nI can provide information about:\n• Skills & Expertise\n• Professional Experience\n• Project Portfolio\n• Contact Information\n• Tools & Software\n• Education Background\n• Pricing & Rates\n• Availability\n• Achievements\n• Work Style\n• Future Goals\n\n*Just ask about any topic!*`;
            }

            formatGratitudeResponse(sentiment) {
                const responses = {
                    positive: "You're very welcome! 😊 I'm delighted I could help!",
                    neutral: "You're welcome! 👋 Happy to assist!",
                    negative: "You're welcome. I hope the information was helpful."
                };
                return responses[sentiment] || responses.neutral;
            }

            formatPortfolioOverview() {
                return `**📁 Portfolio:**\n\nIncludes ${this.profile.projects.length} projects across:\n• Web Design\n• UI/UX Design\n• Branding\n• Marketing\n\n*Case studies available upon request.*`;
            }

            formatServicesOffered() {
                return `**💼 Services:**\n\n• Graphic Design\n• UI/UX Design\n• Brand Identity\n• Print Design\n• Digital Design\n• Video Editing\n\n*Custom packages based on project needs.*`;
            }

            formatWorkProcess() {
                return `**🔄 Work Process:**\n\n1. **Discovery:** Requirements gathering\n2. **Strategy:** Concept development\n3. **Design:** Visual creation\n4. **Testing:** Feedback & iteration\n5. **Delivery:** Final implementation\n\n*Structured approach for quality results.*`;
            }

            formatCollaborationStyle() {
                return `**🤝 Collaboration:**\n\n• Regular progress updates\n• Open communication\n• Flexible meetings\n• Professional documentation\n\n*Values clear communication and teamwork.*`;
            }

            handleGeneralQuery(query) {
                return `**I understand you're asking:** "${query}"\n\nI can help you explore Jomari's professional portfolio. Try asking about:\n\n🎨 **Skills** - Design and technical abilities\n💼 **Experience** - Professional background\n🚀 **Projects** - Case studies and results\n📞 **Contact** - How to connect\n🛠️ **Tools** - Software proficiency\n💰 **Rates** - Pricing information\n\n*Be more specific for detailed information!*`;
            }
        }

        const intelligentAI = new InstantResponseAIAssistant(JOM_PROFILE_DATA);

        // ENHANCED FUNCTIONS WITH DELAYED RESPONSES
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
                speakerIcon.style.marginLeft = '10px';
                speakerIcon.style.transition = 'all 0.3s ease';
                speakerIcon.style.fontSize = '12px';
                
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
            const welcomeMsg = `👋 Welcome to JOM Assistant!\n\nI'm your instant guide to ${JOM_PROFILE_DATA.fullName}'s professional portfolio.\n\nQuick Access:\n🎨 Skills - Design & technical abilities\n💼 Experience - Professional background\n🚀 Projects - Case studies & results\n📞 Contact - Connect with Jomari\n🛠️ Tools - Software proficiency\n💰 Rates - Detailed pricing information\n📅 Availability - Current status\n\nAsk anything - I respond instantly!`;
            appendMessage('bot', welcomeMsg);
        }

        function handleResponseFormatting(text) {
            let html = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '• $1')
                .replace(/\n\n/g, '<br><br>')
                .replace(/\n/g, '<br>')
                .replace(/🎨/g, '<i class="fas fa-palette" style="color:var(--primary-color);"></i>')
                .replace(/💼/g, '<i class="fas fa-briefcase" style="color:var(--secondary-color);"></i>')
                .replace(/🚀/g, '<i class="fas fa-rocket" style="color:var(--accent-color);"></i>')
                .replace(/📞/g, '<i class="fas fa-phone" style="color:var(--primary-color);"></i>')
                .replace(/🛠️/g, '<i class="fas fa-tools" style="color:var(--accent-color);"></i>')
                .replace(/💰/g, '<i class="fas fa-money-bill-wave" style="color:var(--secondary-color);"></i>')
                .replace(/📅/g, '<i class="fas fa-calendar-alt" style="color:var(--primary-color);"></i>')
                .replace(/👋/g, '<i class="fas fa-hand-wave" style="color:var(--primary-color);"></i>')
                .replace(/✅/g, '<i class="fas fa-check-circle" style="color:var(--accent-color);"></i>')
                .replace(/👤/g, '<i class="fas fa-user" style="color:var(--primary-color);"></i>')
                .replace(/🎯/g, '<i class="fas fa-bullseye" style="color:var(--primary-color);"></i>')
                .replace(/🏆/g, '<i class="fas fa-trophy" style="color:var(--accent-color);"></i>')
                .replace(/🎓/g, '<i class="fas fa-graduation-cap" style="color:var(--secondary-color);"></i>')
                .replace(/📍/g, '<i class="fas fa-map-marker-alt" style="color:var(--primary-color);"></i>')
                .replace(/📧/g, '<i class="fas fa-envelope" style="color:var(--secondary-color);"></i>')
                .replace(/📱/g, '<i class="fas fa-mobile-alt" style="color:var(--accent-color);"></i>')
                .replace(/⏰/g, '<i class="fas fa-clock" style="color:var(--secondary-color);"></i>')
                .replace(/✨/g, '<i class="fas fa-star" style="color:var(--secondary-color);"></i>')
                .replace(/🌟/g, '<i class="fas fa-star" style="color:var(--accent-color);"></i>')
                .replace(/📋/g, '<i class="fas fa-clipboard-list" style="color:var(--secondary-color);"></i>')
                .replace(/🤝/g, '<i class="fas fa-handshake" style="color:var(--accent-color);"></i>')
                .replace(/💡/g, '<i class="fas fa-lightbulb" style="color:var(--primary-color);"></i>')
                .replace(/🔗/g, '<i class="fas fa-link" style="color:var(--secondary-color);"></i>')
                .replace(/🏢/g, '<i class="fas fa-building" style="color:var(--primary-color);"></i>')
                .replace(/📁/g, '<i class="fas fa-folder" style="color:var(--secondary-color);"></i>')
                .replace(/🌐/g, '<i class="fas fa-globe" style="color:var(--accent-color);"></i>')
                .replace(/🔄/g, '<i class="fas fa-sync-alt" style="color:var(--primary-color);"></i>')
                .replace(/🎬/g, '<i class="fas fa-film" style="color:var(--secondary-color);"></i>')
                .replace(/🖥️/g, '<i class="fas fa-desktop" style="color:var(--accent-color);"></i>')
                .replace(/📝/g, '<i class="fas fa-file-signature" style="color:var(--primary-color);"></i>')
                .replace(/💳/g, '<i class="fas fa-credit-card" style="color:var(--secondary-color);"></i>')
                .replace(/📊/g, '<i class="fas fa-chart-bar" style="color:var(--accent-color);"></i>')
                .replace(/⭐/g, '<i class="fas fa-star" style="color:var(--primary-color);"></i>')
                .replace(/🤔/g, '<i class="fas fa-question-circle" style="color:var(--secondary-color);"></i>')
                .replace(/🙏/g, '<i class="fas fa-hands-praying" style="color:var(--accent-color);"></i>')
                .replace(/🙌/g, '<i class="fas fa-hands-clapping" style="color:var(--primary-color);"></i>')
                .replace(/💫/g, '<i class="fas fa-sparkles" style="color:var(--secondary-color);"></i>')
                .replace(/🔍/g, '<i class="fas fa-search" style="color:var(--primary-color);"></i>')
                .replace(/🆘/g, '<i class="fas fa-life-ring" style="color:var(--secondary-color);"></i>');
            return html;
        }

        // ENHANCED RESPONSIVE SUGGESTIONS WITH SMALLER SIZE
        function updateSuggestionGrid() {
            const width = window.innerWidth;
            
            // Clear existing suggestions
            suggestionGrid.innerHTML = '';
            
            // Define suggestions based on screen size
            const suggestions = width <= 480 ? [
                "Skills?",
                "Experience?",
                "Projects?",
                "Contact?",
                "Tools?",
                "Education?",
                "Rates?",
                "Available?",
                "Process?",
                "Achievements?",
                "Hobbies?",
                "Collaboration?"
            ] : [
                "What are Jomari's skills?",
                "Tell me about experience",
                "Show me projects",
                "How to contact?",
                "What tools does he use?",
                "Education background?",
                "What are the rates?",
                "Is he available?",
                "Work process?",
                "Achievements?",
                "Personal hobbies?",
                "Collaboration style?"
            ];
            
            // Apply responsive grid layout
            if (width <= 480) {
                suggestionGrid.style.gridTemplateColumns = '1fr';
                suggestionGrid.style.gap = '6px';
            } else if (width <= 768) {
                suggestionGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                suggestionGrid.style.gap = '8px';
            } else {
                suggestionGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
                suggestionGrid.style.gap = '8px';
            }
            
            // Create suggestion items
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'suggestion-item dynamic-font-small';
                
                const textSpan = document.createElement('span');
                textSpan.textContent = suggestion;
                suggestionItem.appendChild(textSpan);
                
                suggestionItem.addEventListener('click', () => {
                    chatInput.value = suggestion;
                    chatInput.style.height = '48px';
                    chatInput.style.height = (chatInput.scrollHeight) + 'px';
                    sendBtn.disabled = false;
                    hideSuggestions();
                    chatInput.focus();
                    
                    // Add subtle animation
                    suggestionItem.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        suggestionItem.style.transform = '';
                    }, 150);
                });
                
                suggestionGrid.appendChild(suggestionItem);
            });
        }

        // Function to create star particles
        function createStarParticles(element) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('div');
                star.classList.add('star-particle');
                star.innerHTML = '✦';
                star.style.left = `${centerX}px`;
                star.style.top = `${centerY}px`;
                star.style.position = 'fixed';
                
                // Random direction and distance
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 30;
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
                }, 1000);
            }
        }

        function showSuggestions() {
            updateSuggestionGrid();
            suggestionModal.style.display = 'block';
            suggestionBtn.style.transform = 'scale(1.15) rotate(-10deg)';
            
            // Create star particles
            createStarParticles(suggestionBtn);
            
            // Adjust modal position for mobile
            const width = window.innerWidth;
            if (width <= 480) {
                suggestionModal.style.top = '70px';
                suggestionModal.style.bottom = '10px';
                suggestionModal.style.left = '12px';
                suggestionModal.style.right = '12px';
                suggestionModal.style.maxHeight = '200px';
            } else if (width <= 768) {
                suggestionModal.style.top = '70px';
                suggestionModal.style.bottom = '10px';
                suggestionModal.style.left = '15px';
                suggestionModal.style.right = '15px';
                suggestionModal.style.maxHeight = '250px';
            } else {
                suggestionModal.style.top = '70px';
                suggestionModal.style.bottom = '10px';
                suggestionModal.style.left = '20px';
                suggestionModal.style.right = '20px';
                suggestionModal.style.maxHeight = '300px';
            }
        }

        function hideSuggestions() {
            suggestionModal.style.display = 'none';
            suggestionBtn.style.transform = '';
        }

        // Initialize and update suggestions on window resize
        window.addEventListener('resize', updateSuggestionGrid);
        window.addEventListener('load', () => {
            updateSuggestionGrid();
        });

        // Chatbot Button Hover Effects - Message icon when closed
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

        // Open chatbox
        function openChatbox() {
            if (isChatOpen) return;
            isChatOpen = true;
            chatbox.style.display = 'flex';
            chatIcon.classList.replace('fa-robot', 'fa-comment-dots');
            chatIcon.style.transform = 'scale(1.1)';
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

        // Close chatbox - Change icon back to robot
        function closeChatbox() {
            if (!isChatOpen) return;
            isChatOpen = false;
            stopSpeaking();
            hideSuggestions();

            // Animate closing
            chatbox.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1)';
            chatbox.style.transform = 'scale(0) translateY(40px)';
            setTimeout(() => {
                chatbox.style.display = 'none';
                chatbox.style.transform = 'scale(1) translateY(0)';
                // Change icon back to robot when closed
                chatIcon.classList.replace('fa-comment-dots', 'fa-robot');
                chatIcon.style.transform = 'scale(1)';
                sendBtn.disabled = true;
                chatBtn.classList.remove('ai-animation');
            }, 600);
            setTimeout(() => {
                if (!isChatOpen) {
                    startPulseAnimation();
                }
            }, 1000);
        }

        // Toggle theme - Improved sun theme
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
        }

        // Show/hide suggestions with star particles
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
        suggestionBtn.addEventListener('mouseenter', (e) => {
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

        // Send message with paper plane animation and DELAYED RESPONSE
        async function sendMessage() {
            if (isSending) return;
            const userText = chatInput.value.trim();
            if (!userText) return;
            isSending = true;
            chatInput.value = '';
            chatInput.style.height = '48px';
            sendBtn.disabled = true;
            stopSpeaking();
            hideSuggestions();

            // Paper plane animation
            sendBtn.classList.add('sending');
            setTimeout(() => {
                sendBtn.classList.remove('sending');
            }, 1000);

            // Show immediate user message
            appendMessage('user', userText);
            // Show "thinking" indicator with SHORT DELAY
            const loading = appendMessage('typing', '');

            // Determine response based on user input
            const responseText = intelligentAI.analyzeQuery(userText);
            const formattedResponse = handleResponseFormatting(responseText);
            
            // SHORT DELAY for thinking effect (800-1200ms)
            const delayTime = 800 + Math.random() * 400;
            
            // Replace typing indicator with actual response after delay
            setTimeout(() => {
                appendMessage('bot', formattedResponse, loading);
                // Scroll to bottom
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
            chatInput.style.height = '48px';
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
        };