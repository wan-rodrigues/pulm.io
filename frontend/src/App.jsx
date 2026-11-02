
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Screening from "./pages/Screening";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import * as tf from '@tensorflow/tfjs';

async function testarCNN() {
  let modelo;

  try {
    console.log('Iniciando carregamento da CNN Graph Model...');

    modelo = await tf.loadGraphModel(
      `${import.meta.env.BASE_URL}models/cnn-graph/model.json`
    );

    console.log('CNN carregada com sucesso!');
    console.log('Entrada:', modelo.inputs[0].shape);
    console.log('Saídas do modelo:', modelo.outputs);

    console.log('Iniciando teste de previsão...');

const imagemTeste = tf.fill(
  [1, 300, 300, 3],
  128 / 255,
  'float32'
);

try {
  const resultado = await modelo.executeAsync(imagemTeste);
  const saidas = Array.isArray(resultado) ? resultado : [resultado];

  for (const saida of saidas) {
    console.log('Formato da previsão:', saida.shape);
    console.log('Valores da previsão:', await saida.data());
    saida.dispose();
  }

  console.log('Teste de previsão concluído!');
} finally {
  imagemTeste.dispose();
}

  } catch (erro) {
    console.error('Erro ao carregar a CNN:', erro);
  } finally {
    modelo?.dispose();
  }
}

window.testarCNN = testarCNN;

function AppContent() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/pulm.io">
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
