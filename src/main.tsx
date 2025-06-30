import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import './styles/global.css'
import App from './App.tsx'
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

import global_en from './languages/en/global.json'
import global_ro from './languages/ro/global.json'

i18n.init({
  lng: 'ro',
  resources: {
    en: { translation: global_en },
    ro: { translation: global_ro }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router >
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Router>
  </StrictMode>,
)
