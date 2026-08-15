import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  AddressBook,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Buildings,
  CalendarBlank,
  CaretDown,
  ChartBar,
  Check,
  CheckCircle,
  Clock,
  DeviceMobile,
  Headset,
  InstagramLogo,
  Robot,
  ShieldCheck,
  Stack,
  User,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const INSTAGRAM_URL = "https://www.instagram.com/mateus.nnogueira/";
const BOOKING_URL = "https://calendar.app.google/stv7Vy1SmPZnN9KE6";
const BOOKING_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0wYQl_QvAUOyLoe0eYi7UlusVIxaUN5bB6P7K33stiPxYH9Y55xJtv3psDca7p4n8tAOaV3pI5?gv=true";
// URL do Web App do Google Apps Script que grava as aplicações na planilha.
// Cole aqui a URL gerada no deploy (termina em /exec). Enquanto vazio, o formulário não envia.
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbxPiK1EKMfl8OvKYXIAjOqt309TMt5pxUaHbvoUtof5G7ZgsBYJYXfmTRUhm1UuMjnDdA/exec";

type Journey = "home" | "company" | "mentorship";
type DestinationJourney = Exclude<Journey, "home">;

type ProjectItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  icon: Icon;
};

const projectItems: ProjectItem[] = [
  {
    id: "dashboard",
    title: "Dashboard interno",
    category: "Sistema interno",
    icon: ChartBar,
    summary:
      "Um painel único que reúne indicadores, tarefas e ocorrências em tempo real. A equipe enxerga o que importa de imediato e decide com dados, sem depender de planilhas espalhadas.",
  },
  {
    id: "crm",
    title: "CRM",
    category: "Sistema comercial",
    icon: AddressBook,
    summary:
      "Pipeline, distribuição de leads e acompanhamento do time comercial em um fluxo só. Cada oportunidade fica visível, com histórico e próximos passos claros para não perder venda.",
  },
  {
    id: "erp",
    title: "ERP",
    category: "Gestão integrada",
    icon: Stack,
    summary:
      "Processos, estoque, financeiro e operação conectados em uma base única, desenhada para o seu negócio. Menos retrabalho, informação consistente e uma visão integrada da empresa.",
  },
  {
    id: "apps",
    title: "Aplicativos",
    category: "Produto digital",
    icon: DeviceMobile,
    summary:
      "Aplicativos web e mobile para clientes, equipes ou parceiros — do atendimento à operação em campo. Uma experiência própria, pensada para quem vai usar todos os dias.",
  },
  {
    id: "ai-support",
    title: "Agente de IA de atendimento",
    category: "IA incorporada",
    icon: Headset,
    summary:
      "Um agente que entende o contexto da conversa, responde as dúvidas mais comuns e encaminha o que precisa de uma pessoa. Atendimento mais rápido, disponível 24/7 e com supervisão humana.",
  },
];

type ClientLogo = {
  name: string;
  image?: string;
};

const clientLogos: ClientLogo[] = [
  { name: "Vida Nova", image: "/assets/clients/vida-nova.jpeg" },
  { name: "Auto Peças", image: "/assets/clients/auto-pecas.jpeg" },
  { name: "Grupo Protefort", image: "/assets/clients/protefort.jpg" },
  { name: "Clínica Viotto", image: "/assets/clients/clinica-viotto.webp" },
  { name: "Acadi-TI", image: "/assets/clients/acadi-ti.webp" },
  { name: "Dev Club", image: "/assets/clients/dev-club.jpeg" },
  { name: "Masi Negócios", image: "/assets/clients/masi-negocios.jpeg" },
  { name: "V4 Company", image: "/assets/clients/v4.jpeg" },
  { name: "Tintas MC", image: "/assets/clients/mc-tintas.jpg" },
];

const companyFaqs = [
  {
    question: "Minha empresa realmente precisa de um sistema próprio?",
    answer:
      "Nem sempre. A conversa inicial também serve para descobrir se uma solução personalizada se justifica ou se uma ferramenta existente já resolve bem o problema.",
  },
  {
    question: "O sistema integra com o que já usamos?",
    answer:
      "Avaliamos as APIs e os limites técnicos das ferramentas atuais antes de definir o escopo. Quando a integração é viável, ela já entra no desenho da solução.",
  },
  {
    question: "Quanto tempo um projeto demora?",
    answer:
      "O prazo depende da complexidade, das integrações e das funcionalidades prioritárias. Depois da conversa, apresentamos uma estimativa por etapas, sem prometer datas antes de entender o projeto.",
  },
  {
    question: "Minha equipe vai conseguir usar?",
    answer:
      "O sistema nasce a partir do fluxo das pessoas que vão operá-lo. A experiência, o treinamento e a adoção fazem parte da solução.",
  },
  {
    question: "Como funcionam manutenção e suporte?",
    answer:
      "O formato de suporte e evolução é definido na proposta conforme a criticidade e o ritmo de mudança do projeto.",
  },
  {
    question: "E se o projeto crescer ou mudar?",
    answer:
      "Planejamos uma base simples e preparada para evolução. Novas fases são priorizadas conforme o uso real e os objetivos do negócio.",
  },
];

const mentorProfiles = [
  {
    title: "Você está começando",
    text: "Quer entrar na área de IA, mas ainda não sabe o que estudar, construir ou priorizar.",
  },
  {
    title: "Você já programa",
    text: "Quer migrar para projetos com inteligência artificial e aproveitar sua experiência técnica.",
  },
  {
    title: "Você já estuda IA",
    text: "Conhece ferramentas e conceitos, mas ainda não transformou isso em projetos ou oportunidades.",
  },
];

function useDocumentTitle(journey: Journey) {
  useEffect(() => {
    const title =
      journey === "company"
        ? "Projetos para empresas | Mateus Nogueira"
        : journey === "mentorship"
          ? "Mentoria individual em IA | Mateus Nogueira"
          : "Mateus Nogueira | Sistemas e mentoria em IA";
    document.title = title;
  }, [journey]);
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="Mateus Nogueira, início">
        Mateus Nogueira
      </a>
      <a
        className="instagram-link"
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Instagram de Mateus Nogueira"
      >
        <InstagramLogo aria-hidden="true" weight="regular" />
        <span>Instagram</span>
        <ArrowUpRight aria-hidden="true" />
      </a>
    </header>
  );
}

type Particle = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  twinkle: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
};

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let sparks: Spark[] = [];

    // Pointer in canvas-local coordinates.
    const pointer = { x: -9999, y: -9999, inside: false };
    const POINTER_RADIUS = 135;

    function build() {
      if (!canvas || !parent || !ctx) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 6000);
      particles = Array.from({ length: count }, () => {
        const r = rand(0.5, 1.8);
        const depth = r / 1.8;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          baseAlpha: rand(0.08, 0.34) * (depth + 0.4),
          speed: rand(3, 10) * (depth + 0.4),
          sway: rand(3, 15),
          swaySpeed: rand(0.15, 0.5),
          phase: Math.random() * Math.PI * 2,
          twinkle: rand(0.4, 1.1),
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
        };
      });
    }

    function spawnSparks(x: number, y: number, dx: number, dy: number) {
      const moved = Math.hypot(dx, dy);
      const amount = Math.min(5, Math.floor(moved / 5));
      const baseAngle = Math.atan2(dy, dx);
      for (let i = 0; i < amount; i += 1) {
        const angle = baseAngle + rand(-0.9, 0.9);
        const mag = rand(24, 92) + moved * 0.35;
        sparks.push({
          x: x + rand(-5, 5),
          y: y + rand(-5, 5),
          vx: Math.cos(angle) * mag,
          vy: Math.sin(angle) * mag,
          r: rand(0.9, 2),
          life: 0,
          maxLife: rand(0.45, 0.95),
        });
      }
      if (sparks.length > 240) sparks = sparks.slice(-240);
    }

    function onPointerMove(event: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const inside = x >= 0 && x <= width && y >= 0 && y <= height;
      pointer.x = x;
      pointer.y = y;
      pointer.inside = inside;
      if (inside && !reduceMotion) spawnSparks(x, y, dx, dy);
    }

    function onPointerLeave() {
      pointer.inside = false;
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const alpha = Math.max(0, p.baseAlpha * (0.55 + 0.45 * Math.sin(t * 0.001 * p.twinkle + p.phase)));
        const x = p.x + p.ox + Math.sin(t * 0.001 * p.swaySpeed + p.phase) * p.sway;
        const y = p.y + p.oy;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 16, 18, ${alpha.toFixed(3)})`;
        ctx.fill();
      }
      ctx.lineCap = "round";
      for (const s of sparks) {
        const fade = 1 - s.life / s.maxLife;
        const alpha = Math.max(0, 0.55 * fade);
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 0.03, s.y - s.vy * 0.03);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = `rgba(16, 16, 18, ${alpha.toFixed(3)})`;
        ctx.lineWidth = s.r;
        ctx.stroke();
      }
    }

    build();

    if (reduceMotion) {
      draw(0);
      return;
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (const p of particles) {
        p.y -= p.speed * dt;
        if (p.y < -6) {
          p.y = height + rand(0, 12);
          p.x = Math.random() * width;
        }

        // Cursor repulsion: push particles away from the pointer, then spring back.
        if (pointer.inside) {
          const dx = p.x + p.ox - pointer.x;
          const dy = p.y + p.oy - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < POINTER_RADIUS) {
            const force = (1 - dist / POINTER_RADIUS) * 720;
            p.vx += (dx / dist) * force * dt;
            p.vy += (dy / dist) * force * dt;
          }
        }
        // Spring back to origin with damping.
        p.vx += -p.ox * 24 * dt;
        p.vy += -p.oy * 24 * dt;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.ox += p.vx * dt;
        p.oy += p.vy * dt;
      }
      for (const s of sparks) {
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.94;
        s.vy *= 0.94;
      }
      sparks = sparks.filter((s) => s.life < s.maxLife);
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const observer = new ResizeObserver(() => build());
    observer.observe(parent);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="particle-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

function LogoMarquee() {
  const loop = [...clientLogos, ...clientLogos];
  return (
    <div className="logo-marquee" role="list" aria-label="Empresas atendidas">
      <div className="logo-track">
        {loop.map((logo, index) => {
          const isClone = index >= clientLogos.length;
          return (
            <div
              className="logo-item"
              key={`${logo.name}-${index}`}
              role={isClone ? undefined : "listitem"}
              aria-hidden={isClone ? true : undefined}
            >
              {logo.image ? (
                <img src={logo.image} alt={logo.name} loading="lazy" />
              ) : (
                <span className="logo-wordmark">{logo.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            animate();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function TypedText({
  text,
  id,
  speed = 55,
  startDelay = 380,
}: {
  text: string;
  id?: string;
  speed?: number;
  startDelay?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      return;
    }

    let index = 0;
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  const chars = [...text];

  return (
    <span className="typed" id={id}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true" className="typed-visual">
        {chars.slice(0, count).map((char, i) => (
          <span className="typed-char" key={`shown-${i}`}>
            {char === " " ? " " : char}
          </span>
        ))}
        <span className={`typed-caret${done ? " typed-caret-done" : ""}`} />
        {chars.slice(count).map((char, i) => (
          <span className="typed-char typed-char-hidden" key={`hidden-${i}`}>
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}

function ForkMark() {
  return (
    <div className="fork-mark" aria-hidden="true">
      <span className="fork-pulse" />
      <span className="fork-stem" />
      <span className="fork-branch fork-branch-left" />
      <span className="fork-branch fork-branch-right" />
    </div>
  );
}

function ChoiceHome({ onChoose }: { onChoose: (journey: DestinationJourney) => void }) {
  return (
    <main id="top" className="home-view view-enter" data-testid="home-view">
      <section className="decision-intro" aria-labelledby="home-title">
        <ParticleField />
        <div className="portrait-stage home-portrait">
          <img
            src="/assets/brand/mateus-nogueira.png"
            alt="Mateus Nogueira"
            className="portrait-image"
          />
        </div>
        <p className="eyebrow">Mateus Nogueira · tecnologia aplicada a projetos reais</p>
        <h1 id="home-title">
          <TypedText text="O que você quer construir?" />
        </h1>
        <p className="intro-copy">
          Escolha por onde começar. A próxima tela será feita para o seu objetivo.
        </p>
      </section>

      <section className="choice-grid" aria-label="Escolha seu caminho">
        <ChoicePanel
          variant="company"
          icon={Buildings}
          title="Construir para minha empresa"
          description="Sistemas internos, aplicativos e agentes de IA dentro da operação."
          action="Ver projetos e agendar uma conversa"
          onClick={() => onChoose("company")}
        />
        <div className="choice-fork">
          <ForkMark />
        </div>
        <ChoicePanel
          variant="mentorship"
          icon={User}
          title="Construir minha trajetória com IA"
          description="Mentoria individual para direção, projetos, portfólio e oportunidades."
          action="Conhecer a mentoria e me candidatar"
          onClick={() => onChoose("mentorship")}
        />
      </section>

      <div className="trust-strip" aria-label="Experiência e alcance">
        <div>
          <ShieldCheck aria-hidden="true" />
          <span><strong>3 anos</strong> de experiência prática</span>
        </div>
        <span className="trust-divider" aria-hidden="true" />
        <div>
          <UsersThree aria-hidden="true" />
          <span>Mais de <strong>60 empresas</strong> atendidas</span>
        </div>
      </div>

      <section className="home-preview" aria-labelledby="home-preview-title">
        <div>
          <p className="eyebrow">Tecnologia com propósito</p>
          <h2 id="home-preview-title">Como trabalho</h2>
        </div>
        <div className="home-preview-bio">
          <p>Sou Mateus Nogueira, fundador da Active IA.</p>
          <p>Há três anos, trabalho transformando problemas de operação e ideias de produtos em sistemas, aplicativos e soluções com inteligência artificial. Nesse período, já participei de projetos para mais de 60 empresas.</p>
          <p>Meu papel é entender o que o negócio realmente precisa antes de propor tecnologia, garantindo que a solução seja útil para quem vai utilizá-la todos os dias.</p>
        </div>
      </section>
    </main>
  );
}

function ChoicePanel({ variant, icon: IconComponent, title, description, action, onClick }: {
  variant: DestinationJourney;
  icon: Icon;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`choice-panel choice-panel-${variant}`}
      onClick={onClick}
      aria-label={`${title}. ${action}`}
    >
      <span className="choice-content">
        <IconComponent className="choice-icon" aria-hidden="true" weight="regular" />
        <span className="choice-title">{title}</span>
        <span className="choice-description">{description}</span>
        <span className="choice-action">
          <span>{action}</span>
          <ArrowRight aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

function JourneyHeader({ onBack, label }: { onBack: () => void; label: string }) {
  return (
    <div className="journey-topbar">
      <button type="button" className="back-link" onClick={onBack}>
        <ArrowLeft aria-hidden="true" />
        Voltar e escolher outro caminho
      </button>
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, align = "left" }: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`section-heading section-heading-${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </header>
  );
}

function CompanyJourney({ onBack }: { onBack: () => void }) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <main id="top" className="journey-view company-view view-enter" data-testid="company-view">
      <JourneyHeader onBack={onBack} label="Projetos para empresas · Active IA" />
      <section className="journey-hero company-hero" aria-labelledby="company-title">
        <div className="hero-copy">
          <p className="eyebrow">Sistemas sob medida · Aplicativos · IA incorporada</p>
          <h1 id="company-title">Seu processo não precisa caber em um software genérico.</h1>
          <p>
            Eu entendo como sua operação funciona e, junto com a Active IA, desenho e construo tecnologia ao redor do que o negócio realmente precisa.
          </p>
          <button type="button" className="primary-button" onClick={() => scrollToId("company-booking")}>
            Agendar uma conversa gratuita
            <ArrowRight aria-hidden="true" />
          </button>
          <span className="button-note"><Clock aria-hidden="true" /> 45 minutos pelo Google Meet</span>
        </div>
      </section>

      <div className="metric-ribbon">
        <div><strong><CountUp value={3} suffix=" anos" /></strong><span>construindo soluções reais</span></div>
        <div><strong><CountUp value={60} prefix="+" /></strong><span>empresas atendidas</span></div>
        <div><strong><CountUp value={5} suffix=" etapas" /></strong><span>do diagnóstico à evolução</span></div>
      </div>

      <section className="content-section problem-section">
        <SectionHeading
          eyebrow="O problema antes da tecnologia"
          title="Quando a operação cresce, o improviso começa a cobrar a conta."
          copy="Planilhas demais, informações espalhadas, retrabalho e sistemas que não conversam entre si limitam a equipe, ou uma boa ideia fica parada porque ninguém a transformou em produto."
        />
        <div className="problem-list">
          {["Processos importantes dependem de tarefas manuais", "A informação existe, mas não chega a quem precisa", "Ferramentas genéricas obrigam a equipe a contornar o sistema"].map((item) => (
            <div key={item}><Check aria-hidden="true" />{item}</div>
          ))}
        </div>
      </section>

      <section className="content-section solutions-section">
        <SectionHeading
          eyebrow="O que podemos construir"
          title="A solução certa para o processo certo."
          copy="A IA entra quando gera valor. O sistema nasce do problema, nunca de uma tecnologia escolhida antes da hora."
        />
        <div className="solution-rows">
          <SolutionRow number="01" icon={Buildings} title="Sistemas internos" text="Centralize processos, informações, indicadores e rotinas importantes em uma ferramenta construída para a sua operação." />
          <SolutionRow number="02" icon={DeviceMobile} title="Aplicativos" text="Crie produtos digitais para clientes, equipes, parceiros ou novas oportunidades de negócio." />
          <SolutionRow number="03" icon={Robot} title="Agentes de IA incorporados" text="Conecte inteligência artificial ao sistema para analisar contexto, apoiar decisões e executar etapas com supervisão." />
        </div>
      </section>

      <section className="content-section portfolio-section">
        <p className="eyebrow logos-eyebrow">Empresas que confiam no trabalho</p>
        <LogoMarquee />
        <SectionHeading
          eyebrow="O que posso construir"
          title="Sistemas e produtos sob medida para a sua operação."
          copy="Clique em cada projeto para uma breve explicação de como funciona e onde faz sentido."
        />
        <div className="project-grid">
          {projectItems.map((project) => {
            const ProjectIcon = project.icon;
            return (
              <button type="button" className="project-card" key={project.id} onClick={() => setSelectedProject(project)}>
                <span className="project-icon"><ProjectIcon aria-hidden="true" /></span>
                <span className="project-meta">{project.category}</span>
                <span className="project-title">{project.title}</span>
                <span className="project-link">Ver projeto <ArrowUpRight aria-hidden="true" /></span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="content-section process-section">
        <SectionHeading eyebrow="Como trabalho" title="Da primeira conversa à solução em produção." />
        <ol className="process-list">
          {[
            ["Entendimento", "Problema, usuários, contexto e resultado esperado."],
            ["Viabilidade", "Possibilidades técnicas e uma arquitetura inicial."],
            ["Escopo", "Prioridades, etapas, prazo estimado e proposta."],
            ["Construção", "Entregas menores e validação contínua."],
            ["Evolução", "Implantação, suporte e novas fases conforme o uso."],
          ].map(([title, text], index) => (
            <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{text}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="content-section founder-section">
        <div>
          <p className="eyebrow">Quem estará com você</p>
          <h2>Eu começo entendendo o negócio. A tecnologia vem depois.</h2>
          <p>
            Sou Mateus Nogueira, fundador da Active IA. Há três anos transformo problemas de operação e ideias de produto em sistemas, aplicativos e soluções com inteligência artificial.
          </p>
          <p>
            Meu papel é tornar decisões técnicas compreensíveis e construir algo útil para quem vai usar todos os dias.
          </p>
        </div>
      </section>

      <section className="content-section faq-section">
        <SectionHeading eyebrow="Perguntas frequentes" title="Antes de construir, é normal ter dúvidas." />
        <div className="faq-list">
          {companyFaqs.map((faq) => <FaqItem key={faq.question} {...faq} />)}
        </div>
      </section>

      <section className="booking-section" id="company-booking">
        <div className="booking-copy">
          <p className="eyebrow">Conversa inicial gratuita</p>
          <h2>Vamos entender se o seu projeto faz sentido?</h2>
          <p>Em 45 minutos, vamos entender o problema, avaliar a viabilidade, discutir uma arquitetura inicial e preparar os próximos passos para uma proposta.</p>
          <ul>
            <li><CheckCircle aria-hidden="true" /> Google Meet</li>
            <li><CheckCircle aria-hidden="true" /> Sem compromisso</li>
            <li><CheckCircle aria-hidden="true" /> Orçamento personalizado</li>
          </ul>
        </div>
        <BookingCalendar />
      </section>

      {selectedProject ? <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} /> : null}
    </main>
  );
}

function SolutionRow({ number, icon: IconComponent, title, text }: {
  number: string;
  icon: Icon;
  title: string;
  text: string;
}) {
  return (
    <article className="solution-row">
      <span>{number}</span>
      <IconComponent aria-hidden="true" />
      <div><h3>{title}</h3><p>{text}</p></div>
    </article>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <article className={`faq-item${open ? " is-open" : ""}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {question}<CaretDown aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className="faq-answer" hidden={!open}><p>{answer}</p></div>
    </article>
  );
}

function BookingCalendar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="booking-calendar">
      <div className="calendar-heading">
        <CalendarBlank aria-hidden="true" />
        <div><strong>Escolha um horário</strong><span>45 minutos · Google Meet</span></div>
      </div>
      {open ? (
        <iframe
          className="booking-frame"
          src={BOOKING_EMBED_URL}
          title="Agendar uma conversa gratuita pelo Google Calendar"
          loading="lazy"
        />
      ) : (
        <>
          <p className="booking-intro-note">
            Veja os horários disponíveis e reserve direto pelo Google Calendar. O link do Google Meet é criado automaticamente.
          </p>
          <button type="button" className="primary-button" onClick={() => setOpen(true)}>
            Ver horários disponíveis <ArrowRight aria-hidden="true" />
          </button>
        </>
      )}
      <a className="text-button" href={BOOKING_URL} target="_blank" rel="noreferrer">
        Abrir agendamento em uma nova aba <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const ProjectIcon = project.icon;
  useEffect(() => {
    closeRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) { if (event.key === "Escape") onClose(); }
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("dialog-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
        <button ref={closeRef} className="dialog-close" type="button" onClick={onClose} aria-label="Fechar detalhes do projeto"><X aria-hidden="true" /></button>
        <div className="project-dialog-copy">
          <span className="project-dialog-icon"><ProjectIcon aria-hidden="true" /></span>
          <p className="eyebrow">{project.category}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
          <p>{project.summary}</p>
          <button type="button" className="primary-button" onClick={() => { onClose(); scrollToId("company-booking"); }}>Conversar sobre um projeto <ArrowRight aria-hidden="true" /></button>
        </div>
      </section>
    </div>
  );
}

function MentorshipJourney({ onBack }: { onBack: () => void }) {
  return (
    <main id="top" className="journey-view mentorship-view view-enter" data-testid="mentorship-view">
      <JourneyHeader onBack={onBack} label="Mentoria individual em IA" />
      <section className="journey-hero mentorship-hero" aria-labelledby="mentorship-title">
        <div className="hero-copy">
          <p className="eyebrow">4 encontros individuais · 1 mês de acompanhamento</p>
          <h1 id="mentorship-title">Você não precisa aprender tudo sobre IA. Precisa descobrir seu próximo passo.</h1>
          <p>
            Eu ajudo você a transformar dúvidas, estudos e experiência profissional em direção, projeto e oportunidades reais.
          </p>
          <button type="button" className="primary-button" onClick={() => scrollToId("application")}>
            Quero me candidatar
            <ArrowRight aria-hidden="true" />
          </button>
          <span className="button-note"><UsersThree aria-hidden="true" /> 5 novas vagas por mês · retorno em até 24 horas</span>
        </div>
      </section>

      <section className="content-section profiles-section">
        <SectionHeading
          eyebrow="Para diferentes pontos de partida"
          title="A mentoria se adapta ao seu momento."
          copy="Não existe uma trilha igual para todo mundo. Existe um caminho construído a partir do que você já sabe e do que quer alcançar."
        />
        <div className="profile-grid">
          {mentorProfiles.map(({ title, text }) => (
            <article key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="content-section outcomes-section">
        <div className="outcomes-copy">
          <p className="eyebrow">O que você constrói</p>
          <h2>Menos conteúdo acumulado. Mais direção aplicada.</h2>
          <p>Os encontros, exercícios e decisões acompanham o seu objetivo, seja transição de carreira, portfólio, clientes ou produto.</p>
        </div>
        <div className="outcome-list">
          {["Direção profissional definida", "Plano prático de evolução", "Um projeto aplicado ou estruturado", "Próximos passos para portfólio, clientes ou produto"].map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="content-section mentorship-format-section">
        <SectionHeading
          eyebrow="Como funciona"
          title="Como a mentoria funciona na prática."
          copy="São 4 encontros individuais de 1 hora, um por semana, e todos ficam gravados. Cada encontro parte das suas maiores dificuldades: nada de conteúdo genérico, a gente trabalha o que realmente vai te mover."
        />
        <div className="encounter-grid">
          <article>
            <span className="phase-index">Encontro 01</span>
            <h3>Diagnóstico e base</h3>
            <p>Entendo o seu momento e as suas maiores dificuldades. Trabalhamos a base teórica do que você precisa dominar e você sai com as primeiras lições para executar na semana.</p>
          </article>
          <article>
            <span className="phase-index">Encontro 02</span>
            <h3>Direção e estratégia</h3>
            <p>Aprofundamos os conceitos e definimos a direção do seu projeto. Você recebe novas lições práticas para aplicar antes dos próximos encontros.</p>
          </article>
          <article>
            <span className="phase-index">Encontro 03</span>
            <h3>Avaliação da prática</h3>
            <p>Analisamos juntos o que você colocou em prática: call gravada, scripts de prospecção, código ou infraestrutura. A partir disso, corrigimos a rota.</p>
          </article>
          <article>
            <span className="phase-index">Encontro 04</span>
            <h3>Refino e próximos passos</h3>
            <p>Revisamos a sua evolução, refinamos os últimos pontos e deixamos um plano claro para você seguir com autonomia.</p>
          </article>
        </div>
        <ul className="format-facts">
          <li><CalendarBlank aria-hidden="true" /> 1 encontro por semana</li>
          <li><CheckCircle aria-hidden="true" /> Todos os encontros gravados</li>
          <li><DeviceMobile aria-hidden="true" /> Suporte pelo WhatsApp entre os encontros</li>
        </ul>
      </section>

      <section className="investment-section">
        <div>
          <p className="eyebrow">Investimento</p>
          <h2>Mentoria individual</h2>
          <p>Um processo próximo, adaptado e limitado a cinco novas pessoas por mês.</p>
        </div>
        <div className="price-block"><span>R$</span><strong>1.500</strong><small>à vista ou em até 3x no cartão</small></div>
        <ul>
          <li><Check aria-hidden="true" /> 4 encontros de 1 hora</li>
          <li><Check aria-hidden="true" /> Exercícios personalizados</li>
          <li><Check aria-hidden="true" /> Suporte pelo WhatsApp</li>
          <li><Check aria-hidden="true" /> Plano individual de evolução</li>
        </ul>
        <button type="button" className="primary-button" onClick={() => scrollToId("application")}>Quero me candidatar <ArrowRight aria-hidden="true" /></button>
      </section>

      <section className="application-section" id="application">
        <div className="application-copy">
          <p className="eyebrow">Aplicação</p>
          <h2>Conte um pouco sobre o seu momento.</h2>
          <p>A mentoria é individual e possui poucas vagas. Por isso, analiso cada aplicação pessoalmente para entender se o formato faz sentido para o que você busca agora.</p>
        </div>
        <MentorshipApplication />
      </section>
    </main>
  );
}

function MentorshipApplication() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("form");
  const [form, setForm] = useState({ name: "", phone: "", area: "", programming: "", ai: "", goal: "", challenge: "", availability: "", reason: "", investment: false, consent: false });

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep((current) => Math.min(3, current + 1));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      if (SHEETS_ENDPOINT) {
        await fetch(SHEETS_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
        });
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="application-form success-state" aria-live="polite">
        <CheckCircle aria-hidden="true" weight="fill" />
        <p className="eyebrow">Aplicação concluída</p>
        <h3>Obrigado por compartilhar seu momento.</h3>
        <p>Vou analisar sua aplicação pessoalmente e retornarei pelo WhatsApp em até 24 horas, independentemente da aprovação.</p>
        <button type="button" className="secondary-button" onClick={() => { setStatus("form"); setStep(1); }}>Revisar formulário</button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="application-form success-state" aria-live="polite">
        <p className="eyebrow">Algo deu errado</p>
        <h3>Não consegui enviar sua aplicação.</h3>
        <p>Verifique sua conexão e tente novamente. Se o problema continuar, me chame no Instagram que resolvo por lá.</p>
        <button type="button" className="secondary-button" onClick={() => setStatus("form")}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <form className="application-form" onSubmit={step === 3 ? submit : next}>
      <div className="form-progress" aria-label={`Etapa ${step} de 3`}><span style={{ width: `${(step / 3) * 100}%` }} /></div>
      <div className="form-step-label"><span>Etapa {step} de 3</span><strong>{step === 1 ? "Sobre você" : step === 2 ? "Seu momento" : "Disponibilidade"}</strong></div>
      {step === 1 ? (
        <div className="form-fields">
          <label>Nome<input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>WhatsApp<input required type="tel" autoComplete="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
          <label>Profissão ou área atual<input required value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })} /></label>
        </div>
      ) : null}
      {step === 2 ? (
        <div className="form-fields">
          <label>Experiência com programação<select required value={form.programming} onChange={(event) => setForm({ ...form, programming: event.target.value })}><option value="">Selecione</option><option>Estou começando</option><option>Já estudei</option><option>Trabalho na área</option></select></label>
          <label>Experiência com IA<select required value={form.ai} onChange={(event) => setForm({ ...form, ai: event.target.value })}><option value="">Selecione</option><option>Primeiros passos</option><option>Já estudo e testo ferramentas</option><option>Já construo projetos</option></select></label>
          <label>Objetivo para os próximos meses<textarea required rows={3} value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} /></label>
          <label>Principal dificuldade atual<textarea required rows={3} value={form.challenge} onChange={(event) => setForm({ ...form, challenge: event.target.value })} /></label>
        </div>
      ) : null}
      {step === 3 ? (
        <div className="form-fields">
          <label>Tempo disponível por semana<select required value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value })}><option value="">Selecione</option><option>Até 3 horas</option><option>De 4 a 6 horas</option><option>Mais de 6 horas</option></select></label>
          <label>Por que deseja fazer a mentoria agora?<textarea required rows={4} value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} /></label>
          <label className="checkbox-field"><input type="checkbox" required checked={form.investment} onChange={(event) => setForm({ ...form, investment: event.target.checked })} /><span>Estou ciente do investimento de R$ 1.500 à vista ou em até 3x.</span></label>
          <label className="checkbox-field"><input type="checkbox" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} /><span>Autorizo o uso destes dados exclusivamente para avaliar minha aplicação e entrar em contato.</span></label>
        </div>
      ) : null}
      <div className="form-actions">
        {step > 1 ? <button type="button" className="secondary-button" onClick={() => setStep((current) => current - 1)}><ArrowLeft aria-hidden="true" /> Voltar</button> : <span />}
        <button type="submit" className="primary-button" disabled={status === "sending"}>{step === 3 ? (status === "sending" ? "Enviando…" : "Enviar minha aplicação") : "Continuar"} <ArrowRight aria-hidden="true" /></button>
      </div>
      <span className="privacy-note"><Clock aria-hidden="true" /> Você receberá um retorno pelo WhatsApp em até 24 horas, independentemente da aprovação.</span>
    </form>
  );
}

function Footer({ onBack }: { onBack: () => void }) {
  return (
    <footer className="site-footer">
      <div><strong>Mateus Nogueira</strong><span>Sistemas personalizados e mentoria individual em IA.</span></div>
      <div><button type="button" onClick={onBack}>Início</button><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href="#privacidade">Privacidade</a></div>
      <p id="privacidade">© 2026 Mateus Nogueira. Projetos empresariais desenvolvidos pela Active IA.</p>
    </footer>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function App() {
  const [journey, setJourney] = useState<Journey>("home");
  const mainRef = useRef<HTMLDivElement>(null);
  useDocumentTitle(journey);

  function choose(nextJourney: DestinationJourney) {
    setJourney(nextJourney);
    window.history.pushState({ journey: nextJourney }, "", window.location.pathname);
  }

  function goHome({ replace = false }: { replace?: boolean } = {}) {
    setJourney("home");
    if (replace) window.history.replaceState({ journey: "home" }, "", window.location.pathname);
    else window.history.pushState({ journey: "home" }, "", window.location.pathname);
  }

  useEffect(() => {
    window.history.replaceState({ journey: "home" }, "", window.location.pathname);
    function handlePopState(event: PopStateEvent) {
      const nextJourney = event.state?.journey;
      setJourney(nextJourney === "company" || nextJourney === "mentorship" ? nextJourney : "home");
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }, [journey]);

  return (
    <div className="app-shell">
      <Header />
      <div ref={mainRef} tabIndex={-1} className="main-focus-target">
        {journey === "home" ? <ChoiceHome onChoose={choose} /> : null}
        {journey === "company" ? <CompanyJourney onBack={() => goHome()} /> : null}
        {journey === "mentorship" ? <MentorshipJourney onBack={() => goHome()} /> : null}
      </div>
      <Footer onBack={() => goHome()} />
    </div>
  );
}
