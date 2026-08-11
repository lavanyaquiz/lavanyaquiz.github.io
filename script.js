let subject="",level="",pool=[],pos=0,score=0,time=15,timer=null,locked=false;
const $=id=>document.getElementById(id);
const subjects=[...new Set(QUESTIONS.map(x=>x[0]))];
$("subjects").innerHTML=subjects.map(s=>`<button onclick="choose('${s}')">${s==="सामान्य ज्ञान"?"🌟":s==="इतिहास"?"🏛️":s==="भूगोल"?"🌍":s==="विज्ञान"?"🔬":"➗"} ${s}</button>`).join("");
function hide(){["home","quiz","result","lb"].forEach(x=>$(x).classList.add("hidden"))}
function home(){clearInterval(timer);hide();$("home").classList.remove("hidden");$("levels").classList.add("hidden")}
function choose(s){subject=s;$("levels").classList.remove("hidden");$("levels").scrollIntoView({behavior:"smooth"})}
function start(l){level=l;pool=QUESTIONS.filter(x=>x[0]===subject&&x[1]===level);pos=0;score=0;hide();$("quiz").classList.remove("hidden");show()}
function show(){clearInterval(timer);locked=false;time=15;$("time").textContent=time;$("score").textContent=score;$("qn").textContent=`प्रश्न ${pos+1} / ${pool.length}`;$("bar").style.width=((pos+1)/pool.length*100)+"%";$("question").textContent=pool[pos][2];$("options").innerHTML="";$("next").classList.add("hidden");
pool[pos][3].forEach((x,n)=>{let b=document.createElement("button");b.className="opt";b.textContent=String.fromCharCode(65+n)+". "+x;b.onclick=()=>answer(n);$("options").appendChild(b)});
timer=setInterval(()=>{time--;$("time").textContent=time;if(time<=0){clearInterval(timer);answer(-1)}},1000)}
function answer(c){if(locked)return;locked=true;clearInterval(timer);let a=pool[pos][4];[...$("options").children].forEach((b,n)=>{b.disabled=true;if(n===a)b.classList.add("ok");if(n===c&&c!==a)b.classList.add("bad")});if(c===a){score++;$("score").textContent=score}$("next").classList.remove("hidden");$("next").textContent=pos===pool.length-1?"निकाल पहा 🏆":"पुढचा प्रश्न ➜"}
function next(){if(pos<pool.length-1){pos++;show()}else finish()}
function finish(){hide();$("result").classList.remove("hidden");let n=$("name").value.trim()||"खेळाडू";$("finalScore").textContent=score;$("total").textContent=pool.length;$("resultText").textContent=`${n}, ${subject} - ${level} Quiz पूर्ण झाला!`;let p=score/pool.length;$("message").textContent=p>=.8?"🎉 उत्कृष्ट कामगिरी!":p>=.5?"👍 चांगला प्रयत्न!":"💪 पुन्हा खेळा आणि स्कोअर वाढवा!";let a=JSON.parse(localStorage.getItem("quizScores")||"[]");a.push({n,score,total:pool.length,subject,level});a.sort((x,y)=>y.score/y.total-x.score/x.total);localStorage.setItem("quizScores",JSON.stringify(a.slice(0,10)))}
function showLB(){hide();$("lb").classList.remove("hidden");let a=JSON.parse(localStorage.getItem("quizScores")||"[]");$("rows").innerHTML=a.length?a.map((x,i)=>`<div class="row"><span>${i+1}. ${safe(x.n)}<small>${x.subject} • ${x.level}</small></span><b>${x.score}/${x.total}</b></div>`).join(""):"<p>अजून स्कोअर नाही.</p>"}
function safe(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}