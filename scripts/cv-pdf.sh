#!/usr/bin/env bash
# Print the /cv page to PDF with headless Chrome.
#   scripts/cv-pdf.sh [URL] [OUT]
# Defaults: live site, ~/private/life/career/Maksim_Kunaev_CV.pdf.
# The phone number is read from CV_PHONE and passed as a query param, so it
# never lives in the repo or on the public page.
set -euo pipefail
URL="${1:-https://maksimkunaev.com/cv/}"
OUT="${2:-$HOME/private/life/career/Maksim_Kunaev_CV.pdf}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ -n "${CV_PHONE:-}" ]; then
  URL="${URL}?phone=$(python3 -c 'import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))' "$CV_PHONE")"
fi
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=10000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$OUT" "$URL" 2>/dev/null
echo "wrote $OUT"
