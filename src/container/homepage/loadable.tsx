import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('./index'));

export const AsyncHomePage = (props: any) => (
  <Suspense fallback={<div>loading....</div>}>
    <HomePage {...props} />
  </Suspense>
)