import React from 'react';

function Button(props) {
  const { children, style, onClick } = props;

  return (
    <button style={style ? style :{ border:'1px solid rgb(137, 137, 191)', backgroundColor: 'transparent', color: 'rgb(137, 137, 191)', borderRadius: '15px', margin:'5px 20px', padding:'7px', width:'90px', fontWeight: '800', cursor:'pointer'}} onClick={onClick}>{children}</button>
  );
}

export default Button;
