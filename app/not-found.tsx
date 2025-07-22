import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-6">
            <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
            <p className="text-muted-foreground max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
            <Button variant="outline" asChild>
                <Link href="/">Go Home</Link>
            </Button>
        </div>
    );
} 