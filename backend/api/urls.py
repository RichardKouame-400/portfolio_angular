"""
URLs API — 16 endpoints REST complets
Portfolio Kouame Aka Richard
"""

from django.urls import path
from . import views

urlpatterns = [
    # ─── Vue d'ensemble ──────────────────────────────────────────────────
    # 1.  GET  /api/
    path('', views.api_overview, name='api-overview'),

    # ─── Utilisateur (3 routes) ──────────────────────────────────────────
    # 2.  GET  /api/utilisateurs/
    # 3.  POST /api/utilisateurs/
    path('utilisateurs/', views.UtilisateurListCreateView.as_view(), name='utilisateur-list'),

    # 4.  GET    /api/utilisateurs/<id>/
    # 5.  PUT    /api/utilisateurs/<id>/
    # 6.  PATCH  /api/utilisateurs/<id>/
    # 7.  DELETE /api/utilisateurs/<id>/
    path('utilisateurs/<int:pk>/', views.UtilisateurRetrieveUpdateDestroyView.as_view(), name='utilisateur-detail'),

    # 8.  GET /api/utilisateurs/<id>/complet/  → profil avec nested
    path('utilisateurs/<int:pk>/complet/', views.utilisateur_complet, name='utilisateur-complet'),

    # ─── Projet (2 routes) ───────────────────────────────────────────────
    # 9.  GET  /api/projets/
    # 10. POST /api/projets/
    path('projets/', views.ProjetListCreateView.as_view(), name='projet-list'),

    # 11. GET/PUT/PATCH/DELETE /api/projets/<id>/
    path('projets/<int:pk>/', views.ProjetRetrieveUpdateDestroyView.as_view(), name='projet-detail'),

    # ─── Expérience (2 routes) ───────────────────────────────────────────
    # 12. GET/POST /api/experiences/
    path('experiences/', views.ExperienceListCreateView.as_view(), name='experience-list'),

    # 13. GET/PUT/PATCH/DELETE /api/experiences/<id>/
    path('experiences/<int:pk>/', views.ExperienceRetrieveUpdateDestroyView.as_view(), name='experience-detail'),

    # ─── Service (2 routes) ──────────────────────────────────────────────
    # 14. GET/POST /api/services/
    path('services/', views.ServiceListCreateView.as_view(), name='service-list'),

    # 15. GET/PUT/PATCH/DELETE /api/services/<id>/
    path('services/<int:pk>/', views.ServiceRetrieveUpdateDestroyView.as_view(), name='service-detail'),

    # ─── Prise de Contact (2 routes) ─────────────────────────────────────
    # 16. GET/POST /api/contacts/
    path('contacts/', views.PriseDeContactListCreateView.as_view(), name='contact-list'),

    # 17. GET/PUT/PATCH/DELETE /api/contacts/<id>/
    path('contacts/<int:pk>/', views.PriseDeContactRetrieveUpdateDestroyView.as_view(), name='contact-detail'),

    # ─── Réseau Social (2 routes) ────────────────────────────────────────
    # 18. GET/POST /api/reseaux/
    path('reseaux/', views.ReseauSocialListCreateView.as_view(), name='reseau-list'),

    # 19. GET/PUT/PATCH/DELETE /api/reseaux/<id>/
    path('reseaux/<int:pk>/', views.ReseauSocialRetrieveUpdateDestroyView.as_view(), name='reseau-detail'),

    # ─── Localisation (2 routes) ─────────────────────────────────────────
    # 20. GET/POST /api/localisations/
    path('localisations/', views.LocalisationListCreateView.as_view(), name='localisation-list'),

    # 21. GET/PUT/PATCH/DELETE /api/localisations/<id>/
    path('localisations/<int:pk>/', views.LocalisationRetrieveUpdateDestroyView.as_view(), name='localisation-detail'),
]
