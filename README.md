# HDM Todo List Application

---

## Technologies utilisées

- **Frontend** : React + TypeScript avec Material-UI pour une interface moderne, fluide et responsive.  
- **Backend** : NestJS pour sa structure modulaire et maintenable.  
- **Base de données** : MySQL, avec Prisma pour gérer les requêtes et migrations simplement.  
- **Outils** : Docker (pour MySQL), Prisma (ORM), GitHub (versioning), ESLint + Prettier (formatage).

---

## Choix techniques et décisions

### Architecture du projet

- Le backend NestJS est structuré en modules pour une séparation claire des responsabilités (contrôleurs, services, use cases).
- Le frontend React permet une interface interactive et facile à maintenir.
- Prisma simplifie l’interaction avec la base de données grâce à son typage automatique et ses migrations.

### Gestion des tâches (CRUD)

- Les tâches peuvent être créées, lues, modifiées et supprimées via une API REST.
- Une UseCaseFactory est utilisée pour centraliser la logique métier et faciliter l’ajout de nouvelles fonctionnalités.

### Fonctionnalité bonus (non implémentée)

Par manque de temps lié à mes obligations académiques, je n’ai pas pu finaliser une fonctionnalité prévue :  
Un bouton "Terminer" devait permettre de marquer une tâche comme complétée, avec un affichage visuel différencié.

Cette fonctionnalité aurait enrichi l'expérience utilisateur en ajoutant une gestion d'état simple des tâches.

---

## Défis rencontrés et solutions apportées

### 1. Dépendances et UseCaseFactory

Des erreurs bloquantes liées à l'injection de dépendances dans la UseCaseFactory.

**Solution** : Correction des types et ajustement des imports pour une compatibilité complète entre modules.

### 2. Synchronisation Prisma et MySQL

Prisma ne reconnaissait pas certaines modifications de schéma.

**Solution** : Réinitialisation des migrations et insertion de données fictives pour valider le bon fonctionnement de l'application.

### 3. Problèmes d’URL entre le frontend et le backend

L’API n’était pas correctement atteinte depuis le frontend.

**Solution** : Ajout de la variable `VITE_API_BASE_URL` dans `.env` pour pointer dynamiquement vers l’API.

### 4. Validations côté backend

Certaines requêtes échouaient faute de validations sur les entrées.

**Solution** : Ajout de validations dans les DTOs (Data Transfer Objects) côté NestJS.

---

## Instructions pour tester l'application

### Backend

1. Configurez le fichier `.env` avec vos informations MySQL (`DATABASE_URL`).
2. Lancez le serveur avec la commande :

```bash
yarn start:dev
