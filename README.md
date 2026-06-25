🚀 INF83 API — CI/CD Pipeline avec GitHub Actions, Docker et Railway


🎯 Objectif du projet

Ce projet démontre la mise en œuvre d’une chaîne CI/CD complète pour une API Node.js, depuis l’exécution des tests jusqu’au déploiement automatique en production.

Le pipeline intègre :

✅ Tests automatisés avec Jest
✅ Stratégie Fail Fast
✅ Build Docker multi-stage
✅ Publication automatique sur Docker Hub
✅ Versioning des images via SHA Git
✅ Déploiement continu sur Railway
✅ API accessible en HTTPS


🌐 API en production

https://inf83-api-production-9be5.up.railway.app


🏗️ Architecture du projet

Composant	Technologie
Backend	Node.js + Express
Base de données	PostgreSQL (Railway)
CI/CD	GitHub Actions
Registry Docker	Docker Hub
Hébergement	Railway
Sécurité	HTTPS automatique


🔄 Pipeline CI/CD

Le workflow est défini dans :

.github/workflows/ci.yml

Le pipeline suit les étapes suivantes :

Tests → Build → Push → Deploy

Chaque étape dépend de la réussite de la précédente afin de garantir l’intégrité du déploiement.

🧪 1. Tests automatisés (Fail Fast)

À chaque push sur la branche main, GitHub Actions :

Installe les dépendances
Exécute la suite de tests Jest
Interrompt immédiatement le pipeline en cas d’échec
Exemple de test volontairement cassé
expect(true).toBe(false);
Résultat attendu
test             ❌ failed
build            ⏭️ skipped
push             ⏭️ skipped
deploy-railway   ⏭️ skipped

Aucune image Docker n’est générée et aucun déploiement n’est effectué.

🛠️ 2. Build Docker multi-stage

L’application est conteneurisée à l’aide d’un Dockerfile multi-stage permettant de réduire la taille de l’image finale.

Étape 1 : Build
Installation des dépendances
Compilation de l’application
Étape 2 : Runtime
Image finale légère
Réduction de la surface d’attaque
Temps de démarrage optimisé
Tags générés
latest
sha-<commit>

Exemple :

inf83-api:latest
inf83-api:sha-a1b2c3d


📦 3. Publication sur Docker Hub

Une fois le build validé, GitHub Actions publie automatiquement les images sur Docker Hub.

Images disponibles
inf83-api:latest
inf83-api:sha-xxxxxxx

L’utilisation du tag SHA permet :

la traçabilité des déploiements ;
le rollback vers une version précise ;
l’identification rapide d’une release.


🚀 4. Déploiement automatique sur Railway

Le job deploy-railway déclenche un redéploiement via l’API GraphQL Railway.

Processus
Railway récupère la dernière image Docker Hub
Le service est redéployé automatiquement
L’URL HTTPS reste disponible sans interruption
Service déployé
https://inf83-api-production-9be5.up.railway.app


⚙️ Variables d’environnement

Configuration utilisée dans Railway :

Variable	Description
PORT	Port d’écoute de l’application
DATABASE_URL	URL PostgreSQL fournie par Railway
NODE_ENV	Environnement d’exécution
Démarrage du serveur
app.listen(process.env.PORT);


🔍 Validation du mécanisme Fail Fast

Cas n°1 : Échec des tests
Ajout d’un test cassé
Arrêt immédiat du pipeline
Aucun build Docker
Aucun push Docker Hub
Aucun déploiement Railway

➡️ La version en production reste inchangée.

Cas n°2 : Correction des tests
Suppression du test cassé
Pipeline validé
Build et push automatiques
Déploiement Railway déclenché

➡️ La nouvelle version est mise en production.

🩺 Vérification du déploiement

Endpoint de santé
curl https://inf83-api-production-9be5.up.railway.app/health
Réponse attendue
{
  "status": "ok"
}
🏁 Résultats obtenus

Ce projet met en œuvre un pipeline CI/CD moderne répondant aux bonnes pratiques DevOps :

✅ Tests automatisés
✅ Stratégie Fail Fast
✅ Build Docker multi-stage
✅ Publication Docker Hub
✅ Versioning des images par SHA
✅ Déploiement continu Railway
✅ HTTPS automatique
✅ Livraison continue fiable et reproductible

Cette architecture garantit que seule une version validée par les tests peut être déployée en production.