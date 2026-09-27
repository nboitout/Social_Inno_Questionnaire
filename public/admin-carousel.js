// Paginate using rendered dimensions so long answers remain complete at any viewport size.
// Ranges preserve the original markup and every text character across continuation panels.
function textFragment(source, start, end) {
  const copy=source.cloneNode(false),range=document.createRange();
  range.selectNodeContents(source);
  const walker=document.createTreeWalker(source,NodeFilter.SHOW_TEXT);
  let node,offset=0;
  while((node=walker.nextNode())){
    const next=offset+node.length;
    if(start>0&&start>=offset&&start<next)range.setStart(node,start-offset);
    if(end<source.textContent.length&&end>offset&&end<=next){range.setEnd(node,end-offset);break;}
    offset=next;
  }
  let fragment=range.cloneContents();
  let ancestor=range.commonAncestorContainer;
  if(ancestor.nodeType===Node.TEXT_NODE)ancestor=ancestor.parentElement;
  // cloneContents omits the common ancestor (e.g. <p> when slicing within one text node).
  while(ancestor!==source){const wrapper=ancestor.cloneNode(false);wrapper.append(fragment);fragment=wrapper;ancestor=ancestor.parentElement;}
  copy.append(fragment);
  return copy;
}

export function mountCarousel(target, slides, {label='Survey answers'}={}) {
  let questionIndex=0,panelIndex=0,pages=[],frame,gesture,disposed=false,previousSize='';
  const shell=document.createElement('section');
  shell.className='answer-carousel';
  shell.setAttribute('role','region');shell.setAttribute('aria-roledescription','carousel');shell.setAttribute('aria-label',label);
  shell.innerHTML=`<div class="carousel-toolbar"><label class="carousel-picker"><span>Jump to question</span><select aria-label="${label==='Survey answers'?'Summary question':'Response question'}"></select></label><button type="button" class="secondary carousel-expand">Full screen</button></div><div class="carousel-heading"></div><div class="carousel-viewport" tabindex="0" aria-label="Answers; swipe left or right, or use the arrow keys"><div class="carousel-items" role="list"></div></div><div class="carousel-footer"><button type="button" class="secondary carousel-previous" aria-label="Previous answer panel">← Previous</button><div class="carousel-position" role="status" aria-live="polite" aria-atomic="true"></div><button type="button" class="secondary carousel-next" aria-label="Next answer panel">Next →</button></div><p class="carousel-hint">Swipe or use ← → · Long answers continue on the next panel.</p>`;
  target.replaceChildren(shell);
  const picker=shell.querySelector('select'),heading=shell.querySelector('.carousel-heading'),viewport=shell.querySelector('.carousel-viewport'),items=shell.querySelector('.carousel-items'),position=shell.querySelector('.carousel-position');
  const previous=shell.querySelector('.carousel-previous'),next=shell.querySelector('.carousel-next'),expand=shell.querySelector('.carousel-expand');
  const dialog=document.createElement('dialog');dialog.className='carousel-dialog';dialog.setAttribute('aria-label',label);target.append(dialog);
  let oldOverflow='';
  const prepared=slides.map((slide,i)=>{
    const option=document.createElement('option');option.value=i;option.textContent=slide.label;picker.append(option);
    const template=document.createElement('template');template.innerHTML=slide.html;
    const card=template.content.firstElementChild;
    const header=document.createElement('div');
    for(const node of card.children)if(node.matches('h2,.question-text,.field-hint'))header.append(node.cloneNode(true));
    const blocks=[...card.querySelectorAll('.distribution,.quote-list > li,.detail-answer,.empty')].map(node=>{
      const block=document.createElement('div');block.className=`carousel-item ${node.className}`;block.setAttribute('role','listitem');block.innerHTML=node.innerHTML;return block;
    });
    return {...slide,header,blocks,quotes:!!card.querySelector('.quote-list,.detail-answer')};
  });
  function fits(){return items.getBoundingClientRect().height<=viewport.clientHeight-2&&items.scrollWidth<=viewport.clientWidth;}
  function paginate(){
    if(disposed||!shell.isConnected)return;
    const slide=prepared[questionIndex];
    shell.dataset.question=slide.id;
    heading.replaceChildren(slide.header.cloneNode(true));
    shell.classList.toggle('carousel-quotes',slide.quotes);
    shell.classList.remove('carousel-tight');
    if(viewport.clientHeight<160)shell.classList.add('carousel-tight');
    items.replaceChildren();pages=[];
    let page=[];
    const finish=()=>{if(page.length)pages.push(page);page=[];items.replaceChildren();};
    for(const block of slide.blocks){
      let offset=0;
      const length=block.textContent.length;
      do{
        let piece=offset?textFragment(block,offset,length):block.cloneNode(true);
        piece.classList.toggle('answer-continuation',offset>0);
        items.append(piece);
        if(fits()){page.push(piece);offset=length;break;}
        piece.remove();
        if(page.length){finish();continue;}
        // A single long comment/detail gets as many horizontal panels as it needs.
        let low=offset+1,high=length,best=offset;
        while(low<=high){
          const middle=Math.floor((low+high)/2);
          piece=textFragment(block,offset,middle);piece.classList.toggle('answer-continuation',offset>0);items.replaceChildren(piece);
          if(fits()){best=middle;low=middle+1;}else high=middle-1;
        }
        // Keep words (and surrogate pairs) together whenever there is a sensible break.
        const text=block.textContent;
        if(best>offset){
          const boundary=Math.max(text.lastIndexOf(' ',best-1),text.lastIndexOf('\n',best-1));
          if(boundary>offset+(best-offset)*0.6)best=boundary+1;
          if(best<length&&/[\uDC00-\uDFFF]/.test(text[best]))best--;
        }
        if(best<=offset){
          // Extremely short viewports: use the full screen control to gain vertical space.
          // Retain readable content instead of discarding it if even one character cannot fit.
          items.replaceChildren(piece=offset?textFragment(block,offset,length):block.cloneNode(true));
          page.push(piece);offset=length;shell.classList.add('carousel-minimum');break;
        }
        piece=textFragment(block,offset,best);piece.classList.toggle('answer-continuation',offset>0);
        page.push(piece);offset=best;finish();
      }while(offset<length);
    }
    finish();if(!pages.length)pages=[[]];
    panelIndex=Math.min(panelIndex,pages.length-1);show();
  }
  function show(){
    items.replaceChildren(...pages[panelIndex].map(node=>node.cloneNode(true)));
    picker.value=questionIndex;
    position.textContent=`Question ${questionIndex+1} / ${slides.length} · Panel ${panelIndex+1} / ${pages.length}`;
    previous.disabled=questionIndex===0&&panelIndex===0;
    next.disabled=questionIndex===slides.length-1&&panelIndex===pages.length-1;
  }
  function align(){if(!dialog.open)shell.scrollIntoView({block:'start',behavior:'instant'});}
  function move(direction){
    if(direction<0&&previous.disabled||direction>0&&next.disabled)return;
    if(panelIndex+direction>=0&&panelIndex+direction<pages.length){panelIndex+=direction;show();}
    else{questionIndex+=direction;panelIndex=direction<0?Number.MAX_SAFE_INTEGER:0;paginate();}
    align();
  }
  previous.onclick=()=>{move(-1);(previous.disabled?next:previous).focus({preventScroll:true});};
  next.onclick=()=>{move(1);(next.disabled?previous:next).focus({preventScroll:true});};
  picker.onchange=()=>{questionIndex=Number(picker.value);panelIndex=0;paginate();align();};
  shell.onkeydown=e=>{
    if(e.target.matches('select,input,textarea')||e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}
  };
  viewport.onpointerdown=e=>{if(e.pointerType==='mouse')return;gesture={x:e.clientX,y:e.clientY,id:e.pointerId};viewport.setPointerCapture(e.pointerId);};
  viewport.onpointercancel=()=>{gesture=null;};
  viewport.onpointerup=e=>{
    if(!gesture||gesture.id!==e.pointerId)return;
    const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;gesture=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);
  };
  expand.onclick=()=>{
    if(dialog.open){dialog.close();return;}
    oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    dialog.append(shell);dialog.showModal();expand.textContent='Exit full screen';paginate();expand.focus();
  };
  dialog.onclose=()=>{
    target.insertBefore(shell,dialog);document.body.style.overflow=oldOverflow;expand.textContent='Full screen';paginate();align();expand.focus({preventScroll:true});
  };
  const resize=()=>{
    const headerHeight=document.querySelector('.site-header')?.getBoundingClientRect().height||0;
    shell.style.setProperty('--carousel-offset',`${Math.ceil(headerHeight)+24}px`);
    const key=`${shell.clientWidth}:${shell.clientHeight}`;
    if(key===previousSize)return;previousSize=key;
    cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{shell.classList.remove('carousel-minimum');paginate();});
  };
  const observer=new ResizeObserver(resize);observer.observe(shell);
  const siteHeader=document.querySelector('.site-header');if(siteHeader)observer.observe(siteHeader);
  resize();paginate();
  return ()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);if(dialog.open){dialog.onclose=null;dialog.close();document.body.style.overflow=oldOverflow;}};
}
