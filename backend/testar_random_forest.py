
import joblib
import numpy as np

modelo = joblib.load("models/MD_RF.joblib")

# Exemplo sintético apenas para testar o código
entradas = np.array([[
    1, 0, 0, 1, 0, 0, 0,
    0, 1, 0, 1, 0, 0
]])

resultado = modelo.predict_proba(entradas)

print("Classes:", modelo.classes_)
print("Probabilidades:", resultado[0])
