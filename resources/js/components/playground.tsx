'use client';

import { Error } from '@/components/error';
import { FileUploader } from '@/components/file-uploader';
import { ResultsViewer } from '@/components/results-viewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Chat, ParserList } from '@/pages/chat/types';
import { BaseFile } from '@/types/types';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useRoute } from 'ziggy-js';

export function Playground({ parsers, chat }: { chat: Chat, parsers: ParserList[] }) {
    const { data, setData, processing, post, errors } = useForm<{
        parser_id: number | null;
        files: BaseFile[];
    }>({
        parser_id: null,
        files: [],
    });

    const route = useRoute();

    const [results, setResults] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('upload');

    useEffect(() => {
        setActiveTab(route().current() === 'chats.show' ? 'results' : 'upload');
    }, [route]);

    const handleFileUpload = (uploadedFile: BaseFile) => {
        setData((files) => ({
            ...files,
            files: [...files.files, uploadedFile],
        }));
    };

    const removeFile = (file: BaseFile) => {
        setData(
            'files',
            data.files.filter((item) => item.path != file.path),
        );
    };

    const handleParseResume = async () => {
        post('chats');
    };

    return (
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload Resume</TabsTrigger>
                    <TabsTrigger value="results" disabled={!chat?.response}>
                        Results
                    </TabsTrigger>
                </TabsList>

                {/* Upload Tab */}
                <TabsContent value="upload" className="mt-4">
                    <Card>
                        <CardContent className="grid grid-cols-1 gap-y-8">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm/6 font-medium text-gray-900">
                                    Choose your Parser
                                </label>
                                <Select onValueChange={(event)=>setData('parser_id', parseInt(event))} >
                                    <SelectTrigger className="w-1/2">
                                        <SelectValue placeholder="Select a parser" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {parsers.map((parser) => (
                                                <SelectItem key={parser.id} value={parser.id}>
                                                    {parser.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Error message={errors.parser_id} />
                            </div>

                            <div>
                                <label htmlFor="files" className="mb-2 block text-sm/6 font-medium text-gray-900">
                                    Upload Resume/CV
                                </label>
                                <FileUploader onFileUpload={handleFileUpload} files={data.files} onFileRemove={removeFile} />
                                <Error message={errors.files} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={handleParseResume} disabled={processing}>
                                {processing ? 'Processing...' : 'Parse Resume'}
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
                            <ResultsViewer results={chat?.response} />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setActiveTab('upload')}>
                                Upload Another
                            </Button>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => {
                                        const dataStr = JSON.stringify(chat.response, null, 2);
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
