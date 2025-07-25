import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
    text: string,
}

export default function SubmitButton({ text }: SubmitButtonProps) {
    return (
        <Button type="submit">{text}</Button>
    )
}