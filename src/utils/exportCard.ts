import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const CARD_WIDTH_IN = 3.5;
export const CARD_HEIGHT_IN = 2;
export const EXPORT_WIDTH_PX = 1050;
export const EXPORT_HEIGHT_PX = 600;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  return html2canvas(element, {
    scale: 1,
    width: EXPORT_WIDTH_PX,
    height: EXPORT_HEIGHT_PX,
    useCORS: true,
    allowTaint: false,
    backgroundColor: null,
    logging: false,
  });
}

export async function captureCardCanvas(
  element: HTMLElement
): Promise<HTMLCanvasElement> {
  return captureElement(element);
}

export async function exportCardAsPng(
  element: HTMLElement,
  filename: string
): Promise<Blob> {
  const canvas = await captureElement(element);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to create PNG"))),
      "image/png",
      1
    );
  });

  downloadBlob(blob, `${filename}.png`);
  return blob;
}

export async function exportCardAsPdf(
  element: HTMLElement,
  filename: string
): Promise<Blob> {
  const canvas = await captureElement(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [CARD_WIDTH_IN, CARD_HEIGHT_IN],
    compress: true,
  });

  pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_IN, CARD_HEIGHT_IN, undefined, "FAST");

  const blob = pdf.output("blob");
  downloadBlob(blob, `${filename}.pdf`);
  return blob;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function sharePdfViaEmail(options: {
  element: HTMLElement;
  filename: string;
  recipientEmail: string;
  senderName: string;
  message?: string;
}): Promise<"shared" | "mailto"> {
  const { element, filename, recipientEmail, senderName, message } = options;
  const blob = await exportCardAsPdfBlob(element, filename);
  const file = new File([blob], `${filename}.pdf`, { type: "application/pdf" });

  const shareText =
    message ||
    `Hi,\n\nPlease find my business card attached.\n\nBest,\n${senderName}`;

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      title: `${senderName} — Business Card`,
      text: shareText,
      files: [file],
    });
    return "shared";
  }

  downloadBlob(blob, `${filename}.pdf`);

  const subject = encodeURIComponent(`${senderName} — Business Card`);
  const body = encodeURIComponent(
    `${shareText}\n\n(A PDF of my business card has been downloaded to your device — please attach it to this email.)`
  );
  const to = encodeURIComponent(recipientEmail);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

  return "mailto";
}

async function exportCardAsPdfBlob(
  element: HTMLElement,
  _filename: string
): Promise<Blob> {
  const canvas = await captureElement(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [CARD_WIDTH_IN, CARD_HEIGHT_IN],
    compress: true,
  });

  pdf.addImage(imgData, "PNG", 0, 0, CARD_WIDTH_IN, CARD_HEIGHT_IN, undefined, "FAST");
  return pdf.output("blob");
}
