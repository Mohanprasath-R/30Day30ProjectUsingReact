import { db } from "@/lib/firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

// Define Note type
export interface Note {
  id: string;
  content: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  tag?: string;
}

// Props to receive edit handler from parent
interface NoteListProps {
  onEdit: (note: Note) => void;
}

const NoteList = ({ onEdit }: NoteListProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filterTag, setFilterTag] = useState("all");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      const notesData: Note[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const filteredNotes =
    filterTag === "all" ? notes : notes.filter((note) => note.tag === filterTag);

  const uniqueTags = Array.from(
    new Set(notes.map((note) => note.tag || "untagged").filter(Boolean))
  );

  return (
    <div className="mt-6 space-y-4">
      {/* Tag Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["all", ...uniqueTags].map((tag) => (
          <Button
            key={tag}
            className={`px-3 py-1 rounded border transition hover:text-white ${
              filterTag === tag
                ? "bg-primary text-white"
                : "bg-white text-black border-gray-300"
            }`}
            onClick={() => setFilterTag(tag)}
          >
            {tag === "all" ? "All Tags" : `#${tag}`}
          </Button>
        ))}
      </div>

      {/* No Notes Found */}
      {filteredNotes.length === 0 ? (
        <div className="text-center text-gray-500 mt-4">No notes found.</div>
      ) : (
        <div
          className={`grid gap-4 ${
            filteredNotes.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="border p-5 rounded-xl shadow space-y-2"
            >
              <p className="text-gray-800">{note.content}</p>
              {note.tag && (
                <span className="text-sm bg-blue-400 text-white px-2 py-1 rounded mb-2">{note.tag}</span>
              )}
              {note.createdAt && (
                <p className="text-xs mt-2 text-gray-500">
                  {new Date(
                    note.createdAt.seconds * 1000
                  ).toLocaleString()}
                </p>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onEdit(note)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
