/** @format */

import React, { useEffect, useState } from "react";
import "./App.scss";
import { Header } from "./components/header/header";
import { Navbar } from "./components/sidebar/sidebar";
import { useGetAllNotesQuery } from "./redux/slices/notesSlice";
import { INote } from "./types/note.interface";
import { EditArea } from "./components/editArea/editArea";
import { v4 } from "uuid";

function App() {
  const { data, error, isFetching, isLoading } = useGetAllNotesQuery();
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [createMode, setCreateMode] = useState(() => false);

  const deleteHandler = () => setDeleteMode((prev) => !prev);

  useEffect(() => {
    if (createMode) {
      setCurrentNote({
        id: v4(),
        content: "",
        title: "",
        lastModified: Date.now(),
      });
    }
  }, [createMode]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header
        setDeleteMode={deleteHandler}
        setCreateMod={() => setCreateMode(true)}
      />
      <div className="content">
        <Navbar
          notes={data}
          selectNote={setCurrentNote}
          deleteMode={deleteMode}
          setCreateMode={() => setCreateMode(false)}
        />
        {currentNote && (
          <EditArea
            key={currentNote.id}
            note={currentNote}
            createMode={createMode}
            createHandler={() => setCreateMode(false)}
            setCurrentNote={setCurrentNote}
          />
        )}
      </div>
    </div>
  );
}

export default App;
