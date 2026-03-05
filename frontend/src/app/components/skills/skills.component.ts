/**
 * skills.component.ts — Section Compétences avec barres animées
 * Composant standalone
 */

import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../types';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills-section">
      <div class="skills-header">
        <div>
          <span class="section-label">Compétences</span>
          <h2 class="section-title">Mon expertise</h2>
        </div>
      </div>
      <div class="skills-grid">
        <div class="skill-card" *ngFor="let skill of skills; let i=index" [attr.data-index]="i">
          <div class="skill-icon">{{ skill.icone }}</div>
          <div class="skill-name">{{ skill.nom }}</div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" [style.transform]="'scaleX(' + (animated ? skill.niveau / 100 : 0) + ')'"></div>
          </div>
          <div class="skill-percent">{{ skill.niveau }}%</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      padding: 7rem 5%; border-top: 1px solid #1e1e1e; background: #111111;
    }
    .skills-header { margin-bottom: 4rem; }
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
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 1.5rem; }
    .skill-card {
      background: #080808; border: 1px solid #1e1e1e; border-radius: 12px;
      padding: 2rem; transition: border-color .3s, transform .3s; position: relative; overflow: hidden;
    }
    .skill-card::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: #c8f04b; transform: scaleX(0); transition: transform .4s;
    }
    .skill-card:hover { border-color: rgba(200,240,75,.3); transform: translateY(-4px); }
    .skill-card:hover::after { transform: scaleX(1); }
    .skill-icon {
      width: 44px; height: 44px; background: rgba(200,240,75,.08); border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; margin-bottom: 1rem;
    }
    .skill-name {
      font-weight: 600; font-size: 1rem; margin-bottom: 1rem;
      color: #f0ede6; font-family: 'DM Sans', sans-serif;
    }
    .skill-bar-track { height: 3px; background: #1e1e1e; border-radius: 2px; overflow: hidden; }
    .skill-bar-fill {
      height: 100%; background: linear-gradient(90deg,#c8f04b,#f0c84b); border-radius: 2px;
      transform: scaleX(0); transform-origin: left; transition: transform 1.2s cubic-bezier(.16,1,.3,1);
    }
    .skill-percent {
      font-size: .75rem; color: #6b6b6b; text-align: right;
      margin-top: .4rem; font-family: 'DM Sans', sans-serif;
    }
  `]
})
export class SkillsComponent implements OnInit, AfterViewInit {
  animated = false;

  skills: Skill[] = [
    { nom: 'Python / Django', niveau: 88, icone: '🐍', categorie: 'backend' },
    { nom: 'Angular / TypeScript', niveau: 82, icone: '🅰️', categorie: 'frontend' },
    { nom: 'SQL / PostgreSQL', niveau: 78, icone: '🗄️', categorie: 'backend' },
    { nom: 'HTML / CSS / JavaScript', niveau: 90, icone: '🌐', categorie: 'frontend' },
    { nom: 'Odoo 18 (Python/XML)', niveau: 72, icone: '🏢', categorie: 'erp' },
    { nom: 'Machine Learning', niveau: 65, icone: '🤖', categorie: 'data' },
    { nom: 'Git / Docker / Linux', niveau: 75, icone: '🐳', categorie: 'devops' },
    { nom: 'SCSS / Design UI', niveau: 70, icone: '🎨', categorie: 'frontend' },
    { nom: 'UML / Architecture', niveau: 68, icone: '📐', categorie: 'conception' },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => this.animated = true, 200);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(this.el.nativeElement);
  }
}
