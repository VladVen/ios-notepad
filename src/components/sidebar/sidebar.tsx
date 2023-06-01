/** @format */

import React, { FC } from "react";
import { INote } from "../../types/note.interface";
import { Note } from "../note/note";
import style from "./sidebar.module.scss";
import { useDeleteNoteMutation } from "../../redux/api/notesApi";
import { NoNotes } from "../noNotes/noNotes";

interface ISideBar {
  notes: INote[];
  selectNote: (note: INote | null) => void;
  deleteMode: boolean;
  setCreateMode: () => void;
}

export const SideBar: FC<ISideBar> = ({
  notes,
  selectNote,
  deleteMode,
  setCreateMode,
}) => {
  const [deleteNote] = useDeleteNoteMutation();

  const onDelete = (id: string) => {
    deleteNote(id);
    if (notes.some((item) => item.id === id)) {
      selectNote(null);
    }
  };

  return (
    <aside
      className={style.container}
      onClick={(e) => {
        e.stopPropagation();
        setCreateMode();
      }}
    >
      {notes.length ? (
        [...notes].reverse().map((item) => (
          <Note
            note={item}
            key={item.id}
            selectNote={selectNote}
            deleteMode={deleteMode}
            onDelete={onDelete}
          />
        ))
      ) : (
        <NoNotes />
      )}
    </aside>
  );
};
