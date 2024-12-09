import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { NotificationContainer } from './components/notifications/NotificationContainer';
import { AuthDebugPanel } from './components/auth/AuthDebugPanel';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { CreateQuiz } from './pages/CreateQuiz';
import { TakeQuiz } from './pages/TakeQuiz';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { MyQuizzes } from './pages/MyQuizzes';
import { Analytics } from './pages/Analytics';

function App() {
  return (
    <Router>
      <NotificationContainer />
      <AuthDebugPanel />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/my-quizzes" element={<MyQuizzes />} />
            <Route path="/quiz/:id" element={<TakeQuiz />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;