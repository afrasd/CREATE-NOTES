import { useEffect, useState } from "react";
import {nanoid} from 'nanoid';
import NotesList from "./components/NotesList";
import Search from './components/Search'
import Header from "./components/Header";

const App= () => {
  const [ notes, setNotes]= useState([
  {
    id: nanoid(),
    text: 'Hello! This is notes app created using react and nodejs',
    date: '15/04/2023',
  },
  {
    id: nanoid(),
    text: 'It enables you to add a note, delete, shift between dark and light mode, and edit notes',
    date: '15/05/2023',
  },
  {
    id: nanoid(),
    text: 'A maximum of 200characters are only allowed',
    date: '15/06/2023',
  }

]);

const[searchText, setSearchText] = useState('');

const [darkMode, setDarkMode] =useState(false);

useEffect(()=> {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if (savedNotes){
    setNotes(savedNotes);
  }
},[]);

useEffect(() => {
  localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
}, [notes]);


const addNote = (text) => {
  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString()
  };
  const newNotes = [...notes, newNote];
  setNotes(newNotes);
};

const deleteNode = (id) =>{
  const newNotes = notes.filter((note)=> note.id !== id);
  setNotes(newNotes);
}

  return (
  <div className={`${darkMode && 'dark-mode'}`}>
  <div className="container">
    <Header handleToggleDarkMode={setDarkMode}/>
    <Search handleSearchNote={setSearchText}/>
    <NotesList 
        notes={notes.filter((note)=>
          note.text.toLowerCase().includes(searchText)
          )}
        handleAddNote={addNote}
        handleDeleteNote = {deleteNode}
        />
        </div>
  </div>
  );
};

export default App;