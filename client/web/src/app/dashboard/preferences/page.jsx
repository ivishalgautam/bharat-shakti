"use client";

import PreferencesForm from "@/components/forms/preferences";
import preference from "@/services/preference";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function PreferencesPage() {
  return (
    <div>
      <PreferencesForm />
    </div>
  );
}
