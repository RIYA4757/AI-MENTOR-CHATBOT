const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

const hiteshBtn = document.getElementById("hiteshBtn");
const piyushBtn = document.getElementById("piyushBtn");

const hiteshGreetings = [
    "Haan ji! Chai ready hai? Ab coding bhi shuru kar dete hain.",
    "Aaj kya seekhne ka plan hai?",
    "AI ki duniya roz badal rahi hai... tum kis cheez pe kaam kar rahe ho?",
    "Sirf videos dekhne se engineer nahi bante... kuch build bhi karte hain.",
    "Assignment complete hua ya phir kal se?"
];

const piyushGreetings = [
    "Bhai... kya build kar rahe ho aaj?",
    "Build karo... sirf tutorial dekhne se startup nahi banta.",
    "Kya scene hai? Kuch mast ship karte hain?",
    "Agar funny bug mila to screenshot lena... meme banega.",
    "Spelling mistake dikhe to ignore karna... AI nahi lagna chahiye.",
    "Attention chahiye bhai... kuch aisa banao ki Twitter pe log bolen 'Ye kisne banaya?'",
    "Ship fast... perfect baad mein karenge.",
    "Kuch funny hua? Screenshot le... content mil gaya!"
];

let currentMentor = "hitesh";

const chats = {
    hitesh: [],
    piyush: []
};

function loadChat() {

    chatBox.innerHTML = "";

    chats[currentMentor].forEach(msg => {

        const div = document.createElement("div");

        div.classList.add("message", msg.sender);

        if (msg.sender === "bot") {

            const image =
                currentMentor === "hitesh"
                    ? "images/hitesh.jpg"
                    : "images/piyush.jpg";

            div.innerHTML = `
                <img src="${image}" class="chat-avatar">
              <div class="chat-text">${msg.text.replace(/\n/g,"<br>")}</div>
            `;

        } else {

            div.textContent = msg.text;

        }

        chatBox.appendChild(div);

    });

    chatBox.scrollTop = chatBox.scrollHeight;

}

function addMessage(text, sender) {

    const div = document.createElement("div");

    div.classList.add("message", sender);

    if (sender === "bot") {

        const image =
            currentMentor === "hitesh"
                ? "images/hitesh.jpg"
                : "images/piyush.jpg";

        div.innerHTML = `
            <img src="${image}" class="chat-avatar">
            <div class="chat-text">${text.replace(/\n/g,"<br>")}</div>
        `;

    } else {

        div.textContent = text;

    }

    chatBox.appendChild(div);

    chats[currentMentor].push({
        text,
        sender
    });

    chatBox.scrollTop = chatBox.scrollHeight;

}

hiteshBtn.addEventListener("click", () => {

    currentMentor = "hitesh";

    hiteshBtn.classList.add("active");
    piyushBtn.classList.remove("active");

    loadChat();

    if (chats.hitesh.length === 0) {

        const randomGreeting =
            hiteshGreetings[Math.floor(Math.random() * hiteshGreetings.length)];

        addMessage(randomGreeting, "bot");

    }

});

piyushBtn.addEventListener("click", () => {

    currentMentor = "piyush";

    piyushBtn.classList.add("active");
    hiteshBtn.classList.remove("active");

    loadChat();

    if (chats.piyush.length === 0) {

        const randomGreeting =
            piyushGreetings[Math.floor(Math.random() * piyushGreetings.length)];

        addMessage(randomGreeting, "bot");

    }

});

async function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") return;

    addMessage(message, "user");

    messageInput.value = "";
    messageInput.focus();

    sendBtn.disabled = true;

    const loading = document.createElement("div");

    loading.className = "message bot";
    loading.id = "loading";

    const image =
        currentMentor === "hitesh"
            ? "images/hitesh.jpg"
            : "images/piyush.jpg";

    loading.innerHTML = `
        <img src="${image}" class="chat-avatar">
        <div class="chat-text">
            ${currentMentor === "hitesh"
                ? "Hitesh is typing..."
                : "Piyush is typing..."}
        </div>
    `;

    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("https://ai-mentor-chatbot-7fm0.onrender.com/chat", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message,
                mentor: currentMentor
            })

        });

        const data = await response.json();

        document.getElementById("loading")?.remove();

        addMessage(data.reply, "bot");

    }

    catch (error) {

        document.getElementById("loading")?.remove();

        console.error(error);

        addMessage("Something went wrong.", "bot");

    }

    finally {

        sendBtn.disabled = false;

    }

}

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendMessage();

    }

});

const initialGreeting =
    hiteshGreetings[Math.floor(Math.random() * hiteshGreetings.length)];

addMessage(initialGreeting, "bot");