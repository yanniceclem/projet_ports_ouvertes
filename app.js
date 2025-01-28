// Liste des questions avec explications
const questions = [
  {
    question: "Que signifie BTS SIO ?",
    options: ["Services Informatiques aux Organisations", "Systèmes Internes et Organisationnels", "Solutions Informatiques et Opérations"],
    correct: 0,
    explanation: "BTS SIO signifie 'Services Informatiques aux Organisations'."
  },
  {
    question: "Quel langage est utilisé pour le développement web front-end ?",
    options: ["Python", "Java", "HTML"],
    correct: 2,
    explanation: "HTML est utilisé pour structurer les pages web."
  },
  {
    question: "Quelle commande SQL permet de récupérer des données ?",
    options: ["INSERT","SELECT", "DELETE"],
    correct: 1,
    explanation: "'SELECT' permet de récupérer des données d'une table."
  },
  {
    question: "Que signifie HTTP ?",
    options: ["High Transfer Text Protocol","HyperText Transfer Protocol", "HyperText Translation Protocol"],
    correct: 1,
    explanation: "HTTP est le protocole de communication pour le web."
  },
  {
    question: "Quel est l'objectif principal d'une fonction en programmation ?",
    options: ["Afficher des données", "Supprimer des données","Réutiliser du code"],
    correct: 2,
    explanation: "Les fonctions permettent de réutiliser du code."
  },
  {
    question: "Qu'est-ce qu'une clé primaire dans une base de données ?",
    options: ["Identifie chaque ligne de manière unique", "Une commande SQL", "Une clé secondaire"],
    correct: 0,
    explanation: "La clé primaire identifie chaque enregistrement de manière unique."
  },
  {
    question: "Quelle est la syntaxe correcte pour une condition en JavaScript ?",
    options: ["if (x > 5)", "if x > 5 then", "if x > 5"],
    correct: 0,
    explanation: "'if (x > 5)' est la bonne syntaxe en JavaScript."
  },
  {
    question: "Que signifie CSS ?",
    options: ["Cascading Style Sheets", "Computer Styling System", "Color and Style Selector"],
    correct: 0,
    explanation: "CSS signifie 'Cascading Style Sheets'."
  },
  {
    question: "Quelle balise est utilisée pour insérer une image en HTML ?",
    options: ["<image>","<img>", "<picture>"],
    correct: 1,
    explanation: "La balise <img> permet d'insérer une image."
  },
  {
    question: "Quel langage est principalement utilisé pour gérer les bases de données relationnelles ?",
    options: ["PHP", "Java", "SQL"],
    correct: 2,
    explanation: "SQL est le langage standard pour gérer les bases relationnelles."
  },
  {
    question: "Qu'est-ce qu'une API ?",
    options: ["Un moyen d'interagir avec un logiciel", "Un type de base de données", "Une bibliothèque CSS"],
    correct: 0,
    explanation: "Une API permet d'interagir avec un logiciel ou un service."
  },
  {
    question: "Qu'est-ce qu'un algorithme ?",
    options: ["Une base de données", "Un langage de programmation", "Une suite d'instructions"],
    correct: 2,
    explanation: "Un algorithme est une suite d'instructions permettant de résoudre un problème."
  },
  {
    question: "Quelle méthode permet d'ajouter un élément à un tableau en JavaScript ?",
    options: ["add()", "insert()", "push()"],
    correct: 2,
    explanation: "'push()' permet d'ajouter un élément à la fin d'un tableau."
  },
  {
    question: "Que signifie SQL ?",
    options: ["System Query Language", "Structured Query Language", "Sorted Query Language"],
    correct: 1,
    explanation: "SQL signifie 'Structured Query Language'."
  },
  {
    question: "Qu'est-ce qu'une clé étrangère en base de données ?",
    options: ["Une commande SQL", "Une clé qui relie deux tables", "Une colonne unique"],
    correct: 1,
    explanation: "Une clé étrangère est utilisée pour relier deux tables."
  },
  {
    question: "Que signifie JSON ?",
    options: ["JavaScript Object Notation", "Java Object Network", "JavaScript Online Node"],
    correct: 0,
    explanation: "JSON signifie 'JavaScript Object Notation', un format d'échange de données."
  },
  {
    question: "Quel protocole est utilisé pour sécuriser les communications web ?",
    options: ["HTTP", "HTTPS", "FTP"],
    correct: 1,
    explanation: "'HTTPS' garantit une communication chiffrée."
  },
  {
    question: "Quel langage est utilisé pour créer des applications mobiles natives Android ?",
    options: ["Java", "Swift", "Python"],
    correct: 0,
    explanation: "Java est le langage de base pour les applications Android."
  },
  {
    question: "Quelle méthode permet de récupérer un élément HTML en JavaScript ?",
    options: ["querySelectorAll", "fetch()", "getElementById"],
    correct: 2,
    explanation: "'getElementById' récupère un élément HTML par son ID."
  },
  {
    question: "Quelle balise est utilisée pour les titres en HTML ?",
    options: ["<h1> à <h6>", "<header>", "<title>"],
    correct: 0,
    explanation: "Les balises <h1> à <h6> définissent des titres dans une page HTML."
  }
];

// Variables globales
let currentQuestion = 0;
let score = 0;
let userName = "";
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Sélection des éléments DOM
const userInfoForm = document.getElementById("user-info-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const startBtn = document.getElementById("start-btn");

const quizContainer = document.getElementById("quiz-container");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const feedbackEl = document.querySelector(".feedback");
const explanationEl = document.querySelector(".explanation");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");
const restartBtn = document.getElementById("restart-btn");
const leaderboardEl = document.getElementById("leaderboard");
const resetLeaderboardBtn = document.getElementById("reset-leaderboard-btn");
const progressCounter = document.getElementById("progress-counter");
const progressBar = document.getElementById("progress-bar");
const finalMessageContainer = document.getElementById("final-message");
const finalScoreEl = document.getElementById("final-score");
const scoreMessageEl = document.getElementById("score-message");

// Met à jour le compteur et la barre de progression
function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressCounter.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
}

// Afficher une question
function showQuestion() {
  quizContainer.classList.remove("hidden");
  finalMessageContainer.classList.add("hidden");

  const question = questions[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  explanationEl.style.display = "none";
  nextBtn.style.display = "none";
  updateProgress();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => handleAnswer(index, button);
    optionsEl.appendChild(button);
  });
}

// Gérer les réponses
function handleAnswer(selected, buttonClicked) {
  const question = questions[currentQuestion];
  const buttons = document.querySelectorAll(".options button");

  buttons.forEach(btn => (btn.disabled = true));

  if (selected === question.correct) {
    buttonClicked.classList.add("correct");
    score++;
    feedbackEl.textContent = "Bonne réponse !";
    feedbackEl.style.color = "green";
  } else {
    buttonClicked.classList.add("incorrect");
    buttons[question.correct].classList.add("correct");
    feedbackEl.textContent = "Mauvaise réponse.";
    feedbackEl.style.color = "red";
  }

  explanationEl.textContent = question.explanation;
  explanationEl.style.display = "block";
  nextBtn.style.display = "inline-block";
}

// Passer à la question suivante
function goToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Afficher le message final
function showFinalMessage() {
  let message;
  if (score >= questions.length * 0.8) {
    message = "Bravo ! Vous êtes un expert !";
  } else if (score >= questions.length * 0.5) {
    message = "Bien joué ! Vous pouvez encore progresser.";
  } else {
    message = "Ne vous découragez pas, continuez à apprendre !";
  }

  scoreMessageEl.textContent = message;
  finalScoreEl.textContent = `Votre score final : ${score}/${questions.length}`;
}

// Terminer le quiz
function endQuiz() {
  leaderboard.push({ name: userName, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  quizContainer.classList.add("hidden");
  showLeaderboard();
  showFinalMessage();
  finalMessageContainer.classList.remove("hidden");
}


// Réinitialiser le quiz
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  userInfoForm.style.display = "none";
  finalMessageContainer.classList.add("hidden");
  showQuestion();
}

// Réinitialiser le classement
function resetLeaderboard() {
  localStorage.removeItem("leaderboard");
  leaderboard.length = 0;
  showLeaderboard();
}

// Afficher le classement
function showLeaderboard() {
  leaderboardEl.innerHTML = leaderboard.length
    ? leaderboard
        .map((entry, index) => `<li>#${index + 1} - ${entry.name}: ${entry.score} points</li>`)
        .join("")
    : "<li>Pas encore de résultats.</li>";
}

// Démarrer le quiz
function startQuiz() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  if (!firstName || !lastName) {
    alert("Veuillez entrer votre prénom et nom pour commencer !");
    return;
  }
  userName = `${firstName} ${lastName}`;
  userInfoForm.style.display = "none";
  showQuestion();
}

// Gestion des événements
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", goToNextQuestion);
retryBtn.addEventListener("click", resetQuiz);
restartBtn.addEventListener("click", resetQuiz);
resetLeaderboardBtn.addEventListener("click", resetLeaderboard);


// Initialisation
document.addEventListener("DOMContentLoaded", showLeaderboard);