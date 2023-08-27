import React, { useState, useEffect } from 'react';
import './App.css';

import AlbumList from './components/AlbumList';


function App() {
 // State variables
 const [albums, setAlbums] = useState([]);
 const [newAlbumTitle, setNewAlbumTitle] = useState('');
 const [editingAlbumId, setEditingAlbumId] = useState(null);
 const [editTitle, setEditTitle] = useState('');

 // Fetch albums on component mount
 useEffect(() => {
   fetchAlbums();
 }, []);

 // Fetch albums from API
 const fetchAlbums = async () => {
   try {
     const response = await fetch('https://jsonplaceholder.typicode.com/albums');
     const data = await response.json();
     setAlbums(data);
   } catch (error) {
     console.error('Error fetching albums:', error);
   }
 };

 // Add new album
 const addAlbum = async () => {
   try {
     const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
       method: 'POST',
       body: JSON.stringify({ title: newAlbumTitle }),
       headers: {
         'Content-Type': 'application/json',
       },
     });
     const data = await response.json();
     // Prepend the new album to the list
     setAlbums([data, ...albums]);
     setNewAlbumTitle('');
   } catch (error) {
     console.error('Error adding album:', error);
   }
 };

 // Update existing album
 const updateAlbum = async (id, newTitle) => {
   try {
     await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
       method: 'PUT',
       body: JSON.stringify({ title: newTitle }),
       headers: {
         'Content-Type': 'application/json',
       },
     });
     // Update the albums list with the modified album
     const updatedAlbums = albums.map(album => {
       if (album.id === id) {
         return { ...album, title: newTitle };
       }
       return album;
     });
     setAlbums(updatedAlbums);
     setEditingAlbumId(null);
   } catch (error) {
     console.error('Error updating album:', error);
   }
 };

 // Delete an album
 const deleteAlbum = async id => {
   try {
     await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
       method: 'DELETE',
     });
     // Remove the deleted album from the list
     const updatedAlbums = albums.filter(album => album.id !== id);
     setAlbums(updatedAlbums);
   } catch (error) {
     console.error('Error deleting album:', error);
   }
 };

  return (
    <div className="App">
      <h1 className="app-title">Albums App</h1>
      <div className="add-album">
        <h2 className="section-title">Add Album</h2>
        <input
          type="text"
          value={newAlbumTitle}
          onChange={e => setNewAlbumTitle(e.target.value)}
          placeholder="Album Title"
        />
        <button className="add-button" onClick={addAlbum}>
          Add Album
        </button>
      </div>
      <AlbumList
        albums={albums}
        editingAlbumId={editingAlbumId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        setEditingAlbumId={setEditingAlbumId}
        updateAlbum={updateAlbum}
        deleteAlbum={deleteAlbum}
      />
      
    </div>
  );
}

export default App;
