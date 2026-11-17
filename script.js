const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

// Searchable Micro1 certified-skill cards.
const skillSearch=document.getElementById('skillSearch');
const skillCards=[...document.querySelectorAll('.certified-card')];
const noSkillResults=document.getElementById('noSkillResults');
skillSearch?.addEventListener('input',()=>{const term=skillSearch.value.trim().toLowerCase();let visible=0;skillCards.forEach(card=>{const match=card.textContent.toLowerCase().includes(term);card.hidden=!match;if(match)visible++;});if(noSkillResults)noSkillResults.hidden=visible!==0;});

// Accessible tabs for the self-created annotation demonstrations.
const tabs=[...document.querySelectorAll('.lab-tab')];
const panels=[...document.querySelectorAll('.demo-panel')];
function activateTab(name){tabs.forEach(tab=>{const active=tab.dataset.tab===name;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});panels.forEach(panel=>{const active=panel.dataset.panel===name;panel.hidden=!active;panel.classList.toggle('active',active);});}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activateTab(tab.dataset.tab));tab.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();activateTab(tabs[next].dataset.tab);}});});

function setFeedback(containerId,message,correct){const el=document.getElementById(containerId);if(el){el.textContent=message;el.style.color=correct?'#7ce2bd':'#f0a2a8';}}
document.querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('selected','correct','incorrect'));button.classList.add('selected');const good=button.dataset.answer==='supported';button.classList.add(good?'correct':'incorrect');setFeedback('videoFeedback',good?'Correct. The frame visibly supports a brown dog, grass, and a red ball. The word “toward” should only be retained if the direction of movement is clear from the clip, not a still frame alone.':'Review the visible evidence carefully. The animal, grass, and red ball are shown; however, direction or intent may require checking the full clip.',good);}));
document.querySelectorAll('[data-audio]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-audio]').forEach(b=>b.classList.remove('selected','correct','incorrect'));button.classList.add('selected');const good=button.dataset.audio==='a';button.classList.add(good?'correct':'incorrect');setFeedback('audioFeedback',good?'Correct. Based on the supplied observations, Recording A has clearer speech, lower noise, and more consistent volume.':'The observations favor Recording A: it has clearer speech, lower background noise, and more consistent volume.',good);}));
document.querySelectorAll('[data-visual]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-visual]').forEach(b=>b.classList.remove('selected','correct','incorrect'));button.classList.add('selected');const good=button.dataset.visual==='a';button.classList.add(good?'correct':'incorrect');setFeedback('visualFeedback',good?'Correct. Image A matches the blue mug, plain desk, and straight-on composition more closely.':'Compare every prompt requirement. Image B includes a patterned desk and an extra object that were not requested.',good);}));
document.querySelectorAll('[data-tts]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-tts]').forEach(b=>b.classList.remove('selected','correct','incorrect'));
  button.classList.add('selected');
  const good=button.dataset.tts==='good';
  button.classList.add(good?'correct':'incorrect');
  setFeedback('ttsFeedback',good?'Correct. The observation supports clear, accurate, natural speech. A brief pause is not automatically an error unless the project rubric says otherwise.':"Avoid inventing a failure rule. Assess the output against the source text and the project's actual rubric.",good);
}));
