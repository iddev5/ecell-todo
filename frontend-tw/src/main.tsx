import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Analytics from './Analytics.tsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux'
import store from './lib/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
