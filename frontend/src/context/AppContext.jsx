import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [screeningData, setScreeningData] = useState(null);

  // Novas variáveis para resultados
  const [currentResult, setCurrentResult] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  // Função para adicionar ao histórico
  const addToHistory = (result) => {
    setAnalysisHistory((prev) => [result, ...prev]);
  };

  // Função para resetar o app
  const resetApp = () => {
    setScreeningData(null);
    setUploadedImage(null);
    setCurrentResult(null);
    setAnalysisHistory([]);
  };

  // Caso você também queira guardar a imagem do upload
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <AppContext.Provider
      value={{
        screeningData,
        setScreeningData,
        uploadedImage,
        setUploadedImage,
        currentResult,
        setCurrentResult,
        analysisHistory,
        addToHistory,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

