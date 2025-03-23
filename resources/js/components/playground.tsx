"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { JsonEditor } from "@/components/json-editor"
import { ResultsViewer } from "@/components/results-viewer"
import { ParserLibrary } from "@/components/parser-library"
import { ApiModal } from "@/components/api-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { defaultParserConfig } from "@/lib/default-parser-config"
import { Save } from "lucide-react"

export function Playground() {
    const [file, setFile] = useState<File | null>(null)
    const [parserConfig, setParserConfig] = useState(defaultParserConfig)
    const [results, setResults] = useState<any>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [activeTab, setActiveTab] = useState("parser")

    const handleFileUpload = (uploadedFile: File) => {
        setFile(uploadedFile)
    }

    const handleParseResume = async () => {
        if (!file) return

        setIsProcessing(true)

        try {
            // In a real implementation, you would send the file and parser config to your API
            // This is a mock implementation for demonstration purposes
            const formData = new FormData()
            formData.append("file", file)
            formData.append("config", JSON.stringify(parserConfig))

            // Mock API call with timeout to simulate processing
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Mock response - in a real app, this would come from your API
            const mockParsedData = {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+1 (555) 123-4567",
                education: [
                    {
                        institution: "University of Technology",
                        degree: "Bachelor of Science in Computer Science",
                        date: "2015-2019",
                    },
                ],
                experience: [
                    {
                        company: "Tech Solutions Inc.",
                        position: "Software Developer",
                        date: "2019-Present",
                        description: "Developed and maintained web applications using React and Node.js",
                    },
                    {
                        company: "Digital Innovations",
                        position: "Junior Developer",
                        date: "2018-2019",
                        description: "Assisted in the development of mobile applications",
                    },
                ],
                skills: ["JavaScript", "React", "Node.js", "Python", "Git"],
            }

            setResults(mockParsedData)
            setActiveTab("results")
        } catch (error) {
            console.error("Error parsing resume:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleForkParser = (newConfig: any) => {
        setParserConfig(newConfig)
    }

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="parser">Parser Configuration</TabsTrigger>
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                    <TabsTrigger value="results" disabled={!results}>
                        Results
                    </TabsTrigger>
                </TabsList>

                {/* Parser Configuration Tab */}
                <TabsContent value="parser" className="mt-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Parser Configuration</CardTitle>
                                <CardDescription>Customize how your resume is parsed by editing the JSON structure</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Save className="h-4 w-4" />
                                    Save
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <JsonEditor value={{"name": "Alex"}} onChange={setParserConfig} />
                            <ParserLibrary onSelectParser={handleForkParser} />
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={() => setActiveTab("upload")} variant="default">
                                Continue to Upload
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Upload Tab */}
                <TabsContent value="upload" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Resume</CardTitle>
                            <CardDescription>Upload a resume file to parse. Supported formats: PDF, DOCX, TXT</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileUploader onFileUpload={handleFileUpload} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setActiveTab("parser")}>
                                Back to Parser
                            </Button>
                            <Button onClick={handleParseResume} disabled={isProcessing || !file}>
                                {isProcessing ? "Processing..." : "Parse Resume"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Results Tab */}
                <TabsContent value="results" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Parsing Results</CardTitle>
                            <CardDescription>The structured data extracted from your resume</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResultsViewer results={results} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setActiveTab("upload")}>
                                Upload Another
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setActiveTab("parser")}>
                                    Edit Parser
                                </Button>
                                <Button
                                    onClick={() => {
                                        const dataStr = JSON.stringify(results, null, 2)
                                        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
                                        const downloadAnchorNode = document.createElement("a")
                                        downloadAnchorNode.setAttribute("href", dataUri)
                                        downloadAnchorNode.setAttribute("download", "resume_parsed.json")
                                        document.body.appendChild(downloadAnchorNode)
                                        downloadAnchorNode.click()
                                        downloadAnchorNode.remove()
                                    }}
                                >
                                    Download JSON
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
