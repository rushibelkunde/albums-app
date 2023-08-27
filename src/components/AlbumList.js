// src/components/AlbumList.js
import React from 'react';
import AlbumItem from './AlbumItem';

function AlbumList({ albums, editingAlbumId, editTitle, setEditTitle, setEditingAlbumId, updateAlbum, deleteAlbum }) {
  return (
    <div className="album-list">
      <h2 className="section-title">Albums</h2>
      <div className='album-container'>
        {albums.map(album => (
          <AlbumItem
            key={album.id}
            album={album}
            editingAlbumId={editingAlbumId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            setEditingAlbumId={setEditingAlbumId}
            updateAlbum={updateAlbum}
            deleteAlbum={deleteAlbum}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
