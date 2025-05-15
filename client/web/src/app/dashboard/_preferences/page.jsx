"use client";
import Preferences from "@/components/preferences";
import React, { useState } from "react";

export default function PreferencesPage() {
  const [preferenceId, setPreferenceId] = useState("");

  return <Preferences id={preferenceId} setId={setPreferenceId} />;
}
