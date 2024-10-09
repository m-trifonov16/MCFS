import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import KYCFormContainer from './KYCFormContainer';

const App: React.FC = () => {
  return (
    <Router>      
      <Layout className="layout">
        <KYCFormContainer />
      </Layout>
    </Router>
  );
};

export default App;
