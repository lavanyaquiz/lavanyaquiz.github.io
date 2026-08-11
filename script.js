const questions=[
["महाराष्ट्राची राजधानी कोणती?",["पुणे","मुंबई","नाशिक","नागपूर"],1],
["भारताची राजधानी कोणती?",["मुंबई","दिल्ली","जयपूर","कोलकाता"],1],
["भारताचा राष्ट्रीय प्राणी कोणता?",["सिंह","हत्ती","वाघ","मोर"],2],
["भारताचा राष्ट्रीय पक्षी कोणता?",["मोर","गरुड","कावळा","पोपट"],0],
["महाराष्ट्राचा राज्य प्राणी कोणता?",["वाघ","शेकरू","सिंह","हरिण"],1],
["पृथ्वीचा उपग्रह कोणता?",["सूर्य","मंगळ","चंद्र","शुक्र"],2],
["सूर्यमालेतील सर्वात मोठा ग्रह कोणता?",["पृथ्वी","गुरू","मंगळ","बुध"],1],
["पाण्याचे रासायनिक सूत्र कोणते?",["CO2","O2","H2O","NaCl"],2],
["भारताचा स्वातंत्र्यदिन कधी असतो?",["15 ऑगस्ट","26 जानेवारी","2 ऑक्टोबर","14 एप्रिल"],0],
["प्रजासत्ताक दिन कधी असतो?",["15 ऑगस्ट","26 जानेवारी","1 मे","5 सप्टेंबर"],1],
["महाराष्ट्र दिन कधी साजरा केला जातो?",["1 मे","15 ऑगस्ट","26 जानेवारी","2 ऑक्टोबर"],0],
["छत्रपती शिवाजी महाराजांचा जन्म कोणत्या किल्ल्यावर झाला?",["रायगड","शिवनेरी","प्रतापगड","सिंहगड"],1],
["भारताचे राष्ट्रगीत कोणते?",["वंदे मातरम्","जन गण मन","सारे जहाँ से अच्छा","ऐ मेरे वतन"],1],
["सूर्य कोणत्या दिशेला उगवतो?",["पश्चिम","उत्तर","पूर्व","दक्षिण"],2],
["एका वर्षात किती महिने असतात?",["10","11","12","13"],2],
["एका आठवड्यात किती दिवस असतात?",["5","6","7","8"],2],
["मराठी भाषेची लिपी कोणती?",["रोमन","देवनागरी","गुरुमुखी","उर्दू"],1],
["पृथ्वीवर जीवनासाठी सर्वात आवश्यक वायू कोणता?",["ऑक्सिजन","हेलियम","निऑन","हायड्रोजन"],0],
["2 + 2 = ?",["3","4","5","6"],1],
["10 × 5 = ?",["15","50","55","100"],1]
];

let index=0,score=0,time=15,timerId=null,locked=false;
const $=id=>document.getElementById(id);

function hideAll(){["homePage","quizPage","resultPage","leaderboardPage"].forEach(id=>$(id).classList.add("hidden"))}
function startQuiz(){
  const name=$("playerName").value.trim();
  if(name) localStorage.setItem("quizPlayer",name);
  index=0;score=0;hideAll();$("quizPage").classList.remove("hidden");showQuestion();
}
function showQuestion(){
  clearInterval(timerId);locked=false;time=15;
  const q=questions[index];
  $("questionNo").textContent=`प्रश्न ${index+1} / ${questions.length}`;
  $("score").textContent=score;
  $("timer").textContent=time;
  $("progressBar").style.width=((index+1)/questions.length*100)+"%";
  $("question").textContent=q[0];
  $("nextBtn").classList.add("hidden");
  $("options").innerHTML="";
  q[1].forEach((text,i)=>{
    const b=document.createElement("button");
    b.className="option";b.textContent=`${String.fromCharCode(65+i)}. ${text}`;
    b.onclick=()=>answer(i,b);$("options").appendChild(b);
  });
  timerId=setInterval(()=>{
    time--;$("timer").textContent=time;
    if(time<=0){clearInterval(timerId);answer(-1,null)}
  },1000);
}
function answer(choice,clicked){
  if(locked)return;locked=true;clearInterval(timerId);
  const correct=questions[index][2];
  [...$("options").children].forEach((b,i)=>{
    b.disabled=true;
    if(i===correct)b.classList.add("correct");
    if(i===choice && choice!==correct)b.classList.add("wrong");
  });
  if(choice===correct){score++;$("score").textContent=score;beep(true)}
  else beep(false);
  $("nextBtn").classList.remove("hidden");
  $("nextBtn").textContent=index===questions.length-1?"निकाल पहा 🏆":"पुढचा प्रश्न ➜";
}
function nextQuestion(){
  if(index<questions.length-1){index++;showQuestion()}else finishQuiz()
}
function finishQuiz(){
  clearInterval(timerId);hideAll();$("resultPage").classList.remove("hidden");
  $("finalScore").textContent=score;$("totalScore").textContent=questions.length;
  const name=localStorage.getItem("quizPlayer")||"खेळाडू";
  $("resultText").textContent=`${name}, तुमचा Quiz पूर्ण झाला!`;
  const pct=score/questions.length*100;
  $("resultMessage").textContent=pct>=80?"🎉 उत्कृष्ट!":pct>=50?"👍 चांगला प्रयत्न!":"💪 पुन्हा खेळा आणि स्कोअर वाढवा!";
  saveScore(name,score);
}
function saveScore(name,score){
  const list=JSON.parse(localStorage.getItem("quizScores")||"[]");
  list.push({name,score,date:new Date().toLocaleDateString("mr-IN")});
  list.sort((a,b)=>b.score-a.score);localStorage.setItem("quizScores",JSON.stringify(list.slice(0,10)));
}
function showLeaderboard(){
  hideAll();$("leaderboardPage").classList.remove("hidden");
  const list=JSON.parse(localStorage.getItem("quizScores")||"[]");
  $("leaderboard").innerHTML=list.length?list.map((x,i)=>`<div class="lbRow"><span>${i+1}. ${escapeHtml(x.name)}</span><b>${x.score}/20</b></div>`).join(""):"<p>अजून कोणताही स्कोअर नाही.</p>";
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function goHome(){clearInterval(timerId);hideAll();$("homePage").classList.remove("hidden")}
function beep(ok){
  try{const c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();
  o.frequency.value=ok?700:220;o.connect(g);g.connect(c.destination);g.gain.value=.04;o.start();o.stop(c.currentTime+.12)}catch(e){}
}
$("playerName").value=localStorage.getItem("quizPlayer")||"";
