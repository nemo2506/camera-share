# 📱 Camera Share - iPhone to PC (PWA)

**Camera Share** est une **Progressive Web App (PWA)** qui permet de partager la caméra de votre iPhone 8+ avec un PC Windows, directement depuis Safari, sans passer par l'App Store.  

---

## ✅ Pourquoi une PWA ?

Créer une app native (.ipa) nécessiterait :

- Un compte Apple Developer (99$/an)  
- Des certificats Apple  
- Xcode (macOS uniquement)  
- Publication via App Store ou TestFlight  

La **PWA** est plus simple et plus rapide :  

✨ Gratuit, aucun compte développeur nécessaire  
📱 S’installe comme une vraie app sur l’écran d’accueil  
🚀 Fonctionne immédiatement  
🔄 Facile à mettre à jour  
🌐 Accessible de partout  

---

## 📲 Installation

### Hébergement

- **GitHub Pages** : hébergez directement `camera-share-pwa.html` et `manifest.json` dans votre dépôt.  
- **Netlify / Vercel** : glissez-déposez les fichiers → URL instantanée.  

### Sur iPhone (Safari)

1. Ouvrez l’URL de la PWA.  
2. Tapez **Partager ⬆️ → Sur l’écran d’accueil**.  
3. L’icône apparaît, comme une app native.  

---

## 🚀 Utilisation

1. Lancez l’application depuis l’écran d’accueil.  
2. Appuyez sur **Démarrer la caméra** et autorisez l’accès à la caméra.  
3. Copiez l’URL ou scannez le QR code.  
4. Ouvrez l’URL sur votre PC Windows pour voir le flux vidéo en direct.  
5. Utilisez les options pour **changer de caméra** ou **partager facilement le flux**.  

---

## ⚙️ Fonctionnalités principales

- Démarrage / arrêt de la caméra  
- Sélection de la caméra avant/arrière  
- Affichage de la résolution vidéo réelle  
- Partage facile via URL ou QR code  
- Installation en mode standalone  
- Fonctionne hors ligne (cache limité)  

---

## 🖼️ Icône et branding

La PWA utilise les icônes et couleurs définies dans le **manifest.json** :

- **Nom court** : Camera Share  
- **Couleur thème** : #667eea  
- **Orientation** : portrait  
- **Icônes** : SVG 192x192 et 512x512 (masquables pour l’écran d’accueil)  

---

## 💡 Notes techniques

- HTML : `camera-share-pwa.html`  
- Manifest : `manifest.json`  
- Compatible iPhone 8+ et Safari moderne  
- Utilise Web APIs modernes : `getUserMedia`, Web Share, Wake Lock  

---

## 📋 License

MIT License – libre d’utilisation et modification.  

---

### Exemple de QR Code

Pour tester rapidement sur votre PC :  
![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://USERNAME.github.io/REPO_NAME/camera-share-pwa.html)

---

**Démo rapide** : installez et ouvrez l’app → démarrez la caméra → p
