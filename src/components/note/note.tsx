/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import style from "./note.module.scss";
import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";

interface INoteProps {
  note: INote;
  selectNote: (note: INote) => void;
  deleteMode: boolean;
  onDelete: (id: string) => void;
}
export const Note: FC<INoteProps> = ({
  note,
  selectNote,
  deleteMode,
  onDelete,
}) => {
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    onDelete(note.id);
  };

  const d = new Date(note.lastModified);
  const date =
    d.toDateString() === new Date().toDateString()
      ? d.toLocaleTimeString().substring(0, 5)
      : d.toDateString();

  return (
    <div
      aria-label="Note"
      className={style.note}
      onClick={() => selectNote(note)}
    >
      <div>
        <h4 aria-label="TItle">{note.title}</h4>

        <div aria-label="Last Modified and Short Content">
          {date} {note.content}
        </div>
      </div>

      {deleteMode && (
        <Button
          onClick={deleteHandler}
          aria-label="Delete current note"
        >
          <CancelIcon color="error" />
        </Button>
      )}
    </div>
  );
};
