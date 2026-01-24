import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index.tsx'
import App from './App.tsx'
import Home from './Home.tsx'
import Analytics from './Analytics.tsx'
import NewProject from './NewProject.tsx'
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux'
import store from './lib/store.ts'
import { ThemeProvider } from './components/theme-provider.tsx'
import { AuthProvider } from './components/auth-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='flowcode-ui-theme'>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/project/:pid" element={<App />} />
              <Route path="/project/new" element={<NewProject />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
