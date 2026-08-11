const questions = [
 {q:"महाराष्ट्राची राजधानी कोणती?",a:["पुणे","मुंबई","नाशिक","नागपूर"],c:1},
 {q:"भारताचा राष्ट्रीय प्राणी कोणता?",a:["सिंह","हत्ती","वाघ","मोर"],c:2},
 {q:"भारताचा राष्ट्रीय पक्षी कोणता?",a:["मोर","गरुड","कबूतर","कोकिळा"],c:0},
 {q:"पृथ्वीचा नैसर्गिक उपग्रह कोणता?",a:["सूर्य","चंद्र","मंगळ","शुक्र"],c:1},
 {q:"पाण्याचे रासायनिक सूत्र काय आहे?",a:["CO₂","O₂","H₂O","NaCl"],c:2},
 {q:"भारताचा स्वातंत्र्य दिन कधी साजरा केला जातो?",a:["26 जानेवारी","15 ऑगस्ट","2 ऑक्टोबर","14 नोव्हेंबर"],c:1},
 {q:"महाराष्ट्रातील सर्वात उंच शिखर कोणते?",a:["कळसूबाई","तोरणा","राजगड","हरिश्चंद्रगड"],c:0},
 {q:"संगणकाचा मेंदू म्हणून कोणाला ओळखले जाते?",a:["RAM","CPU","Mouse","Keyboard"],c:1},
 {q:"सूर्यमालेतील सर्वात मोठा ग्रह कोणता?",a:["पृथ्वी","मंगळ","गुरु","शनि"],c:2},
 {q:"भारताचे चलन कोणते?",a:["डॉलर","रुपया","युरो","पाउंड"],c:1},
 {q:"छत्रपती शिवाजी महाराजांचा जन्म कोणत्या किल्ल्यावर झाला?",a:["रायगड","शिवनेरी","प्रतापगड","सिंहगड"],c:1},
 {q:"महाराष्ट्र दिन कधी साजरा केला जातो?",a:["1 मे","15 ऑगस्ट","26 जानेवारी","1 जानेवारी"],c:0},
 {q:"मानवी शरीरात रक्त पंप करणारा अवयव कोणता?",a:["फुफ्फुस","मेंदू","हृदय","यकृत"],c:2},
 {q:"सूर्य कोणत्या दिशेला उगवतो?",a:["पश्चिम","उत्तर","दक्षिण","पूर्व"],c:3},
 {q:"एका आठवड्यात किती दिवस असतात?",a:["5","6","7","8"],c:2},
 {q:"भारताचा प्रजासत्ताक दिन कधी असतो?",a:["26 जानेवारी","15 ऑगस्ट","1 मे","2 ऑक्टोबर"],c:0},
 {q:"'जन गण मन' हे काय आहे?",a:["राष्ट्रीय गीत","राष्ट्रीय गान","राज्य गीत","प्रार्थना"],c:1},
 {q:"वनस्पती प्रकाशसंश्लेषणासाठी कोणता वायू वापरतात?",a:["ऑक्सिजन","नायट्रोजन","कार्बन डायऑक्साइड","हायड्रोजन"],c:2},
 {q:"मराठी भाषेची लिपी कोणती?",a:["देवनागरी","रोमन","गुरुमुखी","उर्दू"],c:0},
 {q:"तिरंग्यात किती मुख्य रंग आहेत?",a:["2","3","4","5"],c:1}
];

let index=0, score=0, name="", time=15, timerId=null, locked=false;

const $ = id => document.getElementById(id);
const startPage=$("startPage"), quizPage=$("quizPage"), resultPage=$("resultPage");

$("startBtn").onclick=()=>{
  name=$("playerName").value.trim();
  if(!name){ alert("कृपया तुमचे नाव टाका."); return; }
  index=0; score=0;
  startPage.classList.add("hidden");
  resultPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  showQuestion();
};

$("restartBtn").onclick=()=>{
  resultPage.classList.add("hidden");
  startPage.classList.remove("hidden");
  $("playerName").value=name;
};

function showQuestion(){
  clearInterval(timerId);
  locked=false;
  time=15;
  $("message").textContent="";
  const item=questions[index];
  $("questionCount").textContent=`प्रश्न ${index+1} / ${questions.length}`;
  $("score").textContent=`गुण: ${score}`;
  $("progressBar").style.width=`${((index+1)/questions.length)*100}%`;
  $("question").textContent=item.q;
  $("timer").textContent=time;

  const box=$("options");
  box.innerHTML="";
  item.a.forEach((text,i)=>{
    const b=document.createElement("button");
    b.className="option";
    b.textContent=`${String.fromCharCode(65+i)}. ${text}`;
    b.onclick=()=>answer(i,b);
    box.appendChild(b);
  });

  timerId=setInterval(()=>{
    time--;
    $("timer").textContent=time;
    if(time<=0){
      clearInterval(timerId);
      if(!locked) answer(-1,null,true);
    }
  },1000);
}

function answer(choice,clicked,timeout=false){
  if(locked)return;
  locked=true;
  clearInterval(timerId);

  const item=questions[index];
  const buttons=[...document.querySelectorAll(".option")];
  buttons.forEach(b=>b.disabled=true);

  if(choice===item.c){
    score++;
    clicked.classList.add("correct");
    $("message").textContent="✅ बरोबर उत्तर!";
  }else{
    if(clicked) clicked.classList.add("wrong");
    if(buttons[item.c]) buttons[item.c].classList.add("correct");
    $("message").textContent=timeout
      ?"⏰ वेळ संपली!"
      :"❌ चुकीचे उत्तर!";
  }
  $("score").textContent=`गुण: ${score}`;

  setTimeout(()=>{
    index++;
    if(index<questions.length) showQuestion();
    else showResult();
  },700);
}

function showResult(){
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  $("resultText").textContent=`${name}, तुमचा Quiz पूर्ण झाला!`;
  $("finalScore").textContent=`${score} / ${questions.length}`;

  let remark="छान प्रयत्न! 👍";
  if(score>=18) remark="🏆 अप्रतिम! तुमचा स्कोअर खूपच छान आहे!";
  else if(score>=15) remark="🎉 खूप छान! थोडा सराव केला तर आणखी चांगले!";
  else if(score>=10) remark="👍 चांगला प्रयत्न! पुन्हा खेळून स्कोअर वाढवा.";
  else remark="💪 पुन्हा प्रयत्न करा, नक्कीच स्कोअर वाढेल!";
  $("remark").textContent=remark;
}
