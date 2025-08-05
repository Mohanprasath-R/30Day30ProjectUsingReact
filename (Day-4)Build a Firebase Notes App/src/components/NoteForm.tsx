// Updated NoteForm.tsx
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

interface NoteFormProps {
    noteToEdit?: { id: string; content: string; tag?: string };
    onSave?: () => void;
}

const NoteForm = ({ noteToEdit, onSave }: NoteFormProps) => {
    const [note, setNote] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (noteToEdit) {
            setNote(noteToEdit.content);
            setTag(noteToEdit.tag || "");
        }
    }, [noteToEdit]);

    const handleSubmit = async () => {
        if (!note.trim()) return toast.error("Please fill the note...");

        setLoading(true);
        try {
            if (noteToEdit) {
                await updateDoc(doc(db, "notes", noteToEdit.id), {
                    content: note,
                    tag,
                });
                toast.success("Note updated");
            } else {
                await addDoc(collection(db, "notes"), {
                    content: note,
                    createdAt: serverTimestamp(),
                    tag,
                });
                toast.success("Note saved");
            }
            setNote("");
            setTag("");
            if (onSave) onSave();
        } catch {
            toast.error("Error saving note");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Input type="text" placeholder="Type your note..." value={note} onChange={(e) => setNote(e.target.value)} />
            <Input type="text" placeholder="Add tag (e.g. work, ideas)" value={tag} onChange={(e) => setTag(e.target.value)} />
            <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : noteToEdit ? "Update Note" : "Save Note"}
            </Button>

        </div>
    );
};

export default NoteForm;
