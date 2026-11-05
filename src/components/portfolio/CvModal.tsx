import { Download, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import cvFile from "@/assets/Muhammed_Ishaq_CV.pdf.asset.json";

export const CV_URL = cvFile.url;

/** In-page CV preview with download and open-in-tab actions. */
export function CvModal({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col gap-3 border-border bg-popover p-4 sm:p-6">
        <DialogHeader className="flex-row flex-wrap items-center justify-between gap-3 space-y-0 pr-8">
          <div>
            <DialogTitle className="font-display">Curriculum Vitae</DialogTitle>
            <DialogDescription>Muhammed Ishaq — AI/ML & Full-Stack Engineer</DialogDescription>
          </div>
          <div className="flex gap-2">
            <a href={CV_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:border-primary">
              <ExternalLink className="size-3.5" /> Open
            </a>
            <a href={CV_URL} download="Muhammed_Ishaq_CV.pdf" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              <Download className="size-3.5" /> Download
            </a>
          </div>
        </DialogHeader>
        <iframe src={`${CV_URL}#view=FitH`} title="CV preview" className="min-h-0 w-full flex-1 rounded-md border border-border bg-background" />
      </DialogContent>
    </Dialog>
  );
}
