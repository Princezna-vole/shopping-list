import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Form({ input, setInput, things, setThings }) {
  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    setThings([...things, { id: uuidv4(), name: input, completed: false }]);
    setInput(""); 
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" value={input} required onChange={onInputChange} style={{width: '100%', padding:'5px',margin: '5px 0', border: '1px solid lavender', borderRadius: '20px', fontSize: '16px',  }}></input>
      <button
        type="submit"
        style={{
          border:'1px solid rgb(137, 137, 191)', 
          backgroundColor: 'transparent', 
          color: 'rgb(137, 137, 191)', 
          borderRadius: '15px', 
          margin:'5px 20px', 
          padding:'7px', width:'90px', 
          fontWeight: '800'
        }}
      >
        ADD
      </button>
    </form>
  );
}

export default Form;