(function(){
  const weirdWords=['misremembered','remembership','represence','miswhere','displacement','mispresence','unseeing','refamiliar'];
  const allRecognized=()=>weirdWords.every(w=>localStorage.getItem('chenghai_recognized_'+w)==='1');
  const ending=()=>localStorage.getItem('chenghai_ending_applied')==='1';
  const weirdStage=()=>weirdWords.some(w=>localStorage.getItem('chenghai_recognized_'+w)==='1') || ending();

  const pad=n=>String(n).padStart(2,'0');
  const fmtDate=(d=new Date())=>`${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())}`;
  const fmtTimestamp=(d=new Date())=>`${fmtDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const endingTimestamp=()=>{
    let ts=localStorage.getItem('chenghai_ending_timestamp');
    if(!ts && ending()){
      ts=fmtTimestamp();
      localStorage.setItem('chenghai_ending_timestamp',ts);
      localStorage.setItem('chenghai_ending_date',ts.slice(0,10));
    }
    return ts||'';
  };

  const parseStoredTimestamp=(ts)=>{
    const m=(ts||'').match(/^(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})$/);
    if(!m)return new Date();
    return new Date(Number(m[1]),Number(m[2])-1,Number(m[3]),Number(m[4]),Number(m[5]),0,0);
  };
  const endingDateObject=()=>parseStoredTimestamp(endingTimestamp());
  const academicParts=(d=endingDateObject())=>{
    const month=d.getMonth()+1, day=d.getDate(), year=d.getFullYear();
    // Current-course display follows a plausible Taiwan academic calendar.
    // Jan 1–15: first semester; Jan 16–Feb 15: winter intensive;
    // Feb 16–Jun 30: second semester; Jul–Aug: summer intensive; Sep–Dec: first semester.
    if(month===1 && day<=15)return {roc:year-1912,type:'semester',sem:1};
    if((month===1 && day>=16) || (month===2 && day<=15))return {roc:year-1912,type:'winter'};
    if((month===2 && day>=16) || (month>=3 && month<=6))return {roc:year-1912,type:'semester',sem:2};
    if(month===7 || month===8)return {roc:year-1912,type:'summer'};
    return {roc:year-1911,type:'semester',sem:1};
  };
  const academicLabel=(d=endingDateObject())=>{
    const p=academicParts(d);
    if(p.type==='winter')return `${p.roc}學年度寒假加開`;
    if(p.type==='summer')return `${p.roc}學年度暑期加開`;
    return `${p.roc}學年度第${p.sem}學期`;
  };
  const shortBoardLabel=(d=endingDateObject())=>{
    const p=academicParts(d);
    if(p.type==='winter')return `${p.roc}寒假 討論區`;
    if(p.type==='summer')return `${p.roc}暑期 討論區`;
    return `${p.roc}-${p.sem} 討論區`;
  };
  const currentTopicLimit=(d=endingDateObject())=>{
    const p=academicParts(d);
    return p.type==='winter'?4:(p.type==='summer'?5:7);
  };
  const currentRelativeDay=(raw,d=endingDateObject())=>{
    const p=academicParts(d);
    const rankMap=new Map([[0,0],[-6,1],[-14,2],[-21,3],[-27,4],[-35,5],[-42,6]]);
    const rawNum=Number(raw||0), rank=rankMap.has(rawNum)?rankMap.get(rawNum):null;
    if(rank===null)return rawNum;
    if(p.type==='winter')return [0,-5,-10,-15,-20,-25,-30][rank];
    if(p.type==='summer')return [0,-6,-12,-18,-24,-30,-36][rank];
    return rawNum;
  };
  const relativeStamp=(dayOffset=0,timeText='')=>{
    const d=endingDateObject();
    d.setDate(d.getDate()+Number(dayOffset||0));
    if(timeText){const m=timeText.match(/^(\d{1,2}):(\d{2})$/);if(m){d.setHours(Number(m[1]),Number(m[2]),0,0);}}
    return fmtTimestamp(d);
  };
  const relativeMinuteStamp=(minuteOffset=0)=>{
    const d=endingDateObject();
    d.setMinutes(d.getMinutes()+Number(minuteOffset||0));
    return fmtTimestamp(d);
  };

  // Inspection deterrence is handled by the staged guard below.
  // Initially only morphology_practice.html is protected.
  // After all anomalous analyses are recognized, protection becomes site-wide.

  // Search-engine-like visited links.
  const VISITED_KEY='chenghai_visited_pages';
  const cleanPath=(href)=>{try{const u=new URL(href,location.href);if(!/^https?:$|^file:$/.test(u.protocol))return null;if(location.protocol!=='file:'&&u.origin!==location.origin)return null;return u.pathname.replace(/\/index\.html$/,'/')||'/';}catch(e){return null;}};
  const getVisited=()=>{try{return new Set(JSON.parse(localStorage.getItem(VISITED_KEY)||'[]'));}catch(e){return new Set();}};
  const saveVisited=set=>{try{localStorage.setItem(VISITED_KEY,JSON.stringify(Array.from(set).slice(-250)));}catch(e){}};
  const markVisitedLinks=()=>{
    const visited=getVisited();const current=cleanPath(location.href);if(current){visited.add(current);saveVisited(visited);}
    document.querySelectorAll('a[href]').forEach(a=>{const path=cleanPath(a.getAttribute('href'));if(path&&visited.has(path)&&!a.classList.contains('active'))a.classList.add('is-visited');a.addEventListener('click',()=>{const p=cleanPath(a.getAttribute('href'));if(p){const s=getVisited();s.add(p);saveVisited(s);a.classList.add('is-visited');}});});
  };

  // Guard hidden pages from direct URL access.
  if(document.body.hasAttribute('data-requires-full-unlock')&&!allRecognized()){
    document.body.innerHTML='<div class="page-wrap"><div class="page-head"><h2>原始文本補充資料</h2></div><div class="page-body"><div class="archive-note">此教材尚未開放。請先完成課程指定的字詞結構練習。</div><a class="back" href="../pages/materials.html">← 回教材下載</a></div></div>';markVisitedLinks();return;
  }
  if(document.body.hasAttribute('data-requires-ending')&&!ending()){
    const back=document.body.getAttribute('data-lock-back')||'../index.html';
    document.body.innerHTML='<div class="page-wrap"><div class="page-head"><h2>教室設備檢查</h2></div><div class="page-body"><div class="archive-note">此封存資料目前不在可瀏覽範圍內。</div><a class="back" href="'+back+'">← 返回</a></div></div>';markVisitedLinks();return;
  }

  document.querySelectorAll('[data-full-unlock]').forEach(row=>{
    const link=row.querySelector('[data-full-link]'),desc=row.querySelector('[data-full-desc]'),date=row.querySelector('[data-full-date]');
    if(allRecognized()){if(link)link.outerHTML='<a data-full-link href="../docs/travel_notes_full.html"><strong>原始文本掃描（完整）</strong><br><span class="file">travel_notes_full.pdf</span></a>';if(desc)desc.textContent='補充教材｜完整掃描';if(date){date.textContent='已開放';date.classList.remove('gray');}row.classList.add('unlocked-row');}
  });
  const status=document.querySelector('[data-full-status]');
  if(status&&allRecognized()){status.style.display='table-row';status.innerHTML='<td class="file">📄 <a href="docs/travel_notes_full.html">travel_notes_full.pdf</a></td><td>補充資料</td><td>完整掃描</td>';}

  // Final translation: store the exact submission minute. This becomes the anomalous edit time later.
  const apply=document.getElementById('apply-translation');
  if(apply){
    const input=document.getElementById('final-translation-input'),feedback=document.getElementById('final-translation-feedback');
    // Never repopulate a previous translation. If the ending is already complete,
    // show only the archived completion state and keep the answer field blank.
    try { localStorage.removeItem('chenghai_final_translation'); } catch(e) {}
    if(ending()){input.value='';input.disabled=true;apply.disabled=true;apply.textContent='已提交';feedback.hidden=false;feedback.innerHTML='<span class="system-line">Your response has been recorded.</span><br><span class="system-pulse">Your translation has been applied.</span><br><span class="system-complete">This archived exercise is now complete.</span>';}
    apply.addEventListener('click',()=>{
      const value=input.value.trim();
      const normalized=value.replace(/\s+/g,' ').toLowerCase();
      const metaReplies={
        '翻譯':'That is how you know me.',
        '中文翻譯':'That is the language in which you know me.',
        'translation':'That is what you call me.',
        'chinese translation':'That is how you have chosen to read me.'
      };
      if(metaReplies[normalized]){feedback.className='feedback-box recognized';feedback.hidden=false;feedback.textContent=metaReplies[normalized];return;}

      // Generous completeness check: reject obvious non-translations, not stylistic variation.
      const han=(value.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g)||[]).length;
      const concepts=[
        /西(?:側|侧|邊|边|方)?|西面/,
        /建築|建筑|建物|大樓|大楼|樓|楼|房子/,
        /記錄|紀錄|记录|記載|记载|登記|登记|不存在|未曾|從未|从未|沒有[^。！？]*建|没有[^。！？]*建/,
        /命名|取名|取名字|名字|稱為|称为|叫做|叫它|把[^。！？]*叫/,
        /記得|记得|想起|記起|记起|憶起|忆起|回想|知道[^。！？]*(?:怎麼|怎么)/,
        /進去|进去|進入|进入|裡面|里面|內部|内部|入口|道路|路|(?:怎麼|怎么)[^。！？]*(?:進|进)/
      ];
      const conceptCount=concepts.reduce((n,re)=>n+(re.test(value)?1:0),0);
      const completeEnough = han>=15 ? conceptCount>=3 : (han>=10 && conceptCount>=4);
      if(!completeEnough){feedback.className='feedback-box wrong';feedback.hidden=false;feedback.textContent='請完整翻譯後再提交。';return;}
      const now=new Date(),ts=fmtTimestamp(now);
      localStorage.setItem('chenghai_ending_applied','1');
      localStorage.setItem('chenghai_ending_timestamp',ts);
      localStorage.setItem('chenghai_ending_date',fmtDate(now));
      input.disabled=true;apply.disabled=true;apply.textContent='已提交';feedback.className='feedback-box recognized';feedback.hidden=false;feedback.innerHTML='<span class="system-line">Your response has been recorded.</span><br><span class="system-pulse">Your translation has been applied.</span><br><span class="system-complete">This archived exercise is now complete.</span><div class="ending-return"><span class="gray tiny">Returning to Department Site…</span></div>';setTimeout(()=>{window.location.href='../index.html';},5000);
    });
  }

  // Current-course discussion dates are derived from the player's fixed ending timestamp.
  if(ending()){
    document.querySelectorAll('[data-current-academic-label]').forEach(el=>el.textContent=academicLabel());
    document.querySelectorAll('[data-current-board-label]').forEach(el=>el.textContent=shortBoardLabel());
    document.querySelectorAll('[data-relative-day]').forEach(el=>el.textContent=relativeStamp(currentRelativeDay(el.getAttribute('data-relative-day')),el.getAttribute('data-time')||''));
    document.querySelectorAll('[data-relative-minute]').forEach(el=>el.textContent=relativeMinuteStamp(el.getAttribute('data-relative-minute')));
    const topicLimit=currentTopicLimit();
    document.querySelectorAll('[data-current-topic-count]').forEach(el=>el.textContent=String(topicLimit));
    document.querySelectorAll('[data-current-topic-row]').forEach((row,index)=>{row.hidden=index>=topicLimit;row.style.display=index>=topicLimit?'none':'';});
    // Department notices also move to the player's present after the ending.
    const deptNoticeSets={
      winter:['寒假系辦服務時間調整','下學期選課與加退選提醒','海外交換資料補件通知','語文中心寒假開放時間'],
      summer:['暑期系辦服務時間調整','暑期課程教室異動通知','海外交換資料補件通知','語文中心暑期開放時間'],
      regular:['系辦臨時服務時間調整','語文中心自習空間開放時間','海外交換說明會報名資訊','校內英語活動報名通知']
    };
    const ap=academicParts();
    const noticeKind=ap.type==='winter'?'winter':(ap.type==='summer'?'summer':'regular');
    const noticeOffsets=[-3,-10,-18,-27];
    document.querySelectorAll('[data-department-announcements]').forEach(table=>{
      const titles=deptNoticeSets[noticeKind];
      const rows=noticeOffsets.map((off,i)=>{const d=endingDateObject();d.setDate(d.getDate()+off);return `<tr><td>${fmtDate(d)}</td><td><span class="department-static">${titles[i]}</span></td></tr>`;}).join('');
      table.innerHTML='<tr><th>日期</th><th>標題</th></tr>'+rows;
    });
    if(document.body.hasAttribute('data-current-discussion-page'))document.title='討論區｜翻譯實務（'+shortBoardLabel().replace(' 討論區','')+'）';
    if(/course_current\.html$/i.test(location.pathname))document.title='翻譯實務｜'+academicLabel()+'｜誠海人文大學';
  }

  // Keep pre-ending/post-ending classroom references mutually exclusive.
  if(!ending()){
    document.querySelectorAll('[data-ending-only]').forEach(el=>{el.hidden=true;el.style.display='none';});
    document.querySelectorAll('[data-pre-ending-space]').forEach(el=>{el.hidden=false;el.style.display='';});
    document.querySelectorAll('[data-pre-ending-space-panel]').forEach(el=>{el.hidden=false;el.style.display='';});
  }

  // Post-ending state: quiet changes only.
  if(ending()){
    const ts=endingTimestamp();
    const playDate=(ts||localStorage.getItem('chenghai_ending_date')||fmtDate()).slice(0,10);
    document.querySelectorAll('[data-play-date]').forEach(el=>el.textContent=playDate);
    document.querySelectorAll('[data-ending-only]').forEach(el=>{el.hidden=false;el.style.display='';});
    document.querySelectorAll('[data-pre-ending-space]').forEach(el=>{el.hidden=true;el.style.display='none';});
    document.querySelectorAll('[data-pre-ending-space-panel]').forEach(el=>{el.hidden=true;el.style.display='none';});
    document.querySelectorAll('.pre-ending-course-link').forEach(el=>{el.hidden=true;el.style.display='none';});
    document.querySelectorAll('[data-figure4-reply]').forEach(el=>{el.textContent='同學好，這份教材本來就有些缺失，尤其是圖片的部分。此 caption 指向的圖片已補於新版教材，不影響成績，同學不用擔心。';});
    document.querySelectorAll('[data-figure4-box]').forEach(el=>{el.textContent='[ Figure 4 reproduced in synchronized copy ]';el.classList.add('figure-restored');});
    document.querySelectorAll('[data-ending-complete-word]').forEach(el=>el.classList.add('ending-red-word'));
    document.querySelectorAll('[data-ending-edit-time]').forEach(el=>{el.textContent='最後編輯：'+ts;el.classList.add('ending-edit-time');});
  }

  document.querySelectorAll('[data-disabled]').forEach(el=>el.addEventListener('click',e=>e.preventDefault()));
  markVisitedLinks();
})();

/* v0.9.1 — staged inspection deterrence.
   Early: morphology practice only.
   After all anomalous analyses are locked: site-wide. */
(function(){
  const isMorphologyPage = /morphology_practice\.html$/i.test(location.pathname);
  const anomalyKeys = ['misremembered','remembership','represence','miswhere','displacement','mispresence','unseeing','refamiliar'];
  function anomalousPhaseComplete(){
    const complete=anomalyKeys.every(k => localStorage.getItem('chenghai_recognized_'+k)==='1');
    if(complete){
      localStorage.setItem('chenghai_all_anomalous_analyses_complete','1');
      return true;
    }
    localStorage.removeItem('chenghai_all_anomalous_analyses_complete');
    return false;
  }
  function shouldBlock(){ return isMorphologyPage || anomalousPhaseComplete(); }
  function warning(){
    return anomalousPhaseComplete()
      ? 'Please do not access content that has not been made available to you.'
      : '本課程教材不支援開發者工具檢視，請使用正常瀏覽方式。';
  }
  function showInspectionWarning(){
    let box=document.getElementById('inspection-warning-v091');
    if(!box){
      box=document.createElement('div'); box.id='inspection-warning-v091';
      box.className='inspection-warning'; document.body.appendChild(box);
    }
    box.textContent=warning(); box.classList.add('show');
    clearTimeout(window.__inspectionWarnTimer);
    window.__inspectionWarnTimer=setTimeout(()=>box.classList.remove('show'),2200);
  }
  document.addEventListener('contextmenu',e=>{
    if(!shouldBlock()) return;
    e.preventDefault(); showInspectionWarning();
  },true);
  document.addEventListener('keydown',e=>{
    if(!shouldBlock()) return;
    const k=(e.key||'').toLowerCase();
    const blocked =
      k==='f12' ||
      (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(k)) ||
      (e.ctrlKey && k==='u') ||
      (e.metaKey && e.altKey && ['i','j','c'].includes(k));
    if(blocked){e.preventDefault();e.stopPropagation();showInspectionWarning();}
  },true);
})();
