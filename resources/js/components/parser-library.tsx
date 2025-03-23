"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { defaultParserConfig } from "@/lib/default-parser-config"
// import { technicalParserConfig } from "@/lib/technical-parser-config"
// import { academicParserConfig } from "@/lib/academic-parser-config"

interface ParserLibraryProps {
    onSelectParser: (config: any) => void
}

export function ParserLibrary({ onSelectParser }: ParserLibraryProps) {
    const parserTemplates = [
        {
            id: "default",
            name: "Default Parser",
            description: "General purpose resume parser",
            config: defaultParserConfig,
        },
        {
            id: "custom",
            name: "My Custom Parser",
            description: "Modified for marketing roles",
            config: {
                ...defaultParserConfig,
                sections: {
                    ...defaultParserConfig.sections,
                    skills: {
                        priority: 2,
                        keywords: ["marketing", "social media", "SEO", "content creation"],
                    },
                },
            },
        },
    ]

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor="parser-template" className="text-sm font-medium">
                    Parser Templates
                </label>
                <div className="flex gap-2">
                    <Select
                        onValueChange={(value) => {
                            const template = parserTemplates.find((t) => t.id === value)
                            if (template) {
                                onSelectParser(template.config)
                            }
                        }}
                        defaultValue="default"
                    >
                        <SelectTrigger id="parser-template" className="flex-1">
                            <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                            {parserTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                    {template.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                        Save Current
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    Select a template or customize the parser configuration in the editor above
                </p>
            </div>
        </div>
    )
}

