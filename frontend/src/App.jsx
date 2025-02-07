import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import Jobs from './pages/Jobs';
import Browse from './pages/Browse';
import Profile from './pages/Profile';
import JobDescription from './pages/JobDescription';
import Companies from './components/admin/Companies';
import RegisterCompany from './components/admin/RegisterCompany';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/description/:id" element={<JobDescription />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Protected Routes */}
          <Route path="/admin/companies" element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          } />
          <Route path="/admin/companies/register" element={
            <ProtectedRoute>
              <RegisterCompany />
            </ProtectedRoute>
          } />
          <Route path="/admin/companies/:id" element={
            <ProtectedRoute>
              <CompanySetup />
            </ProtectedRoute>
          } />
          <Route path="/admin/jobs" element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          } />
          <Route path="/admin/jobs/create" element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          } />
          <Route path="/admin/job/:id/applicants" element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
