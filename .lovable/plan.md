# Plan : Flottement permanent des vignettes, boutons et titres

## Objectif
Donner du mouvement vivant et organique au site en faisant flotter en permanence :
- Toutes les vignettes / cartes contenant des photos
- Tous les boutons et liens d'action
- Les textes d'en-tête (logo "Bar à custom", titre "Moonwalcoeur")

## Méthode
### 1. Nouvelles animations CSS dans `src/styles.css`
Ajouter une famille de keyframes/utilitaires pour flotter sans écraser les rotations existantes :
- `float-neutral` : translateY uniquement (pour les éléments sans inclinaison)
- `float-left` : translateY + rotation -3deg (compose avec `tilt-left`)
- `float-right` : translateY + rotation +3deg (compose avec `tilt-right`)
- `float-soft` : petite amplitude pour les textes et liens de navigation
- Classes de délai : `.delay-float-1`, `.delay-float-2`, etc. pour décaler les éléments voisins et éviter un mouvement mécanique.

Les animations utiliseront `ease-in-out` en boucle infinie, avec des durées entre 4s et 7s.

### 2. Application dans `src/routes/index.tsx`
- **Header** : logo "Bar à custom" → `float-soft`
- **Navigation** : chaque lien → `float-soft` avec délai progressif
- **Hero** : image déjà animée (`animate-float-hero`) — conserver/améliorer
- **Boutons hero** : `float-neutral` ou `float-left/right`
- **Atelier** : les 2 grandes vignettes photo → `float-left` / `float-right`
- **Services** : les 3 cartes → `float-left` / `float-right` / `float-neutral` alternés
- **Tarifs** : les 3 cartes de prix → flottement alterné
- **FAQ** : pas de vignette photo ici, aucun changement
- **Réserver** : bouton "Prendre rendez-vous" → `float-neutral`
- **Contact** : bouton email → `float-left`

### 3. Application dans `src/routes/moonwalcoeur.tsx`
- **Header** : lien/logo "← Bar à custom" → `float-soft`
- **Image signature** : grande vignette centrale → `float-neutral`
- **Bouton retour** : `float-left`

### 4. Accessibilité
Ajouter une règle `@media (prefers-reduced-motion: reduce)` qui désactive les animations de flottement pour les utilisateurs sensibles au mouvement.

### 5. Vérification
Lancer `bun run build` pour s'assurer que les nouvelles classes et modifications de routes compilent correctement.

## Fichiers concernés
- `src/styles.css` — nouvelles keyframes et utilitaires
- `src/routes/index.tsx` — application des classes sur vignettes, boutons et header
- `src/routes/moonwalcoeur.tsx` — application sur la page Moonwalcoeur