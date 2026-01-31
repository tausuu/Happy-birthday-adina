// WEBSITE 1 START
// DOM Elements
const pages = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    page4: document.getElementById('page4')
};

const celebrateBtn = document.getElementById('celebrateBtn');
const finalSurpriseBtn = document.getElementById('finalSurpriseBtn');
const nextBtn = document.getElementById('nextBtn');
const decorContainer = document.getElementById('decor-container');

// Box elements for hiding when 00
const daysBox = document.getElementById('days-box');
const hoursBox = document.getElementById('hours-box');
const minsBox = document.getElementById('mins-box');
const secsBox = document.getElementById('secs-box');

// ======================================================
// 🎯 EASY DATE CHANGE - YAHAN SE DATE BADLO!
// Format: "Month Day, Year Hour:Minute:Second"
// Example: "Feb 2, 2026 00:00:00" (2 February 2026 midnight)
// ======================================================
const targetDate = new Date("Feb 2, 2026 00:00:00").getTime();
// ======================================================

// Countdown Timer - EASY TO CHANGE!
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0"+d : d;
    document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
    document.getElementById("mins").innerText = m < 10 ? "0"+m : m;
    document.getElementById("secs").innerText = s < 10 ? "0"+s : s;

    // Feature 1: Hide boxes when they reach 00
    if (d === 0 && !daysBox.classList.contains('hidden')) {
        daysBox.classList.add('hidden');
    }
    if (h === 0 && !hoursBox.classList.contains('hidden')) {
        hoursBox.classList.add('hidden');
    }
    if (m === 0 && !minsBox.classList.contains('hidden')) {
        minsBox.classList.add('hidden');
    }
    if (s === 0 && !secsBox.classList.contains('hidden')) {
        secsBox.classList.add('hidden');
    }

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("mins").innerText = "00";
        document.getElementById("secs").innerText = "00";
        
        // Hide all boxes when countdown completes
        daysBox.classList.add('hidden');
        hoursBox.classList.add('hidden');
        minsBox.classList.add('hidden');
        secsBox.classList.add('hidden');
        
        // Button ko enable karo
        celebrateBtn.classList.add("active");
        celebrateBtn.disabled = false;
        celebrateBtn.style.opacity = "1";
        celebrateBtn.style.pointerEvents = "auto";
        
        // Feature 2: Automatically go to Page 2 after 2 seconds
        setTimeout(function() {
            if (pages.page1.style.display !== "none") {
                celebrateBtn.click(); // Simulate click on celebrate button
            }
        }, 2000);
    }
}, 1000);

// Celebrate Button Click
celebrateBtn.onclick = function() {
    // Button tabhi kaam kare jab active ho
    if (this.classList.contains("active")) {
        pages.page1.style.display = "none";
        pages.page2.style.display = "block";
        startDecorations();
    }
};

// Page 2 ka button
finalSurpriseBtn.addEventListener('click', function() {
    pages.page2.style.display = "none";
    pages.page3.style.display = "flex";
    pages.page3.style.alignItems = "center";
    pages.page3.style.justifyContent = "center";
    pages.page3.style.minHeight = "100vh";
    showQuestion();
});

// Floating decorations
function startDecorations() {
    setInterval(createFloatingElement, 400);
}

function createFloatingElement() {
    if (!decorContainer) return;
    
    const item = document.createElement("div");
    item.className = "floating-item";
    const elements = ['🎈', '💗', '✨', '🌟', '💫', '🎉', '🥳', '🎊', '🎁'];
    item.innerText = elements[Math.floor(Math.random() * elements.length)];
    
    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = (Math.random() * 20 + 20) + "px";
    
    decorContainer.appendChild(item);
    setTimeout(() => { item.remove(); }, 6000);
}

// Page 3 Interactive Card
const mainText = document.getElementById("main-text");
const btnGroup = document.getElementById("btn-group");
const slider = document.getElementById("content-slider");
const dots = document.querySelectorAll(".dot");

let currentStep = 0;

function updateContent(text, buttonsHTML, dotIndex) {
    slider.classList.remove("slide-in");
    slider.classList.add("slide-out");
    
    setTimeout(() => {
        mainText.innerText = text;
        btnGroup.innerHTML = buttonsHTML;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === dotIndex);
        });
        
        slider.classList.remove("slide-out");
        slider.classList.add("slide-in");
        
        currentStep = dotIndex;
        
        // SPECIAL CASE: Agar "Let's Go!🎉" button create hua hai to uska listener attach karo
        if (buttonsHTML.includes('letsGoBtn')) {
            setTimeout(attachLetsGoListener, 50);
        }
    }, 300);
}

// Card section steps with proper word choice
function showQuestion() {
    const buttons = `
        <div class="side-by-side">
            <button class="btn btn-yes" onclick="showConfirm1()">Yes</button>
            <button class="btn btn-no" onclick="showFirstNo()">No</button>
        </div>`;
    updateContent("Kya tum dekhna chahti ho??", buttons, 0);
}

function showConfirm1() {
    const buttons = `
        <div class="side-by-side">
            <button class="btn btn-yes" onclick="showConfirm2()">Haan dekhna hai</button>
            <button class="btn btn-no" onclick="showFirstNo()">Nahi</button>
        </div>`;
    updateContent("Pakka na??", buttons, 1);
}

function showConfirm2() {
    const buttons = `
        <div class="side-by-side">
            <button class="btn btn-yes" onclick="showFinalQuestion()">Pakka dekhna hai</button>
            <button class="btn btn-no" onclick="showSecondNo()">Ek baar soch lo</button>
        </div>`;
    updateContent("Ek baar aur soch lo...", buttons, 2);
}

function showFinalQuestion() {
    const buttons = `
        <div class="side-by-side">
            <button class="btn btn-yes" onclick="showReady()">Haan dekh lo</button>
            <button class="btn btn-no" onclick="showThirdNo()">Nahi</button>
        </div>`;
    updateContent("Soch lo", buttons, 3);
}

function showReady() {
    const buttons = `<button class="btn active" id="letsGoBtn">Let's Go! 🎉</button>`;
    updateContent("Achaaaaa dekho ab", buttons, 4);
}

function showFirstNo() {
    const buttons = `<button class="btn active" onclick="showQuestion()">Dekh lo na😭</button>`;
    updateContent("Bohot mehnat se banaya hai😭", buttons, 0);
}

function showSecondNo() {
    const buttons = `<button class="btn active" onclick="showFinalQuestion()">Acha is baar dikha deta hoon</button>`;
    updateContent("Areyy yaarr😣", buttons, 3);
}

function showThirdNo() {
    const buttons = `<button class="btn active" onclick="showReady()">Achaaaaa dekho</button>`;
    updateContent("Last chance hai😄", buttons, 4);
}

// ALAG FUNCTION BANAYA LETS GO BUTTON KE LIYE
function attachLetsGoListener() {
    const letsGoBtn = document.getElementById('letsGoBtn');
    if (letsGoBtn) {
        // Pehle existing listeners hatao
        letsGoBtn.removeEventListener('click', transitionToWebsite2);
        
        // Naya listener lagao
        letsGoBtn.addEventListener('click', transitionToWebsite2);
        
        // Inline onclick bhi set karo as backup
        letsGoBtn.onclick = transitionToWebsite2;
    }
}

// TRANSITION FUNCTION
function transitionToWebsite2() {
    console.log("Transitioning to Website 2...");
    
    // Hide ALL Website 1 pages
    pages.page1.style.display = "none";
    pages.page2.style.display = "none";
    pages.page3.style.display = "none";
    pages.page4.style.display = "none";
    
    // Show Website 2 with black screen
    const website2Container = document.getElementById('website2-container');
    website2Container.style.display = 'flex';
    website2Container.style.flexDirection = 'column';
    website2Container.style.justifyContent = 'center';
    website2Container.style.alignItems = 'center';
    website2Container.style.width = '100vw';
    website2Container.style.height = '100vh';
    website2Container.style.position = 'fixed';
    website2Container.style.top = '0';
    website2Container.style.left = '0';
    website2Container.style.zIndex = '1000';
    
    // Show black screen initially
    document.getElementById('black-screen').style.display = 'block';
    website2Container.classList.add('black-bg');
    
    // Reset body styling
    document.body.style.padding = '0';
    document.body.style.justifyContent = 'flex-start';
    document.body.style.alignItems = 'flex-start';
    document.body.style.overflow = 'hidden';
}

// Page 4: Virtual Party - This function exists but won't be called since we're transitioning to Website 2
function startVirtualParty() {
    // This function won't be called since we skip page 4
}
// WEBSITE 1 END

// WEBSITE 2 START
const myTexts = {
    thanks: `Happy Birthday Adina!!!! 🎂✨
‎​Happy birthday to my favorite human being on this earth! 🌍
‎​Mujhe bohot khushi ho rahi hai ki aaj tum poore 17 saal ki ho gayi ho. Matlab poore 149,016 ghante! Isliye bohot bohot mubarakbaad. 🎉
‎​Agar main in ghanton ko dekhoon, toh tumhara bachpan kitna pyara tha... nani ke ghar cousins ke saath masti, ghar ko water park bana dena, aur wo bade se ghar mein apna chota sa ghar banana. Kitni masoom thi tum. 🥹
‎​Phir school ki wo yaadein, doston ke saath padhai se zyada masti karna, teachers ko tang karna aur lunch time mein bas ghoomna. Tum hamesha se hi sabse alag aur cute rahi ho.
‎​Meri nazar mein tum meri ex nahi ho, na hi koi dushman. Tum wo princess ho jise maine apne dil ke ek-ek hisse se chaha tha. Tum meri zindagi ki sabse khoobsurat memory ho. Tumne mujhe sikhaya ki mohabbat mehsoos kaise hoti hai. Tum meri sabse favorite 'Story' ho aur hamesha rahogi. 📖❤️
‎​Ab tumhari life ke jitne bhi ghante bache hain, unhe sukoon se, apni marzi se aur poori enjoyment ke saath guzarna. Main dua karta hoon ki tumhari shaadi jise bhi ho, wo tumse mujhse bhi zyada pyar kare, tumhare nakhre uthaye aur tumhara bohot khyal rakhe.
‎​Bas apna dhyan rakhna, logon se ummeedein thodi kam rakhna taaki dil na dukhe. Tum hamesha safe raho aur khush raho, bas yahi meri dua hai.
‎​Happy Birthday Adina... hamesha muskurati rehna! 🎈✨`,
    
    msg: `Thank you Adina, mujhe ek 'Perfect Man' banane ke liye (tum hi bolti thi na ki main perfect hoon). Thank you mujhe ye ehsaas dilane ke liye ki tum jaisi khoobsurat ladki ko bhi mujh par crush ho sakta hai. 1 saal, 6 mahine aur 7 din... meri life ke sabse haseen din banane ke liye shukriya. (Ye likhte huye mere aansu bas ruke huye hain, kaise bhi karke... ✨)
‎​Thank you mujhe Maggie banana sikhane ke liye—meri life ki pehli dish, kaise bhool sakta hoon? Thank you mujhe ye batane ke liye ki mere ghar ke bahar baki duniya bina namak ki chai peeti hai, mujhe chai banana tumne sikhaya. Thank you mujhe ye samjhane ke liye ki ladke bhi ro sakte hain.
‎​Meri har fizool baat sunne ke liye, meri galti ko nazar-andaaz karne ke liye, aur mujhe life ka ek 'Goal' dene ke liye shukriya. Aaj main tumhari wajah se tayar hoon ki apni future daughter ko 'Princess Treatment' kaise dete hain, tumhare sath meri practice ho gayi. Thank you for everything, Adina.`,
    
    bye: `‎Bye bye Adina...
‎​life ke ye turn me liye me ready nhi tha , mai tumahre sukoon dena chahta hoon. Maine hamesha koshish ki ki tumhe kabhi hurt na karoon, har tarah se manaya, par shayad mere efforts kam pad gaye. Adina, maine hamesha tumhari izzat ko apne hathon mein mehfooz rakha, par jab tumne rasta badla, main darr gaya tha ki meri us choti si jaan ka kya hoga jise maine itni care se rakha tha.
‎​Lekin jab maine tumhe kisi aur ko 'Kissing Voicenotes' bhejte suna... main andar se mar gaya tha. Mera dil abhi bhi andar se jal raha hai. Mujhe har waqt pain hota hai ye soch kar ki tumne mujhe jhoot bola, mujhe cheat kiya. Kya meri aankhen green nahi thi, isliye mujhe itni badi saza mili? Main tumhare har bure waqt mein sath khada raha, phir mere gussa hone par tum kisi aur ki kaise ho gayi?
‎​Maine kabhi kisi ladki se baat nahi ki kyunki tumhe bura lagta tha, phir tumne ye sab mere sath kyun kiya? I’m sorry agar maine kabhi tumhe rulaya ho, par main ek insaan hoon, koi patthar nahi.
‎​Aaj main peeche hat raha hoon. Maine apne saare vaade poore kiye aur wafa nibhayi. Ab tumhari life mein koi tumhe gaali nahi dega, koi tumhare character par ungli nahi uthayega, kyunki maine sab apne sar le liya hai. Sabko lagne do main hi galat hoon, meri Adina sahi rehni chahiye.
‎Finally, I accepted it... we can't be together.
‎We never truly understood each other.
‎Thank you for everything... for teaching me what love feels like, and what pain feels like too.
‎Waht true happiness feels like.
‎I hope my distance brings you peace.
‎I hope you find your freedom. So I'm stepping back now.
‎Our future plans failed, but I tried...
‎I really tried.
‎my chapter ends here, yet I still wish for your happiest days. your absent hurt me more than your present ever did...
‎but I'll survive it I'll learn to live with the silent you give.
‎Thank you
‎​A Last Message to you:
‎'If you ever miss me, just remember I’m as far away as you pushed me. ✨'
‎​Khush raho addu kyuki me hamesha se yahi chahta tha. Alvida Adina.`
};

// Message cards functionality
let currentCard = 0;
const totalCards = 3;

function triggerEffect(val) {
    console.log("Triggered:", val);

    if (val === 'lights') {
        // Remove black screen
        document.getElementById('black-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('black-screen').style.display = 'none';
        }, 1000);
        
        document.getElementById('website2-container').classList.replace('black-bg', 'party-bg');
        document.getElementById('lights-layer').classList.add('show-layer');
        updateUI('l-btn', 'm-btn');
    } else if (val === 'music') {
        document.getElementById('music-track').play();
        updateUI('m-btn', 'c-btn');
    } else if (val === 'cake') {
        // This won't be called directly now
    }
}

function showCakeHint() {
    document.getElementById('party-content').classList.remove('hide');
    document.getElementById('c-btn').classList.add('hide');
    document.getElementById('cake-hint').classList.remove('hide');
}

function openMessageCards() {
    // Load text into cards
    document.getElementById('card1-text').innerText = myTexts.thanks;
    document.getElementById('card2-text').innerText = myTexts.msg;
    document.getElementById('card3-text').innerText = myTexts.bye;
    
    // Show cards overlay
    document.getElementById('cards-overlay').classList.remove('hide');
    currentCard = 0;
    updateCardDisplay();
}

function updateCardDisplay() {
    // Hide all cards
    document.querySelectorAll('.message-card').forEach(card => {
        card.classList.remove('active', 'previous');
    });
    
    // Show current card
    document.getElementById(`card${currentCard + 1}`).classList.add('active');
    
    // Update title
    document.getElementById('card-title').innerText = `Message ${currentCard + 1}/${totalCards}`;
}

function nextCard() {
    if (currentCard < totalCards - 1) {
        currentCard++;
        updateCardDisplay();
    }
}

function prevCard() {
    if (currentCard > 0) {
        currentCard--;
        updateCardDisplay();
    }
}

function closeCards() {
    document.getElementById('cards-overlay').classList.add('hide');
}

function updateUI(oldId, newId) {
    document.getElementById(oldId).classList.add('hide');
    document.getElementById(newId).classList.remove('hide');
}

function blowOutCandle() {
    let timer = 3;
    const btn = document.getElementById('blow-action');
    const interval = setInterval(() => {
        btn.innerText = "Blowing in " + timer + "...";
        if (timer <= 0) {
            clearInterval(interval);
            document.getElementById('candle-flame').classList.add('hide');
            btn.innerText = "HAPPY BIRTHDAY! 🎉";
            setTimeout(() => { btn.classList.add('hide'); }, 2000);
        }
        timer--;
    }, 1000);
}
// WEBSITE 2 END
