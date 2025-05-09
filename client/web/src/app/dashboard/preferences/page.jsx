"use client";

import PreferencesForm from "@/components/forms/preferences";
import { H2 } from "@/components/ui/typography";
import preference from "@/services/preference";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function PreferencesPage() {
  return (
    <div className="space-y-4 rounded-lg bg-white p-6">
      <H2>Preferences</H2>

      <PreferencesForm />
    </div>
  );
}
