import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import StarterKitExtension from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { useState, forwardRef, useCallback, useEffect } from "react";
import TextAlignExtension from "@tiptap/extension-text-align";
import PlaceholderExtension from "@tiptap/extension-placeholder";

import {
  FormHelperText,
  Stack,
} from "@mui/material";

import { editorClasses } from "./classes";
import { EditorProps } from "./types";
import { StyledRoot } from "./styles";
import { Toolbar } from "./toolbar";

// ------------------------------------------------------------------------------------------------------------------

export const Editor = forwardRef<HTMLDivElement, EditorProps>(
  (
    { sx,
      error,
      helperText,
      value: content = "", 
      onChange,
      editable = true,
      fullItem = false,
      showToolbar = false,
      placeholder = "Write something awesome...",
      ...other
    },
    ref
  ) => {
    const [fullScreen, setFullScreen] = useState(false);

    const handleToggleFullScreen = useCallback(() => {
      setFullScreen((prev) => !prev);
    }, []);

    const editor = useEditor({
      editable,
      content, 
      extensions: [
        StarterKitExtension,
        PlaceholderExtension.configure({
          placeholder,
          emptyEditorClass: editorClasses.content.placeholder,
        }),
        ImageExtension,
        TextAlignExtension.configure({ types: ["heading", "paragraph"] }),
        LinkExtension.configure({ autolink: true, openOnClick: false }),
      ],
      onUpdate({ editor: _editor }) {
        const html = _editor.getHTML();
        onChange?.(html); 
      },
      ...other,
    });

   
    useEffect(() => {
      editor?.commands.setContent(content);
    }, [content, editor]); 

    return (
      <Stack>
         <StyledRoot
            error={!!error}
            disabled={!editable}
            fullScreen={fullScreen}
            className={editorClasses.root}
            sx={sx}
          >
        {showToolbar && (
          <Toolbar
            editor={editor}
            fullItem={fullItem}
            fullScreen={fullScreen}
            onToggleFullScreen={handleToggleFullScreen}
          />
        )}
        <EditorContent
          ref={ref}
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
          editor={editor}
          className={editorClasses.content.root}
        />
        </StyledRoot>

          {helperText && (
            <FormHelperText error={!!error} sx={{ px: 2 }}>
              {helperText}
            </FormHelperText>
          )} 
      </Stack>
    );
  }
);
