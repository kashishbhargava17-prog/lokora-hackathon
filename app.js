/* =========================================
   LOKVAANI
   INTERACTIVE LANGUAGE & FOLK KNOWLEDGE
========================================= */


/* CONTENT */

const content = [

  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A warm everyday Marathi word meaning mother. Hear it spoken and learn how it is used.",
    verified: "Language demo"
  },

  {
    id: 2,
    type: "word",
    icon: "🌱",
    title: "Namaskar",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A respectful greeting commonly used in Marathi-speaking communities.",
    verified: "Language demo"
  },

  {
    id: 3,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk-story lesson showing how traditional stories carry wisdom across generations.",
    verified: "Story demo"
  },

  {
    id: 4,
    type: "proverb",
    icon: "💬",
    title: "A village proverb",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "Explore how traditional sayings communicate practical wisdom and life lessons.",
    verified: "Community demo"
  },

  {
    id: 5,
    type: "song",
    icon: "🎵",
    title: "Baul Music",
    region: "West Bengal",
    language: "Bengali",
    desc: "A Bengali folk tradition connected with travelling singers, philosophy and oral expression.",
    verified: "Folk knowledge demo"
  },

  {
    id: 6,
    type: "word",
    icon: "👋",
    title: "Sat Sri Akal",
    region: "Punjab",
    language: "Punjabi",
    desc: "A well-known Punjabi greeting associated with respect, community and everyday conversation.",
    verified: "Language demo"
  },

  {
    id: 7,
    type: "proverb",
    icon: "🧠",
    title: "Wisdom in a saying",
    region: "Punjab",
    language: "Punjabi",
    desc: "Discover how proverbs preserve advice, humour and community knowledge.",
    verified: "Community demo"
  },

  {
    id: 8,
    type: "story",
    icon: "🌾",
    title: "The Village Storyteller",
    region: "West Bengal",
    language: "Bengali",
    desc: "A prototype oral-history activity showing how stories can be preserved with context and voice.",
    verified: "Prototype"
  }

];


/* QUIZ */

const quiz = [

  {
    q: "What is the best way to preserve the pronunciation of a regional word?",

    options: [
      "A recording from a consented speaker",
      "Only a written translation",
      "A picture of the word",
      "A leaderboard"
    ],

    correct: 0
  },

  {
    q: "Which combination makes language learning more interactive?",

    options: [
      "Meaning + pronunciation + context + quiz",
      "Only a dictionary",
      "Only a poster",
      "Only a page counter"
    ],

    correct: 0
  },

  {
    q: "What can folk proverbs preserve?",

    options: [
      "Community wisdom and life lessons",
      "Only numbers",
      "Only maps",
      "Only modern slang"
    ],

    correct: 0
  }

];


let currentQuiz = 0;
let score = 0;


/* XP */

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);

const xpValue =
  document.getElementById("xpValue");

if (xpValue) {
  xpValue.textContent = xp;
}


/* =========================================
   RENDER CONTENT
========================================= */

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


  const q =
    (searchInput.value || "")
      .toLowerCase()
      .trim();


  const type =
    typeFilter.value;


  const region =
    regionFilter.value;


  const items =
    content.filter(item => {

      const matchesType =
        type === "all" ||
        item.type === type;


      const matchesRegion =
        region === "all" ||
        item.region === region;


      const searchableText =
        `${item.title}
        ${item.region}
        ${item.language}
        ${item.desc}`
          .toLowerCase();


      const matchesSearch =
        searchableText.includes(q);


      return (
        matchesType &&
        matchesRegion &&
        matchesSearch
      );

    });


  if(!items.length){

    contentGrid.innerHTML = `

      <div
        class="content-card"
        style="grid-column:1/-1"
      >

        <h3>
          No matches yet
        </h3>

        <p>
          Try another word, language,
          region or content type.
        </p>

      </div>

    `;

    return;
  }


  contentGrid.innerHTML =

    items.map(item => `

      <article class="content-card">

        <div class="card-icon">
          ${item.icon}
        </div>

        <span class="tag">
          ${item.type.replace("-", " ")}
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

          ${
            item.type === "word"

              ? `
                <button
                  class="audio-btn"
                  onclick="speakWord('${item.title}')"
                >
                  🔊 Listen
                </button>
              `

              : item.type === "story"

              ? `
                <button
                  class="audio-btn"
                  onclick="showToast('Folk story opened!')"
                >
                  📖 Open
                </button>
              `

              : item.type === "song"

              ? `
                <button
                  class="audio-btn"
                  onclick="showToast('Demo folk song selected!')"
                >
                  🎵 Listen
                </button>
              `

              : `
                <button
                  class="audio-btn"
                  onclick="showToast('Proverb activity opened!')"
                >
                  💬 Explore
                </button>
              `
          }

        </div>

      </article>

    `).join("");

}


/* =========================================
   SPEECH
========================================= */

function speakWord(word){

  if(!("speechSynthesis" in window)){

    showToast(
      "Speech is not supported in this browser."
    );

    return;
  }


  speechSynthesis.cancel();


  let text;


  if(word === "Aai"){

    text =
      "Aai. Aai means mother in Marathi.";

  }

  else if(word === "Namaskar"){

    text =
      "Namaskar. A respectful Marathi greeting.";

  }

  else if(word === "Sat Sri Akal"){

    text =
      "Sat Sri Akal. A Punjabi greeting.";

  }

  else{

    text = word;

  }


  const utterance =
    new SpeechSynthesisUtterance(text);


  utterance.rate = .8;


  speechSynthesis.speak(
    utterance
  );


  showToast(
    "🔊 Playing pronunciation..."
  );

}


function speak(text){

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
    "🔊 Playing demo voice..."
  );

}


/* =========================================
   CONTRIBUTION MODAL
========================================= */

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


/* =========================================
   TOAST
========================================= */

function showToast(message){

  const toast =
    document.getElementById("toast");


  if(!toast){
    return;
  }


  toast.textContent =
    message;


  toast.classList.add("show");


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2600);

}


/* =========================================
   CONTRIBUTION FORM
========================================= */

const contributionForm =
  document.getElementById(
    "contributionForm"
  );


if(contributionForm){

  contributionForm.addEventListener(
    "submit",
    function(event){

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


      if(impactTotal){

        impactTotal.textContent =
          110 + old + 1;

      }


      this.reset();


      closeContribution();


      showToast(
        "✓ Thank you! Your knowledge is now in the demo review queue."
      );

    }
  );

}


/* =========================================
   QUIZ
========================================= */

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

    modal.classList.remove(
      "open"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

  }

}


function renderQuiz(){

  const quizContent =
    document.getElementById(
      "quizContent"
    );


  if(!quizContent){
    return;
  }


  const item =
    quiz[currentQuiz];


  quizContent.innerHTML = `

    <div class="mini-label">

      QUESTION
      ${currentQuiz + 1}
      OF
      ${quiz.length}

    </div>


    <h2 style="font-size:32px">

      ${item.q}

    </h2>


    <div>

      ${
        item.options.map(
          (option, index) => `

            <button
              class="quiz-option"
              onclick="answerQuiz(${index})"
            >

              ${option}

            </button>

          `
        ).join("")
      }

    </div>

  `;

}


/* =========================================
   ANSWER QUIZ
========================================= */

function answerQuiz(index){

  const item =
    quiz[currentQuiz];


  document
    .querySelectorAll(".quiz-option")
    .forEach((button, number) => {

      button.disabled = true;


      if(number === item.correct){

        button.classList.add(
          "correct"
        );

      }

      else if(number === index){

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


    showToast(
      "✓ Correct! +20 XP"
    );

  }

  else{

    showToast(
      "Not quite — keep learning!"
    );

  }


  setTimeout(() => {

    currentQuiz++;


    if(
      currentQuiz <
      quiz.length
    ){

      renderQuiz();

    }

    else{

      updateProgress();


      const quizContent =
        document.getElementById(
          "quizContent"
        );


      if(quizContent){

        quizContent.innerHTML = `

          <div class="quiz-result">

            <div style="font-size:55px">
              🏆
            </div>

            <div class="section-label">
              CHALLENGE COMPLETE
            </div>

            <h2 style="font-size:40px">

              ${score}/${quiz.length}

            </h2>

            <p>

              You earned
              ${score * 20}
              XP.

              Keep exploring
              languages and folk knowledge!

            </p>

            <button
              class="btn primary"
              onclick="closeQuiz()"
            >

              Continue learning

            </button>

          </div>

        `;

      }

    }

  }, 850);

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress(){

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


  if(progressBar){

    progressBar.style.width =
      pct + "%";

  }


  if(progressText){

    progressText.textContent =
      pct + "% complete";

  }

}


/* =========================================
   FILTERS
========================================= */

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


if(searchInput){

  searchInput.addEventListener(
    "input",
    renderContent
  );

}


if(typeFilter){

  typeFilter.addEventListener(
    "change",
    renderContent
  );

}


if(regionFilter){

  regionFilter.addEventListener(
    "change",
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


if(menuToggle && mainNav){

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
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mainNav.classList.remove(
            "open"
          );

        }
      );

    });

}


/* =========================================
   INITIAL LOAD
========================================= */

renderContent();

updateProgress();
