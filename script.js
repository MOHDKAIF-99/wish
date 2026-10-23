/* ====== YAHAN APNA CONTENT BADLO ====== */
const CONFIG={
  name:"Cutie",
  date:"2026-10-30T00:00:00",   // countdown target
  lock:false,                    // true = 30 Oct se pehle "Open" nahi khulega
  key:"YOUR_WEB3FORMS_ACCESS_KEY",
  letter:"Happy Birthday, meri jaan! 🎂\nTum mere liye bahut special ho. Tumhari smile se hi mera din ban jaata hai. Ye chhota sa surprise sirf tumhare liye hai.\nHamesha aise hi hasti raho 💗",
  quiz:[
    {q:"Mujhe tumhari sabse achhi baat kaun si lagti hai?",o:[["Teri smile 😊","Sahi pakda! Wahi toh meri jaan hai 💖"],["Teri baatein 💬","Baatein karte karte time ka pata hi nahi chalta 🥹"],["Tera gussa 😤","Haha! Gussa mein bhi cute lagti ho 😂"],["Sab kuch 💕","Bilkul sahi jawab! 🏆"]]},
    {q:"Perfect birthday plan kya hoga?",o:[["Cake + movie 🍿","Done! Popcorn meri taraf se 😎"],["Long drive 🚗","Playlist ready hai 🎶"],["Surprise party 🎉","Shh… kuch bhi ho sakta hai 🤫"],["Bas tum aur main ☕","Yehi toh sabse best hai 💞"]]},
    {q:"Agle saal ke liye meri wish?",o:[["Tum hamesha khush raho 🌈","Meri bhi yehi wish hai 🥰"],["Hum zyada ghoomein ✈️","Bags pack karo! 🧳"],["Aur zyada cake 🍰","Cake ka budget approved ✅"]]}
  ]
};
/* ======================================= */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$('#n0').textContent=$('#n1').textContent=CONFIG.name;
const cols=['#ff8fab','#cdeeea','#ffd166','#c8b6ff','#ffb3c6'];
$$('.bun').forEach(b=>{for(let i=0;i<9;i++){const s=document.createElement('span');s.style.background=cols[i%5];b.appendChild(s)}});

function go(i){$$('.screen').forEach((e,k)=>e.classList.toggle('on',k===i));if(i===1)boom(32);if(i===2)type();if(i===4)quizStart()}
function boom(n){const em=['💖','🎉','✨','🌸','💗','🎊'];for(let i=0;i<n;i++){const e=document.createElement('i');e.className='cf';e.textContent=em[i%6];e.style.cssText=`left:${Math.random()*95}vw;animation-duration:${2.5+Math.random()*3}s;animation-delay:${Math.random()*.8}s;font-size:${15+Math.random()*16}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),7000)}}

/* countdown */
function tick(){let d=Math.max(0,new Date(CONFIG.date)-Date.now());const v=[864e5,36e5,6e4,1e3],m=[1e9,24,60,60],l=['din','ghante','min','sec'];
 $('#cd').innerHTML=v.map((x,k)=>`<div><b>${String(Math.floor(d/x)%m[k]).padStart(2,'0')}</b><small>${l[k]}</small></div>`).join('')}
tick();setInterval(tick,1000);
$('#open').onclick=()=>{if(CONFIG.lock&&new Date(CONFIG.date)>Date.now()){$('#lk').textContent='Thoda sabr… 30 Oct ko khulega 🤫';return}go(1)};
$('#b1').onclick=()=>go(2);

/* letter typewriter */
let tt;function type(){clearInterval(tt);const el=$('#lt');el.textContent='';let i=0;tt=setInterval(()=>{el.textContent+=CONFIG.letter[i++]||'';if(i>CONFIG.letter.length)clearInterval(tt)},35)}
$('#lt').onclick=()=>{clearInterval(tt);$('#lt').textContent=CONFIG.letter};
$('#b2').onclick=()=>{clearInterval(tt);go(3)};

/* cake */
$('#wish').onclick=()=>{$('#cake').classList.add('out');boom(40);$('#c1').textContent='Your wish is on its way ✨';$('#c2').textContent='Kahin ek tara bola: “haan!” 🌟';$('#wish').hidden=true;$('#b3').hidden=false};
$('#b3').onclick=()=>go(4);

/* quiz */
let qi=0,ans=[];
function quizStart(){qi=0;ans=[];$('#qa').hidden=false;$('#qf').hidden=$('#qd').hidden=true;showQ()}
function showQ(){const Q=CONFIG.quiz[qi];$('#qp').textContent=`Sawaal ${qi+1}/${CONFIG.quiz.length}`;$('#qq').textContent=Q.q;$('#qr').textContent='';$('#qn').hidden=true;$('#qo').innerHTML='';
 Q.o.forEach(([t,m])=>{const b=document.createElement('button');b.className='opt';b.textContent=t;
  b.onclick=()=>{$$('.opt').forEach(x=>x.disabled=true);b.classList.add('sel');ans.push(`${Q.q} → ${t}`);$('#qr').textContent=m;boom(8);$('#qn').hidden=false;$('#qn').textContent=qi+1<CONFIG.quiz.length?'Next →':'Finish 💌'};
  $('#qo').appendChild(b)})}
$('#qn').onclick=()=>{if(++qi<CONFIG.quiz.length)showQ();else{$('#qa').hidden=true;$('#qf').hidden=false}};
function done(note){$('#qf').hidden=true;$('#qd').hidden=false;if(note)$('#dn').textContent=note;boom(40)}
$('#sd').onclick=async()=>{const b=$('#sd');b.disabled=true;$('#er').textContent='';
 if(CONFIG.key.startsWith('YOUR_')){done('(Preview: access key set nahi hai, isliye mail nahi gaya)');return}
 try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:CONFIG.key,subject:`🎂 ${CONFIG.name} ne quiz complete kiya!`,from_name:CONFIG.name,message:ans.join('\n')+'\n\nUska message: '+($('#fm').value||'—')})});
  if(!(await r.json()).success)throw 0;done()}
 catch(e){b.disabled=false;$('#er').textContent='Send nahi hua, internet check karke dobara try karo 🙏'}};