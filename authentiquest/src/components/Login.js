import React from 'react';

const styles = {
  body: {
    fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
    backgroundImage: "url('http://farm8.staticflickr.com/7064/6858179818_5d652f531c_h.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logForm: {
    width: '40%',
    minWidth: '320px',
    maxWidth: '475px',
    backgroundColor: '#fff',
    position: 'relative',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
    padding: '2em',
    boxSizing: 'border-box'
  },
  h2: {
    backgroundColor: '#2a2a2a',
    color: '#f0f0f0',
    textTransform: 'uppercase',
    padding: '0.75em 1.5em',
    boxShadow: 'inset 0px 1px 1px rgba(255, 255, 255, 0.05)',
    border: '1px solid #262626',
    margin: 0,
    fontWeight: 200
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '2em',
    padding: '0.5em 0',
    border: 'none',
    borderBottom: '1px solid #eaeaea',
    color: '#757575',
  },
  btn: {
    display: 'inline-block',
    backgroundColor: '#1fb5bf',
    border: '1px solid #1a989f',
    padding: '0.5em 2em',
    color: 'white',
    marginRight: '0.5em',
    boxShadow: 'inset 0px 1px 0px rgba(255, 255, 255, 0.2)',
  },
  forgot: {
    color: '#23c0cd',
    lineHeight: '0.5em',
    fontSize: '0.75em',
    margin: 0,
    padding: 0,
    float: 'right',
    textDecoration: 'none'
  }
};

function Login() {
  return (
    <div style={styles.body}>
      <div style={styles.logForm}>
        <h2 style={styles.h2}>Login to your account</h2>
        <form>
          <input type="text" title="username" placeholder="Username" style={styles.input} />
          <input type="password" title="password" placeholder="Password" style={styles.input} />
          <button type="submit" style={styles.btn}>Login</button>
          <a href="#" style={styles.forgot}>Forgot Username?</a>
        </form>
      </div>
    </div>
  );
}

export default Login