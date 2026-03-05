"""
Views Django REST Framework — Portfolio Kouame Aka Richard
ListCreateView + RetrieveUpdateDestroyAPIView pour chaque modèle
"""

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

from .models import (
    Utilisateur, Projet, Experience, Service,
    PriseDeContact, ReseauSocial, Localisation
)
from .serializers import (
    UtilisateurListSerializer, UtilisateurDetailSerializer,
    ProjetSerializer, ExperienceSerializer, ServiceSerializer,
    PriseDeContactSerializer, ReseauSocialSerializer, LocalisationSerializer
)


# ─── Vue d'ensemble de l'API ─────────────────────────────────────────────────

@api_view(['GET'])
def api_overview(request):
    endpoints = {
        'description': 'API Portfolio — Kouame Aka Richard',
        'version': '1.0.0',
        'endpoints': {
            'utilisateurs': '/api/utilisateurs/',
            'utilisateur_detail': '/api/utilisateurs/<id>/',
            'profil_complet': '/api/utilisateurs/<id>/complet/',
            'projets': '/api/projets/',
            'projet_detail': '/api/projets/<id>/',
            'experiences': '/api/experiences/',
            'experience_detail': '/api/experiences/<id>/',
            'services': '/api/services/',
            'service_detail': '/api/services/<id>/',
            'contacts': '/api/contacts/',
            'contact_detail': '/api/contacts/<id>/',
            'reseaux': '/api/reseaux/',
            'reseau_detail': '/api/reseaux/<id>/',
            'localisations': '/api/localisations/',
            'localisation_detail': '/api/localisations/<id>/',
        }
    }
    return Response(endpoints)


# ─── Utilisateur ─────────────────────────────────────────────────────────────

class UtilisateurListCreateView(generics.ListCreateAPIView):
    """GET /api/utilisateurs/ — POST /api/utilisateurs/"""
    queryset = Utilisateur.objects.select_related('localisation').all()
    serializer_class = UtilisateurListSerializer


class UtilisateurRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/utilisateurs/<id>/"""
    queryset = Utilisateur.objects.select_related('localisation').all()
    serializer_class = UtilisateurListSerializer


@api_view(['GET'])
def utilisateur_complet(request, pk):
    """GET /api/utilisateurs/<id>/complet/ — Profil complet avec toutes les relations"""
    utilisateur = get_object_or_404(
        Utilisateur.objects.select_related('localisation').prefetch_related(
            'reseaux_sociaux', 'services', 'projets', 'experiences'
        ),
        pk=pk
    )
    serializer = UtilisateurDetailSerializer(utilisateur, context={'request': request})
    return Response(serializer.data)


# ─── Projet ──────────────────────────────────────────────────────────────────

class ProjetListCreateView(generics.ListCreateAPIView):
    """GET /api/projets/ — POST /api/projets/"""
    queryset = Projet.objects.all().order_by('ordre', '-date_creation')
    serializer_class = ProjetSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        categorie = self.request.query_params.get('categorie')
        vedette = self.request.query_params.get('vedette')
        if categorie:
            queryset = queryset.filter(categorie=categorie)
        if vedette == 'true':
            queryset = queryset.filter(en_vedette=True)
        return queryset


class ProjetRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/projets/<id>/"""
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer


# ─── Expérience ──────────────────────────────────────────────────────────────

class ExperienceListCreateView(generics.ListCreateAPIView):
    """GET /api/experiences/ — POST /api/experiences/"""
    queryset = Experience.objects.all().order_by('-ordre')
    serializer_class = ExperienceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        type_exp = self.request.query_params.get('type')
        if type_exp:
            queryset = queryset.filter(type=type_exp)
        return queryset


class ExperienceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/experiences/<id>/"""
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


# ─── Service ─────────────────────────────────────────────────────────────────

class ServiceListCreateView(generics.ListCreateAPIView):
    """GET /api/services/ — POST /api/services/"""
    queryset = Service.objects.filter(actif=True).order_by('ordre')
    serializer_class = ServiceSerializer


class ServiceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/services/<id>/"""
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


# ─── Prise de Contact ────────────────────────────────────────────────────────

class PriseDeContactListCreateView(generics.ListCreateAPIView):
    """GET /api/contacts/ — POST /api/contacts/"""
    queryset = PriseDeContact.objects.all()
    serializer_class = PriseDeContactSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Capturer l'IP
        ip = request.META.get('REMOTE_ADDR')
        serializer.save(ip_address=ip)
        return Response(
            {'message': 'Message envoyé avec succès. Merci !', 'data': serializer.data},
            status=status.HTTP_201_CREATED
        )


class PriseDeContactRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/contacts/<id>/"""
    queryset = PriseDeContact.objects.all()
    serializer_class = PriseDeContactSerializer


# ─── Réseau Social ───────────────────────────────────────────────────────────

class ReseauSocialListCreateView(generics.ListCreateAPIView):
    """GET /api/reseaux/ — POST /api/reseaux/"""
    queryset = ReseauSocial.objects.filter(actif=True).order_by('ordre')
    serializer_class = ReseauSocialSerializer


class ReseauSocialRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/reseaux/<id>/"""
    queryset = ReseauSocial.objects.all()
    serializer_class = ReseauSocialSerializer


# ─── Localisation ────────────────────────────────────────────────────────────

class LocalisationListCreateView(generics.ListCreateAPIView):
    """GET /api/localisations/ — POST /api/localisations/"""
    queryset = Localisation.objects.all()
    serializer_class = LocalisationSerializer


class LocalisationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """GET/PUT/PATCH/DELETE /api/localisations/<id>/"""
    queryset = Localisation.objects.all()
    serializer_class = LocalisationSerializer
