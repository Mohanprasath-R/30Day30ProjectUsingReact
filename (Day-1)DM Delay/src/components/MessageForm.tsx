import { useState} from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MessageForm = () => {
    const [message, setMessage] = useState<string>("");
    const [delay, setDelay] = useState<number>(1);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [sentMessage, setSentMessage] = useState<string>("");

    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSend = () => {
        setIsSending(true);

        const id = setTimeout(() => {
            setSentMessage(message);
            setMessage("");
            setIsSending(false);
            showToast("✔️ Message sent successfully", "success");
        }, delay * 1000);
        setTimerId(id);
    };

    const handleCancel = () => {
        if (timerId) clearTimeout(timerId);
        setIsSending(false);
        showToast("❌ Cancelled successfully", "error");
    };

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg z-50 
                    ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {toast.message}
                </div>
            )}

            {/* Message Form */}
            <div className='max-w-md mx-auto mt-20 w-75 p-6 border rounded-lg shadow-sm bg-white space-y-4'>
                <h2 className='text-2xl font-bold text-gray-800'>Dm Delay Button</h2>
                <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Delay in seconds..."
                    value={delay}
                    onChange={(e) => setDelay(Number(e.target.value))}
                    disabled={isSending}
                />
                {!isSending ? (
                    <Button className="w-full" onClick={handleSend}>
                        Send with delay
                    </Button>
                ) : (
                    <Button className="w-full" variant="destructive" onClick={handleCancel}>
                        Cancel sending
                    </Button>
                )}

                {sentMessage && (
                    <div className="bg-green-100 border rounded text-green-900 p-2 mt-2">
                        <p className="font-semibold">Message sent :</p>
                        {sentMessage}
                    </div>
                )}
            </div>
        </>
    );
};

export default MessageForm;
