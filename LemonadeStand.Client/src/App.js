import React from 'react';
import ListContainer from './components/ItemDisplay/ListContainer.jsx'
import Logo from './assets/img/Logo.svg';

export default function App() {
  return (
    <div className="App">
      <header>
        <img src={Logo} className="App-logo" alt="logo" />
      </header>
      <ListContainer></ListContainer>
    </div>
  );
};
