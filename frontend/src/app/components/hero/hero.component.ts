/**
 * hero.component.ts — Section Hero avec marquee animé
 * Composant standalone
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../portfolio.service';
import { Utilisateur } from '../../types';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-bg-grid"></div>
      <div class="hero-blob"></div>

      <div class="hero-left">
        <div class="hero-tag">
          <span class="dot"></span>
          {{ profil?.disponible ? 'Disponible pour des opportunités' : 'Non disponible actuellement' }}
        </div>
        <h1 class="hero-name">
          KOUAME<br>
          <span class="hero-name-outline">AKA</span><br>
          RICHARD
        </h1>
        <p class="hero-title">
          <em>{{ profil?.titre || 'Étudiant L3 Computer Science' }}</em>
        </p>
        <p class="hero-desc">
          {{ bioPreview }}
        </p>
        <div class="hero-cta">
          <a href="#projects" class="btn-primary">Voir mes projets →</a>
          <a href="#contact" class="btn-outline">Me contacter</a>
        </div>
      </div>

      <div class="hero-right">
        <div class="hero-card">
          <div class="hero-card-bg"></div>
          <div class="hero-card-accent"></div>
          <div class="hero-card-accent2"></div>
          <div class="hero-avatar">
            <div class="hero-avatar-circle">KR</div>
            <div class="hero-avatar-info">
              <div class="hero-avatar-name">{{ profil?.nom_complet || 'KOUAME RICHARD' }}</div>
              <div class="hero-avatar-sub">Computer Science · L3</div>
            </div>
          </div>
          <div class="hero-badge">🎓 L3 CS — 2025</div>
        </div>
      </div>
    </section>

    <!-- Marquee animé -->
    <div class="marquee-section">
      <div class="marquee-track">
        <span class="marquee-item" *ngFor="let item of marqueeItems">
          <span class="marquee-dot"></span>{{ item }}
        </span>
        <!-- Duplicate pour boucle seamless -->
        <span class="marquee-item" *ngFor="let item of marqueeItems">
          <span class="marquee-dot"></span>{{ item }}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 8rem 5% 4rem;
      position: relative;
      overflow: hidden;
      gap: 4rem;
      background: #080808;
    }
    .hero-bg-grid {
      position: absolute; inset: 0;
      background-image: linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px);
      background-size: 60px 60px; opacity: .4;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }
    .hero-blob {
      position: absolute; width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(200,240,75,.08) 0%, transparent 70%);
      top: 50%; left: 30%; transform: translate(-50%,-50%); pointer-events: none;
    }
    .hero-left { position: relative; z-index: 2; animation: fadeUp .8s .4s both; }
    .hero-tag {
      display: inline-flex; align-items: center; gap: .5rem;
      background: rgba(200,240,75,.08); border: 1px solid rgba(200,240,75,.2);
      color: #c8f04b; font-size: .75rem; font-weight: 500; letter-spacing: 2px;
      text-transform: uppercase; padding: .4rem 1rem; border-radius: 50px;
      margin-bottom: 1.5rem; font-family: 'DM Sans', sans-serif;
    }
    .dot {
      width: 6px; height: 6px; background: #c8f04b; border-radius: 50%;
      animation: pulse 2s infinite; flex-shrink: 0;
    }
    .hero-name {
      font-family: 'Bebas Neue', sans-serif; font-size: clamp(4rem,8vw,8rem);
      line-height: .9; letter-spacing: 2px; color: #f0ede6; margin: 0;
    }
    .hero-name-outline {
      -webkit-text-stroke: 2px #c8f04b; color: transparent; transition: color .3s;
    }
    .hero-name-outline:hover { color: #c8f04b; }
    .hero-title {
      font-family: 'DM Serif Display', serif; font-style: italic;
      font-size: clamp(1.2rem,2.5vw,1.8rem); color: #6b6b6b; margin-top: 1.2rem;
    }
    .hero-desc {
      font-size: .95rem; color: #6b6b6b; max-width: 440px; margin-top: 1.5rem;
      line-height: 1.8; font-family: 'DM Sans', sans-serif;
    }
    .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 2.5rem; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: .5rem;
      background: #c8f04b; color: #080808; font-weight: 700; font-size: .85rem;
      letter-spacing: 1px; text-transform: uppercase; padding: .9rem 2rem;
      border-radius: 4px; text-decoration: none; transition: transform .3s, box-shadow .3s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(200,240,75,.25); }
    .btn-outline {
      display: inline-flex; align-items: center; gap: .5rem;
      border: 1px solid #1e1e1e; color: #f0ede6; font-size: .85rem;
      letter-spacing: 1px; text-transform: uppercase; padding: .9rem 2rem;
      border-radius: 4px; text-decoration: none; transition: border-color .3s, color .3s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-outline:hover { border-color: #c8f04b; color: #c8f04b; }

    .hero-right {
      position: relative; z-index: 2;
      display: flex; justify-content: center; align-items: center;
      animation: fadeIn 1.2s .6s both;
    }
    .hero-card { position: relative; width: 380px; height: 480px; animation: float 6s ease-in-out infinite; }
    .hero-card-bg {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #111111, #1e1e1e);
      border-radius: 12px; border: 1px solid #1e1e1e;
    }
    .hero-card-accent {
      position: absolute; bottom: -20px; right: -20px;
      width: 180px; height: 180px; border: 2px solid #c8f04b;
      border-radius: 8px; opacity: .4;
    }
    .hero-card-accent2 {
      position: absolute; top: -15px; left: -15px;
      width: 80px; height: 80px; background: #c8f04b; border-radius: 4px; opacity: .1;
    }
    .hero-avatar {
      position: absolute; inset: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;
    }
    .hero-avatar-circle {
      width: 120px; height: 120px; border-radius: 50%;
      background: linear-gradient(135deg,rgba(200,240,75,.2),rgba(200,240,75,.05));
      border: 2px solid rgba(200,240,75,.3);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: #c8f04b;
    }
    .hero-avatar-info { text-align: center; }
    .hero-avatar-name {
      font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem;
      letter-spacing: 2px; color: #f0ede6;
    }
    .hero-avatar-sub { font-size: .8rem; color: #6b6b6b; margin-top: .3rem; font-family: 'DM Sans', sans-serif; }
    .hero-badge {
      position: absolute; top: 30px; right: -20px;
      background: #c8f04b; color: #080808; font-weight: 700; font-size: .7rem;
      letter-spacing: 1px; text-transform: uppercase; padding: .5rem 1rem;
      border-radius: 50px; white-space: nowrap;
      box-shadow: 0 8px 20px rgba(200,240,75,.3); font-family: 'DM Sans', sans-serif;
    }

    /* Marquee */
    .marquee-section {
      border-top: 1px solid #1e1e1e; border-bottom: 1px solid #1e1e1e;
      padding: 1.2rem 0; overflow: hidden; background: #111111;
    }
    .marquee-track { display: flex; animation: marquee 25s linear infinite; white-space: nowrap; }
    .marquee-item {
      display: inline-flex; align-items: center; gap: 1.5rem;
      padding: 0 2.5rem; font-family: 'Bebas Neue', sans-serif;
      font-size: 1rem; letter-spacing: 3px; color: #6b6b6b; text-transform: uppercase;
    }
    .marquee-dot { width: 6px; height: 6px; background: #c8f04b; border-radius: 50%; flex-shrink: 0; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.3; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }

    @media(max-width:900px) {
      .hero { grid-template-columns:1fr; padding-top:7rem; }
      .hero-right { order:-1; }
      .hero-card { width:260px; height:320px; }
    }
  `]
})
export class HeroComponent implements OnInit {
  profil: Utilisateur | null = null;

  marqueeItems = [
    'Django', 'Angular', 'Python', 'TypeScript', 'REST API',
    'PostgreSQL', 'Machine Learning', 'Odoo 18', 'Git', 'Docker', 'Linux', 'SCSS'
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.profil$.subscribe(p => this.profil = p);
  }

  get bioPreview(): string {
    const fallback = "Passionné par le développement web full-stack, la data science et l'intelligence artificielle.";
    const bio = this.profil?.bio?.trim();

    if (!bio) {
      return fallback;
    }

    return bio.length > 200 ? `${bio.substring(0, 200)}...` : bio;
  }
}
