import React, { Suspense, useCallback } from'react';
import routes from '@/routes';
import { Route, Routes } from 'react-router-dom';
import LoadingPage from '@/components/LoadingPage';
import BaseCard from '@/components/BaseCard';

const LayoutContent: React.FC = () => {

  const routesToComp = useCallback(() => {
    return routes.map(route => {
      const { path, key, authKey, Component } = route;
        
      const Comp = (
        <BaseCard routeInfo={{ path, key, authKey }}>
          <Component />
        </BaseCard>
      )
      return <Route path={path} key={key} element={Comp} /> 
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