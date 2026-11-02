
import { getProgress, JOURNEY_STEPS } from "../lib/progress.js";
import { Check } from "lucide-react";

export default function JourneyProgress({ step }) {
  const progress = getProgress(step);

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-[#38594E]">
          Sua jornada
        </span>
        <span className="font-bold text-[#087E66]">
          {progress}%
        </span>
      </div>

      <div
        className="h-3 overflow-hidden rounded-full bg-[#D8EEE3]"
        role="progressbar"
        aria-label="Progresso da avaliação"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#087E66] to-[#12B886] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-5 gap-1">
        {JOURNEY_STEPS.map((label, index) => {
          const number = index + 1;
          const complete = number < step;
          const active = number === step;

          return (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  active
                    ? "bg-[#087E66] text-white ring-4 ring-[#D9F7E8]"
                    : complete
                    ? "bg-[#12B886] text-white"
                    : "bg-[#E6F0EA] text-[#789187]"
                }`}
              >
                {complete ? <Check size={15} /> : number}
              </div>

              <span
                className={`text-[10px] leading-tight sm:text-xs ${
                  active
                    ? "font-bold text-[#087E66]"
                    : "text-[#698478]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
