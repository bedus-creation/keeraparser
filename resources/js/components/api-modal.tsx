"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
// import { ApiCurl } from "@/components/api-curl"

interface ApiModalProps {
    parserConfig: any
    fileName?: string
}

export function ApiModal({ parserConfig, fileName }: ApiModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Code className="h-4 w-4" />
                    API Integration
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>API Integration</DialogTitle>
                    <DialogDescription>Integrate the resume parser into your own applications</DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/*<ApiCurl parserConfig={parserConfig} fileName={fileName || "resume.pdf"} />*/}

                    <div className="prose max-w-none dark:prose-invert">
                        <h3 className="text-lg font-semibold">API Response</h3>
                        <p className="text-sm text-muted-foreground">
                            The API returns a JSON object containing the parsed resume data according to your parser configuration.
                        </p>

                        <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-xs">
              <pre className="whitespace-pre-wrap">
                {`{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "education": [
    {
      "institution": "University of Technology",
      "degree": "Bachelor of Science in Computer Science",
      "date": "2015-2019"
    }
  ],
  "experience": [
    {
      "company": "Tech Solutions Inc.",
      "position": "Software Developer",
      "date": "2019-Present"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "Python", "Git"]
}`}
              </pre>
                        </div>
                    </div>

                    <div className="prose max-w-none dark:prose-invert">
                        <h3 className="text-lg font-semibold">Rate Limits</h3>
                        <p className="text-sm text-muted-foreground">
                            The API has the following rate limits based on your subscription plan:
                        </p>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                            <li>
                                <strong>Free:</strong> 10 requests per day
                            </li>
                            <li>
                                <strong>Basic:</strong> 100 requests per day
                            </li>
                            <li>
                                <strong>Professional:</strong> 1,000 requests per day
                            </li>
                            <li>
                                <strong>Enterprise:</strong> Custom limits
                            </li>
                        </ul>
                    </div>

                    <div className="prose max-w-none dark:prose-invert">
                        <h3 className="text-lg font-semibold">Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                            All API requests require an API key that should be included in the Authorization header. You can generate
                            an API key in your account dashboard.
                        </p>
                        <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-xs">
                            <pre className="whitespace-pre-wrap">{`Authorization: Bearer YOUR_API_KEY`}</pre>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

