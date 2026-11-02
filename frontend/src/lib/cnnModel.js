
import * as tf from "@tensorflow/tfjs";

let modeloCNN = null;

export async function carregarCNN() {
  if (modeloCNN) {
    return modeloCNN;
  }

  const caminho = `${import.meta.env.BASE_URL}models/cnn-graph/model.json`;

  modeloCNN = await tf.loadGraphModel(caminho);

  return modeloCNN;
}

export async function analisarRadiografia(arquivo) {
  if (!arquivo) {
    throw new Error("Nenhuma imagem foi selecionada.");
  }

  const modelo = await carregarCNN();

  const imagem = await createImageBitmap(arquivo);

  let entrada;
  let resultado;

  try {
    entrada = tf.tidy(() => {
      const pixels = tf.browser.fromPixels(imagem, 3);

      const redimensionada = tf.image.resizeBilinear(
        pixels,
        [300, 300]
      );

      // Reproduz o pré-processamento do backend original.
      return redimensionada
        .toFloat()
        .div(255)
        .expandDims(0);
    });

    resultado = modelo.execute(entrada);

    const tensorSaida = Array.isArray(resultado)
      ? resultado[0]
      : resultado;

    const valores = await tensorSaida.data();

    return Number(valores[0]);
  } finally {
    entrada?.dispose();

    if (Array.isArray(resultado)) {
      resultado.forEach((tensor) => tensor.dispose());
    } else {
      resultado?.dispose();
    }

    imagem.close();
  }
}
