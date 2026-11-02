
import joblib

modelo = joblib.load("models/MD_RF.joblib")

print("ENTRADAS DO RANDOM FOREST:\n")

for indice, nome in enumerate(modelo.feature_names_in_, start=1):
    print(f"{indice}. {nome}")

print("\nTotal:", modelo.n_features_in_)
