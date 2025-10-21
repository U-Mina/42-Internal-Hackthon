import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentDashboard from './components/student/StudentDashboard';
import ProjectDetail from './components/student/ProjectDetail';
import BocalDashboard from './components/bocal/BocalDashboard';
import StudentDetail from './components/bocal/StudentDetail';

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