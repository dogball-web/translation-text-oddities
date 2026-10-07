(function(){
  const MORPH_SCHEMA='v1.0.1-8-anomalies-pres';
  if(localStorage.getItem('chenghai_morph_schema')!==MORPH_SCHEMA){
    ['chenghai_morph_index','chenghai_morph_boundaries','chenghai_morph_locked','chenghai_morph_feedback_v09','chenghai_morph_wrong_counts_v09','chenghai_all_anomalous_analyses_complete'].forEach(k=>localStorage.removeItem(k));
    ['misremembered','remembership','represence','miswhere','displacement','mispresence','unseeing','refamiliar'].forEach(w=>localStorage.removeItem('chenghai_recognized_'+w));
    localStorage.setItem('chenghai_morph_schema',MORPH_SCHEMA);
  }
  const questions=[
    {word:'teacher',normal:['teach|er'],hint:'Which part is related to the verb <b>teach</b>?',correct:"Correct. <b>teach</b> is the lexical root and <b>-er</b> is a derivational suffix that forms an agent noun.",specials:{'tea|cher':"Incorrect. <b>tea</b> is an independent word, but it is not a morpheme of <i>teacher</i>. <b>-cher</b> is not an English suffix.",'t|each|er':"Incorrect. Morpheme boundaries do not necessarily correspond to every possible division of letters. Review the lexical base before adding the suffix."}},
    {word:'unbelievable',normal:['un|believ|able'],hint:'Look for the negative prefix <b>un-</b> and the suffix <b>-able</b>.',correct:"Correct. The morphological analysis is <b>un- + believe + -able</b>. In the surface spelling, the final <b>e</b> of <i>believe</i> is dropped before <b>-able</b>, so the visible boundary is <b>un | believ | able</b>.",specials:{'un|be|lie|vable':"Incorrect. A sequence of letters is not necessarily a morpheme. <b>be</b> and <b>lie</b> are words elsewhere, but they are not the relevant constituents in <i>unbelievable</i>."}},
    {word:'rewrite',normal:['re|write'],hint:'The prefix <b>re-</b> commonly means “again”.',correct:"Correct. <b>re-</b> is a productive prefix indicating repetition, while <b>write</b> is the lexical root.",specials:{}},
    {word:'carelessness',normal:['care|less|ness'],hint:'Start from <b>care</b>, then identify the adjective-forming and noun-forming suffixes.',correct:"Correct. <b>care</b> is the root, <b>-less</b> derives an adjective, and <b>-ness</b> derives a noun.",specials:{'carel|ess|ness':"Incorrect. The spelling sequence <b>carel</b> does not function as the lexical root in this formation."}},
    {word:'unhelpful',normal:['un|help|ful'],hint:'Find the lexical base <b>help</b> first.',correct:"Correct. <b>un-</b> is a negative prefix, <b>help</b> is the lexical root, and <b>-ful</b> derives an adjective.",specials:{}},
    {word:'disagreement',normal:['dis|agree|ment'],hint:'Find the verb <b>agree</b>, then look at what appears before and after it.',correct:"Correct. <b>dis-</b> modifies the lexical base <b>agree</b>, and <b>-ment</b> forms the noun.",specials:{}},
    {word:'misremembered',normal:['mis|remember|ed'],weird:true,hint:'The ordinary analysis is not the only division visible in the old Week 4 notes.',correct:"Correct. For this course, analyze the word synchronically as <b>mis- + remember + -ed</b>.",specials:{'mis|re|member|ed':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>MISREMEMBERED</span><br><i>adj.</i> remembered again as the wrong member.<br><span class='system-pulse'>Your response has been recorded.</span>"}},
    {word:'remembership',normal:['re|member|ship'],weird:true,hint:'Try reading a familiar sequence with a different boundary. The old notes may help.',correct:"Accepted. As a coined formation, <b>re- + member + -ship</b> can be interpreted as the state or condition of becoming a member again.",specials:{'remember|ship':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>REMEMBERSHIP</span><br><i>n.</i> the state of returning to memory after having ceased to be remembered.<br><span class='system-pulse'>Your response has been recorded.</span>"}},
    {word:'represence',normal:['re|presence'],weird:true,hint:'The system is looking for a smaller recurring sequence inside <b>presence</b>.',correct:"Accepted. As a coined formation, <b>re- + presence</b> can be interpreted as renewed or repeated presence.",specials:{'re|pres|ence':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>PRES</span><br><i>bound form.</i> to exist in a position that can be recognized or recorded.<br><br><span class='system-sub'>REPRESENCE</span><br><i>n.</i> a presence restored by recognition.<br><span class='system-pulse'>Your response has been recorded.</span>"}},
    {word:'miswhere',normal:[],weird:true,hint:'This is not a standard English formation. Read <b>mis-</b> as “wrongly / in the wrong place,” and ask what <b>where</b> contributes.',correct:'Analysis recognized.',specials:{'mis|where':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>MISWHERE</span><br><i>adv.</i> in a place where something or someone is not supposed to be.<br><span class='system-pulse'>Your response has been recorded.</span>"}},
    {word:'displacement',normal:['dis|place|ment'],weird:true,hint:'Try treating a familiar noun as the base rather than the verb.',correct:"Correct. <b>dis-</b> combines with <b>place</b>, and <b>-ment</b> derives the noun <i>displacement</i>.",specials:{'dis|placement':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>DISPLACEMENT</span><br><i>n.</i> a placement that does not agree with an observed position.<br><span class='system-pulse'>Your response has been recorded.</span>"}},{word:'mispresence',normal:['mis|presence'],weird:true,hint:'Consider the meaning of <b>mis-</b> in <i>misplace</i>. What does it mean for something to be <b>in the wrong place</b>?',correct:"Accepted. As a coined formation, <b>mis- + presence</b> suggests a presence that is erroneous, misplaced, or otherwise incorrect.",specials:{'mis|pres|ence':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>PRES</span> — <i>to exist in a recognizable or recordable position.</i><br><br><span class='system-sub'>MISPRESENCE</span><br><i>n.</i> a presence occupying a position assigned to another version.<br><span class='system-pulse'>Your response has been recorded.</span>"}},
    {word:'unseeing',normal:['un|see|ing'],weird:true,hint:'The old notes treat <b>un-see</b> as a possible unit. Try asking what it would mean to reverse seeing.',correct:"Accepted for this exercise. The nested structure has been simplified as <b>un- + see + -ing</b>.",specials:{'unsee|ing':"<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>UNSEEING</span><br><i>n.</i> the act of removing oneself from what has perceived one.<br><span class='system-pulse'>Your response has been recorded.</span>"}},
    {word:'refamiliar',normal:['re|familiar'],weird:true,semantic:true,hint:'The boundary is ordinary. The unusual part is <b>whose</b> familiarity is restored.',correct:"Accepted. The morphological structure is <b>re- + familiar</b>. For this item, specify whose previous state is restored.",specials:{}}
  ];
  function safeJSON(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch(e){return fallback;}}
  let index=Number(localStorage.getItem('chenghai_morph_index')||0);if(!Number.isFinite(index)||index<0||index>=questions.length)index=0;
  let boundaries=new Set();
  const saved=safeJSON('chenghai_morph_boundaries',{});
  const locked=safeJSON('chenghai_morph_locked',{});
  const responses=safeJSON('chenghai_morph_feedback_v09',{});
  const wrongCounts=safeJSON('chenghai_morph_wrong_counts_v09',{});

  const wordEl=document.getElementById('morph-word'),previewEl=document.getElementById('seg-preview'),feedback=document.getElementById('feedback-box'),currentEl=document.getElementById('quiz-current'),totalEl=document.getElementById('quiz-total'),submit=document.getElementById('submit-analysis'),reset=document.getElementById('reset-analysis'),prev=document.getElementById('prev-question'),next=document.getElementById('next-question'),card=document.getElementById('morph-card'),history=document.getElementById('quiz-history'),anomalyProgress=document.getElementById('anomaly-progress');
  totalEl.textContent=questions.length;

  const semantic=document.createElement('div');semantic.id='semantic-check';semantic.className='semantic-check';semantic.hidden=true;semantic.innerHTML='<div class="semantic-question"><strong>Semantic relation</strong><br>Specify whose previous state is restored.</div><div class="semantic-options"><button class="semantic-option" data-sem="observer">the observer</button><button class="semantic-option" data-sem="object">the object</button><button class="semantic-option" data-sem="both">both</button><button class="semantic-option" data-sem="unspecified">unspecified</button></div><div class="semantic-note" id="semantic-note"></div>';card.appendChild(semantic);

  const keyFor=i=>'q'+i;
  const lockFor=i=>locked[keyFor(i)]||null;
  const responseFor=i=>responses[keyFor(i)]||null;
  const saveLocks=()=>localStorage.setItem('chenghai_morph_locked',JSON.stringify(locked));
  const saveResponses=()=>localStorage.setItem('chenghai_morph_feedback_v09',JSON.stringify(responses));
  const saveWrongCounts=()=>localStorage.setItem('chenghai_morph_wrong_counts_v09',JSON.stringify(wrongCounts));
  const weirdIndexes=questions.map((q,i)=>q.weird?i:-1).filter(i=>i>=0);
  const allWeirdLocked=()=>weirdIndexes.every(i=>!!lockFor(i));
  const weirdLockedCount=()=>weirdIndexes.filter(i=>!!lockFor(i)).length;
  function refreshCompletionState(scrollIntoView=false){
    if(anomalyProgress){
      const count=weirdLockedCount();
      anomalyProgress.textContent=`Anomalous analyses recognized: ${count} / ${weirdIndexes.length}`;
      anomalyProgress.hidden=count===0;
      anomalyProgress.classList.toggle('complete',count===weirdIndexes.length);
    }
    const panel=document.getElementById('morph-complete-panel');
    const complete=allWeirdLocked();
    if(complete){
      localStorage.setItem('chenghai_all_anomalous_analyses_complete','1');
      if(panel){
        panel.hidden=false;
        if(scrollIntoView)setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'center'}),120);
      }
    }else{
      localStorage.removeItem('chenghai_all_anomalous_analyses_complete');
      if(panel)panel.hidden=true;
    }
  }
  function segmentation(){const w=questions[index].word;let out='';for(let i=0;i<w.length;i++){out+=w[i];if(boundaries.has(i+1)&&i<w.length-1)out+='|';}return out;}
  const pretty=seg=>seg?seg.split('|').join(' + '):'—';
  function save(){saved[keyFor(index)]=Array.from(boundaries);localStorage.setItem('chenghai_morph_boundaries',JSON.stringify(saved));localStorage.setItem('chenghai_morph_index',String(index));}
  function rememberFeedback(kind,html,seg,extra={}){responses[keyFor(index)]={kind,html,seg,...extra};saveResponses();renderHistory();}
  function setSemanticVisible(show,lock){semantic.hidden=!show;semantic.querySelectorAll('.semantic-option').forEach(btn=>{btn.disabled=!!lock;btn.classList.toggle('selected',!!lock&&lock.semantic===btn.dataset.sem);});const note=semantic.querySelector('#semantic-note');note.textContent='';if(lock&&lock.semantic==='object')note.textContent='Selection recorded: the object.';}
  function renderHistory(){if(!history)return;history.innerHTML='<span class="history-label">作答紀錄</span>'+questions.map((q,i)=>{const lock=lockFor(i),r=responseFor(i);let mark='—',cls='pending';if(lock){mark='○';cls='recognized';}else if(r&&r.kind==='correct'){mark='✓';cls='correct';}else if(r&&r.kind==='wrong'){mark='✕';cls='wrong';}return `<button type="button" class="history-item ${cls}${i===index?' current':''}" data-q="${i}" title="第 ${i+1} 題：${q.word}">${i+1}<span>${mark}</span></button>`;}).join('');history.querySelectorAll('[data-q]').forEach(btn=>btn.addEventListener('click',()=>{save();index=Number(btn.dataset.q);render();}));}
  function restoreFeedback(q,lock){
    if(lock){feedback.className='feedback-box recognized';feedback.innerHTML=lock.feedback+"<br><span class='system-pulse'>This response can no longer be revised.</span>";feedback.hidden=false;submit.disabled=true;submit.textContent='已提交';reset.disabled=true;setSemanticVisible(!!q.semantic,lock);return;}
    submit.disabled=false;submit.textContent='提交分析';reset.disabled=false;setSemanticVisible(false,null);
    const r=responseFor(index),seg=segmentation();
    if(r&&r.seg===seg){feedback.className='feedback-box '+(r.kind==='correct'?'correct':'wrong');feedback.innerHTML=r.html;feedback.hidden=false;if(q.semantic&&r.kind==='correct')setSemanticVisible(true,null);}else feedback.hidden=true;
  }
  function render(){const q=questions[index],lock=lockFor(index);boundaries=new Set(lock?lock.boundaries:(saved[keyFor(index)]||[]));currentEl.textContent=index+1;wordEl.innerHTML='';[...q.word].forEach((ch,i)=>{const letter=document.createElement('span');letter.className='morph-letter';letter.textContent=ch;wordEl.appendChild(letter);if(i<q.word.length-1){const gap=document.createElement('button');gap.type='button';gap.className='morph-gap'+(boundaries.has(i+1)?' active':'');gap.setAttribute('aria-label','toggle boundary after '+ch);gap.innerHTML='<span></span>';if(lock)gap.disabled=true;gap.addEventListener('click',()=>{if(lockFor(index))return;if(boundaries.has(i+1))boundaries.delete(i+1);else boundaries.add(i+1);save();renderWordOnly();feedback.hidden=true;setSemanticVisible(false,null);});wordEl.appendChild(gap);}});previewEl.textContent=pretty(segmentation());restoreFeedback(q,lock);prev.disabled=index===0;next.disabled=index===questions.length-1;renderHistory();refreshCompletionState(false);}
  function renderWordOnly(){[...wordEl.querySelectorAll('.morph-gap')].forEach((gap,i)=>gap.classList.toggle('active',boundaries.has(i+1)));previewEl.textContent=pretty(segmentation());}
  function lockWeird(q,seg,html,semanticValue){localStorage.setItem('chenghai_recognized_'+q.word,'1');locked[keyFor(index)]={boundaries:Array.from(boundaries),segmentation:seg,feedback:html};if(semanticValue)locked[keyFor(index)].semantic=semanticValue;saveLocks();rememberFeedback('correct',html,seg,{recognized:true});submit.disabled=true;submit.textContent='已提交';reset.disabled=true;[...wordEl.querySelectorAll('.morph-gap')].forEach(gap=>gap.disabled=true);feedback.className='feedback-box recognized';feedback.innerHTML=html+"<br><span class='system-pulse'>This response can no longer be revised.</span>";feedback.hidden=false;renderHistory();refreshCompletionState(true);}
  function wrongCountFor(i){return Number(wrongCounts[keyFor(i)]||0);}
  function withHint(q,html){
    if(wrongCountFor(index)<4 || !q.hint)return html;
    return html+"<div class='morph-hint'><strong>Hint</strong><br>"+q.hint+"</div>";
  }
  function recordWrong(q,html,seg){
    wrongCounts[keyFor(index)]=wrongCountFor(index)+1;saveWrongCounts();
    const shown=withHint(q,html);
    feedback.className='feedback-box wrong';feedback.innerHTML=shown;feedback.hidden=false;
    rememberFeedback('wrong',shown,seg,{wrongCount:wrongCountFor(index)});
  }
  function showFeedback(){if(lockFor(index))return;const q=questions[index],seg=segmentation();setSemanticVisible(false,null);if(!seg.includes('|')){feedback.className='feedback-box neutral';feedback.innerHTML='請至少標記一個 morpheme boundary 再提交。';feedback.hidden=false;return;}if(q.normal.includes(seg)){feedback.className='feedback-box correct';feedback.innerHTML=q.correct;feedback.hidden=false;rememberFeedback('correct',q.correct,seg);if(q.semantic){setSemanticVisible(true,null);feedback.innerHTML=q.correct+"<div class='semantic-required'>還有一項 Semantic relation 尚未完成。請在下方選擇後才算完成本題。</div>";}}else if(q.specials[seg]){if(q.weird)lockWeird(q,seg,q.specials[seg]);else{recordWrong(q,q.specials[seg],seg);}}else{const html='Incorrect. The selected boundaries do not match the analysis used in the current course materials. Review the root and any productive affixes, then try again.';recordWrong(q,html,seg);}save();}

  semantic.querySelectorAll('.semantic-option').forEach(btn=>btn.addEventListener('click',()=>{if(lockFor(index)||questions[index].word!=='refamiliar')return;const note=semantic.querySelector('#semantic-note'),value=btn.dataset.sem;semantic.querySelectorAll('.semantic-option').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');if(value==='observer')note.textContent='This is the expected ordinary reading. The semantic analysis remains incomplete.';else if(value==='both')note.textContent='This relation is too broad for the analysis requested.';else if(value==='unspecified')note.textContent='A semantic participant is required for this item.';else if(value==='object'){const html="<span class='system-line'>Analysis recognized.</span><br><span class='system-sub'>REFAMILIAR</span><br><i>adj.</i> recognized again by a formerly familiar place or object.<br><span class='system-pulse'>Your response has been recorded.</span>";lockWeird(questions[index],segmentation(),html,'object');setSemanticVisible(true,lockFor(index));}}));

  submit.addEventListener('click',showFeedback);
  reset.addEventListener('click',()=>{if(lockFor(index))return;boundaries.clear();save();renderWordOnly();feedback.hidden=true;setSemanticVisible(false,null);});
  prev.addEventListener('click',()=>{if(index>0){save();index--;render();}});next.addEventListener('click',()=>{if(index<questions.length-1){save();index++;render();}});
  render();
})();

/* v0.9.9 global anomaly phase marker */
(function(){
  const anomalyIndexes=['q6','q7','q8','q9','q10','q11','q12','q13'];
  function refreshAnomalyPhase(){
    try{
      const raw=JSON.parse(localStorage.getItem('chenghai_morph_locked')||'{}');
      if(anomalyIndexes.every(k=>!!raw[k])) localStorage.setItem('chenghai_all_anomalous_analyses_complete','1');
    }catch(e){}
  }
  document.addEventListener('click',()=>setTimeout(refreshAnomalyPhase,40),true);
  refreshAnomalyPhase();
})();
