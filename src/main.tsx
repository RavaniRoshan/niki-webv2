import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { mountDitheredFooter } from './footer-mount.tsx';
import { mountSpaceAvatars } from './avatar-mount.tsx';
import { mountSpaceForm } from './form-mount.tsx';
import { mountBentoFeatures } from './bento-mount.tsx';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}

mountDitheredFooter();
mountSpaceAvatars();
mountSpaceForm();
mountBentoFeatures();
