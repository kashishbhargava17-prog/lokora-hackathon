/* =========================================================
   LOKVAANI
   INTERACTIVE LANGUAGE & FOLK KNOWLEDGE
   Complete interaction script
   ========================================================= */


/* =========================================================
   LANGUAGE & FOLK KNOWLEDGE CONTENT
   ========================================================= */

const content = [

  {
    id: 1,
    type: "word",
    icon: "🗣️",
    title: "Aai",
    region: "Maharashtra",
    language: "Marathi",
    desc: "Aai means mother in Marathi. It is a warm everyday word that reflects family and regional language.",
    verified: "Community demo"
  },

  {
    id: 2,
    type: "word",
    icon: "🌿",
    title: "Jevlis Ka?",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A Marathi expression meaning 'Have you eaten?' Often used as a caring greeting between people.",
    verified: "Language demo"
  },

  {
    id: 3,
    type: "proverb",
    icon: "💬",
    title: "अति तिथे माती",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A Marathi proverb expressing the idea that too much of anything can lead to undesirable results.",
    verified: "Proverb demo"
  },

  {
    id: 4,
    type: "proverb",
    icon: "🌾",
    title: "Where there is unity",
    region: "Punjab",
    language: "Punjabi",
    desc: "A folk saying about the strength that comes from people working together and supporting one another.",
    verified: "Community demo"
  },

  {
    id: 5,
    type: "story",
    icon: "📖",
    title: "The Clever Farmer",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A short folk-story lesson demonstrating how stories can preserve language, values and local wisdom.",
    verified: "Prototype"
  },

  {
    id: 6,
    type: "story",
    icon: "🪶",
    title: "The Wise Grandmother",
    region: "West Bengal",
    language: "Bengali",
    desc: "A prototype oral story showing how knowledge can pass from elders to younger generations through storytelling.",
    verified: "Community demo"
  },

  {
    id: 7,
    type: "song",
    icon: "🎵",
    title: "Baul Folk Song Tradition",
    region: "West Bengal",
    language: "Bengali",
    desc: "A Bengali folk tradition associated with travelling singers and oral transmission of songs and philosophy.",
    verified: "Review needed"
  },

  {
    id: 8,
    type: "song",
    icon: "🎶",
    title: "Lavani Song Tradition",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A performance tradition where rhythm, language and storytelling come together through song.",
    verified: "Community demo"
  },

  {
    id: 9,
    type: "oral-history",
    icon: "🎙️",
    title: "A Grandmother's Memory",
    region: "Maharashtra",
    language: "Marathi",
    desc: "A prototype oral-history entry showing how memories of everyday life can be recorded and passed to younger generations.",
    verified: "Prototype"
  },

  {
    id: 10,
    type: "oral-history",
    icon: "👴",
    title: "Stories From the Village",
    region: "Rajasthan",
    language: "Rajasthani",
    desc: "A demonstration of how elders can share memories, local customs and community knowledge with young learners.",
    verified: "Community demo"
  },

  {
    id: 11,
    type: "word",
    icon: "📚",
    title: "Pind",
    region: "Punjab",
    language: "Punjabi",
    desc: "A Punjabi word commonly associated with a village or one's native village community.",
    verified: "Language demo"
  },

  {
    id: 12,
    type: "word",
    icon: "🔤",
    title: "Bhalo",
    region: "West Bengal",
    language: "Bengali",
    desc: "A Bengali word meaning good or well, demonstrating how everyday vocabulary can be explored with pronunciation and context.",
    verified: "Language demo"
  }

];


/* =========================================================
   QUIZ QUESTIONS
   ========================================================= */

const quiz = [

  {
    q: "Which feature is most useful for preserving how a traditional word is actually spoken?",
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
      "Submit → Review → Validate → Preserve",
      "Delete every submission",
      "Hide the contribution"
    ],
    correct: 1
  },

  {
    q: "Which combination best teaches a folk story?",
    options: [
      "Story + meaning + cultural context + activity",
      "Only the title",
      "Only a photograph",
      "Only a page counter"
    ],
    correct: 0
  },

  {
    q: "Why are elders important to LokVaani?",
    options: [
      "They are knowledge holders",
      "They create leaderboards",
      "They design the website",
      "They replace young learners"
    ],
    correct: 0
  },

  {
    q: "What does multilingual support allow learners to do?",
    options: [
      "Explore knowledge across languages and dialects",
      "Use only English",
      "Remove regional languages",
      "Disable pronunciation"
    ],
    correct: 0
  }

];


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let currentQuiz = 0;
let score = 0;

let xp = Number(
  localStorage.getItem("lokvaaniXP") || 0
);


/* =========================================================
   XP DISPLAY
   ========================================================= */

function updateXPDisplay() {

  const xpValue =
    document.getElementById("xpValue");

  if (xpValue) {
    xpValue.textContent = xp;
  }

}


/* =========================================================
   EXPLORE — RENDER CONTENT
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


  const filtered =
    content.filter(item => {

      const matchesType =
        selectedType === "all" ||
        item.type === selectedType;


      const matchesRegion =
        selectedRegion === "all" ||
        item.region === selectedRegion;


      const searchableText =
        `
        ${item.title}
        ${item.region}
        ${item.language}
        ${item.desc}
        ${item.type}
        `
        .toLowerCase();


      const matchesSearch =
        searchableText.includes(search);


      return (
        matchesType &&
        matchesRegion &&
        matchesSearch
      );

    });


  if (!filtered.length) {

    contentGrid.innerHTML = `

      <div
        class="content-card"
        style="grid-column:1/-1"
      >

        <div class="card-icon">
          🔎
        </div>

        <h3>
          No matches found
        </h3>

        <p>
          Try another word, language,
          story or region.
        </p>

      </div>

    `;

    return;
  }


  contentGrid.innerHTML =
    filtered.map(createContentCard).join("");

}


/* =========================================================
   CREATE CONTENT CARD
   ========================================================= */

function createContentCard(item) {

  let actionButton = "";


  /* WORD */

  if (item.type === "word") {

    actionButton = `

      <button
        class="audio-btn"
        onclick="playPronunciation('${escapeQuotes(item.title)}')"
      >
        🔊 Hear
      </button>

    `;

  }


  /* PROVERB */

  else if (item.type === "proverb") {

    actionButton = `

      <button
        class="audio-btn"
        onclick="openProverb('${escapeQuotes(item.title)}')"
      >
        💬 Explore
      </button>

    `;

  }


  /* STORY */

  else if (item.type === "story") {

    actionButton = `

      <button
        class="audio-btn"
        onclick="openStory('${escapeQuotes(item.title)}')"
      >
        📖 Open story
      </button>

    `;

  }


  /* SONG */

  else if (item.type === "song") {

    actionButton = `

      <button
        class="audio-btn"
        onclick="openSong('${escapeQuotes(item.title)}')"
      >
        🎵 Listen
      </button>

    `;

  }


  /* ORAL HISTORY */

  else if (item.type === "oral-history") {

    actionButton = `

      <button
        class="audio-btn"
        onclick="openOralHistory('${escapeQuotes(item.title)}')"
      >
        🎙️ Hear story
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

        ${actionButton}

      </div>

    </article>

  `;

}


/* =========================================================
   FORMAT CONTENT TYPE
   ========================================================= */

function formatType(type) {

  const names = {

    "word": "Local vocabulary",

    "story": "Folk story",

    "proverb": "Proverb / idiom",

    "song": "Traditional song",

    "oral-history": "Oral history"

  };


  return names[type] || type;

}


/* =========================================================
   SAFE TEXT FOR BUTTONS
   ========================================================= */

function escapeQuotes(text) {

  return text
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");

}


/* =========================================================
   VIEW ALL
   ========================================================= */

function setupViewAll() {

  const viewAll =
    document.querySelector(
      '#explore .text-link'
    );


  if (!viewAll) return;


  viewAll.addEventListener(
    "click",
    function(event) {

      event.preventDefault();


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
          behavior: "smooth",
          block: "start"
        });

      }

    }
  );

}


/* =========================================================
   PRONUNCIATION
   ========================================================= */

function playPronunciation(word) {

  const pronunciationMap = {

    "Aai":
      "Aai",

    "Jevlis Ka?":
      "Jevlis Ka?",

    "Pind":
      "Pind",

    "Bhalo":
      "Bhalo"

  };


  const text =
    pronunciationMap[word] || word;


  speak(
    text,
    "Playing pronunciation for " + word
  );

}


/* =========================================================
   TEXT TO SPEECH
   ========================================================= */

function speak(
  text,
  message = "Playing pronunciation…"
) {

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


  utterance.rate = 0.78;
  utterance.pitch = 1;


  window.speechSynthesis.speak(
    utterance
  );


  showToast(message);

}


/* =========================================================
   VOICES OF ELDERS — DEMO VOICE
   ========================================================= */

function playDemoVoice() {

  speak(
    "Welcome to LokVaani. Every voice carries a piece of history. Listen, learn and help keep India's languages and folk knowledge alive.",
    "Playing the LokVaani demo voice…"
  );

}


/* =========================================================
   ORAL HISTORY
   ========================================================= */

function openOralHistory(title = "Oral History") {

  showInfoModal(

    title,

    "HEAR A KNOWLEDGE HOLDER",

    `
    Oral histories allow elders and knowledge holders
    to share memories, local traditions and experiences
    with younger generations.

    This prototype demonstrates how a real recording
    could be presented together with a transcript,
    regional language, translation and cultural context.
    `

  );

}


/* =========================================================
   FOLK STORY
   ========================================================= */

function openStory(title) {

  showStoryModal(title);

}


/* =========================================================
   STORY MODAL
   ========================================================= */

function showStoryModal(title) {

  let modal =
    document.getElementById(
      "storyModal"
    );


  if (!modal) {

    modal =
      document.createElement(
        "div"
      );


    modal.id =
      "storyModal";


    modal.className =
      "modal";


    modal.innerHTML = `

      <div
        class="modal-backdrop"
        onclick="closeStoryModal()">
      </div>


      <div class="modal-card">

        <button
          class="modal-close"
          onclick="closeStoryModal()">

          ×

        </button>


        <div class="section-label">
          FOLK STORY LESSON
        </div>


        <h2 id="storyTitle">
        </h2>


        <p
          style="
            color:var(--muted);
            font-size:15px;
            line-height:1.8;
          "
        >

          Once upon a time, a farmer faced
          a difficult problem in his village.
          Instead of giving up, he used his
          knowledge and clever thinking to
          find a solution.

        </p>


        <div
          style="
            background:#f8f0e3;
            padding:18px;
            border-radius:15px;
            margin:20px 0;
          "
        >

          <strong>
            Cultural context
          </strong>

          <p style="margin-bottom:0">

            Folk stories are traditionally
            passed from one generation to
            another through spoken storytelling.
            LokVaani can preserve the original
            language together with translations,
            pronunciation and cultural context.

          </p>

        </div>


        <button
          class="btn primary"
          onclick="startQuiz(); closeStoryModal();"
        >

          Take a story quiz →

        </button>

      </div>

    `;


    document.body.appendChild(
      modal
    );

  }


  const storyTitle =
    document.getElementById(
      "storyTitle"
    );


  if (storyTitle) {
    storyTitle.textContent =
      title;
  }


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


/* =========================================================
   CLOSE STORY
   ========================================================= */

function closeStoryModal() {

  const modal =
    document.getElementById(
      "storyModal"
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
   TRADITIONAL SONG
   ========================================================= */

function openSong(title) {

  showInfoModal(

    title,

    "TRADITIONAL SONG EXPERIENCE",

    `
    This interactive song experience can
    preserve a consented recording from a
    knowledge holder.

    Learners can listen to the recording,
    read a transcription, explore the meaning
    of the words and learn about the cultural
    context behind the song.

    The prototype currently demonstrates
    the learning interface without using
    copyrighted recordings.
    `

  );

}


/* =========================================================
   PROVERB
   ========================================================= */

function openProverb(title) {

  showInfoModal(

    title,

    "PROVERB & IDIOM",

    `
    Proverbs and idioms carry everyday wisdom
    and cultural knowledge.

    Learners can discover the original phrase,
    its meaning, pronunciation, regional usage
    and an example showing when it can be used.

    This prototype demonstrates that learning
    experience with community-oriented content.
    `

  );

}


/* =========================================================
   HERITAGE INFORMATION
   ========================================================= */

function openHeritageInfo(title) {

  showInfoModal(

    title,

    "LANGUAGE & FOLK KNOWLEDGE",

    `
    LokVaani connects knowledge holders with
    young learners.

    A complete entry can include the original
    regional-language content, translation,
    pronunciation recording, cultural context,
    contributor information and validation status.
    `

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
          onclick="closeInfoModal()">

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
            white-space:pre-line;
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
  ).textContent =
    title;


  document.getElementById(
    "infoSubtitle"
  ).textContent =
    subtitle;


  document.getElementById(
    "infoMessage"
  ).textContent =
    message;


  modal.classList.add(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );

}


/* =========================================================
   CLOSE INFORMATION MODAL
   ========================================================= */

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
   CONTRIBUTION MODAL
   ========================================================= */

function openContribution() {

  const modal =
    document.getEle
