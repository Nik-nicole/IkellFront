
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserSection from './components/sections/UserSection';
import HomeSection from './components/sections/HomeSection';
import CompaniesSection from './components/sections/CompaniesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import WorkersSection from './components/sections/WorkersSection';
import { UserProvider } from './context/UserContext';
import './index.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-section" element={<UserSection />} />
          <Route path="/home" element={<HomeSection />} />
          <Route path="/companies" element={<CompaniesSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/workers" element={<WorkersSection />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App
