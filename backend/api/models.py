"""
Modèles Django — Portfolio Kouame Aka Richard
6 modèles : Utilisateur, Projet, Experience, Service, PriseDeContact, ReseauSocial, Localisation
"""

from django.db import models


class Localisation(models.Model):
    """Localisation géographique de l'utilisateur"""
    ville = models.CharField(max_length=100, default='Abidjan')
    pays = models.CharField(max_length=100, default='Côte d\'Ivoire')
    region = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    google_maps_url = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = 'Localisation'
        verbose_name_plural = 'Localisations'

    def __str__(self):
        return f'{self.ville}, {self.pays}'


class Utilisateur(models.Model):
    """Profil principal du portfolio"""
    prenom = models.CharField(max_length=100)
    nom = models.CharField(max_length=100)
    titre = models.CharField(max_length=200)
    sous_titre = models.CharField(max_length=300, blank=True, null=True)
    bio = models.TextField()
    email = models.EmailField(unique=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    photo = models.ImageField(upload_to='profil/', blank=True, null=True)
    cv = models.FileField(upload_to='cv/', blank=True, null=True)
    disponible = models.BooleanField(default=True)
    annees_experience = models.PositiveIntegerField(default=3)
    nombre_projets = models.PositiveIntegerField(default=10)
    localisation = models.OneToOneField(
        Localisation, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='utilisateur'
    )
    date_creation = models.DateTimeField(auto_now_add=True)
    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Utilisateur'
        verbose_name_plural = 'Utilisateurs'

    def __str__(self):
        return f'{self.prenom} {self.nom}'

    @property
    def nom_complet(self):
        return f'{self.prenom} {self.nom}'


class ReseauSocial(models.Model):
    """Réseaux sociaux liés au profil"""
    PLATEFORME_CHOICES = [
        ('github', 'GitHub'),
        ('linkedin', 'LinkedIn'),
        ('twitter', 'Twitter / X'),
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('portfolio', 'Portfolio'),
        ('autre', 'Autre'),
    ]
    utilisateur = models.ForeignKey(
        Utilisateur, on_delete=models.CASCADE, related_name='reseaux_sociaux'
    )
    plateforme = models.CharField(max_length=50, choices=PLATEFORME_CHOICES)
    url = models.URLField()
    icone = models.CharField(max_length=100, blank=True, null=True, help_text='Classe CSS ou nom d\'icône')
    ordre = models.PositiveIntegerField(default=0)
    actif = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Réseau Social'
        verbose_name_plural = 'Réseaux Sociaux'
        ordering = ['ordre']

    def __str__(self):
        return f'{self.plateforme} — {self.utilisateur}'


class Service(models.Model):
    """Services proposés par l'utilisateur"""
    ICONE_CHOICES = [
        ('backend', '⚙️'),
        ('frontend', '🎨'),
        ('data', '📊'),
        ('security', '🔒'),
        ('devops', '🐳'),
        ('mobile', '📱'),
        ('autre', '💡'),
    ]
    titre = models.CharField(max_length=150)
    description = models.TextField()
    icone = models.CharField(max_length=50, choices=ICONE_CHOICES, default='autre')
    numero = models.PositiveIntegerField(default=1)
    technologies = models.JSONField(default=list, blank=True)
    ordre = models.PositiveIntegerField(default=0)
    actif = models.BooleanField(default=True)
    utilisateur = models.ForeignKey(
        Utilisateur, on_delete=models.CASCADE, related_name='services', null=True, blank=True
    )

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        ordering = ['ordre']

    def __str__(self):
        return self.titre


class Projet(models.Model):
    """Projets du portfolio"""
    CATEGORIE_CHOICES = [
        ('fullstack', 'Full-Stack'),
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('data', 'Data & ML'),
        ('odoo', 'Odoo / ERP'),
        ('mobile', 'Mobile'),
        ('autre', 'Autre'),
    ]
    STATUT_CHOICES = [
        ('en_cours', 'En cours'),
        ('termine', 'Terminé'),
        ('archive', 'Archivé'),
    ]
    titre = models.CharField(max_length=200)
    description_courte = models.CharField(max_length=300)
    description_longue = models.TextField(blank=True, null=True)
    categorie = models.CharField(max_length=50, choices=CATEGORIE_CHOICES, default='fullstack')
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='termine')
    technologies = models.JSONField(default=list, help_text='Liste des technologies utilisées')
    image = models.ImageField(upload_to='projets/', blank=True, null=True)
    url_github = models.URLField(blank=True, null=True)
    url_live = models.URLField(blank=True, null=True)
    url_demo = models.URLField(blank=True, null=True)
    en_vedette = models.BooleanField(default=False)
    ordre = models.PositiveIntegerField(default=0)
    date_debut = models.DateField(null=True, blank=True)
    date_fin = models.DateField(null=True, blank=True)
    utilisateur = models.ForeignKey(
        Utilisateur, on_delete=models.CASCADE, related_name='projets', null=True, blank=True
    )
    date_creation = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Projet'
        verbose_name_plural = 'Projets'
        ordering = ['ordre', '-date_creation']

    def __str__(self):
        return self.titre


class Experience(models.Model):
    """Expériences professionnelles et académiques"""
    TYPE_CHOICES = [
        ('education', 'Formation'),
        ('professionnel', 'Professionnel'),
        ('projet', 'Projet'),
        ('competition', 'Compétition'),
        ('certification', 'Certification'),
    ]
    type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='professionnel')
    titre = models.CharField(max_length=200)
    organisation = models.CharField(max_length=200)
    description = models.TextField()
    date_debut = models.CharField(max_length=50)      # "2024" ou "2024-09"
    date_fin = models.CharField(max_length=50, blank=True, null=True)  # null = "Présent"
    lieu = models.CharField(max_length=150, blank=True, null=True)
    technologies = models.JSONField(default=list, blank=True)
    ordre = models.PositiveIntegerField(default=0)
    actuel = models.BooleanField(default=False, help_text='Expérience en cours')
    utilisateur = models.ForeignKey(
        Utilisateur, on_delete=models.CASCADE, related_name='experiences', null=True, blank=True
    )

    class Meta:
        verbose_name = 'Expérience'
        verbose_name_plural = 'Expériences'
        ordering = ['-ordre']

    def __str__(self):
        return f'{self.titre} — {self.organisation}'

    @property
    def periode(self):
        fin = 'Présent' if self.actuel or not self.date_fin else self.date_fin
        return f'{self.date_debut} — {fin}'


class PriseDeContact(models.Model):
    """Messages reçus via le formulaire de contact"""
    STATUT_CHOICES = [
        ('nouveau', 'Nouveau'),
        ('lu', 'Lu'),
        ('repondu', 'Répondu'),
        ('archive', 'Archivé'),
    ]
    nom = models.CharField(max_length=150)
    email = models.EmailField()
    sujet = models.CharField(max_length=250, blank=True, null=True)
    message = models.TextField()
    statut = models.CharField(max_length=20, choices=STATUT_CHOICES, default='nouveau')
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    date_envoi = models.DateTimeField(auto_now_add=True)
    date_lecture = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Prise de Contact'
        verbose_name_plural = 'Prises de Contact'
        ordering = ['-date_envoi']

    def __str__(self):
        return f'[{self.statut.upper()}] {self.nom} — {self.sujet or "Sans sujet"}'
