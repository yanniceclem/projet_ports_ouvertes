const quizData = {
    "Section 1: Intérêts et préférences générales": [
        "Aimes-tu résoudre des problèmes de logique ou de programmation ?",
        "Préfères-tu travailler avec du matériel réseau ou avec du code ?",
        "Es-tu plus à l’aise avec l’écriture de scripts ou avec la configuration de serveurs ?",
        "Aimes-tu créer des interfaces graphiques pour des applications ?",
    ],
    "Section 2: Connaissances de base (évaluation technique)": [
        "Peux-tu expliquer ce qu’est un algorithme et donner un exemple ?",
        "Peux-tu définir le rôle d’un routeur dans un réseau ?",
        "Sais-tu ce qu’est une base de données relationnelle ? Peux-tu citer un exemple ?"
    ]
    // Ajouter les autres sections ici...
};

let sectionIterator = Object.entries(quizData)[Symbol.iterator]();
let currentSectionData = sectionIterator.next();
let currentSection = currentSectionData.value[0];
let questions = currentSectionData.value[1];
let currentQuestionIndex = 0;
let responses = {};

const sectionTitle = document.getElementById("section-title");
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const nextButton = document.getElementById("next-button");

function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        sectionTitle.textContent = currentSection;
        questionElement.textContent = questions[currentQuestionIndex];
    } else {
        currentSectionData = sectionIterator.next();
        if (!currentSectionData.done) {
            currentSection = currentSectionData.value[0];
            questions = currentSectionData.value[1];
            currentQuestionIndex = 0;
            showNextQuestion();
        } else {
            showResults();
        }
    }
}

function storeAnswer() {
    const answer = answerInput.value.trim();
    if (answer) {
        const question = questions[currentQuestionIndex];
        responses[question] = answer;
        currentQuestionIndex++;
        answerInput.value = "";
        showNextQuestion();
    } else {
        alert("Veuillez entrer une réponse.");
    }
}

function showResults() {
    let resultMessage = "Merci d'avoir participé au quiz !\n\n";
    for (const [question, answer] of Object.entries(responses)) {
        resultMessage += `${question}\nVotre réponse : ${answer}\n\n`;
    }
    alert(resultMessage);
    location.reload();  // Redémarre le quiz
}

nextButton.addEventListener("click", storeAnswer);
showNextQuestion();
