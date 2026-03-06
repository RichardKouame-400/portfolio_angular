/**
 * nav.component.ts — Navigation fixe avec scroll actif
 * Composant standalone
 */

import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="isScrolled">
      <a href="#home" class="nav-logo">KAR</a>
      <ul class="nav-links">
        <li *ngFor="let link of navLinks">
          <a [href]="link.href" [class.active]="activeSection === link.href.slice(1)">
            {{ link.label }}
          </a>
        </li>
      </ul>
      <button class="nav-burger" (click)="toggleMenu()" [class.open]="menuOpen">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div class="mobile-menu" [class.open]="menuOpen">
      <ul>
        <li *ngFor="let link of navLinks">
          <a [href]="link.href" (click)="menuOpen=false">{{ link.label }}</a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.2rem 5%;
      backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid transparent;
      transition: border-color .4s, background .4s;
    }
    nav.scrolled { border-color: #1e1e1e; background: rgba(8,8,8,.85); }
    .nav-logo {
      font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem;
      letter-spacing: 2px; color: #c8f04b; text-decoration: none;
      position: relative;
    }
    .nav-logo::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 2px; background: #c8f04b; transition: width .3s;
    }
    .nav-logo:hover::after { width: 100%; }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; margin: 0; padding: 0; }
    .nav-links a {
      color: #6b6b6b; text-decoration: none; font-size: .8rem;
      font-weight: 500; letter-spacing: 2px; text-transform: uppercase;
      transition: color .3s; position: relative; font-family: 'DM Sans', sans-serif;
    }
    .nav-links a::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 1px; background: #c8f04b; transition: width .3s;
    }
    .nav-links a:hover, .nav-links a.active { color: #c8f04b; }
    .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
    .nav-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: .5rem; }
    .nav-burger span { width: 24px; height: 2px; background: #f0ede6; display: block; transition: all .3s; }
    .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav-burger.open span:nth-child(2) { opacity: 0; }
    .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    .mobile-menu {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(8,8,8,.97); z-index: 99;
      display: flex; align-items: center; justify-content: center;
      transform: translateY(-100%); transition: transform .4s ease;
    }
    .mobile-menu.open { transform: translateY(0); }
    .mobile-menu ul { list-style: none; text-align: center; padding: 0; }
    .mobile-menu li { padding: 1.5rem 0; }
    .mobile-menu a {
      font-family: 'Bebas Neue', sans-serif; font-size: 3rem;
      letter-spacing: 4px; color: #f0ede6; text-decoration: none;
      transition: color .3s;
    }
    .mobile-menu a:hover { color: #c8f04b; }
    @media(max-width:900px) { .nav-links { display: none; } .nav-burger { display: flex; } }
  `]
})
export class NavComponent implements OnInit {
  isScrolled = false;
  menuOpen = false;
  activeSection = 'home';

  navLinks: NavLink[] = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projets', href: '#projects' },
    { label: 'Parcours', href: '#experiences' },
    { label: 'Contact', href: '#contact' },
  ];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;

    // Détection de la section active pour le scroll spy
    const sections = ['home', 'about', 'skills', 'services', 'projects', 'experiences', 'contact'];
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        this.activeSection = id;
        break;
      }
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}