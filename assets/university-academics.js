/* MRR University — educational practice tools. No accounts, secure exams, accreditation or server-side storage. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const catalogSearch = $('uni-course-search');
  const courseCards = Array.from(document.querySelectorAll('.uni-syllabus'));
  const count = $('uni-course-count');
  if (catalogSearch) {
    catalogSearch.addEventListener('input', () => {
      const q = catalogSearch.value.trim().toLocaleLowerCase();
      let visible = 0;
      courseCards.forEach(card => {
        const match = card.textContent.toLocaleLowerCase().includes(q);
        card.hidden = !match;
        if (match) visible++;
      });
      count.textContent = `${visible} of ${courseCards.length} course outlines`;
    });
    $('uni-expand-all').addEventListener('click', () => courseCards.filter(x => !x.hidden).forEach(x => x.open = true));
    $('uni-collapse-all').addEventListener('click', () => courseCards.forEach(x => x.open = false));
    // Deep links to individual outlines should open the outline automatically.
    function openHash() {
      const hash = window.location.hash;
      if (!hash.startsWith('#syllabus-')) return;
      const target = document.getElementById(hash.slice(1));
      if (target) { catalogSearch.value=''; catalogSearch.dispatchEvent(new Event('input')); target.open = true; }
    }
    window.addEventListener('hashchange', openHash);
    openHash();
  }
  function makeNode(tag, cls, value) {
    const el=document.createElement(tag);
    if (cls) el.className=cls;
    if (value!==undefined) el.textContent=value;
    return el;
  }
  function downloadJSON(name, value) {
    const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement('a'); anchor.href=url; anchor.download=name;
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  // Instructor planning worksheet. Browser-session only; never submitted to a service.
  const instructorForm=$('uni-instructor-form');
  if (instructorForm) {
    let records=[];
    const tbody=$('uni-instructor-list');
    const status=$('uni-instructor-status');
    function redraw() {
      tbody.replaceChildren();
      if (!records.length) {
        const tr=makeNode('tr'); const td=makeNode('td',null,'No instructor records entered. No instructors are verified or assigned.'); td.colSpan=4; tr.append(td); tbody.append(tr); return;
      }
      records.forEach((r,i) => {
        const tr=makeNode('tr');
        for(const value of [r.name,r.assignment,r.status])tr.append(makeNode('td',null,value));
        const actions=makeNode('td');
        const button=makeNode('button','uni-table-button','Remove');button.type='button';
        button.setAttribute('aria-label',`Remove ${r.name} from draft list`);
        button.addEventListener('click',()=>{records.splice(i,1);redraw();status.textContent=`${records.length} local draft records. None are verified or publicly published.`;});
        actions.append(button);tr.append(actions);tbody.append(tr);
      });
    }
    instructorForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      if(!instructorForm.reportValidity())return;
      const values=Object.fromEntries(new FormData(instructorForm).entries());
      values.recordedAt=new Date().toISOString();
      values.note='Local planning entry. Not a verified instructor qualification or a hire.';
      records.push(values);redraw();instructorForm.reset();
      status.textContent=`${records.length} local draft record(s) in this tab only. Export before reloading.`;
    });
    $('uni-instructor-download').addEventListener('click',()=>{
      if(!records.length) {status.textContent='Add a draft record before exporting.';return;}
      downloadJSON('mrr-instructor-qualification-draft.json', {status:'DRAFT — NOT VERIFIED', exportedAt:new Date().toISOString(), records});
      status.textContent=`Exported ${records.length} local draft records. Store securely; do not publish private instructor documents.`;
    });
    $('uni-instructor-clear').addEventListener('click',()=>{
      if(records.length && !confirm('Clear all local draft instructor records in this browser tab?'))return;
      records=[];redraw();status.textContent='Local instructor records cleared. No information was sent to MRR.';
    });
  }
  // Automatically scored practice knowledge exams. These are open-book educational demos, not secure tests.
  const quizBank=$('uni-exam-data') ? JSON.parse($('uni-exam-data').textContent) : {};
  const examSelect=$('uni-exam-select');
  if(examSelect) {
    const form=$('uni-written-exam');
    const result=$('uni-exam-results');
    const progress=$('uni-exam-progress');
    const questions=()=>quizBank[examSelect.value]||[];
    function renderExam(){
      form.replaceChildren();result.hidden=true;result.replaceChildren();
      questions().forEach((q,i)=>{
        const fieldset=makeNode('fieldset','uni-question');
        const legend=makeNode('legend',null,`${i+1}. ${q.question}`);
        fieldset.append(legend);
        q.choices.forEach((choice,j)=>{
          const label=makeNode('label','uni-question-choice');
          const input=document.createElement('input');input.type='radio';input.name=`question-${i}`;input.value=String(j);
          label.append(input,makeNode('span',null,choice));fieldset.append(label);
        });
        form.append(fieldset);
      });
      progress.textContent=`0 of ${questions().length} answered`;
    }
    form.addEventListener('change',()=>{
      const total=questions().length;
      const answered=form.querySelectorAll('input[type="radio"]:checked').length;
      progress.textContent=`${answered} of ${total} answered`;
      if(!result.hidden) {result.hidden=true;result.replaceChildren();}
    });
    examSelect.addEventListener('change',renderExam);
    $('uni-reset-exam').addEventListener('click',renderExam);
    $('uni-grade-exam').addEventListener('click',()=>{
      const qs=questions();
      const selected=qs.map((q,i)=>form.querySelector(`input[name="question-${i}"]:checked`));
      if(selected.some(x=>!x)) {
        result.hidden=false;
        result.replaceChildren(makeNode('p','uni-grade-warning',`Answer all ${qs.length} questions before grading. This is a study exercise, not a credential exam.`));
        result.scrollIntoView({behavior:'smooth',block:'nearest'});return;
      }
      const correct=qs.reduce((sum,q,i)=>sum+(Number(selected[i].value)===q.answer?1:0),0);
      const pct=Math.round(100*correct/qs.length);
      result.replaceChildren();
      const summary=makeNode('h3',null,`Practice result: ${correct} / ${qs.length} correct (${pct}%)`);
      const interpretation=makeNode('p',pct>=80?'uni-pass':'uni-review',
        pct>=80 ? 'Practice benchmark met. This does not award credit, certification or an RVTI qualification.' : 'Review the explanations below and retry the practice assessment. No qualification is awarded.');
      const breakdown=makeNode('ol','uni-explanation-list');
      qs.forEach((q,i)=>{
        const choice=Number(selected[i].value);const match=choice===q.answer;
        const item=makeNode('li');
        item.append(makeNode('strong',null,`${match?'Correct':'Review'} — ${q.question}`));
        item.append(makeNode('p',null,`Your answer: ${q.choices[choice]}. Correct answer: ${q.choices[q.answer]}. ${q.explanation}`));
        breakdown.append(item);
      });
      result.append(summary,interpretation,breakdown);result.hidden=false;
      result.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
    renderExam();
  }
  // Instructor-supervised practical evaluation mock-up; no student records saved or transmitted.
  const practicalBank=$('uni-rubric-data') ? JSON.parse($('uni-rubric-data').textContent) : {};
  const practicalSelect=$('uni-practical-select');
  if(practicalSelect) {
    const tbody=$('uni-practical-criteria');
    const result=$('uni-practical-result');
    const date=$('uni-practical-date');
    date.value=new Date().toLocaleDateString('en-CA');
    function renderRubric(){
      tbody.replaceChildren();result.replaceChildren();
      (practicalBank[practicalSelect.value]||[]).forEach(([criterion,critical],i)=>{
        const tr=makeNode('tr');
        const text=makeNode('td',null,criterion);
        if(critical)text.append(makeNode('span','uni-critical','Safety critical'));
        const controls=makeNode('td');
        const label=makeNode('label','uni-sr-only',`Result for criterion ${i+1}`);
        const select=document.createElement('select');select.name=`practical-${i}`;
        ['Not observed','Demonstrated','Needs more practice'].forEach(v=>{
          const opt=document.createElement('option');opt.value=v;opt.textContent=v;select.append(opt);
        });
        label.append(select);controls.append(label);tr.append(text,controls);tbody.append(tr);
      });
    }
    practicalSelect.addEventListener('change',renderRubric);
    function report() {
      const criteria=practicalBank[practicalSelect.value] || [];
      const observations=criteria.map(([criterion,critical],i)=>({
        criterion,criticalSafetyItem:critical,result:tbody.querySelector(`select[name="practical-${i}"]`)?.value||'Not observed'
      }));
      const complete=observations.every(x=>x.result==='Demonstrated');
      const criticalFailed=observations.some(x=>x.criticalSafetyItem && x.result!=='Demonstrated');
      return {evaluationStatus:'PRACTICE WORKSHEET — NOT A CREDENTIAL', courseId:practicalSelect.value,
        candidate:$('uni-practical-student').value.trim(),assessor:$('uni-practical-assessor').value.trim(),
        date:date.value,criteria:observations,notes:$('uni-practical-notes').value.trim(),
        outcome:complete?'All listed practice criteria demonstrated':criticalFailed?'Safety-critical criterion not demonstrated or not observed':'Incomplete: further demonstration required',
        disclosure:'This is a browser-only educational worksheet. Results are not verified, stored, accredited, or accepted as professional certification.'};
    }
    $('uni-evaluate-practical').addEventListener('click',()=>{
      const r=report();result.replaceChildren();
      result.append(makeNode('h3',null,r.outcome));
      const done=r.criteria.filter(x=>x.result==='Demonstrated').length;
      result.append(makeNode('p',null,`${done} / ${r.criteria.length} criteria marked demonstrated. Only a qualified assessor can verify real-world competence; this page does not issue a credential.`));
    });
    $('uni-export-practical').addEventListener('click',()=>{
      const r=report();downloadJSON(`mrr-practical-${r.courseId.toLowerCase()}-draft.json`,r);
      result.replaceChildren(makeNode('p',null,'Downloaded local draft evaluation. No information was transmitted. Store personal records securely.'));
    });
    $('uni-print-practical').addEventListener('click',()=>{
      const r=report();
      // Print the page with the practical section visible; no popup injection or external service.
      result.replaceChildren(makeNode('h3',null,r.outcome),makeNode('p',null,'Printable practice worksheet — no credential awarded.'));
      window.print();
    });
    renderRubric();
  }
})();
