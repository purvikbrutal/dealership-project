import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except Exception:
    print("NEED_PYPDF")
    sys.exit(0)

pdf_path = Path("public/docs/Automotive Consultancy (1) (1).pdf")
if not pdf_path.exists():
    print("MISSING")
    sys.exit(0)

reader = PdfReader(str(pdf_path))
text = "\n\n".join((page.extract_text() or "") for page in reader.pages)
Path("pdf_text.txt").write_text(text, encoding="utf-8")
print("EXTRACTED")
