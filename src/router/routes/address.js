
import { hexabaseService } from '@/services';
import auth from '../middlewares/auth';

export default {
  path: '/address',
  name: 'address',
  component: () => import('@/views/Address'),
  meta: {
    tmp: {},
    middleware: auth,
    beforeResolve: async (to, from, next) => {
      const data = await hexabaseService.address.getItems({ page: 1, perPage: 10 });
      to.meta.tmp.addressList = data;
      next();
    }
  },
  props: (router) => ({ addressList: router.meta.tmp.addressList }),
};