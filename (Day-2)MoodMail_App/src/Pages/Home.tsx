import MoodInput from '@/components/MoodInput'
import MoodOutput from '@/components/MoodOutput'
import { useState } from 'react'

const Home = () => {
    const [mood, setMood] = useState(""); // Example mood
    const [subject, setSubject] = useState(""); // Example mood
    const [footer, setFooter] = useState(""); // Example mood
    const [generated, setGenerated] = useState(false); // Example mood
    const [emoji, setEmoji] = useState(""); // Emoji based on mood
    const [quote, setQuote] = useState(""); // Quote based on mood
    
    const handleGenerate = () => {
        const moodLower = mood.toLowerCase();
        const today = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        if (moodLower.includes("happy")) {
            setSubject(`Feeling Great Today ! - ( ${today} )`);
            setFooter("Stay awesome and keep smiling!");
            setEmoji("😊😄🎉");
            setQuote("Happiness is not something ready made. It comes from your own actions.");
        } else if (moodLower.includes("sad")) {
            setSubject(`Just another tough Day - ( ${today} )`);
            setFooter("Sending hugs your way!");
            setEmoji("😢💙🤗");
            setQuote("Every storm runs out of rain.");
        }
        else if (moodLower.includes("angry")) {
            setSubject(`Channeling Anger Positively - ( ${today} )`);
            setFooter("Take a deep breath and relax!");
            setEmoji("😠💪🧘");
            setQuote("Anger is one letter away from danger.");
        } else if (moodLower.includes("excited")) {
            setSubject(`Excitement is in the Air ! - ( ${today} )`);
            setFooter("Keep that energy flowing!");
            setEmoji("🤩⚡🔥");
            setQuote("Excitement is the guard at the door of possibility.");
        } else if (moodLower.includes("nervous")) {
            setSubject(`Nerves are Normal - ( ${today} )`);
            setFooter("You've got this, stay calm!");
            setEmoji("😰🧘💚");
            setQuote("Courage is not the absence of fear, but the mastery of fear.");
        } else {
            setSubject(`Mood Update - ( ${today} )`);
            setFooter("Catch up with your feelings!");
            setEmoji("🤔💭🌈");
            setQuote("Your feelings are valid.");
        }
        setGenerated(true);
    }

  return (
    <div className='max-w-xl mx-auto mt-20 p-6 rounded-lg shadow-sm bg-black text-white space-y-10'>
        <h2 className='text-4xl text-center  font-bold text-blue-400'>😊MoodMail Generator🔮 </h2>
        {!generated ? (
            <MoodInput 
            mood={mood} 
            setMood={setMood} 
            onGenerate={handleGenerate}
            disabled={generated} 
        />):(<MoodOutput 
            subject={subject}
            footer={footer}
            emoji={emoji}
            quote={quote}
            onReset={() => {
                setMood("");
                setSubject("");
                setFooter("");
                setGenerated(false);
                setEmoji("");
                setQuote("");
            }}
        />)}
        
    </div>
  )
}

export default Home
