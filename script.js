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

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("mins").innerText = "00";
        document.getElementById("secs").innerText = "00";
        
        // Button ko enable karo
        celebrateBtn.classList.add("active");
        celebrateBtn.disabled = false;
        celebrateBtn.style.opacity = "1";
        celebrateBtn.style.pointerEvents = "auto";
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

// Initialize first step
if (nextBtn) {
    nextBtn.addEventListener('click', showQuestion);
}

function showQuestion() {
    const buttons = `
        <div class="btn-group-row">
            <button class="btn active" onclick="showFinal()">Yes</button>
            <button class="btn active btn-no" onclick="handleNo()">No</button>
        </div>`;
    updateContent("Dekhna chahre me kya bnaya??", buttons, 1);
}

function handleNo() {
    const buttons = `<button class="btn active" onclick="showFinal()">please😭🙏🏻</button>`;
    updateContent("Bohot mehnat se bnaya jii😭", buttons, 1);
}

function showFinal() {
    const buttons = `<button class="btn active" id="letsGoBtn">Let's Go!🎉</button>`;
    updateContent("Excited??", buttons, 2);
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
    
    // Show Website 2
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
    
    // Apply black background initially
    website2Container.classList.add('black-bg');
    website2Container.classList.remove('party-bg');
    
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
    thanks: `Thank you for making me a perfect man, tum hi bolti thi ki main perfect hoon.
Thank you mujhe ye ehsaas dilane ke liye ki khubsurat ladkiyon ko bhi mujh par crush ho sakta hai, aur wo tum thi.
Thank you adina meri zindagi ke 1 saal 6 mahine aur 7 din ko meri life ke sabse khoobsurat din banane ke liye. Ye sab likhte hue mere aansu bas ruke hue hain, kisi tarah.
Thank you mujhe maggie banana sikhane ke liye. Meri life ki pehli dish, wo kaise bhool sakta hoon.
Thank you mujhe ye batane ke liye ki mere ghar ke bahar ki duniya bina namak ki chai peeti hai.
Mujhe chai banana tumne sikhaya.
Thank you mujhe ye samjhane ke liye ki ladke bhi ro sakte hain.
Thank you meri har galti ko nazar andaaz karne ke liye.
Thank you meri har baat bina wajah sune jaane ke liye.
Thank you mere har faisle par saath dene ke liye.
Thank you mujhe ye sikhane ke liye ki khud ke haq mein bolna bado ki be-adabi nahi hota.
Thank you mujhe samjhane ke liye ki ladkon ko color differences samajh nahi aate.
Thank you mujhe life ka ek goal dene ke liye.
Tumhare baad, ab main apni future beti ko princess treatment dene ke layak hoon. Practice ho chuki hai.
Thank you, Adina..`,
    
    msg: `Happy Birthday Adina!!!!
Happy birthday to my fav human being on the earth!!
Meko bohot khushi ho rhi hai ki aaj tum poore 17 ke ho gyiii.. Mtlb ke poore 149,016 ghante ki so congratesss🎉
Ar ye ghnato ke 3 hisse kro to in ghanto ke start me tum bohot cute harkate kri jaise ki tumahra bachpan vo nani ke ghr pe cousins ke masti krna🥹. Ghr ku water park banna hai. Apne bade se ghr me khudka chota sa ghar banna and bohot kuch pyare pyare harkate.. Fir uske doosre hisse me tumne schoollll me bohot mastiyaa kre freinds ke sath jaise ki padhai na krke sare makka krna techer ku dam krna aur lunch time me bas ghoomna cute cute cheeza recreate krnaa...!!! fir third hisse me tum ne aik ladke ku bohot pyar diye meko bohot pyar diye aur ye pyaar ke wjah se me itta attach ho gya. Adiba tum bohot achii ladki ho yaro loyalty bhi lalo aap ander kasam se tumse rare ladki nhi milti fir duniya me you are the the bestt. meri nazar me tum meri ex nhi ho meri enemy bhi nhi ho mera past bhi nhi ho tum vo ho jisku aik time per maine meri princess bnaya tha aik tum ich hai vo jisku mai mere heart ke aik aik single part se pyaar kra tha aur you are the best memory of my life you taught me what love feels like..
You were the reason I cried, the reason I smiled, the reason I believed in love.
Maybe you're no longer mine, but somewhere in the quiet corners of my heart,
you'll always remain my greatest love story.. My fav story!!
I loved you as much as i capable me dooor se itta pyar krta tha pass se to andaza ich nhi lga pate the but pass ane waise mahol ich nhi hua. Addu hamesha yaad rakho tumaku kabhi bhi meri help ki need hungi to meko jroor bolo me full help krtu! Aur ha ab tumhari life ke jitne bhi ghante hai tum unku sukoon se khudki marzi se aur poore enjoyment ke sath guzaroooo i wish that ki vo ladka tumko mere se bhi jyada smjhe mere se jyada pyar kre mere se jyada care kre tumko princess bna kr rakhe🫶🏻agr unneh nhi kra to usko bolna ki mai kaisa tha fir unneh jroor krta!! Usko bolna ki editing seekh le kyuki mohtarma ku bohot alas ata editing krne me. Aur ha thoda khyal rakho khudka kam se kam cheeze expect kro kyuki aap jitna jyada expect kroge utna ich hurt hoge. Aur ha us ladke ke intensens per bhi ghaur krna me chahta hu tum safe hathon me raho. 
Aur ha i'm sorry adina tumne vo card me likh the ki meai tumahri aik chalti firti dairy hu i'm sorry me khudka glt istemaal krra tha i'm really sorry me us dairy ku delete kr dena chahta hu ab kabhi uska use nhu krne wala mai i'm really sorry, aur yeap! ye mere kuch last messeges the abhi milenge inshaallah kabhi aur kahi aur kisi aur rishte se🫶🏻`,
    
    bye: `Bye bye Adina....
Life ke is trun per, mai sirf shukriya ich bolna chahtu.
Shukriya us kal ke liye jab ham sath the nibhare the sab bolre the long distance nhi chalta fir bhi nibhare the to shukriya..!! Aur also shukriya vo lesson ka jo meko mila. Maine hamesha itne door reh kr jo ho skta tha jaise ho skta poori koshish krke tumku vo sab dene ki koshish ki jo aik pyari si princess deserve krti thi.. Be-inteha khayal, izzat, aur ankh band krke bhrosa.
Aaj jab mai peeche hat raha hoon, toh dil mein koi burden aur shikayat leker nhi jara, Bas aik sukoon hai ki maine jo bhi promises the vo poore kre aur mere sare farz' poori inamdari se nibhaye maine proove kiya ki me loyal tha hamesha se aur bas isi baat ka sukoon hai. Kuch log life me aik baar ich milte hai aur unka sath hona ich apne aap me aik inamn rhtaa. shyad mera bhi charecter tumhari life me yahi tha aur yahi tak tha. (Ammm btw i'm not in a relationship! aur ana bhi nhi chahta)
And a last messege to you...
‎'if you ever miss me, Just remember i'm as far away as you pushed me'
God bye Adina khush raho kyuki me hamesha se yahi chahta tha. Alvida✨.`
};

function triggerEffect(val) {
    console.log("Triggered:", val);

    if (val === 'lights') {
        document.getElementById('website2-container').classList.replace('black-bg', 'party-bg');
        document.getElementById('lights-layer').classList.add('show-layer');
        updateUI('l-btn', 'd-btn');
    } else if (val === 'decor') {
        updateUI('d-btn', 'm-btn');
    } else if (val === 'music') {
        document.getElementById('music-track').play();
        updateUI('m-btn', 'c-btn');
    } else if (val === 'cake') {
        document.getElementById('party-content').classList.remove('hide');
        document.getElementById('c-btn').classList.add('hide');
    }
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
            btn.innerText = "HAPPY LAUNCH DAY! 🎉";
            setTimeout(() => { btn.classList.add('hide'); }, 2000);
        }
        timer--;
    }, 1000);
}

function openFullMsg(key) {
    document.getElementById('modal-head').innerText = key.toUpperCase();
    document.getElementById('modal-content').innerText = myTexts[key];
    document.getElementById('full-overlay').classList.remove('hide');
}

function closeFullMsg() {
    document.getElementById('full-overlay').classList.add('hide');
}
// WEBSITE 2 END
