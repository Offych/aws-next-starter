import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PageHeaderProps {
    title: string
    subtitle?: string
    className?: string
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
    return (
        <div className={className + " mb-6"}>
            <div>
                <div>{title}</div>
                {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </div>
        </div>
    )
} 