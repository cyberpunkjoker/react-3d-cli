import React, { useEffect } from 'react';
import './index.less'
import Layout from '@/layouts'
import ErrorBoundary from '@/components/ErrorBoundary';


const App: React.FC = () => {
  useEffect(() => {

  }, [])
  
  return (
    <ErrorBoundary>
      <div>
        <h1>Hello World - canvas demo pages</h1>
        <Layout></Layout>
      </div>
    </ErrorBoundary>
  )
};

export default App