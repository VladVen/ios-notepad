/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import style from "./note.module.scss";
import Button from "@mui/material/Button";

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
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <div
      className={style.note}
      onClick={() => selectNote(note)}
    >
      <h4>{note.title}</h4>
      <div>{note.content}</div>
      {deleteMode && <Button onClick={deleteHandler}>Delete</Button>}
    </div>
  );
};
