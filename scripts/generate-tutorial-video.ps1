param(
  [string]$OutputDir = "docs\tutorial-video"
)

Add-Type -AssemblyName System.Drawing

$root = (Resolve-Path ".").Path
$output = Join-Path $root $OutputDir
New-Item -ItemType Directory -Force -Path $output | Out-Null

$width = 1080
$height = 1920
$fontFamily = "Arial"
$green = [System.Drawing.Color]::FromArgb(31, 61, 54)
$gold = [System.Drawing.Color]::FromArgb(200, 169, 106)
$paper = [System.Drawing.Color]::FromArgb(244, 239, 230)
$ink = [System.Drawing.Color]::FromArgb(22, 19, 15)
$muted = [System.Drawing.Color]::FromArgb(117, 111, 100)
$white = [System.Drawing.Color]::White

function Brush($color) { return New-Object System.Drawing.SolidBrush($color) }
function Font($size, $style = [System.Drawing.FontStyle]::Regular) { return New-Object System.Drawing.Font($fontFamily, $size, $style, [System.Drawing.GraphicsUnit]::Pixel) }
function RoundedRect($g, $x, $y, $w, $h, $r, $color) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $g.FillPath((Brush $color), $path)
  $path.Dispose()
}
function Txt($g, $text, $x, $y, $size, $color, $bold = $false, $max = 0) {
  $style = if ($bold) { [System.Drawing.FontStyle]::Bold } else { [System.Drawing.FontStyle]::Regular }
  $f = Font $size $style
  $b = Brush $color
  if ($max -gt 0) { $g.DrawString($text, $f, $b, [System.Drawing.RectangleF]::new($x, $y, $max, 500), (New-Object System.Drawing.StringFormat)) }
  else { $g.DrawString($text, $f, $b, $x, $y) }
  $f.Dispose(); $b.Dispose()
}
function Header($g, $step, $label) {
  Txt $g "unimercs" 74 70 42 $green $true
  Txt $g ("{0:00} · {1}" -f $step, $label.ToUpper()) 74 132 20 $muted $true
  $g.DrawLine((New-Object System.Drawing.Pen($gold, 4)), 74, 174, 1006, 174)
}
function Cursor($g, $x, $y) {
  $points = [System.Drawing.Point[]]@((New-Object System.Drawing.Point($x,$y)),(New-Object System.Drawing.Point($x+12,$y+48)),(New-Object System.Drawing.Point($x+25,$y+29)),(New-Object System.Drawing.Point($x+45,$y+57)),(New-Object System.Drawing.Point($x+56,$y+47)),(New-Object System.Drawing.Point($x+36,$y+20)),(New-Object System.Drawing.Point($x+64,$y+18)))
  $g.FillPolygon((Brush $ink), $points)
}
function Phone($g, $x, $y, $scale) {
  $w = 720 * $scale; $h = 1220 * $scale
  RoundedRect $g $x $y $w $h (50*$scale) $ink
  RoundedRect $g ($x+18*$scale) ($y+18*$scale) ($w-36*$scale) ($h-36*$scale) (38*$scale) $white
}
function Card($g, $x, $y, $w, $h, $title, $sub, $accent) {
  RoundedRect $g $x $y $w $h 26 $white
  RoundedRect $g ($x+18) ($y+18) ($w-36) 130 18 $accent
  Txt $g $title ($x+22) ($y+168) 26 $ink $true ($w-44)
  Txt $g $sub ($x+22) ($y+215) 19 $muted $false ($w-44)
}
function CreateFrame($index, $draw) {
  $bitmap = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear($paper)
  & $draw $g
  $path = Join-Path $output ("frame-{0:00}.png" -f $index)
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bitmap.Dispose()
}

CreateFrame 1 {
  param($g); Header $g 1 "Bienvenido"
  RoundedRect $g 74 250 932 510 40 $green
  Txt $g "Vende el libro." 124 335 72 $white $true
  Txt $g "Quédate con la plata\ndel semestre." 124 425 64 $white $true 650
  RoundedRect $g 124 625 330 72 36 $gold
  Txt $g "Empezar a vender" 158 644 25 $ink $true
  Card $g 74 820 280 310 "Libros" "Para el próximo semestre" ([System.Drawing.Color]::FromArgb(220, 210, 190))
  Card $g 400 820 280 310 "Tech" "Laptops y accesorios" ([System.Drawing.Color]::FromArgb(185, 206, 195))
  Card $g 726 820 280 310 "Dorm" "Todo para tu cuarto" ([System.Drawing.Color]::FromArgb(220, 198, 158))
  Txt $g "1. Empieza desde el home" 74 1220 38 $ink $true
  Txt $g "Explora o publica lo que ya no necesitas." 74 1272 26 $muted $false 850
}
CreateFrame 2 {
  param($g); Header $g 1 "Toca vender"
  RoundedRect $g 74 250 932 510 40 $green
  Txt $g "Vende el libro." 124 335 72 $white $true
  Txt $g "Quédate con la plata\ndel semestre." 124 425 64 $white $true 650
  RoundedRect $g 108 602 370 118 59 $gold
  RoundedRect $g 124 625 330 72 36 ([System.Drawing.Color]::FromArgb(238, 216, 170))
  Txt $g "Empezar a vender" 158 644 25 $ink $true
  Cursor $g 412 674
  Txt $g "Toca “Empezar a vender”" 74 840 42 $ink $true
  Txt $g "El flujo abre la publicación en un solo paso." 74 900 26 $muted $false 850
}
CreateFrame 3 {
  param($g); Header $g 2 "Publica"
  RoundedRect $g 74 230 932 1340 42 $white
  Txt $g "Publica tu artículo" 124 286 54 $ink $true
  Txt $g "Agrega varias fotos del producto" 124 356 26 $muted
  for($i=0;$i -lt 3;$i++){ RoundedRect $g (124+$i*250) 435 210 210 26 ([System.Drawing.Color]::FromArgb(220-$i*10, 211+$i*3, 192+$i*6)); Txt $g ("Foto {0}" -f ($i+1)) (172+$i*250) 530 24 $ink $true }
  RoundedRect $g 124 700 832 82 24 $paper; Txt $g "Libro de Cálculo II" 154 725 30 $ink
  RoundedRect $g 124 810 390 82 24 $paper; Txt $g "$25.000 COP" 154 835 30 $ink
  RoundedRect $g 548 810 408 82 24 $paper; Txt $g "Como nuevo" 578 835 30 $ink
  RoundedRect $g 124 960 832 92 35 $green; Txt $g "Publicar artículo" 398 990 32 $white $true
  Txt $g "2. Sube fotos, precio y estado" 74 1640 38 $ink $true
}
CreateFrame 4 {
  param($g); Header $g 2 "Publicado"
  RoundedRect $g 74 250 932 360 42 $green
  Txt $g "Tu publicación\nestá lista." 124 318 70 $white $true 670
  Txt $g "Los estudiantes ya pueden encontrarla." 124 500 28 ([System.Drawing.Color]::FromArgb(229,238,230))
  Card $g 74 690 932 420 "Libro de Cálculo II" "$25.000 COP · Como nuevo" ([System.Drawing.Color]::FromArgb(204, 220, 211))
  Txt $g "Aparece automáticamente en Explorar." 74 1210 32 $ink $true 850
}
CreateFrame 5 {
  param($g); Header $g 3 "Explora"
  Txt $g "Encuentra exactamente\nlo que necesitas." 74 230 60 $ink $true 850
  RoundedRect $g 74 410 932 86 43 $white
  Txt $g "Buscar “Cálculo”" 122 436 29 $muted
  RoundedRect $g 74 518 932 186 25 $white
  Txt $g "Libro de Cálculo II" 118 548 27 $ink $true
  Txt $g "$25.000 COP" 118 590 24 $green $true
  Txt $g "Calculadora científica" 118 640 27 $ink $true
  Txt $g "$68.000 COP" 118 680 24 $green $true
  Cursor $g 340 442
  Txt $g "3. Escribe y revisa sugerencias" 74 790 38 $ink $true
}
CreateFrame 6 {
  param($g); Header $g 3 "Filtra"
  RoundedRect $g 74 230 294 1180 34 $white
  Txt $g "Filtros" 112 278 34 $ink $true
  Txt $g "Categorías" 112 350 23 $muted $true
  foreach($pair in @(@('Libros',400),@('Electrónica',470),@('Dorm',540),@('Precio',640),@('Estado',760))){ RoundedRect $g 112 $pair[1] 218 44 18 $paper; Txt $g $pair[0] 130 ($pair[1]+10) 19 $ink }
  Txt $g "Resultados" 420 270 40 $ink $true
  Card $g 420 340 270 330 "Libro" "$25.000" ([System.Drawing.Color]::FromArgb(208,224,216))
  Card $g 720 340 270 330 "Calculadora" "$68.000" ([System.Drawing.Color]::FromArgb(222,210,190))
  Card $g 420 710 270 330 "Lámpara" "$35.000" ([System.Drawing.Color]::FromArgb(204,218,226))
  Card $g 720 710 270 330 "Audífonos" "$70.000" ([System.Drawing.Color]::FromArgb(222,205,180))
  Txt $g "Filtra por categoría, precio y estado." 74 1510 34 $ink $true
}
CreateFrame 7 {
  param($g); Header $g 4 "Detalle"
  RoundedRect $g 74 230 932 1260 42 $white
  RoundedRect $g 124 280 832 500 30 ([System.Drawing.Color]::FromArgb(198,216,206))
  Txt $g "Fotos del producto" 365 510 34 $green $true
  Txt $g "Libro de Cálculo II" 124 840 52 $ink $true
  Txt $g "$25.000 COP" 124 910 40 $green $true
  Txt $g "★★★★★  Vendedor verificado" 124 978 27 $gold $true
  RoundedRect $g 124 1060 832 120 28 $paper
  Txt $g "Biblioteca Central · Punto seguro sugerido" 154 1098 25 $ink $true
  Txt $g "4. Revisa fotos, precio y reputación" 74 1570 36 $ink $true
}
CreateFrame 8 {
  param($g); Header $g 4 "Contacta"
  RoundedRect $g 74 240 932 1050 42 $white
  Txt $g "¿Te interesa?" 124 310 60 $ink $true
  Txt $g "Coordina directamente con el vendedor." 124 390 29 $muted  $false 760
  RoundedRect $g 124 525 832 118 35 ([System.Drawing.Color]::FromArgb(37,211,102))
  Txt $g "Contactar por WhatsApp" 335 563 31 $white $true
  Cursor $g 824 625
  RoundedRect $g 124 720 832 254 30 $paper
  Txt $g "Hola, ¿sigue disponible?" 160 764 27 $ink
  Txt $g "¿Dónde nos vemos en el campus?" 160 830 27 $ink
  Txt $g "5. Sin comisiones ni intermediarios" 74 1390 38 $ink $true
}
CreateFrame 9 {
  param($g); Header $g 5 "SafeZones"
  Txt $g "Elige un punto seguro\ndentro del campus." 74 235 60 $ink $true 850
  RoundedRect $g 74 460 932 760 42 ([System.Drawing.Color]::FromArgb(209,228,216))
  for($i=0;$i -lt 7;$i++){ $g.DrawLine((New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(170,199,179),8)), 100, (520+$i*90), 980, (470+$i*105)) }
  $g.FillEllipse((Brush $green), 476, 775, 110, 110)
  $g.FillPolygon((Brush $green), [System.Drawing.Point[]]@((New-Object System.Drawing.Point(476,830)),(New-Object System.Drawing.Point(586,830)),(New-Object System.Drawing.Point(531,960))))
  Txt $g "Biblioteca Central" 364 810 23 $white $true
  Txt $g "6. Selecciona un SafeZone preciso" 74 1320 38 $ink $true
  Txt $g "Mapa real, sin claves ni errores." 74 1378 26 $muted
}
CreateFrame 10 {
  param($g); Header $g 5 "Encuentro seguro"
  RoundedRect $g 74 250 932 990 42 $green
  Txt $g "Más tranquilidad\npara ambos." 124 330 72 $white $true 730
  Txt $g "Encuéntrense en lugares visibles\ny recomendados del campus." 124 535 30 ([System.Drawing.Color]::FromArgb(227,238,229)) $false 710
  RoundedRect $g 124 800 520 84 34 $gold
  Txt $g "Ver puntos seguros" 178 827 28 $ink $true
}
CreateFrame 11 {
  param($g); Header $g 6 "Tu espacio"
  RoundedRect $g 74 250 932 1070 42 $white
  RoundedRect $g 74 250 932 230 42 $green
  Txt $g "Mi Tienda Javeriana" 124 330 47 $white $true
  Txt $g "Productos, perfil y reputación" 124 394 25 ([System.Drawing.Color]::FromArgb(225,235,228))
  for($row=0;$row -lt 2;$row++){for($col=0;$col -lt 3;$col++){ Card $g (124+$col*270) (530+$row*300) 228 250 ("Producto {0}" -f ($row*3+$col+1)) "Disponible" ([System.Drawing.Color]::FromArgb(205+$col*5,220-$row*6,210+$row*5)) }}
  Txt $g "7. Tu perfil puede ser tu vitrina." 74 1420 38 $ink $true
}
CreateFrame 12 {
  param($g)
  $g.Clear($green)
  RoundedRect $g 405 380 270 270 74 $paper
  Txt $g "u" 482 416 150 $green $true
  Txt $g "unimercs" 290 730 92 $white $true
  Txt $g "Haz espacio. Ahorra.\nEncuentra lo que sigue." 212 865 48 $paper $true 700
  RoundedRect $g 300 1130 480 92 46 $gold
  Txt $g "Empieza hoy" 426 1158 34 $ink $true
  Txt $g "CAMPUS HUSTLE, HANDLED." 278 1370 23 $gold $true
}

$ffmpeg = 'C:\Users\juanp\AppData\Local\CapCut\Apps\8.8.0.3774\ffmpeg.exe'
if (-not (Test-Path -LiteralPath $ffmpeg)) { throw "No se encontró ffmpeg de CapCut." }
$movie = Join-Path $output 'unimercs-tutorial.mp4'
& $ffmpeg -y -framerate '1/4' -i (Join-Path $output 'frame-%02d.png') -r 30 -pix_fmt yuv420p -movflags +faststart $movie
if (-not (Test-Path -LiteralPath $movie)) { throw "No se pudo exportar el video." }
Write-Output "Video creado: $movie"
