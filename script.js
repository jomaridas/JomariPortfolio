// Tab functionality for About section
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(let tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(let tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    // 'event' is a global object in browser environments when called from onclick
    // but it's good practice to pass it as an argument or get it from the event listener.
    // For now, assuming it's available.
    event.currentTarget.classList.add("active-link"); 
    document.getElementById(tabname).classList.add("active-tab");
} 

// Sidemenu functionality for mobile navigation
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-250px"; /* Adjusted to match media query size for smooth transition */
}

// Google Sheets Form Submission Logic
const scriptURL = 'https://script.google.com/macros/s/AKfycbx1Cf1rFEsqcO-yVlaX-qoKLYtvh2YE360z9P10zqXp2AqdGnhN81xSmnDRQJb_EE4LlQ/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

if (form && msg) { // Ensure form and msg elements exist before adding listener
    form.addEventListener('submit', e => {
        e.preventDefault()
        msg.innerHTML = "Sending message..." 

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.innerHTML = "Message sent successfully"
                setTimeout(function(){
                    msg.innerHTML = ""
                },5000)
                form.reset()
            })
            .catch(error => {
                console.error('Error!', error.message)
                msg.innerHTML = "Error sending message!"
                setTimeout(function(){
                   msg.innerHTML = ""
                },5000)
            })
    });
}


// General confetti function
function triggerConfettiEffect(x, y, targetWidth, targetHeight, containerId = 'confetti-container', num = 30, spread = 100) {
    const confettiContainer = document.getElementById(containerId);
    if (!confettiContainer) return;

    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = `${y - targetHeight / 2}px`; 
    confettiContainer.style.left = `${x - targetWidth / 2}px`; 
    confettiContainer.style.width = `${targetWidth}px`;
    confettiContainer.style.height = `${targetHeight}px`;
    confettiContainer.innerHTML = ''; 
    confettiContainer.style.display = 'block'; // Ensure container is visible
    confettiContainer.style.zIndex = '9997'; // Below fireworks and birthday confetti

    const numParticles = num; 
    const colors = ['#ff004f', '#00bcd4', '#ffeb3b', '#4caf50', '#9c27b0']; 

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti-particle');
        
        const startX = targetWidth / 2; 
        const startY = targetHeight / 2;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = 0.8 + Math.random() * 1.5; 
        const delay = Math.random() * 0.3; 
        const endX = (Math.random() - 0.5) * spread * 2; 
        const endY = (Math.random() - 0.5) * spread * 2; 
        const rotation = Math.random() * 720; 

        particle.style.setProperty('--start-x', `${startX}px`);
        particle.style.setProperty('--start-y', `${startY}px`);
        particle.style.setProperty('--end-x', `${startX + endX}px`);
        particle.style.setProperty('--end-y', `${startY + endY}px`);
        particle.style.setProperty('--rotation', `${rotation}deg`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        confettiContainer.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
            if (confettiContainer.children.length === 0) {
                confettiContainer.style.display = 'none'; // Hide when empty
                // Reset container styles after all particles are gone (optional, could be handled by CSS)
                confettiContainer.style.position = 'absolute';
                confettiContainer.style.top = '0';
                confettiContainer.style.left = '0';
                confettiContainer.style.width = '100%';
                confettiContainer.style.height = '100%';
            }
        });
    }
}


// Full-screen birthday confetti function (using triggerConfettiEffect internally)
function triggerBirthdayConfetti() {
    // Reset confettiContainer to default full-screen before new particles
    const birthdayConfettiContainer = document.getElementById('birthday-confetti-container');
    if (!birthdayConfettiContainer) return;

    birthdayConfettiContainer.innerHTML = '';
    birthdayConfettiContainer.style.display = 'block';
    birthdayConfettiContainer.style.position = 'fixed';
    birthdayConfettiContainer.style.top = '0';
    birthdayConfettiContainer.style.left = '0';
    birthdayConfettiContainer.style.width = '100vw';
    birthdayConfettiContainer.style.height = '100vh';
    birthdayConfettiContainer.style.zIndex = '9999';
    birthdayConfettiContainer.style.pointerEvents = 'none'; 

    const numParticles = 150; 
    const colors = ['#ff004f', '#00bcd4', '#ffeb3b', '#4caf50', '#9c27b0', '#ff69b4', '#ffa500'];
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.4; 
    const spread = 600; 

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('birthday-confetti-particle'); 
        
        const startX = centerX;
        const startY = centerY;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = 2 + Math.random() * 2; 
        const delay = Math.random() * 0.8; 
        const endX = (Math.random() - 0.5) * spread * 2; 
        const endY = (Math.random() * 500) + 300; 
        const rotation = Math.random() * 1080; 

        particle.style.setProperty('--start-x', `${startX}px`);
        particle.style.setProperty('--start-y', `${startY}px`);
        particle.style.setProperty('--end-x', `${centerX + endX}px`);
        particle.style.setProperty('--end-y', `${centerY + endY}px`);
        particle.style.setProperty('--rotation', `${rotation}deg`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        birthdayConfettiContainer.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
            if (birthdayConfettiContainer.children.length === 0) {
                birthdayConfettiContainer.style.display = 'none';
            }
        });
    }
}


// Fireworks function for the "Hire Me!" button
function triggerFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    if (!fireworksContainer) return;

    fireworksContainer.innerHTML = ''; 
    fireworksContainer.style.display = 'block';
    fireworksContainer.style.position = 'fixed';
    fireworksContainer.style.top = '0';
    fireworksContainer.style.left = '0';
    fireworksContainer.style.width = '100vw';
    fireworksContainer.style.height = '100vh';
    fireworksContainer.style.zIndex = '9998'; 
    fireworksContainer.style.pointerEvents = 'none'; 

    const numFireworks = 5; 
    const fireworkColors = ['#FF4500', '#FFD700', '#ADFF2F', '#1E90FF', '#BA55D3', '#FF69B4']; 

    for (let f = 0; f < numFireworks; f++) {
        setTimeout(() => {
            const numParticles = 80; 
            const startX = Math.random() * window.innerWidth;
            const startY = window.innerHeight * (0.8 + Math.random() * 0.2); 
            const burstY = window.innerHeight * (0.2 + Math.random() * 0.4); 

            const fireworkColor = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

            const rocket = document.createElement('div');
            rocket.classList.add('firework-particle'); 
            rocket.style.backgroundColor = 'white'; 
            rocket.style.width = '4px';
            rocket.style.height = '15px';
            rocket.style.left = `${startX}px`;
            rocket.style.top = `${startY}px`;
            rocket.style.opacity = 0;
            rocket.style.zIndex = 10000; 

            rocket.animate([
                { transform: `translateY(0)`, opacity: 0 },
                { transform: `translateY(-${startY - burstY}px)`, opacity: 1 },
                { transform: `translateY(-${startY - burstY}px)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out',
                fill: 'forwards'
            }).onfinish = () => {
                rocket.remove();
                for (let i = 0; i < numParticles; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('firework-particle');
                    
                    particle.style.setProperty('--start-x', `${startX}px`);
                    particle.style.setProperty('--start-y', `${burstY}px`); 
                    particle.style.setProperty('--color', fireworkColor); 
                    
                    const duration = 1.5 + Math.random() * 1; 
                    const delay = Math.random() * 0.1; 
                    const spread = 200; 
                    const angle = Math.random() * Math.PI * 2; 
                    const distance = Math.random() * spread;
                    const endX = startX + Math.cos(angle) * distance; 
                    const endY = burstY + Math.sin(angle) * distance + (Math.random() * 100); 

                    particle.style.setProperty('--end-x', `${endX}px`);
                    particle.style.setProperty('--end-y', `${endY}px`);
                    particle.style.animationDuration = `${duration}s`;
                    particle.style.animationDelay = `${delay}s`;

                    fireworksContainer.appendChild(particle);
                    particle.addEventListener('animationend', () => particle.remove());
                }
            };
            fireworksContainer.appendChild(rocket);
        }, f * 500); 
    }

    setTimeout(() => {
        if (fireworksContainer.children.length === 0) {
            fireworksContainer.style.display = 'none';
        }
    }, (numFireworks * 500) + 2000); 
}


// Event listener for the "Hire Me!" button
const hireMeButton = document.getElementById('hire-me-action-btn');
if (hireMeButton) {
    hireMeButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        triggerFireworks(); 

        const resumeLink = document.createElement('a');
        resumeLink.href = 'Jomari CV.pdf'; 
        resumeLink.download = 'Jomari CV.pdf'; 
        document.body.appendChild(resumeLink);
        resumeLink.click();
        document.body.removeChild(resumeLink);

        const emailAddress = 'jomariabubo.grc@gmail.com'; 
        const subject = 'Inquiry regarding your Portfolio';
        const body = 'Dear Jomari,\n\nI saw your portfolio and was impressed by your work. I\'d like to discuss a potential opportunity.\n\nBest regards,';
        window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}


// Event listener for other clicks on the document to trigger general confetti
document.addEventListener('click', function(event) {
    const target = event.target;

    // Trigger fireworks for hire-me-action-btn
    if (target.id === 'hire-me-action-btn') {
        // This is handled by the specific hireMeButton event listener above.
        // We put this check here to prevent the general confetti from also triggering on this button.
        return; 
    }
    // Trigger birthday confetti for an element with id 'birthday-surprise-btn' if it existed,
    // or you could assign this to another element. 
    // From your HTML, it seems you were considering 'birthday-surprise-btn' but then used 'hire-me-action-btn'.
    // I'll assume 'birthday-confetti-container' is for the birthday effect,
    // and if you want to trigger it on a click, you need a specific button ID for it.
    // For now, I'm setting a placeholder for a possible 'birthday-surprise-btn' to trigger it.
    // If you want birthday confetti on a specific element, assign it an ID and check for it here.
    if (target.id === 'some-birthday-trigger-button') { // Placeholder: change this ID if you have a specific birthday button
        triggerBirthdayConfetti();
        return; // Prevent general confetti
    }


    // General confetti for other links, buttons, or about-image
    if ((target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('.btn')) && target.id !== 'hire-me-action-btn') {
        const rect = target.getBoundingClientRect();
        triggerConfettiEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, 'confetti-container');
    } else if (target.id === 'about-image') { 
        const rect = target.getBoundingClientRect();
        triggerConfettiEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, 'confetti-container');
    }
});

// Expose functions to the global scope if they are called directly from HTML (onclick attributes)
window.opentab = opentab;
window.openmenu = openmenu;
window.closemenu = closemenu; 
document.getElementById('hire-me-action-btn').addEventListener('click', function() {
    // 1. Create a temporary anchor tag
    const downloadLink = document.createElement('a');
    
    // 2. Set the href and download attributes
    downloadLink.href = 'Jomari CV.pdf';
    downloadLink.download = 'Jomari CV.pdf';
    
    // 3. Append the link to the body (necessary for some browsers)
    document.body.appendChild(downloadLink);
    
    // 4. Programmatically click the link to start the download
    downloadLink.click();
    
    // 5. Clean up the temporary link
    document.body.removeChild(downloadLink);
});