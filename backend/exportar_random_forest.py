
import json
import joblib
from pathlib import Path

modelo = joblib.load("models/MD_RF.joblib")

def exportar_arvore(arvore):
    t = arvore.tree_

    return {
        "children_left": t.children_left.tolist(),
        "children_right": t.children_right.tolist(),
        "feature": t.feature.tolist(),
        "threshold": t.threshold.tolist(),
        "value": t.value[:, 0, :].tolist()
    }

dados = {
    "features": modelo.feature_names_in_.tolist(),
    "classes": modelo.classes_.tolist(),
    "n_features": int(modelo.n_features_in_),
    "trees": [
        exportar_arvore(arvore)
        for arvore in modelo.estimators_
    ]
}

saida = Path("random_forest.json")

with open(saida, "w", encoding="utf-8") as arquivo:
    json.dump(dados, arquivo, ensure_ascii=False)

print("Modelo exportado com sucesso!")
print("Arquivo:", saida.resolve())
print("Quantidade de árvores:", len(modelo.estimators_))
