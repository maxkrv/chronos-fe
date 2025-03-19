import { useEffect, useState } from 'react';
import { FaNotesMedical } from 'react-icons/fa6';

export default function NoteForToday() {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem('noteForToday');
    if (savedNote) setNote(savedNote);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem('noteForToday', e.target.value);
  };

  return (
    <div className="bg-primary shadow-lg rounded-3xl p-4 w-full h-full flex flex-col gap-2 text-yellow-400">
      <div className="flex w-full gap-2 items-center justify-center">
        <FaNotesMedical />
        <h2 className="text-lg font-semibold text-center">Note for Today</h2>
      </div>
      <textarea
        className="w-full h-full p-2 border border-current rounded-lg focus:ring focus:ring-blue-300 resize-none grow"
        placeholder="Write your note here..."
        value={note}
        onChange={handleChange}
      />
    </div>
  );
}
