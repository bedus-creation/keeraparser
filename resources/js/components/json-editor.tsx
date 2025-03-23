"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import Editor, {useMonaco} from '@monaco-editor/react';

interface JsonEditorProps {
    value: any
    onChange: (value: any) => void
}

export function JsonEditor({ value, onChange }: JsonEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null)
    const [isEditorReady, setIsEditorReady] = useState(false)
    const [editor, setEditor] = useState<any>(null)

    const monaco = useMonaco();

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    useEffect(() => {
        if(editorRef && editorRef.current) {
            // editorRef.current?.setValue(value);
        }
    }, [value])

    return (
        <Card className="border overflow-hidden">
            <Editor
                height="50vh"
                defaultValue=""
                defaultLanguage="json"
                onMount={handleEditorDidMount}/>
        </Card>
    )
}

