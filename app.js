"use strict";

/* =========================================================
   LOKVAANI - COMPLETE APP SCRIPT
========================================================= */

const content = [
  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A warm everyday Marathi word meaning mother.",
    verified: "Community demo"
  },
  {
    id: 2,
    type: "word",
    icon: "🌱",
    title: "Jeev",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A word connected with life and living beings.",
    verified: "Heritage demo"
  },
  {
    id: 3,
    type: "word",
    icon: "🌸",
    title: "Phool",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A familiar word used for flower.",
    verified: "Community demo"
  },
  {
    id: 4,
    type: "proverb",
    icon: "💬",
    title: "Village Proverb",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A traditional expression shared through generations.",
    verified: "Demo proverb"
  },
  {
    id: 5,
    type: "proverb",
    icon: "🪶",
    title: "Grandmother's Saying",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A family expression preserved with cultural context.",
    verified: "Community demo"
  },
  {
    id: 6,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A folk story about wisdom, patience and community.",
    verified: "Prototype"
  },
  {
    id: 7,
    type: "story",
    icon: "📚",
    title: "The Mango Tree",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A village story about sharing and knowledge.",
    verified: "Community demo"
  },
  {
    id: 8,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-music entry connecting language and philosophy.",
    verified: "Demo audio"
  },
  {
    id: 9,
    type: "song",
    icon: "🥁",
    title: "Lavani Rhythm",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A performance entry connecting rhythm and storytelling.",
    verified: "Community demo"
  },
  {
    id: 10,
    type: "oral-history",
    icon: "🎙️",
    title: "A Memory From the Village",
    region: "Punjab",
    language: "Punjabi",
    desc: "A prototype oral-history recording entry.",
    verified: "Demo interview"
  },
  {
    id: 11,
    type: "oral-history",
    icon: "👴",
    title: "Words From My Grandfather",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "An example of elders preserving language and memory.",
    verified: "Prototype"
  },
  {
    id: 12,
    type: "word",
    icon: "❤️",
    title: "Prem",
    region: "West Bengal",
    language: "Bengali",
    desc: "A familiar word connected with love and affection.",
    verified: "Heritage demo"
  }
];

const quizQuestions = [
  {
    question: "Which feature most directly preserves how a word is spoken?",
    options: [
      "Audio recordings from consented speakers",
      "Only a written translation",
      "A colour theme",
      "A leaderboard"
    ],
    answer: 0
  },
  {
    question: "What is a strong workflow for community knowledge?",
    options: [
      "Publish everything immediately",
      "Submit → review → validate → publish",
      "Delete every submission",
      "Hide all contributions"
    ],
    answer: 1
  },
  {
    question: "Which combination gives a learner useful language context?",
    options: [
      "Word + meaning + pronunciation + usage",
      "Only a logo",
      "Only a page counter",
      "Only a photograph"
    ],
    answer: 0
  }
];

let selectedType = "all";
let selectedRegion = "all";
let quizIndex = 0;
let quizScore = 0;
let xp = getSavedXP();
let toastTimer;

/* =========================================================
   BASIC HELPERS
========================================================= */

function $(id) {
  return document.getElementById(id);
}

function getSavedXP() {
  try {
    const saved = Number(localStorage.getItem("lokvaaniXP"));
    return Number.isFinite(saved) && saved >= 0 ? saved : 0;
  } catch {
    return 0;
  }
}

function saveXP() {
  try {
    localStorage.setItem("lokvaaniXP", String(xp));
  } catch {
    // Storage can be unavailable in private browser contexts.
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  const toast = $("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function findItem(id) {
  return content.find(item => item.id === Number(id));
}

function getTypeLabel(type) {
  const labels = {
    word: "Word",
    proverb: "Proverb",
    story: "Folk story",
    song: "Folk song",
    "oral-history": "Oral history"
  };

  return labels[type] || type;
}

function getSpeechLanguage(language) {
  const languages = {
    Marathi: "mr-IN",
    Bengali: "bn-IN",
    Punjabi: "pa-IN",
    Rajasthani: "hi-IN",
    Hindi: "hi-IN",
    English: "en-IN"
  };

  return languages[language] || "en-IN";
}

/* =========================================================
   SPEECH
========================================================= */

function speak(text, language = "English") {
  if (!("speechSynthesis" in window)) {
    showToast("Speech is not supported by this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(String(text));

  utterance.lang = getSpeechLanguage(language);
  utterance.rate = 0.82;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);

  showToast("Playing pronunciation…");
}

function playElderDemo() {
  speak(
    "Welcome to LokVaani. Every language carries memories, stories and knowledge passed from one generation to another.",
    "English"
  );
}

function speakItem(id) {
  const item = findItem(id);

  if (!item) return;

  speak(item.title, item.language);
}

function playFolkSong(id = 8) {
  const item = findItem(id) || findItem(8);

  speak(
    `This is a demonstration of ${item.title}. LokVaani helps preserve songs, language and oral traditions.`,
    item.language
  );
}

/* =========================================================
   CONTENT RENDERING
========================================================= */

function renderContent() {
  const grid = $("contentGrid");
  const searchInput = $("searchInput");

  if (!grid) return;

  const query = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const filtered = content.filter(item => {
    const searchableText = [
      item.title,
      item.region,
      item.language,
      item.desc,
      getTypeLabel(item.type)
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(query);
    const matchesType =
      selectedType === "all" || item.type === selectedType;
    const matchesRegion =
      selectedRegion === "all" || item.region === selectedRegion;

    return matchesSearch && matchesType && matchesRegion;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="content-card empty-card">
        <h3>No knowledge found</h3>
        <p>Try a different search word, category or region.</p>
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

  grid.innerHTML = filtered
    .map(item => {
      let actionText = "Open";
      let action = "open-item";

      if (item.type === "word") {
        actionText = "🔊 Listen";
        action = "speak-item";
      }

      if (item.type === "song") {
        actionText = "🎵 Listen";
        action = "play-song";
      }

      if (item.type === "story") {
        actionText = "📖 Open";
        action = "open-story";
      }

      if (item.type === "proverb") {
        actionText = "💬 Open";
        action = "open-proverb";
      }

      if (item.type === "oral-history") {
        actionText = "🎙️ Open";
        action = "open-history";
      }

      return `
        <article class="content-card">
          <div class="card-icon" aria-hidden="true">
            ${item.icon}
          </div>

          <span class="tag">
            ${escapeHTML(getTypeLabel(item.type))}
          </span>

          <h3>${escapeHTML(item.title)}</h3>

          <p>
            ${escapeHTML(item.language)}
            •
            ${escapeHTML(item.region)}
          </p>

          <p>${escapeHTML(item.desc)}</p>

          <div class="card-bottom">
            <span class="verified">
              ✓ ${escapeHTML(item.verified)}
            </span>

            <button
              class="audio-btn"
              type="button"
              data-action="${action}"
              data-id="${item.id}"
            >
              ${actionText}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function showAllContent() {
  selectedType = "all";
  selectedRegion = "all";

  if ($("searchInput")) {
    $("searchInput").value = "";
  }

  if ($("typeSelected")) {
    $("typeSelected").textContent = "All knowledge";
  }

  if ($("regionSelected")) {
    $("regionSelected").textContent = "All regions";
  }

  renderContent();

  const explore = $("explore");

  if (explore) {
    explore.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* =========================================================
   DROPDOWNS
========================================================= */

function closeDropdowns() {
  document.querySelectorAll(".custom-select").forEach(dropdown => {
    dropdown.classList.remove("open");

    const button = dropdown.querySelector(".select-button");

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function setupDropdown(dropdownId, selectedId, callback) {
  const dropdown = $(dropdownId);
  const selectedText = $(selectedId);

  if (!dropdown) return;

  const button = dropdown.querySelector(".select-button");
  const optionButtons = dropdown.querySelectorAll(
    ".select-options button"
  );

  if (!button) return;

  button.addEventListener("click", event => {
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle("open");

    closeDropdownsExcept(dropdown);

    button.setAttribute("aria-expanded", String(isOpen));
  });

  optionButtons.forEach(option => {
    option.addEventListener("click", event => {
      event.stopPropagation();

      const value = option.dataset.value || "all";
      const label = option.textContent.trim();

      if (selectedText) {
        selectedText.textContent = label;
      }

      callback(value);

      dropdown.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function closeDropdownsExcept(currentDropdown) {
  document.querySelectorAll(".custom-select").forEach(dropdown => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("open");

      const button = dropdown.querySelector(".select-button");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    }
  });
}

/* =========================================================
   MODALS
========================================================= */

function openModal(id) {
  const modal = $(id);

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = $(id);

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  const anyOpenModal = document.querySelector(".modal.open");

  if (!anyOpenModal) {
    document.body.style.overflow = "";
  }
}

function openContribution() {
  openModal("contributionModal");
}

function closeContribution() {
  closeModal("contributionModal");
}

function closeInfoModal() {
  closeModal("infoModal");
}

function closeQuiz() {
  closeModal("quizModal");
}

/* =========================================================
   INFORMATION WINDOWS
========================================================= */

function openInfo(html) {
  const container = $("infoContent");

  if (!container) return;

  container.innerHTML = html;

  openModal("infoModal");

  const heading = container.querySelector("h2");

  if (heading) {
    heading.id = "infoModalTitle";
  }
}

function openStory(id = 6) {
  const item = findItem(id) || findItem(6);

  openInfo(`
    <div class="section-label">FOLK STORY</div>

    <h2>${escapeHTML(item.title)}</h2>

    <p>${escapeHTML(item.desc)}</p>

    <p>
      This demo story shows how oral storytelling can preserve
      lessons about community, patience and everyday life.
    </p>

    <button
      class="btn primary"
      type="button"
      data-action="start-quiz"
    >
      Take the story quiz →
    </button>
  `);
}

function openProverb(id = 4) {
  const item = findItem(id) || findItem(4);

  openInfo(`
    <div class="section-label">FOLK EXPRESSION</div>

    <h2>${escapeHTML(item.title)}</h2>

    <p>${escapeHTML(item.desc)}</p>

    <p>
      <strong>Meaning:</strong>
      Experience and patience can teach lessons that cannot
      always be learned from books.
    </p>

    <button
      class="btn primary"
      type="button"
      data-action="start-proverb-quiz"
    >
      Test yourself →
    </button>
  `);
}

function openOralHistory(id = 10) {
  const item = findItem(id) || findItem(10);

  openInfo(`
    <div class="section-label">ORAL HISTORY</div>

    <h2>${escapeHTML(item.title)}</h2>

    <p>${escapeHTML(item.desc)}</p>

    <p>
      A full version of LokVaani could contain a consented
      recording, transcript, translation and speaker information.
    </p>

    <button
      class="btn primary"
      type="button"
      data-action="elder-demo"
    >
      ▶ Play demo voice
    </button>
  `);
}

function openVocabulary() {
  openInfo(`
    <div class="section-label">MARATHI VOCABULARY</div>

    <h2>5 everyday words</h2>

    <div class="vocabulary-list">
      <p>
        <strong>Aai</strong> — Mother
        <button
          class="audio-btn"
          type="button"
          data-action="speak-text"
          data-text="Aai"
          data-language="Marathi"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Paani</strong> — Water
        <button
          class="audio-btn"
          type="button"
          data-action="speak-text"
          data-text="Paani"
          data-language="Marathi"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Ghar</strong> — Home
        <button
          class="audio-btn"
          type="button"
          data-action="speak-text"
          data-text="Ghar"
          data-language="Marathi"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Jevan</strong> — Food or meal
        <button
          class="audio-btn"
          type="button"
          data-action="speak-text"
          data-text="Jevan"
          data-language="Marathi"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Prem</strong> — Love
        <button
          class="audio-btn"
          type="button"
          data-action="speak-text"
          data-text="Prem"
          data-language="Marathi"
        >
          🔊
        </button>
      </p>
    </div>
  `);
}

/* =========================================================
   QUIZ
========================================================= */

function startQuiz() {
  closeInfoModal();

  quizIndex = 0;
  quizScore = 0;

  openModal("quizModal");
  renderQuiz();
}

function startProverbQuiz() {
  startQuiz();
}

function renderQuiz() {
  const container = $("quizContent");

  if (!container) return;

  const current = quizQuestions[quizIndex];

  container.innerHTML = `
    <div class="mini-label">
      QUESTION ${quizIndex + 1} OF ${quizQuestions.length}
    </div>

    <h2 id="quizModalTitle">
      ${escapeHTML(current.question)}
    </h2>

    <div class="quiz-options">
      ${current.options
        .map(
          (option, index) => `
            <button
              class="quiz-option"
              type="button"
              data-action="answer-quiz"
              data-index="${index}"
            >
              ${escapeHTML(option)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function answerQuiz(index) {
  const current = quizQuestions[quizIndex];

  if (!current) return;

  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;

    if (buttonIndex === current.answer) {
      button.classList.add("correct");
    }

    if (
      buttonIndex === index &&
      buttonIndex !== current.answer
    ) {
      button.classList.add("wrong");
    }
  });

  if (index === current.answer) {
    quizScore += 1;
    xp += 20;

    saveXP();
    updateXP();

    showToast("+20 XP! Correct answer.");
  } else {
    showToast("Good try! Keep learning.");
  }

  setTimeout(() => {
    quizIndex += 1;

    if (quizIndex < quizQuestions.length) {
      renderQuiz();
    } else {
      finishQuiz();
    }
  }, 900);
}

function finishQuiz() {
  const container = $("quizContent");

  updateProgress();

  if (!container) return;

  container.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-trophy" aria-hidden="true">🏆</div>

      <div class="section-label">
        QUIZ COMPLETE
      </div>

      <h2 id="quizModalTitle">
        You scored ${quizScore}/${quizQuestions.length}
      </h2>

      <p>
        You earned ${quizScore * 20} XP.
      </p>

      <button
        class="btn primary"
        type="button"
        data-action="close-quiz"
      >
        Continue learning
      </button>
    </div>
  `;
}

/* =========================================================
   XP AND PROGRESS
========================================================= */

function updateXP() {
  const xpValue = $("xpValue");

  if (xpValue) {
    xpValue.textContent = String(xp);
  }
}

function updateProgress() {
  const percentage = Math.min(100, Math.round(xp / 2));

  const progressBar = $("progressBar");
  const progressText = $("progressText");

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", String(percentage));
  }

  if (progressText) {
    progressText.textContent = `${percentage}% complete`;
  }

  const cultureBadge = $("cultureBadge");
  const championBadge = $("championBadge");

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

/* =========================================================
   CONTRIBUTION FORM
========================================================= */

function handleContributionSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name =
    formData.get("name")?.toString().trim() ||
    "Anonymous contributor";

  const title =
    formData.get("title")?.toString().trim() ||
    "Untitled contribution";

  closeContribution();

  form.reset();

  showToast(
    `Thank you, ${name}. "${title}" was su
