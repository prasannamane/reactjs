import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './Apps.tsx'
import RegisterList from './components/RegisterList.jsx'
import SignupForm from './components/SignupForm.jsx'
import SigninForm from './components/SigninForm.jsx'
import SignoutForm from './components/SignoutForm.jsx'
import Layout from './components/Layout'
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="user-list" element={<RegisterList />} />
          <Route path="signup-form" element={<SignupForm />} />
          <Route path="signin-form" element={<SigninForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signout-form" element={<SignoutForm />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)