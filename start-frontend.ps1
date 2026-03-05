# FILE: start-frontend.ps1
# DESCRIPTION: Lance le frontend Angular du portfolio depuis la racine du projet.
# WHY: Permet un démarrage frontend en une seule commande PowerShell.
# RELEVANT FILES: frontend/package.json,frontend/angular.json,frontend/src/main.ts,README.md

$ErrorActionPreference = 'Stop'

Set-Location "$PSScriptRoot/frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances frontend..."
    npm install
}

Write-Host "🚀 Démarrage du frontend Angular sur http://localhost:4200"
npm start
