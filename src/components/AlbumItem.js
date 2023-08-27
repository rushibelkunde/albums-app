// src/components/AlbumItem.js
import React from 'react';

function AlbumItem({ album, editingAlbumId, editTitle, setEditTitle, setEditingAlbumId, updateAlbum, deleteAlbum }) {
  return (
    <div className="album-item">
      <span className="album-title">
        {editingAlbumId === album.id ? (
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
        ) : (
          <span>{album.title}</span>
        )}
      </span>
      <div className="album-actions">
        {editingAlbumId === album.id ? (
          <button className="edit-button" onClick={() => updateAlbum(album.id, editTitle)}>
            Save
          </button>
        ) : (
          <button className="edit-button" onClick={() => { 
            setEditingAlbumId(album.id);
            setEditTitle(album.title);
          }}>
            Edit
          </button>
        )}
        <button className="delete-button" onClick={() => deleteAlbum(album.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default AlbumItem;
