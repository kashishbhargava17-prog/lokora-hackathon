// ===============================
// LOKVAANI — INTERACTIVE LANGUAGE
// ===============================

const content = [
  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A warm everyday Marathi word meaning mother. Hear it spoken and learn how it is used.",
    verified: "Community demo"
  },
  {
    id: 2,
    type: "word",
    icon: "📚",
    title: "Namaskar",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A respectful greeting used in Marathi and several other Indian languages.",
    verified: "Heritage demo"
  },
  {
    id: 3,
    type: "proverb",
    icon: "💬",
    title: "A village proverb",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A traditional saying shared through generations, carrying advice and local wisdom.",
    verified: "Community demo"
  },
  {
    id: 4,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk story demonstrating how oral storytelling can pass knowledge between generations.",
    verified: "Prototype"
  },
  {
    id: 5,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-music tradition connected with travelling singers, philosophy and oral expression.",
    verified: "Review needed"
  },
  {
    id: 6,
    type: "phrase",
    icon: "🔊",
    title: "Everyday Marathi Phrase",
    region: "Maharashtra",
    language: "Marathi",
    desc: "Learn how a commonly spoken phrase sounds and when people use it in conversation.",
    verified: "Community demo"
  },
  {
    id: 7,
    type: "word",
    icon: "🌾",
    title: "Lok",
    region: "West Bengal",
    language: "Bengali",
    desc: "A word connected with people and community, showing how language carries cultural meaning.",
    verified: "Heritage demo"
  },
  {
    id: 8,
    type: "story",
    icon: "👵",
    title: "Grandmother's Story",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A prototype oral-history entry showing how family stories can be preserved for younger generations.",
    verified: "Prototype"
  }
];


// ===============================
// QUIZ
// ===============================

const quiz = [
  {
    q: "Which feature best preserves the way a traditional word is spoken?",
    options: [
      "A consented audio recording",
      "Only a picture",
      "A colour theme",
      "A leaderboard"
    ],
    correct: 0
  },
  {
    q: "What is the best process for a community contribution?",
    options: [
      "Publish immediately",
      "Submit → Review → Validate → Preserve",
      "Delete every submission",
      "Hide all contributions"
    ],
    correct: 1
  },
  {
    q: "What makes a folk story useful for language learning?",
    options: [
      "Meaning + context + story + listening",
      "Only the title",
      "Only a picture",
      "Only a score"
    ],
    correct: 0
  }
];

let currentQuiz = 0;
let score = 0;

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);


// ===============================
// BASIC HELPERS
// ===============================

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


// ===============================
// SPEECH / LISTENING
// ===============================

function speak(text) {

  if (!("speechSynthesis" in window)) {
    showToast("Your browser does not support voice playback.");
    return;
  }

  speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(text);

  voice.rate = 0.8;
  voice.pitch = 1;

  speechSynthesis.speak(voice);

  showToast("🔊 Playing demo pronunciation...");
}


// ===============================
// EXPLORE CONTENT
// ===============================

function renderContent() {

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");
  const contentGrid = document.getElementById("contentGrid");

  if (!searchInput || !typeFilter || !regionFilter || !contentGrid) {
    return;
  }

  const search = searchInput.value.toLowerCase().trim();
  const type = typeFilter.value;
  const region = regionFilter.value;

  const items = content.filter(item => {

    const matchesSearch =
      `${item.title} ${item.language} ${item.region} ${item.desc}`
        .toLowerCase()
        .includes(search);

    const matchesType =
      type === "all" || item.type === type;

    const matchesRegion =
      region === "all" || item.region === region;

    return matchesSearch && matchesType && matchesRegion;
  });


  if (!items.length) {

    contentGrid.innerHTML = `
      <div class="content-card empty-card">
        <h3>No matches found</h3>
        <p>Try another word, language or region.</p>
      </div>
    `;

    return;
  }


  contentGrid.innerHTML = items.map(item => {

    let button = "";

    if (item.type === "word" || item.type === "phrase") {

      button = `
        <button
          class="audio-btn"
          onclick="speak('${item.title} — ${item.desc}')">
          🔊 Listen
        </button>
      `;

    } else if (item.type === "story") {

      button = `
        <button
          class="audio-btn"
          onclick="openStory(${item.id})">
          📖 Open story
        </button>
      `;

    } else if (item.type === "song") {

      button = `
        <button
          class="audio-btn"
          onclick="playSongDemo(${item.id})">
          🎵 Listen
        </button>
      `;

    } else if (item.type === "proverb") {

      button = `
        <button
          class="audio-btn"
          onclick="openProverb(${item.id})">
          💬 Explore
        </button>
      `;

    }


    return `
      <article class="content-card">

        <div class="card-icon">
          ${item.icon}
        </div>

        <span class="tag">
          ${item.type}
        </span>

        <h3>${item.title}</h3>

        <p>
          ${item.language} • ${item.region}
        </p>

        <p>
          ${item.desc}
        </p>

        <div class="card-bottom">

          <span class="verified">
            ✓ ${item.verified}
          </span>

          ${button}

        </div>

      </article>
    `;

  }).join("");
}


// ===============================
// VIEW ALL
// ===============================

function viewAllContent() {

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");

  if (searchInput) {
    searchInput.value = "";
  }

  if (typeFilter) {
    typeFilter.value = "all";
  }

  if (regionFilter) {
    regionFilter.value = "all";
  }

  renderContent();

  document.getElementById("explore")?.scrollIntoView({
    behavior: "smooth"
  });
}


// ===============================
// STORIES
// ===============================

function openStory(id) {

  const story = content.find(item => item.id === id);

  if (!story) return;

  const message =
    `The Clever Farmer is a demo folk story lesson. ` +
    `This story teaches how oral storytelling can preserve ` +
    `language, values and local knowledge across generations.`;

  showToast("📖 Story opened");

  setTimeout(() => {
    alert(message);
  }, 150);
}


// ===============================
// FOLK SONGS
// ===============================

function playSongDemo(id) {

  const song = content.find(item => item.id === id);

  if (!song) return;

  speak(
    "This is a demonstration of a folk song entry. " +
    "Real deployments can connect a consented community recording here."
  );
}


// ===============================
// PROVERBS
// ===============================

function openProverb(id) {

  const proverb = content.find(item => item.id === id);

  if (!proverb) return;

  alert(
    "PROVERB ACTIVITY\n\n" +
    "Think about a situation where traditional advice " +
    "could help solve a problem.\n\n" +
    "This interactive activity can later be expanded " +
    "with real community-verified proverbs."
  );
}


// ===============================
// CONTRIBUTION MODAL
// ===============================

function openContribution() {

  const modal =
    document.getElementById("contributionModal");

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}


function closeContribution() {

  const modal =
    document.getElementById("contributionModal");

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}


// ===============================
// CONTRIBUTION FORM
// ===============================

const contributionForm =
  document.getElementById("contributionForm");

if (contributionForm) {

  contributionForm.addEventListener("submit", event => {

    event.preventDefault();

    const old =
      Number(
        localStorage.getItem("lokvaaniSubmissions") || 0
      );

    localStorage.setItem(
      "lokvaaniSubmissions",
      old + 1
    );

    const impact =
      document.getElementById("impactTotal");

    if (impact) {
      impact.textContent = 111 + old;
    }

    contributionForm.reset();

    closeContribution();

    showToast(
      "✓ Contribution submitted for review!"
    );
  });
}


// ===============================
// QUIZ
// ===============================

function startQuiz() {

  currentQuiz = 0;
  score = 0;

  const modal =
    document.getElementById("quizModal");

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  renderQuiz();
}


function closeQuiz() {

  const modal =
    document.getElementById("quizModal");

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}


function renderQuiz() {

  const box =
    document.getElementById("quizContent");

  if (!box) return;

  const question = quiz[currentQuiz];

  box.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1} OF ${quiz.length}
    </div>

    <h2 style="font-size:32px">
      ${question.q}
    </h2>

    <div class="quiz-options">

      ${question.options.map((option, index) => `

        <button
          class="quiz-option"
          onclick="answerQuiz(${index})">

          ${option}

        </button>

      `).join("")}

    </div>
  `;
}


function answerQuiz(index) {

  const question = quiz[currentQuiz];

  document
    .querySelectorAll(".quiz-option")
    .forEach((button, i) => {

      button.disabled = true;

      if (i === question.correct) {
        button.classList.add("correct");
      }

      if (
        i === index &&
        i !== question.correct
      ) {
        button.classList.add("wrong");
      }

    });


  if (index === question.correct) {

    score++;

    xp += 20;

    localStorage.setItem(
      "lokvaaniXP",
      xp
    );

    const xpDisplay =
      document.getElementById("xpValue");

    if (xpDisplay) {
      xpDisplay.textContent = xp;
    }

  }


  setTimeout(() => {

    currentQuiz++;

    if (currentQuiz < quiz.length) {

      renderQuiz();

    } else {

      updateProgress();

      const box =
        document.getElementById("quizContent");

      if (!box) return;

      box.innerHTML = `

        <div class="quiz-result">

          <div style="font-size:55px">
            🏆
          </div>

          <div class="section-label">
            QUIZ COMPLETE
          </div>

          <h2 style="font-size:40px">
            You scored ${score}/${quiz.length}
          </h2>

          <p>
            You earned ${score * 20} XP.
          </p>

          <button
            class="btn primary"
            onclick="closeQuiz()">

            Continue exploring

          </button>

        </div>
      `;
    }

  }, 850);
}


// ===============================
// PROGRESS
// ===============================

function updateProgress() {

  const percentage =
    Math.min(100, Math.round(xp / 2));

  const bar =
    document.getElementById("progressBar");

  const text =
    document.getElementById("progressText");

  if (bar) {
    bar.style.width =
      percentage + "%";
  }

  if (text) {
    text.textContent =
      percentage + "% complete";
  }
}


// ===============================
// VOCABULARY BUTTON
// ===============================

function openVocabulary() {

  alert(
    "VOCABULARY LESSON\n\n" +
    "1. Aai — Mother\n" +
    "2. Namaskar — Greeting\n" +
    "3. Lok — People / community\n\n" +
    "Tap the Listen buttons in Explore to hear demo pronunciation."
  );
}


// ===============================
// EVENT LISTENERS
// ===============================

const searchInput =
  document.getElementById("searchInput");

const typeFilter =
  document.getElementById("typeFilter");

const regionFilter =
  document.getElementById("regionFilter");


if (searchInput) {

  searchInput.addEventListener(
    "input",
    renderContent
  );

}


if (typeFilter) {

  typeFilter.addEventListener(
    "change",
    renderContent
  );

}


if (regionFilter) {

  regionFilter.addEventListener(
    "change",
    renderContent
  );

}


// ===============================
// MOBILE MENU
// ===============================

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");


if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    () => {

      mainNav.classList.toggle("open");

    }
  );


  document
    .querySelectorAll("#mainNav a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {
          mainNav.classList.remove("open");
        }
      );

    });

}


// ===============================
// INITIALIZE
// ===============================

const xpDisplay =
  document.getElementById("xpValue");

if (xpDisplay) {
  xpDisplay.textContent = xp;
}

renderContent();
updateProgress();
