import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Select } from "@/components/select";

export const useSelectAccount = (): [React.FC, () => Promise<string | undefined |boolean>] => {
    // Improved typing for promise state

    const accountQuery = useGetAccounts();
    const accountMutation = useCreateAccount();
    const onCreateAccount = (name:string) => accountMutation.mutate({
        name
    });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const [promise, setPromise] = useState<{
        resolve: (value: string | undefined | boolean) => void;
    } | null>(null);

    const selectValue = useRef<string>();

    // `confirm` function returns a Promise to handle the confirmation
    const confirm = (): Promise<string | undefined |boolean> =>
        new Promise((resolve) => {
            setPromise({ resolve });
        });

    // Handles the closure of the dialog
    const handleClose = () => {
        setPromise(null);
    };

    // Resolves the promise with `true` for confirmation
    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    };

    // Resolves the promise with `false` for cancellation
    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    };

    // Confirmation dialog component
    const ConfirmationDialog: React.FC = () => (
        <Dialog open={!!promise} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Account</DialogTitle>
                    <DialogDescription>Please select an account to continue.</DialogDescription>
                </DialogHeader>
                <Select 
                    placeholder="Select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => selectValue.current = value}
                    disabled={accountQuery.isLoading || accountMutation.isPending}
                />
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
