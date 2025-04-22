import { Key } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
    onCreateKey: () => void
}

export function Empty({ onCreateKey }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/10">
            <h3 className="text-xl font-semibold mb-2">No API Keys</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
                You haven't created any API keys yet. API keys allow applications to authenticate with our service.
            </p>
            <Button onClick={onCreateKey} className="gap-2">
                Create your first API key
            </Button>
        </div>
    )
}
