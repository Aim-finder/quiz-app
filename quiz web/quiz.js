// ---- settings coming from the home page ----
const timerEnabled = localStorage.getItem('timer') === 'yes';
const requestedCount = parseInt(localStorage.getItem('count')) || questions.length;
const TIME_PER_QUESTION = 30; // seconds, only used when timer is enabled

// ---- pick a random subset of the requested size (capped to what's available) ----
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const quizQuestions = shuffle(questions).slice(0, Math.min(requestedCount, questions.length));

let current = 0;
let correctCount = 0;
let incorrectCount = 0;
let selected = null;
let questionStartTime = null;
let countdown = null;
let timeLeft = TIME_PER_QUESTION;
const times = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const confirmBtn = document.getElementById("confirm");
const timerEl = document.getElementById("timer");

function loadQuestion() {
  const q = quizQuestions[current];

  questionEl.innerText = q.question;
  progressEl.innerText = `Question ${current + 1} / ${quizQuestions.length}`;

  optionsEl.innerHTML = "";
  selected = null;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      document.querySelectorAll("#options button").forEach(b => {
        b.classList.remove("selected");
      });
      btn.classList.add("selected");
      selected = i;
    };

    optionsEl.appendChild(btn);
  });

  questionStartTime = Date.now();
  clearInterval(countdown);

  if (timerEnabled) {
    timeLeft = TIME_PER_QUESTION;
    timerEl.innerText = `Time left: ${timeLeft}s`;

    countdown = setInterval(() => {
      timeLeft--;
      timerEl.innerText = `Time left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        handleConfirm(true); // auto-advance, counts as incorrect
      }
    }, 1000);
  } else {
    timerEl.innerText = "";
  }
}

function handleConfirm(timedOut = false) {
  if (!timedOut && selected === null) return; // must pick an option first

  clearInterval(countdown);

  const elapsedSeconds = Math.round((Date.now() - questionStartTime) / 1000);
  times.push({ question: quizQuestions[current].question, time: elapsedSeconds });

  if (!timedOut && selected === quizQuestions[current].answer) {
    correctCount++;
  } else {
    incorrectCount++;
  }

  current++;

  if (current < quizQuestions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

confirmBtn.onclick = () => handleConfirm(false);

function finishQuiz() {
  localStorage.setItem('correct', correctCount);
  localStorage.setItem('incorrect', incorrectCount);
  localStorage.setItem('times', JSON.stringify(times));
  window.location.href = "result.html";
}

loadQuestion();
