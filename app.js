/* =========================================
   LOKVAANI
   INTERACTIVE LANGUAGE & FOLK KNOWLEDGE
========================================= */


/* =========================================
   CONTENT
========================================= */

const content = [

  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A warm everyday Marathi word meaning mother. Hear it spoken and learn how it is used.",
    verified: "Community demo",
    speech: "Aai"
  },

  {
    id: 2,
    type: "word",
    icon: "📚",
    title: "Namaskar",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A respectful greeting used in Marathi and several other Indian languages.",
    verified: "Heritage demo",
    speech: "Namaskar"
  },

  {
    id: 3,
    type: "phrase",
    icon: "💬",
    title: "Everyday Marathi Phrase",
    region: "Maharashtra",
    language: "Marathi",
    desc: "Learn how a commonly spoken Marathi phrase sounds and when people use it in conversation.",
    verified: "Community demo",
    speech: "Namaskar, kasa ahes?"
  },

  {
    id: 4,
    type: "proverb",
    icon: "🌾",
    title: "A Village Proverb",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A traditional saying passed through generations, carrying advice and local wisdom.",
    verified: "Community demo"
  },

  {
    id: 5,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk story demonstrating how oral storytelling can pass knowledge between generations.",
    verified: "Prototype"
  },

  {
    id: 6,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song",
    region: "West Bengal",
    language: "Bengali",
    desc: "A folk-music tradition connected with travelling singers, philosophy and oral expression.",
    verified: "Review needed"
  },

  {
    id: 7,
    type: "word",
    icon: "🌿",
    title: "Lok",
    region: "West Bengal",
    language: "Bengali",
    desc: "A word connected with people and community, showing how language carries cultural meaning.",
    verified: "Heritage demo",
    speech: "Lok"
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



/* =========================================
   QUIZ
========================================= */

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


/* =========================================
   FILTER STATE
========================================= */

let selectedType = "all";
let selectedRegion = "all";


/* =========================================
   XP
========================================= */

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);


const xpValue =
  document.getElementById("xpValue");

if (xpValue) {
  xpValue.textContent = xp;
}



/* =========================================
   TOAST
========================================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  if (!toast) {
    alert(message);
    return;
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2600);

}



/* =========================================
   SPEECH
========================================= */

function speak(text) {

  if (!("speechSynthesis" in window)) {

    showToast(
      "Voice playback is not supported by this browser."
    );

    return;
  }

  speechSynthesis.cancel();

  const voice =
    new SpeechSynthesisUtterance(text);

  voice.rate = 0.8;
  voice.pitch = 1;

  speechSynthesis.speak(voice);

  showToast(
    "🔊 Playing demo pronunciation..."
  );

}



/* =========================================
   EXPLORE
========================================= */

function renderContent() {

  const searchInput =
    document.getElementById("searchInput");

  const contentGrid =
    document.getElementById("contentGrid");

  if (!searchInput || !contentGrid) {
    return;
  }


  const search =
    searchInput.value
      .toLowerCase()
      .trim();


  const items =
    content.filter(item => {

      const matchesSearch =
        `${item.title}
         ${item.language}
         ${item.region}
         ${item.desc}`
          .toLowerCase()
          .includes(search);


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



  if (!items.length) {

    contentGrid.innerHTML = `

      <div class="content-card empty-card">

        <h3>
          No matches found
        </h3>

        <p>
          Try another word, phrase,
          story or region.
        </p>

      </div>

    `;

    return;
  }



  contentGrid.innerHTML =

    items.map(item => {

      let button = "";



      /* WORD / PHRASE */

      if (
        item.type === "word" ||
        item.type === "phrase"
      ) {

        button = `

          <button
            class="audio-btn"
            type="button"
            onclick="speakItem(${item.id})"
          >
            🔊 Listen
          </button>

        `;

      }



      /* STORY */

      else if (item.type === "story") {

        button = `

          <button
            class="audio-btn"
            type="button"
            onclick="openStory(${item.id})"
          >
            📖 Open story
          </button>

        `;

      }



      /* SONG */

      else if (item.type === "song") {

        button = `

          <button
            class="audio-btn"
            type="button"
            onclick="playSongDemo(${item.id})"
          >
            🎵 Listen
          </button>

        `;

      }



      /* PROVERB */

      else if (item.type === "proverb") {

        button = `

          <button
            class="audio-btn"
            type="button"
            onclick="openProverb(${item.id})"
          >
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

            ${button}

          </div>

        </article>

      `;

    }).join("");

}



/* =========================================
   VIEW ALL
========================================= */

function viewAllContent() {

  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {
    searchInput.value = "";
  }


  selectedType = "all";
  selectedRegion = "all";


  const typeLabel =
    document.getElementById(
      "typeFilterLabel"
    );

  const regionLabel =
    document.getElementById(
      "regionFilterLabel"
    );


  if (typeLabel) {
    typeLabel.textContent =
      "All content";
  }


  if (regionLabel) {
    regionLabel.textContent =
      "All regions";
  }


  closeAllFilters();

  renderContent();


  document
    .getElementById("explore")
    ?.scrollIntoView({
      behavior: "smooth"
    });

}



/* =========================================
   CUSTOM TYPE FILTER
========================================= */

function toggleTypeFilter() {

  const menu =
    document.getElementById(
      "typeFilterMenu"
    );

  const regionMenu =
    document.getElementById(
      "regionFilterMenu"
    );


  if (regionMenu) {
    regionMenu.classList.remove("show");
  }


  if (menu) {
    menu.classList.toggle("show");
  }

}



function chooseType(type, label) {

  selectedType = type;


  const labelElement =
    document.getElementById(
      "typeFilterLabel"
    );


  if (labelElement) {
    labelElement.textContent = label;
  }


  const menu =
    document.getElementById(
      "typeFilterMenu"
    );


  if (menu) {
    menu.classList.remove("show");
  }


  renderContent();

}



/* =========================================
   CUSTOM REGION FILTER
========================================= */

function toggleRegionFilter() {

  const menu =
    document.getElementById(
      "regionFilterMenu"
    );


  const typeMenu =
    document.getElementById(
      "typeFilterMenu"
    );


  if (typeMenu) {
    typeMenu.classList.remove("show");
  }


  if (menu) {
    menu.classList.toggle("show");
  }

}



function chooseRegion(region, label) {

  selectedRegion = region;


  const labelElement =
    document.getElementById(
      "regionFilterLabel"
    );


  if (labelElement) {
    labelElement.textContent = label;
  }


  const menu =
    document.getElementById(
      "regionFilterMenu"
    );


  if (menu) {
    menu.classList.remove("show");
  }


  renderContent();

}



/* =========================================
   CLOSE FILTERS
========================================= */

function closeAllFilters() {

  document
    .getElementById("typeFilterMenu")
    ?.classList.remove("show");


  document
    .getElementById("regionFilterMenu")
    ?.classList.remove("show");

}


document.addEventListener(
  "click",
  function(event) {

    const typeBox =
      document.getElementById(
        "typeFilterBox"
      );

    const regionBox =
      document.getElementById(
        "regionFilterBox"
      );


    if (
      typeBox &&
      !typeBox.contains(event.target)
    ) {

      document
        .getElementById("typeFilterMenu")
        ?.classList.remove("show");

    }


    if (
      regionBox &&
      !regionBox.contains(event.target)
    ) {

      document
        .getElementById("regionFilterMenu")
        ?.classList.remove("show");

    }

  }
);



/* =========================================
   CONTENT LISTEN BUTTONS
========================================= */

function speakItem(id) {

  const item =
    content.find(
      x => x.id === id
    );


  if (!item) return;


  if (item.speech) {

    speak(item.speech);

  } else {

    speak(item.title);

  }

}


function speakAai() {

  speak(
    "Aai. Aai means mother in Marathi."
  );

}



/* =========================================
   STORIES
========================================= */

function openStory(id) {

  const story =
    content.find(
      x => x.id === id
    );


  if (!story) return;


  alert(
    "📖 THE CLEVER FARMER\n\n" +

    "A clever farmer uses patience, " +
    "observation and practical knowledge " +
    "to solve a difficult situation.\n\n" +

    "This prototype demonstrates how a " +
    "folk story can be presented together " +
    "with language, context and learning.\n\n" +

    "In the final version, this section can " +
    "contain a complete community-validated " +
    "story and audio recording."
  );

}



/* =========================================
   FOLK SONG
========================================= */

function playSongDemo(id) {

  const song =
    content.find(
      x => x.id === id
    );


  if (!song) return;


  speak(
    "This is a demonstration of a folk song " +
    "entry in LokVaani. Real deployments can " +
    "connect a consented community recording here."
  );

}



/* =========================================
   PROVERB
========================================= */

function openProverb(id) {

  const proverb =
    content.find(
      x => x.id === id
    );


  if (!proverb) return;


  alert(
    "💬 PROVERB ACTIVITY\n\n" +

    "Imagine a situation where someone " +
    "needs advice from an elder.\n\n" +

    "Think about a traditional saying " +
    "that could help in that situation.\n\n" +

    "This activity can later become an " +
    "interactive matching game using " +
    "community-validated proverbs."
  );

}


function openProverbActivity() {

  openProverb(4);

}



/* =========================================
   DEMO VOICE
========================================= */

function playDemoVoice() {

  speak(
    "Welcome to LokVaani. " +
    "This is a demonstration of how a " +
    "knowledge holder can share language, " +
    "stories and folk knowledge with young learners."
  );

}



/* =========================================
   VOCABULARY
========================================= */

function openVocabulary() {

  alert(
    "🗣️ 5 WORDS FROM MAHARASHTRA\n\n" +

    "1. Aai — Mother\n" +
    "2. Namaskar — Greeting\n" +
    "3. Lok — People / community\n" +
    "4. Mitra — Friend\n" +
    "5. Paani — Water\n\n" +

    "Use the Listen buttons in Explore " +
    "to hear demo pronunciation."
  );

}



/* =========================================
   CONTRIBUTION MODAL
========================================= */

function openContribution() {

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if (!modal) return;


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



/* =========================================
   CONTRIBUTION FORM
========================================= */

const contributionForm =
  document.getElementById(
    "contributionForm"
  );


if (contributionForm) {

  contributionForm.addEventListener(
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


      const impact =
        document.getElementById(
          "impactTotal"
        );


      if (impact) {

        impact.textContent =
          111 + old;

      }


      contributionForm.reset();

      closeContribution();


      showToast(
        "✓ Your knowledge was submitted for review!"
      );

    }
  );

}



/* =========================================
   QUIZ
========================================= */

function startQuiz() {

  currentQuiz = 0;
  score = 0;


  const modal =
    document.getElementById(
      "quizModal"
    );


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



function renderQuiz() {

  const box =
    document.getElementById(
      "quizContent"
    );


  if (!box) return;


  const question =
    quiz[currentQuiz];


  box.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1}
      OF ${quiz.length}
    </div>

    <h2>
      ${question.q}
    </h2>

    <div class="quiz-options">

      ${question.options.map(
        (option, index) => `

          <button
            class="quiz-option"
            type="button"
            onclick="answerQuiz(${index})"
          >
            ${option}
          </button>

        `
      ).join("")}

    </div>

  `;

}



function answerQuiz(index) {

  const question =
    quiz[currentQuiz];


  document
    .querySelectorAll(".quiz-option")
    .forEach(
      (button, i) => {

        button.disabled = true;


        if (
          i === question.correct
        ) {

          button.classList.add(
            "correct"
          );

        }


        if (
          i === index &&
          i !== question.correct
        ) {

          button.classList.add(
            "wrong"
          );

        }

      }
    );


  if (
    index === question.correct
  ) {

    score++;

    xp += 20;


    localStorage.setItem(
      "lokvaaniXP",
      xp
    );


    const xpDisplay =
      document.getElementById(
        "xpValue"
      );


    if (xpDisplay) {

      xpDisplay.textContent =
        xp;

    }

  }


  setTimeout(
    () => {

      currentQuiz++;


      if (
        currentQuiz < quiz.length
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


  const box =
    document.getElementById(
      "quizContent"
    );


  if (!box) return;


  box.innerHTML = `

    <div class="quiz-result">

      <div style="font-size:55px">
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
        Continue exploring
      </button>

    </div>

  `;

}



/* =========================================
   PROGRESS
========================================= */

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
      percentage + "% complete";

  }

}



/* =========================================
   SEARCH
========================================= */

const searchInput =
  document.getElementById(
    "searchInput"
  );


if (searchInput) {

  searchInput.addEventListener(
    "input",
    renderContent
  );

}



/* =========================================
   MOBILE MENU
========================================= */

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


  mainNav
    .querySelectorAll("a")
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



/* =========================================
   INITIALIZE
========================================= */

renderContent();

updateProgress();
