
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import JourneyProgress from "@/components/JourneyProgress";

import {
  ArrowLeft,
  AlertTriangle,
  ClipboardCheck,
  ClipboardList,
  ScanLine,
  HeartPulse,
  Info,
  Cpu,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Leaf,
  Clock3,
} from "lucide-react";


const SYMPTOM_LABELS = {
  fever: "Febre por duas semanas",
  coughWithBlood: "Tosse com sangue",
  bloodySputum: "Catarro com sangue",
  nightSweats: "Suores noturnos",
  chestPain: "Dor no peito",
  backPain: "Dor em determinadas regiões das costas",
  shortnessOfBreath: "Falta de ar",
  weightLoss: "Perda de peso",
  fatigue: "Sensação de cansaço",
  neckArmpitLumps: "Caroços nas axilas e no pescoço",
  persistentCough: "Tosse com catarro por 2 a 4 semanas",
  swollenLymphNodes: "Linfonodos inchados",
  lossOfAppetite: "Perda de apetite",
};


function TechnicalValue({ value, pending }) {
  if (
    pending ||
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return (
      <span className="text-sm font-semibold text-[#698478]">
        Integração pendente
      </span>
    );
  }

  return (
    <span className="text-lg font-extrabold text-[#087E66]">
      {value.toLocaleString("pt-BR", {
        maximumFractionDigits: 3,
      })}
    </span>
  );
}

export default function Results() {
  const navigate = useNavigate();

  const { currentResult, resetApp } = useApp();

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!currentResult) {
      navigate("/", { replace: true });
    }
  }, [currentResult, navigate]);

  if (!currentResult) return null;

  const screeningData = currentResult.screeningData || {};

  const selectedSymptoms = Object.entries(SYMPTOM_LABELS)
    .filter(([id]) => screeningData[id] === true)
    .map(([id, label]) => ({ id, label }));

  const imageProvided = currentResult.imageProvided === true;


  const integrationReady =
    Array.isArray(currentResult.modelOutput?.probabilities) ||
    Number.isFinite(currentResult.imageAnalysis);


  const probabilities = currentResult.modelOutput?.probabilities;
const classes = currentResult.modelOutput?.classes;

const classOneIndex = Array.isArray(classes)
  ? classes.indexOf(1)
  : -1;


  const classOneScore =
    Array.isArray(probabilities) &&
    classOneIndex >= 0 &&
    Number.isFinite(probabilities[classOneIndex])
      ? probabilities[classOneIndex]
      : null;


  const cnnScore = Number.isFinite(currentResult.imageAnalysis)
    ? currentResult.imageAnalysis
    : null;

  const formattedDate = currentResult.timestamp
    ? new Date(currentResult.timestamp).toLocaleString("pt-BR")
    : "Data não disponível";

  const handleNewAnalysis = () => {
    resetApp();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FAF5] px-4 py-8 text-[#173D32] md:py-12">
      {/* Fundo decorativo */}
      <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#C9F5D9] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-96 h-80 w-80 rounded-full bg-[#D7F2FC] opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* Cabeçalho */}
        <header className="mb-7 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold text-[#087E66] hover:text-[#065C4C]"
          >
            <ArrowLeft size={19} />
            Início
          </button>

          <div className="flex items-center gap-2 font-extrabold text-[#087E66]">
            <Leaf size={19} />
            Pulm.io
          </div>
        </header>

        <main className="overflow-hidden rounded-[30px] border border-[#DCEBE0] bg-white shadow-xl shadow-[#087E66]/10">
          {/* CABEÇALHO VERDE */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#087E66] via-[#079D7B] to-[#12B886] px-6 py-8 text-white md:px-10 md:py-10">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-white/10" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-2xl bg-white/20 p-3">
                  <ClipboardCheck size={27} />
                </div>

                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                  Etapa 5 de 5
                </span>
              </div>

              <h1 className="text-3xl font-extrabold md:text-4xl">
                Resultado da avaliação
              </h1>

              <p className="mt-3 text-white/90">
                Confira as informações da sua avaliação experimental.
              </p>
            </div>
          </section>

          {/* PROGRESSO */}
          <div className="border-b border-[#E3EEE7] bg-[#F4FCF7] px-6 pb-7 pt-2 md:px-10">
            <JourneyProgress step={5} />
          </div>

          <section className="space-y-7 px-6 py-8 md:px-10">
            {/* RESULTADO PRINCIPAL */}
            <div className="overflow-hidden rounded-2xl border-2 border-[#BFE9D0] bg-gradient-to-br from-[#F0FCF5] to-[#E9F8F8]">
              <div className="p-6 md:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D8F5E5]">
                    <ClipboardCheck
                      size={28}
                      className="text-[#087E66]"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#087E66] shadow-sm">
                      <Clock3 size={14} />
                      {integrationReady
                        ? "Análise experimental concluída"
                        : "Análise por IA indisponível"}
                    </span>

                    <h2 className="mt-4 text-2xl font-extrabold text-[#173D32]">
                      {integrationReady
                        ? "Resultado disponível"
                        : "Aguardando integração com a inteligência artificial"}
                    </h2>

                    <p className="mt-3 leading-relaxed text-[#476B5D]">
                      {integrationReady
                        ? "O modelo experimental foi executado no navegador. As saídas técnicas estão disponíveis abaixo, mas não representam probabilidades clínicas validadas."
                        : "Nesta versão do Pulm.io, ainda não é possível apresentar uma análise automatizada dos sintomas ou da radiografia. A integração com os modelos Random Forest e CNN será realizada futuramente."}
                    </p>

                    <p className="mt-4 text-xs text-[#698478]">
                      Avaliação realizada em: {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>


          {/* PONTUAÇÃO EXPERIMENTAL EM DESTAQUE */}
          {classOneScore !== null && (
            <div className="rounded-2xl border-2 border-[#BFE9D0] bg-[#F0FCF5] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <HeartPulse size={28} className="text-[#087E66]" />

                <h2 className="text-xl font-extrabold text-[#173D32]">
                  Resultado da análise de sintomas
                </h2>
              </div>

              <p className="text-sm text-[#476B5D]">
                Pontuação produzida pelo modelo experimental
              </p>

              <p className="my-4 text-5xl font-extrabold text-[#087E66]">
                {(classOneScore * 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}%
              </p>

              <div className="h-4 overflow-hidden rounded-full bg-[#D6EDE0]">
                <div
                  className="h-full rounded-full bg-[#087E66]"
                  style={{ width: `${classOneScore * 100}%` }}
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-[#38594E]">
                Pontuação experimental associada à classe 1
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#476B5D]">
                O modelo identificou padrões de sintomas associados à classe 1,
                considerada uma possível representação de tuberculose no
                conjunto de treinamento.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#476B5D]">
                Este percentual não representa a probabilidade real de você
                ter tuberculose e não confirma nem descarta a doença.
                A investigação deve ser realizada por profissionais de saúde,
                com os exames apropriados.
              </p>
            </div>
          )}


          {/* RESULTADO EXPERIMENTAL DA RADIOGRAFIA */}
          {cnnScore !== null && cnnScore >= 0 && cnnScore <= 1 && (
            <div className="rounded-2xl border-2 border-[#BEE6F5] bg-[#EFFAFF] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <ScanLine size={28} className="text-[#1689C7]" />

                <h2 className="text-xl font-extrabold text-[#173D32]">
                  Resultado da análise da radiografia
                </h2>
              </div>

              <p className="text-sm text-[#476B5D]">
                Pontuação produzida pela CNN experimental
              </p>

              <p className="my-4 text-5xl font-extrabold text-[#1689C7]">
                {(cnnScore * 100).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}%
              </p>

              <div className="h-4 overflow-hidden rounded-full bg-[#D6EBF5]">
                <div
                  className="h-full rounded-full bg-[#1689C7]"
                  style={{ width: `${cnnScore * 100}%` }}
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-[#315F75]">
                Pontuação experimental da saída da CNN
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#476B5D]">
                Este percentual representa a saída numérica do modelo
                experimental de análise de radiografias, apresentada em
                uma escala de 0 a 100%.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#476B5D]">
                Esta pontuação não representa a probabilidade clínica de
                tuberculose, não confirma nem descarta a doença e não
                substitui a avaliação de profissionais de saúde.
              </p>
            </div>
          )}



            {/* RESUMO DOS DADOS */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Sintomas */}
              <div className="rounded-2xl border-2 border-[#DDECE3] bg-white p-6">
                <div className="mb-4 inline-flex rounded-xl bg-[#DFF8EA] p-3">
                  <ClipboardList
                    size={24}
                    className="text-[#087E66]"
                  />
                </div>

                <h3 className="font-bold">
                  Sintomas informados
                </h3>

                <p className="mt-3 text-4xl font-extrabold text-[#087E66]">
                  {selectedSymptoms.length}
                  <span className="ml-2 text-base font-medium text-[#698478]">
                    de 13
                  </span>
                </p>

                <p className="mt-2 text-sm text-[#698478]">
                  Sintomas selecionados no questionário
                </p>
              </div>

              {/* Radiografia */}
              <div className="rounded-2xl border-2 border-[#D6EBF5] bg-white p-6">
                <div className="mb-4 inline-flex rounded-xl bg-[#E4F6FF] p-3">
                  <ScanLine
                    size={24}
                    className="text-[#1689C7]"
                  />
                </div>

                <h3 className="font-bold">
                  Radiografia de tórax
                </h3>

                <p className="mt-3 font-extrabold text-[#1689C7]">
                  {imageProvided
                    ? "Imagem selecionada"
                    : "Etapa não realizada"}
                </p>


                  <p className="mt-2 text-sm text-[#698478]">
                    {imageProvided
                      ? Number.isFinite(currentResult.imageAnalysis)
                        ? "Radiografia processada pela CNN experimental."
                        : "Imagem enviada, mas sem resultado disponível."
                      : "Você continuou sem enviar uma imagem."}
                  </p>

              </div>
            </div>

            {/* SINTOMAS SELECIONADOS */}
            <div className="rounded-2xl border border-[#DDECE3] p-6">
              <h3 className="mb-4 text-lg font-extrabold">
                Sintomas selecionados
              </h3>

              {selectedSymptoms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(({ id, label }) => (
                    <span
                      key={id}
                      className="rounded-full border border-[#BCE9CE] bg-[#E8FAF0] px-4 py-2 text-sm font-semibold text-[#087E66]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#698478]">
                  Nenhum sintoma foi selecionado.
                </p>
              )}
            </div>

            {/* CUIDADOS COM A SAÚDE */}
            <div className="rounded-2xl border border-[#BEE6F5] bg-[#EFFAFF] p-6">
              <div className="flex items-start gap-3">
                <HeartPulse
                  size={25}
                  className="mt-0.5 shrink-0 text-[#1689C7]"
                />

                <div className="space-y-3 text-sm leading-relaxed text-[#315F75]">
                  <h3 className="text-lg font-extrabold">
                    Cuidados com sua saúde
                  </h3>

                  <p>
                    Se você apresenta tosse persistente, febre,
                    perda de peso ou outros sintomas preocupantes,
                    procure uma unidade de saúde para avaliação.
                  </p>

                  <p>
                    A tuberculose precisa ser investigada por
                    profissionais de saúde com exames apropriados.
                    A ausência de sintomas selecionados não
                    descarta a doença.
                  </p>

                  <p>
                    Em caso de falta de ar intensa ou sangramento
                    significativo ao tossir, procure atendimento
                    de urgência.
                  </p>
                </div>
              </div>
            </div>

            {/* AVISO DE PROTÓTIPO — DEPOIS DOS CUIDADOS */}
            <div
              role="alert"
              className="rounded-2xl border-2 border-[#E7B85B] bg-[#FFF8E7] p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-[#FDE8B1] p-3">
                  <AlertTriangle
                    size={27}
                    className="text-[#A66C08]"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-[#80520A] md:text-xl">
                    Atenção: o Pulm.io é um protótipo acadêmico
                  </h2>

                  <p className="mt-3 leading-relaxed text-[#765719]">
                    Esta plataforma está em desenvolvimento e possui
                    finalidade exclusivamente acadêmica e experimental.
                    As informações exibidas nesta página não constituem
                    diagnóstico de tuberculose e não substituem consultas,
                    exames ou avaliações realizadas por profissionais
                    de saúde.
                  </p>

                </div>
              </div>
            </div>

            {/* DETALHES TÉCNICOS */}
            <div className="overflow-hidden rounded-2xl border-2 border-[#DDECE3]">
              <button
                type="button"
                onClick={() =>
                  setShowDetails((value) => !value)
                }
                aria-expanded={showDetails}
                className="flex w-full items-center justify-between gap-3 p-5 text-left transition hover:bg-[#F4FCF7]"
              >
                <span className="flex items-center gap-3 font-bold">
                  <Cpu
                    size={23}
                    className="text-[#087E66]"
                  />
                  Ver detalhes técnicos
                </span>

                {showDetails ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {showDetails && (
                <div className="space-y-4 border-t border-[#DDECE3] p-5">
                  <div className="flex items-start gap-2 text-sm text-[#698478]">
                    <Info
                      size={18}
                      className="shrink-0"
                    />

                    <p>
                      Informações para a equipe de pesquisa e
                      desenvolvimento. As saídas dos modelos
                      precisam ser definidas e validadas antes
                      de qualquer interpretação clínica.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Random Forest */}
                    <div className="rounded-xl bg-[#E9FAF0] p-5">
                      <h4 className="font-extrabold text-[#087E66]">
                        Random Forest
                      </h4>

                      <p className="mb-4 mt-2 text-sm text-[#38594E]">
                        Modelo de análise dos 13 sintomas.
                      </p>


                    <div className="mt-3 space-y-2">
                      {currentResult.type === "symptoms" &&
                      Array.isArray(currentResult.modelOutput?.probabilities) ? (
                        currentResult.modelOutput.probabilities.map((valor, indice) => (
                          <div
                            key={indice}
                            className="flex items-center justify-between gap-3"
                          >
                            <span className="text-sm font-semibold text-[#38594E]">
                              Classe {currentResult.modelOutput.classes[indice]}
                            </span>

                            <span className="font-extrabold text-[#087E66]">
                              {(valor * 100).toFixed(2)}%
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-[#698478]">
                          Saídas do modelo indisponíveis
                        </span>
                      )}
                    </div>

                    </div>

                    {/* CNN */}
                    <div className="rounded-xl bg-[#EFFAFF] p-5">
                      <h4 className="font-extrabold text-[#1689C7]">
                        CNN
                      </h4>

                      <p className="mb-4 mt-2 text-sm text-[#315F75]">
                        Modelo de análise de radiografias.
                      </p>



                  {imageProvided ? (
                    cnnScore !== null ? (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-[#315F75]">
                            Saída bruta da CNN
                          </span>

                          <span className="font-extrabold text-[#1689C7]">
                            {cnnScore.toLocaleString("pt-BR", {
                              maximumFractionDigits: 6,
                            })}
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed text-[#698478]">
                          Valor numérico produzido pela camada de saída do modelo.
                          O significado clínico dessa pontuação ainda não foi validado.
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-[#698478]">
                        Saída do modelo indisponível
                      </span>
                    )
                  ) : (
                    <span className="text-sm font-semibold text-[#698478]">
                      Imagem não enviada
                    </span>
                  )}


                    </div>
                  </div>


                <p className="text-xs leading-relaxed text-[#698478]">
                  Os valores apresentados são saídas técnicas dos modelos
                  experimentais Random Forest e CNN, executados diretamente
                  no navegador. Essas pontuações não representam
                  probabilidades clínicas validadas e não devem ser
                  utilizadas para confirmar ou descartar tuberculose.
                </p>

                </div>
              )}
            </div>
          </section>

          {/* BOTÕES FINAIS */}
          <footer className="flex flex-col gap-3 border-t border-[#E3EEE7] bg-[#FAFCFA] px-6 py-5 sm:flex-row sm:justify-between md:px-10">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#D4E7DC] px-5 py-3 font-bold text-[#38594E] hover:bg-[#EAF5EE]"
            >
              <ArrowLeft size={18} />
              Página inicial
            </button>

            <button
              type="button"
              onClick={handleNewAnalysis}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#087E66] px-6 py-3 font-bold text-white shadow-lg shadow-[#087E66]/20 hover:bg-[#065C4C]"
            >
              <RotateCcw size={18} />
              Nova avaliação
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
