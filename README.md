# 🚀 Démarrage Rapide - Serveur Local

## ⚠️ PROBLÈME IDENTIFIÉ

Vous avez : `https://192.168.1.64:8080/camera-share/`
Le problème : **HTTPS** nécessite un certificat SSL

## ✅ SOLUTION : Utiliser HTTP

L'URL correcte devrait être : `http://192.168.1.64:8080/camera-share/`

---

## 📋 MÉTHODE 1 : Serveur Python Simple (Recommandé)

### Sur votre PC Windows :

1. **Téléchargez les fichiers** `index.html` et `manifest.json`

2. **Créez un dossier** `camera-share` et mettez les fichiers dedans :
   ```
   C:\camera-share\
   ├── index.html
   └── manifest.json
   ```

3. **Ouvrez PowerShell** dans ce dossier :
   - Shift + Clic droit dans le dossier
   - "Ouvrir PowerShell ici"

4. **Lancez le serveur HTTP** :
   ```powershell
   python -m http.server 8080
   ```

5. **Trouvez l'IP de votre PC** (dans un autre PowerShell) :
   ```powershell
   ipconfig
   ```
   Cherchez "Adresse IPv4" sous votre connexion WiFi
   Exemple : `192.168.1.100`

6. **Sur votre iPhone**, ouvrez Safari :
   ```
   http://192.168.1.100:8080/
   ```

7. **Ajoutez à l'écran d'accueil** :
   - Appuyez sur Partager
   - "Sur l'écran d'accueil"

8. **Lancez l'app et démarrez la caméra**

9. L'app affichera maintenant :
   ```
   http://192.168.1.64:8080/
   ```

10. **Sur PC Firefox**, ouvrez cette URL (HTTP, pas HTTPS !)

---

## 🔧 MÉTHODE 2 : Serveur Node.js (Si Python ne marche pas)

### Installation :

1. **Installez Node.js** depuis https://nodejs.org

2. **Ouvrez PowerShell** dans le dossier `camera-share`

3. **Installez http-server** :
   ```powershell
   npm install -g http-server
   ```

4. **Lancez le serveur** :
   ```powershell
   http-server -p 8080
   ```

5. Suivez les mêmes étapes que la Méthode 1 à partir de l'étape 5

---

## 🌐 MÉTHODE 3 : Serveur PHP (Alternative)

Si vous avez PHP installé :

```powershell
php -S 0.0.0.0:8080
```

---

## 🐛 DÉPANNAGE

### Le serveur ne démarre pas ?

**Python n'est pas installé :**
1. Téléchargez Python : https://www.python.org/downloads/
2. Cochez "Add Python to PATH" pendant l'installation
3. Réessayez

**Le port 8080 est déjà utilisé :**
```powershell
# Utilisez un autre port
python -m http.server 8888
```
Puis sur iPhone : `http://192.168.1.100:8888/`

### Firefox ne se connecte pas ?

**Vérifiez que vous utilisez HTTP (pas HTTPS) :**
❌ `https://192.168.1.64:8080/`
✅ `http://192.168.1.64:8080/`

**Désactivez temporairement le pare-feu :**
1. Panneau de configuration
2. Système et sécurité
3. Pare-feu Windows Defender
4. Désactiver temporairement

**Vérifiez que vous êtes sur le même WiFi :**
- iPhone et PC doivent être sur le même réseau

### L'app n'affiche pas la caméra ?

**Sur iPhone (Safari) :**
1. Réglages → Safari → Caméra → Autoriser
2. Rechargez la page
3. Autorisez l'accès quand demandé

**Sur PC (Firefox) :**
- La caméra de l'iPhone apparaîtra automatiquement dans le flux vidéo
- Pas besoin d'autoriser la caméra du PC

---

## ✅ CHECKLIST COMPLÈTE

- [ ] Serveur démarré sur PC (Python/Node.js)
- [ ] IP du PC trouvée (ex: 192.168.1.100)
- [ ] iPhone et PC sur le même WiFi
- [ ] App ouverte sur iPhone via `http://IP_PC:8080/`
- [ ] App ajoutée à l'écran d'accueil
- [ ] Caméra démarrée sur iPhone
- [ ] URL affichée : `http://192.168.1.64:8080/`
- [ ] URL ouverte sur PC avec **HTTP** (pas HTTPS)
- [ ] Pare-feu autorise le port 8080

---

## 🎯 CONFIGURATION OPTIMALE

### Sur PC (PowerShell) :

```powershell
# 1. Aller dans le dossier
cd C:\camera-share

# 2. Démarrer le serveur
python -m http.server 8080

# 3. Dans un autre PowerShell, trouver l'IP
ipconfig | findstr "IPv4"
```

### Sur iPhone :

1. Safari → `http://[IP_DU_PC]:8080/`
2. Partager → Sur l'écran d'accueil
3. Lancer l'app
4. Démarrer la caméra
5. Noter l'URL affichée

### Sur PC Firefox :

1. Ouvrir l'URL de l'iPhone : `http://192.168.1.64:8080/`
2. Le flux vidéo apparaît ! 🎥

---

## 💡 ASTUCE

Pour ne pas avoir à retaper l'IP à chaque fois :

**Créez un raccourci** sur le bureau de votre PC :
1. Clic droit → Nouveau → Raccourci
2. URL : `http://192.168.1.64:8080/`
3. Nom : "Caméra iPhone"

Double-cliquez pour accéder instantanément !

---

## 🎉 RÉSULTAT FINAL

✅ iPhone partage sa caméra
✅ PC reçoit le flux en temps réel
✅ Utilise HTTP (pas HTTPS)
✅ Fonctionne en réseau local
✅ Pas besoin d'internet

**Profitez de votre webcam iPhone ! 📱➡️💻**
