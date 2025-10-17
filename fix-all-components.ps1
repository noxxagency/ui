# Comprehensive Fix Script for NOXX UI Components
# Fixes all TypeScript errors: icon imports, missing types, React imports

Write-Host "Starting comprehensive fix for NOXX UI components..." -ForegroundColor Cyan

$componentsPath = "h:\Lucru\Domains\noxx.store\noxx-ui\src\components\ui"

# Icon mapping: old import path => proper icon name
$iconMappings = @{
    'search' = 'Search'
    'check' = 'Check'
    'chevron-right' = 'ChevronRight'
    'circle' = 'Circle'
    'chevron-down' = 'ChevronDown'
    'chevron-left' = 'ChevronLeft'
    'arrow-left' = 'ArrowLeft'
    'arrow-right' = 'ArrowRight'
    'more-horizontal' = 'MoreHorizontal'
    'x' = 'X'
}

# Files that need React import
$filesNeedingReact = @('chart.tsx')

# Process each tsx file
Get-ChildItem -Path $componentsPath -Filter "*.tsx" | ForEach-Object {
    $file = $_
    $content = Get-Content -Path $file.FullName -Raw
    $modified = $false
    
    # Extract icon names from imports
    $iconsUsed = @()
    $importPattern = 'import\s+(\w+)\s+from\s+"lucide-react/dist/esm/icons/([^"]+)"'
    
    $matches = [regex]::Matches($content, $importPattern)
    foreach ($match in $matches) {
        $importedName = $match.Groups[1].Value
        $iconPath = $match.Groups[2].Value
        
        if ($iconMappings.ContainsKey($iconPath)) {
            $properName = $iconMappings[$iconPath]
            $iconsUsed += $properName
            
            # Replace old import name with proper name in content
            if ($importedName -ne $properName) {
                $content = $content -replace "\b$importedName\b", $properName
            }
        }
    }
    
    # Remove all old icon imports
    $content = $content -creplace $importPattern, ''
    
    # Add proper lucide-react import if icons were used
    if ($iconsUsed.Count -gt 0) {
        $uniqueIcons = $iconsUsed | Select-Object -Unique | Sort-Object
        $iconImport = "import { $($uniqueIcons -join ', ') } from `"lucide-react`""
        
        # Find the first import statement and add our import after it
        if ($content -match '(import\s+[^;]+from\s+"[^"]+";?)') {
            $firstImport = $matches[0]
            $content = $content -replace [regex]::Escape($firstImport), "$firstImport`n$iconImport"
            $modified = $true
        }
    }
    
    # Add React import for files that need it
    if ($filesNeedingReact -contains $file.Name -and $content -notmatch 'import \* as React from "react"') {
        $content = "import * as React from `"react`"`n$content"
        $modified = $true
    }
    
    # Clean up multiple empty lines
    $content = $content -replace '(\r?\n){3,}', "`n`n"
    
    if ($modified) {
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

Write-Host "`nAll fixes applied successfully!" -ForegroundColor Cyan
Write-Host "Please run TypeScript compiler to verify." -ForegroundColor Yellow
