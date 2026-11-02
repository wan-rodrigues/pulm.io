
let modeloCache = null;

export async function carregarRandomForest() {
  if (modeloCache) return modeloCache;

  const resposta = await fetch(
    `${import.meta.env.BASE_URL}random_forest.json`
  );

  if (!resposta.ok) {
    throw new Error("Erro ao carregar o Random Forest");
  }

  modeloCache = await resposta.json();
  return modeloCache;
}

function preverArvore(arvore, entradas) {
  let no = 0;

  while (arvore.children_left[no] !== -1) {
    const indice = arvore.feature[no];
    const limite = arvore.threshold[no];

    if (entradas[indice] <= limite) {
      no = arvore.children_left[no];
    } else {
      no = arvore.children_right[no];
    }
  }

  return arvore.value[no];
}

export async function preverSintomas(entradas) {
  const modelo = await carregarRandomForest();

  if (
    !Array.isArray(entradas) ||
    entradas.length !== modelo.n_features ||
    entradas.some(
      (valor) => typeof valor !== "number" ||
      !Number.isFinite(valor)
    )
  ) {
    throw new Error("Entradas inválidas para o modelo");
  }

  const probabilidades = new Array(
    modelo.classes.length
  ).fill(0);

  for (const arvore of modelo.trees) {
    const resultado = preverArvore(arvore, entradas);

    resultado.forEach((valor, indice) => {
      probabilidades[indice] += valor;
    });
  }

  return {
    classes: modelo.classes,
    probabilidades: probabilidades.map(
      (valor) => valor / modelo.trees.length
    )
  };
}
