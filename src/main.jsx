import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import '../styles/globals.css';
const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);
root.render(/*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(App, null)));