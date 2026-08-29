"use strict";

/* =========================================================
   LOKVAANI
   Interactive Language & Folk Knowledge
========================================================= */

/* -----------------------------
   KNOWLEDGE DATABASE
----------------------------- */

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
    icon: "🌱",
    title: "Jeev",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A word connected with life, living beings and the idea of a living spirit.",
    verified: "Heritage demo"
  },
  {
    id: 3,
    type: "word",
    icon: "🌸",
    title: "Phool",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A word used for flower, showing how familiar everyday vocabulary can carry cultural meaning.",
    verified: "Community demo"
  },
  {
    id: 4,
    type: "proverb",
    icon: "💬",
    title: "Village Proverb",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A demo proverb entry showing how traditional expressions can be connected with situations and meanings.",
    verified: "Demo proverb"
  },
  {
    id: 5,
    type: "proverb",
    icon: "🪶",
    title: "Grandmother's Saying",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A prototype idiom entry demonstrating how family expressions can be preserved with context.",
    verified: "Community demo"
  },
  {
    id: 6,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk story lesson showing how oral storytelling can become an interactive learning experience.",
    verified: "Prototype"
  },
  {
    id: 7,
    type: "story",
    icon: "📚",
    title: "The Mango Tree",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A demo village story about sharing, patience and knowledge passed between generations.",
    verified: "Community demo"
  },
  {
    id: 8,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-music entry demonstrating how songs can preserve language, philosophy and oral expression.",
    verified: "Demo audio"
  },
  {
    id: 9,
    type: "song",
    icon: "🥁",
    title: "Lavani Rhythm",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A language-and-performance entry showing the connection between rhythm, words and storytelling.",
    verified: "Community demo"
  },
  {
    id: 10,
    type: "oral-history",
    icon: "🎙️",
    title: "A Memory From the Village",
    region: "Punjab",
    language: "Punjabi",
    desc: "A prototype oral-history recording entry preserving a personal memory and the language around it.",
    verified: "Demo interview"
  },
  {
    id: 11,
    type: "oral-history",
    icon: "👴",
    title: "Words From My Grandfather",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A demonstration of how elders can become living sources for language and folk knowledge.",
    verified: "Prototype"
  },
  {
    id: 12,
    type: "word",
    icon: "❤️",
    title: "Prem",
    region: "West Bengal",
    language: "Bengali",
    desc: "A familiar word connected with love and affection, presented as a vocabulary-learning example.",
    verified: "Heritage demo"
  }
];

/* -----------------------------
   QUIZ DATABASE
----------------------------- */

const quiz = [
  {
    q: "Which feature most directly preserves how a word is spoken?",
    options: [
      "Audio recordings from consented speakers",
      "Only a written translation",
      "A colour theme",
      "A leaderboard"
    ],
    correct: 0
  },
  {
    q: "What is a strong workflow for community knowledge?",
    options: [
      "Publish everything immediately",
      "Submit → review → validate → publish",
      "Delete every submission",
      "Hide all contributions"
    ],
    correct: 1
  },
  {
    q: "Which combination gives a learner useful language context?",
    options: [
      "Word + meaning + pronunciation + usage",
      "Only a logo",
      "Only a page counter",
      "Only a photograph"
    ],
    correct: 0
  }
];

let currentQuiz = 0;
let score = 0;
let selectedType = "all";
let selectedRegion = "all";
let xp = 0;

/* -----------------------------
   BASIC HELPERS
----------------------------- */

function get(id) {
  return document.getElementById(id);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readXP() {
  try {
    const storedXP = Number(localStorage.getItem("lokvaaniXP"));
    return Number.isFinite(storedXP) && storedXP >= 0 ? storedXP : 0;
  } catch {
    return 0;
  }
}

function saveXP() {
  try {
    localStorage.setItem("lokvaaniXP", String(xp));
  } catch {
    showToast("Progress could not be saved on this browser.");
  }
}

/* -----------------------------
   TOAST
----------------------------- */

function showToast(message) {
  const toast = get("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* -----------------------------
   SPEECH
----------------------------- */

function getSpeechLanguage(language) {
  const languageMap = {
    Marathi: "mr-IN",
    Bengali: "bn-IN",
    Punjabi: "pa-IN",
    Rajasthani: "hi-IN",
    Hindi: "hi-IN",
    English: "en-IN"
  };

  return languageMap[language] || "en-IN";
}

function speak(text, language = "English") {
  if (!("speechSynthesis" in window)) {
    showToast("Speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(String(text));
  utterance.lang = getSpeechLanguage(language);
  utterance.rate = 0.82;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
  showToast("Playing pronunciation…");
}

/* -----------------------------
   ELDER VOICE DEMO
----------------------------- */

function playElderDemo() {
  speak(
    "Welcome to LokVaani. Every language carries memories, stories and knowledge passed from one generation to another.",
    "English"
  );
}

/* -----------------------------
   CONTENT LABELS
----------------------------- */

function typeLabel(type) {
  const labels = {
    word: "Word",
    proverb: "Proverb",
    story: "Folk story",
    song: "Folk song",
    "oral-history": "Oral history"
  };

  return labels[type] || type;
}

/* -----------------------------
   CONTENT ACTIONS
----------------------------- */

function contentButton(item) {
  const safeId = Number(item.id);

  if (item.type === "word") {
    return `
      <button
        class="audio-btn"
        type="button"
        data-action="speak"
        data-id="${safeId}"
      >
        🔊 Listen
      </button>
    `;
  }

  return `
    <button
      class="audio-btn"
      type="button"
      data-action="open"
      data-id="${safeId}"
    >
      ${item.type === "song" ? "🎵 Listen" : "📖 Open"}
    </button>
  `;
}

/* -----------------------------
   RENDER CONTENT
----------------------------- */

function renderContent() {
  const searchInput = get("searchInput");
  const contentGrid = get("contentGrid");

  if (!searchInput || !contentGrid) return;

  const query = searchInput.value.toLowerCase().trim();

  const filtered = content.filter(item => {
    const searchableText = `
      ${item.title}
      ${item.region}
      ${item.language}
      ${item.desc}
      ${typeLabel(item.type)}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(query);
    const matchesType =
      selectedType === "all" || item.type === selectedType;
    const matchesRegion =
      selectedRegion === "all" || item.region === selectedRegion;

    return matchesSearch && matchesType && matchesRegion;
  });

  if (filtered.length === 0) {
    contentGrid.innerHTML = `
      <div class="content-card empty-card">
        <h3>No knowledge found</h3>
        <p>Try another word, region or category.</p>
        <button
          class="btn primary"
          type="button"
          data-action="show-all"
        >
          Show all knowledge
        </button>
      </div>
    `;
    return;
  }

  contentGrid.innerHTML = filtered.map(item => `
    <article class="content-card">
      <div class="card-icon" aria-hidden="true">${item.icon}</div>

      <span class="tag">
        ${escapeHTML(typeLabel(item.type))}
      </span>

      <h3>${escapeHTML(item.title)}</h3>

      <p>
        ${escapeHTML(item.language)} • ${escapeHTML(item.region)}
      </p>

      <p>${escapeHTML(item.desc)}</p>

      <div class="card-bottom">
        <span class="verified">
          ✓ ${escapeHTML(item.verified)}
        </span>

        ${contentButton(item)}
      </div>
    </article>
  `).join("");
}

/* -----------------------------
   VIEW ALL
----------------------------- */

function showAllContent() {
  selectedType = "all";
  selectedRegion = "all";

  const searchInput = get("searchInput");

  if (searchInput) {
    searchInput.value = "";
  }

  const typeSelected = get("typeSelected");
  const regionSelected = get("regionSelected");

  if (typeSelected) typeSelected.textContent = "All knowledge";
  if (regionSelected) regionSelected.textContent = "All regions";

  renderContent();

  get("explore")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  showToast("Showing all language and folk knowledge.");
}

/* -----------------------------
   DROPDOWNS
----------------------------- */

function setupDropdown(id, callback) {
  const dropdown = get(id);

  if (!dropdown) return;

  const button = dropdown.querySelector(".select-button");
  const options = dropdown.querySelectorAll(".select-options button");

  if (!button) return;

  button.addEventListener("click", event => {
    event.stopPropagation();

    document.querySelectorAll(".custom-select").forEach(other => {
      if (other !== dropdown) {
        other.classList.remove("open");
      }
    });

    dropdown.classList.toggle("open");
  });

  options.forEach(option => {
    option.addEventListener("click", event => {
      event.stopPropagation();

      callback(
        option.dataset.value,
        option.textContent.trim()
      );

      dropdown.classList.remove("open");
    });
  });
}

/* -----------------------------
   MODALS
----------------------------- */

function openModal(id) {
  const modal = get(id);

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  const firstFocusable = modal.querySelector(
    "button, input, select, textarea"
  );

  firstFocusable?.focus();
}

function closeModal(id) {
  const modal = get(id);

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

function openInfo(contentHTML) {
  const contentBox = get("infoContent");

  if (!contentBox) return;

  contentBox.innerHTML = contentHTML;
  openModal("infoModal");
}

function closeInfoModal() {
  closeModal("infoModal");
}

/* -----------------------------
   CONTENT MODALS
----------------------------- */

function openStory(id = 6) {
  const item = content.find(entry => entry.id === Number(id));

  if (!item) {
    showToast("Story not found.");
    return;
  }

  openInfo(`
    <div class="section-label">${escapeHTML(typeLabel(item.type))}</div>
    <h2 id="infoTitle">${escapeHTML(item.title)}</h2>
    <p>${escapeHTML(item.desc)}</p>
    <p>
      <strong>${escapeHTML(item.language)}</strong>
      • ${escapeHTML(item.region)}
    </p>
    <p>
      Stories like this demonstrate how folk knowledge can carry
      lessons about community, cleverness, patience and everyday life.
    </p>
    <div class="modal-actions">
      <button class="btn primary" type="button" data-action="start-quiz">
        Take the story quiz →
      </button>
    </div>
  `);
}

function openVocabulary() {
  openInfo(`
    <div class="section-label">MARATHI VOCABULARY</div>
    <h2 id="infoTitle">5 everyday words</h2>

    <div class="vocabulary-list">
      <p>
        <strong>Aai</strong> — Mother
        <button class="audio-btn" type="button"
          data-action="speak-text"
          data-text="Aai"
          data-language="Marathi">🔊</button>
      </p>

      <p>
        <strong>Paani</strong> — Water
        <button class="audio-btn" type="button"
          data-action="speak-text"
          data-text="Paani"
          data-language="Marathi">🔊</button>
      </p>

      <p>
        <strong>Ghar</strong> — Home
        <button class="audio-btn" type="button"
          data-action="speak-text"
          data-text="Ghar"
          data-language="Marathi">🔊</button>
      </p>

      <p>
        <strong>Jevan</strong> — Food / meal
        <button class="audio-btn" type="button"
          data-action="speak-text"
          data-text="Jevan"
          data-language="Marathi">🔊</button>
      </p>

      <p>
        <strong>Prem</strong> — Love
        <button class="audio-btn" type="button"
          data-action="speak-text"
          data-text="Prem"
          data-language="Marathi">🔊</button>
      </p>
    </div>
  `);
}

function openProverb(id = 4) {
  const item = content.find(entry => entry.id === Number(id));

  if (!item) {
    showToast("Proverb not found.");
    return;
  }

  openInfo(`
    <div class="section-label">${escapeHTML(typeLabel(item.type))}</div>
    <h2 id="infoTitle">${escapeHTML(item.title)}</h2>
    <p>${escapeHTML(item.desc)}</p>
    <p>
      <strong>Meaning:</strong>
      Experience and patience can teach lessons that cannot always
      be learned from books.
    </p>
    <button class="btn primary" type="button" data-action="proverb-quiz">
      Test yourself →
    </button>
  `);
}

function openOralHistory(id = 10) {
  const item = content.find(entry => entry.id === Number(id));

  if (!item) {
    showToast("Oral history not found.");
    return;
  }

  openInfo(`
    <div class="section-label">${escapeHTML(typeLabel(item.type))}</div>
    <h2 id="infoTitle">${escapeHTML(item.title)}</h2>
    <p>${escapeHTML(item.desc)}</p>
    <p>
      In a full version of LokVaani, this section could contain a
      consented recording, transcript, translation and information
      about the speaker.
    </p>
    <button class="btn primary" type="button" data-action="elder-demo">
      ▶ Play demo voice
    </button>
  `);
}

function playFolkSong(id = 8) {
  const item = content.find(entry => entry.id === Number(id));

  const title = item ? item.title : "folk song";

  speak(
    `This is a demonstration of how LokVaani can introduce ${title}, explain its language and provide a consented audio recording.`,
    item ? item.language : "English"
  );
}

/* -----------------------------
   CONTRIBUTION MODAL
----------------------------- */

function openContribution() {
  openModal("contributionModal");
}

function closeContribution() {
  closeModal("contributionModal");
}

function handleContribution(event) {
  event.preventDefault();

  const form = event.currentTarget;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const title = String(formData.get("title") || "").trim();

  closeContribution();
  form.reset();

  showToast(
    `Thank you, ${name || "contributor"}! “${title}” was submitted for review.`
  );
}

/* -----------------------------
   QUIZ
----------------------------- */

function startQuiz() {
  closeInfoModal();

  currentQuiz = 0;
  score = 0;

  openModal("quizModal");
  renderQuiz();
}

function startProverbQuiz() {
  closeInfoModal();

  currentQuiz = 0;
  score = 0;

  openModal("quizModal");
  renderQuiz();
}

function renderQuiz() {
  const quizContent = get("quizContent");

  if (!quizContent) return;

  const item = quiz[currentQuiz];

  if (!item) {
    finishQuiz();
    return;
  }

  quizContent.innerHTML = `
    <div class="mini-label">
      QUESTION ${currentQuiz + 1} OF ${quiz.length}
    </div>

    <h2 id="quizTitle">${escapeHTML(item.q)}</h2>

    <div class="quiz-options">
      ${item.options.map((option, index) => `
        <button
          class="quiz-option"
          type="button"
          data-action="answer"
          data-index="${index}"
        >
          ${escapeHTML(option)}
        </button>
      `).join("")}
    </div>
  `;
}

function answerQuiz(index) {
  const item = quiz[currentQuiz];

  if (!item) return;

  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach((button, number) => {
    button.disabled = true;

    if (number === item.correct) {
      button.classList.add("correct");
    }

    if (number === index && number !== item.correct) {
      button.classList.add("wrong");
    }
  });

  if (Number(index) === item.correct) {
    score += 1;
    xp += 20;
    saveXP();
    updateXP();

    showToast("+20 XP! Correct answer.");
  } else {
    showToast("Good try! Keep learning.");
  }

  window.setTimeout(() => {
    currentQuiz += 1;

    if (currentQuiz < quiz.length) {
      renderQuiz();
    } else {
      finishQuiz();
    }
  }, 900);
}

function finishQuiz() {
  updateProgress();

  const quizContent = get("quizContent");

  if (!quizContent) return;

  quizContent.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-trophy" aria-hidden="true">🏆</div>

      <div class="section-label">QUIZ COMPLETE</div>

      <h2 id="quizTitle">
        You scored ${score}/${quiz.length}
      </h2>

      <p>You earned ${score * 20} XP.</p>

      <button class="btn primary" type="button" data-action="close-quiz">
        Continue learning
      </button>
    </div>
  `;
}

function closeQuiz() {
  closeModal("quizModal");
}

/* -----------------------------
   XP AND PROGRESS
----------------------------- */

function updateXP() {
  const xpValue = get("xpValue");

  if (xpValue) {
    xpValue.textContent = String(xp);
  }
}

function updateProgress() {
  const percentage = Math.min(100, Math.round(xp / 2));

  const progressBar = get("progressBar");
  const progressText = get("progressText");

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", String(percentage));
  }

  if (progressText) {
    progressText.textContent = `${percentage}% complete`;
  }

  const cultureBadge = get("cultureBadge");
  const championBadge = get("championBadge");

  if (cultureBadge) {
    cultureBadge.textContent =
      percentage >= 50
        ? "🔓 Language Keeper"
        : "🔒 Language Keeper";
  }

  if (championBadge) {
    championBadge.textContent =
      percentage >= 100
        ? "🏆 Knowledge Champion"
        : "🔒 Knowledge Champion";
  }
}

/* -----------------------------
   EVENT DELEGATION
----------------------------- */

function handleContentAction(event) {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const action = button.dataset.action;
  const id = button.dataset.id;

  if (action === "speak") {
    const item = content.find(entry => entry.id === Number(id));
    if (item) speak(item.title, item.language);
  }

  if (action === "open") {
    const item = content.find(entry => entry.id === Number(id));

    if (!item) return;

    if (item.type === "story") openStory(item.id);
    else if (item.type === "prov
