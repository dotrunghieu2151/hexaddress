import { hexabaseConfig } from '../../config';
import { immutable } from '../../utils/helpers';
import datastore from './datastore';

const { applicationId, datastoreAddressId } = hexabaseConfig;

export default ({ http }) => immutable({
  ...datastore({ http, applicationId, datastoreId: datastoreAddressId }),
})