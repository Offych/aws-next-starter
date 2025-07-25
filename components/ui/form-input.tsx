import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
    label: string
    id?: string
    name?: string
    type?: string
    className?: string
    inputClassName?: string
    required?: boolean
    description?: string
    pattern?: string
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    errorMessage?: string
}

export function FormInput({ label, name, type = "text", className = "w-full block", inputClassName = "w-full", required, id, pattern, description, ...props }: FormInputProps) {
    const inputId = id || name
    return (
        <div className={className}>
            <Label htmlFor={inputId}>
                {label}
                {/* {description && <span className="text-sm text-muted-foreground">{description}</span>} */}
                {/* {required && <span className="text-destructive ml-1">*</span>} */}
            </Label>
            <Input id={inputId} name={name} type={type} className={inputClassName} required={required} pattern={pattern} {...props} />
        </div>
    )
} 