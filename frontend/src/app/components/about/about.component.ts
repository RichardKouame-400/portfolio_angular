/**
 * about.component.ts — Section À propos
 * Composant standalone
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../portfolio.service';
import { Utilisateur, StatProfil } from '../../types';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about reveal-section">
      <!-- Colonne gauche -->
      <div class="about-left">
        <span class="section-label">À propos</span>
        <h2 class="section-title">Qui suis-je ?</h2>
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of stats">
            <div class="stat-num">{{ stat.valeur }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
        <div class="tech-tags">
          <span class="tech-tag" *ngFor="let tag of techTags">{{ tag }}</span>
        </div>
      </div>

      <!-- Colonne droite -->
      <div class="about-right">
        <p *ngFor="let para of bioParagraphs">{{ para }}</p>
        <div class="about-actions">
          <a href="/api/utilisateurs/1/" target="_blank" class="btn-primary">
            Télécharger CV →
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      display: grid; grid-template-columns: 1fr 1fr; gap: 6rem;
      align-items: center; padding: 7rem 5%;
      border-top: 1px solid #1e1e1e; background: #080808;
    }
    .section-label {
      display: inline-flex; align-items: center; gap: .6rem;
      font-size: .72rem; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;
      color: #c8f04b; margin-bottom: 1rem; font-family: 'DM Sans', sans-serif;
    }
    .section-label::before { content: ''; display: block; width: 30px; height: 1px; background: #c8f04b; }
    .section-title {
      font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem,5vw,4.5rem);
      line-height: 1; letter-spacing: 1px; color: #f0ede6; margin: 0 0 2rem;
    }
    .stats-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
      background: #1e1e1e; border: 1px solid #1e1e1e; border-radius: 12px; overflow: hidden;
    }
    .stat-card {
      background: #111111; padding: 2rem; transition: background .3s;
    }
    .stat-card:hover { background: #161616; }
    .stat-num {
      font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem; color: #c8f04b; line-height: 1;
    }
    .stat-label {
      font-size: .8rem; color: #6b6b6b; text-transform: uppercase;
      letter-spacing: 2px; margin-top: .3rem; font-family: 'DM Sans', sans-serif;
    }
    .tech-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.5rem; }
    .tech-tag {
      background: rgba(200,240,75,.06); border: 1px solid rgba(200,240,75,.15);
      color: #c8f04b; font-size: .75rem; font-weight: 500; letter-spacing: 1px;
      padding: .35rem .8rem; border-radius: 4px; transition: background .3s, border-color .3s;
      font-family: 'DM Sans', sans-serif;
    }
    .tech-tag:hover { background: rgba(200,240,75,.12); border-color: #c8f04b; }
    .about-right p {
      color: #6b6b6b; line-height: 1.9; margin-bottom: 1.2rem;
      font-family: 'DM Sans', sans-serif; font-size: .95rem;
    }
    .about-actions { margin-top: 2rem; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: .5rem;
      background: #c8f04b; color: #080808; font-weight: 700; font-size: .85rem;
      letter-spacing: 1px; text-transform: uppercase; padding: .9rem 2rem;
      border-radius: 4px; text-decoration: none; transition: transform .3s, box-shadow .3s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(200,240,75,.25); }
    @media(max-width:900px) { .about { grid-template-columns:1fr; gap:3rem; } }
  `]
})
export class AboutComponent implements OnInit {
  profil: Utilisateur | null = null;

  stats: StatProfil[] = [
    { label: 'Ans de code', valeur: '3+' },
    { label: 'Projets réalisés', valeur: '10+' },
    { label: 'Technologies clés', valeur: '6' },
    { label: 'Niveau universitaire', valeur: 'L3' },
  ];

  techTags = [
    'Python', 'Django', 'Angular', 'TypeScript', 'SQL',
    'REST API', 'Git', 'Docker', 'Odoo 18', 'HTML/CSS', 'JavaScript', 'Linux'
  ];

  bioParagraphs: string[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.profil$.subscribe(p => {
      this.profil = p;
      if (p) {
        this.stats[0].valeur = p.annees_experience + '+';
        this.stats[1].valeur = p.nombre_projets + '+';
        this.bioParagraphs = p.bio.split('\n').filter(s => s.trim());
      }
    });

    if (!this.profil) {
      this.bioParagraphs = [
        "Je suis Kouame Aka Richard, étudiant en troisième année de Computer Science, animé par une profonde curiosité pour le développement logiciel et l'intelligence artificielle.",
        "J'ai développé une expertise solide en développement web full-stack avec Django et Angular, en conception d'APIs RESTful, en modélisation de données et en développement d'ERP avec Odoo 18.",
        "Ma démarche : concevoir des logiciels propres, scalables et bien documentés. Je cherche des stages ou collaborations pour mettre mes compétences en pratique.",
      ];
    }
  }
}
