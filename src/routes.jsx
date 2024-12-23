import { createBrowserRouter } from 'react-router-dom';
import LockStatus from './LockStatus';
import UnlockHistory from './UnlockHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LockStatus />,
  },
  {
    path: '/history',
    element: <UnlockHistory />,
  },
]);

export default router;
