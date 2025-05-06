"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContactsList } from "./user-contact-list";
import { CompanyProfileForm } from "../../../components/forms/company-profile-form";

export default function CompanyProfilePage() {
  return (
    <div className="space-y-8">
      {/* <h1 className="text-3xl font-bold">Company Profile</h1> */}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Company Details</TabsTrigger>
          <TabsTrigger value="contacts">Key Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <CompanyProfileForm />
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <UserContactsList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
