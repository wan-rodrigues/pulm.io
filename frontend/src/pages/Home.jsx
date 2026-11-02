
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  ScanLine,
  FileHeart,
  ShieldCheck,
  Info,
  CheckCircle2,
  Stethoscope,
  Leaf,
  MapPin,
  Sparkles,
} from "lucide-react";

/* =========================================
   FOLHAGENS AMAZÔNICAS
========================================= */

function AmazonFoliage({ className = "", flip = false }) {
  const gradientId = flip
    ? "amazon-leaf-left"
    : "amazon-leaf-right";

  return (
    <svg
      viewBox="0 0 500 700"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#A8E5B6" />
          <stop offset="100%" stopColor="#168D70" />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke="#479B7B"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.6"
      >
        <path d="M500 80 C390 110 350 180 290 280" />
        <path d="M500 300 C400 300 340 380 260 470" />
        <path d="M500 540 C410 520 350 570 280 650" />
      </g>

      <g fill={`url(#${gradientId})`}>
        <path d="M320 290 C190 250 145 145 175 65 C295 90 350 175 320 290Z" />
        <path d="M305 300 C205 330 105 275 65 195 C175 145 275 205 305 300Z" />
        <path d="M290 470 C180 420 120 340 135 260 C260 285 315 375 290 470Z" />
        <path d="M270 480 C175 525 80 490 25 415 C135 345 240 390 270 480Z" />
        <path d="M300 650 C195 625 135 540 150 470 C265 490 325 565 300 650Z" />
      </g>

      <g fill="#B5E9BC">
        <path d="M410 175 C335 135 310 65 335 10 C420 40 455 110 410 175Z" />
        <path d="M390 360 C305 325 280 250 305 200 C395 230 425 305 390 360Z" />
        <path d="M395 565 C315 535 290 465 315 410 C400 440 430 510 395 565Z" />
      </g>

      <g
        fill="none"
        stroke="#E4F8E6"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      >
        <path d="M320 290 L190 100" />
        <path d="M305 300 L100 205" />
        <path d="M290 470 L155 290" />
        <path d="M270 480 L55 420" />
        <path d="M300 650 L165 500" />
        <path d="M410 175 L345 30" />
        <path d="M390 360 L315 220" />
        <path d="M395 565 L325 430" />
      </g>
    </svg>
  );
}

/* =========================================
   HOME
========================================= */

export default function Home() {
  const navigate = useNavigate();

  const logo = `${import.meta.env.BASE_URL}pulmioo.png`;

  const etapas = [
    {
      numero: "01",
      titulo: "Identifique seus sintomas",
      descricao:
        "Selecione os sintomas que você apresenta de forma simples e rápida.",
      icon: ClipboardList,
      cor: "#087E66",
      fundo: "#E1F8EB",
    },
    {
      numero: "02",
      titulo: "Análise de raio-X",
      descricao:
        "Adicione uma radiografia de tórax para futura análise experimental por inteligência artificial.",
      icon: ScanLine,
      cor: "#1689C7",
      fundo: "#E4F5FF",
    },
    {
      numero: "03",
      titulo: "Entenda sua avaliação",
      descricao:
        "Confira as informações registradas e conheça orientações gerais de saúde.",
      icon: FileHeart,
      cor: "#C88715",
      fundo: "#FFF4D8",
    },
  ];

  const sintomas = [
    "Tosse persistente",
    "Febre",
    "Suor noturno",
    "Perda de peso sem explicação",
  ];

  const irPara = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7FAF5] text-[#173D32]">
      {/* ======================================
          CABEÇALHO
      ====================================== */}

      <header className="sticky top-0 z-40 border-b border-[#DCEBE0] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2.5 sm:gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#D8EBDF] bg-white shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl">
              <img
                src={logo}
                alt="Logo Pulm.io"
                className="h-full w-full object-contain"
              />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-[#173D32] sm:text-2xl">
              Pulm
              <span className="text-[#087E66]">
                .io
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => irPara("sobre")}
            className="text-xs font-bold text-[#087E66] transition hover:text-[#065C4C] sm:text-sm"
          >
            Sobre o projeto
          </button>
        </div>
      </header>

      {/* ======================================
          PRIMEIRA SEÇÃO — HERO
      ====================================== */}

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#F3FCF5] via-[#F7FCF8] to-[#E8F7FF]">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#B5EDD0]/35 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#A9E4F7]/35 blur-3xl" />

        {/* Folhagem superior direita */}
        <AmazonFoliage
          className="pointer-events-none absolute -right-20 -top-24 hidden h-[420px] w-[300px] opacity-55 lg:block xl:-right-12"
        />

        {/* Folhagem inferior esquerda */}
        <AmazonFoliage
          flip
          className="pointer-events-none absolute -bottom-44 -left-36 hidden h-[340px] w-[260px] opacity-30 lg:block"
        />

        {/* Decoração mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 top-12 rotate-[-20deg] text-[#12B886]/15 lg:hidden"
        >
          <Leaf size={105} strokeWidth={1} />
        </div>

        <div className="relative mx-auto flex max-w-6xl items-center px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:min-h-[500px] lg:py-16">
          <div className="relative z-10 w-full max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B8E7CC] bg-white/90 px-4 py-2 text-xs font-bold text-[#087E66] shadow-sm sm:text-sm">
              <Leaf size={17} />
              Saúde na Amazônia
            </div>

            <h1 className="text-[clamp(2.15rem,7vw,4rem)] font-extrabold leading-[1.12] tracking-tight text-[#173D32]">
              Um novo olhar para a{" "}
              <span className="text-[#087E66]">
                saúde pulmonar.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-[#476B5D] sm:text-lg">
              Conheça o Pulm.io, uma plataforma acadêmica
              experimental que busca explorar o uso da
              inteligência artificial no estudo de sintomas
              e radiografias relacionados à tuberculose.
            </p>

            <p className="max-w-xl text-sm leading-relaxed text-[#607D71] sm:text-base">
              Uma iniciativa que une tecnologia, pesquisa
              e atenção aos desafios da saúde na Amazônia.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/screening")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087E66] px-7 py-4 font-bold text-white shadow-lg shadow-[#087E66]/20 transition hover:-translate-y-0.5 hover:bg-[#065C4C]"
              >
                Começar avaliação
                <ArrowRight size={20} />
              </button>

              <button
                type="button"
                onClick={() => irPara("como-funciona")}
                className="rounded-xl border-2 border-[#B5DCCA] bg-white px-7 py-4 font-bold text-[#087E66] transition hover:bg-[#E7F8EE]"
              >
                Como funciona?
              </button>
            </div>

            <div className="flex items-start gap-2 text-xs leading-relaxed text-[#607D71] sm:text-sm">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#087E66]"
              />

              <span>
                Protótipo acadêmico. Não realiza diagnóstico
                médico nem substitui avaliação profissional.
              </span>
            </div>
          </div>
        </div>

        {/* Ondas inferiores */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 h-12 w-full sm:h-16"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 C180,100 320,25 500,70 C700,120 850,25 1040,65 C1210,105 1330,30 1440,55 L1440,110 L0,110 Z"
            fill="#C6F1DB"
            fillOpacity="0.7"
          />

          <path
            d="M0,75 C200,25 350,110 560,70 C800,20 950,110 1150,65 C1300,35 1380,70 1440,80 L1440,110 L0,110 Z"
            fill="#A7E7E2"
            fillOpacity="0.4"
          />
        </svg>
      </section>

      {/* ======================================
          COMO FUNCIONA
      ====================================== */}

      <section
        id="como-funciona"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 md:py-20"
      >
        <div className="mb-10 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#087E66] sm:text-sm">
            Simples e intuitivo
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#173D32] md:text-4xl">
            Como funciona o Pulm.io?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#607D71]">
            Uma experiência guiada, com informações organizadas
            para facilitar cada etapa.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {etapas.map((etapa) => {
            const Icone = etapa.icon;

            return (
              <div
                key={etapa.numero}
                className="rounded-3xl border border-[#DDECE3] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: etapa.fundo }}
                  >
                    <Icone
                      size={28}
                      style={{ color: etapa.cor }}
                    />
                  </div>

                  <span
                    className="text-lg font-extrabold"
                    style={{ color: etapa.cor }}
                  >
                    {etapa.numero}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-extrabold">
                  {etapa.titulo}
                </h3>

                <p className="leading-relaxed text-[#607D71]">
                  {etapa.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================
          NOSSO PROPÓSITO — CENTRALIZADO
      ====================================== */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#087E66] to-[#079B7B] py-14 text-white md:py-16">
        {/* Elementos decorativos */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border-[45px] border-white/5" />

        <div className="pointer-events-none absolute -bottom-28 -left-20 h-60 w-60 rounded-full border-[35px] border-white/5" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#F5D78C]">
            <MapPin size={17} />
            Nosso propósito
          </div>

          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight md:text-4xl">
            Tecnologia pensada para a{" "}
            <span className="text-[#B7F2D2]">
              realidade amazônica
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            A Amazônia apresenta desafios particulares de
            acesso aos serviços de saúde, especialmente em
            localidades distantes dos centros urbanos.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            O Pulm.io nasce como uma proposta acadêmica para
            investigar como a inteligência artificial pode
            contribuir para soluções de saúde digital nesse
            contexto.
          </p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold">
            <Sparkles
              size={18}
              className="text-[#F5D78C]"
            />
            Pesquisa, tecnologia e impacto social
          </div>
        </div>
      </section>

      {/* ======================================
          INFORMAÇÕES SOBRE TUBERCULOSE
      ====================================== */}

      <section
        id="sobre"
        className="scroll-mt-24 bg-[#EAF9F0] py-16 md:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 md:grid-cols-2">
          <div className="space-y-5">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#087E66]">
              Informação e prevenção
            </span>

            <h2 className="text-3xl font-extrabold text-[#173D32] md:text-4xl">
              Entenda a tuberculose
            </h2>

            <p className="leading-relaxed text-[#476B5D]">
              A tuberculose é uma doença infecciosa causada
              pela bactéria Mycobacterium tuberculosis.
              Ela afeta principalmente os pulmões e tem
              tratamento gratuito disponível pelo SUS.
            </p>

            <p className="leading-relaxed text-[#476B5D]">
              Conhecer os sintomas e procurar atendimento
              profissional são passos importantes para
              a investigação da doença.
            </p>

            <div className="flex items-center gap-3 rounded-2xl border border-[#C5E9D3] bg-white p-4">
              <CheckCircle2
                size={24}
                className="shrink-0 text-[#087E66]"
              />

              <span className="font-semibold text-[#38594E]">
                A tuberculose tem cura quando tratada adequadamente.
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-[#DCEBE0] bg-white p-6 shadow-lg shadow-[#087E66]/5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#E1F8EB] p-3">
                <Stethoscope
                  size={25}
                  className="text-[#087E66]"
                />
              </div>

              <h3 className="text-xl font-extrabold">
                Sintomas mais comuns
              </h3>
            </div>

            <div className="space-y-3">
              {sintomas.map((sintoma) => (
                <div
                  key={sintoma}
                  className="flex items-center gap-3 rounded-xl bg-[#F0FAF3] p-4"
                >
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-[#12B886]"
                  />

                  <span className="font-semibold text-[#38594E]">
                    {sintoma}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          CHAMADA FINAL
      ====================================== */}

      <section className="relative overflow-hidden px-5 py-16 sm:px-6 md:py-20">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#C8F3D8]/35 blur-3xl" />

        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#BDE8F6]/35 blur-3xl" />

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[30px] bg-gradient-to-br from-[#087E66] via-[#0A9C7D] to-[#12B886] px-6 py-10 text-center text-white shadow-xl shadow-[#087E66]/15 sm:px-10 md:py-12">
          {/* Folhagens decorativas */}
          <AmazonFoliage
            className="pointer-events-none absolute -right-28 -top-28 hidden h-[360px] w-[260px] opacity-20 md:block"
          />

          <AmazonFoliage
            flip
            className="pointer-events-none absolute -bottom-44 -left-32 hidden h-[330px] w-[240px] opacity-15 md:block"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
              <Info size={27} />
            </div>

            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
              Pronto para conhecer o Pulm.io?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
              Explore a avaliação experimental e conheça
              as informações educativas disponibilizadas
              pela plataforma.
            </p>

            <button
              type="button"
              onClick={() => navigate("/screening")}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-extrabold text-[#087E66] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#E5F9ED] sm:w-auto"
            >
              Iniciar avaliação
              <ArrowRight size={20} />
            </button>

            {/* Aviso acadêmico */}
            <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-white/25 bg-[#065F50]/50 px-5 py-4">
              <div className="flex items-start justify-center gap-2 text-left text-xs leading-relaxed text-white/90 sm:text-center sm:text-sm">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <p>
                  O Pulm.io é um protótipo acadêmico experimental.
                  Não substitui consultas, exames ou avaliações
                  realizadas por profissionais de saúde.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          RODAPÉ
      ====================================== */}

      <footer className="border-t border-[#DCEBE0] bg-white px-5 py-7 text-center text-xs text-[#607D71] sm:text-sm">
        Pulm.io © 2026 • Projeto acadêmico experimental
      </footer>
    </div>
  );
}
