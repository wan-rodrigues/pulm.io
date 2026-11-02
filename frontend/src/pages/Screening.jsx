
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import JourneyProgress from "@/components/JourneyProgress";
import { preverSintomas } from "@/lib/randomForest";

import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Check,
  Info,
  Leaf,
} from "lucide-react";


const INITIAL_DATA = {
  fever: false,
  coughWithBlood: false,
  bloodySputum: false,
  nightSweats: false,
  chestPain: false,
  backPain: false,
  shortnessOfBreath: false,
  weightLoss: false,
  fatigue: false,
  neckArmpitLumps: false,
  persistentCough: false,
  swollenLymphNodes: false,
  lossOfAppetite: false,
};


const SYMPTOMS = [
  {
    id: "fever",
    label: "Febre por duas semanas",
    description: "Presença de febre durante aproximadamente duas semanas",
  },
  {
    id: "persistentCough",
    label: "Tosse com catarro por 2 a 4 semanas",
    description: "Tosse contínua acompanhada de catarro durante esse período",
  },
  {
    id: "coughWithBlood",
    label: "Tosse com sangue",
    description: "Presença de sangue ao tossir",
  },
  {
    id: "bloodySputum",
    label: "Catarro com sangue",
    description: "Presença de sangue no escarro",
  },
  {
    id: "nightSweats",
    label: "Suores noturnos",
    description: "Suor excessivo durante a noite",
  },
  {
    id: "chestPain",
    label: "Dor no peito",
    description: "Desconforto ou dor na região do tórax",
  },
  {
    id: "backPain",
    label: "Dor em determinadas regiões das costas",
    description: "Dor localizada em partes específicas das costas",
  },
  {
    id: "shortnessOfBreath",
    label: "Falta de ar",
    description: "Dificuldade para respirar",
  },
  {
    id: "weightLoss",
    label: "Perda de peso",
    description: "Perda de peso sem explicação aparente",
  },
  {
    id: "fatigue",
    label: "Sensação de cansaço",
    description: "Cansaço frequente ou persistente",
  },
  {
    id: "neckArmpitLumps",
    label: "Caroços nas axilas e no pescoço",
    description: "Presença de caroços perceptíveis nessas regiões",
  },
  {
    id: "swollenLymphNodes",
    label: "Linfonodos inchados",
    description: "Inchaço dos gânglios linfáticos",
  },
  {
    id: "lossOfAppetite",
    label: "Perda de apetite",
    description: "Diminuição da vontade de comer",
  },
];



const STEPS = [
  {
    title: "Sintomas gerais",
    subtitle: "Selecione os sintomas gerais que você apresenta.",
    ids: ["fever", "nightSweats", "weightLoss", "fatigue"],
  },
  {
    title: "Sintomas respiratórios",
    subtitle: "Selecione os sintomas relacionados à sua respiração.",
    ids: [
      "persistentCough",
      "coughWithBlood",
      "bloodySputum",
      "shortnessOfBreath",
    ],
  },
  {
    title: "Outros sintomas",
    subtitle: "Selecione outros sintomas que você apresenta.",
    ids: [
      "chestPain",
      "backPain",
      "neckArmpitLumps",
      "swollenLymphNodes",
      "lossOfAppetite",
    ],
  },
];




function prepararEntradas(formData) {
  return [
    formData.fever ? 1 : 0,
    formData.coughWithBlood ? 1 : 0,
    formData.bloodySputum ? 1 : 0,
    formData.nightSweats ? 1 : 0,
    formData.chestPain ? 1 : 0,
    formData.backPain ? 1 : 0,
    formData.shortnessOfBreath ? 1 : 0,
    formData.weightLoss ? 1 : 0,
    formData.fatigue ? 1 : 0,
    formData.neckArmpitLumps ? 1 : 0,
    formData.persistentCough ? 1 : 0,
    formData.swollenLymphNodes ? 1 : 0,
    formData.lossOfAppetite ? 1 : 0,
  ];
}



export default function Screening() {
  const navigate = useNavigate();

  const {
  screeningData,
  setScreeningData,
  setCurrentResult,
} = useApp();

  const [analyzing, setAnalyzing] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState(() => ({
    ...INITIAL_DATA,
    ...(screeningData || {}),
  }));

  // Volta ao topo sempre que a etapa mudar.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [currentStep]);

  const step = STEPS[currentStep];

  const visibleSymptoms = step.ids.map((id) =>
    SYMPTOMS.find((symptom) => symptom.id === id)
  );

  const selectedCount = Object.keys(INITIAL_DATA).filter(
    (id) => formData[id]
  ).length;

  const toggleSymptom = (id) => {
    setFormData((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  

const handleNext = async () => {
  if (analyzing) return;

  setScreeningData(formData);

  if (currentStep < STEPS.length - 1) {
    setCurrentStep((previous) => previous + 1);
    return;
  }

  setAnalyzing(true);

  try {
    const entradas = prepararEntradas(formData);
    const resultado = await preverSintomas(entradas);
    console.log("Sintomas enviados:", entradas);
console.log("Classes do modelo:", resultado.classes);
console.log("Probabilidades:", resultado.probabilidades);

    setCurrentResult({
      type: "symptoms",
      status: "completed",
      screeningData: { ...formData },
      imageProvided: false,
      timestamp: new Date().toISOString(),

      // Saídas técnicas do modelo, sem interpretação clínica.
      modelOutput: {
        classes: resultado.classes,
        probabilities: resultado.probabilidades,
      },
    });

    navigate("/result");
  } catch (error) {
    console.error("Erro na análise de sintomas:", error);
    alert("Não foi possível executar a análise. Tente novamente.");
  } finally {
    setAnalyzing(false);
  }
};


  const handleBack = () => {
    setScreeningData(formData);

    if (currentStep === 0) {
      navigate("/");
    } else {
      setCurrentStep((previous) => previous - 1);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FAF5] px-4 py-8 text-[#173D32] md:py-12">
      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[#C9F5D9] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-96 h-80 w-80 rounded-full bg-[#D7F2FC] opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Cabeçalho */}
        <header className="mb-7 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 font-semibold text-[#087E66] transition hover:text-[#065C4C]"
          >
            <ArrowLeft size={19} />
            Voltar
          </button>

          <div className="flex items-center gap-2 font-extrabold text-[#087E66]">
            <Leaf size={19} />
            Pulm.io
          </div>
        </header>

        <main className="overflow-hidden rounded-[30px] border border-[#DCEBE0] bg-white shadow-xl shadow-[#087E66]/10">
          {/* Cabeçalho da etapa */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#087E66] via-[#079D7B] to-[#12B886] px-6 py-8 text-white md:px-10 md:py-10">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 right-24 h-44 w-44 rounded-full bg-[#F5B942]/15 blur-xl" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/20 p-3">
                  <ClipboardList size={27} />
                </div>

                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                  Etapa {currentStep + 1} de 5
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                {step.title}
              </h1>

              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/90">
                {step.subtitle}
              </p>
            </div>
          </section>

          {/* Barra de progresso */}
          <div className="border-b border-[#E3EEE7] bg-[#F4FCF7] px-6 pb-7 pt-2 md:px-10">
            <JourneyProgress step={currentStep + 1} />
          </div>

          {/* Lista de sintomas */}
          <section className="px-6 py-8 md:px-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">
                  Selecione seus sintomas
                </h2>

                <p className="mt-1 text-sm text-[#607D71]">
                  Marque as opções que correspondem ao que você está sentindo.
                  Se nenhuma se aplicar, pode continuar sem selecionar.
                </p>
              </div>

              <span className="rounded-full bg-[#E1F7EB] px-4 py-2 text-xs font-bold text-[#087E66]">
                {selectedCount} selecionado(s)
              </span>
            </div>

            <div className="space-y-3">
              {visibleSymptoms.map((symptom) => {
                const selected = Boolean(formData[symptom.id]);

                return (
                  <label
                    key={symptom.id}
                    className={`group flex cursor-pointer items-start gap-4 rounded-2xl border-2 p-5 transition-all focus-within:ring-4 focus-within:ring-[#12B886]/20 ${
                      selected
                        ? "border-[#12B886] bg-[#E8FAF0] shadow-sm"
                        : "border-[#E2EBE5] bg-white hover:border-[#12B886] hover:bg-[#F8FEFA]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleSymptom(symptom.id)}
                      className="peer sr-only"
                    />

                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                        selected
                          ? "border-[#087E66] bg-[#087E66] text-white"
                          : "border-[#A5C6B5] bg-white"
                      }`}
                    >
                      {selected && <Check size={18} />}
                    </span>

                    <span className="flex-1">
                      <span className="block text-base font-bold text-[#173D32]">
                        {symptom.label}
                      </span>

                      <span className="mt-1 block text-sm leading-relaxed text-[#607D71]">
                        {symptom.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Aviso */}
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#BEE6F5] bg-[#EFFAFF] p-5">
              <Info
                className="mt-0.5 shrink-0 text-[#1689C7]"
                size={21}
              />

              <p className="text-sm leading-relaxed text-[#315F75]">
                <strong>Importante:</strong> este questionário faz parte
                de um protótipo acadêmico e não substitui
                avaliação médica..
              </p>
            </div>
          </section>

          {/* Navegação */}
          <footer className="flex items-center justify-between gap-3 border-t border-[#E3EEE7] bg-[#FAFCFA] px-6 py-5 md:px-10">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 rounded-xl border-2 border-[#D4E7DC] px-5 py-3 font-bold text-[#38594E] transition hover:bg-[#EAF5EE]"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>

            
            <button
              type="button"
              onClick={handleNext}
              disabled={analyzing}
              className="flex items-center gap-2 rounded-xl bg-[#087E66] px-6 py-3 font-bold text-white shadow-lg shadow-[#087E66]/20 transition hover:bg-[#065C4C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {analyzing
                ? "Processando..."
                : currentStep === 2
                  ? "Analisar sintomas"
                  : "Continuar"}
              <ArrowRight size={18} />
            </button>

          </footer>
        </main>

        <p className="mt-6 text-center text-xs text-[#698478]">
          Pulm.io • Tecnologia e pesquisa para a saúde amazônica
        </p>
      </div>
    </div>
  );
}
