# PowerShell script to fix imports in NOXX UI components

$path = "h:\Lucru\Domains\noxx.store\noxx-ui\src"

# Get all .tsx files
$files = Get-ChildItem -Path $path -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace @/lib/utils with ../utils or ../../utils depending on depth
    if ($file.Directory.Name -eq "ui") {
        $content = $content -replace '@/lib/utils', '../../utils'
    } else {
        $content = $content -replace '@/lib/utils', '../utils'
    }
    
    # Replace @/components/ui/ with ./ui/ or ../ui/ depending on location
    if ($file.Directory.Name -eq "ui") {
        $content = $content -replace '@/components/ui/', './'
    } else {
        $content = $content -replace '@/components/ui/', './ui/'
    }
    
    # Replace @/components/ with ./
    $content = $content -replace '@/components/', './'
    
    # Replace @/hooks/ - these won't be included, so we'll need to remove or make props
    # For now, keep track of files using hooks
    if ($content -match '@/hooks/') {
        Write-Host "File uses hooks: $($file.Name)"
    }
    
    # Replace @/assets/ - these also won't be included
    if ($content -match '@/assets/') {
        Write-Host "File uses assets: $($file.Name)"
    }
    
    # Save the modified content
    Set-Content -Path $file.FullName -Value $content -NoNewline
}

Write-Host "Import paths updated successfully!"
