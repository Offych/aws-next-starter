import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { ScreenShare } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto flex h-12 items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1 font-bold text-base">
            <ScreenShare className="w-4 h-4" />
            Development
          </Link>
          <div className="hidden md:flex gap-1 ml-4">
            <Link href="/login" 
              className="text-muted-foreground hover:text-foreground transition-colors px-2 
              py-1 rounded-md font-medium">Login Page</Link>
            <Link href="/dashboard" 
              className="text-muted-foreground hover:text-foreground transition-colors px-2 
              py-1 rounded-md font-medium">Dashboard Page</Link>
            <Link href="/not-found" 
              className="text-muted-foreground hover:text-foreground transition-colors px-2 
              py-1 rounded-md font-medium">404 page</Link>
          </div>
        </div>
        <div className="flex items-center gap-1">
          Mode Switcher <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
