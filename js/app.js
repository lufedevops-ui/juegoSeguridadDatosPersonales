// D:\enviromentDev\Proyects\html\5\Data\src\js\app.js
// Control principal del flujo del juego: inicio, preguntas y resultados.

import { loadQuestions } from "./dataLoader.js";

// ⚙️ Arranque automático
document.addEventListener("DOMContentLoaded", initGame);

import { handleOptionSelection } from "./ ui.js";

let questions = [];
let currentIndex = 0;
let score = 0;

// 🔗 Referencias a los elementos del DOM
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumberEl = document.getElementById("question-number");
const questionImgEl = document.getElementById("question-img");
const questionTextEl = document.getElementById("question-text");
const optionsContainer = document.querySelector(".options");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");

// 🚀 Inicialización del juego
async function initGame() {
    questions = await loadQuestions();
    if (questions.length === 0) {
        alert("No se pudieron cargar las preguntas. Verifica el archivo JSON.");
        return;
    }

    startBtn.addEventListener("click", startGame);
    nextBtn.addEventListener("click", handleNext);
    restartBtn.addEventListener("click", restartGame);
}

// 🟢 Iniciar juego
function startGame() {
    startScreen.style.display = "none";
    resultScreen.style.display = "none";
    gameScreen.style.display = "block";

    currentIndex = 0;
    score = 0;

    showQuestion();
}

// 🧩 Mostrar una pregunta
function showQuestion() {
    const question = questions[currentIndex];

    // Actualiza encabezado
    questionNumberEl.textContent = `Pregunta ${currentIndex + 1} de ${questions.length}`;
    scoreEl.textContent = `Puntaje: ${score}`;

    // Aplica color de fondo personalizado
    gameScreen.style.backgroundColor = question.backgroundColor || "#ffffff";

    // Carga imagen y texto
    questionImgEl.src = question.image;
    questionImgEl.alt = `Imagen de la pregunta ${currentIndex + 1}`;
    questionTextEl.textContent = question.question;

    // Genera opciones
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option;
        btn.addEventListener("click", () => handleAnswer(index));
        optionsContainer.appendChild(btn);
    });

    nextBtn.disabled = true;
}

// ✅ Validar respuesta seleccionada
function handleAnswer(selectedIndex) {
    const question = questions[currentIndex];
    const buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((btn, index) => {
        if (index === question.correctAnswer) {
            btn.classList.add("correct");
        } else if (index === selectedIndex) {
            btn.classList.add("incorrect");
        }
        btn.disabled = true;
    });

    if (selectedIndex === question.correctAnswer) {
        score += 10;
    }

    scoreEl.textContent = `Puntaje: ${score}`;
    nextBtn.disabled = false;
}

// ⏭ Pasar a la siguiente pregunta
function handleNext() {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// 🏁 Mostrar resultados finales
function showResults() {
    gameScreen.style.display = "none";
    resultScreen.style.display = "block";
    finalScoreEl.textContent = `Tu puntaje final es: ${score}`;
}

// 🔁 Reiniciar juego
function restartGame() {
    resultScreen.style.display = "none";
    startScreen.style.display = "block";
}



