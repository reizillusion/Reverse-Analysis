param(
  [string]$RootPath = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"

function Resolve-SiteRoot {
  param([string]$ConfiguredRoot)

  $candidates = @()

  if ($PSScriptRoot) {
    $candidates += [System.IO.Path]::GetFullPath($PSScriptRoot)
  }

  if ($ConfiguredRoot) {
    $candidates += [System.IO.Path]::GetFullPath($ConfiguredRoot)
  }

  foreach ($candidate in ($candidates | Select-Object -Unique)) {
    if ((Test-Path (Join-Path $candidate "index.html") -PathType Leaf) -and
        (Test-Path (Join-Path $candidate "assets")) -and
        (Test-Path (Join-Path $candidate "src")) -and
        (Test-Path (Join-Path $candidate "styles"))) {
      return $candidate
    }
  }

  throw "Could not locate a valid site root."
}

function Get-FreePort {
  for ($port = 8710; $port -le 8799; $port++) {
    try {
      $probe = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
      $probe.Start()
      $probe.Stop()
      return $port
    } catch {
      continue
    }
  }

  throw "No available port was found."
}

function Get-ContentType {
  param([string]$Extension)

  switch ($Extension.ToLowerInvariant()) {
    ".html" { return "text/html; charset=utf-8" }
    ".js" { return "text/javascript; charset=utf-8" }
    ".mjs" { return "text/javascript; charset=utf-8" }
    ".css" { return "text/css; charset=utf-8" }
    ".json" { return "application/json; charset=utf-8" }
    ".svg" { return "image/svg+xml" }
    ".png" { return "image/png" }
    ".jpg" { return "image/jpeg" }
    ".jpeg" { return "image/jpeg" }
    ".gif" { return "image/gif" }
    ".webp" { return "image/webp" }
    ".ico" { return "image/x-icon" }
    ".ogg" { return "audio/ogg" }
    ".mp3" { return "audio/mpeg" }
    ".wav" { return "audio/wav" }
    ".flac" { return "audio/flac" }
    ".txt" { return "text/plain; charset=utf-8" }
    default { return "application/octet-stream" }
  }
}

function Write-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8",
    [int]$ContentLength = $Body.Length
  )

  $writer = New-Object System.IO.StreamWriter($Stream, [System.Text.Encoding]::ASCII, 1024, $true)
  $writer.NewLine = "`r`n"
  $writer.WriteLine("HTTP/1.1 $StatusCode $StatusText")
  $writer.WriteLine("Content-Type: $ContentType")
  $writer.WriteLine("Content-Length: $ContentLength")
  $writer.WriteLine("Cache-Control: no-cache, no-store, must-revalidate")
  $writer.WriteLine("Pragma: no-cache")
  $writer.WriteLine("Expires: 0")
  $writer.WriteLine("Connection: close")
  $writer.WriteLine()
  $writer.Flush()

  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
    $Stream.Flush()
  }
}

$root = Resolve-SiteRoot -ConfiguredRoot $RootPath
$port = Get-FreePort
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
$listener.Start()

$url = "http://127.0.0.1:$port/"
Write-Host ""
Write-Host "Reverse Analysis is starting..." -ForegroundColor Yellow
Write-Host "Browser address: $url" -ForegroundColor Cyan
Write-Host "Close this window to stop the local server." -ForegroundColor DarkGray
Write-Host ""

Start-Process $url | Out-Null

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()

    try {
      $stream = $client.GetStream()
      $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)

      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        continue
      }

      while ($true) {
        $headerLine = $reader.ReadLine()
        if ($null -eq $headerLine -or $headerLine -eq "") {
          break
        }
      }

      $parts = $requestLine.Split(" ")
      if ($parts.Length -lt 2) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Bad Request")
        Write-Response -Stream $stream -StatusCode 400 -StatusText "Bad Request" -Body $body
        continue
      }

      $method = $parts[0].ToUpperInvariant()
      $requestPath = [System.Uri]::UnescapeDataString(($parts[1] -split '\?')[0])

      if ($method -ne "GET" -and $method -ne "HEAD") {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Method Not Allowed")
        Write-Response -Stream $stream -StatusCode 405 -StatusText "Method Not Allowed" -Body $body
        continue
      }

      if ([string]::IsNullOrWhiteSpace($requestPath) -or $requestPath -eq "/") {
        $requestPath = "/index.html"
      }

      $relativePath = $requestPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
      $targetPath = [System.IO.Path]::GetFullPath((Join-Path $root $relativePath))

      if (-not $targetPath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
        Write-Response -Stream $stream -StatusCode 403 -StatusText "Forbidden" -Body $body
        continue
      }

      if ((Test-Path $targetPath) -and (Get-Item $targetPath).PSIsContainer) {
        $targetPath = Join-Path $targetPath "index.html"
      }

      if (-not (Test-Path $targetPath -PathType Leaf)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        Write-Response -Stream $stream -StatusCode 404 -StatusText "Not Found" -Body $body
        continue
      }

      $fileBytes = [System.IO.File]::ReadAllBytes($targetPath)
      $bodyBytes = if ($method -eq "HEAD") { [byte[]]::new(0) } else { $fileBytes }
      $contentType = Get-ContentType ([System.IO.Path]::GetExtension($targetPath))
      Write-Response -Stream $stream -StatusCode 200 -StatusText "OK" -Body $bodyBytes -ContentType $contentType -ContentLength $fileBytes.Length
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
