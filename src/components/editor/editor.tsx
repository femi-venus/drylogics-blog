import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import StarterKitExtension from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { useState, forwardRef, useCallback, useEffect } from "react";
import TextAlignExtension from "@tiptap/extension-text-align";
import PlaceholderExtension from "@tiptap/extension-placeholder";
import { styled } from "@mui/material/styles";

import {
  FormHelperText,
  Stack,
} from "@mui/material";

import { editorClasses } from "./classes";
import { EditorProps } from "./types";
import { StyledRoot } from "./styles";
import { Toolbar } from "./toolbar";

// Add styled components for consistent styling
const EditorWrapper = styled('div')(({ theme }) => ({
  '& .ProseMirror': {
    minHeight: '200px',
    padding: '16.5px 14px',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    lineHeight: '1.4375em',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    
    '&:focus': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      outline: 'none',
    },

    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
  },

  // Style for toolbar
  '& .tiptap-toolbar': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '8px',
    backgroundColor: theme.palette.background.paper,
  },

  // Style for placeholder
  '& .ProseMirror p.is-editor-empty:first-child::before': {
    color: theme.palette.text.secondary,
    content: 'attr(data-placeholder)',
    float: 'left',
    height: 0,
    pointerEvents: 'none',
  }
}));

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
      enableInputRules: true,
      enablePasteRules: true,
      parseOptions: {
        preserveWhitespace: 'full',
      },
      extensions: [
        StarterKitExtension.configure({
          history: {
            depth: 100,
            newGroupDelay: 500,
          },
        }),
        PlaceholderExtension.configure({
          placeholder,
          emptyEditorClass: editorClasses.content.placeholder,
        }),
        ImageExtension,
        TextAlignExtension.configure({ types: ["heading", "paragraph"] }),
        LinkExtension.configure({ 
          autolink: true, 
          openOnClick: false,
          HTMLAttributes: {
            class: editorClasses.content.link
          }
        }),
      ],
      onUpdate({ editor: _editor }) {
        const html = _editor.getHTML();
        onChange?.(html);
      },
      ...other,
    });

    useEffect(() => {
      if (editor && editor.getHTML() !== content) {
        editor.commands.setContent(content);
      }
    }, [content, editor]);

    return (
      <Stack>
        <EditorWrapper>
          <StyledRoot
            error={!!error}
            disabled={!editable}
            fullScreen={fullScreen}
            className={editorClasses.root}
            sx={{
              ...sx,
              '& .ProseMirror': {
                ...(error && {
                  borderColor: 'error.main',
                  '&:focus': {
                    borderColor: 'error.main',
                    borderWidth: 2,
                  },
                  '&:hover': {
                    borderColor: 'error.main',
                  },
                }),
                ...((!editable) && {
                  backgroundColor: 'action.disabledBackground',
                  color: 'text.disabled',
                }),
              },
            }}
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
              editor={editor}
              className={editorClasses.content.root}
            />
          </StyledRoot>
        </EditorWrapper>

        {helperText && (
          <FormHelperText error={!!error} sx={{ px: 2 }}>
            {helperText}
          </FormHelperText>
        )}
      </Stack>
    );
  }
);