/**
 * portfolio.service.ts — Service Angular principal
 * HttpClient vers tous les endpoints Django REST
 * Portfolio Kouame Aka Richard
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import {
  Utilisateur, UtilisateurList, Projet, Experience,
  Service, PriseDeContact, PriseDeContactResponse,
  ReseauSocial, Localisation, CategorieProjet
} from './types';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private readonly API_BASE = 'http://localhost:8000/api';

  // État réactif du profil chargé
  private profilSubject = new BehaviorSubject<Utilisateur | null>(null);
  profil$ = this.profilSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ─── Utilisateur ───────────────────────────────────────────────────────────

  /** GET /api/utilisateurs/ — Liste des utilisateurs */
  getUtilisateurs(): Observable<UtilisateurList[]> {
    return this.http.get<UtilisateurList[]>(`${this.API_BASE}/utilisateurs/`);
  }

  /** GET /api/utilisateurs/<id>/ */
  getUtilisateur(id: number): Observable<UtilisateurList> {
    return this.http.get<UtilisateurList>(`${this.API_BASE}/utilisateurs/${id}/`);
  }

  /** GET /api/utilisateurs/<id>/complet/ — Profil complet avec nested */
  getUtilisateurComplet(id: number = 1): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.API_BASE}/utilisateurs/${id}/complet/`).pipe(
      tap(profil => this.profilSubject.next(profil))
    );
  }

  /** POST /api/utilisateurs/ */
  creerUtilisateur(data: Partial<UtilisateurList>): Observable<UtilisateurList> {
    return this.http.post<UtilisateurList>(`${this.API_BASE}/utilisateurs/`, data);
  }

  /** PATCH /api/utilisateurs/<id>/ */
  modifierUtilisateur(id: number, data: Partial<UtilisateurList>): Observable<UtilisateurList> {
    return this.http.patch<UtilisateurList>(`${this.API_BASE}/utilisateurs/${id}/`, data);
  }

  /** DELETE /api/utilisateurs/<id>/ */
  supprimerUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/utilisateurs/${id}/`);
  }

  // ─── Projets ───────────────────────────────────────────────────────────────

  /** GET /api/projets/ avec filtres optionnels */
  getProjets(categorie?: CategorieProjet | 'all', vedette?: boolean): Observable<Projet[]> {
    let params = new HttpParams();
    if (categorie && categorie !== 'all') {
      params = params.set('categorie', categorie);
    }
    if (vedette !== undefined) {
      params = params.set('vedette', String(vedette));
    }
    return this.http.get<Projet[]>(`${this.API_BASE}/projets/`, { params });
  }

  /** GET /api/projets/<id>/ */
  getProjet(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.API_BASE}/projets/${id}/`);
  }

  /** POST /api/projets/ */
  creerProjet(data: Partial<Projet>): Observable<Projet> {
    return this.http.post<Projet>(`${this.API_BASE}/projets/`, data);
  }

  /** PUT /api/projets/<id>/ */
  modifierProjet(id: number, data: Partial<Projet>): Observable<Projet> {
    return this.http.put<Projet>(`${this.API_BASE}/projets/${id}/`, data);
  }

  /** DELETE /api/projets/<id>/ */
  supprimerProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/projets/${id}/`);
  }

  // ─── Expériences ───────────────────────────────────────────────────────────

  /** GET /api/experiences/?type=education|professionnel... */
  getExperiences(type?: string): Observable<Experience[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<Experience[]>(`${this.API_BASE}/experiences/`, { params });
  }

  /** GET /api/experiences/<id>/ */
  getExperience(id: number): Observable<Experience> {
    return this.http.get<Experience>(`${this.API_BASE}/experiences/${id}/`);
  }

  /** POST /api/experiences/ */
  creerExperience(data: Partial<Experience>): Observable<Experience> {
    return this.http.post<Experience>(`${this.API_BASE}/experiences/`, data);
  }

  /** PATCH /api/experiences/<id>/ */
  modifierExperience(id: number, data: Partial<Experience>): Observable<Experience> {
    return this.http.patch<Experience>(`${this.API_BASE}/experiences/${id}/`, data);
  }

  /** DELETE /api/experiences/<id>/ */
  supprimerExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/experiences/${id}/`);
  }

  // ─── Services ──────────────────────────────────────────────────────────────

  /** GET /api/services/ */
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.API_BASE}/services/`);
  }

  /** GET /api/services/<id>/ */
  getService(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.API_BASE}/services/${id}/`);
  }

  /** POST /api/services/ */
  creerService(data: Partial<Service>): Observable<Service> {
    return this.http.post<Service>(`${this.API_BASE}/services/`, data);
  }

  /** PUT /api/services/<id>/ */
  modifierService(id: number, data: Partial<Service>): Observable<Service> {
    return this.http.put<Service>(`${this.API_BASE}/services/${id}/`, data);
  }

  /** DELETE /api/services/<id>/ */
  supprimerService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/services/${id}/`);
  }

  // ─── Prise de Contact ──────────────────────────────────────────────────────

  /** POST /api/contacts/ — Envoyer un message */
  envoyerContact(data: PriseDeContact): Observable<PriseDeContactResponse> {
    return this.http.post<PriseDeContactResponse>(`${this.API_BASE}/contacts/`, data);
  }

  /** GET /api/contacts/ */
  getContacts(): Observable<PriseDeContact[]> {
    return this.http.get<PriseDeContact[]>(`${this.API_BASE}/contacts/`);
  }

  /** DELETE /api/contacts/<id>/ */
  supprimerContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/contacts/${id}/`);
  }

  // ─── Réseaux Sociaux ───────────────────────────────────────────────────────

  /** GET /api/reseaux/ */
  getReseaux(): Observable<ReseauSocial[]> {
    return this.http.get<ReseauSocial[]>(`${this.API_BASE}/reseaux/`);
  }

  /** POST /api/reseaux/ */
  creerReseau(data: Partial<ReseauSocial>): Observable<ReseauSocial> {
    return this.http.post<ReseauSocial>(`${this.API_BASE}/reseaux/`, data);
  }

  /** DELETE /api/reseaux/<id>/ */
  supprimerReseau(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/reseaux/${id}/`);
  }

  // ─── Localisation ──────────────────────────────────────────────────────────

  /** GET /api/localisations/ */
  getLocalisations(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(`${this.API_BASE}/localisations/`);
  }

  /** PUT /api/localisations/<id>/ */
  modifierLocalisation(id: number, data: Partial<Localisation>): Observable<Localisation> {
    return this.http.put<Localisation>(`${this.API_BASE}/localisations/${id}/`, data);
  }
}
