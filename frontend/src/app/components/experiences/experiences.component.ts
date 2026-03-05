/**
 * experiences.component.ts — Section Parcours (Formation & Expériences)
 * Composant standalone — données depuis l'API Django
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../portfolio.service';
import { Experience } from '../../types';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="exp-section">
      <div class="exp-intro">
        <span class="section-label">Parcours</span>
        <h2 class="section-title">Formation & Expérience</h2>
      </div>
      <div class="exp-grid">
        <!-- Formation -->
        <div class="exp-column">
          <div class="column-title">🎓 Formation</div>
          <div class="timeline">
            <div class="timeline-item" *ngFor="let exp of formations">
              <div class="timeline-date">
                {{ exp.date_debut }}{{ exp.actuel ? ' — Présent' : (exp.date_fin ? ' — ' + exp.date_fin : '') }}
              </div>
              <div class="timeline-title">{{ exp.titre }}</div>
              <div class="timeline-org">{{ exp.organisation }}</div>
              <div class="timeline-desc">{{ exp.description }}</div>
            </div>
          </div>
        </div>

        <!-- Expériences pro & projets -->
        <div class="exp-column">
          <div class="column-title">💼 Expériences</div>
          <div class="timeline">
            <div class="timeline-item" *ngFor="let exp of professionnels">
              <div class="timeline-date">
                {{ exp.date_debut }}{{ exp.actuel ? ' — Présent' : (exp.date_fin ? ' — ' + exp.date_fin : '') }}
              </div>
              <div class="timeline-title">{{ exp.titre }}</div>
              <div class="timeline-org">{{ exp.organisation }}</div>
              <div class="timeline-desc">{{ exp.description }}</div>
              <div class="timeline-tags" *ngIf="exp.technologies?.length">
                <span *ngFor="let t of exp.technologies">{{ t }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .exp-section { padding: 7rem 5%; border-top: 1px solid #1e1e1e; background: #080808; }
    .exp-intro { margin-bottom: 4rem; }
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
    .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
    .column-title {
      font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; letter-spacing: 2px;
      color: #6b6b6b; text-transform: uppercase; margin-bottom: 2.5rem;
      padding-bottom: 1rem; border-bottom: 1px solid #1e1e1e;
    }
    .timeline { position: relative; }
    .timeline::before {
      content: ''; position: absolute; left: 0; top: 0; bottom: 0;
      width: 1px; background: #1e1e1e;
    }
    .timeline-item { padding-left: 2rem; padding-bottom: 2.5rem; position: relative; }
    .timeline-item::before {
      content: ''; position: absolute; left: -4px; top: 5px;
      width: 9px; height: 9px; border-radius: 50%; background: #c8f04b;
      border: 2px solid #080808; box-shadow: 0 0 0 3px rgba(200,240,75,.15);
      transition: box-shadow .3s;
    }
    .timeline-item:hover::before { box-shadow: 0 0 0 6px rgba(200,240,75,.15); }
    .timeline-date {
      font-size: .72rem; color: #c8f04b; letter-spacing: 2px;
      text-transform: uppercase; margin-bottom: .4rem; font-family: 'DM Sans', sans-serif;
    }
    .timeline-title { font-weight: 600; font-size: 1rem; margin-bottom: .2rem; color: #f0ede6; font-family: 'DM Sans', sans-serif; }
    .timeline-org { font-size: .82rem; color: #6b6b6b; margin-bottom: .6rem; font-style: italic; font-family: 'DM Sans', sans-serif; }
    .timeline-desc { font-size: .85rem; color: #6b6b6b; line-height: 1.7; font-family: 'DM Sans', sans-serif; }
    .timeline-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .8rem; }
    .timeline-tags span {
      font-size: .68rem; color: #c8f04b; letter-spacing: 1px; text-transform: uppercase;
      font-family: 'DM Sans', sans-serif; background: rgba(200,240,75,.06);
      border: 1px solid rgba(200,240,75,.15); padding: .2rem .5rem; border-radius: 3px;
    }
    @media(max-width:900px) { .exp-grid { grid-template-columns:1fr; gap:3rem; } }
  `]
})
export class ExperiencesComponent implements OnInit {
  formations: Experience[] = [];
  professionnels: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getExperiences('education').subscribe({
      next: f => this.formations = f,
      error: () => this.formations = this.getFallbackFormations()
    });

    this.portfolioService.getExperiences('professionnel').subscribe({
      next: p => {
        // Ajouter aussi les projets et compétitions
        this.portfolioService.getExperiences('projet').subscribe({
          next: proj => {
            this.portfolioService.getExperiences('competition').subscribe({
              next: comp => this.professionnels = [...p, ...proj, ...comp].sort((a, b) => b.ordre - a.ordre),
              error: () => this.professionnels = [...p, ...proj]
            });
          },
          error: () => this.professionnels = p
        });
      },
      error: () => this.professionnels = this.getFallbackPros()
    });
  }

  private getFallbackFormations(): Experience[] {
    return [
      { id:1, type:'education', titre:'Licence 3 — Computer Science', organisation:"Université d'Abidjan", description:"Algorithmique avancée, bases de données, réseaux, systèmes d'exploitation, développement logiciel et IA.", date_debut:'2024', actuel:true, technologies:[], ordre:6 },
      { id:2, type:'education', titre:'Licence 2 — Informatique', organisation:"Université d'Abidjan", description:"Structures de données, POO avec Java, développement web, SQL. Mention Bien.", date_debut:'2023', date_fin:'2024', actuel:false, technologies:[], ordre:5 },
      { id:3, type:'education', titre:'Licence 1 — Informatique', organisation:"Université d'Abidjan", description:"Fondamentaux de la programmation en C et Python. Introduction aux systèmes Unix/Linux.", date_debut:'2022', date_fin:'2023', actuel:false, technologies:[], ordre:4 },
    ];
  }

  private getFallbackPros(): Experience[] {
    return [
      { id:4, type:'projet', titre:'Parc-IT — Module Odoo', organisation:'Projet Personnel', description:"Module Odoo 18.0 complet pour la gestion de parc informatique. Stack : Python 85%, SCSS 10%, JavaScript 5%.", date_debut:'2024', date_fin:'2025', actuel:false, technologies:['Python','Odoo 18','SCSS'], ordre:3 },
      { id:5, type:'projet', titre:'Plateforme Marchés Publics', organisation:'Projet Académique L3', description:"Dématérialisation du cycle de vie des marchés publics et privés. 6 modules métier, Django/Angular.", date_debut:'2025', actuel:true, technologies:['Django','Angular','PostgreSQL'], ordre:7 },
      { id:6, type:'professionnel', titre:'Développeur Web — Freelance', organisation:'Auto-entrepreneur', description:"Sites web et applications pour clients locaux. Intégration HTML/CSS/JS et maintenance.", date_debut:'2024', actuel:true, technologies:[], ordre:5 },
      { id:7, type:'competition', titre:'Hackathon Universitaire — 48h', organisation:'Compétition Académique', description:"Résolution de problèmes algorithmiques et développement d'une application web en équipe.", date_debut:'2023', date_fin:'2023', actuel:false, technologies:[], ordre:2 },
    ];
  }
}
