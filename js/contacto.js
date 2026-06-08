// ============ THREE.JS HERO ============
(function(){
  const canvas = document.getElementById('heroCanvas');
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const particles = new THREE.BufferGeometry();
  const count = 1800;
  const positions = new Float32Array(count * 3);
  for(let i=0;i<count*3;i++) positions[i]=(Math.random()-0.5)*20;
  particles.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const mat = new THREE.PointsMaterial({color:0x00c2ff, size:0.04, transparent:true, opacity:0.6});
  scene.add(new THREE.Points(particles, mat));

  function resize(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize',resize);

  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-0.5)*2;my=-(e.clientY/window.innerHeight-0.5)*2});

  (function animate(){
    requestAnimationFrame(animate);
    particles.attributes.position.needsUpdate=true;
    const pos=particles.attributes.position.array;
    for(let i=0;i<count;i++){
      pos[i*3+1]+=0.005;
      if(pos[i*3+1]>10)pos[i*3+1]=-10;
    }
    camera.position.x+=(mx*0.3-camera.position.x)*0.05;
    camera.position.y+=(my*0.3-camera.position.y)*0.05;
    camera.lookAt(0,0,0);
    renderer.render(scene,camera);
  })();
})();

// ============ THREE.JS CONTACT ============
(function(){
  const canvas = document.getElementById('contactCanvas');
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.parentElement.offsetWidth/canvas.parentElement.offsetHeight, 0.1, 100);
  camera.position.z = 4;

  const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 16);
  const mat = new THREE.MeshStandardMaterial({color:0x00c2ff, wireframe:true, opacity:0.15, transparent:true});
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(4, 0, 0);
  scene.add(mesh);
  scene.add(new THREE.AmbientLight(0xffffff,0.5));

  function resize(){
    const w=canvas.parentElement.offsetWidth, h=canvas.parentElement.offsetHeight;
    renderer.setSize(w,h);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    camera.aspect=w/h; camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize',resize);

  (function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x+=0.004;
    mesh.rotation.y+=0.006;
    renderer.render(scene,camera);
  })();
})();

// ============ GSAP ANIMATIONS ============
gsap.registerPlugin(ScrollTrigger);

gsap.to('.hero-tag', {opacity:1, y:0, duration:.7, delay:.3, ease:'power2.out', from:{y:20}});
gsap.from('.hero h1', {opacity:0, y:30, duration:.7, delay:.5, ease:'power2.out'});
gsap.from('.hero-sub', {opacity:0, y:20, duration:.7, delay:.7, ease:'power2.out'});
gsap.from('.scroll-hint', {opacity:0, duration:.7, delay:1.2});

gsap.from('.calc-steps', {opacity:0, x:-40, duration:.8, scrollTrigger:{trigger:'.calc-wrapper', start:'top 80%'}});
gsap.from('.result-panel', {opacity:0, x:40, duration:.8, scrollTrigger:{trigger:'.calc-wrapper', start:'top 80%'}});
gsap.from('.section-tag, .section-title, .section-sub', {opacity:0, y:20, stagger:.15, duration:.6, scrollTrigger:{trigger:'#cotizar', start:'top 80%'}});
gsap.from('.form-card', {opacity:0, x:-40, duration:.8, scrollTrigger:{trigger:'.contact-grid', start:'top 80%'}});
gsap.from('.info-cards', {opacity:0, x:40, duration:.8, scrollTrigger:{trigger:'.contact-grid', start:'top 80%'}});
gsap.from('.info-card', {opacity:0, y:20, stagger:.1, duration:.5, scrollTrigger:{trigger:'.info-cards', start:'top 85%'}});

// ============ CALCULADORA LOGIC ============
let base=0, mult=1, tiempo='', extras=0;

document.querySelectorAll('#tipoGrid .opt').forEach(opt=>{
  opt.addEventListener('click',()=>{
    document.querySelectorAll('#tipoGrid .opt').forEach(o=>o.classList.remove('selected'));
    opt.classList.add('selected');
    base=parseInt(opt.dataset.base);
    tiempo=opt.dataset.tiempo;
    mult=1;
    document.querySelectorAll('#compGrid .opt').forEach(o=>o.classList.remove('selected'));
    document.getElementById('step1').classList.add('done');
    document.getElementById('step2').style.display='block';
    document.getElementById('step2').classList.add('active');
    showResult();
  });
});

document.querySelectorAll('#compGrid .opt').forEach(opt=>{
  opt.addEventListener('click',()=>{
    document.querySelectorAll('#compGrid .opt').forEach(o=>o.classList.remove('selected'));
    opt.classList.add('selected');
    mult=parseFloat(opt.dataset.mult);
    document.getElementById('step2').classList.add('done');
    showResult();
  });
});

document.querySelectorAll('.extra-item').forEach(item=>{
  item.addEventListener('click',()=>{
    item.classList.toggle('selected');
    calcExtras();
    showResult();
  });
});

function calcExtras(){
  extras=0;
  document.querySelectorAll('.extra-item.selected').forEach(e=>{extras+=parseInt(e.dataset.price)});
}

function fmt(n){return n.toLocaleString('es-BO')}

function showResult(){
  if(!base) return;
  document.getElementById('emptyState').style.display='none';
  document.getElementById('resultContent').style.display='block';

  const precio=Math.round(base*mult)+extras;
  const precioMax=Math.round(precio*1.3);

  document.getElementById('priceNum').textContent=fmt(precio);
  document.getElementById('priceRange').textContent=mult>1?`Rango: Bs. ${fmt(precio)} – ${fmt(precioMax)}`:'Estimado base (sin nivel seleccionado)';
  document.getElementById('timeText').textContent=`Tiempo estimado: ${tiempo}`;

  const tipo=document.querySelector('#tipoGrid .opt.selected .opt-name')?.textContent||'';
  const nivel=document.querySelector('#compGrid .opt.selected .opt-name')?.textContent||'—';
  const extrasText=Array.from(document.querySelectorAll('.extra-item.selected .extra-name')).map(e=>e.textContent).join(', ')||'Ninguno';

  document.getElementById('breakdown').innerHTML=`
    <div class="breakdown-row"><span>Servicio</span><span>${tipo}</span></div>
    <div class="breakdown-row"><span>Nivel</span><span>${nivel}</span></div>
    <div class="breakdown-row"><span>Extras</span><span>Bs. ${fmt(extras)}</span></div>
    <div class="breakdown-total"><span>Total estimado</span><span>Bs. ${fmt(precio)}</span></div>
  `;

  const msg=`Hola Altura Digital! 👋\n\nQuiero cotizar:\n📌 ${tipo} — Nivel ${nivel}\n✅ Extras: ${extrasText}\n💰 Estimado: Bs. ${fmt(precio)} – ${fmt(precioMax)}\n⏱️ Tiempo: ${tiempo}\n\n¿Me pueden dar más detalles?`;
  document.getElementById('waBtn').href=`https://wa.me/59177765616?text=${encodeURIComponent(msg)}`;

  gsap.from('#priceNum',{textContent:0, duration:.6, ease:'power1.out', snap:{textContent:1},
    onUpdate:function(){document.getElementById('priceNum').textContent=fmt(Math.round(this.targets()[0]._gsap?.textContent||precio))}
  });
}

function resetCalc(){
  base=0; mult=1; extras=0;
  document.querySelectorAll('.opt').forEach(o=>o.classList.remove('selected'));
  document.querySelectorAll('.extra-item').forEach(o=>o.classList.remove('selected'));
  document.getElementById('step2').style.display='none';
  document.getElementById('step1').classList.remove('done');
  document.getElementById('step2').classList.remove('done','active');
  document.getElementById('emptyState').style.display='block';
  document.getElementById('resultContent').style.display='none';
}

function enviarWA(){
  const nombre=document.getElementById('nombre').value.trim();
  const contacto=document.getElementById('contacto').value.trim();
  const mensaje=document.getElementById('mensaje').value.trim();
  if(!nombre||!contacto||!mensaje){alert('Por favor completá todos los campos.');return}
  const msg=`Hola Altura Digital! 👋\n\nSoy *${nombre}*\nContacto: ${contacto}\n\n${mensaje}`;
  window.open(`https://wa.me/59177765616?text=${encodeURIComponent(msg)}`,'_blank');
}
