// src/lib/mlSimulator.js
export function analyzeImage(screeningData, imageFile) {
  // Simulação fixa só pra funcionar sem API
  const probRF = Math.random();
  const probCNN = Math.random();

  return {
    id: Date.now(),
    timestamp: new Date().toISOString(),

    symptoms: screeningData,
    image: imageFile || null,

    randomForestProbability: probRF,
    cnnProbability: probCNN,

    finalProbability: (probRF + probCNN) / 2,
  };
}

