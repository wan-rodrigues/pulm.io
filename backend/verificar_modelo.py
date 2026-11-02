
import joblib
import os
import hashlib

caminho = "models/MD_RF.joblib"

modelo = joblib.load(caminho)

print("=== MODELO RANDOM FOREST ===")
print("Tipo:", type(modelo).__name__)
print("Número de árvores:", modelo.n_estimators)
print("Número de entradas:", modelo.n_features_in_)
print("Classes:", modelo.classes_)
print("Profundidade máxima configurada:", modelo.max_depth)
print("Random state:", modelo.random_state)

with open(caminho, "rb") as arquivo:
    hash_modelo = hashlib.sha256(arquivo.read()).hexdigest()

print("SHA-256:", hash_modelo)
print("Tamanho (MB):", round(os.path.getsize(caminho) / 1024**2, 2))
