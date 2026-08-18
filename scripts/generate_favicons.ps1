Add-Type -AssemblyName System.Drawing

$srcPath = "d:\vite-project\public\DW_22-removebg-preview.png"
if (-not (Test-Path $srcPath)) {
    $srcPath = "d:\vite-project\public\dw-logo-premium.png"
}

$srcImage = [System.Drawing.Image]::FromFile($srcPath)

function Generate-Favicon($size, $outputPath, $bgColor) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    if ($bgColor -ne "transparent") {
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($bgColor))
        $g.FillRectangle($brush, 0, 0, $size, $size)
        $brush.Dispose()
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    # Calculate centered scaling with padding
    $pad = [int]($size * 0.08)
    $availSize = $size - (2 * $pad)
    
    $aspect = $srcImage.Width / $srcImage.Height
    if ($aspect -gt 1) {
        $drawW = $availSize
        $drawH = [int]($availSize / $aspect)
    } else {
        $drawH = $availSize
        $drawW = [int]($availSize * $aspect)
    }

    $x = [int]($pad + ($availSize - $drawW) / 2)
    $y = [int]($pad + ($availSize - $drawH) / 2)

    $g.DrawImage($srcImage, $x, $y, $drawW, $drawH)
    $g.Dispose()

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated: $outputPath ($size x $size)"
}

# Generate all favicon sizes required by Google, Apple, and browsers
Generate-Favicon 16 "d:\vite-project\public\favicon-16x16.png" "transparent"
Generate-Favicon 32 "d:\vite-project\public\favicon-32x32.png" "transparent"
Generate-Favicon 48 "d:\vite-project\public\favicon-48x48.png" "transparent"
Generate-Favicon 180 "d:\vite-project\public\apple-touch-icon.png" "#0d2545"
Generate-Favicon 192 "d:\vite-project\public\android-chrome-192x192.png" "transparent"
Generate-Favicon 512 "d:\vite-project\public\android-chrome-512x512.png" "transparent"
Generate-Favicon 512 "d:\vite-project\public\logo512.png" "#0d2545"
Generate-Favicon 32 "d:\vite-project\public\favicon.ico" "transparent"

$srcImage.Dispose()
Write-Host "Favicon generation complete!"
