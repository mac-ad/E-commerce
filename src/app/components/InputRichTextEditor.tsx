'use client'

import { Editor } from '@/components/blocks/editor-00/editor'
import { SerializedEditorState } from 'lexical'
import { useEffect, useState } from 'react'

export const initialValue = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: '',
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  } as unknown as SerializedEditorState
  

export default function InputRichTextEditor({placeholder, onChange, defaultValue}: {placeholder: string, onChange: (value: string) => void, defaultValue: string}) {
    const [editorState, setEditorState] = useState<SerializedEditorState>(defaultValue ? JSON.parse(defaultValue) : initialValue)
    

    // const [htmlContent, setHtmlContent] = useState<string>('')

    // Convert editor state to HTML string when it changes
    const handleEditorChange = (value: SerializedEditorState) => {
        setEditorState(value)
        // Convert the serialized state to a string representation
        const stringContent = JSON.stringify(value)
        onChange(stringContent)
        // setHtmlContent(stringContent)
    }
    
    return (
        <div>
            <Editor 
                placeholder={placeholder}
                editorSerializedState={editorState}
                onSerializedChange={handleEditorChange}
            />
        </div>
    )
}
