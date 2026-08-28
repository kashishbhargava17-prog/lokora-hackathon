/* =========================================================
   LOKVAANI — INTERACTIVE LANGUAGE & FOLK KNOWLEDGE
   Complete interactive app.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     HERITAGE / LANGUAGE CONTENT
     ------------------------------------------------------- */

  const content = [
    {
      id: 1,
      type: "word",
      icon: "🗣️",
      title: "Aai",
      region: "Maharashtra",
      language: "Marathi",
      desc: "A warm everyday Marathi word meaning mother. Hear it spoken and learn how it is used.",
      verified: "Community demo"
    },
    {
      id: 2,
      type: "word",
      icon: "💬",
      title: "Namaskar",
      region: "Maharashtra",
      language: "Marathi",
      desc: "A respectful greeting commonly used in Marathi and many other Indian languages.",
      verified: "Language demo"
    },
    {
      id: 3,
      type: "proverb",
      icon: "💭",
      title: "Marathi Proverb",
      region: "Maharashtra",
      language: "Marathi",
      desc: "A traditional saying that carries advice, experience and everyday wisdom from one generation to another.",
      verified: "Community demo"
    },
    {
      id: 4,
      type: "story",
      icon: "📖",
      title: "The Clever Farmer",
      region: "Rajasthan",
      language: "Rajasthani",
      desc: "A short folk-story lesson showing how oral stories can preserve language, values and local knowledge.",
      verified: "Prototype"
    },
    {
      id: 5,
      type: "song",
      icon: "🎵",
      title: "Baul Folk Song",
      region: "West Bengal",
      language: "Bengali",
      desc: "A folk-music tradition connected with travelling singers and oral storytelling.",
      verified: "Community demo"
    },
    {
      id: 6,
      type: "phrase",
      icon: "🗨️",
      title: "Everyday Marathi",
      region: "Maharashtra",
      language: "Marathi",
      desc: "Useful everyday expressions that help young learners understand how regional language is actually spoken.",
      verified: "Language demo"
    },
    {
      id: 7,
      type: "folk",
      icon: "👵",
      title: "Grandmother's Saying",
      region: "Rajasthan",
      language: "Rajasthani",
      desc: "A sample oral-knowledge entry showing how family sayings can be recorded with their meaning and context.",
      verified: "Community demo"
    },
    {
      id: 8,
      type: "word",
      icon: "🌱",
      title: "Mitti",
      region: "Punjab",
      language: "Punjabi",
      desc: "A simple word meaning earth or soil, with cultural meaning connected to land and belonging.",
      verified: "Language demo"
    },
    {
      id: 9,
      type: "story",
      icon: "📚",
      title: "The Village Story",
      region: "Punjab",
      language: "Punjabi",
      desc: "A prototype oral story showing how local memories can be preserved for younger generations.",
      verified: "Prototype"
    },
    {
      id: 10,
      type: "song",
      icon: "🎶",
      title: "Folk Singing Tradition",
      region: "West Bengal",
      language: "Bengali",
      desc: "A demonstration of how songs can preserve vocabulary, stories and cultural memory.",
      verified: "Community demo"
    }
  ];


  /* -------------------------------------------------------
     QUIZ QUESTIONS
     ------------------------------------------------------- */

  const quiz = [
    {
      q: "What is the best way to preserve the pronunciation of a regional word?",
      options: [
        "A recording from a consented speaker",
        "Only a written translation",
        "A picture",
        "A leaderboard"
      ],
      correct: 0
    },
    {
      q: "What should happen before a community contribution is published?",
      options: [
        "Publish it immediately",
        "Review and validate it",
        "Delete it",
        "Hide it permanently"
      ],
      correct: 1
    },
    {
      q: "Which combination best preserves folk knowledge?",
      options: [
        "Meaning + audio + context + story",
        "Only a logo",
        "Only a photograph",
        "Only a page counter"
      ],
      correct: 0
    }
  ];


  /* -------------------------------------------------------
     STATE
     ------------------------------------------------------- */

  let currentQuiz = 0;
  let score = 0;

  let xp = Number(
    localStorage.getItem("lokvaaniXP") || 0
  );


  /* -------------------------------------------------------
     ELEMENT HELPERS
     ------------------------------------------------------- */

  const $ = (id) => document.getElementById(id);


  /* -------------------------------------------------------
     XP
     ------------------------------------------------------- */

  function updateXP() {
    const xpValue = $("xpValue");

    if (xpValue) {
      xpValue.textContent = xp;
    }

    localStorage.setItem(
      "lokvaaniXP",
      xp
    );
  }


  /* -------------------------------------------------------
     TOAST
     ------------------------------------------------------- */

  function showToast(message) {

    let toast = $("toast");

    if (!toast) {

      toast = document.createElement("div");

      toast.id = "toast";
      toast.className = "toast";

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.lokvaaniToast);

    window.lokvaaniToast = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }


  /* -------------------------------------------------------
     INTERACTION MODAL
     Used for stories, songs, vocabulary, etc.
     ------------------------------------------------------- */

  function openInfoModal(title, label, contentText, buttonText = "Close") {

    let modal = $("infoModal");

    if (!modal) {

      modal = document.createElement("div");

      modal.id = "infoModal";
      modal.className = "modal";

      modal.innerHTML = `
        <div class="modal-backdrop" data-close-info></div>

        <div class="modal-card">

          <button
            class="modal-close"
            data-close-info
            aria-label="Close"
          >
            ×
          </button>

          <div class="section-label" id="infoModalLabel"></div>

          <h2 id="infoModalTitle"></h2>

          <p
            id="infoModalText"
            style="
              color:var(--muted);
              font-size:16px;
              line-height:1.8;
            "
          ></p>

          <button
            class="btn primary"
            id="infoModalButton"
            data-close-info
          ></button>

        </div>
      `;

      document.body.appendChild(modal);

      modal.addEventListener("click", (event) => {

        if (
          event.target.matches("[data-close-info]")
        ) {
          closeInfoModal();
        }

      });
    }

    $("infoModalLabel").textContent = label;
    $("infoModalTitle").textContent = title;
    $("infoModalText").textContent = contentText;
    $("infoModalButton").textContent = buttonText;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }


  function closeInfoModal() {

    const modal = $("infoModal");

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }


  /* -------------------------------------------------------
     SPEECH
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     CONTENT RENDERING
     ------------------------------------------------------- */

  function renderContent() {

    const searchInput = $("searchInput");
    const typeFilter = $("typeFilter");
    const regionFilter = $("regionFilter");
    const contentGrid = $("contentGrid");

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


    const items = content.filter(item => {

      const searchableText = `
        ${item.title}
        ${item.region}
        ${item.language}
        ${item.desc}
        ${item.type}
      `.toLowerCase();

      const matchesSearch =
        searchableText.includes(search);

      const matchesType =
        selectedType === "all" ||
        selectedType === item.type;

      const matchesRegion =
        selectedRegion === "all" ||
        selectedRegion === item.region;

      return (
        matchesSearch &&
        matchesType &&
        matchesRegion
      );
    });


    if (!items.length) {

      contentGrid.innerHTML = `
        <div
          class="content-card"
          style="grid-column:1/-1"
        >
          <h3>No matches yet</h3>
          <p>
            Try another word, language, story
            or region.
          </p>
        </div>
      `;

      return;
    }


    contentGrid.innerHTML =
      items.map(item => {

        let buttonText = "Learn →";

        if (
          item.type === "word" ||
          item.type === "phrase"
        ) {
          buttonText = "🔊 Hear word";
        }

        if (item.type === "story") {
          buttonText = "📖 Open story";
        }

        if (item.type === "song") {
          buttonText = "🎵 Listen";
        }

        if (item.type === "proverb") {
          buttonText = "💭 Explore";
        }

        if (item.type === "folk") {
          buttonText = "👵 Hear saying";
        }


        return `
          <article
            class="content-card"
            data-content-id="${item.id}"
          >

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

              <button
                class="audio-btn content-action"
                data-id="${item.id}"
                type="button"
              >
                ${buttonText}
              </button>

            </div>

          </article>
        `;

      }).join("");
  }


  /* -------------------------------------------------------
     CONTENT ACTIONS
     ------------------------------------------------------- */

  function handleContentAction(id) {

    const item =
      content.find(x => x.id === Number(id));

    if (!item) return;


    /* WORD */

    if (
      item.type === "word" ||
      item.type === "phrase"
    ) {

      speak(
        `${item.title}. ${item.desc}`
      );

      return;
    }


    /* STORY */

    if (item.type === "story") {

      openInfoModal(
        item.title,
        "FOLK STORY",
        `${item.desc} This interactive prototype shows how a learner could read the story, hear a recording from a consented speaker and answer questions about the language and cultural context.`,
        "Start story lesson"
      );

      return;
    }


    /* SONG */

    if (item.type === "song") {

      openInfoModal(
        item.title,
        "FOLK SONG",
        `${item.desc} In the full version, this section would contain a consented audio recording, lyrics where appropriate, translation and information about the tradition.`,
        "Listen to demo"
      );

      return;
    }


    /* PROVERB */

    if (item.type === "proverb") {

      openInfoModal(
        item.title,
        "PROVERB",
        `${item.desc} Proverbs can be learned through their meaning, pronunciation and examples of situations where people traditionally use them.`,
        "Try proverb quiz"
      );

      const button = $("infoModalButton");

      if (button) {

        button.removeAttribute("data-close-info");

        button.onclick = () => {

          closeInfoModal();
          startQuiz();

        };
      }

      return;
    }


    /* FOLK KNOWLEDGE */

    if (item.type === "folk") {

      speak(
        `${item.title}. ${item.desc}`
      );

      showToast(
        "Playing the demo saying…"
      );

      return;
    }


    /* DEFAULT */

    openInfoModal(
      item.title,
      "LANGUAGE & FOLK KNOWLEDGE",
      item.desc
    );
  }


  /* -------------------------------------------------------
     SEARCH + FILTERS
     ------------------------------------------------------- */

  const searchInput = $("searchInput");
  const typeFilter = $("typeFilter");
  const regionFilter = $("regionFilter");

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


  /* -------------------------------------------------------
     CONTENT BUTTON EVENT DELEGATION
     ------------------------------------------------------- */

  const contentGrid = $("contentGrid");

  if (contentGrid) {

    contentGrid.addEventListener(
      "click",
      (event) => {

        const button =
          event.target.closest(
            ".content-action"
          );

        if (!button) return;

        event.preventDefault();

        handleContentAction(
          button.dataset.id
        );

      }
    );
  }


  /* -------------------------------------------------------
     VIEW ALL BUTTON
     ------------------------------------------------------- */

  document
    .querySelectorAll(".text-link")
    .forEach(button => {

      button.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

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
            $("explore");

          if (explore) {

            explore.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

          showToast(
            "Showing all language and folk knowledge."
          );

        }
      );

    });


  /* -------------------------------------------------------
     CONTRIBUTION MODAL
     ------------------------------------------------------- */

  function openContribution() {

    const modal =
      $("contributionModal");

    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  function closeContribution() {

    const modal =
      $("contributionModal");

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  document
    .querySelectorAll(
      '[onclick*="openContribution"]'
    )
    .forEach(button => {

      button.removeAttribute("onclick");

      button.addEventListener(
        "click",
        openContribution
      );

    });


  document
    .querySelectorAll(
      '[onclick*="closeContribution"]'
    )
    .forEach(button => {

      button.removeAttribute("onclick");

      button.addEventListener(
        "click",
        closeContribution
      );

    });


  const contributionForm =
    $("contributionForm");

  if (contributionForm) {

    contributionForm.addEventListener(
      "submit",
      (event) => {

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
          $("impactTotal");

        if (impactTotal) {

          impactTotal.textContent =
            110 + old + 1;

        }


        contributionForm.reset();

        closeContribution();

        showToast(
          "Thank you! Your contribution has been added to the review queue."
        );

      }
    );
  }


  /* -------------------------------------------------------
     QUIZ
     ------------------------------------------------------- */

  function startQuiz() {

    currentQuiz = 0;
    score = 0;

    const modal =
      $("quizModal");

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
      $("quizModal");

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  function renderQuiz() {

    const quizContent =
      $("quizContent");

    if (!quizContent) return;

    const question =
      quiz[currentQuiz];


    quizContent.innerHTML = `
      <div class="mini-label">
        QUESTION ${currentQuiz + 1}
        OF ${quiz.length}
      </div>

      <h2 style="font-size:32px">
        ${question.q}
      </h2>

      <div>

        ${question.options.map(
          (option, index) => `

            <button
              class="quiz-option"
              data-answer="${index}"
              type="button"
            >
              ${option}
            </button>

          `
        ).join("")}

      </div>
    `;


    quizContent
      .querySelectorAll(".quiz-option")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            answerQuiz(
              Number(
                button.dataset.answer
              )
            );

          }
        );

      });
  }


  function answerQuiz(answer) {

    const question =
      quiz[currentQuiz];

    const buttons =
      document.querySelectorAll(
        ".quiz-option"
      );


    buttons.forEach(
      (button, index) => {

        button.disabled = true;

        if (
          index === question.correct
        ) {

          button.classList.add(
            "correct"
          );

        }

        if (
          index === answer &&
          index !== question.correct
        ) {

          button.classList.add(
            "wrong"
          );

        }

      }
    );


    if (
      answer === question.correct
    ) {

      score++;

      xp += 20;

      updateXP();

      showToast(
        "+20 XP! Correct answer."
      );

    } else {

      showToast(
        "Not quite — keep learning!"
      );

    }


    setTimeout(() => {

      currentQuiz++;

      if (
        currentQuiz < quiz.length
      ) {

        renderQuiz();

      } else {

        showQuizResult();

      }

    }, 900);
  }


  function showQuizResult() {

    const quizContent =
      $("quizContent");

    if (!quizContent) return;


    updateProgress();


    quizContent.innerHTML = `

      <div class="quiz-result">

        <div style="font-size:55px">
          🏆
        </div>

        <div class="section-label">
          QUIZ COMPLETE
        </div>

        <h2 style="font-size:40px">
          You scored
        
