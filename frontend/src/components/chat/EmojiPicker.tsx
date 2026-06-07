import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useThemeStore } from "@/stores/useThemeStore";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import Data from "@emoji-mart/data";

interface EmojiPickerProps{
    onChange:(value:string)=>void;
}
const EmojiPicker = ({onChange}:EmojiPickerProps) => {
    const {isDark} = useThemeStore();
  return (
    <Popover>
        <PopoverTrigger className="hover:bg-primary/10 size-8 rounded-lg flex items-center justify-center transition-smooth cursor-pointer text-muted-foreground hover:text-foreground">
            <Smile className="size-5"/>
        </PopoverTrigger>
        <PopoverContent side="right" sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-12"
        >
            <Picker
                theme={isDark ? "dark": "light"}
                data={Data}
                onEmojiSelect={(emoji: { native: string }) => onChange(emoji.native)}
                emojiSize={24}
            
            />
        </PopoverContent>
        
    </Popover>
  )
}

export default EmojiPicker