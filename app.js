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
let xp = Number(localStorage.getItem("lokvaaniXP") || 0);

const xpValue = document.getElementById("xpValue");
if (xpValue) {
  xpValue.textContent = xp;
}

function renderContent() {
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const regionFilter = document.getElementById("regionFilter");
  const contentGrid = document.getElementById("contentGrid");

  if (!searchInput || !typeFilter || !regionFilter || !contentGrid) {
    return;
  }

  const q = (searchInput.value || "").toLowerCase().trim();
  const type = typeFilter.value;
  const region = regionFilter.value;

  const items = content.filter(x =>
    (type === "all" || x.type === type) &&
    (region === "all" || x.region === region) &&
    `${x.title} ${x.region} ${x.language} ${x.desc}`
      .toLowerCase()
      .includes(q)
  );

  contentGrid.innerHTML = items.length
    ? items.map(x => `
      <article class="content-card">
        <div class="card-icon">${x.icon}</div>
        <span class="tag">${x.type.replace("-", " ")}</span>
        <h3>${x.title}</h3>
        <p>${x.language} • ${x.region}</p>
        <p>${x.desc}</p>

        <div class="card-bottom">
          <span class="verified">✓ ${x.verified}</span>

          ${
            x.type === "monument"
              ? `<button class="audio-btn" onclick="showToast('Heritage information opened.')">Explore →</button>`
              : x.type === "dance" || x.type === "music"
                ? `<button class="audio-btn" onclick="showToast('Demo cultural audio selected.')">🎵 Listen</button>`
                : x.type === "story"
                  ? `<button class="audio-btn" onclick="showToast('Story lesson opened.')">📖 Open</button>`
                  : `<button class="audio-btn" onclick="showToast('Heritage lesson opened.')">Learn →</button>`
          }
        </div>
      </article>
    `).join("")
    : `
      <div class="content-card" style="grid-column:1/-1">
        <h3>No matches yet</h3>
        <p>Try another search or filter.</p>
      </div>
    `;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    showToast("Speech is not supported in this browser.");
    return;
  }

  speechSynthesis.cancel();

  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.8;

  speechSynthesis.speak(u);
  showToast("Playing pronunciation…");
}

function openContribution() {
  const modal = document.getElementById("contributionModal");

  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeContribution() {
  const modal = document.getElementById("contributionModal");

  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

function showToast(msg) {
  const t = document.getElementById("toast");

  if (!t) return;

  t.textContent = msg;
  t.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    t.classList.remove("show");
  }, 2600);
}

const contributionForm = document.getElementById("contributionForm");

if (contributionForm) {
  contributionForm.addEventListener("submit", e => {
    e.preventDefault();

    const old = Number(
      localStorage.getItem("lokvaaniSubmissions") || 0
    );

    localStorage.setItem(
      "lokvaaniSubmissions",
      old + 1
    );

    const impactTotal = document.getElementById("impactTotal");

    if (impactTotal) {
      impactTotal.textContent = 110 + old + 1;
    }

    e.target.reset();
    closeContribution();

    showToast(
      "Thank you! Your demo submission is now in the review queue."
    );
  });
}

function startQuiz() {
  currentQuiz = 0;
  score = 0;

  const modal = document.getElementById("quizModal");

  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  renderQuiz();
}

function closeQuiz() {
  const modal = document.getElementById("quizModal");

  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

function renderQuiz() {
  const quizContent = document.getElementById("quizContent");

  if (!quizContent) return;

  const item = quiz[currentQuiz];

  quizContent.innerHTML = `
    <div class="mini-label">
      QUESTION ${currentQuiz + 1} OF ${quiz.length}
    </div>

    <h2 style="font-size:32px">
      ${item.q}
    </h2>

    <div>
      ${item.options.map((o, i) => `
        <button
          class="quiz-option"
          onclick="answerQuiz(${i})"
        >
          ${o}
        </button>
      `).join("")}
    </div>
  `;
}

function answerQuiz(i) {
  const item = quiz[currentQuiz];

  document.querySelectorAll(".quiz-option").forEach((b, n) => {
    b.disabled = true;

    if (n === item.correct) {
      b.classList.add("correct");
    } else if (n === i) {
      b.classList.add("wrong");
    }
  });

  if (i === item.correct) {
    score++;
    xp += 20;

    localStorage.setItem(
      "lokvaaniXP",
      xp
    );

    const xpValue = document.getElementById("xpValue");

    if (xpValue) {
      xpValue.textContent = xp;
    }
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
            <div style="font-size:55px">🏆</div>

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
              onclick="closeQuiz()"
            >
              Continue exploring
            </button>
          </div>
        `;
      }
    }
  }, 850);
}

function updateProgress() {
  const pct = Math.min(
    100,
    Math.round(xp / 2)
  );

  const progressBar =
    document.getElementById("progressBar");

  const progressText =
    document.getElementById("progressText");

  if (progressBar) {
    progressBar.style.width = pct + "%";
  }

  if (progressText) {
    progressText.textContent =
      pct + "% complete";
  }
}

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
updateProgress();

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  document.querySelectorAll("#mainNav a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}
