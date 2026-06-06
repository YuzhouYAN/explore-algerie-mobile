# Explore Algérie Mobile

Application mobile React Native / Expo pour découvrir le **patrimoine culturel algérien** :
monuments, villes historiques, vestiges numides et berbères, parcours GPS.

---

## 📚 TPs — Guide étudiant

Le document complet des travaux pratiques est disponible ici :  
👉 [`docs/tps/tp-mobile-patrimoine.md`](docs/tps/tp-mobile-patrimoine.md)

| TP | Thème | Durée |
|----|-------|-------|
| **TP 0** | Initialisation Git + Premier push | 30 min |
| TP 1 | Setup Expo + Navigation + NativeWind | 3h |
| TP 2 | Authentification JWT (Axios, SecureStore, Zustand) | 4h |
| TP 3 | Liste & Détail des sites patrimoniaux | 4h |
| TP 4 | Carte GPS interactive (react-native-maps) | 6h |
| TP 5 | Parcours intelligents (randonnée / culture / histoire) | 6h |
| TP 6 | Mode hors-ligne par wilaya (SQLite) | 4h |
| TP 7 | QR Code + Partage natif | 3h |

---

## 🚀 Démarrage rapide

### 1. Cloner le repo

```bash
git clone https://github.com/Amazighiahub/explore-algerie-mobile.git
cd explore-algerie-mobile
```

### 2. Initialiser le projet Expo

```bash
npx create-expo-app@latest . --template tabs
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer l'environnement

```bash
cp .env.example .env.local
# Éditer .env.local : remplacer [IP_SERVEUR] par l'IP fournie par l'encadrant
```

### 5. Lancer l'application

```bash
npx expo start
```

Scanner le QR code avec **Expo Go** sur ton téléphone.

---

## 🛠 Stack technique

| Outil | Usage |
|-------|-------|
| Expo + TypeScript | Framework mobile |
| Expo Router | Navigation (file-based) |
| NativeWind | Tailwind CSS pour React Native |
| React Query | Cache API |
| Zustand | State management |
| Axios | Client HTTP + interceptors JWT |
| react-native-maps | Carte GPS |
| expo-location | Géolocalisation |
| expo-secure-store | Stockage sécurisé du token |
| expo-sqlite | Données hors-ligne |

---

## 🔌 Backend

L'API backend est fournie par l'encadrant (EventCulture, port 3001).  
Ne pas modifier le backend — consommer uniquement via l'URL dans `.env.local`.

---

## 📁 Architecture cible

```
explore-algerie-mobile/
├── app/
│   ├── (auth)/         ← Login / Register
│   ├── (tabs)/         ← Carte, Explorer, Parcours, Profil
│   └── patrimoine/     ← Fiche détail
├── src/
│   ├── api/            ← Clients Axios
│   ├── stores/         ← Zustand stores
│   ├── hooks/          ← useLocation, useNearby, useParcours
│   ├── components/     ← Composants réutilisables
│   └── types/          ← TypeScript types
└── docs/tps/           ← Ce guide
```
