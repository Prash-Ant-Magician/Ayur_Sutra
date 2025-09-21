
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";

interface DoctorVisitingSlipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  slipData: {
    patientName?: string;
    practitionerName?: string;
    therapyType?: string;
    date?: string;
    time?: string;
    clinicName?: string;
    clinicAddress?: string;
  };
}

export function DoctorVisitingSlipDialog({ isOpen, onClose, slipData }: DoctorVisitingSlipDialogProps) {

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 printable-area">
        <div className="p-6">
            <DialogHeader className="text-center space-y-4">
                 <div className="flex items-center justify-center gap-2 mb-4">
                    <Logo className="h-10 w-auto text-primary" />
                    <span className="font-headline text-3xl font-bold text-foreground">AyurSutra</span>
                </div>
                <DialogTitle className="font-headline text-2xl">Doctor Visiting Slip</DialogTitle>
                <DialogDescription>This confirms the patient's appointment details.</DialogDescription>
            </DialogHeader>
            <div className="my-6 space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient Name:</span>
                    <span className="font-semibold">{slipData.patientName}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Practitioner:</span>
                    <span className="font-semibold">{slipData.practitionerName}</span>
                </div>
                 <Separator />
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Therapy:</span>
                    <span className="font-semibold">{slipData.therapyType}</span>
                </div>
                 <Separator />
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-semibold">{slipData.date}</span>
                </div>
                 <Separator />
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-semibold">{slipData.time}</span>
                </div>
                 <Separator />
                 <div className="text-center pt-4">
                    <p className="font-bold">{slipData.clinicName}</p>
                    <p className="text-muted-foreground">{slipData.clinicAddress}</p>
                 </div>
            </div>
        </div>
        <DialogFooter className="bg-muted p-4 print-hide">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handlePrint}>Print Slip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
