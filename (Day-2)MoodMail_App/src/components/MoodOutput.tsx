import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

type Props = {
    subject: string,
    footer: string,
    emoji: string,
    quote: string,
    onReset:() => void,
}

const MoodOutput = ({subject, footer, emoji, quote, onReset}: Props) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optional: Show a success message
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="space-y-4">
       <div>
         <label className="block font-medium">Subject: </label>
         <div className="flex items-center space-x-2">
            <Input value={subject} readOnly />
            <Button onClick={() => copyToClipboard(subject)} variant="outline" className="text-black">Copy</Button>
         </div>
       </div>
        
        <div>
            <label className="block font-medium">Footer Signature:</label>
            <div className="flex items-start space-x-2">
                <Textarea value={footer} readOnly />
                <Button onClick={() => copyToClipboard(footer)} variant="outline" className="mt-2 text-black">Copy</Button>
            </div>
        </div>

        {emoji && (
            <div>
                <label className="block font-medium">Mood Emojis:</label>
                <div className="text-3xl p-3 bg-gray-50 rounded-lg justify-center flex">{emoji}</div>
            </div>
        )}

        {quote && (
            <div>
                <label className="block font-medium">Inspirational Quote:</label>
                <div className="p-3  rounded-lg italic text-center">"{quote}"</div>
            </div>
        )}

        <Button variant="destructive" className="w-full" onClick={onReset}>Reset</Button>
    </div>
  )
}

export default MoodOutput
