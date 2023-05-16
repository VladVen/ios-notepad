/** @format */

import React, { useState } from "react";
import "./App.scss";
import { Header } from "./components/header/header";
import { Navbar } from "./components/sidebar/sidebar";
import { useGetAllNotesQuery } from "./redux/slices/notesSlice";
import { INote } from "./types/note.interface";
import { EditArea } from "./components/editArea/editArea";

function App() {
  const { data, error, isFetching, isLoading } = useGetAllNotesQuery();
  const [currentNote, selectNote] = useState<INote | null>(null);

  if (isFetching || isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="content">
        <Navbar
          notes={data}
          selectNote={selectNote}
        />
        {currentNote && <EditArea note={currentNote} />}
      </div>
    </>
  );
}

export default App;
