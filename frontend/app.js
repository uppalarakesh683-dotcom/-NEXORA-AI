const API_URL = "https://nexora-ai-4woh.onrender.com";

let selectedAgent = "General AI";
let isListening = false;
let isGenerating = false;
let recognition = null;


/* =========================================
   RECENT CHATS
========================================= */

let chatHistory = JSON.parse(
    localStorage.getItem("multiAgentChatHistory") || "[]"
);


/* =========================================
   AGENT MEMORY
========================================= */

let agentMemory = JSON.parse(
    sessionStorage.getItem("multiAgentMemory") || "{}"
);


/* =========================================
   ELEMENTS
========================================= */

const opening = document.getElementById("opening");
const agentsPage = document.getElementById("agentsPage");
const chatPage = document.getElementById("chatPage");

const enterBtn = document.getElementById("enterBtn");
const agentGrid = document.getElementById("agentGrid");

const currentAgent = document.getElementById("currentAgent");
const messages = document.getElementById("messages");

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const micBtn = document.getElementById("micBtn");
const micStatus = document.getElementById("micStatus");

const editBtn = document.getElementById("editBtn");
const languageSelect = document.getElementById("languageSelect");

const newChatBtn = document.getElementById("newChatBtn");
const backBtn = document.getElementById("backBtn");

const recentChats = document.getElementById("recentChats");


/* =========================================
   AGENTS
========================================= */

const agents = [
    {
        name: "General AI",
        icon: "◉",
        description: "Your everyday intelligent AI assistant."
    },

    {
        name: "Coding Agent",
        icon: "</>",
        description: "Programming, debugging and development."
    },

    {
        name: "Study Agent",
        icon: "✦",
        description: "Simple explanations for learning and exams."
    },

    {
        name: "Research Agent",
        icon: "⌕",
        description: "Research and organized information."
    },

    {
        name: "Creative Agent",
        icon: "✧",
        description: "Creative ideas and practical solutions."
    },

    {
        name: "Data Agent",
        icon: "▦",
        description: "Data, calculations and analysis."
    }
];


/* =========================================
   ENTER SYSTEM
========================================= */

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        opening.style.opacity = "0";
        opening.style.transform = "scale(1.04)";

        setTimeout(() => {

            opening.classList.add("hidden");
            agentsPage.classList.remove("hidden");

            if (typeof window.stopCinematicAnimation === "function") {
                window.stopCinematicAnimation();
            }

            renderAgents();

        }, 700);

    });

}


/* =========================================
   SHOW AGENTS
========================================= */

function renderAgents() {

    if (!agentGrid) return;

    agentGrid.innerHTML = "";

    agents.forEach(agent => {

        const card = document.createElement("div");

        card.className = "agent-card";

        card.innerHTML = `
            <div class="agent-orb">
                ${escapeHTML(agent.icon)}
            </div>

            <h2>
                ${escapeHTML(agent.name)}
            </h2>

            <p>
                ${escapeHTML(agent.description)}
            </p>
        `;

        card.addEventListener("click", () => {

            selectedAgent = agent.name;

            openChat();

        });

        agentGrid.appendChild(card);

    });

}


/* =========================================
   OPEN CHAT
========================================= */

function openChat() {

    currentAgent.textContent =
        selectedAgent;

    agentsPage.classList.add("hidden");

    chatPage.classList.remove("hidden");

    loadAgentMemory();

    messageInput.focus();

}


/* =========================================
   BACK TO AGENTS
========================================= */

if (backBtn) {

    backBtn.addEventListener("click", () => {

        chatPage.classList.add("hidden");

        agentsPage.classList.remove("hidden");

        renderAgents();

    });

}


/* =========================================
   NEW CHAT
========================================= */

if (newChatBtn) {

    newChatBtn.addEventListener("click", () => {

        agentMemory[selectedAgent] = [];

        saveMemory();

        showWelcome();

        messageInput.value = "";

        messageInput.focus();

    });

}


/* =========================================
   WELCOME
========================================= */

function showWelcome() {

    messages.innerHTML = `
        <div class="welcome-message">

            <div class="agent-orb">
                AI
            </div>

            <h1>
                How can I help you?
            </h1>

            <p>
                Type a message or use the microphone.
            </p>

        </div>
    `;

}


/* =========================================
   LOAD MEMORY
========================================= */

function loadAgentMemory() {

    showWelcome();

    const memory =
        agentMemory[selectedAgent];

    if (!memory || memory.length === 0) {
        return;
    }

    memory.forEach(item => {

        addMessage(
            item.user,
            "user"
        );

        addMessage(
            item.assistant,
            "ai"
        );

    });

}


/* =========================================
   SAVE MEMORY
========================================= */

function saveMemory() {

    sessionStorage.setItem(
        "multiAgentMemory",
        JSON.stringify(agentMemory)
    );

}


/* =========================================
   ADD MEMORY
========================================= */

function addToMemory(
    userText,
    aiText
) {

    if (!agentMemory[selectedAgent]) {

        agentMemory[selectedAgent] = [];

    }

    agentMemory[selectedAgent].push({

        user: userText,

        assistant: aiText

    });


    if (
        agentMemory[selectedAgent].length > 10
    ) {

        agentMemory[selectedAgent] =
            agentMemory[selectedAgent].slice(-10);

    }

    saveMemory();

}


/* =========================================
   SEND MESSAGE
========================================= */

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        sendMessage
    );

}


if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


/* =========================================
   CHAT FUNCTION
========================================= */

async function sendMessage() {

    const text =
        messageInput.value.trim();


    if (!text) {
        return;
    }


    if (isGenerating) {
        return;
    }


    isGenerating = true;


    addMessage(
        text,
        "user"
    );


    messageInput.value = "";


    showTyping();


    try {

        /*
         * IMPORTANT:
         * Backend expects JSON.
         */

        const response =
            await fetch(
                `${API_URL}/chat`,
                {
                    method: "POST",

                    headers: {
                        "Accept":
                            "application/json",

                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        agent:
                            selectedAgent,

                        message:
                            buildMessageWithMemory(
                                text
                            ),

                        language:
                            languageSelect.value

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP Error " +
                response.status
            );

        }


        const data =
            await response.json();


        removeTyping();


        const answer =
            data.response ||
            "No response received.";


        await showResponse(
            answer
        );


        addToMemory(
            text,
            answer
        );


        saveRecentChat(
            text
        );


    } catch (error) {

        removeTyping();

        console.error(
            "CHAT ERROR:",
            error
        );


        addMessage(
            "AI connection error: " +
            error.message,
            "ai"
        );

    }


    isGenerating = false;

}


/* =========================================
   MEMORY PROMPT
========================================= */

function buildMessageWithMemory(
    currentMessage
) {

    const memory =
        agentMemory[selectedAgent] || [];


    if (memory.length === 0) {

        return currentMessage;

    }


    let prompt =
        "Previous conversation:\n\n";


    memory.forEach(item => {

        prompt +=
            "User: " +
            item.user +
            "\n";

        prompt +=
            "Assistant: " +
            item.assistant +
            "\n\n";

    });


    prompt +=
        "Current user message:\n" +
        currentMessage;


    return prompt;

}


/* =========================================
   AI RESPONSE
========================================= */

async function showResponse(
    text
) {

    const message =
        document.createElement("div");

    message.className =
        "message ai";


    const bubble =
        document.createElement("div");

    bubble.className =
        "message-bubble";


    message.appendChild(
        bubble
    );

    messages.appendChild(
        message
    );


    const words =
        text.split(" ");


    let output = "";


    for (
        let i = 0;
        i < words.length;
        i++
    ) {

        output +=
            (i === 0 ? "" : " ") +
            words[i];


        bubble.innerHTML =
            escapeHTML(output)
                .replace(
                    /\n/g,
                    "<br>"
                );


        messages.scrollTop =
            messages.scrollHeight;


        await sleep(10);

    }

}


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(
    text,
    type
) {

    const message =
        document.createElement("div");


    message.className =
        `message ${type}`;


    message.innerHTML = `
        <div class="message-bubble">
            ${escapeHTML(text)
                .replace(/\n/g, "<br>")}
        </div>
    `;


    messages.appendChild(
        message
    );


    messages.scrollTop =
        messages.scrollHeight;

}


/* =========================================
   FUTURISTIC AI AGENT THINKING / PROCESSING
========================================= */

const AGENT_THINKING_PROFILES = {
    "General AI": {
        tagline: "OMNI CORE",
        status: "PROCESSING REQUEST",
        colorClass: "theme-omni",
        iconHtml: `
            <div class="holo-avatar omni-avatar">
                <div class="holo-glow"></div>
                <div class="holo-ring ring-1"></div>
                <div class="holo-ring ring-2"></div>
                <div class="holo-core"></div>
                <div class="holo-spark s1"></div>
                <div class="holo-spark s2"></div>
            </div>`
    },
    "Coding Agent": {
        tagline: "CODE FORGE",
        status: "COMPILING SYNTAX",
        colorClass: "theme-code",
        iconHtml: `
            <div class="holo-avatar code-avatar">
                <div class="holo-glow"></div>
                <div class="code-matrix-box">
                    <span class="code-glyph">&lt;/&gt;</span>
                </div>
                <div class="holo-ring ring-code"></div>
                <div class="holo-spark s1"></div>
                <div class="holo-spark s2"></div>
            </div>`
    },
    "Study Agent": {
        tagline: "KNOWLEDGE CORE",
        status: "SYNTHESIZING KNOWLEDGE",
        colorClass: "theme-study",
        iconHtml: `
            <div class="holo-avatar study-avatar">
                <div class="holo-glow"></div>
                <div class="neural-lattice">
                    <span class="neural-node nn-1"></span>
                    <span class="neural-node nn-2"></span>
                    <span class="neural-node nn-3"></span>
                </div>
                <div class="holo-core gold-core"></div>
                <div class="holo-spark s1"></div>
                <div class="holo-spark s2"></div>
            </div>`
    },
    "Research Agent": {
        tagline: "INTELLECT ENGINE",
        status: "DEEP SCANNING",
        colorClass: "theme-research",
        iconHtml: `
            <div class="holo-avatar research-avatar">
                <div class="holo-glow"></div>
                <div class="radar-scan-circle">
                    <div class="radar-sweep-beam"></div>
                    <div class="radar-cross"></div>
                </div>
                <div class="holo-core sapphire-core"></div>
                <div class="holo-spark s1"></div>
            </div>`
    },
    "Creative Agent": {
        tagline: "CREATIVE MATRIX",
        status: "GENERATING IDEAS",
        colorClass: "theme-creative",
        iconHtml: `
            <div class="holo-avatar creative-avatar">
                <div class="holo-glow"></div>
                <div class="aurora-torus knot-1"></div>
                <div class="aurora-torus knot-2"></div>
                <div class="holo-core magenta-core"></div>
                <div class="holo-spark s1"></div>
                <div class="holo-spark s2"></div>
            </div>`
    },
    "Data Agent": {
        tagline: "DATA NEXUS",
        status: "ANALYZING DATA",
        colorClass: "theme-data",
        iconHtml: `
            <div class="holo-avatar data-avatar">
                <div class="holo-glow"></div>
                <div class="tesseract-cube">
                    <span class="tess-square t1"></span>
                    <span class="tess-square t2"></span>
                </div>
                <div class="holo-core cyan-core"></div>
                <div class="holo-spark s1"></div>
            </div>`
    }
};

function showTyping() {
    removeTyping();

    const profile = AGENT_THINKING_PROFILES[selectedAgent] || AGENT_THINKING_PROFILES["General AI"];

    const typing = document.createElement("div");
    typing.id = "typingIndicator";
    typing.className = `message ai thinking-indicator-container ${profile.colorClass}`;

    typing.innerHTML = `
        <div class="thinking-avatar-wrapper">
            ${profile.iconHtml}
        </div>
        <div class="message-bubble thinking-bubble">
            <div class="thinking-header">
                <span class="thinking-agent-name">${escapeHTML(selectedAgent.toUpperCase())}</span>
                <span class="thinking-separator">//</span>
                <span class="thinking-status">${escapeHTML(profile.status)}</span>
            </div>
            <div class="thinking-telemetry">
                <div class="thinking-waveform">
                    <span class="wave-bar wb-1"></span>
                    <span class="wave-bar wb-2"></span>
                    <span class="wave-bar wb-3"></span>
                    <span class="wave-bar wb-4"></span>
                    <span class="wave-bar wb-5"></span>
                </div>
                <span class="thinking-tagline">[ ${escapeHTML(profile.tagline)} ]</span>
            </div>
        </div>
    `;

    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typingIndicator");
    if (typing) {
        typing.remove();
    }
}


/* =========================================
   RECENT CHATS
========================================= */

function saveRecentChat(
    text
) {

    chatHistory.unshift({

        agent:
            selectedAgent,

        message:
            text,

        time:
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

    });


    chatHistory =
        chatHistory.slice(0, 20);


    localStorage.setItem(
        "multiAgentChatHistory",
        JSON.stringify(
            chatHistory
        )
    );


    renderRecentChats();

}


/* =========================================
   RENDER RECENT CHATS
========================================= */

function renderRecentChats() {

    if (!recentChats) {
        return;
    }


    recentChats.innerHTML = "";


    if (
        chatHistory.length === 0
    ) {

        recentChats.innerHTML = `
            <div class="no-recent">
                No recent chats
            </div>
        `;

        return;

    }


    chatHistory.forEach(chat => {

        const item =
            document.createElement("div");


        item.className =
            "recent-chat-item";


        item.innerHTML = `
            <strong>
                ${escapeHTML(chat.agent)}
            </strong>

            <p>
                ${escapeHTML(chat.message)}
            </p>

            <small>
                ${escapeHTML(chat.time)}
            </small>
        `;


        item.addEventListener(
            "click",
            () => {

                selectedAgent =
                    chat.agent;


                currentAgent.textContent =
                    chat.agent;


                loadAgentMemory();

            }
        );


        recentChats.appendChild(
            item
        );

    });

}


/* =========================================
   MICROPHONE
========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();


    recognition.continuous =
        false;


    recognition.interimResults =
        true;


    recognition.onstart = () => {

        isListening = true;


        micStatus.textContent =
            "🎙 Listening... Speak now";


        micBtn.style.transform =
            "scale(1.1)";

    };


    recognition.onresult =
        event => {

            let transcript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0]
                        .transcript;

            }


            messageInput.value =
                transcript;

        };


    recognition.onend = () => {

        isListening = false;


        micBtn.style.transform =
            "";


        micStatus.textContent =
            "";

    };


    recognition.onerror =
        event => {

            isListening = false;


            micBtn.style.transform =
                "";


            micStatus.textContent =
                "Microphone error: " +
                event.error;

        };


    micBtn.addEventListener(
        "click",
        () => {

            if (isListening) {

                recognition.stop();

                return;

            }


            recognition.lang =
                getSpeechLanguage(
                    languageSelect.value
                );


            try {

                recognition.start();

            } catch (error) {

                console.log(
                    "Microphone already running."
                );

            }

        }
    );


} else {

    micBtn.addEventListener(
        "click",
        () => {

            micStatus.textContent =
                "Speech recognition is not supported in this browser.";

        }
    );

}


/* =========================================
   SPEECH LANGUAGE
========================================= */

function getSpeechLanguage(
    language
) {

    const languages = {

        English: "en-IN",

        Telugu: "te-IN",

        Hindi: "hi-IN",

        Tamil: "ta-IN",

        Kannada: "kn-IN",

        Malayalam: "ml-IN",

        Bengali: "bn-IN",

        Marathi: "mr-IN",

        Spanish: "es-ES",

        French: "fr-FR"

    };


    return languages[language] ||
        "en-IN";

}


/* =========================================
   EDIT BUTTON
========================================= */

if (editBtn) {

    editBtn.addEventListener(
        "click",
        () => {

            messageInput.focus();

            messageInput.select();

        }
    );

}


/* =========================================
   LANGUAGE
========================================= */

if (languageSelect) {

    languageSelect.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "aiLanguage",
                languageSelect.value
            );


            micStatus.textContent =
                "Language changed to " +
                languageSelect.value;


            setTimeout(
                () => {

                    micStatus.textContent =
                        "";

                },
                1500
            );

        }
    );

}


/* =========================================
   UTILITY
========================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


function sleep(
    milliseconds
) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                milliseconds
            )
    );

}


/* =========================================
   START
========================================= */

const savedLanguage =
    localStorage.getItem(
        "aiLanguage"
    );


if (
    savedLanguage &&
    languageSelect
) {

    languageSelect.value =
        savedLanguage;

}


renderAgents();

renderRecentChats();