"""
Admin Django — Portfolio Kouame Aka Richard
Tous les modèles enregistrés avec configuration avancée
"""

from django.contrib import admin
from .models import (
    Utilisateur, Projet, Experience, Service,
    PriseDeContact, ReseauSocial, Localisation
)


@admin.register(Localisation)
class LocalisationAdmin(admin.ModelAdmin):
    list_display = ['ville', 'pays', 'region']
    search_fields = ['ville', 'pays']


class ReseauSocialInline(admin.TabularInline):
    model = ReseauSocial
    extra = 1
    fields = ['plateforme', 'url', 'icone', 'ordre', 'actif']


class ServiceInline(admin.TabularInline):
    model = Service
    extra = 1
    fields = ['titre', 'icone', 'ordre', 'actif']


class ProjetInline(admin.TabularInline):
    model = Projet
    extra = 1
    fields = ['titre', 'categorie', 'statut', 'en_vedette', 'ordre']


class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 1
    fields = ['type', 'titre', 'organisation', 'date_debut', 'actuel', 'ordre']


@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
    list_display = ['nom_complet', 'email', 'titre', 'disponible', 'annees_experience']
    list_filter = ['disponible']
    search_fields = ['prenom', 'nom', 'email']
    inlines = [ReseauSocialInline, ServiceInline, ProjetInline, ExperienceInline]
    fieldsets = (
        ('Identité', {
            'fields': ('prenom', 'nom', 'titre', 'sous_titre', 'bio', 'photo', 'cv')
        }),
        ('Contact', {
            'fields': ('email', 'telephone', 'localisation')
        }),
        ('Statistiques', {
            'fields': ('disponible', 'annees_experience', 'nombre_projets')
        }),
    )


@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ['titre', 'categorie', 'statut', 'en_vedette', 'ordre', 'date_creation']
    list_filter = ['categorie', 'statut', 'en_vedette']
    search_fields = ['titre', 'description_courte']
    list_editable = ['ordre', 'en_vedette', 'statut']
    ordering = ['ordre', '-date_creation']
    fieldsets = (
        ('Informations', {
            'fields': ('titre', 'description_courte', 'description_longue', 'image')
        }),
        ('Classement', {
            'fields': ('categorie', 'statut', 'technologies', 'ordre', 'en_vedette')
        }),
        ('Liens', {
            'fields': ('url_github', 'url_live', 'url_demo')
        }),
        ('Dates', {
            'fields': ('date_debut', 'date_fin')
        }),
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['titre', 'organisation', 'type', 'date_debut', 'actuel', 'ordre']
    list_filter = ['type', 'actuel']
    search_fields = ['titre', 'organisation']
    list_editable = ['ordre', 'actuel']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['titre', 'icone', 'numero', 'ordre', 'actif']
    list_filter = ['actif']
    list_editable = ['ordre', 'actif']


@admin.register(PriseDeContact)
class PriseDeContactAdmin(admin.ModelAdmin):
    list_display = ['nom', 'email', 'sujet', 'statut', 'date_envoi']
    list_filter = ['statut']
    search_fields = ['nom', 'email', 'sujet']
    list_editable = ['statut']
    readonly_fields = ['date_envoi', 'date_lecture', 'ip_address']
    ordering = ['-date_envoi']

    def has_add_permission(self, request):
        return False  # Les messages ne se créent que via l'API


@admin.register(ReseauSocial)
class ReseauSocialAdmin(admin.ModelAdmin):
    list_display = ['plateforme', 'utilisateur', 'url', 'ordre', 'actif']
    list_filter = ['plateforme', 'actif']
    list_editable = ['ordre', 'actif']
