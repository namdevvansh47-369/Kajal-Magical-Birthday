
// ======================================
// KAJAL'S MAGICAL BIRTHDAY WEBSITE
// ======================================

// 1. ELEMENTS
const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const nextQuestionBtn = document.getElementById("nextQuestion");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const quizResult = document.getElementById("quizResult");
const wishBtn = document.getElementById("wishBtn");
const finalMessage = document.getElementById("finalMessage");

// 2. FLOATING HEARTS
function createHeart() {
    const heart = document.createElement("div");

    heart.className = "heart";
    heart.textContent = ["💗", "💕", "💖", "✨", "🌸"][
        Math.floor(Math.random() * 5)
    ];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 3000);
}

// 3. START SURPRISE
startBtn.addEventListener("click", () => {
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 100);
    }

    document.getElementById("memories").scrollIntoView({
        behavior: "smooth"
    });
});

// 4. FUN QUIZ
const questions = [
    {
        question: "Who is the most dramatic person? 😂",
        answers: ["Me, obviously 😂", "Kajal herself 😎", "Both of us 🤣"],
        result: "Correct answer: BOTH! Drama toh banta hai! 🤣"
    },
    {
        question: "Who gives the best advice?",
        answers: ["Kajal 💗", "Me 😎", "Google 😂"],
        result: "Kajal is always the best advice partner! 💕"
    },
    {
        question: "What is our favourite activity?",
        answers: ["Laughing together 😂", "Fighting for no reason 🤣", "Both of these!"],
        result: "Of course, both! That's our special bond! ❤️"
    },
    {
        question: "Who is the luckiest person?",
        answers: ["Kajal 🌸", "Her favourite brother 🥰", "Both of us 💖"],
        result: "Both! Because we have each other! 🥹"
    }
];

let currentQuestion = 0;
let answerSelected = false;

function showQuestion() {
    const q = questions[currentQuestion];

    questionElement.textContent = q.question;
    quizResult.textContent = "";
    answersContainer.innerHTML = "";
    answerSelected = false;

    q.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {
            if (answerSelected) return;

            answerSelected = true;
            quizResult.textContent = q.result;

            button.style.background = "#bd55a5";

            answersContainer.querySelectorAll("button").forEach(btn => {
                btn.disabled = true;
            });

            nextQuestionBtn.textContent =
                currentQuestion === questions.length - 1
                ? "Finish Quiz 🎉"
                : "Next Question →";
        });

        answersContainer.appendChild(button);
    });

    nextQuestionBtn.textContent = "Choose an answer first!";
}

nextQuestionBtn.addEventListener("click", () => {
    if (!answerSelected) {
        quizResult.textContent = "Pehle ek answer choose karo! 😄";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionElement.textContent = "Quiz Completed! 🎉";
        answersContainer.innerHTML = "";
        quizResult.textContent =
            "Congratulations Kajal! You know your favourite brother! ❤️";
        nextQuestionBtn.style.display = "none";
    }
});

// 5. BIRTHDAY CELEBRATION
function celebrate() {
    const emojis = ["🎉", "🎊", "💖", "🌸", "✨", "💕", "🎂"];

    for (let i = 0; i < 65; i++) {
        setTimeout(() => {
            const item = document.createElement("div");

            item.className = "heart";
            item.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            item.style.left = Math.random() * 100 + "vw";
            item.style.bottom = "-40px";
            item.style.fontSize = (Math.random() * 25 + 18) + "px";

            document.body.appendChild(item);

            setTimeout(() => item.remove(), 3500);
        }, i * 45);
    }
}

wishBtn.addEventListener("click", () => {
    finalMessage.textContent =
        "Happy Birthday Kajal! May your life always sparkle with happiness! ❤️🎂";

    celebrate();
    wishBtn.textContent = "Yay! Happy Birthday! 💗";
    wishBtn.disabled = true;
});

// 6. ACTUAL BIRTHDAY BACKGROUND MUSIC

const birthdayAudio = new Audio("assest/music/birthday.mp3");

birthdayAudio.loop = true;
birthdayAudio.volume = 0.4;

musicBtn.addEventListener("click", async () => {
    try {
        if (birthdayAudio.paused) {
            await birthdayAudio.play();
            musicBtn.textContent = "♫ Playing";
        } else {
            birthdayAudio.pause();
            musicBtn.textContent = "♫ Music";
        }
    } catch (error) {
        console.error("Music playback failed:", error);
        alert("Music play nahi ho raha. MP3 file check karo.");
    }
});

document.addEventListener("click", async function startMusicOnce() {
    if (birthdayAudio.paused) {
        try {
            await birthdayAudio.play();
            musicBtn.textContent = "♫ Playing";
        } catch (error) {
            console.log("Music could not start:", error);
        }
    }

    document.removeEventListener("click", startMusicOnce);
}, { once: true });



// 7. INITIALIZE QUIZ
showQuestion();

console.log("Kajal's Magical Birthday Website is ready! ❤️");
