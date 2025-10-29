import { useState } from "react";
import { useAppStore } from "../state/useAppStore";

export default function TeacherControls() {
  const { settings, setSettings } = useAppStore();

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
      <div className="text-sm text-slate-600">
        {settings.teacherUnlocked ? "Teacher Mode: Unlocked" : "Teacher Mode: Locked"}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="btn-primary"
          aria-pressed={settings.teacherUnlocked}
          onClick={() => {
            if (!settings.teacherUnlocked) {
              const v = prompt("Enter 4-digit PIN");
              if (v && /^\d{4}$/.test(v) && v === settings.teacherPin) {
                setSettings({ teacherUnlocked: true });
              } else if (v !== null) {
                alert("Incorrect PIN");
              }
            } else {
              setSettings({ teacherUnlocked: false });
            }
          }}
        >
          {settings.teacherUnlocked ? "Lock Teacher Mode" : "Unlock Teacher Mode (PIN)"}
        </button>
        <button
          className="btn-secondary"
          onClick={() => {
            const v = prompt("Set new 4-digit PIN", settings.teacherPin || "1234");
            if (v && /^\d{4}$/.test(v)) setSettings({ teacherPin: v });
          }}
        >
          Set PIN
        </button>
      </div>
    </div>
  );
}
