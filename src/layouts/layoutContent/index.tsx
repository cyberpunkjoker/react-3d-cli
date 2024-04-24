import React, { useCallback } from'react';
import routes from '@/routes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const lazyComp = (compPath: string) => {
  if (!compPath) return null;
  
  return React.lazy(() => import(`@/pages${compPath}`));
}

const LayoutContent: React.FC = () => {

  const routesToComp = useCallback(() => {
    return routes.map(route => {
      
      const { path, key } = route;
      return <Route path={path} key={key} Component={lazyComp(path)} />
    })
  }, [])

  return (
    <div className="layout-content"> 
      <Router>
        <Routes>
          {routesToComp()}
        </Routes>
      </Router>
    </div>
  );
};

export default LayoutContent;