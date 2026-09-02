# Rapatrier tous les assets dans le repo (self-hosting Cloudflare Workers)

Objectif : supprimer toute dépendance à l'infrastructure Lovable (`/__l5e/assets-v1/...`) en committant les fichiers binaires dans le projet, avec des imports Vite classiques.

## Périmètre

55 pointeurs `.asset.json` (~310 Mo au total) référencés depuis 4 fichiers :
`src/routes/index.tsx`, `src/routes/moonwalcoeur.tsx`, `src/components/BagsCarousel3D.tsx`, `src/components/FloatingMascot.tsx`.

| Catégorie | Fichiers | Poids | Destination |
|---|---|---|---|
| Images (hero, atelier, events, partners, clients, mascotte, moonwalcoeur, background) | 48 | ~30 Mo | `src/assets/...` + imports Vite |
| Modèles 3D `.glb` | 7 | ~280 Mo | compressés puis `public/models/` |

## Étapes

1. **Téléchargement** de chaque binaire depuis son URL actuelle vers son emplacement d'origine dans `src/assets/` (même nom de fichier que `original_filename`).
2. **Images** : remplacer chaque import de pointeur par un import direct, et chaque usage `xxx.url` par la variable importée.
   - `import lfmLogo from "@/assets/partners/lfm.png.asset.json"` → `import lfmLogo from "@/assets/partners/lfm.png"`
   - `<img src={lfmLogo.url}>` → `<img src={lfmLogo}>`
   - le background CSS inline de `BagsCarousel3D` (`url(${bgRoom.url})`) devient `url(${bgRoom})`.
3. **Modèles 3D** : compression Draco/Meshopt (`gltf-transform`) de chaque `.glb`, sortie dans `public/models/*.glb`, puis références en chemins absolus (`/models/wm604-tote-bag.glb`) dans `BagsCarousel3D` (chargement + preload). Contrôle que chaque fichier passe sous la limite de 25 Mo par asset de Cloudflare Workers ; si un fichier résiste, je le signale plutôt que de dégrader silencieusement la géométrie.
4. **Nettoyage** : suppression des 55 fichiers `.asset.json` et vérification qu'aucune chaîne `__l5e` ne subsiste dans le code.
5. **Vérification** : build complet, puis contrôle en preview (hero, atelier, bandeau partenaires, cartes événements, mascotte flottante, carrousel 3D) pour confirmer qu'aucune image ni modèle ne manque.

## Notes techniques

- Vite gère nativement les imports d'images (`.png/.jpg/.jpeg/.webp`) : hash de cache + emission automatique dans `dist/assets`.
- Les `.glb` restent dans `public/` car ils sont chargés dynamiquement par three.js à l'exécution (pas d'intérêt à les faire passer par le graphe de modules).
- Le poids du dépôt augmente d'environ 30 Mo (images) + le total des `.glb` compressés.
- Aucune modification de mise en page, de style ou de logique métier : uniquement le chemin d'accès aux fichiers.
