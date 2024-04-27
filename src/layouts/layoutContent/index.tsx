import React, { Suspense, useCallback } from'react';
import routes from '@/routes';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import LoadingPage from '@/components/LoadingPage';

const lazyComp = (compPath: string): any => {
  if (!compPath) return null;

  return React.lazy(() => import(`@/pages${compPath}`))
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
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {routesToComp()}
        </Routes>
      </Suspense>
    </div>
  );
};

export default LayoutContent;