"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserContactForm } from "../../../components/forms/user-contact-form";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userKeyContact from "@/services/user-key-contact";
import Spinner from "@/components/spinner";
import ErrorMessage from "@/components/ui/error";
import { toast } from "@/hooks/use-toast";

export function UserContactsList({ onDelete }) {
  const [id, setId] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: userKeyContact.get,
    queryKey: ["user-key-contacts"],
  });

  const updateMutation = useMutation({
    mutationFn: (data) => userKeyContact.update(id, data),
    onSuccess: () => {
      toast({ title: "Success", description: "Contact updated successfully." });
      setIsUpdateDialogOpen(false);
      queryClient.invalidateQueries(["user-key-contacts"]);
    },
    onError: (error) =>
      toast({ title: "Success", description: "Something went wrong." }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => userKeyContact.deleteById(id),
    onSuccess: () => {
      console.log("object");
      toast({ title: "Success", description: "Contact deleted successfully." });
      setIsUpdateDialogOpen(false);
      queryClient.invalidateQueries(["user-key-contacts"]);
    },
    onError: (error) =>
      toast({
        title: "Success",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "Something went wrong.",
      }),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Key Contact</CardTitle>
            <CardDescription>Manage your company key contacts</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <UserContactForm
                type="create"
                closeModal={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {data.total === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No contacts added yet. Click {'"Add Contact"'} to create one.
            </div>
          ) : (
            <div className="space-y-6">
              {data.contacts?.map((contact) => (
                <Card key={contact.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-semibold">
                          {contact.person_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.designation}
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Email:</span>{" "}
                            {contact.email}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span>{" "}
                            {contact.contact_number}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 self-end md:self-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsUpdateDialogOpen(true);
                            setId(contact.id);
                          }}
                        >
                          <Pencil className="mr-1 h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setIsDeleteDialogOpen(true);
                            setId(contact.id);
                          }}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <UserKeyContactUpdateDialog
        {...{ isUpdateDialogOpen, setIsUpdateDialogOpen, updateMutation, id }}
      />
      <UserKeyDeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        deleteMutation={deleteMutation}
      />
    </>
  );
}

function UserKeyDeleteDialog({ isOpen, setIsOpen, deleteMutation }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the contact information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteMutation.mutate}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function UserKeyContactUpdateDialog({
  isUpdateDialogOpen,
  setIsUpdateDialogOpen,
  updateMutation,
  id,
}) {
  return (
    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <UserContactForm
          type={"edit"}
          updateMutation={updateMutation}
          id={id}
        />
      </DialogContent>
    </Dialog>
  );
}
