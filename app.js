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
    desc: "A demo village story about sharing, patience and the knowledge passed between generations.",
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
   QUIZ QUESTIONS
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

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);


/* -----------------------------
   BASIC HELPERS
----------------------------- */

function get(id) {
  return document.getElementById(id);
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

function speak(text) {

  if (!("speechSynthesis" in window)) {

    showToast(
      "Speech is not supported in this browser."
    );

    return;
  }

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = 0.82;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);

  showToast("Playing pronunciation…");
}


/* -----------------------------
   ELDER VOICE DEMO
----------------------------- */

function playElderDemo() {

  speak(
    "Welcome to LokVaani. Every language carries memories, stories and knowledge passed from one generation to another."
  );

}


/* -----------------------------
   CONTENT TYPE LABEL
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
   CONTENT BUTTON
----------------------------- */

function contentButton(item) {

  if (item.type === "word") {

    return `
      <button
        class="audio-btn"
        type="button"
        onclick="speak('${escapeQuotes(item.title)}')"
      >
        🔊 Listen
      </button>
    `;

  }


  if (item.type === "proverb") {

    return `
      <button
        class="audio-btn"
        type="button"
        onclick="openProverb()"
      >
        💬 Open
      </button>
    `;

  }


  if (item.type === "story") {

    return `
      <button
        class="audio-btn"
        type="button"
        onclick="openStory()"
      >
        📖 Open
      </button>
    `;

  }


  if (item.type === "song") {

    return `
      <button
        class="audio-btn"
        type="button"
        onclick="playFolkSong()"
      >
        🎵 Listen
      </button>
    `;

  }


  return `
    <button
      class="audio-btn"
      type="button"
      onclick="openOralHistory()"
    >
      🎙️ Listen
    </button>
  `;

}


/* -----------------------------
   ESCAPE QUOTES
----------------------------- */

function escapeQuotes(text) {

  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');

}


/* -----------------------------
   RENDER CONTENT
----------------------------- */

let selectedType = "all";
let selectedRegion = "all";


function renderContent() {

  const searchInput = get("searchInput");
  const contentGrid = get("contentGrid");

  if (!searchInput || !contentGrid) {
    return;
  }


  const query =
    searchInput.value
      .toLowerCase()
      .trim();


  const filtered = content.filter(item => {

    const matchesSearch =
      `${item.title} ${item.region} ${item.language} ${item.desc}`
        .toLowerCase()
        .includes(query);


    const matchesType =
      selectedType === "all" ||
      item.type === selectedType;


    const matchesRegion =
      selectedRegion === "all" ||
      item.region === selectedRegion;


    return (
      matchesSearch &&
      matchesType &&
      matchesRegion
    );

  });


  if (filtered.length === 0) {

    contentGrid.innerHTML = `

      <div class="content-card"
           style="grid-column:1/-1">

        <h3>No knowledge found</h3>

        <p>
          Try another word, region or category.
        </p>

        <button
          class="btn primary"
          type="button"
          onclick="showAllContent()"
        >
          Show all knowledge
        </button>

      </div>

    `;

    return;
  }


  contentGrid.innerHTML =
    filtered.map(item => `

      <article class="content-card">

        <div class="card-icon">
          ${item.icon}
        </div>

        <span class="tag">
          ${typeLabel(item.type)}
        </span>

        <h3>
          ${item.title}
        </h3>

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


  get("typeSelected").textContent =
    "All knowledge";

  get("regionSelected").textContent =
    "All regions";


  renderContent();

  document
    .querySelector("#explore")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


  showToast(
    "Showing all language and folk knowledge."
  );

}


/* -----------------------------
   CUSTOM DROPDOWNS
----------------------------- */

function setupDropdown(id, callback) {

  const dropdown = get(id);

  if (!dropdown) return;

  const button =
    dropdown.querySelector(".select-button");

  const options =
    dropdown.querySelectorAll(".select-options button");


  button.addEventListener("click", event => {

    event.stopPropagation();

    document
      .querySelectorAll(".custom-select")
      .forEach(other => {

        if (other !== dropdown) {
          other.classList.remove("open");
        }

      });

    dropdown.classList.toggle("open");

  });


  options.forEach(option => {

    option.addEventListener("click", event => {

      event.stopPropagation();

      const value =
        option.dataset.value;

      const label =
        option.textContent.trim();


      callback(value, label);

      dropdown.classList.remove("open");

    });

  });

}


setupDropdown(
  "typeSelect",
  (value, label) => {

    selectedType = value;

    get("typeSelected").textContent =
      label;

    renderContent();

  }
);


setupDropdown(
  "regionSelect",
  (value, label) => {

    selectedRegion = value;

    get("regionSelected").textContent =
      label;

    renderContent();

  }
);


/* Close dropdowns when tapping outside */

document.addEventListener("click", () => {

  document
    .querySelectorAll(".custom-select")
    .forEach(dropdown => {

      dropdown.classList.remove("open");

    });

});


/* -----------------------------
   SEARCH
----------------------------- */

const searchInput =
  get("searchInput");

if (searchInput) {

  searchInput.addEventListener(
    "input",
    renderContent
  );

}


/* -----------------------------
   VIEW ALL BUTTON
----------------------------- */

const viewAllBtn =
  get("viewAllBtn");

if (viewAllBtn) {

  viewAllBtn.addEventListener(
    "click",
    showAllContent
  );

}


/* -----------------------------
   GENERAL INFO MODAL
----------------------------- */

function openInfo(contentHTML) {

  const modal = get("infoModal");
  const contentBox = get("infoContent");

  if (!modal || !contentBox) return;

  contentBox.innerHTML =
    contentHTML;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeInfoModal() {

  const modal = get("infoModal");

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* -----------------------------
   STORY
----------------------------- */

function openStory() {

  openInfo(`

    <div class="section-label">
      FOLK STORY
    </div>

    <h2>
      The Clever Farmer
    </h2>

    <p>
      A farmer faced a difficult problem when a valuable
      item went missing in his village. Instead of blaming
      anyone, he used patience and careful observation to
      discover what had happened.
    </p>

    <p>
      Stories like this demonstrate how folk knowledge often
      carries lessons about community, cleverness, patience
      and everyday life.
    </p>

    <div style="margin-top:25px">

      <button
        class="btn primary"
        type="button"
        onclick="startQuiz()"
      >
        Take the story quiz →
      </button>

    </div>

  `);

}


/* -----------------------------
   VOCABULARY
----------------------------- */

function openVocabulary() {

  openInfo(`

    <div class="section-label">
      MARATHI VOCABULARY
    </div>

    <h2>
      5 everyday words
    </h2>

    <div>

      <p>
        <strong>Aai</strong> — Mother
        <button
          class="audio-btn"
          onclick="speak('Aai')"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Paani</strong> — Water
        <button
          class="audio-btn"
          onclick="speak('Paani')"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Ghar</strong> — Home
        <button
          class="audio-btn"
          onclick="speak('Ghar')"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Jevan</strong> — Food / meal
        <button
          class="audio-btn"
          onclick="speak('Jevan')"
        >
          🔊
        </button>
      </p>

      <p>
        <strong>Prem</strong> — Love
        <button
          class="audio-btn"
          onclick="speak('Prem')"
        >
          🔊
        </button>
      </p>

    </div>

  `);

}


/* -----------------------------
   PROVERB
----------------------------- */

function openProverb() {

  openInfo(`

    <div class="section-label">
      FOLK EXPRESSION
    </div>

    <h2>
      A village proverb
    </h2>

    <p>
      This demo entry represents a traditional expression
      passed between generations.
    </p>

    <p>
      <strong>Meaning:</strong>
      Experience and patience can teach lessons that
      cannot always be learned from books.
    </p>

    <button
      class="btn primary"
      onclick="startProverbQuiz()"
    >
      Test yourself →
    </button>

  `);

}


/* -----------------------------
   ORAL HISTORY
----------------------------- */

function openOralHistory() {

  openInfo(`

    <div class="section-label">
      ORAL HISTORY
    </div>

    <h2>
      A Memory From the Village
    </h2>

    <p>
      Oral histories preserve memories through the voices
      of people who experienced them.
    </p>

    <p>
      In a full version of LokVaani, this section could contain
      a consented recording, transcript, translation and
      information about the speaker.
    </p>

    <button
      class="btn primary"
      onclick="playElderDemo()"
    >
      ▶ Play demo voice
    </button>

  `);

}


/* -----------------------------
   FOLK SONG
----------------------------- */

function playFolkSong() {

  speak(
    "This is a demonstration of how LokVaani can introduce a folk song, explain its language and provide a consented audio recording."
  );

}


/* -----------------------------
   QUIZ
----------------------------- */

function startQuiz() {

  closeInfoModal();

  currentQuiz = 0;
  score = 0;

  const modal = get("quizModal");

  if (!modal) return;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  renderQuiz();

}


/* -----------------------------
   PROVERB QUIZ
----------------------------- */

function startProverbQuiz() {

  closeInfoModal();

  currentQuiz = 1;
  score = 0;

  const modal = get("quizModal");

  if (!modal) return;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  renderQuiz();

}


/* -----------------------------
   RENDER QUIZ
----------------------------- */

function renderQuiz() {

  const quizContent =
    get("quizContent");

  if (!quizContent) return;

  const item =
    quiz[currentQuiz];


  quizContent.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1}
      OF ${quiz.length}
    </div>

    <h2>
      ${item.q}
    </h2>

    <div>

      ${item.options.map((option, index) => `

        <button
          class="quiz-option"
          type="button"
          onclick="answerQuiz(${index})"
        >
          ${option}
        </button>

      `).join("")}

    </div>

  `;

}


/* -----------------------------
   ANSWER QUIZ
----------------------------- */

function answerQuiz(index) {

  const item =
    quiz[currentQuiz];

  const buttons =
    document.querySelectorAll(
      ".quiz-option"
    );


  buttons.forEach(
    (button, number) => {

      button.disabled = true;

      if (
        number === item.correct
      ) {

        button.classList.add(
          "correct"
        );

      }

      if (
        number === index &&
        number !== item.correct
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  if (
    index === item.correct
  ) {

    score++;

    xp += 20;

    localStorage.setItem(
      "lokvaaniXP",
      xp
    );

    updateXP();

    showToast(
      "+20 XP! Correct answer."
    );

  } else {

    showToast(
      "Good try! Keep learning."
    );

  }


  setTimeout(() => {

    currentQuiz++;

    if (
      currentQuiz < quiz.length
    ) {

      renderQuiz();

    } else {

      finishQuiz();

    }

  }, 900);

}


/* -----------------------------
   FINISH QUIZ
----------------------------- */

function finishQuiz() {

  updateProgress();

  const quizContent =
    get("quizContent");

  if (!quizContent) return;


  quizContent.innerHTML = `

    <div class="quiz-result">

      <div style="font-size:60px">
        🏆
      </div>

      <div class="section-label">
        QUIZ COMPLETE
      </div>

      <h2>
        You scored
        ${score}/${quiz.length}
      </h2>

      <p>
        You earned
        ${score * 20}
        XP.
      </p>

      <button
        class="btn primary"
        type="button"
        onclick="closeQuiz()"
      >
        Continue learning
      </button>

    </div>

  `;

}


/* -----------------------------
   CLOSE QUIZ
----------------------------- */

function closeQuiz() {

  const modal =
    get("quizModal");

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* -----------------------------
   XP
----------------------------- */

function updateXP() {

  const xpValue =
    get("xpValue");

  if (xpValue) {

    xpValue.textContent =
      xp;

  }

}


function updateProgress() {

  const percentage =
    Math.min(
      100,
      Math.round(xp / 2)
    );


  const bar =
    get("progressBar");

  const text =
    get("progressText");


  if (bar) {

    bar.style.width =
      percentage + "%";

  }


  if (text) {

    text.textContent =
      percentage +
      "% complete";

  }


  if (
    percentage >= 50
  ) {

    const badge =
      get("cultureBadge");

    if (badge) {

      badge.textContent =
        "🔓 Language Keeper";

    }

  }


  if (
    percentage >= 100
  ) {

    const badge =
      get("championBadge");

    if (badge) {

   
