import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () =>{
    const queryClient = useQueryClient();
    //todo confirmation dialog from edit account sheet
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({json});
            return await response.json();
        },
        onSuccess: () =>{
            toast.success("Accounts Deleted");
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
            //Also invalidate summaries
        },
        onError: () =>{
            toast.error("Failed to delete accounts");
        }
    });
    return mutation;


};


/*import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useConfirm } from "@/hooks/use-confirm";

type ResponseType = InferResponseType<
    typeof client.api.accounts["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
    typeof client.api.accounts["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    // Initialize the confirmation dialog with a custom title and message
    const [ConfirmDialog, confirm] = useConfirm(
        "Bulk Delete Accounts",
        "Are you sure you want to delete the selected accounts? This action cannot be undone."
    );

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Accounts deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError: () => {
            toast.error("Failed to delete accounts");
        },
    });

    const bulkDelete = async (data: RequestType) => {
        // Trigger confirmation dialog
        const ok = await confirm();
        if (ok) {
            mutation.mutate(data);
        }
    };

    return { bulkDelete, ConfirmDialog, isPending: mutation.isPending };
};*/
