/**
 * types.ts — Interfaces TypeScript alignées avec les modèles Django
 * Portfolio Kouame Aka Richard
 */

// ─── Localisation ─────────────────────────────────────────────────────────────
export interface Localisation {
  id: number;
  ville: string;
  pays: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
}

// ─── Réseau Social ────────────────────────────────────────────────────────────
export type Plateforme = 'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' | 'portfolio' | 'autre';

export interface ReseauSocial {
  id: number;
  plateforme: Plateforme;
  url: string;
  icone?: string;
  ordre: number;
  actif: boolean;
}

// ─── Service ──────────────────────────────────────────────────────────────────
export type IconeService = 'backend' | 'frontend' | 'data' | 'security' | 'devops' | 'mobile' | 'autre';

export interface Service {
  id: number;
  titre: string;
  description: string;
  icone: IconeService;
  numero: number;
  technologies: string[];
  ordre: number;
  actif: boolean;
  utilisateur?: number;
}

// ─── Projet ───────────────────────────────────────────────────────────────────
export type CategorieProjet = 'fullstack' | 'backend' | 'frontend' | 'data' | 'odoo' | 'mobile' | 'autre';
export type StatutProjet = 'en_cours' | 'termine' | 'archive';

export interface Projet {
  id: number;
  titre: string;
  description_courte: string;
  description_longue?: string;
  categorie: CategorieProjet;
  statut: StatutProjet;
  technologies: string[];
  image?: string;
  url_github?: string;
  url_live?: string;
  url_demo?: string;
  en_vedette: boolean;
  ordre: number;
  date_debut?: string;
  date_fin?: string;
  utilisateur?: number;
  date_creation: string;
  // Champs calculés par le serializer
  icone_categorie?: string;
  periode_affichage?: string;
}

// ─── Expérience ───────────────────────────────────────────────────────────────
export type TypeExperience = 'education' | 'professionnel' | 'projet' | 'competition' | 'certification';

export interface Experience {
  id: number;
  type: TypeExperience;
  titre: string;
  organisation: string;
  description: string;
  date_debut: string;
  date_fin?: string;
  lieu?: string;
  technologies: string[];
  ordre: number;
  actuel: boolean;
  utilisateur?: number;
  // Champ calculé
  periode?: string;
}

// ─── Prise de Contact ─────────────────────────────────────────────────────────
export interface PriseDeContact {
  id?: number;
  nom: string;
  email: string;
  sujet?: string;
  message: string;
  date_envoi?: string;
}

export interface PriseDeContactResponse {
  message: string;
  data: PriseDeContact;
}

// ─── Utilisateur ──────────────────────────────────────────────────────────────
export interface UtilisateurList {
  id: number;
  prenom: string;
  nom: string;
  nom_complet: string;
  titre: string;
  email: string;
  disponible: boolean;
  localisation?: Localisation;
  photo?: string;
}

export interface Utilisateur extends UtilisateurList {
  sous_titre?: string;
  bio: string;
  telephone?: string;
  cv?: string;
  annees_experience: number;
  nombre_projets: number;
  reseaux_sociaux: ReseauSocial[];
  services: Service[];
  projets: Projet[];
  experiences: Experience[];
  date_creation: string;
  date_modification: string;
}

// ─── API Response generique ───────────────────────────────────────────────────
export interface ApiResponse<T> {
  count?: number;
  results?: T[];
  data?: T;
}

// ─── Statistiques du profil ───────────────────────────────────────────────────
export interface StatProfil {
  label: string;
  valeur: string | number;
  icone?: string;
}

// ─── Skill (compétence avec niveau) ──────────────────────────────────────────
export interface Skill {
  nom: string;
  niveau: number;   // 0 à 100
  icone: string;
  categorie: string;
}

// ─── Filtre projet ────────────────────────────────────────────────────────────
export interface FiltreProjet {
  label: string;
  value: CategorieProjet | 'all';
}
