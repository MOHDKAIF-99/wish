/* ===== GUIDE: bear batata hai ab kya karna hai ===== */
(function(){
  const g=document.createElement('div');
  g.id='gd';g.innerHTML='<span>🧸</span><p id="gt"></p><button id="gx" aria-label="Guide band karo">✕</button>';
  const q=document.createElement('button');
  q.id='gq';q.textContent='?';q.hidden=true;q.setAttribute('aria-label','Guide kholo');
  document.body.append(g,q);

  let off=false,key='',tm,mark;
  const vis=s=>{const e=document.querySelector(s);return !!e&&!e.hidden&&e.offsetParent!==null};

  /* har screen ke liye: [message, button jo chamkega] */
  function step(){
    const on=document.querySelector('.screen.on');if(!on)return null;
    switch(on.id){
      case 's0':return ['Neeche “Open your surprise” dabao 👇','#open'];
      case 's1':return ['Wah! 🎉 Ab “There’s more” dabao','#b1'];
      case 's2':return document.querySelector('#lt').textContent.length<CONFIG.letter.length
        ?['Letter likha ja raha hai… padhti raho 💌 (tap karke jaldi bhi dekh sakti ho)',null]
        :['Padh liya? Ab “Cake time” dabao 🎂','#b2'];
      case 's3':
        if(vis('#wish'))return ['Aankhein band karo, ek wish maango, phir “Make a wish” dabao 🌙','#wish'];
        if(vis('#cut'))return ['Ab “Cut the cake” dabao (ya cake pe tap karo) 🔪','#cut'];
        if(vis('#b3'))return ['Cake kat gaya! 🥳 Ab “One last thing” dabao','#b3'];
        return null;
      case 's4':
        if(vis('#qa'))return vis('#qn')
          ?['Mera reply padho 😊 phir “Next” dabao','#qn']
          :['Koi ek option chuno 👇',null];
        if(vis('#qf'))return ['Kuch kehna ho to likho, phir “Send” dabao 💌','#sd'];
        return ['Bas! Tumhare jawab pahunch gaye 🥰',null];
    }
    return null;
  }

  function clear(){clearTimeout(tm);g.classList.remove('show');if(mark)mark.classList.remove('gp');mark=null}

  function tick(){
    const s=step(),k=s?s[0]:'';
    if(k===key)return;
    key=k;clear();
    if(!s||off)return;
    tm=setTimeout(()=>{                       // 1.3 sec baad guide dikhta hai
      document.querySelector('#gt').textContent=s[0];
      g.classList.add('show');
      if(s[1]){mark=document.querySelector(s[1]);if(mark)mark.classList.add('gp')}
    },1300);
  }
  setInterval(tick,300);

  document.querySelector('#gx').onclick=()=>{off=true;clear();q.hidden=false};
  q.onclick=()=>{off=false;q.hidden=true;key='__'};
})();