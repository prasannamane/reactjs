import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import DataFetcher from './components/DataFetcher'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <DataFetcher />
  </StrictMode>,
)