import React from 'react';
import * as mainComponents from './components/index.js';
import Navbar from './components/Navbar.js';
import { useStore } from './store.js';

export default function App() 
{
  const { useLocalAppState } = useStore();

  const [component, user] = useLocalAppState('component', 'user');
  const Component = mainComponents[component.name];

  return (
    <div className="route-container">
      <Navbar user={user} />
      <div className="main-component">
        <Component {...component.props} />
      </div>
    </div>
  );
}
