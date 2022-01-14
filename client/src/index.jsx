//React
import React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';
//App.jsx
import App from './app.jsx';
import './index.css';
import root from './root.js';
//React-root Container
import { Provider, useStoreObject } from './store.js';
//css
import './styles/master.scss';

document.body.appendChild(root());

export default function Index()
{
  const store = useStoreObject();

  return (
    <div>
        <Provider value={ store }>
          <App/>
        </Provider>
    </div>
  )
}

render(
  <React.StrictMode>
    <Index/>
  </React.StrictMode>
  , document.getElementById('root')
);
