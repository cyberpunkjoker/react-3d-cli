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
        <Layout></Layout>
      </div>
    </ErrorBoundary>
  )
};

export default App