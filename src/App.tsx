import React from 'react';
import ProtectedRoute from 'components/ProtectedRouter';
import Login from 'pages/login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentDashboard from './pages/student/StudentDashboard';
import ProjectDetail from './pages/student/ProjectDetail';
import BocalDashboard from './pages/bocal/BocalDashboard';
import StudentDetail from './pages/bocal/StudentDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        
        <ProtectedRoute path="/" exact component={StudentDashboard} />
        <ProtectedRoute path="/project/:id" component={ProjectDetail} />
        <ProtectedRoute path="/bocal" exact component={BocalDashboard} />
        <ProtectedRoute path="/bocal/student/:id" component={StudentDetail} />
      </Switch>
    </Router>
  );
};

export default App;
