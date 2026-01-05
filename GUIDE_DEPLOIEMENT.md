# 📖 Guide de Déploiement - BinkoO Digital Lab

## Date : 25 Novembre 2024

---

## 🎯 Méthode 1 : Interface Qoder (RECOMMANDÉ - Le Plus Simple)

### Étape 1 : Ouvrir Source Control
1. Dans la barre latérale gauche de Qoder, cliquez sur l'icône **"Source Control"** (ressemble à une branche 🌿)
2. Vous verrez la liste de tous vos fichiers modifiés

### Étape 2 : Ajouter les fichiers (Stage)
1. Cliquez sur le **"+"** à côté de chaque fichier

   - OU cliquez sur **"+ Stage All Changes"** pour tout ajouter
3. Les fichiers passeront de "Changes" à "Staged Changes"

### Étape 3 : Créer un Commit
1. Dans la zone de texte en haut, tapez un message :
   ```
   ✨ Optimisation Performance Web - Lazy Loading et Code Splitting
   ```
2. Cliquez sur le bouton **✓ Commit** (ou Ctrl+Enter)

### Étape 4 : Envoyer sur GitHub
1. Cliquez sur les **trois points (...)** en haut à droite
2. Sélectionnez **"Push"**
3. ✅ C'est fait ! Vos modifications sont sur GitHub !

---

## 🎯 Méthode 2 : Script Automatique (Si Méthode 1 ne marche pas)

### Utiliser le script save-to-github.bat

1. **Double-cliquez** sur le fichier `save-to-github.bat` dans votre dossier de projet
2. Une fenêtre noire s'ouvrira et fera automatiquement :
   - ✓ Ajout des fichiers
   - ✓ Création du commit
   - ✓ Envoi sur GitHub
3. Appuyez sur une touche à la fin pour fermer

---

## 🎯 Méthode 3 : Terminal Manuel (Pour les curieux)

Si vous voulez comprendre ce qui se passe :

```bash
# 1. Ajouter tous les fichiers modifiés
git add .

# 2. Créer un commit avec un message
git commit -m "✨ Optimisation Performance Web"

# 3. Envoyer sur GitHub
git push
```

---

## 🚀 Déploiement sur Netlify

### Option A : Via GitHub (Automatique - RECOMMANDÉ)

#### Première fois (Configuration initiale)

1. **Allez sur Netlify**
   - Ouvrez votre navigateur
   - Allez sur : https://app.netlify.com/
   - Connectez-vous avec votre compte GitHub

2. **Importer le projet**
   - Cliquez sur **"Add new site"** → **"Import an existing project"**
   - Choisissez **"GitHub"**
   - Autorisez Netlify à accéder à vos repos
   - Sélectionnez votre repo : `bdl-vrai-site-1-1-1-1-1-ok`

3. **Configuration du build**
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
   - **Base directory** : (laisser vide)
   - Cliquez sur **"Deploy site"**

4. **Attendez le déploiement**
   - Netlify va automatiquement :
     - Installer les dépendances
     - Builder le site
     - Le publier en ligne
   - Temps : 2-5 minutes

5. **✅ Site en ligne !**
   - Vous aurez une URL comme : `https://votre-site-123.netlify.app`
   - Vous pouvez la personnaliser dans les paramètres

#### Pour les mises à jour futures

**C'est AUTOMATIQUE !** 🎉
- Dès que vous faites un `git push` sur GitHub
- Netlify détecte les changements
- Re-build et re-déploie automatiquement
- Votre site est à jour en 2-5 minutes

---

### Option B : Via Netlify CLI (Manuel)

Si vous préférez déployer manuellement :

```bash
# 1. Installer Netlify CLI (une seule fois)
npm install -g netlify-cli

# 2. Se connecter à Netlify
netlify login

# 3. Builder le site
npm run build

# 4. Déployer
netlify deploy --prod
```

---

## 🔄 Workflow Complet (Résumé)

### Développement Local
1. Modifier le code dans Qoder
2. Tester localement : `npm run dev`

### Sauvegarder sur GitHub
1. Ouvrir Source Control dans Qoder
2. Stage All Changes (+)
3. Commit avec message
4. Push (... → Push)

### Déploiement Automatique
- Netlify détecte le push sur GitHub
- Build et déploie automatiquement
- Site mis à jour en 2-5 minutes

---

## 📝 Checklist Avant le Premier Déploiement

- [ ] Fichier `.env` configuré (si nécessaire)
- [ ] Variables d'environnement ajoutées dans Netlify :
  - SMTP_USER
  - SMTP_PASS
- [ ] Build fonctionne en local : `npm run build`
- [ ] Preview fonctionne : `npm run preview`

---

## 🆘 En Cas de Problème

### Le build échoue sur Netlify
1. Vérifier les logs dans Netlify
2. Tester localement : `npm run build`
3. Vérifier que toutes les dépendances sont dans `package.json`

### Le site est blanc après déploiement
1. Vérifier la configuration du base path dans Vite
2. Vérifier que le dossier publish est `dist`

### Les variables d'environnement ne marchent pas
1. Aller dans Netlify → Site settings → Environment variables
2. Ajouter SMTP_USER et SMTP_PASS
3. Re-déployer

---

## 📞 Support

Si vous avez des questions :
1. Vérifiez d'abord ce guide
2. Consultez les logs d'erreur
3. Demandez de l'aide avec les logs exacts

---

**Dernière mise à jour** : 25 Novembre 2024
**Version** : 1.0.0
