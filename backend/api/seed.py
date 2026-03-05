"""
Script de seed — Peuple la BDD avec les données réelles de Kouame Aka Richard
Usage : python manage.py shell < api/seed.py
   ou : python manage.py runscript seed (avec django-extensions)
"""

import os
import sys
import django

# Setup Django si exécuté directement
if __name__ == '__main__':
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
    django.setup()

from api.models import (
    Utilisateur, Projet, Experience, Service,
    ReseauSocial, Localisation, PriseDeContact
)


def run():
    print("🌱 Démarrage du seed...")

    # ─── Nettoyage ───────────────────────────────────────────────────────────
    PriseDeContact.objects.all().delete()
    ReseauSocial.objects.all().delete()
    Experience.objects.all().delete()
    Service.objects.all().delete()
    Projet.objects.all().delete()
    Utilisateur.objects.all().delete()
    Localisation.objects.all().delete()
    print("✅ Tables vidées")

    # ─── Localisation ────────────────────────────────────────────────────────
    loc = Localisation.objects.create(
        ville='Abidjan',
        pays="Côte d'Ivoire",
        region='District Autonome d\'Abidjan',
        latitude=5.354580,
        longitude=-4.024429,
        google_maps_url='https://maps.app.goo.gl/abidjan'
    )
    print(f"✅ Localisation: {loc}")

    # ─── Utilisateur ─────────────────────────────────────────────────────────
    user = Utilisateur.objects.create(
        prenom='Kouame Aka',
        nom='Richard',
        titre='Développeur Full-Stack | Étudiant L3 Computer Science',
        sous_titre='Django · Angular · Python · TypeScript',
        bio=(
            "Je suis Kouame Aka Richard, étudiant en troisième année de Computer Science, "
            "animé par une profonde curiosité pour le développement logiciel et l'intelligence artificielle. "
            "J'ai développé une expertise solide en développement web full-stack avec Django et Angular, "
            "en conception d'APIs RESTful, en modélisation de données et en développement d'ERP avec Odoo. "
            "Ma démarche : concevoir des logiciels propres, scalables et bien documentés."
        ),
        email='richard.kouame@email.com',
        telephone='+225 07 00 00 00 00',
        disponible=True,
        annees_experience=3,
        nombre_projets=10,
        localisation=loc
    )
    print(f"✅ Utilisateur: {user}")

    # ─── Réseaux Sociaux ─────────────────────────────────────────────────────
    reseaux = [
        {'plateforme': 'github', 'url': 'https://github.com/RichardKouame-400', 'icone': 'github', 'ordre': 1},
        {'plateforme': 'linkedin', 'url': 'https://linkedin.com/in/kouame-aka-richard', 'icone': 'linkedin', 'ordre': 2},
        {'plateforme': 'twitter', 'url': 'https://twitter.com/kouame_richard', 'icone': 'twitter', 'ordre': 3},
    ]
    for r in reseaux:
        ReseauSocial.objects.create(utilisateur=user, **r)
    print(f"✅ {len(reseaux)} Réseaux sociaux créés")

    # ─── Services ────────────────────────────────────────────────────────────
    services = [
        {
            'titre': 'Développement Backend',
            'description': (
                "Conception d'APIs RESTful robustes avec Django REST Framework. "
                "Modélisation de bases de données, authentification JWT, logique métier scalable "
                "et documentation automatique via Swagger/OpenAPI."
            ),
            'icone': 'backend',
            'numero': 1,
            'technologies': ['Python', 'Django', 'DRF', 'PostgreSQL', 'JWT'],
            'ordre': 1,
        },
        {
            'titre': 'Développement Frontend',
            'description': (
                "Interfaces modernes et réactives avec Angular (composants standalone). "
                "Gestion d'état avec RxJS, intégration d'APIs REST, design responsive "
                "et animations fluides avec SCSS."
            ),
            'icone': 'frontend',
            'numero': 2,
            'technologies': ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'HTML5'],
            'ordre': 2,
        },
        {
            'titre': 'ERP Odoo / Modules métier',
            'description': (
                "Développement de modules Odoo personnalisés (Python, XML, JavaScript). "
                "Gestion de parc informatique, workflows métier, tableaux de bord "
                "et automatisations avancées."
            ),
            'icone': 'autre',
            'numero': 3,
            'technologies': ['Odoo 18', 'Python', 'XML', 'JavaScript', 'PostgreSQL'],
            'ordre': 3,
        },
        {
            'titre': 'Data & Machine Learning',
            'description': (
                "Exploration et analyse de données avec pandas et matplotlib. "
                "Conception de modèles de classification et de régression avec scikit-learn. "
                "Reporting automatisé et visualisations interactives."
            ),
            'icone': 'data',
            'numero': 4,
            'technologies': ['Python', 'pandas', 'scikit-learn', 'matplotlib', 'Jupyter'],
            'ordre': 4,
        },
    ]
    for s in services:
        Service.objects.create(utilisateur=user, **s)
    print(f"✅ {len(services)} Services créés")

    # ─── Projets Réels ───────────────────────────────────────────────────────
    projets = [
        {
            'titre': 'Parc-IT — Gestion de Parc Informatique',
            'description_courte': 'Module Odoo 18.0 complet pour la gestion de parc informatique d\'entreprise.',
            'description_longue': (
                "Parc-IT est une solution complète de gestion de parc informatique développée pour Odoo 18.0. "
                "Conçue pour les responsables IT et les administrateurs système, cette application facilite "
                "le suivi, la maintenance et l'optimisation de tous les équipements informatiques. "
                "\n\nFonctionnalités : gestion des actifs (ordinateurs, serveurs, imprimantes), "
                "gestion des licences logicielles, suivi des maintenances, attribution aux utilisateurs, "
                "tableaux de bord temps réel, gestion documentaire, notifications automatiques. "
                "\n\nStack : Python 85.1%, SCSS 9.6%, JavaScript 5.3%"
            ),
            'categorie': 'odoo',
            'statut': 'termine',
            'technologies': ['Python', 'Odoo 18', 'SCSS', 'JavaScript', 'PostgreSQL', 'XML'],
            'url_github': 'https://github.com/RichardKouame-400/Parc-IT',
            'en_vedette': True,
            'ordre': 1,
        },
        {
            'titre': 'projet-school-online',
            'description_courte': 'Application de gestion scolaire en ligne avec architecture UML complète.',
            'description_longue': (
                "Projet de gestion scolaire en ligne conçu avec une architecture logicielle rigoureuse. "
                "Le projet inclut : wireframes Figma, diagramme de classes UML, diagramme d'activité, "
                "diagramme de cas d'utilisation et diagramme de séquence. "
                "\n\nFonctionnalités prévues : gestion des élèves et enseignants, emplois du temps, "
                "notes et bulletins, communication école-parents, et portail administratif."
            ),
            'categorie': 'fullstack',
            'statut': 'en_cours',
            'technologies': ['UML', 'Figma', 'Django', 'Angular', 'PostgreSQL'],
            'url_github': 'https://github.com/RichardKouame-400/pojet-school-online',
            'en_vedette': True,
            'ordre': 2,
        },
        {
            'titre': 'Plateforme Marchés Publics & Privés',
            'description_courte': 'Plateforme de dématérialisation et gestion du cycle de vie des marchés publics.',
            'description_longue': (
                "Projet universitaire (Licence) : plateforme web pour la gestion intégrale des marchés publics "
                "et privés. Répond aux problèmes de gestion manuelle des mairies et entreprises "
                "(dossiers papier, retards, manque de transparence).\n\n"
                "Modules : Authentification par profils, Gestion des appels d'offres, Attribution des marchés, "
                "Gestion des contrats, Reporting & statistiques, Consultation publique.\n\n"
                "Acteurs : Administrateurs, Responsables marchés, Comptables, Fournisseurs, Citoyens."
            ),
            'categorie': 'fullstack',
            'statut': 'en_cours',
            'technologies': ['Django', 'Angular', 'PostgreSQL', 'REST API', 'JWT', 'SSL'],
            'en_vedette': True,
            'ordre': 3,
        },
        {
            'titre': 'Portfolio Full-Stack Django/Angular',
            'description_courte': 'Portfolio personnel avec backend Django REST et frontend Angular 9 composants standalone.',
            'description_longue': (
                "Architecture complète : 52 fichiers, 6 modèles Django, 16 endpoints REST, "
                "9 composants Angular standalone, CORS configuré pour localhost:4200, "
                "script de seed automatique et administration complète."
            ),
            'categorie': 'fullstack',
            'statut': 'termine',
            'technologies': ['Django', 'Angular', 'TypeScript', 'Python', 'PostgreSQL', 'DRF'],
            'en_vedette': False,
            'ordre': 4,
        },
    ]
    for p in projets:
        Projet.objects.create(utilisateur=user, **p)
    print(f"✅ {len(projets)} Projets créés")

    # ─── Expériences ─────────────────────────────────────────────────────────
    experiences = [
        # Formation
        {
            'type': 'education',
            'titre': 'Licence 3 — Computer Science',
            'organisation': 'Université d\'Abidjan',
            'description': (
                "Algorithmique avancée, bases de données, réseaux, systèmes d'exploitation, "
                "développement logiciel, intelligence artificielle et machine learning."
            ),
            'date_debut': '2024',
            'date_fin': None,
            'lieu': 'Abidjan, CI',
            'actuel': True,
            'ordre': 6,
        },
        {
            'type': 'education',
            'titre': 'Licence 2 — Informatique',
            'organisation': 'Université d\'Abidjan',
            'description': "Structures de données, POO avec Java, développement web, SQL. Mention Bien.",
            'date_debut': '2023',
            'date_fin': '2024',
            'lieu': 'Abidjan, CI',
            'actuel': False,
            'ordre': 5,
        },
        {
            'type': 'education',
            'titre': 'Licence 1 — Informatique',
            'organisation': 'Université d\'Abidjan',
            'description': "Fondamentaux de la programmation en C et Python. Introduction aux systèmes Unix/Linux.",
            'date_debut': '2022',
            'date_fin': '2023',
            'lieu': 'Abidjan, CI',
            'actuel': False,
            'ordre': 4,
        },
        # Projets & Pro
        {
            'type': 'projet',
            'titre': 'Développement Parc-IT (Module Odoo)',
            'organisation': 'Projet Personnel',
            'description': (
                "Conception et développement d'un module Odoo 18.0 complet pour la gestion de parc informatique. "
                "Stack : Python 85%, SCSS 10%, JavaScript 5%. Publié sur GitHub."
            ),
            'date_debut': '2024',
            'date_fin': '2025',
            'technologies': ['Python', 'Odoo 18', 'SCSS', 'JavaScript'],
            'actuel': False,
            'ordre': 3,
        },
        {
            'type': 'projet',
            'titre': 'Plateforme Marchés Publics — Projet Universitaire',
            'organisation': 'Projet Académique L3',
            'description': (
                "Conception d'une plateforme numérique de gestion des marchés publics et privés. "
                "Cahier des charges complet, architecture Django/Angular, 6 modules métier."
            ),
            'date_debut': '2025',
            'technologies': ['Django', 'Angular', 'PostgreSQL'],
            'actuel': True,
            'ordre': 7,
        },
        {
            'type': 'professionnel',
            'titre': 'Développeur Web — Freelance',
            'organisation': 'Auto-entrepreneur',
            'description': "Réalisation de sites web et applications pour clients locaux. Intégration HTML/CSS/JS et maintenance.",
            'date_debut': '2024',
            'date_fin': None,
            'lieu': 'Abidjan, CI',
            'actuel': True,
            'ordre': 5,
        },
        {
            'type': 'competition',
            'titre': 'Hackathon Universitaire',
            'organisation': 'Compétition Académique',
            'description': "Résolution de problèmes algorithmiques et développement d'une application web en équipe en 48 heures.",
            'date_debut': '2023',
            'date_fin': '2023',
            'actuel': False,
            'ordre': 2,
        },
    ]
    for e in experiences:
        Experience.objects.create(utilisateur=user, **e)
    print(f"✅ {len(experiences)} Expériences créées")

    # ─── Messages de démo ────────────────────────────────────────────────────
    contacts = [
        {
            'nom': 'Marie Dupont',
            'email': 'marie.dupont@example.com',
            'sujet': 'Proposition de stage',
            'message': 'Bonjour Richard, nous cherchons un développeur Django/Angular pour un stage de 3 mois. Votre profil nous intéresse beaucoup.',
            'statut': 'nouveau',
        },
        {
            'nom': 'Jean-Paul Koné',
            'email': 'jp.kone@startup-ci.com',
            'sujet': 'Collaboration projet Odoo',
            'message': 'Salut, j\'ai vu votre module Parc-IT sur GitHub. Je travaille sur un projet Odoo similaire et cherche un collaborateur.',
            'statut': 'lu',
        },
    ]
    for c in contacts:
        PriseDeContact.objects.create(**c)
    print(f"✅ {len(contacts)} Messages de démo créés")

    print("\n🎉 Seed terminé avec succès !")
    print(f"   → Utilisateur : {user.nom_complet}")
    print(f"   → {Projet.objects.count()} projets")
    print(f"   → {Experience.objects.count()} expériences")
    print(f"   → {Service.objects.count()} services")
    print(f"   → {ReseauSocial.objects.count()} réseaux sociaux")
    print(f"   → {PriseDeContact.objects.count()} messages")


if __name__ == '__main__':
    run()
else:
    # Appelé via: python manage.py shell < api/seed.py
    run()
