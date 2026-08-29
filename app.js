/* =========================================================
   LOKVAANI — INTERACTIVE LANGUAGE & FOLK KNOWLEDGE
   Main interaction script
   ========================================================= */

/* ---------- HERITAGE CONTENT ---------- */

const content = [
  {
    id: 1,
    type: "monument",
    icon: "🏛️",
    title: "Taj Mahal",
    region: "Uttar Pradesh",
    language: "Hindi",
    desc: "A world-famous monument in Agra, known for its architecture and cultural heritage.",
    verified: "Heritage demo"
  },
  {
    id: 2,
    type: "monument",
    icon: "🏰",
    title: "Red Fort",
    region: "Delhi",
    language: "Hindi",
    desc: "A historic Mughal-era fort representing an important chapter of India's architectural heritage.",
    verified: "Heritage demo"
  },
  {
    id: 3,
    type: "dance",
    icon: "💃",
    title: "Lavani",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A traditional Maharashtrian performance tradition combining expressive movement, rhythm and storytelling.",
    verified: "Community demo"
  },
  {
    id: 4,
    type: "festival",
    icon: "🪔",
    title: "Diwali",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A widely celebrated festival of lights with regional traditions, food, stories and family customs.",
    verified: "Heritage demo"
  },
  {
    id: 5,
    type: "art",
    icon: "🎨",
    title: "Warli Art",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A traditional visual-art style associated with the Warli community, often depicting everyday life and nature.",
    verified: "Community demo"
  },
  {
    id: 6,
    type: "music",
    icon: "🎵",
    title: "Baul Music",
    region: "West Bengal",
    language: "Bengali",
    desc: "A distinctive Bengali folk music tradition connected with travelling singers, philosophy and oral expression.",
    verified: "Review needed"
  },
  {
    id: 7,
    type: "food",
    icon: "🍛",
    title: "Rajasthani Cuisine",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A rich culinary tradition shaped by regional ingredients, climate and generations of family knowledge.",
    verified: "Community demo"
  },
  {
    id: 8,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A prototype folk-story lesson showing how stories can be preserved with context and learning activities.",
    verified: "Prototype"
  }
];


/* ---------- QUIZ ---------- */

const quiz = [
  {
    q: "Which feature most directly helps preserve pronunciation as oral heritage?",
    options: [
      "Audio recordings from consented speakers",
      "Only a written translation",
      "A color theme",
      "A leaderboard"
    ],
    correct: 0
  },
  {
    q: "What is the strongest workflow for a community contribution?",
    options: [
      "Publish immediately",
      "Submit → review → validate → publish",
      "Delete every submission",
      "Hide all contributions"
    ],
    correct: 1
  },
  {
    q: "Which feature best connects learning with cultural context?",
    options: [
      "Story + meaning + context + quiz",
      "Only a dictionary list",
      "Only a logo",
      "Only a page counter"
    ],
    correct: 0
  }
];

let currentQuiz = 0;
let score = 0;


/* =========================================================
   XP
   ========================================================= */

let xp = Number(localStorage.getItem("lokvaaniXP") || 0);

function updateXPDisplay() {
  const xpValue = document.getElementById("xpValue");

  if (xpValue) {
    xpValue.textContent = xp;
  }
}


/* =========================================================
   EXPLORE
   ========================================================= */

function renderContent() {

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");
  const contentGrid = document.getElementById("contentGrid");

  if (!searchInput || !typeFilter || !regionFilter || !contentGrid) {
    return;
  }

  const q = searchInput.value.toLowerCase().trim();
  const type = typeFilter.value;
  const region = regionFilter.value;

  const items = content.filter(item => {

    const matchesType =
      type === "all" || item.type === type;

    const matchesRegion =
      region === "all" || item.region === region;

    const searchableText =
      `${item.title} ${item.region} ${item.language} ${item.desc}`
        .toLowerCase();

    const matchesSearch =
      searchableText.includes(q);

    return matchesType &&
           matchesRegion &&
           matchesSearch;
  });


  if (!items.length) {

    contentGrid.innerHTML = `
      <div class="content-card" style="grid-column:1/-1">
        <h3>No matches yet</h3>
        <p>Try another search or filter.</p>
      </div>
    `;

    return;
  }


  contentGrid.innerHTML = items.map(item => {

    let button = "";

    if (item.type === "monument") {

      button = `
        <button
          class="audio-btn"
          onclick="openHeritageInfo('${item.title}')">
          Explore →
        </button>
      `;

    } else if (item.type === "dance") {

      button = `
        <button
          class="audio-btn"
          onclick="showToast('Lavani learning activity opened.')">
          🎭 Learn
        </button>
      `;

    } else if (item.type === "music") {

      button = `
        <button
          class="audio-btn"
          onclick="playDemoMusic()">
          🎵 Listen
        </button>
      `;

    } else if (item.type === "story") {

      button = `
        <button
          class="audio-btn"
          onclick="openStory('${item.title}')">
          📖 Open story
        </button>
      `;

    } else {

      button = `
        <button
          class="audio-btn"
          onclick="showToast('Interactive heritage lesson opened.')">
          Learn →
        </button>
      `;
    }


    return `
      <article class="content-card">

        <div class="card-icon">
          ${item.icon}
        </div>

        <span class="tag">
          ${item.type.replace("-", " ")}
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


/* =========================================================
   EXPLORE BUTTON ACTIONS
   ========================================================= */

function openHeritageInfo(title) {

  showInfoModal(
    title,
    "Explore this heritage entry",
    "This prototype demonstrates how LokVaani can connect learners with regional language, cultural context and community knowledge."
  );
}


function openStory(title) {

  showInfoModal(
    title,
    "Folk Story Lesson",
    "This story lesson can include the original-language story, translation, pronunciation, cultural context and a short comprehension activity."
  );
}


function playDemoMusic() {

  showInfoModal(
    "Baul Music",
    "Traditional Song Experience",
    "In the final version, this section can contain a consented community recording, lyrics or transcription, translation, pronunciation support and cultural context."
  );
}


/* =========================================================
   VOICE / PRONUNCIATION
   ========================================================= */

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

  utterance.rate = 0.8;

  speechSynthesis.speak(utterance);

  showToast("Playing pronunciation…");
}


/* =========================================================
   VOICES OF ELDERS
   ========================================================= */

function playDemoVoice() {

  /*
    Browser speech is used here so the button
    actually performs an action without requiring
    an external audio file.
  */

  speak(
    "Welcome to LokVaani. Every voice carries a piece of history."
  );
}


function openOralHistory() {

  showInfoModal(
    "Oral History",
    "Hear a community memory",
    "This prototype demonstrates an oral-history experience. A real deployment can connect a consented recording from a knowledge holder with its transcript, language, location context and translation."
  );
}


/* =========================================================
   CONTRIBUTION MODAL
   ========================================================= */

function openContribution() {

  const modal =
    document.getElementById("contributionModal");

  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute(
    "aria-hidden",
    "false"
  );
}


function closeContribution() {

  const modal =
    document.getElementById("contributionModal");

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
    document.getElementById("contributionForm");

  if (!form) return;

  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      const old =
        Number(
          localStorage.getItem(
            "lokvaaniSubmissions"
          ) || 0
        );

      localStorage.setItem(
        "lokvaaniSubmissions",
        old + 1
      );

      const impactTotal =
        document.getElementById(
          "impactTotal"
        );

      if (impactTotal) {

        impactTotal.textContent =
          110 + old + 1;
      }

      form.reset();

      closeContribution();

      showToast(
        "Thank you! Your contribution has entered the review queue."
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
    document.getElementById("quizModal");

  if (!modal) return;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  renderQuiz();
}


function closeQuiz() {

  const modal =
    document.getElementById("quizModal");

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );
}


function renderQuiz() {

  const quizContent =
    document.getElementById(
      "quizContent"
    );

  if (!quizContent) return;

  const item =
    quiz[currentQuiz];

  if (!item) return;

  quizContent.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1}
      OF ${quiz.length}
    </div>

    <h2 style="font-size:32px">
      ${item.q}
    </h2>

    <div>

      ${item.options.map(
        (option, index) => `

          <button
            class="quiz-option"
            onclick="answerQuiz(${index})">

            ${option}

          </button>

        `
      ).join("")}

    </div>

  `;
}


function answerQuiz(index) {

  const item =
    quiz[currentQuiz];

  document
    .querySelectorAll(".quiz-option")
    .forEach(
      (button, number) => {

        button.disabled = true;

        if (
          number === item.correct
        ) {

          button.classList.add(
            "correct"
          );

        } else if (
          number === index
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

    updateXPDisplay();
  }


  setTimeout(
    () => {

      currentQuiz++;

      if (
        currentQuiz <
        quiz.length
      ) {

        renderQuiz();

      } else {

        finishQuiz();
      }

    },
    850
  );
}


function finishQuiz() {

  updateProgress();

  const quizContent =
    document.getElementById(
      "quizContent"
    );

  if (!quizContent) return;

  quizContent.innerHTML = `

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
        Keep exploring to unlock more heritage badges.
      </p>

      <button
        class="btn primary"
        onclick="closeQuiz()">

        Continue exploring

      </button>

    </div>

  `;
}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

  const percentage =
    Math.min(
      100,
      Math.round(xp / 2)
    );

  const progressBar =
    document.getElementById(
      "progressBar"
    );

  const progressText =
    document.getElementById(
      "progressText"
    );

  if (progressBar) {

    progressBar.style.width =
      percentage + "%";
  }

  if (progressText) {

    progressText.textContent =
      percentage +
      "% complete";
  }
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    window.lokvaaniToast
  );

  window.lokvaaniToast =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );
}


/* =========================================================
   INFORMATION MODAL
   ========================================================= */

function showInfoModal(
  title,
  subtitle,
  message
) {

  let modal =
    document.getElementById(
      "infoModal"
    );


  /*
    Create the modal automatically.
    This means you do NOT have to edit index.html.
  */

  if (!modal) {

    modal =
      document.createElement(
        "div"
      );

    modal.id =
      "infoModal";

    modal.className =
      "modal";

    modal.innerHTML = `

      <div
        class="modal-backdrop"
        onclick="closeInfoModal()">
      </div>

      <div class="modal-card">

        <button
          class="modal-close"
          onclick="closeInfoModal()"
          aria-label="Close">

          ×

        </button>

        <div
          class="section-label"
          id="infoSubtitle">
        </div>

        <h2
          id="infoTitle">
        </h2>

        <p
          id="infoMessage"
          style="
            color:var(--muted);
            font-size:15px;
            line-height:1.8;
          ">
        </p>

        <button
          class="btn primary"
          onclick="closeInfoModal()">

          Continue exploring →

        </button>

      </div>
    `;

    document.body.appendChild(
      modal
    );
  }


  document.getElementById(
    "infoTitle"
  ).textContent = title;

  document.getElementById(
    "infoSubtitle"
  ).textContent = subtitle;

  document.getElementById(
    "infoMessage"
  ).textContent = message;


  modal.classList.add(
    "open"
  );

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

  modal.classList.remove(
    "open"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

  const menuToggle =
    document.getElementById(
      "menuToggle"
    );

  const mainNav =
    document.getElementById(
      "mainNav"
    );

  if (
    !menuToggle ||
    !mainNav
  ) return;


  menuToggle.addEventListener(
    "click",
    () => {

      mainNav.classList.toggle(
        "open"
      );

    }
  );


  document
    .querySelectorAll(
      "#mainNav a"
    )
    .forEach(
      link => {

        link.addEventListener(
          "click",
          () => {

            mainNav.classList.remove(
              "open"
            );

          }
        );

      }
    );
}


/* =========================================================
   EXPLORE FILTER EVENTS
   ========================================================= */

function setupExplore() {

  const searchInput =
    document.getElementById(
      "searchInput"
    );

  const typeFilter =
    document.getElementById(
      "typeFilter"
    );

  const regionFilter =
    document.getElementById(
      "regionFilter"
    );


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
   START EVERYTHING
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateXPDisplay();

    updateProgress();

    setupExplore();

    setupContributionForm();

    setupMobileMenu();

  }
);
