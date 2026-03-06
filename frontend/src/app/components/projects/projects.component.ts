/**
 * projects.component.ts — Section Projets avec filtre par catégorie
 * Composant standalone — données depuis l'API Django
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../portfolio.service';
import { Projet, CategorieProjet, FiltreProjet } from '../../types';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects-section">
      <div class="projects-header">
        <div>
          <span class="section-label">Portfolio</span>
          <h2 class="section-title">Mes projets</h2>
        </div>
        <div class="project-filter">
          <button
            class="filter-btn"
            *ngFor="let f of filtres"
            [class.active]="filtreActif === f.value"
            (click)="setFiltre(f.value)"
          >{{ f.label }}</button>
        </div>
      </div>

      <div class="projects-grid">
        <div
          class="project-card"
          *ngFor="let projet of projetsFiltres"
          [class.hidden]="!isVisible(projet)"
        >
          <div class="project-img" [ngStyle]="getImgStyle(projet.categorie)">
            <div class="project-img-pattern"></div>
            <div class="project-img-icon">{{ projet.icone_categorie || '💡' }}</div>
            <div class="project-badge">{{ getLabelCategorie(projet.categorie) }}</div>
            <div class="project-statut" [class.termine]="projet.statut === 'termine'" [class.en_cours]="projet.statut === 'en_cours'">
              {{ projet.statut === 'en_cours' ? '🟡 En cours' : '✅ Terminé' }}
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">{{ projet.titre }}</h3>
            <p class="project-desc">{{ projet.description_courte }}</p>
            <div class="project-tech">
              <span *ngFor="let tech of projet.technologies">{{ tech }}</span>
            </div>
            <div class="project-links">
              <a *ngIf="projet.url_github" [href]="projet.url_github" target="_blank" class="project-link">
                GitHub →
              </a>
              <a *ngIf="projet.url_live" [href]="projet.url_live" target="_blank" class="project-link">
                Live →
              </a>
              <a *ngIf="projet.url_demo" [href]="projet.url_demo" target="_blank" class="project-link">
                Démo →
              </a>
            </div>
          </div>
        </div>
      </div>

      <p *ngIf="loading" class="loading-text">Chargement des projets...</p>
    </section>
  `,
  styles: [`
    .projects-section { padding: 7rem 5%; border-top: 1px solid #1e1e1e; background: #111111; }
    .projects-header {
      display: flex; align-items: flex-end; justify-content: space-between;
      margin-bottom: 4rem; flex-wrap: wrap; gap: 2rem;
    }
    .section-label {
      display: inline-flex; align-items: center; gap: .6rem;
      font-size: .72rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      color: #c8f04b; margin-bottom: 1rem; font-family: 'DM Sans', sans-serif;
    }
    .section-label::before { content: ''; display: block; width: 30px; height: 1px; background: #c8f04b; }
    .section-title {
      font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem,5vw,4.5rem);
      line-height: 1; letter-spacing: 1px; color: #f0ede6; margin: 0;
    }
    .project-filter { display: flex; gap: .5rem; flex-wrap: wrap; }
    .filter-btn {
      background: transparent; border: 1px solid #1e1e1e; color: #6b6b6b;
      font-family: 'DM Sans', sans-serif; font-size: .78rem; letter-spacing: 1px;
      text-transform: uppercase; padding: .5rem 1.2rem; border-radius: 50px;
      transition: all .3s; cursor: pointer;
    }
    .filter-btn:hover, .filter-btn.active {
      border-color: #c8f04b; color: #c8f04b; background: rgba(200,240,75,.06);
    }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(340px,1fr)); gap: 1.5rem; }
    .project-card {
      background: #080808; border: 1px solid #1e1e1e; border-radius: 12px;
      overflow: hidden; transition: border-color .3s, transform .3s, opacity .3s;
    }
    .project-card:hover { border-color: rgba(200,240,75,.3); transform: translateY(-6px); }
    .project-card.hidden { opacity: .3; transform: scale(.96); pointer-events: none; }
    .project-img {
      height: 200px; display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    .project-img-pattern { position: absolute; inset: 0; }
    .project-img-icon { font-size: 3rem; opacity: .4; position: relative; z-index: 1; }
    .project-badge {
      position: absolute; top: 1rem; right: 1rem;
      background: rgba(8,8,8,.8); border: 1px solid #1e1e1e; color: #6b6b6b;
      font-size: .7rem; letter-spacing: 1px; text-transform: uppercase;
      padding: .3rem .7rem; border-radius: 50px; backdrop-filter: blur(6px);
      font-family: 'DM Sans', sans-serif;
    }
    .project-statut {
      position: absolute; bottom: 1rem; left: 1rem;
      font-size: .68rem; letter-spacing: 1px; font-family: 'DM Sans', sans-serif;
      padding: .2rem .6rem; border-radius: 50px;
    }
    .project-statut.termine { background: rgba(75,240,75,.1); color: #4bf04b; }
    .project-statut.en_cours { background: rgba(240,200,75,.1); color: #f0c84b; }
    .project-body { padding: 1.5rem 1.8rem 2rem; }
    .project-title {
      font-family: 'DM Serif Display', serif; font-size: 1.2rem;
      color: #f0ede6; margin-bottom: .5rem;
    }
    .project-desc { font-size: .85rem; color: #6b6b6b; line-height: 1.7; margin-bottom: 1rem; font-family: 'DM Sans', sans-serif; }
    .project-tech { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1.2rem; }
    .project-tech span { font-size: .7rem; color: #c8f04b; letter-spacing: 1px; text-transform: uppercase; font-family: 'DM Sans', sans-serif; }
    .project-tech span:not(:last-child)::after { content: ' ·'; color: #1e1e1e; }
    .project-links { display: flex; gap: .8rem; }
    .project-link {
      font-size: .78rem; color: #6b6b6b; text-decoration: none; letter-spacing: 1px;
      text-transform: uppercase; padding-bottom: 2px; border-bottom: 1px solid transparent;
      transition: color .3s, border-color .3s; font-family: 'DM Sans', sans-serif;
    }
    .project-link:hover { color: #c8f04b; border-color: #c8f04b; }
    .loading-text { text-align: center; color: #6b6b6b; margin-top: 2rem; font-family: 'DM Sans', sans-serif; }
    @media(max-width:600px) { .projects-grid { grid-template-columns: 1fr; } }
  `]
})
export class ProjectsComponent implements OnInit {
  projets: Projet[] = [];
  projetsFiltres: Projet[] = [];
  filtreActif: CategorieProjet | 'all' = 'all';
  loading = false;

  filtres: FiltreProjet[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Full-Stack', value: 'fullstack' },
    { label: 'Backend', value: 'backend' },
    { label: 'Odoo / ERP', value: 'odoo' },
    { label: 'Data', value: 'data' },
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loading = true;
    this.portfolioService.getProjets().subscribe({
      next: (projets) => {
        this.projets = projets;
        this.projetsFiltres = projets;
        this.loading = false;
      },
      error: (err) => {
        console.error('API non disponible, utilisation des données de secours :', err);
        this.projets = this.getFallbackProjets();
        this.projetsFiltres = this.projets;
        this.loading = false;
      }
    });
  }

  setFiltre(valeur: CategorieProjet | 'all'): void {
    this.filtreActif = valeur;
    this.projetsFiltres = valeur === 'all'
      ? this.projets
      : this.projets.filter(p => p.categorie === valeur);
  }

  isVisible(projet: Projet): boolean {
    return this.filtreActif === 'all' || projet.categorie === this.filtreActif;
  }

  getLabelCategorie(cat: CategorieProjet | string): string {
    const labels: Record<string, string> = {
      fullstack: 'Full-Stack', 
      backend: 'Backend', 
      frontend: 'Frontend',
      data: 'Data & ML', 
      odoo: 'Odoo / ERP', 
      mobile: 'Mobile', 
      autre: 'Autre'
    };
    return labels[cat as string] || cat;
  }

  getImgStyle(cat: CategorieProjet | string): Record<string, string> {
    const styles: Record<string, string> = {
      fullstack: 'linear-gradient(135deg,#141414,#1a1a1a)',
      backend: 'linear-gradient(135deg,#141414,#1c1a14)',
      odoo: 'linear-gradient(135deg,#12141c,#1a1c28)',
      data: 'linear-gradient(135deg,#101418,#141820)',
    };
    return { background: styles[cat as string] || 'linear-gradient(135deg,#141414,#1a1a1a)' };
  }

  private getFallbackProjets(): Projet[] {
    return [
      {
        id: 1, 
        titre: 'Parc-IT — Gestion de Parc Informatique',
        description_courte: 'Module Odoo 18.0 complet pour la gestion de parc informatique d\'entreprise.',
        categorie: 'odoo', 
        statut: 'termine',
        technologies: ['Python', 'Odoo 18', 'SCSS', 'JavaScript', 'PostgreSQL'],
        url_github: 'https://github.com/RichardKouame-400/Parc-IT',
        en_vedette: true, 
        ordre: 1, 
        date_creation: '2024-01-01',
        icone_categorie: '🏢'
      },
      {
        id: 2, 
        titre: 'projet-school-online',
        description_courte: 'Application de gestion scolaire avec architecture UML complète et wireframes Figma.',
        categorie: 'fullstack', 
        statut: 'en_cours',
        technologies: ['Django', 'Angular', 'PostgreSQL', 'UML', 'Figma'],
        url_github: 'https://github.com/RichardKouame-400/pojet-school-online',
        en_vedette: true, 
        ordre: 2, 
        date_creation: '2024-06-01',
        icone_categorie: '🎓'
      },
      {
        id: 3, 
        titre: 'Plateforme Marchés Publics & Privés',
        description_courte: 'Plateforme de dématérialisation du cycle de vie des marchés publics (Projet L3).',
        categorie: 'fullstack', 
        statut: 'en_cours',
        technologies: ['Django', 'Angular', 'PostgreSQL', 'REST API', 'JWT'],
        en_vedette: true, 
        ordre: 3, 
        date_creation: '2025-01-01',
        icone_categorie: '📋'
      },
      {
        id: 4, 
        titre: 'Portfolio Django / Angular',
        description_courte: '52 fichiers, 6 modèles, 16 endpoints REST, 9 composants Angular standalone.',
        categorie: 'fullstack', 
        statut: 'termine',
        technologies: ['Django', 'Angular', 'TypeScript', 'Python', 'DRF'],
        en_vedette: false, 
        ordre: 4, 
        date_creation: '2025-02-01',
        icone_categorie: '💼'
      },
    ];
  }
}