import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export const useConfirm = (
    title: string,
    message: string
): [React.FC, () => Promise<boolean>] => {
    // Improved typing for promise state
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);

    // `confirm` function returns a Promise to handle the confirmation
    const confirm = (): Promise<boolean> =>
        new Promise((resolve) => {
            setPromise({ resolve });
        });

    // Handles the closure of the dialog
    const handleClose = () => {
        setPromise(null);
    };

    // Resolves the promise with `true` for confirmation
    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    // Resolves the promise with `false` for cancellation
    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    // Confirmation dialog component
    const ConfirmationDialog: React.FC = () => (
        <Dialog open={!!promise} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} variant="default">
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    // Returning the dialog component and the confirmation function
    return [ConfirmationDialog, confirm];
};
