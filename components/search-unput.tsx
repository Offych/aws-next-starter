import { Input } from "./ui/input";
import { Wand2 } from "lucide-react";

export default function SearchInput() {
    return (
        <div className="relative flex items-center w-full">
            <Wand2 className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input type="text" placeholder="Ask anything..." className="pl-9" />
        </div>
    );
}