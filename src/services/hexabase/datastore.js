import { immutable, objHasProperty, omit } from "../../utils/helpers";

const makeDatastoreBaseUrl = ({ applicationId, datastoreId }) => `/applications/${applicationId}/datastores/${datastoreId}`;

export default ({ http, applicationId, datastoreId }) => {
  const baseUrl = makeDatastoreBaseUrl({ applicationId, datastoreId });
  return immutable({
    async getItems({
      page,
      perPage,
      includeLookups = true,
      includeLinks = true,
      sortBy = null,
      sortOrder = null,
      search = null,
    }) {
      const params = {
        page,
        per_page: perPage,
        use_display_id: true,
        include_lookups: includeLookups,
        include_links: includeLinks,
        sort_field_id: sortBy,
        sort_order: sortOrder,
        conditions: search
      };
      const result = await http.post(
        `${baseUrl}/items/search`,
        params
      );
      return result.data;
    },

    async getItem(itemId) {
      const result = await http.get(
        `${baseUrl}/items/details/${itemId}?format=map`
      );
      return result.data.field_values;
    },

    async createItem(item) {
      const params = {
        item: item,
      };
      await http.post(
        `${baseUrl}/items/new`,
        params
      );
      return true;
    },

    async updateItem({ itemId, item }) {
      if (!objHasProperty(item, 'rev_no'))
        throw new Error("Update hexabase item requires rev_no");
      const revNo = Number(item.rev_no);
      const params = {
        item: omit(item, "rev_no"),
        rev_no: revNo,
      };
      await http.post(
        `${baseUrl}/items/edit/${itemId}`,
        params
      );
      return true;
    },

    async deleteItem(itemId) {
      await http.delete(
        `${baseUrl}/items/delete/${itemId}`,
        { data: {} }
      );
      return true;
    },

    async executeAction({
      itemId,
      actionId,
      revNo
    }) {
      const params = {
        rev_no: Number(revNo),
        use_display_id: true,
      };
      await http.post(
        `${baseUrl}/items/action/${itemId}/${actionId}`,
        params
      );
      return true;
    },
  });
}