/** @format */

import React, { FC, useState, useEffect } from "react";
import { INote } from "../../types/note.interface";
import { TextField } from "@mui/material";
import {
  useCreateNoteMutation,
  useEditNoteMutation,
} from "../../redux/slices/notesSlice";
import { useDebounce } from "../../utils/hooks/useDebounce.hook";
import style from "./editArea.module.scss";

interface IEditArea {
  note: INote;
  createMode: boolean;
  createHandler: () => void;
  setCurrentNote: (note: INote) => void;
}
export const EditArea: FC<IEditArea> = ({
  note,
  createMode,
  createHandler,
  setCurrentNote,
}) => {
  const [editArea] = useEditNoteMutation();
  const [createNote] = useCreateNoteMutation();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    async function browseData() {
      if (debouncedTitle !== note.title || debouncedContent !== note.content) {
        if (createMode) {
          const response = (await createNote({
            title: debouncedTitle,
            content: debouncedContent,
            lastModified: Date.now(),
          })) as { data: INote };
          setCurrentNote(response.data);
          createHandler();
        } else {
          editArea({
            title: debouncedTitle,
            content: debouncedContent,
            lastModified: Date.now(),
            id: note.id,
          });
        }
      }
    }
    browseData();
  }, [debouncedTitle, debouncedContent]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div>{new Date(note.lastModified).toDateString()}</div>
      <TextField
        placeholder="Enter your Title"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <br />
      {/* <TextField
        placeholder="Enter note"
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      /> */}

      <div className={style.fullscreen}>
        <textarea
          className={style.notebookInput}
          placeholder="Enter note"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};
