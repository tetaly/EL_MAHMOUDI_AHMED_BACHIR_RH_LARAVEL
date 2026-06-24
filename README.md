# RH Manager

RH Manager est une application web interne de gestion des ressources humaines. Elle permet de gérer les départements et les employés depuis une interface sécurisée.

Le projet a été réalisé avec Laravel, Inertia.js et React selon le cahier des charges `Projet_Synthese_Laravel_GestionRH.docx`.

## Fonctionnalités

- authentification, vérification d’adresse e-mail et double authentification ;
- tableau de bord avec les principaux indicateurs RH ;
- gestion complète des départements ;
- gestion complète des employés ;
- association de chaque employé à un département ;
- ajout, remplacement et suppression des photos des employés ;
- validation des formulaires et messages d’erreur en français ;
- interface responsive avec prise en charge du thème clair/sombre.

## Technologies utilisées

- PHP 8.3 ou supérieur ;
- Laravel 13 ;
- MySQL ;
- Inertia.js 3 ;
- React 19 et JavaScript (JSX) ;
- Tailwind CSS 4 ;
- Vite 8 ;
- Pest 4.

## Prérequis

Installez les outils suivants avant de commencer :

- PHP 8.3+ avec les extensions habituelles de Laravel (`ctype`, `curl`, `dom`, `fileinfo`, `filter`, `mbstring`, `openssl`, `pdo`, `pdo_mysql`, `session`, `tokenizer` et `xml`) ;
- Composer 2 ;
- Node.js 22+ et npm ;
- MySQL 8+ ;
- Git.

## Installation locale

### 1. Cloner le projet

```bash
git clone <URL_DU_DEPOT_GITHUB>
cd rh-manager
```

### 2. Installer les dépendances

```bash
composer install
npm install
```

### 3. Configurer l’environnement

Copiez le fichier d’exemple puis générez la clé de l’application :

```bash
cp .env.example .env
php artisan key:generate
```

Créez ensuite une base de données MySQL :

```sql
CREATE DATABASE rh_manager
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
```

Adaptez les variables suivantes dans `.env` :

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rh_manager
DB_USERNAME=root
DB_PASSWORD=
```

Le fichier `.env` contient des informations locales ou sensibles et ne doit jamais être ajouté à Git.

### 4. Préparer la base de données et le stockage

```bash
php artisan migrate --seed
php artisan storage:link
```

Le seeder crée un compte administrateur de démonstration :

- e-mail : `admin@rh-manager.ma`
- mot de passe : `password`

Changez ce mot de passe après la première connexion.

### 5. Lancer le projet

Pour démarrer Laravel, le worker de file d’attente, les logs et Vite en une seule commande :

```bash
composer dev
```

L’application est ensuite disponible à l’adresse affichée dans le terminal, généralement `http://localhost:8000`.

Vous pouvez également lancer les services séparément :

```bash
php artisan serve
npm run dev
```

## Build de production

```bash
npm run build
```

Pour un déploiement, utilisez un fichier `.env` propre à l’environnement, désactivez le mode debug et exécutez les migrations :

```dotenv
APP_ENV=production
APP_DEBUG=false
```

```bash
php artisan migrate --force
php artisan optimize
```

## Tests et qualité du code

Les tests utilisent une base SQLite temporaire en mémoire : ils ne modifient pas la base MySQL locale.

```bash
# Suite de tests Laravel
php artisan test

# Vérifications PHP complètes
composer test

# Analyse statique PHP
composer types:check

# Vérifications frontend
npm run lint:check
npm run format:check
```

## Structure principale

```text
app/Http/Controllers/     Contrôleurs Laravel
app/Http/Requests/        Validation des formulaires
app/Models/               Modèles Eloquent
database/migrations/      Structure de la base de données
database/seeders/         Données initiales
resources/js/pages/       Pages React/Inertia
resources/js/components/  Composants de l’interface
routes/                    Routes de l’application
tests/                    Tests Pest
```

## Dépannage

Si les photos ne s’affichent pas, recréez le lien symbolique du stockage :

```bash
php artisan storage:link
```

Après une modification importante de `.env`, videz les caches :

```bash
php artisan optimize:clear
```

Si les dépendances frontend posent problème, repartez du fichier de verrouillage :

```bash
npm ci
```
