"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import xIcon from "@/assets/icons/x.png";
type UserBlockedDialogProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  message?: React.ReactNode;
};

export default function UserBlockedDialog({
  open,
  onClose,
  message,
}: UserBlockedDialogProps) {
  const handleConfirm = () => {
    onClose(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="w-full flex items-center justify-center">
              <img className="size-12" src={xIcon} alt="" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Contact Us
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
