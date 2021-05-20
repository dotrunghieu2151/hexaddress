// import home from './home'
import _404 from '@/views/_404';
import login from './login';
import address from './address';
import auth from '../middlewares/auth';

export default [
  // home,
  login,
  address,
  {
    path: '/404',
    name: '404',
    component: _404,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
    meta: {
      middleware: auth
    }
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

