import { useState } from "react";
import NoteForm from '@/components/NoteForm';
import NoteList from '@/components/NoteList';

const Home = () => {
  const [editingNote, setEditingNote] = useState<{ id: string; content: string; tag?: string } | undefined>(undefined);

  return (
    <div className='flex items-center w-full justify-center px-4 py-8 bg-gray-50 max-w-screen-sm mx-auto'>
      <div className="w-full">
        <h1 className='text-center font-bold text-3xl mb-6'>
          📒 <span className="text-yellow-500">NoteNest</span><br />
          <span className="text-sm font-normal text-gray-500">Your tagged & editable notes</span>
        </h1>

        <div className='p-6 bg-white rounded-lg shadow-md space-y-4'>
          <NoteForm
            noteToEdit={editingNote}
            onSave={() => setEditingNote(undefined)}
          />
        </div>

        <NoteList onEdit={(note) => setEditingNote(note)} />
      </div>
    </div>
  );
};

export default Home;
