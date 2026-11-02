
import { preverSintomas } from "./randomForest";

export async function testarRandomForest() {
  const entradas = [
    1, 0, 0, 1, 0, 0, 0,
    0, 1, 0, 1, 0, 0
  ];

  const resultado = await preverSintomas(entradas);

  console.log("Classes:", resultado.classes);
  console.log(
    "Probabilidades:",
    resultado.probabilidades
  );

  return resultado;
}
