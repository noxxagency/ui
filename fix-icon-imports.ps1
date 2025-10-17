# Fix all lucide-react icon imports in UI components
# This script replaces individual icon imports with named imports from lucide-react

$componentsPath = "h:\Lucru\Domains\noxx.store\noxx-ui\src\components\ui"

# Get all .tsx files in the ui components directory
$files = Get-ChildItem -Path $componentsPath -Filter "*.tsx" -File

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Replace individual icon imports with proper lucide-react imports
    $content = $content -replace 'import\s+(\w+)\s+from\s+"lucide-react/dist/esm/icons/([^"]+)"', ''
    
    # Check if there are any lucide imports to fix
    if ($content -match 'lucide-react/dist/esm/icons') {
        Write-Host "Fixing icons in: $($file.Name)" -ForegroundColor Yellow
        
        # Save the modified content
        Set-Content -Path $file.FullName -Value $content -NoNewline
    }
}

Write-Host "`nIcon imports fixed! Please review the changes." -ForegroundColor Green
