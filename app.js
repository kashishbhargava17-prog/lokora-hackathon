const content = [
  {id:1,type:"word",icon:"🗣️",title:"आई — Aai",region:"Maharashtra",language:"Marathi",desc:"Demo vocabulary card. Meaning: mother. Use a consented native-speaker recording for the final project.",verified:"Community demo"},
  {id:2,type:"word",icon:"💧",title:"पाणी — Paani",region:"Maharashtra",language:"Marathi",desc:"Demo vocabulary card. Meaning: water. Add local context and expert validation before publication.",verified:"Demo record"},
  {id:3,type:"proverb",icon:"💬",title:"Proverb Lab",region:"Punjab",language:"Punjabi",desc:"A demo card showing how a proverb can include meaning, situation, pronunciation and cultural context.",verified:"Review needed"},
  {id:4,type:"story",icon:"📖",title:"The Clever Farmer",region:"Rajasthan",language:"Regional demo",desc:"A short prototype story lesson. Replace with a documented, community-sourced folk story.",verified:"Prototype"},
  {id:5,type:"song",icon:"🎵",title:"Folk Song Archive",region:"West Bengal",language:"Bengali",desc:"Prototype archive card for a traditional song with audio, translation and cultural context.",verified:"Review needed"},
  {id:6,type:"word",icon:"🪔",title:"Heritage Vocabulary",region:"West Bengal",language:"Bengali",desc:"Prototype collection showing how local vocabulary can be taught with pronunciation and usage.",verified:"Prototype"},
  {id:7,type:"story",icon:"🌾",title:"Village Memory",region:"Maharashtra",language:"Marathi",desc:"Oral-history template: who shared it, where it was told, what it means and when it is used.",verified:"Community demo"},
  {id:8,type:"proverb",icon:"🌿",title:"Proverb Challenge",region:"Rajasthan",language:"Rajasthani",desc:"Interactive activity template: choose the proverb that best fits a real-life situation.",verified:"Prototype"}
];

const quiz = [
  {q:"Which feature most directly helps preserve pronunciation as oral heritage?", options:["Audio recordings from consented speakers","Only a written translation","A color theme","A leaderboard"], correct:0},
  {q:"What is the strongest workflow for a community contribution?", options:["Publish immediately","Submit → review → validate → publish","Delete every submission","Hide all contributions"], correct:1},
  {q:"Which feature best connects learning with cultural context?", options:["Story + meaning + context + quiz","Only a dictionary list","Only a logo","Only a page counter"], correct:0}
];

let currentQuiz=0, score=0, xp=Number(localStorage.getItem("lokvaaniXP")||0);
document.getElementById("xpValue").textContent=xp;
updateProgress();

function renderContent(){
  const q=(document.getElementById("searchInput").value||"").toLowerCase();
  const type=document.getElementById("typeFilter").value;
  const region=document.getElementById("regionFilter").value;
  const items=content.filter(x=>
    (type==="all"||x.type===type)&&(region==="all"||x.region===region)&&
    (`${x.title} ${x.region} ${x.language} ${x.desc}`.toLowerCase().includes(q))
  );
  document.getElementById("contentGrid").innerHTML=items.length?items.map(x=>`
    <article class="content-card">
      <div class="card-icon">${x.icon}</div>
      <span class="tag">${x.type}</span>
      <h3>${x.title}</h3>
      <p>${x.language} • ${x.region}</p>
      <p>${x.desc}</p>
      <div class="card-bottom">
        <span class="verified">✓ ${x.verified}</span>
        ${x.type==="word"?`<button class="audio-btn" onclick="speak('${escapeSpeech(x.title)}')">🔊 Listen</button>`:`<button class="audio-btn" onclick="showToast('Opening ${x.type} lesson…')">Open →</button>`}
      </div>
    </article>`).join(""):`<div class="content-card" style="grid-column:1/-1"><h3>No matches yet</h3><p>Try another search or filter.</p></div>`;
}

function escapeSpeech(s){
  return s.replaceAll("'","").replaceAll("—"," ");
}

document.getElementById("searchInput").addEventListener("input",renderContent);
document.getElementById("typeFilter").addEventListener("change",renderContent);
document.getElementById("regionFilter").addEventListener("change",renderContent);
renderContent();

function speak(text){
  if(!("speechSynthesis" in window)){
    showToast("Speech is not supported in this browser.");
    return;
  }
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.rate=.8;
  speechSynthesis.speak(u);
  showToast("Playing pronunciation…");
}

function openContribution(){
  document.getElementById("contributionModal").classList.add("open");
}

function closeContribution(){
  document.getElementById("contributionModal").classList.remove("open");
}

function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}

document.getElementById("contributionForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const old=Number(localStorage.getItem("lokvaaniSubmissions")||0);
  localStorage.setItem("lokvaaniSubmissions",old+1);
  document.getElementById("impactTotal").textContent=111+old;
  e.target.reset();
  closeContribution();
  showToast("Thank you! Your demo submission is now in the review queue.");
});

function startQuiz(){
  currentQuiz=0;
  score=0;
  document.getElementById("quizModal").classList.add("open");
  renderQuiz();
}

function closeQuiz(){
  document.getElementById("quizModal").classList.remove("open");
}

function renderQuiz(){
  const item=quiz[currentQuiz];
  document.getElementById("quizContent").innerHTML=`
    <div class="mini-label">QUESTION ${currentQuiz+1} OF ${quiz.length}</div>
    <h2 style="font-size:32px">${item.q}</h2>
    <div>${item.options.map((o,i)=>`<button class="quiz-option" onclick="answerQuiz(${i})">${o}</button>`).join("")}</div>`;
}

function answerQuiz(i){
  const item=quiz[currentQuiz];
  document.querySelectorAll(".quiz-option").forEach((b,n)=>{
    b.disabled=true;
    if(n===item.correct)b.classList.add("correct");
    else if(n===i)b.classList.add("wrong");
  });

  if(i===item.correct){
    score++;
    xp+=20;
    localStorage.setItem("lokvaaniXP",xp);
    document.getElementById("xpValue").textContent=xp;
  }

  setTimeout(()=>{
    currentQuiz++;

    if(currentQuiz<quiz.length){
      renderQuiz();
    }else{
      updateProgress();
      document.getElementById("quizContent").innerHTML=`
        <div class="quiz-result">
          <div style="font-size:55px">🏆</div>
          <div class="section-label">QUIZ COMPLETE</div>
          <h2 style="font-size:40px">You scored ${score}/${quiz.length}</h2>
          <p>You earned ${score*20} XP. Keep exploring to unlock more heritage badges.</p>
          <button class="btn primary" onclick="closeQuiz()">Continue exploring</button>
        </div>`;
    }
  },850);
}

function updateProgress(){
  const pct=Math.min(100,Math.round(xp/2));
  document.getElementById("progressBar").style.width=pct+"%";
  document.getElementById("progressText").textContent=pct+"% complete";
}

document.getElementById("menuToggle").addEventListener("click",()=>{
  document.getElementById("mainNav").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(a=>
  a.addEventListener("click",()=>{
    document.getElementById("mainNav").classList.remove("open");
  })
);
