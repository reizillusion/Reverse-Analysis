param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot),
  [int]$MaxLongSide = 1200
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = [System.IO.Path]::GetFullPath($ProjectRoot)
$portraitDir = Join-Path $root "assets\images\portraits"

if (-not (Test-Path $portraitDir -PathType Container)) {
  throw "Portrait directory not found: $portraitDir"
}

$pngFiles = Get-ChildItem -LiteralPath $portraitDir -Filter *.png -File | Where-Object {
  $_.BaseName -notlike "*.tmp"
}

foreach ($file in $pngFiles) {
  $source = $null
  $stream = $null
  $canvas = $null
  $graphics = $null
  $tempPath = Join-Path $file.DirectoryName ($file.BaseName + ".tmp.png")

  try {
    Remove-Item -LiteralPath $tempPath -Force -ErrorAction SilentlyContinue

    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $stream = New-Object System.IO.MemoryStream(,$bytes)
    $source = [System.Drawing.Image]::FromStream($stream)
    $sourceWidth = $source.Width
    $sourceHeight = $source.Height
    $longSide = [Math]::Max($sourceWidth, $sourceHeight)

    if ($longSide -le $MaxLongSide) {
      continue
    }

    $scale = $MaxLongSide / [double]$longSide
    $targetWidth = [Math]::Max([int][Math]::Round($source.Width * $scale), 1)
    $targetHeight = [Math]::Max([int][Math]::Round($source.Height * $scale), 1)

    $canvas = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $graphics.DrawImage($source, 0, 0, $targetWidth, $targetHeight)

    $canvas.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $graphics = $null
    $canvas.Dispose()
    $canvas = $null
    $source.Dispose()
    $source = $null
    $stream.Dispose()
    $stream = $null

    [System.IO.File]::Copy($tempPath, $file.FullName, $true)
    Remove-Item -LiteralPath $tempPath -Force

    Write-Host ("Optimized {0}: {1}x{2} -> {3}x{4}" -f $file.Name, $sourceWidth, $sourceHeight, $targetWidth, $targetHeight)
  } finally {
    if ($graphics) {
      $graphics.Dispose()
    }

    if ($canvas) {
      $canvas.Dispose()
    }

    if ($source) {
      $source.Dispose()
    }

    if ($stream) {
      $stream.Dispose()
    }

    Remove-Item -LiteralPath $tempPath -Force -ErrorAction SilentlyContinue
  }
}
