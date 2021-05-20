import user from './user';
import { apiService } from '../api';
import { immutable } from '../../utils/helpers';
import address from './address';

export const hexabaseService = immutable({
  user: user({ http: apiService }),
  address: address({ http: apiService }),
})