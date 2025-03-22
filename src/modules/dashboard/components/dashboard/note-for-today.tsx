import type React from 'react';
import { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { FaNotesMedical } from 'react-icons/fa6';
import { toast } from 'sonner';

import { Button } from '../../../../shared/components/ui/button';

export default function NoteForToday() {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const savedNote = localStorage.getItem('noteForToday');
    if (savedNote) setNote(savedNote);

    const savedTime = localStorage.getItem('noteForTodaySavedAt');
    if (savedTime) setLastSaved(savedTime);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const saveNote = () => {
    setIsSaving(true);

    // Simulate a delay to show the saving state
    setTimeout(() => {
      localStorage.setItem('noteForToday', note);
      const now = new Date().toLocaleTimeString();
      localStorage.setItem('noteForTodaySavedAt', now);
      setLastSaved(now);
      setIsSaving(false);
      toast.success('Note saved successfully');
    }, 500);
  };

  return (
    <div className="bg-primary shadow-lg rounded-3xl p-4 w-full h-full flex flex-col gap-2 text-yellow-400">
      <div className="flex w-full gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <FaNotesMedical />
          <h2 className="text-lg font-semibold">Note for Today</h2>
        </div>
        <Button size="sm" variant="secondary" className="gap-1" onClick={saveNote} disabled={isSaving}>
          <FaSave className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
      <textarea
        className="w-full hover:animate-pulse h-full p-2 border border-current rounded-lg focus:ring focus:ring-blue-300 resize-none grow transition-all"
        placeholder="Write your note here..."
        value={note}
        onChange={handleChange}
      />
      {lastSaved && <p className="text-xs text-primary-foreground/70 text-right">Last saved: {lastSaved}</p>}
    </div>
  );
}
