/* =========================================================
   LOKVAANI
   Interactive Language & Folk Knowledge
   ========================================================= */


/* ---------------------------------------------------------
   CONTENT DATABASE
   --------------------------------------------------------- */

const content = [

  {
    id:1,
    type:"word",
    icon:"🗣️",
    title:"आई — Aai",
    region:"Maharashtra",
    language:"Marathi",
    desc:"A warm Marathi word for mother, commonly heard in everyday family conversations.",
    verified:"Community demo",
    detail:"Aai is an example of how everyday family vocabulary carries emotional and cultural meaning."
  },

  {
    id:2,
    type:"word",
    icon:"💧",
    title:"पाणी — Paani",
    region:"Maharashtra",
    language:"Marathi",
    desc:"The Marathi word for water, useful for exploring pronunciation and everyday vocabulary.",
    verified:"Demo record",
    detail:"Local vocabulary can reveal how language is used naturally in homes, villages and communities."
  },

  {
    id:3,
    type:"proverb",
    icon:"💬",
    title:"Punjabi Proverb Lab",
    region:"Punjab",
    language:"Punjabi",
    desc:"A learning card showing how a proverb can be taught with meaning, context and a real-life situation.",
    verified:"Review needed",
    detail:"Proverbs often contain practical wisdom and give learners insight into the values and experiences of a community."
  },

  {
    id:4,
    type:"story",
    icon:"📖",
    title:"The Clever Farmer",
    region:"Rajasthan",
    language:"Rajasthani",
    desc:"A folk-story learning activity combining storytelling, cultural context and comprehension.",
    verified:"Prototype",
    detail:"Folk stories can pass knowledge from one generation to another while making language learning memorable."
  },

  {
    id:5,
    type:"song",
    icon:"🎵",
    title:"Baul Folk Song",
    region:"West Bengal",
    language:"Bengali",
    desc:"A prototype traditional-song archive connecting music, oral expression and cultural context.",
    verified:"Review needed",
    detail:"Traditional songs can preserve vocabulary, pronunciation, memories and community traditions."
  },

  {
    id:6,
    type:"oral",
    icon:"🎙️",
    title:"Grandmother's Memory",
    region:"Maharashtra",
    language:"Marathi",
    desc:"An oral-history template showing how memories can be recorded with the speaker's context and consent.",
    verified:"Community demo",
    detail:"Oral histories preserve personal memories that may never appear in written records."
  },

  {
    id:7,
    type:"proverb",
    icon:"🌿",
    title:"Rajasthani Proverb",
    region:"Rajasthan",
    language:"Rajasthani",
    desc:"A prototype proverb activity where learners connect a traditional saying with a real-life situation.",
    verified:"Prototype",
    detail:"Learning the situation in which a proverb is used helps learners understand meaning beyond direct translation."
  },

  {
    id:8,
    type:"word",
    icon:"🌸",
    title:"Bengali Everyday Words",
    region:"West Bengal",
    language:"Bengali",
    desc:"A prototype vocabulary collection designed around everyday regional language.",
    verified:"Community demo",
    detail:"Everyday words are often the simplest entry point into learning a regional language."
  },

  {
    id:9,
    type:"song",
    icon:"🥁",
    title:"Village Singing Tradition",
    region:"Punjab",
    language:"Punjabi",
    desc:"A traditional-song learning concept connecting rhythm, language and community memory.",
    verified:"Prototype",
    detail:"Songs can help learners hear rhythm, pronunciation and expressions that are difficult to understand from text alone."
  },

  {
    id:10,
    type:"oral",
    icon:"👵",
    title:"Stories From Home",
    region:"Tamil Nadu",
    language:"Tamil",
    desc:"An oral-history concept for recording memories, family stories and local expressions.",
    verified:"Prototype",
    detail:"Community memories can become valuable educational resources when preserved respectfully."
  }

];


/* ---------------------------------------------------------
   QUIZ
   --------------------------------------------------------- */

const quiz = [

  {
    q:"Which feature most directly helps preserve pronunciation as oral heritage?",
    options:[
      "Audio recordings from consented speakers",
      "Only a written translation",
      "A color theme",
      "A leaderboard"
    ],
    correct:0
  },

  {
    q:"What is the strongest workflow for a community contribution?",
    options:[
      "Publish immediately",
      "Submit → review → validate → publish",
      "Delete every submission",
      "Hide all contributions"
    ],
    correct:1
  },

  {
    q:"Which feature best connects language learning with cultural context?",
    options:[
      "Story + meaning + context + quiz",
      "Only a dictionary list",
      "Only a logo",
      "Only a page counter"
    ],
    correct:0
  },

  {
    q:"Why are oral-history recordings valuable?",
    options:[
      "They preserve personal memories and lived experiences",
      "They replace every written book",
      "They are only useful for entertainment",
      "They remove the need for language learning"
    ],
    correct:0
  }

];


/* ---------------------------------------------------------
   STATE
   --------------------------------------------------------- */

let currentQuiz = 0;
let score = 0;

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);

let showingAll = false;


/* ---------------------------------------------------------
   INITIAL SETUP
   --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  const xpValue =
    document.getElementById("xpValue");

  if(xpValue){
    xpValue.textContent = xp;
  }

  setupFilters();
  setupContributionForm();
  setupMobileMenu();

  renderContent();
  updateProgress();

});


/* ---------------------------------------------------------
   EXPLORE CONTENT
   --------------------------------------------------------- */

function renderContent(){

  const searchInput =
    document.getElementById("searchInput");

  const typeFilter =
    document.getElementById("typeFilter");

  const regionFilter =
    document.getElementById("regionFilter");

  const contentGrid =
    document.getElementById("contentGrid");

  if(
    !searchInput ||
    !typeFilter ||
    !regionFilter ||
    !contentGrid
  ){
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


  let items = content.filter(item => {

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


  /*
    Initially show 8 cards.
    View All reveals the rest.
  */

  if(!showingAll && query === "" &&
     selectedType === "all" &&
     selectedRegion === "all"){

    items = items.slice(0,8);

  }


  if(items.length === 0){

    contentGrid.innerHTML = `
      <div class="content-card"
           style="grid-column:1/-1">

        <div class="card-icon">🔎</div>

        <h3>No matches yet</h3>

        <p>
          Try another search or choose a different filter.
        </p>

      </div>
    `;

    return;
  }


  contentGrid.innerHTML =
    items.map(createContentCard).join("");


  updateViewAllButton();

}


/* ---------------------------------------------------------
   CREATE CARD
   --------------------------------------------------------- */

function createContentCard(item){

  const typeNames = {

    word:"Words & Vocabulary",

    proverb:"Proverbs & Idioms",

    story:"Folk Stories",

    song:"Traditional Songs",

    oral:"Oral History"

  };


  let buttonText = "Explore →";


  if(item.type === "word"){
    buttonText = "🔊 Listen";
  }

  if(item.type === "proverb"){
    buttonText = "💬 Explore";
  }

  if(item.type === "story"){
    buttonText = "📖 Open story";
  }

  if(item.type === "song"){
    buttonText = "🎵 Listen";
  }

  if(item.type === "oral"){
    buttonText = "🎙️ Hear story";
  }


  return `

    <article class="content-card">

      <div class="card-icon">
        ${item.icon}
      </div>

      <span class="tag">
        ${typeNames[item.type]}
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
          class="audio-btn"
          onclick="openKnowledge(${item.id})">

          ${buttonText}

        </button>

      </div>

    </article>

  `;

}


/* ---------------------------------------------------------
   FILTER SETUP
   --------------------------------------------------------- */

function setupFilters(){

  const searchInput =
    document.getElementById("searchInput");

  const typeFilter =
    document.getElementById("typeFilter");

  const regionFilter =
    document.getElementById("regionFilter");


  if(searchInput){

    searchInput.addEventListener(
      "input",
      () => {

        showingAll = true;
        renderContent();

      }
    );

  }


  if(typeFilter){

    typeFilter.addEventListener(
      "change",
      () => {

        showingAll = true;
        renderContent();

      }
    );

  }


  if(regionFilter){

    regionFilter.addEventListener(
      "change",
      () => {

        showingAll = true;
        renderContent();

      }
    );

  }

}


/* ---------------------------------------------------------
   VIEW ALL
   --------------------------------------------------------- */

function toggleViewAll(){

  showingAll = !showingAll;

  renderContent();

  const explore =
    document.getElementById("explore");

  if(explore){

    explore.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  }

}


function updateViewAllButton(){

  const button =
    document.getElementById("viewAllBtn");

  if(!button){
    return;
  }


  const search =
    document.getElementById("searchInput").value.trim();

  const type =
    document.getElementById("typeFilter").value;

  const region =
    document.getElementById("regionFilter").value;


  if(
    search !== "" ||
    type !== "all" ||
    region !== "all"
  ){

    button.style.display = "none";
    return;

  }


  button.style.display = "inline-block";

  button.textContent =
    showingAll
      ? "Show less ↑"
      : "View all →";

}


/* ---------------------------------------------------------
   KNOWLEDGE MODAL
   --------------------------------------------------------- */

function openKnowledge(id){

  /*
    This accepts either a numeric content ID
    or a content type from other buttons.
  */

  let item;


  if(typeof id === "number"){

    item = content.find(
      x => x.id === id
    );

  }


  if(typeof id === "string"){

    item = content.find(
      x => x.type === id
    );

  }


  if(!item){

    showToast("This knowledge card is not available yet.");
    return;

  }


  const modal =
    document.getElementById("knowledgeModal");

  const container =
    document.getElementById("knowledgeContent");


  if(!modal || !container){
    return;
  }


  let actionButton = "";


  if(item.type === "word"){

    actionButton = `
      <button
        class="btn primary"
        onclick="playWord('${item.title.replace(/'/g,"")}')">

        🔊 Hear pronunciation

      </button>
    `;

  }


  if(item.type === "story"){

    actionButton = `
      <button
        class="btn primary"
        onclick="startQuiz()">

        🎮 Start story quiz

      </button>
    `;

  }


  if(item.type === "proverb"){

    actionButton = `
      <button
        class="btn primary"
        onclick="startQuiz()">

        💬 Play proverb quiz

      </button>
    `;

  }


  if(item.type === "song" ||
     item.type === "oral"){

    actionButton = `
      <button
        class="btn primary"
        onclick="playDemoVoice()">

        🔊 Play demo audio

      </button>
    `;

  }


  container.innerHTML = `

    <div class="knowledge-icon">
      ${item.icon}
    </div>

    <div class="section-label">
      ${item.type.toUpperCase()}
    </div>

    <h2>
      ${item.title}
    </h2>

    <p>
      <strong>${item.language}</strong>
      • ${item.region}
    </p>

    <div class="knowledge-detail">

      <strong>
        About this knowledge
      </strong>

      <p>
        ${item.detail}
      </p>

    </div>

    <p>
      ${item.desc}
    </p>

    ${actionButton}

  `;


  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


/* ---------------------------------------------------------
   CLOSE KNOWLEDGE
   --------------------------------------------------------- */

function closeKnowledge(){

  const modal =
    document.getElementById("knowledgeModal");

  if(modal){

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }

}


/* ---------------------------------------------------------
   PRONUNCIATION
   --------------------------------------------------------- */

function playWord(text){

  if(!("speechSynthesis" in window)){

    showToast(
      "Speech is not supported in this browser."
    );

    return;

  }


  speechSynthesis.cancel();


  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = .8;


  speechSynthesis.speak(
    utterance
  );


  showToast(
    "Playing pronunciation…"
  );

}


/* ---------------------------------------------------------
   DEMO VOICE
   --------------------------------------------------------- */

function playDemoVoice(){

  if(!("speechSynthesis" in window)){

    showToast(
      "Speech is not supported in this browser."
    );

    return;

  }


  speechSynthesis.cancel();


  const text =
    "LokVaani connects knowledge holders with young learners to preserve India's languages, stories and folk knowledge.";


  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.rate = .85;


  speechSynthesis.speak(
    utterance
  );


  showToast(
    "Playing the LokVaani demo voice…"
  );

}


/* ---------------------------------------------------------
   TOAST
   --------------------------------------------------------- */

function showToast(message){

  const toast =
    document.getElementById("toast");

  if(!toast){
    return;
  }


  toast.textContent = message;

  toast.classList.add("show");


  clearTimeout(
    window.lokvaaniToast
  );


  window.lokvaaniToast =
    setTimeout(() => {

      toast.classList.remove("show");

    },2600);

}


/* ---------------------------------------------------------
   CONTRIBUTION MODAL
   --------------------------------------------------------- */

function openContribution(){

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if(modal){

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }

}


function closeContribution(){

  const modal =
    document.getElementById(
      "contributionModal"
    );


  if(modal){

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }

}


/* ---------------------------------------------------------
   CONTRIBUTION FORM
   --------------------------------------------------------- */

function setupContributionForm(){

  const form =
    document.getElementById(
      "contributionForm"
    );


  if(!form){
    return;
  }


  form.addEventListener(
    "submit",
    event => {

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


      if(impact){

        impact.textContent =
          110 + old + 1;

      }


      form.reset();

      closeContribution();


      showToast(
        "Thank you! Your knowledge has entered the review queue."
      );

    }
  );

}


/* ---------------------------------------------------------
   QUIZ
   --------------------------------------------------------- */

function startQuiz(){

  currentQuiz = 0;
  score = 0;


  const modal =
    document.getElementById(
      "quizModal"
    );


  if(modal){

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  renderQuiz();

}


function closeQuiz(){

  const modal =
    document.getElementById(
      "quizModal"
    );


  if(modal){

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }

}


function renderQuiz(){

  const container =
    document.getElementById(
      "quizContent"
    );


  if(!container){
    return;
  }


  const item =
    quiz[currentQuiz];


  container.innerHTML = `

    <div class="mini-label">
      QUESTION ${currentQuiz + 1}
      OF ${quiz.length}
    </div>

    <h2 style="font-size:32px">
      ${item.q}
    </h2>

    <div>

      ${item.options.map(
        (option,index) => `

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


/* ---------------------------------------------------------
   ANSWER QUIZ
   --------------------------------------------------------- */

function answerQuiz(index){

  const item =
    quiz[currentQuiz];


  document
    .querySelectorAll(".quiz-option")
    .forEach((button,n) => {

      button.disabled = true;


      if(n === item.correct){

        button.classList.add(
          "correct"
        );

      }

      else if(n === index){

        button.classList.add(
          "wrong"
        );

      }

    });


  if(index === item.correct){

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


    if(xpValue){

      xpValue.textContent =
        xp;

    }

  }


  setTimeout(() => {

    currentQuiz++;


    if(currentQuiz < quiz.length){

      renderQuiz();

    }

    else{

      updateProgress();


      const container =
        document.getElementById(
          "quizContent"
        );


      if(container){

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
              You earned ${score * 20} XP.
              Keep exploring to unlock more
              knowledge badges.
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

  },850);

}


/* ---------------------------------------------------------
   XP PROGRESS
   --------------------------------------------------------- */

function updateProgress(){

  const percentage =
    Math.min(
      100,
      Math.round(xp / 2)ns() {
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
