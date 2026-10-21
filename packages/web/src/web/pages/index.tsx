import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";

const titles = [
  "Robot móvil: el dato que no existe", "Equipo", "Planteamiento del problema", "La falla en x = 5",
  "Ruta de solución y métodos", "Variable, tipo de función y dominio", "Factorización del numerador",
  "Simplificación de la expresión", "Valores cercanos a 5", "Cálculo del límite", "Gráfica en GeoGebra",
  "Comportamiento y tipo de discontinuidad", "Conclusión: ¿sensor o fórmula?",
  "Propuesta de corrección del sistema", "Gracias por su atención"
];

function AmbientField({ active }: { active: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = [0, 3, 5, 7, 9, 11, 14].includes(active);
      const color = dark ? "114, 222, 208" : "7, 84, 87";
      const spacing = w < 700 ? 19 : 23;
      for (let row = 0; row < 13; row++) {
        for (let col = -2; col < Math.ceil(w / spacing) + 2; col++) {
          const x = col * spacing + (row % 2) * spacing / 2;
          const y = h * .80 + row * 10 + Math.sin(x * .014 + frame * .008 + row * .22) * (26 + row * 3) - row * row * .76;
          const alpha = Math.max(0, .25 - row * .012);
          ctx.beginPath(); ctx.arc(x, y, Math.max(.6, 1.2 - row * .035), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`; ctx.fill();
        }
      }
      for (let i = 0; i < 28; i++) {
        const x = ((i * 113.27 + 41) % w);
        const y = ((i * 219.37 + 73 + frame * (i % 3 + 1) * .10) % h);
        ctx.beginPath(); ctx.arc(x, y, i % 5 === 0 ? 1.45 : .75, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${i % 5 === 0 ? .24 : .11})`; ctx.fill();
      }
      if (!reduced) { frame++; raf = requestAnimationFrame(draw); }
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [active]);
  return <canvas ref={ref} className="ambient-field" aria-hidden="true" />;
}

function Robot({ active }: { active: number }) {
  return <div className={`robot-presence ${active === 0 ? "robot-hero" : ""} ${active === 14 ? "robot-end" : ""}`} style={{ "--robot-shift": `${Math.sin(active * 1.2) * 34}px`, "--robot-y": `${Math.cos(active * 1.9) * 32}px` } as React.CSSProperties} aria-hidden="true">
    <div className="robot-halo" /><div className="robot-orbit orbit-a" /><div className="robot-orbit orbit-b" />
    <svg className="robot-svg" viewBox="0 0 360 470" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metal" x1="70" y1="30" x2="290" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#D4FFF2"/><stop offset=".34" stopColor="#549D9E"/><stop offset=".65" stopColor="#183F4B"/><stop offset="1" stopColor="#9AE0CC"/></linearGradient>
        <linearGradient id="face" x1="80" y1="50" x2="260" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#123941"/><stop offset="1" stopColor="#071D2B"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>
      <g className="robot-arms"><path d="M102 274 C68 271 55 292 49 323 L28 386" stroke="url(#metal)" strokeWidth="32" strokeLinecap="round"/><path d="M258 274 C292 271 305 292 311 323 L332 386" stroke="url(#metal)" strokeWidth="32" strokeLinecap="round"/><circle cx="48" cy="327" r="12" fill="#65CFC4"/><circle cx="312" cy="327" r="12" fill="#65CFC4"/><path d="M28 386 L20 412 M28 386 L38 415 M332 386 L323 415 M332 386 L341 412" stroke="#A4E6D8" strokeWidth="13" strokeLinecap="round"/></g>
      <path d="M169 17V44" stroke="#8BDACF" strokeWidth="7" strokeLinecap="round"/><circle cx="169" cy="14" r="7" fill="#E9A85F"/><circle cx="169" cy="14" r="16" fill="#E9A85F" opacity=".5" filter="url(#glow)"/>
      <path d="M89 131 C89 61 130 43 181 43 C236 43 270 72 270 132 L268 186 C265 232 224 250 180 250 C128 250 91 225 89 184Z" fill="url(#metal)" stroke="#A2E8D9" strokeWidth="2"/>
      <path d="M105 129 C105 79 134 60 181 60 C225 60 254 80 254 129 L251 175 C248 210 223 233 179 233 C136 233 108 211 106 175Z" fill="url(#face)" stroke="#6CC4BD" strokeWidth="2"/>
      <path d="M106 134H252 M116 194H244" stroke="#83CBBF" opacity=".15"/><path d="M126 155 C137 144 155 144 167 154 M193 154 C206 143 225 144 236 155" stroke="#87F3DF" strokeWidth="8" strokeLinecap="round" className="robot-eyes"/><circle cx="147" cy="153" r="13" fill="#69F2D9" opacity=".35" filter="url(#glow)"/><circle cx="215" cy="153" r="13" fill="#69F2D9" opacity=".35" filter="url(#glow)"/>
      <path d="M161 194 Q180 204 200 194" stroke="#7FE5D1" strokeWidth="3" strokeLinecap="round"/><path d="M118 249 C142 261 220 261 244 249 L272 274 L260 389 Q181 424 100 389 L88 274Z" fill="url(#metal)" stroke="#9EE4D7" strokeWidth="2"/><path d="M124 282 Q180 294 236 282 L229 356 Q180 374 131 356Z" fill="#082936" stroke="#83D3C9" strokeWidth="2"/><circle cx="180" cy="322" r="27" stroke="#79E1D3" strokeWidth="2"/><circle cx="180" cy="322" r="13" fill="#8CFAE4"/><circle cx="180" cy="322" r="30" fill="#70F4DC" opacity=".35" filter="url(#glow)"/><path d="M122 382 L113 420 M238 382 L247 420" stroke="url(#metal)" strokeWidth="29" strokeLinecap="round"/>
      <g opacity=".8" stroke="#B5FBE7" strokeWidth="2"><path d="M110 88L84 78M250 88L276 78M132 279L115 266M228 279L245 266"/><circle cx="84" cy="78" r="3" fill="#E9A85F"/><circle cx="276" cy="78" r="3" fill="#E9A85F"/></g>
    </svg>
    <div className="robot-shadow" />
  </div>;
}

function Plot({ large = false }: { large?: boolean }) {
  return <figure className={`plot ${large ? "plot-large" : ""}`} aria-label="Gráfica de la recta y = x − 2 con un hueco en (5, 3)">
    <div className="plot-top"><span>GEO<span className="accent">/</span>GEBRA</span><span>01 — 10</span></div>
    <svg viewBox="0 0 560 380" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0V38" fill="none" stroke="currentColor" strokeOpacity=".13" strokeWidth="1"/></pattern><linearGradient id="line" x1="40" y1="330" x2="520" y2="40"><stop stopColor="#4699A2"/><stop offset="1" stopColor="#86E6D0"/></linearGradient></defs>
      <rect x="34" y="28" width="492" height="308" fill="url(#grid)"/>
      <path d="M48 316H520 M76 334V35" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5"/>
      <path className="plot-guide" d="M299 172V316M76 172H299" stroke="#E9A85F" strokeWidth="1.5" strokeDasharray="5 6"/>
      <path className="plot-line" d="M76 312L520 28" stroke="url(#line)" strokeWidth="4" strokeLinecap="round"/>
      <circle className="plot-pulse" cx="299" cy="169" r="19" fill="#E9A85F" opacity=".13"/><circle cx="299" cy="169" r="8" fill="var(--plot-bg)" stroke="#E9A85F" strokeWidth="3"/>
      <g fill="currentColor" fontSize="14" fontFamily="IBM Plex Mono,monospace"><text x="291" y="346">5</text><text x="54" y="176">3</text><text x="344" y="151" fill="#E9A85F">(5, 3)</text><text x="445" y="89">y = x − 2</text><text x="509" y="344">x</text></g>
    </svg>
    <div className="plot-bottom"><span>0 ≤ x ≤ 10</span><span className="plot-live"><i/> x = 5</span></div>
  </figure>;
}

function Formula() { return <div className="fraction equation"><span>S(x) = </span><span className="frac"><span>x² − 7x + 10</span><span>x − 5</span></span></div>; }
function Title({ step, children }: { step?: string; children: React.ReactNode }) { return <div className="title-block">{step && <div className="eyebrow accent">{step}</div>}<h2>{children}</h2></div>; }
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <div className={`panel ${className}`}>{children}</div>; }
function Scene({ number, dark = false, children, className = "" }: { number: number; dark?: boolean; children: React.ReactNode; className?: string }) { return <section id={`escena-${number}`} data-scene={number} className={`scene ${dark ? "scene-dark" : "scene-light"} ${className}`}><div className="scene-inner">{children}</div><span className="scene-index" aria-hidden="true">{String(number).padStart(2, "0")} / 15</span></section>; }

function App() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".scene")];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.intersectionRatio >= .42) setActive(Number((entry.target as HTMLElement).dataset.scene) - 1);
        }
      });
    }, { threshold: [0, .15, .42, .65] });
    sections.forEach(s => observer.observe(s));
    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? window.scrollY / max : 0);
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const travel = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            section.style.setProperty("--parallax", String((travel - .5) * 2));
          }
        });
        scrollRaf = 0;
      });
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); cancelAnimationFrame(scrollRaf); window.removeEventListener("scroll", onScroll); };
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panes = [...document.querySelectorAll<HTMLElement>(".panel, .plot")];
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const el = event.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      el.style.setProperty("--rx", `${(.5 - (event.clientY - rect.top) / rect.height) * 5}deg`);
    };
    const leave = (event: PointerEvent) => { const el = event.currentTarget as HTMLElement; el.style.setProperty("--ry", "0deg"); el.style.setProperty("--rx", "0deg"); };
    panes.forEach(el => { el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave); });
    return () => panes.forEach(el => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
  }, []);
  const jump = (i: number) => { document.getElementById(`escena-${i + 1}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); setMenuOpen(false); };
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key) && !menuOpen) { e.preventDefault(); jump(Math.min(14, active + 1)); }
      if (["ArrowUp", "PageUp"].includes(e.key) && !menuOpen) { e.preventDefault(); jump(Math.max(0, active - 1)); }
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key);
  }, [active, menuOpen]);

  return <div className="experience">
    <div className="reading-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
    <AmbientField active={active} /><Robot active={active} />
    <header className={`site-header ${[0, 3, 5, 7, 9, 11, 14].includes(active) ? "header-dark" : ""}`}>
      <button className="brand" onClick={() => jump(0)} aria-label="Ir al inicio"><span className="brand-icon"><i/><i/><i/><i/></span><span>ROBOT<span className="brand-slash">/</span>MÓVIL</span></button>
      <div className="header-center">PENSAMIENTO MATEMÁTICO III <span>—</span> CASO 3</div>
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir índice"><span>ÍNDICE</span><Menu size={19} strokeWidth={1.5}/></button>
    </header>
    <aside className="chapter-rail" aria-label="Progreso de la presentación"><div className="rail-line"/>{titles.map((title, i) => <button key={i} className={i === active ? "rail-dot active" : "rail-dot"} onClick={() => jump(i)} aria-label={`Ir a ${title}`} title={title}><span>{String(i + 1).padStart(2, "0")}</span></button>)}</aside>
    <div className="vertical-label" aria-hidden="true">FUNCIONES Y LÍMITES <span>·</span> 2026</div>
    <button className="next-cue" onClick={() => jump(Math.min(14, active + 1))} aria-label="Siguiente escena"><span>{String(active + 1).padStart(2, "0")} <i/> 15</span><ArrowDown size={17}/></button>
    <nav className={`chapter-menu ${menuOpen ? "open" : ""}`} aria-label="Índice de escenas" aria-hidden={!menuOpen}>
      <div className="menu-heading"><span>ÍNDICE / 15 ESCENAS</span><button onClick={() => setMenuOpen(false)} aria-label="Cerrar índice"><X size={26}/></button></div>
      <div className="menu-list">{titles.map((title, i) => <button key={i} onClick={() => jump(i)} className={active === i ? "selected" : ""}><span>{String(i + 1).padStart(2, "0")}</span><strong>{title}</strong><ArrowUpRight size={18}/></button>)}</div>
    </nav>

    <main>
      <Scene number={1} dark className="scene-hero">
        <div className="hero-copy reveal"><div className="eyebrow accent">PENSAMIENTO MATEMÁTICO III · SEGUNDA EVALUACIÓN</div><h1>Robot móvil:<br/><em>el dato que</em><br/>no existe<span className="title-period">.</span></h1><div className="hero-bottom"><p>Discontinuidad removible y límite de una función racional</p><span>Caso 3 · Funciones y límites</span></div></div>
        <div className="hero-diagram" aria-hidden="true"><div className="hero-ring ring-1"/><div className="hero-ring ring-2"/><div className="hero-cross">+</div><div className="hero-coordinate">X: 05.00<br/>Y: --.--</div></div>
        <div className="hero-footer" aria-hidden="true"><span>01 / 15</span><span>SCROLL TO EXPLORE ↓</span><span>S(X) / DATA GAP</span></div>
      </Scene>

      <Scene number={2} className="scene-team"><Title>Equipo</Title><div className="team-grid reveal"><Panel><div className="eyebrow accent">Integrante 1</div><h3>Nicolás Márquez</h3><span className="team-number">01</span></Panel><Panel><div className="eyebrow accent">Integrante 2</div><h3>Sebastien Mondragón</h3><span className="team-number">02</span></Panel><Panel><div className="eyebrow accent">Integrante 3</div><h3>Luis Hernández</h3><span className="team-number">03</span></Panel></div><p className="team-caption reveal">Pensamiento Matemático III · Caso 3: Robot móvil, el dato que no existe</p></Scene>

      <Scene number={3} className="scene-problem"><Title>Planteamiento del problema</Title><div className="two-col problem-grid reveal"><div className="prose"><p>El equipo de robótica de la escuela prepara un robot móvil autónomo que recorre un espacio con obstáculos.</p><p>Antes de usarlo se calibra uno de sus sensores: recibe una lectura normalizada x entre 0 y 10 y calcula el valor de calibración S(x).</p><p>Los programadores deben decidir qué hacer cuando el sistema falla.</p></div><Panel className="model-panel"><span className="eyebrow accent">Modelo del sistema</span><Formula/><p>con 0 ≤ x ≤ 10</p><div className="model-decoration" aria-hidden="true"><span>0</span><i/><span>5</span><i/><span>10</span></div></Panel></div></Scene>

      <Scene number={4} dark className="scene-failure"><Title>La falla en x = 5</Title><div className="two-col reveal"><div className="prose"><p>Durante las pruebas el sistema funciona con normalidad para casi todos los valores. En x = 5 el programa muestra “valor no definido”.</p><p>Hay que analizar si la falla es del sensor o de la fórmula, y qué valor debería asignar el software.</p></div><Panel className="failure-panel"><span className="eyebrow accent">Sustituimos x = 5</span><p>Numerador: 5² − 7·5 + 10 = 0</p><p>Denominador: 5 − 5 = 0</p><div className="failure-value">0 <span>/</span> 0</div><span className="small-note">Forma indeterminada</span></Panel></div></Scene>

      <Scene number={5} className="scene-methods"><Title>Ruta de solución y métodos</Title><div className="method-grid reveal"><Panel><div className="eyebrow accent">MÉTODO 1</div><h3>Álgebra</h3><p>Factorizar el numerador y simplificar la expresión.</p><b className="method-num">01</b></Panel><Panel><div className="eyebrow accent">MÉTODO 2</div><h3>Análisis numérico</h3><p>Evaluar S(x) en valores cercanos a 5.</p><b className="method-num">02</b></Panel><Panel><div className="eyebrow accent">MÉTODO 3</div><h3>Límite</h3><p>Calcular el límite de S(x) cuando x tiende a 5.</p><b className="method-num">03</b></Panel><Panel><div className="eyebrow accent">MÉTODO 4</div><h3>Gráfica</h3><p>Visualizar la recta y el hueco en GeoGebra.</p><b className="method-num">04</b></Panel></div><p className="below-note reveal">Los cuatro métodos se contrastan al final para responder: ¿sensor o fórmula?</p></Scene>

      <Scene number={6} dark className="scene-domain"><Title step="PASO 1">Variable, tipo de función y dominio</Title><div className="domain-grid reveal"><Panel><h3>Variable</h3><p>x es la lectura normalizada del sensor (0 ≤ x ≤ 10). S(x) es el valor de calibración que calcula el software.</p></Panel><Panel><h3>Tipo de función</h3><p>Función racional: es un cociente de dos polinomios.</p></Panel><Panel className="domain-result"><h3>Dominio</h3><strong>[0, 5) ∪ (5, 10]</strong><p>Se excluye x = 5 porque ahí el denominador x − 5 vale 0.</p><div className="domain-axis" aria-hidden="true"><span>0</span><i/><b>○</b><i/><span>10</span></div></Panel></div></Scene>

      <Scene number={7} className="scene-factor"><Title step="PASO 2">Factorización del numerador</Title><div className="two-col factor-grid reveal"><Panel><p>Buscamos dos números que multipliquen 10 y sumen −7:</p><strong>−2 y −5</strong><p className="small-note">(−2)(−5) = 10 y (−2) + (−5) = −7</p></Panel><Panel className="factor-result"><span className="eyebrow accent">Resultado</span><div className="result-equation">x² − 7x + 10<br/><span>= (x − 2)(x − 5)</span></div></Panel></div><p className="below-note reveal">Comprobación: (x − 2)(x − 5) = x² − 5x − 2x + 10 = x² − 7x + 10 ✓</p></Scene>

      <Scene number={8} dark className="scene-simplify"><Title step="PASO 3">Simplificación de la expresión</Title><Panel className="simplify-panel reveal"><div className="equation"><span>S(x) = </span><span className="frac"><span>(x − 2)(x − 5)</span><span>x − 5</span></span><span>= x − 2, x ≠ 5</span></div></Panel><div className="explain reveal"><p>El factor común (x − 5) se cancela en numerador y denominador.</p><p>La restricción x ≠ 5 se conserva: el denominador original sigue siendo cero en x = 5.</p><p>S(x) y x − 2 coinciden en todos los puntos salvo en x = 5.</p></div></Scene>

      <Scene number={9} className="scene-values"><Title step="PASO 4">Valores cercanos a 5</Title><div className="values-grid reveal"><Panel><span>S(4.9) =</span><strong>2.9</strong><i/></Panel><Panel><span>S(4.99) =</span><strong>2.99</strong><i/></Panel><Panel><span>S(5.01) =</span><strong>3.01</strong><i/></Panel><Panel><span>S(5.1) =</span><strong>3.1</strong><i/></Panel></div><p className="below-note reveal">Por la izquierda (x &lt; 5) y por la derecha (x &gt; 5), S(x) = x − 2 se acerca a 3.</p><Panel className="statement reveal">S(x) → 3 cuando x → 5</Panel></Scene>

      <Scene number={10} dark className="scene-limit"><Title step="PASO 5">Cálculo del límite</Title><Panel className="limit-steps reveal"><p>lím(x→5) (x² − 7x + 10) / (x − 5)</p><p>= lím(x→5) (x − 2)(x − 5) / (x − 5)</p><p>= lím(x→5) (x − 2)</p><p className="accent">= 5 − 2 = 3</p></Panel><div className="explain reveal"><p>Límites laterales: lím(x→5⁻) S(x) = 3 y lím(x→5⁺) S(x) = 3.</p><p>El límite existe aunque S(5) no esté definida: indica que la lectura faltante debería ser 3.</p></div></Scene>

      <Scene number={11} className="scene-graph"><Title step="PASO 6">Gráfica en GeoGebra</Title><div className="graph-grid reveal"><div className="graph-instructions"><p>Escribir (x^2 - 7x + 10)/(x - 5) en la barra de entrada.</p><p>Escribir también x - 2 para compararlas: es la misma recta, salvo el hueco en x = 5.</p><p>Crear el punto (5, 3) y cambiarlo a círculo vacío.</p><p>Hacer zoom alrededor de x = 5 para ver el hueco.</p></div><Plot large/></div></Scene>

      <Scene number={12} dark className="scene-behavior"><Title step="PASO 7">Comportamiento y tipo de discontinuidad</Title><div className="two-col behavior-grid reveal"><Panel><span className="eyebrow accent">FUNCIÓN CRECIENTE</span><h3>Pendiente 1 &gt; 0</h3><p>S(x) = x − 2 va de (0, −2) a (10, 8). En la gráfica se reconoce porque la recta sube de izquierda a derecha.</p></Panel><Panel><span className="eyebrow accent">DISCONTINUIDAD REMOVIBLE</span><h3>Hueco en (5, 3)</h3><p>El límite existe y vale 3, pero S(5) no está definida. Al definir S(5) = 3 la función queda continua.</p></Panel></div></Scene>

      <Scene number={13} className="scene-conclusion"><Title>Conclusión: ¿sensor o fórmula?</Title><p className="lead reveal">La falla es de la fórmula, no del sensor: x = 5 es una lectura válida dentro del rango 0–10.</p><div className="conclusion-grid reveal"><Panel><span className="eyebrow accent">ÁLGEBRA</span><p>Se cancela (x − 5); la expresión original da 0/0 en x = 5.</p></Panel><Panel><span className="eyebrow accent">GRÁFICA</span><p>Recta y = x − 2 con un hueco en (5, 3).</p></Panel><Panel><span className="eyebrow accent">LÍMITE</span><p>lím(x→5) S(x) = 3.</p></Panel></div><Panel className="statement conclusion-statement reveal"><span className="eyebrow accent">Valor que debe asignar el software</span><strong>S(5) = 3</strong></Panel></Scene>

      <Scene number={14} className="scene-correction"><Title>Propuesta de corrección del sistema</Title><Panel className="correction-formula reveal"><span className="eyebrow accent">Función definida por partes</span><p>S(x) = (x² − 7x + 10)/(x − 5) si x ≠ 5</p><p>S(x) = 3 si x = 5</p></Panel><div className="two-col correction-bottom reveal"><div className="prose"><p>Alternativa equivalente: usar S(x) = x − 2 en 0 ≤ x ≤ 10.</p><p>El programa no se interrumpe y el valor entregado coincide con el límite.</p></div><Panel className="code-panel"><span className="eyebrow accent">Lógica para el programa</span><p>si x = 5 → S = 3<br/>en otro caso → S = (x² − 7x + 10) / (x − 5)</p></Panel></div></Scene>

      <Scene number={15} dark className="scene-thanks"><div className="thanks-content reveal"><div className="thanks-spark" aria-hidden="true">✳</div><h2>Gracias por su atención</h2><p>¿Preguntas?</p><span>Nicolás Márquez · Sebastien Mondragón · Luis Hernández</span></div><div className="closing-orbit" aria-hidden="true"/></Scene>
    </main>
  </div>;
}

export default App;