import React, { Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const HomePage = React.lazy(() => import('./index'));

toast.configure({
 autoClose: 1500,
 draggable: false,
 position: toast.POSITION.TOP_LEFT,
 hideProgressBar: true,
})
export const AsyncHomePage = (props: any) => (
  <Suspense fallback={<div>loading....</div>}>
    <ToastContainer hideProgressBar/>
    <HomePage {...props} />
  </Suspense>
)