import { immutable } from "@/utils/helpers";

const createObj = () => {
  const baseUrl = process.env.VUE_APP_HEXABASE_API_URL;
  return {
    baseUrl,
    loginUrl: `${baseUrl}/login`,
    datastoreAddressId: process.env.VUE_APP_ADDRESS_DATASTORE_ID,
    applicationId: process.env.VUE_APP_APPLICATION_ID,
  }
}

export const hexabaseConfig = immutable(createObj());