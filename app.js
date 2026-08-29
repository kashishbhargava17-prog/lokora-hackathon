/* =========================================================
   LOKVAANI
   INTERACTIVE LANGUAGE & FOLK KNOWLEDGE
   Complete interaction script
   ========================================================= */


/* =========================================================
   CONTENT
   ========================================================= */

const content = [
  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A Marathi word for mother, carrying an important place in everyday family language.",
    verified: "Community demo"
  },

  {
    id: 2,
    type: "word",
    icon: "💬",
    title: "Paani",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A familiar regional vocabulary example showing how everyday words connect language with culture.",
    verified: "Language demo"
  },

  {
    id: 3,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A folk-story learning experience combining storytelling, language, cultural context and questions.",
    verified: "Prototype"
  },

  {
    id: 4,
    type: "proverb",
    icon: "💡",
    title: "Village Proverb",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A proverb activity showing how traditional sayings can teach ideas, values and everyday wisdom.",
    verified: "Community demo"
  },

  {
    id: 5,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-music learning example connecting traditional singing with language and oral knowledge.",
    verified: "Review needed"
  },

  {
    id: 6,
    type: "oral-history",
    icon: "🎙️",
    title: "A Grandmother's Memory",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A prototype oral-history entry showing how memories can be preserved with transcripts and cultural context.",
    verified: "Prototype"
  },

  {
    id: 7,
    type: "pronunciation",
    icon: "🔊",
    title: "Hear the Word",
    region: "Punjab",
    language: "Punjabi",
    desc: "A pronunciation activity demonstrating how learners can hear regional words from knowledge holders.",
    verified: "Audio demo"
  },

  {
    id: 8,
    type: "story",
    icon: "📚",
    title: "The Village Story",
    region: "Punjab",
    language: "Punjabi",
    desc: "A story-based learning example combining a traditional narrative with vocabulary and cultural context.",
    verified: "Prototype"
  }
];


/* =========================================================
   QUIZ
   ========================================================= */

const quiz = [
  {
    q: "Which feature helps preserve the way a regional word is actually spoken?",
    options: [
      "A pronunciation recording",
      "Only a photograph",
      "A leaderboard",
      "A colour theme"
    ],
    correct: 0
  },

  {
    q: "What is the best process for a community contribution?",
    options: [
      "Publish immediately",
      "Submit → Review → Validate → Publish",
      "Delete every submission",
      "Hide every contribution"
    ],
    correct: 1
  },

  {
    q: "Which combination makes a folk story useful for learning?",
    options: [
      "Story + meaning + cultural context + activity",
      "Only a title",
      "Only a picture",
      "Only a score"
    ],
    correct: 0
  },

  {
    q: "Who are the two main groups LokVaani connects?",
    options: [
      "Knowledge holders and young learners",
      "Tourists and hotels",
      "Drivers and passengers",
      "Shopkeepers and customers"
    ],
    correct: 0
  }
];


/* =========================================================
   VARIABLES
   ========================================================= */

let currentQuiz = 0;
let score = 0;

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);


/* =========================================================
   XP
   ========================================================= */

function updateXPDisplay() {

  const element =
    document.getElementById("xpValue");

  if (element) {
    element.textContent = xp;
  }
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  let toast =
    document.getElementById("toast");

  if (!toast) {

    toast =
      document.createElement("div");

    toast.id = "toast";
    toast.className = "toast";

    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(
    window.lokvaaniToastTimer
  );

  window.lokvaaniToastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);
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
    document.getElementById("infoModal");


  if (!modal) {

    modal =
      document.createElement("div");

    modal.id = "infoModal";
    modal.className = "modal";

    modal.innerHTML = `
      <div class="modal-backdrop" id="infoBackdrop"></div>

      <div class="modal-card">

        <button
          class="modal-close"
          id="infoClose"
          aria-label="Close">
          ×
        </button>

        <div
          class="section-label"
          id="infoSubtitle">
        </div>

        <h2 id="infoTitle"></h2>

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
          id="infoContinue">
          Continue exploring →
        </button>

      </div>
    `;

    document.body.appendChild(modal);


    document
      .getElementById("infoClose")
      .addEventListener(
        "click",
        closeInfoModal
      );


    document
      .getElementById("infoBackdrop")
      .addEventListener(
        "click",
        closeInfoModal
      );


    document
      .getElementById("infoContinue")
      .addEventListener(
        "click",
        closeInfoModal
      );
  }


  document
    .getElementById("infoTitle")
    .textContent = title;


  document
    .getElementById("infoSubtitle")
    .textContent = subtitle;


  document
    .getElementById("infoMessage")
    .textContent = message;


  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );
}


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
   EXPLORE
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


  const search =
    searchInput.value
      .toLowerCase()
      .trim();


  const selectedType =
    typeFilter.value;


  const selectedRegion =
    regionFilter.value;


  const results =
    content.filter(item => {

      const typeMatch =
        selectedType === "all" ||
        item.type === selectedType;


      const regionMatch =
        selectedRegion === "all" ||
        item.region === selectedRegion;


      const text =
        (
          item.title +
          " " +
          item.region +
          " " +
          item.language +
          " " +
          item.desc
        )
          .toLowerCase();


      const searchMatch =
        text.includes(search);


      return (
        typeMatch &&
        regionMatch &&
        searchMatch
      );
    });


  if (!results.length) {

    contentGrid.innerHTML = `
      <div
        class="content-card"
        style="grid-column:1/-1">

        <h3>No matches found</h3>

        <p>
          Try another word, language,
          region or content type.
        </p>

      </div>
    `;

    return;
  }


  contentGrid.innerHTML =
    results
      .map(createContentCard)
      .join("");
}


/* =========================================================
   CONTENT CARDS
   ========================================================= */

function createContentCard(item) {

  let actionText = "Learn →";
  let actionClass = "learn-action";


  if (item.type === "story") {
    actionText = "📖 Open story";
    actionClass = "story-action";
  }


  if (item.type === "proverb") {
    actionText = "💡 Explore proverb";
    actionClass = "proverb-action";
  }


  if (item.type === "song") {
    actionText = "🎵 Listen";
    actionClass = "song-action";
  }


  if (item.type === "oral-history") {
    actionText = "🎙️ Hear oral history";
    actionClass = "oral-action";
  }


  if (item.type === "pronunciation") {
    actionText = "🔊 Hear pronunciation";
    actionClass = "pronunciation-action";
  }


  return `
    <article
      class="content-card"
      data-content-id="${item.id}">

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

        <button
          class="audio-btn ${actionClass}"
          data-action="content"
          data-id="${item.id}">
          ${actionText}
        </button>

      </div>

    </article>
  `;
}


function formatType(type) {

  const names = {
    "word": "Local vocabulary",
    "story": "Folk story",
    "proverb": "Proverb / idiom",
    "song": "Traditional song",
    "oral-history": "Oral history",
    "pronunciation": "Pronunciation"
  };

  return (
    names[type] ||
    type
  );
}


/* =========================================================
   CONTENT ACTIONS
   ========================================================= */

function handleContentAction(id) {

  const item =
    content.find(
      x => x.id === Number(id)
    );


  if (!item) return;


  if (item.type === "story") {

    showInfoModal(
      item.title,
      "FOLK STORY LESSON",
      "This interactive story can include the original-language story, translation, vocabulary, cultural context and a short quiz. This prototype demonstrates that learning experience."
    );

    return;
  }


  if (item.type === "proverb") {

    showInfoModal(
      item.title,
      "PROVERB & IDIOM",
      "Learners can discover the meaning of this traditional saying, hear how it is pronounced, learn when it is used and try a situation-based activity."
    );

    return;
  }


  if (item.type === "song") {

    showInfoModal(
      item.title,
      "TRADITIONAL SONG",
      "A final version can connect a consented community recording with a transcript, translation, vocabulary and cultural context."
    );

    return;
  }


  if (item.type === "oral-history") {

    showInfoModal(
      item.title,
      "ORAL HISTORY",
      "This experience demonstrates how a knowledge holder's memory can be preserved through audio, transcript, language information and cultural context."
    );

    return;
  }


  if (item.type === "pronunciation") {

    speak(
      "This is a demonstration of pronunciation support in LokVaani."
    );

    return;
  }


  if (item.type === "word") {

    speak(
      item.title +
      ". " +
      item.desc
    );

    return;
  }


  showInfoModal(
    item.title,
    "LANGUAGE & FOLK KNOWLEDGE",
    item.desc
  );
}


/* =========================================================
   VIEW ALL
   ========================================================= */

function showAllContent() {

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
    document.getElementById(
      "explore"
    );


  if (explore) {

    explore.scrollIntoView({
      behavior: "smooth"
    });
  }
}


/* =========================================================
   SPEECH / PRONUNCIATION
   ========================================================= */

function speak(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    showToast(
      "Your browser does not support voice playback."
    );

    return;
  }


  speechSynthesis.cancel();


  const utterance =
    new SpeechSynthesisUtterance(
      text
    );


  utterance.rate = 0.8;
  utterance.pitch = 1;


  speechSynthesis.speak(
    utterance
  );


  showToast(
    "🔊 Playing pronunciation…"
  );
}


/* =========================================================
   VOICE OF ELDER
   ========================================================= */

function playDemoVoice() {

  speak(
    "Welcome to LokVaani. Every voice carries a piece of history. Our goal is to connect knowledge holders with young learners and preserve India's oral traditions."
  );
}


/* =========================================================
   ORAL HISTORY
   ========================================================= */

function openOralHistory() {

  showInfoModal(
    "A Grandmother's Memory",
    "HEAR ORAL HISTORY",
    "Imagine hearing a grandmother describe a childhood tradition in her own language. LokVaani can preserve that recording together with a transcript, translation and cultural context."
  );
}


/* =========================================================
   CONTRIBUTION
   ========================================================= */

function openContribution() {

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if (!modal) {

    showToast(
      "Contribution form is unavailable. Please refresh the page."
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
            "lokvaaniSubmissions"
          ) || 0
        );


      localStorage.setItem(
        "lokvaaniSubmissions",
        previous + 1
      );


      const total =
        document.getElementById(
          "impactTotal"
        );


      if (total) {

        total.textContent =
          110 +
          previous +
          1;
      }


      form.reset();


      closeContribution();


      showToast(
        "✓ Contribution submitted for review!"
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
      "Quiz is unavailable. Please refresh the page."
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


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );
}


function renderQuiz() {

  const container =
    document.getElementById(
      "quizContent"
    );


  if (!container) return;


  const question =
    quiz[currentQuiz];


  if (!question) return;


  container.innerHTML = `

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
              data-quiz-option="${index}">

              ${option}

            </button>

          `
        )
        .join("")}

    </div>
  `;


  container
    .querySelectorAll(
      "[data-quiz-option]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function() {

          answerQuiz(
            Number(
              this.dataset.quizOption
            )
          );

        }
      );

    });
}


function answerQuiz(index) {

  const question =
    quiz[currentQuiz];


  const buttons =
    document.querySelectorAll(
      ".quiz-option"
    );


  buttons.forEach(
    (button, number) => {

      button.disabled = true;


      if (
        number ===
        question.correct
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (
        number === index &&
        number !== question.correct
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  if (
    index ===
    question.correct
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
    800
  );
}


function finishQuiz() {

  updateProgress();


  const container =
    document.getElementById(
      "quizContent"
    );


  if (!container) return;


  container.innerHTML = `

    <div class="quiz-result">

      <div style="font-size:55px">
        🏆
      </div>

      <div class="section-label">
        QUIZ COMPLETE
      </div>

      <h2 style="font-size:40px">
        You scored
        ${score}/${quiz.length}
      </h2>

      <p>
        You earned
        ${score * 20} XP.
      </p>

      <button
        class="btn primary"
        id="quizContinue">

        Continue exploring →

      </button>

    </div>
  `;


  document
    .getElementById(
      "quizContinue"
    )
    .addEventListener(
      "click",
      closeQuiz
    );
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


  const bar =
    document.getElementById(
      "progressBar"
    );


  const text =
    document.getElementById(
      "progressText"
    );


  if (bar) {

    bar.style.width =
      percentage + "%";
  }


  if (text) {

    text.textContent =
      percentage +
      "% complete";
  }
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {
