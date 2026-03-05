# FILE: start-backend.ps1
# DESCRIPTION: Lance le backend Django du portfolio depuis la racine du projet.
# WHY: Permet un démarrage backend en une seule commande PowerShell.
# RELEVANT FILES: backend/manage.py,backend/requirements.txt,backend/api/seed.py,README.md

param(
    [switch]$Setup
)

$ErrorActionPreference = 'Stop'

Set-Location "$PSScriptRoot/backend"

if (-not (Test-Path ".venv")) {
    if (-not $Setup) {
        Write-Host "❌ Environnement Python introuvable (.venv)." -ForegroundColor Yellow
        Write-Host "Lance d'abord : .\start-backend.ps1 -Setup" -ForegroundColor Cyan
        exit 1
    }

    Write-Host "🔧 Création de l'environnement virtuel..."
    python -m venv .venv
}

& ".\.venv\Scripts\Activate.ps1"

if ($Setup) {
    Write-Host "📦 Installation des dépendances backend..."
    pip install -r requirements.txt

    Write-Host "🧱 Application des migrations..."
    python manage.py makemigrations
    python manage.py migrate

    Write-Host "🌱 Injection des données de seed..."
    python api/seed.py
}

Write-Host "🚀 Démarrage du backend Django sur http://localhost:8000"
python manage.py runserver
