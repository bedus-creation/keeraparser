'use client';

import { FileUploader } from '@/components/file-uploader';
import { ResultsViewer } from '@/components/results-viewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { defaultParserConfig } from '@/lib/default-parser-config';
import { TempMedia } from '@/pages/chat/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useRoute } from 'ziggy-js';

export function Playground({ tempMedia }: { tempMedia: TempMedia }) {
    const { data, setData, processing, post } = useForm<{
        files: File[];
    }>({
        files: [],
    });

    const route = useRoute();

    const [file, setFile] = useState<File | null>(null);
    const [parserConfig, setParserConfig] = useState(defaultParserConfig);
    const [results, setResults] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('upload');

    useEffect(() => {
        setActiveTab(route().current() === 'chats.show' ? 'results' : 'upload');
    }, [route]);

    const handleFileUpload = (uploadedFile: File) => {
        setData((files) => ({
            files: [...files.files, uploadedFile],
        }));
    };

    const handleParseResume = async () => {
        post('chats');
    };

    const handleForkParser = (newConfig: any) => {
        setParserConfig(newConfig);
    };

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                    <TabsTrigger value="results" disabled={!results}>
                        Results
                    </TabsTrigger>
                </TabsList>

                {/* Upload Tab */}
                <TabsContent value="upload" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Resume</CardTitle>
                            <CardDescription>Upload a resume file to parse. Supported formats: PDF, DOCX, TXT</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileUploader onFileUpload={handleFileUpload} files={data.files} />
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleParseResume} disabled={processing}>
                                {isProcessing ? 'Processing...' : 'Parse Resume'}
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
                            <Button variant="outline" onClick={() => setActiveTab('upload')}>
                                Upload Another
                            </Button>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        const dataStr = JSON.stringify(results, null, 2);
                                        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
                                        const downloadAnchorNode = document.createElement('a');
                                        downloadAnchorNode.setAttribute('href', dataUri);
                                        downloadAnchorNode.setAttribute('download', 'resume_parsed.json');
                                        document.body.appendChild(downloadAnchorNode);
                                        downloadAnchorNode.click();
                                        downloadAnchorNode.remove();
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
    );
}
