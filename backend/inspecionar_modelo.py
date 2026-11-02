
import joblib

modelo = joblib.load("models/MD_RF.joblib")

print("Tipo do modelo:", type(modelo))

if hasattr(modelo, "n_features_in_"):
    print("Quantidade de entradas:", modelo.n_features_in_)

if hasattr(modelo, "feature_names_in_"):
    print("Nomes das entradas:", modelo.feature_names_in_)

if hasattr(modelo, "classes_"):
    print("Classes:", modelo.classes_)

if hasattr(modelo, "steps"):
    print("Etapas do pipeline:", modelo.steps)
