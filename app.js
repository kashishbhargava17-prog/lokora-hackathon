const content = [
  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A commonly used Marathi word for mother, often carrying a strong sense of affection and respect.",
    verified: "Language demo"
  },
  {
    id: 2,
    type: "word",
    icon: "💬",
    title: "Pind",
    region: "Punjab",
    language: "Punjabi",
    desc: "A Punjabi word often used for a village or one's native village, connecting language with a sense of home.",
    verified: "Language demo"
  },
  {
    id: 3,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk-story lesson showing how traditional stories pass wisdom from one generation to another.",
    verified: "Story demo"
  },
  {
    id: 4,
    type: "proverb",
    icon: "💡",
    title: "A Village Proverb",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A traditional saying used to express everyday wisdom and teach younger generations through simple words.",
    verified: "Community demo"
  },
  {
    id: 5,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-song tradition where music and oral expression are used to share ideas, stories and philosophy.",
    verified: "Community demo"
  },
  {
    id: 6,
    type: "oral",
    icon: "👵",
    title: "Grandmother's Words",
    region: "Maharashtra",
    language: "Marathi",
    desc: "An example of how elders pass everyday expressions, memories and language knowledge to younger family members.",
    verified: "Oral history demo"
  },
  {
    id: 7,
    type: "knowledge",
    icon: "🌾",
    title: "Traditional Farming Wisdom",
    region: "Punjab",
    language: "Punjabi",
    desc: "Traditional knowledge about seasonal farming practices and observations passed down through generations.",
    verified: "Knowledge demo"
  },
  {
    id: 8,
    type: "story",
    icon: "📚",
    title: "The Village Storyteller",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-story concept showing how oral storytelling preserves local expressions, values and community memories.",
    verified: "Story demo"
  },
  {
    id: 9,
    type: "proverb",
    icon: "🧠",
    title: "Wisdom in a Saying",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A traditional proverb demonstrating how short sayings can communicate practical knowledge and life lessons.",
    verified: "Community demo"
  },
  {
    id: 10,
    type: "word",
    icon: "🔤",
    title: "Regional Expressions",
    region: "West Bengal",
    language: "Bengali",
    desc: "Everyday regional expressions that reveal how language changes across communities and generations.",
    verified: "Language demo"
  }
];


const quiz = [
  {
    q: "Which feature best preserves the way a traditional word is actually spoken?",
    options: [
      "A recording from a consented speaker",
      "Only a written translation",
      "A decorative image",
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
    q: "Which combination best helps learners understand folk knowledge?",
    options: [
      "Word + meaning + pronunciation + cultural context",
      "Only a logo",
      "Only a page counter",
      "Only a dictionary list"
    ],
    correct: 0
  }
];


let currentQuiz = 0;
let score = 0;

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);


// -------------------------
// XP
// -------------------------

const xpValue = document.getElementById("xpValue");

if (xpValue) {
  xpValue.textContent = xp;
}


// -------------------------
// EXPLORE CONTENT
// -------------------------

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


  const q =
    (searchInput.value || "")
      .toLowerCase()
      .trim();

  const type =
    typeFilter.value;

  const region =
    regionFilter.value;


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

        <div class="card-icon">
          ${x.icon}
        </div>

        <span class="tag">
          ${getTypeName(x.type)}
        </span>

        <h3>
          ${x.title}
        </h3>

        <p>
          ${x.language} • ${x.region}
        </p>

        <p>
          ${x.desc}
        </p>

        <div class="card-bottom">

          <span class="verified">
            ✓ ${x.verified}
          </span>

          ${
            x.type === "word"

              ? `<button
                  class="audio-btn"
                  onclick="speak('${escapeText(
                    x.title +
                    " is a regional language example from " +
                    x.region
                  )}')">
                  🔊 Hear
                </button>`

              : x.type === "song"

              ? `<button
                  class="audio-btn"
                  onclick="showToast('Demo folk-song audio selected.')">
                  🎵 Listen
                </button>`

              : x.type === "story"

              ? `<button
                  class="audio-btn"
                  onclick="showToast('Folk story lesson opened.')">
                  📖 Read
                </button>`

              : x.type === "proverb"

              ? `<button
                  class="audio-btn"
                  onclick="showToast('Proverb lesson opened.')">
                  💡 Learn
                </button>`

              : x.type === "oral"

              ? `<button
                  class="audio-btn"
                  onclick="showToast('Oral history selected.')">
                  🎙️ Listen
                </button>`

              : `<button
                  class="audio-btn"
                  onclick="showToast('Traditional knowledge lesson opened.')">
                  🌱 Explore
                </button>`
          }

        </div>

      </article>

    `).join("")

    : `

      <div
        class="content-card"
        style="grid-column:1/-1"
      >

        <h3>
          No matches yet
        </h3>

        <p>
          Try another word, content type or region.
        </p>

      </div>

    `;
}


// -------------------------
// CONTENT TYPE NAMES
// -------------------------

function getTypeName(type) {

  const names = {

    word: "Words & Vocabulary",

    story: "Folk Story",

    proverb: "Proverb & Idiom",

    song: "Folk Song",

    oral: "Oral History",

    knowledge: "Traditional Knowledge"

  };

  return names[type] || type;
}


// -------------------------
// SAFELY USE TEXT IN BUTTONS
// -------------------------

function escapeText(text) {

  return text
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}


// -------------------------
// SPEECH
// -------------------------

function speak(text) {

  if (!("speechSynthesis" in window)) {

    showToast(
      "Speech is not supported in this browser."
    );

    return;
  }


  speechSynthesis.cancel();


  const u =
    new SpeechSynthesisUtterance(text);

  u.rate = 0.8;


  speechSynthesis.speak(u);


  showToast(
    "Playing pronunciation…"
  );
}


// -------------------------
// CONTRIBUTION MODAL
// -------------------------

function openContribution() {

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if (modal) {

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }
}


function closeContribution() {

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if (modal) {

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }
}


// -------------------------
// TOAST
// -------------------------

function showToast(msg) {

  const t =
    document.getElementById("toast");


  if (!t) return;


  t.textContent = msg;

  t.classList.add("show");


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      t.classList.remove("show");

    }, 2600);

}


// -------------------------
// CONTRIBUTION FORM
// -------------------------

const contributionForm =
  document.getElementById(
    "contributionForm"
  );


if (contributionForm) {

  contributionForm.addEventListener(
    "submit",
    e => {

      e.preventDefault();


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


      e.target.reset();

      closeContribution();


      showToast(
        "Thank you! Your contribution is now in the review queue."
      );

    }
  );

}


// -------------------------
// QUIZ
// -------------------------

function startQuiz() {

  currentQuiz = 0;

  score = 0;


  const modal =
    document.getElementById(
      "quizModal"
    );


  if (modal) {

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  renderQuiz();
}


function closeQuiz() {

  const modal =
    document.getElementById(
      "quizModal"
    );


  if (modal) {

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }
}


function renderQuiz() {

  const quizContent =
    document.getElementById(
      "quizContent"
    );


  if (!quizContent) return;


  const item =
    quiz[currentQuiz];


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
        (o, i) => `

          <button
            class="quiz-option"
            onclick="answerQuiz(${i})"
          >
            ${o}
          </button>

        `
      ).join("")}

    </div>

  `;
}


function answerQuiz(i) {

  const item =
    quiz[currentQuiz];


  document
    .querySelectorAll(".quiz-option")
    .forEach((b, n) => {

      b.disabled = true;


      if (n === item.correct) {

        b.classList.add(
          "correct"
        );

      }

      else if (n === i) {

        b.classList.add(
          "wrong"
        );

      }

    });


  if (i === item.correct) {

    score++;

    xp += 20;


    localStorage.setItem(
      "lokvaaniXP",
      xp
    );


    const xpValue =
      document.getElementById(
        "xpValue"
      );


    if (xpValue) {

      xpValue.textContent =
        xp;

    }

  }


  setTimeout(() => {

    currentQuiz++;


    if (
      currentQuiz <
      quiz.length
    ) {

      renderQuiz();

    }

    else {

      updateProgress();


      const quizContent =
        document.getElementById(
          "quizContent"
        );


      if (quizContent) {

        quizContent.innerHTML = `

          <div class="quiz-result">

            <div
              style="font-size:55px"
            >
              🏆
            </div>

            <div class="section-label">
              QUIZ COMPLETE
            </div>

            <h2
              style="font-size:40px"
            >
              You scored
              ${score}/${quiz.length}
            </h2>

            <p>
              You earned
              ${score * 20} XP.
              Keep exploring language
              and folk knowledge!
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


// -------------------------
// PROGRESS
// -------------------------

function updateProgress() {

  const pct =
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
      pct + "%";

  }


  if (progressText) {

    progressText.textContent =
      pct + "% complete";

  }

}


// -------------------------
// EXPLORE FILTERS
// -------------------------

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

updateProgress();


// -------------------------
// MOBILE MENU
// -------------------------

const menuToggle =
  document.getElementById(
    "menuToggle"
  );


const mainNav =
  document.getElementById(
    "mainNav"
  );


if (
  menuToggle &&
  mainNav
) {

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
    .forEach(a => {

      a.addEventListener(
        "click",
        () => {

          mainNav.classList.remove(
            "open"
          );

        }
      );

    });

}
