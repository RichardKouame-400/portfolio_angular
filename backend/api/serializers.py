"""
Serializers Django REST Framework — Portfolio Kouame Aka Richard
Relations nested complètes
"""

from rest_framework import serializers
from .models import (
    Utilisateur, Projet, Experience, Service,
    PriseDeContact, ReseauSocial, Localisation
)


class LocalisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localisation
        fields = '__all__'


class ReseauSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReseauSocial
        fields = ['id', 'plateforme', 'url', 'icone', 'ordre', 'actif']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ProjetSerializer(serializers.ModelSerializer):
    # Calcul dynamique de l'emoji/icône selon la catégorie
    icone_categorie = serializers.SerializerMethodField()
    periode_affichage = serializers.SerializerMethodField()

    class Meta:
        model = Projet
        fields = '__all__'

    def get_icone_categorie(self, obj):
        icons = {
            'fullstack': '💼',
            'backend': '🔗',
            'frontend': '🎨',
            'data': '📈',
            'odoo': '🏢',
            'mobile': '📱',
            'autre': '💡',
        }
        return icons.get(obj.categorie, '💡')

    def get_periode_affichage(self, obj):
        if obj.date_debut and obj.date_fin:
            return f'{obj.date_debut.year} — {obj.date_fin.year}'
        elif obj.date_debut:
            return f'{obj.date_debut.year} — Présent'
        return None


class ExperienceSerializer(serializers.ModelSerializer):
    periode = serializers.ReadOnlyField()

    class Meta:
        model = Experience
        fields = '__all__'


class PriseDeContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriseDeContact
        fields = ['id', 'nom', 'email', 'sujet', 'message', 'date_envoi']
        read_only_fields = ['date_envoi']

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError('Adresse email invalide.')
        return value.lower()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Le message doit contenir au moins 10 caractères.')
        return value


# ─── Serializer complet de l'Utilisateur avec relations nested ───────────────

class UtilisateurDetailSerializer(serializers.ModelSerializer):
    """Serializer complet avec toutes les relations imbriquées"""
    localisation = LocalisationSerializer(read_only=True)
    reseaux_sociaux = ReseauSocialSerializer(many=True, read_only=True)
    services = ServiceSerializer(many=True, read_only=True)
    projets = ProjetSerializer(many=True, read_only=True)
    experiences = ExperienceSerializer(many=True, read_only=True)
    nom_complet = serializers.ReadOnlyField()

    class Meta:
        model = Utilisateur
        fields = [
            'id', 'prenom', 'nom', 'nom_complet', 'titre', 'sous_titre',
            'bio', 'email', 'telephone', 'photo', 'cv',
            'disponible', 'annees_experience', 'nombre_projets',
            'localisation', 'reseaux_sociaux', 'services',
            'projets', 'experiences',
            'date_creation', 'date_modification',
        ]


class UtilisateurListSerializer(serializers.ModelSerializer):
    """Serializer léger pour la liste"""
    localisation = LocalisationSerializer(read_only=True)
    nom_complet = serializers.ReadOnlyField()

    class Meta:
        model = Utilisateur
        fields = [
            'id', 'prenom', 'nom', 'nom_complet', 'titre',
            'email', 'disponible', 'localisation', 'photo',
        ]