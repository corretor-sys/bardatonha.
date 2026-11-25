(() => {
  const hero = document.querySelector('.hero');
  const chooser = document.querySelector('.chooser');
  const campaign = chooser.querySelector('.choice-photo');
  const buttons = [...chooser.querySelectorAll('[data-choice]')];
  const image = campaign.querySelector('img');
  const detail = chooser.querySelector('.choice-detail');
  const action = detail.querySelector('a');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = {
    cerveja: ['copo-campanha.jpg','Ilustração de campanha com um copo de cerveja','Escolha sua cerveja no cardápio do bar.','Ver bebidas','cardapio/index.html'],
    sinuca: ['sinuca.jpg','Mesa de sinuca azul na varanda do Bar da Tonha','Chame a turma para uma partida na varanda.','Conhecer o ambiente','#galeria'],
    churrasco: ['brasa.jpg','Carne assando na churrasqueira do Bar da Tonha','Quer assar carne com a turma? Combine o uso do espaço com o bar.','Consultar disponibilidade','https://wa.me/559999353827?text=Oi!%20Quero%20consultar%20o%20espa%C3%A7o%20para%20churrasco.']
  };
  function selectScene(name) {
    if (chooser.dataset.scene === name) return;
    chooser.dataset.scene = name;
    const [file, description, text, label, href] = scenes[name];
    image.src = 'assets/' + file;
    image.alt = description;
    detail.querySelector('p').textContent = text;
    action.textContent = label;
    action.href = href;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choice === name)));
    if (!reduced.matches) image.animate([{opacity:.5,translate:'0 5px'},{opacity:1,translate:'0 0'}],{duration:260});
  }
  buttons.forEach(button => button.addEventListener('click', () => selectScene(button.dataset.choice)));
  let start = null;
  campaign.addEventListener('pointerdown',event => {
    if (event.pointerType === 'touch' && !event.target.closest('a')) start = {x:event.clientX,y:event.clientY};
  });
  campaign.addEventListener('pointercancel',() => { start = null; });
  campaign.addEventListener('pointerup',event => {
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)*1.5) return;
    const index = buttons.findIndex(button => button.dataset.choice === chooser.dataset.scene);
    selectScene(buttons[(index + (dx < 0 ? 1 : 2)) % buttons.length].dataset.choice);
  });
  let frame = 0;
  function resetLight() {
    cancelAnimationFrame(frame);
    hero.style.removeProperty('--dx');
    hero.style.removeProperty('--dy');
  }
  hero.addEventListener('pointermove',event => {
    if (event.pointerType !== 'mouse' || reduced.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      hero.style.setProperty('--dx', ((event.clientX - bounds.left) / bounds.width - .5) * 20 + 'px');
      hero.style.setProperty('--dy', ((event.clientY - bounds.top) / bounds.height - .5) * 16 + 'px');
    });
  });
  hero.addEventListener('pointerleave',resetLight);
  reduced.addEventListener('change',resetLight);
})();
