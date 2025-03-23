"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

interface ResultsViewerProps {
    results: any
}

export function ResultsViewer({ results }: ResultsViewerProps) {
    const [viewMode, setViewMode] = useState("formatted")

    return (
        <div className="space-y-4">
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="formatted">Formatted</TabsTrigger>
                    <TabsTrigger value="raw">Raw JSON</TabsTrigger>
                </TabsList>

                <TabsContent value="formatted" className="mt-4">
                    <Card className="p-6">
                        {results && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold">{results.name}</h2>
                                    <div className="flex flex-wrap gap-3 text-sm">
                                        {results.email && (
                                            <span className="flex items-center gap-1">
                        <span className="font-medium">Email:</span> {results.email}
                      </span>
                                        )}
                                        {results.phone && (
                                            <span className="flex items-center gap-1">
                        <span className="font-medium">Phone:</span> {results.phone}
                      </span>
                                        )}
                                    </div>
                                </div>

                                {results.education && results.education.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold border-b pb-1">Education</h3>
                                        {results.education.map((edu: any, index: number) => (
                                            <div key={index} className="space-y-1">
                                                <div className="font-medium">{edu.institution}</div>
                                                <div className="text-sm">{edu.degree}</div>
                                                <div className="text-sm text-gray-500">{edu.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {results.experience && results.experience.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold border-b pb-1">Experience</h3>
                                        {results.experience.map((exp: any, index: number) => (
                                            <div key={index} className="space-y-1">
                                                <div className="font-medium">{exp.company}</div>
                                                <div className="text-sm">{exp.position}</div>
                                                <div className="text-sm text-gray-500">{exp.date}</div>
                                                <div className="text-sm">{exp.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {results.skills && results.skills.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-semibold border-b pb-1">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {results.skills.map((skill: string, index: number) => (
                                                <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                          {skill}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                </TabsContent>

                <TabsContent value="raw" className="mt-4">
                    <Card className="p-6">
            <pre className="text-sm overflow-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-md max-h-[500px]">
              {JSON.stringify(results, null, 2)}
            </pre>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
