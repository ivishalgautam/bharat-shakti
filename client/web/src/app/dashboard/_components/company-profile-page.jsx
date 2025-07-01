"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyProfileForm } from "../../../components/forms/company-profile-form";
import { UserContactsList } from "./user-contact-list";
import UserProfileForm from "@/components/forms/profile";
import user from "@/services/user";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/providers/auth-provider";

export default function CompanyProfilePage() {
  const { user: session } = useAuth();

  const updateMutation = useMutation({
    mutationFn: (data) => user.update(session.id, data),
    onSuccess: () => {
      toast({
        title: "Updated",
        description: "User updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description:
          error?.response?.data?.message ??
          error?.message ??
          "An error occurred",
      });
    },
  });

  return (
    <div className="space-y-8">
      {/* <h1 className="text-3xl font-bold">Company Profile</h1> */}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Company Details</TabsTrigger>
          <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
          <TabsTrigger value="personal-details">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <CompanyProfileForm />
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <UserContactsList />
        </TabsContent>

        <TabsContent value="personal-details" className="mt-6">
          <UserProfileForm updateMutation={updateMutation} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
