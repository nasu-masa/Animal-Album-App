import exifr from "exifr";

function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function extractTakenAt(file: File): Promise<string> {
  if (file.type.startsWith("image/")) {
    try {
      const result = await exifr.parse(file, { pick: ["DateTimeOriginal"] });
      if (result?.DateTimeOriginal instanceof Date) {
        return toDateInputValue(result.DateTimeOriginal);
      }
    } catch {
      // EXIF 解析失敗は無視して lastModified にフォールバック
    }
  }
  return toDateInputValue(new Date(file.lastModified));
}
