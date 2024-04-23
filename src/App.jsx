import React from 'react';
import { AppProvider } from './AppContext';
import Content from './Content';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Content />
      </div>
    </AppProvider>
  );
}

export default App;