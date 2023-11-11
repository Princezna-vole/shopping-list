import React from 'react';
import Button from './Button';

function List({ items, onToggle, setItems }) {
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
       <div  style={{margin:'auto', display:'flex',}}>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
          {item.name}
          </div>
          <Button onClick={() => handleDelete(item.id)}style={ { border:'1px solid rgb(126, 62, 107)', backgroundColor: 'transparent', color: 'rgb(126, 62, 107)', borderRadius: '15px', margin:'5px 20px', padding:'7px', width:'90px', fontWeight: '800'}}>Delete</Button>
        </li>
      ))}
    </ul>
  );
}

export default List;
