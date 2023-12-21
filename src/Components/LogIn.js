import React, { useEffect } from 'react';

function Login({ handleLogin }) {
  useEffect(() => {
    // Save the current overflow value
    const originalOverflow = document.body.style.overflow;

    // Set the overflow to 'hidden'
    document.body.style.overflow = 'hidden';

    // Cleanup function to revert the changes when the component unmounts
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []); // The empty dependency array ensures this effect runs only once during mount

  return (
    <div>
      <h5>Please log in to access the Shopping List.</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          handleLogin(username, password);
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          style={{
            width: '100%',
            padding: '5px',
            margin: '5px 2px',
            border: '1px solid lavender',
            borderRadius: '20px',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={{
            width: '100%',
            padding: '5px',
            margin: '5px 2px',
            border: '1px solid lavender',
            borderRadius: '20px',
            fontSize: '16px',
          }}
        />
        <button
          type="submit"
          style={{
            border: '1px solid rgb(137, 137, 191)',
            backgroundColor: 'transparent',
            color: 'rgb(137, 137, 191)',
            borderRadius: '15px',
            margin: '5px 20px',
            padding: '7px',
            width: '90px',
            fontWeight: '800',
            width: '120px',
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
