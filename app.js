const content = [
  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A warm everyday Marathi word meaning mother. Hear it spoken and learn how it is used.",
    verified: "Language demo",
    action: "listen"
  },
  {
    id: 2,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk story about a clever farmer who uses wisdom to solve a difficult situation.",
    verified: "Story demo",
    action: "read"
  },
  {
    id: 3,
    type: "proverb",
    icon: "💡",
    title: "A Village Proverb",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A traditional saying used to express everyday wisdom and teach younger generations.",
    verified: "Community demo",
    action: "learn"
  },
  {
    id: 4,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A Bengali folk-song tradition where music and oral expression are used to share ideas and stories.",
    verified: "Community demo",
    action: "listen"
  },
  {
    id: 5,
    type: "word",
    icon: "🗣️",
    title: "Pind",
    region: "Punjab",
    language: "Punjabi",
    desc: "A Punjabi word often used for a village or hometown. Learn its meaning and everyday use.",
    verified: "Language demo",
    action: "listen"
  },
  {
    id: 6,
    type: "proverb",
    icon: "💡",
    title: "Wisdom of Elders",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A traditional saying passed between generations and used to share practical wisdom.",
    verified: "Community demo",
    action: "learn"
  },
  {
    id: 7,
    type: "story",
    icon: "📚",
    title: "The Village Storyteller",
    region: "Punjab",
    language: "Punjabi",
    desc: "A short oral-history style story showing how knowledge is passed from elders to younger listeners.",
    verified: "Prototype",
    action: "read"
  },
  {
    id: 8,
    type: "oral",
    icon: "🎙️",
    title: "Grandmother's Memory",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A demo oral-history entry showing how memories, traditions and language can be preserved together.",
    verified: "Oral history demo",
    action: "read"
  }
];

const quiz = [
  {
    q: "Which feature most directly helps preserve pronunciation?",
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

let xp = Number(localStorage.getItem("lokvaaniXP") || 0);

document.addEventListener("DOMContentLoaded", () => {

  const xpValue = document.getElementById("xpValue");

  if (xpValue) {
    xpValue.textContent = xp;
  }

  setupFilters();
  setupMenu();
  setupContributionForm();

  renderContent();
  updateProgress();
});


/* =========================
   CONTENT / FILTERS
========================= */

function setupFilters() {

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");

  if (searchInput) {
    searchInput.addEventListener("input", renderContent);
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", renderContent);
  }

  if (regionFilter) {
    regionFilter.addEventListener("change", renderContent);
  }
}


function renderContent() {

  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");
  const contentGrid = document.getElementById("contentGrid");

  if (!searchInput || !typeFilter || !regionFilter || !contentGrid) {
    return;
  }

  const search = searchInput.value.toLowerCase().trim();
  const selectedType = typeFilter.value;
  const selectedRegion = regionFilter.value;

  const filtered = content.filter(item => {

    const matchesType =
      selectedType === "all" ||
      item.type === selectedType;

    const matchesRegion =
      selectedRegion === "all" ||
      item.region === selectedRegion;

    const searchableText =
      `${item.title} ${item.region} ${item.language} ${item.desc}`
        .toLowerCase();

    const matchesSearch =
      searchableText.includes(search);

    return matchesType && matchesRegion && matchesSearch;
  });


  if (filtered.length === 0) {

    contentGrid.innerHTML = `
      <div class="content-card" style="grid-column:1/-1">
        <div class="card-icon">🔎</div>
        <h3>No matches found</h3>
        <p>Try another word, story, proverb or region.</p>
      </div>
    `;

    return;
  }


  contentGrid.innerHTML = filtered.map(item => {

    let button = "";

    if (item.action === "listen") {

      button = `
        <button
          class="audio-btn"
          onclick="listenContent(${item.id})">
          🔊 Listen
        </button>
      `;

    } else if (item.action === "read") {

      button = `
        <button
          class="audio-btn"
          onclick="openContent(${item.id})">
          📖 Open story
        </button>
      `;

    } else {

      button = `
        <button
          class="audio-btn"
          onclick="openContent(${item.id})">
          💡 Learn more
        </button>
      `;
    }


    return `
      <article class="content-card">

        <div class="card-icon">
          ${item.icon}
        </div>

        <span class="tag">
          ${getTypeLabel(item.type)}
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


function getTypeLabel(type) {

  const labels = {
    word: "word",
    story: "story",
    proverb: "proverb",
    song: "folk song",
    oral: "oral history"
  };

  return labels[type] || type;
}


/* =========================
   LISTENING
========================= */

function listenContent(id) {

  const item = content.find(x => x.id === id);

  if (!item) return;

  if (item.title === "Aai") {

    speak(
      "Aai. A Marathi word meaning mother."
    );

    return;
  }

  speak(
    `${item.title}. ${item.desc}`
  );
}


function speak(text) {

  if (!("speechSynthesis" in window)) {

    showToast(
      "Your browser does not support audio playback."
    );

    return;
  }

  speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = 0.8;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);

  showToast("🔊 Playing audio...");
}


/* =========================
   CONTENT DETAILS
========================= */

function openContent(id) {

  const item = content.find(x => x.id === id);

  if (!item) return;

  const existing = document.getElementById("contentModal");

  if (existing) {
    existing.remove();
  }


  let extraText = "";

  if (item.type === "story") {

    extraText = `
      <h3>The Story</h3>

      <p>
        Long ago, a farmer in a small village faced
        a difficult problem. Instead of giving up,
        he used patience and clever thinking to find
        a simple solution.
      </p>

      <p>
        Stories like this were traditionally shared
        through spoken storytelling, allowing wisdom
        to travel from one generation to the next.
      </p>
    `;

  } else if (item.type === "proverb") {

    extraText = `
      <h3>Why it matters</h3>

      <p>
        Proverbs are short expressions that carry
        lessons, observations and practical wisdom.
        They are often remembered because they are
        easy to repeat and share.
      </p>

      <p>
        This prototype shows how a proverb can be
        connected with its language, region and
        cultural context.
      </p>
    `;

  } else if (item.type === "oral") {

    extraText = `
      <h3>Oral history</h3>

      <p>
        Oral histories preserve memories and personal
        experiences through spoken storytelling.
      </p>

      <p>
        In a real version of LokVaani, recordings would
        be collected with appropriate consent and
        reviewed before publication.
      </p>
    `;

  } else if (item.type === "song") {

    extraText = `
      <h3>About the tradition</h3>

      <p>
        Folk songs are an important way communities
        pass stories, ideas and cultural knowledge
        between generations.
      </p>
    `;
  }


  const modal = document.createElement("div");

  modal.id = "contentModal";
  modal.className = "modal open";

  modal.innerHTML = `

    <div
      class="modal-backdrop"
      onclick="closeContent()">
    </div>

    <div class="modal-card">

      <button
        class="modal-close"
        onclick="closeContent()">
        ×
      </button>

      <div class="section-label">
        ${getTypeLabel(item.type).toUpperCase()}
      </div>

      <div
        style="
          font-size:55px;
          margin-top:10px;
        ">
        ${item.icon}
      </div>

      <h2>
        ${item.title}
      </h2>

      <p>
        <strong>${item.language}</strong>
        • ${item.region}
      </p>

      <p>
        ${item.desc}
      </p>

      ${extraText}

      <div
        style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:25px;
        ">

        ${
          item.type === "word" ||
          item.type === "song"

          ? `
            <button
              class="btn primary"
              onclick="listenContent(${item.id})">
              🔊 Listen
            </button>
          `

          : ""
        }

        <button
          class="btn ghost"
          onclick="closeContent()">
          Close
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);
}


function closeContent() {

  const modal =
    document.getElementById("contentModal");

  if (modal) {
    modal.remove();
  }
}


/* =========================
   TOAST
========================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
}


/* =========================
   CONTRIBUTION
========================= */

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


function setupContributionForm() {

  const form =
    document.getElementById("contributionForm");

  if (!form) return;

  form.addEventListener("submit", event => {

    event.preventDefault();

    const old =
      Number(
        localStorage.getItem(
          "lokvaaniSubmissions"
        ) || 0
      );

    const updated = old + 1;

    localStorage.setItem(
      "lokvaaniSubmissions",
      updated
    );

    const impactTotal =
      document.getElementById("impactTotal");

    if (impactTotal) {
      impactTotal.textContent =
        110 + updated;
    }

    form.reset();

    closeContribution();

    showToast(
      "✓ Thank you! Your contribution has been submitted for review."
    );
  });
}


/* =========================
   QUIZ
========================= */

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

  const quizContent =
    document.getElementById("quizContent");

  if (!quizContent) return;

  const question =
    quiz[currentQuiz];

  quizContent.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1} OF ${quiz.length}
    </div>

    <h2 style="font-size:32px">
      ${question.q}
    </h2>

    <div>

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

  const question =
    quiz[currentQuiz];

  const buttons =
    document.querySelectorAll(".quiz-option");

  buttons.forEach((button, number) => {

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

    xp += 20;

    localStorage.setItem(
      "lokvaaniXP",
      xp
    );

    const xpValue =
      document.getElementById("xpValue");

    if (xpValue) {
      xpValue.textContent = xp;
    }

    showToast("🎉 Correct! +20 XP");
  } else {

    showToast("Not quite — keep learning!");
  }


  setTimeout(() => {

    currentQuiz++;

    if (currentQuiz < quiz.length) {

      renderQuiz();

    } else {

      updateProgress();

      const quizContent =
        document.getElementById("quizContent");

      if (quizContent) {

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
              Keep exploring to learn more.
            </p>

            <button
              class="btn primary"
              onclick="closeQuiz()">
              Continue exploring
            </button>

          </div>
        `;
      }
    }

  }, 850);
}


/* =========================
   PROGRESS
========================= */

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


/* =========================
   MOBILE MENU
========================= */

function setupMenu() {

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("open");

  });


  document
    .querySelectorAll("#mainNav a")
    .forEach(link => {

      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
      });

    });
}
