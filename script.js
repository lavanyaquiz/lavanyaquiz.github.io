const qs=[
["भारताची राजधानी कोणती?",["मुंबई","नवी दिल्ली","पुणे","नागपूर"],1],
["महाराष्ट्राची राजधानी कोणती?",["नाशिक","पुणे","मुंबई","कोल्हापूर"],2],
["भारताचा राष्ट्रीय प्राणी कोणता?",["सिंह","वाघ","हत्ती","मोर"],1],
["सूर्य कोणत्या दिशेला उगवतो?",["पश्चिम","उत्तर","दक्षिण","पूर्व"],3],
["एका आठवड्यात किती दिवस?",["5","6","7","8"],2],
["पाण्याचे रासायनिक सूत्र?",["CO2","H2O","O2","NaCl"],1],
["भारताचा राष्ट्रीय पक्षी?",["मोर","गरुड","कावळा","पोपट"],0],
["15 + 10 = ?",["20","25","30","35"],1],
["पृथ्वीचा नैसर्गिक उपग्रह?",["सूर्य","मंगळ","चंद्र","शुक्र"],2],
["इंद्रधनुष्यात किती रंग?",["5","6","7","8"],2]
];
let i=0,score=0,t=20,timer,name="";
function startQuiz(){name=document.getElementById("name").value.trim();if(!name){alert("कृपया नाव टाका");return}document.getElementById("login").classList.add("hidden");document.getElementById("quiz").classList.remove("hidden");showQ()}
function showQ(){clearInterval(timer);let x=qs[i];document.getElementById("no").textContent=i+1;document.getElementById("q").textContent=x[0];let a=document.getElementById("answers");a.innerHTML="";document.getElementById("next").classList.add("hidden");x[1].forEach((v,n)=>{let b=document.createElement("button");b.className="answer";b.textContent=String.fromCharCode(65+n)+". "+v;b.onclick=()=>answer(n);a.appendChild(b)});t=20;document.getElementById("time").textContent=t;timer=setInterval(()=>{t--;document.getElementById("time").textContent=t;if(t<=0)answer(-1)},1000)}
function answer(n){clearInterval(timer);let x=qs[i],bs=document.querySelectorAll(".answer");bs.forEach((b,k)=>{b.disabled=true;if(k===x[2])b.classList.add("correct");if(k===n&&n!==x[2])b.classList.add("wrong")});if(n===x[2])score++;document.getElementById("next").classList.remove("hidden");document.getElementById("next").textContent=i===9?"निकाल पहा 🏆":"पुढचा प्रश्न ➜"}
function nextQ(){i++;if(i>=qs.length){document.getElementById("quiz").classList.add("hidden");document.getElementById("result").classList.remove("hidden");document.getElementById("msg").textContent=name+", तुमचा Quiz पूर्ण झाला!";document.getElementById("score").textContent=score+" / "+qs.length}else showQ()}