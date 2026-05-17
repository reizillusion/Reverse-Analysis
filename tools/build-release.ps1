param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

$root = [System.IO.Path]::GetFullPath($ProjectRoot)
$releaseRoot = Join-Path $root "release"
$packageName = "Reverse-Analysis-Release"
$packageRoot = Join-Path $releaseRoot $packageName
$zipPath = Join-Path $releaseRoot "Reverse-Analysis-Release.zip"

if (Test-Path $packageRoot) {
  Remove-Item -LiteralPath $packageRoot -Recurse -Force
}

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

New-Item -ItemType Directory -Path $packageRoot -Force | Out-Null

$copyTargets = @(
  "assets",
  "src",
  "styles",
  "index.html",
  "readme.md"
)

foreach ($target in $copyTargets) {
  Copy-Item -LiteralPath (Join-Path $root $target) -Destination $packageRoot -Recurse -Force
}

Copy-Item -LiteralPath (Join-Path $root "tools\Start-ReverseAnalysis.ps1") -Destination (Join-Path $packageRoot "Start-Reverse-Analysis.ps1") -Force

$batContent = @'
@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Start-Reverse-Analysis.ps1"
endlocal
'@
Set-Content -LiteralPath (Join-Path $packageRoot "Start-Reverse-Analysis.bat") -Value $batContent -Encoding ASCII

$userGuide = @'
Reverse Analysis - Release Guide

1. If you received a zip file, extract it to a normal folder first
2. Double-click "Start-Reverse-Analysis.bat"
3. Your browser should open automatically
4. Close the script window when you want to stop the local service

Notes:
- Do not open index.html directly
- If the browser does not open automatically, use the local address shown in the script window
- If updated assets do not appear, press Ctrl + F5 in the browser
'@
Set-Content -LiteralPath (Join-Path $packageRoot "USER-GUIDE.txt") -Value $userGuide -Encoding ASCII

Compress-Archive -Path (Join-Path $packageRoot "*") -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "Release folder created:" -ForegroundColor Yellow
Write-Host $packageRoot -ForegroundColor Cyan
Write-Host ""
Write-Host "Zip package created:" -ForegroundColor Yellow
Write-Host $zipPath -ForegroundColor Cyan
Write-Host ""
