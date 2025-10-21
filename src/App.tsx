import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentDashboard from './pages/student/StudentDashboard';
import ProjectDetail from './pages/student/ProjectDetail';
import BocalDashboard from './pages/bocal/BocalDashboard';
import StudentDetail from './pages/bocal/StudentDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={StudentDashboard} />
        <Route path="/project/:id" component={ProjectDetail} />
        <Route path="/bocal" exact component={BocalDashboard} />
        <Route path="/bocal/student/:id" component={StudentDetail} />
      </Switch>
    </Router>
  );
};

export default App;
