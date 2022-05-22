import React from 'react';
import * as ReactDomClient from 'react-dom/client';
import App from './App';
import './index.css';
import 'alpinejs';


const root = ReactDomClient.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)