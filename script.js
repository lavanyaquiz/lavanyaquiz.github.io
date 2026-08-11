let subject="",level="",pool=[],pos=0,score=0,time=15,timer=null,locked=false;
const $=id=>document.getElementById(id);

const icons={
  "सामान्य ज्ञान":"🌟",
  "इतिहास":"🏛️",
  "भूगोल":"🌍",
  "विज्ञान":"🔬",
  "गणित":"➗"
};

const subjects=[...new Set(QUESTIONS.map(x=>x[0]))];
$("subjects").innerHTML=subjects.map(s=>`<button onclick="choose('${safeAttr(s)}')">${icons[s]||"📚"} ${safe(s)}</button>`).join("");

function hideAll(){
  ["home","quiz","result","lb","about","privacy","terms","contact"]
    .forEach(x=>$(x).classList.add("hidden"));
}

function showSection(id){
  clearInterval(timer);
  hideAll();
  $(id).classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}

function home(){
  showSection("home");
  $("levels").classList.add("hidden");
}

function choose(s){
  subject=s;
  $("levels").classList.remove("hidden");
  $("levels").scrollIntoView({behavior:"smooth",block:"center"});
}

function start(l){
  const name=$("name").value.trim();
  if(!name){
    $("name").focus();
    alert("कृपया आधी तुमचे नाव टाका.");
    return;
  }

  level=l;
  pool=QUESTIONS.filter(x=>x[0]===subject&&x[1]===level);

  // Shuffle questions so every game is a little different.
  pool=[...pool].sort(()=>Math.random()-0.5);

  pos=0;
  score=0;
  showSection("quiz");
  showQuestion();
}

function showQuestion(){
  clearInterval(timer);
  locked=false;
  time=15;

  $("time").textContent=time;
  $("score").textContent=score;
  $("qn").textContent=`प्रश्न ${pos+1} / ${pool.length}`;
  $("bar").style.width=((pos+1)/pool.length*100)+"%";
  $("question").textContent=pool[pos][2];

  $("options").innerHTML="";
  $("next").classList.add("hidden");

  pool[pos][3].forEach((text,n)=>{
    const b=document.createElement("button");
    b.className="opt";
    b.textContent=String.fromCharCode(65+n)+". "+text;
    b.onclick=()=>answer(n);
    $("options").appendChild(b);
  });

  timer=setInterval(()=>{
    time--;
    $("time").textContent=time;
    if(time<=0){
      clearInterval(timer);
      answer(-1);
    }
  },1000);
}

function answer(choice){
  if(locked) return;
  locked=true;
  clearInterval(timer);

  const correct=pool[pos][4];

  [...$("options").children].forEach((b,n)=>{
    b.disabled=true;
    if(n===correct)b.classList.add("ok");
    if(n===choice && choice!==correct)b.classList.add("bad");
  });

  if(choice===correct){
    score++;
    $("score").textContent=score;
  }

  $("next").classList.remove("hidden");
  $("next").textContent=pos===pool.length-1?"निकाल पहा 🏆":"पुढचा प्रश्न ➜";
}

function next(){
  if(!locked)return;
  if(pos<pool.length-1){
    pos++;
    showQuestion();
  }else{
    finish();
  }
}

function finish(){
  clearInterval(timer);
  showSection("result");

  const name=$("name").value.trim()||"खेळाडू";
  $("finalScore").textContent=score;
  $("total").textContent=pool.length;
  $("resultText").textContent=`${name}, ${subject} - ${level} Quiz पूर्ण झाला!`;

  const ratio=score/pool.length;
  $("message").textContent=
    ratio>=.8?"🎉 उत्कृष्ट कामगिरी!":
    ratio>=.5?"👍 चांगला प्रयत्न!":
    "💪 पुन्हा खेळा आणि स्कोअर वाढवा!";

  let data=JSON.parse(localStorage.getItem("quizScores")||"[]");
  data.push({
    n:name,
    score,
    total:pool.length,
    subject,
    level,
    date:new Date().toISOString()
  });
  data.sort((a,b)=>(b.score/b.total)-(a.score/a.total));
  localStorage.setItem("quizScores",JSON.stringify(data.slice(0,20)));
}

function showLB(){
  showSection("lb");
  const data=JSON.parse(localStorage.getItem("quizScores")||"[]");

  $("rows").innerHTML=data.length
    ? data.map((x,i)=>`
      <div class="row">
        <span>
          <b>${i+1}. ${safe(x.n)}</b>
          <small>${safe(x.subject)} • ${safe(x.level)}</small>
        </span>
        <b>${x.score}/${x.total}</b>
      </div>`).join("")
    : "<p>अजून स्कोअर नाही.</p>";
}

function safe(s){
  return String(s).replace(/[&<>"']/g,m=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",
    '"':"&quot;","'":"&#039;"
  }[m]));
}

function safeAttr(s){
  return String(s).replace(/\\/g,"\\\\").replace(/'/g,"\\'");
}

window.addEventListener("beforeunload",()=>clearInterval(timer));
