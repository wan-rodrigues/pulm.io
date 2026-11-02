
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import JourneyProgress from "@/components/JourneyProgress";
import {
  ArrowLeft,
  ArrowRight,
  CloudUpload,
  ScanLine,
  CheckCircle2,
  FileImage,
  Info,
  Leaf,
  Loader2,
  X,
} from "lucide-react";

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export default function UploadPage() {
  const navigate = useNavigate();

  const {
    screeningData,
    setUploadedImage,
    setCurrentResult,
    addToHistory,
  } = useApp();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (!screeningData) {
      navigate("/screening", { replace: true });
    }
  }, [screeningData, navigate]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (!screeningData) return null;

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setError("");

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setError("Selecione uma imagem JPG, JPEG ou PNG.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("O arquivo deve ter no máximo 10 MB.");
      return;
    }

    const url = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(url);

    // Preserva o File original para integração com a CNN.
    setUploadedImage(selectedFile);
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setUploadedImage(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    if (isAnalyzing) return;

    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleContinue = (skipImage = false) => {
    if (isAnalyzing) return;

    if (!skipImage && !file) {
      setError("Selecione uma imagem ou pule esta etapa.");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const selectedImage = skipImage ? null : file;

      if (skipImage) {
        setUploadedImage(null);
      }

      // Integração futura:
      // Random Forest recebe screeningData.
      // CNN recebe selectedImage, quando disponível.
      // Nenhum modelo é executado nesta versão.

      const result = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        screeningData: { ...screeningData },
        imageProvided: Boolean(selectedImage),
        imageName: selectedImage?.name ?? null,
        screeningScore: null,
        imageAnalysis: null,
        finalScore: null,
        status: "pending_integration",
      };

      setCurrentResult(result);
      addToHistory(result);

      navigate("/result");
    } catch (err) {
      setError(err.message || "Não foi possível continuar.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FAF5] px-4 py-8 text-[#173D32] md:py-12">
      <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full bg-[#C9F5D9] opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-96 h-80 w-80 rounded-full bg-[#D7F2FC] opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <header className="mb-7 flex items-center justify-between">
          <button
            onClick={() => navigate("/screening")}
            disabled={isAnalyzing}
            className="flex items-center gap-2 font-semibold text-[#087E66] hover:text-[#065C4C]"
          >
            <ArrowLeft size={19} />
            Voltar aos sintomas
          </button>

          <div className="flex items-center gap-2 font-extrabold text-[#087E66]">
            <Leaf size={19} />
            Pulm.io
          </div>
        </header>

        <main className="overflow-hidden rounded-[30px] border border-[#DCEBE0] bg-white shadow-xl shadow-[#087E66]/10">
          {/* Cabeçalho */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#087E66] via-[#079D7B] to-[#12B886] px-6 py-8 text-white md:px-10 md:py-10">
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border-[30px] border-white/10" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="rounded-2xl bg-white/20 p-3">
                  <ScanLine size={27} />
                </div>

                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
                  Etapa 4 de 5
                </span>
              </div>

              <h1 className="text-3xl font-extrabold md:text-4xl">
                Análise de raio-X
              </h1>

              <p className="mt-3 max-w-xl leading-relaxed text-white/90">
                Selecione uma radiografia de tórax.
                Esta etapa é opcional e a análise por IA ainda
                será integrada.
              </p>
            </div>
          </section>

          <div className="border-b border-[#E3EEE7] bg-[#F4FCF7] px-6 pb-7 pt-2 md:px-10">
            <JourneyProgress step={4} />
          </div>

          {/* Upload */}
          <section className="space-y-6 px-6 py-8 md:px-10">
            <div
              onDragEnter={(event) => {
                event.preventDefault();
                if (!isAnalyzing) setDragActive(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDrop}
              className={`rounded-3xl border-2 border-dashed p-6 text-center transition-all md:p-10 ${
                dragActive
                  ? "border-[#087E66] bg-[#DFF8EA]"
                  : "border-[#64C7AF] bg-gradient-to-br from-[#F1FFF7] to-[#EFFAFF]"
              }`}
            >
              {preview ? (
                <div className="space-y-5">
                  <div className="flex items-center justify-center gap-2 font-bold text-[#087E66]">
                    <CheckCircle2 size={21} />
                    Imagem selecionada
                  </div>

                  <img
                    src={preview}
                    alt="Pré-visualização da radiografia"
                    className="mx-auto max-h-80 max-w-full rounded-2xl object-contain shadow-lg"
                  />

                  <div className="flex items-center justify-center gap-2 text-sm text-[#38594E]">
                    <FileImage size={18} />
                    <span className="break-all">{file?.name}</span>
                  </div>

                  <button
                    onClick={removeImage}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-[#CBE7D8] bg-white px-5 py-3 font-bold text-[#087E66] hover:bg-[#E7F7ED]"
                  >
                    <X size={18} />
                    Remover imagem
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D8F7E7]">
                    <CloudUpload size={42} className="text-[#087E66]" />
                  </div>

                  <div>
                    <h2 className="text-xl font-extrabold">
                      Arraste sua imagem aqui
                    </h2>
                    <p className="mt-2 text-sm text-[#607D71]">
                      Ou escolha um arquivo do seu dispositivo
                    </p>
                  </div>

                  <button
                    onClick={() => inputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="rounded-xl bg-[#087E66] px-7 py-3 font-bold text-white shadow-lg shadow-[#087E66]/20 transition hover:bg-[#065C4C]"
                  >
                    Selecionar arquivo
                  </button>

                  <p className="text-xs text-[#698478]">
                    JPG, JPEG ou PNG • Até 10 MB
                  </p>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                disabled={isAnalyzing}
                onChange={(event) =>
                  handleFile(event.target.files?.[0])
                }
                className="hidden"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-[#F4C1B8] bg-[#FFF1EE] p-4 text-sm font-medium text-[#9A4034]"
              >
                {error}
              </div>
            )}

            <div className="flex items-start gap-3 rounded-2xl border border-[#BEE6F5] bg-[#EFFAFF] p-5">
              <Info size={22} className="mt-0.5 shrink-0 text-[#1689C7]" />

              <div className="space-y-2 text-sm leading-relaxed text-[#315F75]">
                <p className="font-bold">Antes de continuar</p>
                <p>
                  Utilize apenas imagens de demonstração
                  autorizadas, sem informações pessoais.
                </p>
                <p>
                  O Pulm.io é um protótipo acadêmico e
                  não realiza diagnóstico médico.
                </p>
              </div>
            </div>

            {isAnalyzing && (
              <div role="status" className="flex items-center gap-3 text-[#087E66]">
                <Loader2 className="animate-spin" size={20} />
                Preparando dados...
              </div>
            )}
          </section>

          {/* Ações */}
          <footer className="flex flex-col gap-3 border-t border-[#E3EEE7] bg-[#FAFCFA] px-6 py-5 sm:flex-row sm:justify-between md:px-10">
            <button
              onClick={() => navigate("/screening")}
              disabled={isAnalyzing}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#D4E7DC] px-5 py-3 font-bold text-[#38594E] hover:bg-[#EAF5EE]"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => handleContinue(true)}
                disabled={isAnalyzing}
                className="rounded-xl border-2 border-[#D4E7DC] px-5 py-3 font-bold text-[#38594E] hover:bg-[#EAF5EE]"
              >
                Pular etapa
              </button>

              <button
                onClick={() => handleContinue(false)}
                disabled={!file || isAnalyzing}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#087E66] px-6 py-3 font-bold text-white shadow-lg shadow-[#087E66]/20 hover:bg-[#065C4C] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuar
                <ArrowRight size={18} />
              </button>
            </div>
          </footer>
        </main>

        <p className="mt-6 text-center text-xs text-[#698478]">
          Pulm.io • Tecnologia e pesquisa para a saúde amazônica
        </p>
      </div>
    </div>
  );
}
