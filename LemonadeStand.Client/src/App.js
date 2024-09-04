import React from 'react';
import Wrapper from './components/Wrapper';
import Logo from './assets/img/Logo.svg';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header>
        <img src={Logo} className="App-logo" alt="logo" />
      </header>
      <Wrapper></Wrapper>
    </div>
  );
};
