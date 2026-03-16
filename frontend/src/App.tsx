import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.tsx';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Assessment from './pages/Assessment.tsx';
import Patients from './pages/Patients.tsx';
// Settings Page Import
import Settings from './pages/Settings.tsx';
import Documentation from './pages/Documentation.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/documentation" element={<Documentation />} />

                {/* Protected Application Routes */}
                <Route path="/app" element={<DashboardLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="assessments" element={<Assessment />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
