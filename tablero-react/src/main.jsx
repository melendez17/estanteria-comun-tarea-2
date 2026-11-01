import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.scss';

// Único punto de montaje; los componentes no consultan ni modifican el DOM.
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
