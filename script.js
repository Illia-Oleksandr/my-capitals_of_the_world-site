const questions = [
    { country: "France", capital: "Paris", image: "images/Paris.png" },
    { country: "Japan", capital: "Tokyo", image: "images/Tokyo.png" },
    { country: "Brazil", capital: "Brasilia", image: "images/Brasilia.png" },
    { country: "Canada", capital: "Ottawa", image: "images/Ottawa.png" },
    { country: "Australia", capital: "Canberra", image: "images/Canberra.png" },
    { country: "Germany", capital: "Berlin", image: "images/Berlin.png" },
    { country: "India", capital: "New Delhi", image: "images/New-Delhi.png" },
    { country: "China", capital: "Beijing", image: "images/Beijing.png" },
    { country: "Italy", capital: "Rome", image: "images/Rome.png" },
    { country: "United Kingdom", capital: "London", image: "images/London.png" },
    { country: "Mexico", capital: "Mexico", image: "images/Mexico.png" },
    { country: "South Africa", capital: "Pretoria", image: "images/Pretoria.png" },
    { country: "South Korea", capital: "Seoul", image: "images/Seoul.png" },
    { country: "Egypt", capital: "Cairo", image: "images/Cairo.png" },
    { country: "Turkey", capital: "Ankara", image: "images/Ankara.png" }
];

let currentQuestionIndex = 0;
let nextQuestionTimeout;
let correctAnswers = 0;
let incorrectAnswers = 0;

document.addEventListener("DOMContentLoaded", () => {
    preloadImages();
    showQuestion();
    document.getElementById("answer").addEventListener("keypress", handleKeyPress);
    document.getElementById("answer").focus();
});

function preloadImages() {
    questions.forEach(question => {
        const img = new Image();
        img.src = question.image;
    });
}

function showQuestion() {
    const questionElement = document.getElementById("question");
    questionElement.innerText = `What is the capital of ${questions[currentQuestionIndex].country}?`;
    document.getElementById("answer").value = "";
    document.getElementById("answer").disabled = false;
    document.getElementById("result").innerText = "";
    const img = document.getElementById("capital-image");
    img.src = questions[currentQuestionIndex].image;
    document.getElementById("next-button").style.display = "none";
    document.getElementById("answer").focus();
    updateScore();
}

function checkAnswer() {
    const answer = document.getElementById("answer").value.trim();
    const resultElement = document.getElementById("result");

    if (answer.toLowerCase() === questions[currentQuestionIndex].capital.toLowerCase()) {
        resultElement.innerText = "Correct!";
        resultElement.style.color = "green";
        document.getElementById("next-button").style.display = "block";
        document.getElementById("answer").disabled = true;
        correctAnswers++;
        nextQuestionTimeout = setTimeout(nextQuestion, 3000);
    } else {
        resultElement.innerText = "Incorrect, try again.";
        resultElement.style.color = "red";
        incorrectAnswers++;
    }
    updateScore();
}

function nextQuestion() {
    clearTimeout(nextQuestionTimeout);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        if (document.getElementById("next-button").style.display === "block") {
            nextQuestion();
        } else {
            checkAnswer();
        }
    }
}

function showResults() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <div id="results-container">
            <h2>Results</h2>
            <p>Correct answers: ${correctAnswers}</p>
            <p>Incorrect answers: ${incorrectAnswers}</p>
            <button onclick="restartQuiz()">Restart Quiz</button>
        </div>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    showQuestion();
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerHTML = `
        <p>Correct answers: ${correctAnswers}</p>
        <p>Incorrect answers: ${incorrectAnswers}</p>
    `;
}
