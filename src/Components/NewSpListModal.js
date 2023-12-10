// NewSpListModal.js
import React, { useState } from 'react';
import Button from './Button';

function NewSpListModal({ onClose, onAddSpList }) {
  const [newSpListName, setNewSpListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSpList(newSpListName);
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          New Shopping List Name:
          <input
            type="text"
            value={newSpListName}
            onChange={(e) => setNewSpListName(e.target.value)}
            style={{width: '70%', padding:'5px',margin: '5px 2px', border: '1px solid rgb(137, 137, 191)', borderRadius: '20px', fontSize: '16px'  }}
          />
        </label>
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </form>
    </div>
  );
}

export default NewSpListModal;
