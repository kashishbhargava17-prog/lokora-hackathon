/* =========================================================
   LOKORA
   Legacy Of Knowledge, Oral Records & Ancestry

   Interactive Language & Folk Knowledge
   Heritage & Culture Hackathon Prototype
   ========================================================= */


/* =========================================================
   KNOWLEDGE CONTENT
   ========================================================= */

const content = [

  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A Marathi word meaning mother. Learn its pronunciation and how it is used in everyday speech.",
    verified: "Demo vocabulary"
  },

  {
    id: 2,
    type: "word",
    icon: "🌾",
    title: "Local Village Words",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A collection of regional words used in everyday village life and conversation.",
    verified: "Community demo"
  },

  {
    id: 3,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A folk story lesson exploring traditional storytelling, language, meaning and cultural context.",
    verified: "Prototype lesson"
  },

  {
    id: 4,
    type: "story",
    icon: "📚",
    title: "The Village Storyteller",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A traditional-style story showing how oral storytelling can pass knowledge between generations.",
    verified: "Community demo"
  },

  {
    id: 5,
    type: "proverb",
    icon: "💬",
    title: "Traditional Punjabi Proverb",
    region: "Punjab",
    language: "Punjabi",
    desc: "Discover a traditional proverb, its meaning, when it is used and the cultural idea behind it.",
    verified: "Demo proverb"
  },

  {
    id: 6,
    type: "proverb",
    icon: "🧠",
    title: "Wisdom Passed Down",
    region: "Maharashtra",
    language: "Marathi",
    desc: "Explore how proverbs preserve everyday wisdom and lessons through generations.",
    verified: "Community demo"
  },

  {
    id: 7,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "Explore a traditional Bengali folk-song experience with cultural context and oral tradition.",
    verified: "Demo recording"
  },

  {
    id: 8,
    type: "song",
    icon: "🎶",
    title: "Traditional Village Song",
    region: "Maharashtra",
    language: "Marathi",
    desc: "Learn how traditional songs carry language, memories, emotions and community traditions.",
    verified: "Community demo"
  },

  {
    id: 9,
    type: "oral",
    icon: "🎙️",
    title: "A Memory From My Village",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "An oral-history prototype showing how memories from knowledge holders can be preserved for younger generations.",
    verified: "Oral history demo"
  },

  {
    id: 10,
    type: "oral",
    icon: "👴",
    title: "Stories From Another Generation",
    region: "Punjab",
    language: "Punjabi",
    desc: "A demonstration of how elders can share memories, experiences and local knowledge through recorded oral histories.",
    verified: "Community demo"
  }

];


/* =========================================================
   QUIZ
   ========================================================= */

const quiz = [

  {
    q: "Which feature helps preserve how a regional word is actually spoken?",
    options: [
      "A pronunciation recording",
      "A colour theme",
      "A leaderboard",
      "A map"
    ],
    correct: 0
  },

  {
    q: "What is a good way to preserve an elder's oral knowledge?",
    options: [
      "Delete the recording",
      "Record it with appropriate consent and preserve its context",
      "Only write the title",
      "Replace it with unrelated information"
    ],
    correct: 1
  },

  {
    q: "What makes a folk story useful for interactive learning?",
    options: [
      "Story + meaning + cultural context + activity",
      "Only the title",
      "Only a picture",
      "Only a score"
    ],
    correct: 0
  },

  {
    q: "Why are proverbs important to folk knowledge?",
    options: [
      "They preserve traditional wisdom and ways of thinking",
      "They are only decorative",
      "They replace every language",
      "They are only used in games"
    ],
    correct: 0
  }

];


let currentQuiz = 0;
let score = 0;


/* =========================================================
   XP & PROGRESS
   ========================================================= */

let xp = Number(
  localStorage.getItem("lokoraXP") || 0
);


function updateXPDisplay() {

  const xpValue =
    document.getElementById("xpValue");

  if (xpValue) {
    xpValue.textContent = xp;
  }

}


function updateProgress() {

  const percentage =
    Math.min(
      100,
      Math.round(xp / 2)
    );

  const progressBar =
    document.getElementById("progressBar");

  const progressText =
    document.getElementById("progressText");

  if (progressBar) {

    progressBar.style.width =
      percentage + "%";

  }

  if (progressText) {

    progressText.textContent =
      percentage + "% complete";

  }

}


/* =========================================================
   EXPLORE CONTENT
   ========================================================= */

function renderContent() {

  const searchInput =
    document.getElementById("searchInput");

  const typeFilter =
    document.getElementById("typeFilter");

  const regionFilter =
    document.getElementById("regionFilter");

  const contentGrid =
    document.getElementById("contentGrid");


  if (
    !searchInput ||
    !typeFilter ||
    !regionFilter ||
    !contentGrid
  ) {
    return;
  }


  const query =
    searchInput.value
      .toLowerCase()
      .trim();


  const selectedType =
    typeFilter.value;


  const selectedRegion =
    regionFilter.value;


  const results =
    content.filter(item => {

      const matchesType =
        selectedType === "all" ||
        item.type === selectedType;


      const matchesRegion =
        selectedRegion === "all" ||
        item.region === selectedRegion;


      const searchable =
        (
          item.title +
          " " +
          item.language +
          " " +
          item.region +
          " " +
          item.desc
        ).toLowerCase();


      const matchesSearch =
        searchable.includes(query);


      return (
        matchesType &&
        matchesRegion &&
        matchesSearch
      );

    });


  if (!results.length) {

    contentGrid.innerHTML = `

      <article
        class="content-card"
        style="grid-column:1/-1"
      >

        <div class="card-icon">
          🔎
        </div>

        <h3>
          No knowledge found
        </h3>

        <p>
          Try another word, story, proverb,
          song, language or region.
        </p>

        <button
          class="audio-btn"
          type="button"
          onclick="resetExploreFilters()"
        >
          Show all knowledge →
        </button>

      </article>

    `;

    return;

  }


  contentGrid.innerHTML =
    results
      .map(item => createContentCard(item))
      .join("");

}


/* =========================================================
   CREATE CONTENT CARD
   ========================================================= */

function createContentCard(item) {

  let buttonHTML = "";


  if (item.type === "word") {

    buttonHTML = `

      <button
        class="audio-btn"
        type="button"
        onclick="playPronunciation('${escapeQuotes(item.title)}')"
      >
        🔊 Hear word
      </button>

    `;

  }


  else if (item.type === "story") {

    buttonHTML = `

      <button
        class="audio-btn"
        type="button"
        onclick="openStory('${escapeQuotes(item.title)}')"
      >
        📖 Open story
      </button>

    `;

  }


  else if (item.type === "proverb") {

    buttonHTML = `

      <button
        class="audio-btn"
        type="button"
        onclick="openProverbLesson()"
      >
        💬 Learn proverb
      </button>

    `;

  }


  else if (item.type === "song") {

    buttonHTML = `

      <button
        class="audio-btn"
        type="button"
        onclick="playDemoMusic()"
      >
        🎵 Listen
      </button>

    `;

  }


  else if (item.type === "oral") {

    buttonHTML = `

      <button
        class="audio-btn"
        type="button"
        onclick="openOralHistory()"
      >
        🎙️ Hear history
      </button>

    `;

  }


  return `

    <article class="content-card">

      <div class="card-icon">
        ${item.icon}
      </div>

      <span class="tag">
        ${formatType(item.type)}
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

        ${buttonHTML}

      </div>

    </article>

  `;

}


/* =========================================================
   CONTENT TYPE
   ========================================================= */

function formatType(type) {

  const labels = {

    word: "Local Vocabulary",

    story: "Folk Story",

    proverb: "Proverb / Idiom",

    song: "Traditional Song",

    oral: "Oral History"

  };


  return labels[type] || type;

}


/* =========================================================
   ESCAPE QUOTES
   ========================================================= */

function escapeQuotes(text) {

  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");

}


/* =========================================================
   SHOW ALL CONTENT
   ========================================================= */

function showAllContent() {

  const searchInput =
    document.getElementById("searchInput");

  const typeFilter =
    document.getElementById("typeFilter");

  const regionFilter =
    document.getElementById("regionFilter");


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


  const explore =
    document.getElementById("explore");


  if (explore) {

    explore.scrollIntoView({
      behavior: "smooth"
    });

  }


  showToast(
    "Showing all living knowledge."
  );

}


function resetExploreFilters() {

  showAllContent();

}


/* =========================================================
   EXPLORE EVENT SETUP
   ========================================================= */

function setupExplore() {

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


  renderContent();

}


/* =========================================================
   SPEECH / PRONUNCIATION
   ========================================================= */

function speak(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    showToast(
      "Speech is not supported by this browser."
    );

    return;

  }


  window.speechSynthesis.cancel();


  const utterance =
    new SpeechSynthesisUtterance(text);


  utterance.rate = 0.75;
  utterance.pitch = 1;


  window.speechSynthesis.speak(
    utterance
  );


  showToast(
    "Playing pronunciation…"
  );

}


function playPronunciation(word) {

  const pronunciationMap = {

    "Aai": "Aai",

    "Local Village Words":
      "Local village words"

  };


  const text =
    pronunciationMap[word] || word;


  speak(text);

}


/* =========================================================
   VOICES OF KNOWLEDGE HOLDERS
   ========================================================= */

function playDemoVoice() {

  const button =
    document.getElementById(
      "demoVoiceBtn"
    );


  speak(
    "Welcome to Lokora. Legacy Of Knowledge, Oral Records and Ancestry. Every voice carries a piece of knowledge."
  );


  if (button) {

    button.textContent =
      "⏸ Demo voice playing…";


    setTimeout(
      () => {

        button.textContent =
          "▶ Listen to a demo voice";

      },
      5000
    );

  }

}


/* =========================================================
   ORAL HISTORY
   ========================================================= */

function openOralHistory() {

  showInfoModal(

    "A Memory From My Village",

    "ORAL HISTORY",

    "This demo shows how Lokora can preserve a knowledge holder's memory. A complete version can include a consented recording, transcript, original language, translation, regional context and information about the person who shared it."

  );

}


/* =========================================================
   FOLK STORY
   ========================================================= */

function openStory(title) {

  showInfoModal(

    title,

    "STORY-BASED LEARNING",

    "This folk-story lesson can present the story in its original regional language, provide a translation, explain its cultural context, introduce important vocabulary and finish with an interactive activity or quiz."

  );

}


/* =========================================================
   TRADITIONAL SONG
   ========================================================= */

function playDemoMusic() {

  showInfoModal(

    "Baul Folk Song",

    "TRADITIONAL SONG",

    "This prototype demonstrates a traditional-song learning experience. A full version can contain a consented community recording, transcription, translation, pronunciation support and cultural context."

  );

}


/* =========================================================
   PROVERB LESSON
   ========================================================= */

function openProverbLesson() {

  showInfoModal(

    "Traditional Proverb",

    "PROVERBS & IDIOMS",

    "Proverbs preserve wisdom through generations. A Lokora lesson can explain the original proverb, its meaning, when people use it, its cultural context and then give learners a short situation-based activity."

  );

}


/* =========================================================
   VOCABULARY LESSON
   ========================================================= */

function openVocabularyLesson() {

  showInfoModal(

    "Words from Maharashtra",

    "LOCAL VOCABULARY",

    "Learn regional vocabulary through meaning, pronunciation and real-life usage. The full platform can connect each word with an audio recording from a knowledge holder and examples from everyday conversation."

  );

}


/* =========================================================
   CULTURAL KNOWLEDGE
   ========================================================= */

function openHeritageInfo(title) {

  showInfoModal(

    title,

    "CULTURAL KNOWLEDGE",

    "This Lokora entry focuses on living language and folk knowledge. Content can include regional vocabulary, oral traditions, stories, songs, proverbs, pronunciation and cultural context."

  );

}


/* =========================================================
   INFO MODAL
   ========================================================= */

function showInfoModal(
  title,
  label,
  description
) {

  const modal =
    document.getElementById(
      "infoModal"
    );


  const titleElement =
    document.getElementById(
      "infoTitle"
    );


  const labelElement =
    document.getElementById(
      "infoLabel"
    );


  const descriptionElement =
    document.getElementById(
      "infoDescription"
    );


  if (!modal) {

    showToast(description);

    return;

  }


  if (titleElement) {
    titleElement.textContent = title;
  }


  if (labelElement) {
    labelElement.textContent = label;
  }


  if (descriptionElement) {
    descriptionElement.textContent =
      description;
  }


  modal.classList.add("open");


  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeInfoModal() {

  const modal =
    document.getElementById(
      "infoModal"
    );


  if (!modal) return;


  modal.classList.remove("open");


  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   CONTRIBUTION MODAL
   ========================================================= */

function openContribution() {

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if (!modal) {

    showToast(
      "Contribution form is unavailable."
    );

    return;

  }


  modal.classList.add("open");


  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeContribution() {

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if (!modal) return;


  modal.classList.remove("open");


  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   CONTRIBUTION FORM
   ========================================================= */

function setupContributionForm() {

  const form =
    document.getElementById(
      "contributionForm"
    );


  if (!form) return;


  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const previous =
        Number(
          localStorage.getItem(
            "lokoraSubmissions"
          ) || 0
        );


      const newTotal =
        previous + 1;


      localStorage.setItem(
        "lokoraSubmissions",
        newTotal
      );


      const impactTotal =
        document.getElementById(
          "impactTotal"
        );


      if (impactTotal) {

        impactTotal.textContent =
          110 + newTotal;

      }


      form.reset();


      closeContribution();


      showToast(
        "Thank you! Your knowledge has entered the review queue."
      );

    }
  );

}


/* =========================================================
   QUIZ
   ========================================================= */

function startQuiz() {

  currentQuiz = 0;
  score = 0;


  const modal =
    document.getElementById(
      "quizModal"
    );


  if (!modal) {

    showToast(
      "Quiz modal is unavailable."
    );

    return;

  }


  modal.classList.add("open");


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  renderQuiz();

}


function closeQuiz() {

  const modal =
    document.getElementById(
      "quizModal"
    );


  if (!modal) return;


  modal.classList.remove("open");


  modal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* =========================================================
   RENDER QUIZ
   ========================================================= */

function renderQuiz() {

  const quizContent =
    document.getElementById(
      "quizContent"
    );


  if (!quizContent) return;


  const question =
    quiz[currentQuiz];


  if (!question) {

    finishQuiz();

    return;

  }


  quizContent.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1}
      OF ${quiz.length}
    </div>


    <h2 style="font-size:32px">
      ${question.q}
    </h2>


    <div>

      ${question.options
        .map(
          (option, index) => `

            <button
              class="quiz-option"
              type="button"
              onclick="answerQuiz(${index})"
            >
              ${option}
            </button>

          `
        )
        .join("")}

    </div>

  `;

}


/* =========================================================
   ANSWER QUIZ
   ========================================================= */

function answerQuiz(index) {

const question = quiz[currentQuiz];

if (!question) return;

const options =
document.querySelectorAll(".quiz-option");

options.forEach((button, number) => {

button.disabled = true;

if (number === question.correct) {
  button.classList.add("correct");
}

if (
  number === index &&
  number !== question.correct
) {
  button.classList.add("wrong");
}

});

if (index === question.correct) {

score++;

xp += 10;

localStorage.setItem(
  "lokoraXP",
  xp
);

showToast("Correct! +10 XP 🌱");

} else {

showToast("Not quite! Keep learning 🌿");

}

setTimeout(() => {

currentQuiz++;

renderQuiz();

}, 900);

}

/* =========================================================
FINISH QUIZ
========================================================= */

function finishQuiz() {

const quizContent =
document.getElementById("quizContent");

if (!quizContent) return;

updateXPDisplay();
updateProgress();

let message = "";

if (score === quiz.length) {
message =
"Excellent! You are becoming a true Culture Keeper.";
}
else if (score >= 2) {
message =
"Great work! Keep exploring India's living heritage.";
}
else {
message =
"Every journey begins with learning. Explore more and try again!";
}

quizContent.innerHTML = `

<div class="quiz-result">

  <div style="font-size:55px">
    🏆
  </div>

  <div class="section-label">
    LOKORA LEARNING
  </div>

  <h2>
    Quiz complete!
  </h2>

  <p>
    You scored
    <strong>${score}</strong>
    out of
    <strong>${quiz.length}</strong>.
  </p>

  <p>
    ${message}
  </p>

  <button
    class="btn primary"
    type="button"
    onclick="closeQuiz()"
  >
    Continue exploring →
  </button>

</div>

`;

}

/* =========================================================
INFO MODAL
========================================================= */

function showInfoModal(title, label, description) {

let modal =
document.getElementById("infoModal");

if (!modal) {

modal = document.createElement("div");

modal.id = "infoModal";

modal.className = "modal";

modal.setAttribute(
  "aria-hidden",
  "true"
);


modal.innerHTML = `

  <div
    class="modal-backdrop"
    onclick="closeInfoModal()"
  ></div>

  <div class="modal-card knowledge-card">

    <button
      class="modal-close"
      type="button"
      onclick="closeInfoModal()"
      aria-label="Close"
    >
      ×
    </button>

    <div class="knowledge-icon">
      🌿
    </div>

    <div class="section-label">
      ${label}
    </div>

    <h2>
      ${title}
    </h2>

    <p>
      ${description}
    </p>

    <div class="knowledge-detail">

      <strong>
        About this prototype
      </strong>

      <p>
        LOKORA — Legacy Of Knowledge, Oral Records &amp;
        Ancestry — is designed to connect knowledge holders
        with young learners and help preserve India's
        living languages, stories and folk traditions.
      </p>

    </div>

    <button
      class="btn primary"
      type="button"
      onclick="closeInfoModal()"
    >
      Done
    </button>

  </div>

`;


document.body.appendChild(modal);

}

const labelElement =
modal.querySelector(".section-label");

const titleElement =
modal.querySelector("h2");

const paragraphs =
modal.querySelectorAll(
".knowledge-card > p"
);

if (labelElement) {
labelElement.textContent = label;
}

if (titleElement) {
titleElement.textContent = title;
}

if (paragraphs[0]) {
paragraphs[0].textContent = description;
}

modal.classList.add("open");

modal.setAttribute(
"aria-hidden",
"false"
);

}

/* =========================================================
CLOSE INFO MODAL
========================================================= */

function closeInfoModal() {

const modal =
document.getElementById("infoModal");

if (!modal) return;

modal.classList.remove("open");

modal.setAttribute(
"aria-hidden",
"true"
);

}

/* =========================================================
MOBILE NAVIGATION
========================================================= */

function setupMobileMenu() {

const toggle =
document.getElementById("menuToggle");

const nav =
document.getElementById("mainNav");

if (!toggle || !nav) return;

toggle.addEventListener(
"click",
() => {

  const isOpen =
    nav.classList.toggle("open");


  toggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

}

);

nav.querySelectorAll("a").forEach(link => {

link.addEventListener(
  "click",
  () => {

    nav.classList.remove("open");

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }
);

});

}

/* =========================================================
XP INITIALIZATION
========================================================= */

function initializeXP() {

updateXPDisplay();

updateProgress();

}

/* =========================================================
IMPACT INITIALIZATION
========================================================= */

function initializeImpact() {

const submissions =
Number(
localStorage.getItem(
"lokoraSubmissions"
) || 0
);

const impactTotal =
document.getElementById(
"impactTotal"
);

if (impactTotal) {

impactTotal.textContent =
  110 + submissions;

}

}

/* =========================================================
ESCAPE KEY
========================================================= */

function setupKeyboardControls() {

document.addEventListener(
"keydown",
event => {

  if (event.key !== "Escape") return;


  closeContribution();

  closeQuiz();

  closeInfoModal();

}

);

}

/* =========================================================
TOAST
========================================================= */

let toastTimer;

function showToast(message) {

const toast =
document.getElementById("toast");

if (!toast) return;

toast.textContent = message;

toast.classList.add("show");

clearTimeout(toastTimer);

toastTimer =
setTimeout(() => {

  toast.classList.remove("show");

}, 2800);

}

/* =========================================================
MAIN INITIALIZATION
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

setupExplore();

setupContributionForm();

setupMobileMenu();

setupKeyboardControls();

initializeXP();

initializeImpact();

}
);
