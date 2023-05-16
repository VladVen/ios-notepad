/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import style from "./note.module.scss";

interface INoteProps {
  note: INote;
  selectNote: (note: INote) => void;
}
export const Note: FC<INoteProps> = ({ note, selectNote }) => {
  return (
    <div
      className={style.note}
      onClick={() => selectNote(note)}
    >
      <h4>{note.title}</h4>
      <div>{note.content}</div>
    </div>
  );
};
