/**
 * app.component.ts — Composant racine
 * Portfolio Kouame Aka Richard
 */

import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ServicesComponent,
    ProjectsComponent,
    ExperiencesComponent,
    ContactComponent,
  ],
  template: `
    <div class="portfolio-root">
      <!-- Curseur personnalisé -->
      <div class="cursor" id="cursor"></div>
      <div class="cursor-ring" id="cursorRing"></div>

      <!-- Navigation fixe -->
      <app-nav></app-nav>

      <!-- Sections -->
      <main>
        <app-hero id="home"></app-hero>
        <app-about id="about"></app-about>
        <app-skills id="skills"></app-skills>
        <app-services id="services"></app-services>
        <app-projects id="projects"></app-projects>
        <app-experiences id="experiences"></app-experiences>
        <app-contact id="contact"></app-contact>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-copy">
          © {{ currentYear }} <strong>Kouame Aka Richard</strong> — Tous droits réservés
        </div>
        <a href="#home" class="footer-back">↑ Retour en haut</a>
      </footer>
    </div>
  `,
  styles: [`
    .portfolio-root { background: #080808; min-height: 100vh; }
    .footer {
      border-top: 1px solid #1e1e1e;
      padding: 2rem 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .footer-copy { font-size: .8rem; color: #6b6b6b; font-family: 'DM Sans', sans-serif; }
    .footer-copy strong { color: #c8f04b; }
    .footer-back {
      font-size: .78rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #6b6b6b;
      text-decoration: none;
      transition: color .3s;
      font-family: 'DM Sans', sans-serif;
    }
    .footer-back:hover { color: #c8f04b; }
    .cursor {
      position: fixed; width: 10px; height: 10px;
      background: #c8f04b; border-radius: 50%;
      pointer-events: none; z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s;
    }
    .cursor-ring {
      position: fixed; width: 36px; height: 36px;
      border: 1.5px solid #c8f04b; border-radius: 50%;
      pointer-events: none; z-index: 9998;
      transform: translate(-50%, -50%);
      transition: all 0.15s ease; opacity: .5;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  currentYear = new Date().getFullYear();
  private cursorEl: HTMLElement | null = null;
  private cursorRingEl: HTMLElement | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // Charger le profil complet au démarrage
    this.portfolioService.getUtilisateurComplet(1).subscribe({
      next: profil => console.log('Profil chargé :', profil.nom_complet),
      error: err => console.warn('API non disponible, mode statique', err)
    });
  }

  ngAfterViewInit(): void {
    this.cursorEl = document.getElementById('cursor');
    this.cursorRingEl = document.getElementById('cursorRing');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.cursorEl || !this.cursorRingEl) {
      return;
    }

    const { clientX, clientY } = event;
    this.cursorEl.style.left = `${clientX}px`;
    this.cursorEl.style.top = `${clientY}px`;
    this.cursorRingEl.style.left = `${clientX}px`;
    this.cursorRingEl.style.top = `${clientY}px`;
  }
}
