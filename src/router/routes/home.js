import auth from '../middlewares/auth';

export default {
  path: '/',
  name: 'home',
  component: () => import('@/views/Home'),
  meta: {
    middleware: auth,
  }
};