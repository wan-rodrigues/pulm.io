export const TOTAL_STEPS = 5;

export const JOURNEY_STEPS = [
  "Sintomas gerais",
  "Sintomas respiratórios",
  "Outros sintomas",
  "Raio-X",
  "Resultado",
];

export function getProgress(step) {
  const safeStep = Math.max(0, Math.min(step, TOTAL_STEPS));
  return Math.round((safeStep / TOTAL_STEPS) * 100);
}