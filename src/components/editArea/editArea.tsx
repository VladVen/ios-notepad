/** @format */

import React, { FC, useState, useEffect } from "react";
import { INote } from "../../types/note.interface";
import { TextField } from "@mui/material";
import {
  useCreateNoteMutation,
  useEditNoteMutation,
} from "../../redux/api/notesApi";
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

  const [date, setDate] = useState(new Date(note.lastModified));

  useEffect(() => {
    async function browseData() {
      if (debouncedTitle !== note.title || debouncedContent !== note.content) {
        const currentTime = new Date(Date.now());
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
        setDate(currentTime);
      }
    }
    browseData();
  }, [debouncedTitle, debouncedContent]);

  let header = createMode
    ? "New Note"
    : `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}`;

  return (
    <div
      className={style.container}
      aria-label="Area for Editing Note"
    >
      <div
        className={style.date}
        aria-label="Last Modified"
      >
        {header}
      </div>
      <TextField
        aria-label="Enter your Title"
        placeholder="Enter your Title"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <div className={style.fullscreen}>
        <textarea
          aria-label="Enter note"
          className={style.notebookInput}
          placeholder="Enter note"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};
