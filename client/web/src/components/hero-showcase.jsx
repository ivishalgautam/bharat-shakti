"use client";

import { useState } from "react";
import { HeroOne } from "@/components/hero-one";
import { HeroTwo } from "@/components/hero-two";
import HeroThree from "@/components/hero-three";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HeroShowcase() {
  const [activeTab, setActiveTab] = useState("hero1");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Tender Hero Section Designs</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Choose from multiple hero section designs for your tender bidding
          website. Each design includes a powerful search functionality to help
          users find relevant tenders quickly.
        </p>
      </div>

      <Tabs
        defaultValue="hero1"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="mb-8 flex justify-center">
          <TabsList>
            <TabsTrigger value="hero1">Design 1</TabsTrigger>
            <TabsTrigger value="hero2">Design 2</TabsTrigger>
            <TabsTrigger value="hero3">Design 3</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hero1">
          <HeroOne />
        </TabsContent>
        <TabsContent value="hero2">
          <HeroTwo />
        </TabsContent>
        <TabsContent value="hero3">
          <HeroThree />
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">Implementation Details</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Each hero section includes a fully functional tender search component
          with filters for categories, locations, and keywords. The search
          functionality can be easily integrated with your backend API.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => setActiveTab("hero1")}>Design 1</Button>
          <Button onClick={() => setActiveTab("hero2")}>Design 2</Button>
          <Button onClick={() => setActiveTab("hero3")}>Design 3</Button>
        </div>
      </div>
    </div>
  );
}
