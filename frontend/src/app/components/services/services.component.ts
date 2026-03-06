/**
 * services.component.ts — Section Services
 * Composant standalone — données depuis l'API Django
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../portfolio.service';
import { Service } from '../../types';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services-section">
      <div class="services-header">
        <span class="section-label">Services</span>
        <h2 class="section-title">Ce que je fais</h2>
      </div>
      <div class="services-grid">
        <div class="service-card" *ngFor="let service of services">
          <div class="service-num">{{ ('0' + service.numero).slice(-2) }}</div>
          <div class="service-icon">{{ getIcone(service.icone) }}</div>
          <h3 class="service-title">{{ service.titre }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-tags">
            <span *ngFor="let tech of service.technologies">{{ tech }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section { padding: 7rem 5%; border-top: 1px solid #1e1e1e; background: #080808; }
    .services-header { text-align: center; margin-bottom: 4rem; }
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
    .services-grid {
      display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
      gap: 1px; background: #1e1e1e; border: 1px solid #1e1e1e; border-radius: 16px; overflow: hidden;
    }
    .service-card {
      background: #111111; padding: 3rem 2.5rem; position: relative; transition: background .3s;
    }
    .service-card:hover { background: #141414; }
    .service-num {
      font-family: 'Bebas Neue', sans-serif; font-size: 5rem;
      color: rgba(200,240,75,.06); line-height: 1; position: absolute;
      top: 1.5rem; right: 2rem; pointer-events: none;
    }
    .service-icon {
      width: 56px; height: 56px; background: rgba(200,240,75,.08);
      border: 1px solid rgba(200,240,75,.15); border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.5rem; margin-bottom: 1.5rem; transition: background .3s, border-color .3s;
    }
    .service-card:hover .service-icon { background: rgba(200,240,75,.15); border-color: rgba(200,240,75,.4); }
    .service-title {
      font-family: 'DM Serif Display', serif; font-size: 1.4rem;
      color: #f0ede6; margin-bottom: 1rem;
    }
    .service-desc { font-size: .9rem; color: #6b6b6b; line-height: 1.8; font-family: 'DM Sans', sans-serif; }
    .service-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: 1.2rem; }
    .service-tags span {
      font-size: .68rem; color: #c8f04b; letter-spacing: 1px;
      text-transform: uppercase; font-family: 'DM Sans', sans-serif;
    }
    .service-tags span:not(:last-child)::after { content: ' ·'; color: #1e1e1e; }
    @media(max-width:900px) { .services-grid { grid-template-columns:1fr; } }
  `]
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];

  private icones: Record<string, string> = {
    backend: '⚙️', frontend: '🎨', data: '📊', security: '🔒', devops: '🐳', mobile: '📱', autre: '💡'
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getServices().subscribe({
      next: (services) => this.services = services,
      error: () => this.services = this.getFallbackServices()
    });
  }

  getIcone(key: string): string {
    return this.icones[key] || '💡';
  }

  private getFallbackServices(): Service[] {
    return [
      { id: 1, titre: 'Développement Backend', description: "Conception d'APIs RESTful robustes avec Django REST Framework. Modélisation de BDD, authentification JWT, logique métier scalable.", icone: 'backend', numero: 1, technologies: ['Python', 'Django', 'DRF', 'PostgreSQL'], ordre: 1, actif: true },
      { id: 2, titre: 'Développement Frontend', description: "Interfaces modernes avec Angular (composants standalone). Gestion d'état RxJS, design responsive, animations SCSS.", icone: 'frontend', numero: 2, technologies: ['Angular', 'TypeScript', 'RxJS', 'SCSS'], ordre: 2, actif: true },
      { id: 3, titre: 'ERP Odoo / Modules métier', description: "Développement de modules Odoo 18 personnalisés. Gestion de parc informatique, workflows métier, tableaux de bord.", icone: 'autre', numero: 3, technologies: ['Odoo 18', 'Python', 'XML', 'JavaScript'], ordre: 3, actif: true },
      { id: 4, titre: 'Data & Machine Learning', description: "Exploration de données, modèles de classification avec scikit-learn, visualisations interactives et reporting automatisé.", icone: 'data', numero: 4, technologies: ['Python', 'pandas', 'scikit-learn', 'Jupyter'], ordre: 4, actif: true },
    ];
  }
}