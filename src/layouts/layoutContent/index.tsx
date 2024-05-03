import React, { Suspense, useCallback } from'react';
import routes from '@/routes';
import { Route, Routes } from 'react-router-dom';
import LoadingPage from '@/components/LoadingPage';

const LayoutContent: React.FC = () => {

  const routesToComp = useCallback(() => {
    return routes.map(route => {
      const { path, key, component } = route;
      return <Route path={path} key={key} Component={component} />
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