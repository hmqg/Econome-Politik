const elements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

elements.forEach(el => observer.observe(el));







const questions = [
  {
    q: "Was ist ein Zoll?",
    a: [
      "Eine Steuer auf importierte Waren",
      "Eine Abgabe auf importierte oder exportierte Waren",
      "Eine Gebühr für Reisepässe"
    ],
    c: 1
  },
  {
    q: "Warum erheben Staaten Zölle?",
    a: [
      "Um die Umwelt zu schützen",
      "Um heimische Wirtschaft zu schützen",
      "Um Tourismus zu fördern"
    ],
    c: 1
  },
  {
    q: "Was ist ein Vorteil der Globalisierung?",
    a: [
      "Günstigere Produkte",
      "Weniger Auswahl",
      "Keine internationalen Lieferketten"
    ],
    c: 0
  },
  {
    q: "Was passiert oft in Handelskonflikten?",
    a: [
      "Länder erhöhen gegenseitig Zölle",
      "Länder schenken sich Waren",
      "Länder stoppen alle Exporte"
    ],
    c: 0
  },
  {
    q: "Was bedeutet Import?",
    a: [
      "Waren ins Land bringen",
      "Waren aus dem Land bringen",
      "Waren verschenken"
    ],
    c: 0
  },
  {
    q: "Was bedeutet Export?",
    a: [
      "Waren ins Land bringen",
      "Waren aus dem Land verkaufen",
      "Waren lagern"
    ],
    c: 1
  },
  {
    q: "Wer entscheidet in der EU über Zölle?",
    a: [
      "Die EU-Kommission",
      "Jedes Land einzeln",
      "Die UNO"
    ],
    c: 0
  },
  {
    q: "Was ist ein Nachteil der Globalisierung?",
    a: [
      "Mehr Auswahl",
      "Umweltbelastung durch Transporte",
      "Günstigere Produkte"
    ],
    c: 1
  },
  {
    q: "Was ist Protektionismus?",
    a: [
      "Schutz der eigenen Wirtschaft",
      "Förderung von Importen",
      "Abschaffung aller Zölle"
    ],
    c: 0
  },
  {
    q: "Was ist ein Handelsabkommen?",
    a: [
      "Ein Vertrag über Handel zwischen Ländern",
      "Ein Gesetz über Steuern",
      "Ein Vertrag über Tourismus"
    ],
    c: 0
  }
];

let index = 0;
let userAnswers = new Array(questions.length).fill(null);

function loadQuestion() {
  const q = questions[index];
  const quizDiv = document.getElementById("quizContent");

  document.getElementById("progressBar").style.width =
    (index / questions.length) * 100 + "%";

  quizDiv.innerHTML = `
    <p class="question">Frage ${index + 1} von ${questions.length}</p>
    <p class="question">${q.q}</p>

    <div class="answers">
      ${q.a.map((ans, i) => `
        <label>
          <input type="radio" name="answer" value="${i}"
            ${userAnswers[index] === i ? "checked" : ""}>
          ${ans}
        </label>
      `).join("")}
    </div>

    <div style="display:flex; justify-content:space-between; margin-top:25px;">
      <button class="btn-next" onclick="prevQuestion()" 
        ${index === 0 ? "disabled" : ""}>
        Zurück
      </button>

      <button class="btn-next" onclick="nextQuestion()">
        ${index === questions.length - 1 ? "Ergebnis anzeigen" : "Weiter"}
      </button>
    </div>
  `;
}

function nextQuestion() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) {
    alert("Bitte eine Antwort auswählen!");
    return;
  }

  userAnswers[index] = Number(selected.value);

  if (index < questions.length - 1) {
    index++;
    loadQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (index > 0) {
    index--;
    loadQuestion();
  }
}

function showResult() {
  let score = 0;

  userAnswers.forEach((answer, i) => {
    if (answer === questions[i].c) {
      score++;
    }
  });

  document.getElementById("progressBar").style.width = "100%";

  document.getElementById("quizContent").innerHTML = `
    <h2>Quiz beendet!</h2>
    <p id="result">
      Du hast ${score} von ${questions.length} Punkten erreicht!
    </p>
    <button class="btn-next" onclick="restartQuiz()">
      Quiz neu starten
    </button>
  `;
}

function restartQuiz() {
  index = 0;
  userAnswers = new Array(questions.length).fill(null);
  document.getElementById("progressBar").style.width = "0%";
  loadQuestion();
}

loadQuestion();