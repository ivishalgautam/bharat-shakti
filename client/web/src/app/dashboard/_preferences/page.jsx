"use client";
import Preferences from "@/components/preferences";
import { useState } from "react";

export default function PreferencesPage() {
  const [preferenceId, setPreferenceId] = useState("");

  return <Preferences id={preferenceId} setId={setPreferenceId} />;
}
