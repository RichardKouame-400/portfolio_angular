# 🎓 Portfolio — Kouame Aka Richard

Portfolio personnel Full-Stack avec **Django REST Framework** (backend) et **Angular 17** (frontend).

## 📁 Structure du Projet (52 fichiers)

```
portfolio-richard/
├── backend/                    ← Django REST API
│   ├── manage.py
│   ├── requirements.txt
│   ├── portfolio/              ← Configuration Django
│   │   ├── settings.py         ← CORS configuré (localhost:4200)
│   │   ├── urls.py             ← Routes principales
│   │   └── wsgi.py
│   └── api/                    ← Application principale
│       ├── models.py           ← 6 modèles métier
│       ├── serializers.py      ← Nested + computed fields
│       ├── views.py            ← ListCreate + RetrieveUpdateDestroy
│       ├── urls.py             ← 16+ endpoints REST
│       ├── admin.py            ← Admin Django complet
│       └── seed.py             ← Données de démo réelles
│
└── frontend/                   ← Angular 17 (standalone)
    ├── package.json
    ├── angular.json
    ├── tsconfig.json
    └── src/
        ├── main.ts             ← Bootstrap standalone
        ├── index.html
        ├── styles.scss         ← Design global (dark theme)
        └── app/
            ├── app.component.ts
            ├── types.ts        ← 15 interfaces TypeScript
            ├── portfolio.service.ts  ← 20+ méthodes HttpClient
            └── components/
                ├── nav/        ← Navigation fixe + scroll actif
                ├── hero/       ← Hero + marquee animé
                ├── about/      ← Profil + stats + tech tags
                ├── skills/     ← Barres de progression animées
                ├── services/   ← 4 services depuis l'API
                ├── projects/   ← Projets filtrables par catégorie
                ├── experiences/← Timeline formation + pro
                └── contact/    ← Formulaire → POST /api/contacts/
```

## 🚀 Installation (simple)

### ⚡ Démarrage en 1 commande (Windows PowerShell)

Depuis la racine du projet :

```powershell
# 1ère installation backend (venv + deps + migrations + seed)
.\start-backend.ps1 -Setup

# démarrage backend normal
.\start-backend.ps1

# démarrage frontend
.\start-frontend.ps1
```

> Ouvre 2 terminaux : un pour le backend, un pour le frontend.

### 1) Prérequis

- Python **3.11+**
- Node.js **18+** (ou 20 LTS recommandé)
- npm

### 2) Backend Django

Depuis la racine du projet :

#### Windows (PowerShell)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
Get-Content api/seed.py | python manage.py shell
python manage.py runserver
```

#### macOS / Linux

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py shell < api/seed.py
python manage.py runserver
```

Backend disponible sur : `http://localhost:8000`

### 3) Frontend Angular

Ouvrir un **nouveau terminal** depuis la racine du projet :

```bash
cd frontend
npm install
npm start
```

Frontend disponible sur : `http://localhost:4200`

### 4) Vérification rapide

- API : `http://localhost:8000/api/`
- App web : `http://localhost:4200`

### Optionnel

Créer un admin Django :

```bash
cd backend
python manage.py createsuperuser
```

## 🔗 Endpoints REST (16+)

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/` | Vue d'ensemble de l'API |
| GET/POST | `/api/utilisateurs/` | Liste / Créer utilisateur |
| GET/PUT/DELETE | `/api/utilisateurs/<id>/` | Détail utilisateur |
| GET | `/api/utilisateurs/<id>/complet/` | **Profil complet (nested)** |
| GET/POST | `/api/projets/` | Liste / Créer projet |
| GET/PUT/DELETE | `/api/projets/<id>/` | Détail projet |
| GET/POST | `/api/experiences/` | Liste / Créer expérience |
| GET/PUT/DELETE | `/api/experiences/<id>/` | Détail expérience |
| GET/POST | `/api/services/` | Liste / Créer service |
| GET/PUT/DELETE | `/api/services/<id>/` | Détail service |
| GET/POST | `/api/contacts/` | **Formulaire de contact** |
| GET/DELETE | `/api/contacts/<id>/` | Détail message |
| GET/POST | `/api/reseaux/` | Réseaux sociaux |
| GET/DELETE | `/api/reseaux/<id>/` | Détail réseau |
| GET/POST | `/api/localisations/` | Localisations |
| GET/PUT | `/api/localisations/<id>/` | Modifier localisation |

## 📊 Modèles Django

| Modèle | Description |
|--------|-------------|
| `Utilisateur` | Profil principal (bio, photo, CV, stats) |
| `Projet` | Projets portfolio (catégorie, statut, technologies) |
| `Experience` | Formation + expériences pro/projets/compétitions |
| `Service` | Services proposés (backend, frontend, data, Odoo) |
| `PriseDeContact` | Messages du formulaire de contact |
| `ReseauSocial` | GitHub, LinkedIn, Twitter... |
| `Localisation` | Géolocalisation (Abidjan, CI) |

## 🎨 Design

- **Thème** : Dark premium avec accent vert lime `#c8f04b`
- **Typographie** : Bebas Neue + DM Serif Display + DM Sans
- **Animations** : Curseur personnalisé, marquee, scroll reveal, barres de compétences

## 🏢 Projets réels inclus

1. **[Parc-IT](https://github.com/RichardKouame-400/Parc-IT)** — Module Odoo 18.0 gestion parc informatique (Python 85%, SCSS 10%, JS 5%)
2. **[projet-school-online](https://github.com/RichardKouame-400/pojet-school-online)** — Application scolaire avec UML complet + wireframes Figma
3. **Plateforme Marchés Publics** — Projet L3, dématérialisation des marchés (Django/Angular)
4. **Portfolio Django/Angular** — Ce projet lui-même

## 👨‍💻 Auteur

**Kouame Aka Richard** — Étudiant L3 Computer Science — Abidjan, Côte d'Ivoire

- GitHub : [@RichardKouame-400](https://github.com/RichardKouame-400)
- Email : richard.kouame@email.com
