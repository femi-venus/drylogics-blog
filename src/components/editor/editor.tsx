import Mention from '@tiptap/extension-mention';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import StarterKitExtension from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import { useState, forwardRef, useCallback } from 'react';
import TextAlignExtension from '@tiptap/extension-text-align';
import PlaceholderExtension from '@tiptap/extension-placeholder';

import { Stack, Portal, Backdrop, FormHelperText } from '@mui/material';

import { editorClasses } from './classes';
import { EditorProps, MentionItem } from './types';
import { StyledRoot } from './styles';
import { Toolbar } from './toolbar';


// ------------------------------------------------------------------------------------------------------------------

export const Editor = forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      sx,
      error,
      onChange,
      slotProps,
      helperText,
      resetValue,
      editable = true,
      fullItem = false,
      showToolbar = false,
      value: content = '',
      placeholder = 'Write something awesome...',
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
      extensions: [
        StarterKitExtension,
        PlaceholderExtension.configure({
          placeholder,
          emptyEditorClass: editorClasses.content.placeholder,
        }),
        ImageExtension,
        TextAlignExtension.configure({ types: ['heading', 'paragraph'] }),
        LinkExtension.configure({ autolink: true, openOnClick: false }),
      ],
      onUpdate({ editor: _editor }) {
        const html = _editor.getHTML();
        onChange?.(html);
      },
      ...other,
    });

    // Prevent editor from losing focus on space key or clicks inside
    const handleEditorClick = (event: React.MouseEvent) => {
      event.stopPropagation();
    };

    return (
      <Portal disablePortal={!fullScreen}>
        {fullScreen && (
          <Backdrop
            open
            sx={{ zIndex: (theme) => theme.zIndex.modal - 1 }}
            onClick={(event) => event.stopPropagation()}
          />
        )}

        <Stack sx={{ ...(!editable && { cursor: 'not-allowed' }), ...slotProps?.wrap }}>
          <StyledRoot
            error={!!error}
            disabled={!editable}
            fullScreen={fullScreen}
            className={editorClasses.root}
            sx={sx}
            onClick={handleEditorClick} // Prevents unintended closures
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
              onKeyDown={(event) => event.stopPropagation()} // Stops bubbling of space key
            />
          </StyledRoot>

          {helperText && (
            <FormHelperText error={!!error} sx={{ px: 2 }}>
              {helperText}
            </FormHelperText>
          )}
        </Stack>
      </Portal>
    );
  }
);