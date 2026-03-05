/**
 * contact.component.ts — Section Contact avec formulaire connecté à l'API
 * Composant standalone
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../portfolio.service';
import { ReseauSocial } from '../../types';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact-section">
      <div class="contact-header">
        <span class="section-label">Contact</span>
        <h2 class="section-title">Travaillons ensemble</h2>
      </div>

      <div class="contact-wrap">
        <!-- Infos de contact -->
        <div class="contact-info">
          <p class="contact-tagline">Ouvert aux stages, projets freelance et collaborations académiques.</p>

          <a href="mailto:richard.kouame&#64;email.com" class="contact-method">
            <div class="method-icon">✉️</div>
            <div>
              <div class="method-label">Email</div>
              <div class="method-value">richard.kouame&#64;email.com</div>
            </div>
          </a>

          <a href="tel:+2250700000000" class="contact-method">
            <div class="method-icon">📱</div>
            <div>
              <div class="method-label">Téléphone</div>
              <div class="method-value">+225 07 00 00 00 00</div>
            </div>
          </a>

          <div class="contact-method">
            <div class="method-icon">📍</div>
            <div>
              <div class="method-label">Localisation</div>
              <div class="method-value">Abidjan, Côte d'Ivoire</div>
            </div>
          </div>

          <!-- Réseaux sociaux -->
          <div class="social-links">
            <a href="https://github.com/RichardKouame-400" target="_blank" class="social-link" title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            </a>
            <a *ngFor="let r of reseaux" [href]="r.url" target="_blank" class="social-link" [title]="r.plateforme">
              {{ getPlatformeIcone(r.plateforme) }}
            </a>
          </div>
        </div>

        <!-- Formulaire -->
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nom</label>
              <input formControlName="nom" type="text" placeholder="Votre nom">
              <span class="error" *ngIf="contactForm.get('nom')?.invalid && contactForm.get('nom')?.touched">
                Le nom est requis
              </span>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input formControlName="email" type="email" placeholder="votre&#64;email.com">
              <span class="error" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                Email invalide
              </span>
            </div>
          </div>
          <div class="form-group">
            <label>Sujet</label>
            <input formControlName="sujet" type="text" placeholder="Sujet de votre message">
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea formControlName="message" placeholder="Décrivez votre projet ou votre demande..." rows="5"></textarea>
            <span class="error" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
              Le message doit contenir au moins 10 caractères
            </span>
          </div>
          <button type="submit" class="btn-submit" [disabled]="loading">
            <span *ngIf="!loading && !success">Envoyer le message →</span>
            <span *ngIf="loading">Envoi en cours...</span>
            <span *ngIf="success">✓ Message envoyé !</span>
          </button>
          <p class="form-error" *ngIf="formError">{{ formError }}</p>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .contact-section { padding: 7rem 5%; border-top: 1px solid #1e1e1e; background: #111111; }
    .contact-header { text-align: center; margin-bottom: 4rem; }
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
    .contact-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
    .contact-tagline { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 1.6rem; color: #6b6b6b; margin-bottom: 2rem; }
    .contact-method {
      display: flex; align-items: flex-start; gap: 1rem; padding: 1.2rem 0;
      border-bottom: 1px solid #1e1e1e; text-decoration: none; color: #f0ede6;
      transition: padding-left .3s;
    }
    .contact-method:hover { padding-left: .5rem; }
    .method-icon {
      width: 40px; height: 40px; background: rgba(200,240,75,.08); border-radius: 8px;
      display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
      transition: background .3s;
    }
    .contact-method:hover .method-icon { background: rgba(200,240,75,.15); }
    .method-label { font-size: .7rem; color: #6b6b6b; letter-spacing: 2px; text-transform: uppercase; font-family: 'DM Sans', sans-serif; }
    .method-value { font-size: .95rem; margin-top: .1rem; font-family: 'DM Sans', sans-serif; }
    .social-links { display: flex; gap: .8rem; margin-top: 2rem; }
    .social-link {
      width: 44px; height: 44px; border: 1px solid #1e1e1e; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: #6b6b6b; text-decoration: none; font-size: 1.1rem; transition: all .3s;
    }
    .social-link:hover { border-color: #c8f04b; color: #c8f04b; background: rgba(200,240,75,.06); }
    .contact-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { display: flex; flex-direction: column; gap: .4rem; }
    .form-group label { font-size: .72rem; letter-spacing: 2px; text-transform: uppercase; color: #6b6b6b; font-family: 'DM Sans', sans-serif; }
    .form-group input, .form-group textarea {
      background: #080808; border: 1px solid #1e1e1e; color: #f0ede6;
      font-family: 'DM Sans', sans-serif; font-size: .9rem; padding: .9rem 1.2rem;
      border-radius: 8px; outline: none; transition: border-color .3s; resize: vertical;
    }
    .form-group input:focus, .form-group textarea:focus { border-color: #c8f04b; }
    .error { font-size: .72rem; color: #f04b4b; font-family: 'DM Sans', sans-serif; }
    .btn-submit {
      background: #c8f04b; color: #080808; font-weight: 700; font-size: .85rem;
      letter-spacing: 1px; text-transform: uppercase; padding: .9rem 2rem; border-radius: 4px;
      border: none; cursor: pointer; transition: transform .3s, box-shadow .3s, background .3s;
      font-family: 'DM Sans', sans-serif;
    }
    .btn-submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(200,240,75,.25); }
    .btn-submit:disabled { opacity: .7; }
    .form-error { color: #f04b4b; font-size: .85rem; font-family: 'DM Sans', sans-serif; }
    @media(max-width:900px) { .contact-wrap { grid-template-columns:1fr; gap:3rem; } }
    @media(max-width:600px) { .form-row { grid-template-columns:1fr; } }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  success = false;
  formError = '';
  reseaux: ReseauSocial[] = [];

  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService
  ) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sujet: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.portfolioService.getReseaux().subscribe({
      next: r => this.reseaux = r.filter(rs => rs.plateforme !== 'github'),
      error: () => {}
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.formError = '';

    this.portfolioService.envoyerContact(this.contactForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.contactForm.reset();
        setTimeout(() => this.success = false, 4000);
      },
      error: err => {
        this.loading = false;
        this.formError = 'Erreur lors de l\'envoi. Veuillez réessayer.';
      }
    });
  }

  getPlatformeIcone(plateforme: string): string {
    const icons: Record<string, string> = {
      linkedin: '💼', twitter: '🐦', instagram: '📸', youtube: '▶️', portfolio: '🌐', autre: '🔗'
    };
    return icons[plateforme] || '🔗';
  }
}
