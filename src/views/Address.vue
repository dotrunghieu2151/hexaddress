<template>
  <v-container>
    <v-row>
      <v-data-table
        style="width: 100%"
        :headers="headers"
        :options.sync="options"
        :server-items-length="items.totalItems"
        :loading="loading"
        :items="formattedItemList.items"
        @update:options="fetchFromServer"
        class="elevation-1 mt-6"
      >
        <template v-slot:top>
          <v-row>
            <v-col cols="3" sm="6" md="3">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search address"
                single-line
                hide-details
                class="ml-4"
                @input="fetchFromServer"
              ></v-text-field>
            </v-col>
            <v-col cols="9" sm="6" md="9">
              <v-dialog v-model="createDialog" max-width="500px">
                <template v-slot:activator="{ attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2 float-right mt-3 mr-4"
                    v-bind="attrs"
                    @click="openCreateDialog"
                  >
                    New Address
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editItem.address"
                            label="Address"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="number"
                            v-model="editItem.zip"
                            label="Zip"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="number"
                            v-model="editItem.fax"
                            label="Fax"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="number"
                            v-model="editItem.telephone"
                            label="Telephone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            type="number"
                            v-model="editItem.mobile"
                            label="Mobile"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="createDialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="createAddress">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- delete dialog -->
              <v-dialog v-model="deleteDialog" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteDialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteAddress"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.user="{ item }">
          <v-chip>{{ item.user }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <div v-if="item.user === userInfo.username">
            <v-icon small class="mr-2" @click="openEditDialog(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
          </div>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { isEmpty } from "@/utils/helpers";
import { hexabaseService } from "@/services";
import { userGetters } from "@/store/modules/user";

export default {
  name: "Address",
  page: {
    title: "Address",
    meta: [{ name: "description", content: "Address page" }],
  },
  props: {
    addressList: {
      type: Object,
      isRequired: true,
    },
  },
  data() {
    return {
      formTitle: "Create address",
      createDialog: false,
      deleteDialog: false,
      search: "",
      headers: [
        {
          text: "Owner ",
          align: "left",
          value: "user",
        },
        { text: "Address", value: "address", align: "center" },
        { text: "Zip", value: "zip", align: "center" },
        { text: "Fax", value: "fax", align: "center" },
        { text: "Telephone", value: "telephone", align: "center" },
        { text: "Mobile", value: "mobile", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ],
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: [],
        sortDesc: [],
      },
      loading: false,
      items: this.addressList,
      editItem: {
        i_id: "",
        address: "",
        zip: "",
        fax: "",
        telephone: "",
        mobile: "",
        rev_no: 0,
      },
    };
  },
  computed: {
    ...userGetters(["userInfo"]),
    formattedOptions() {
      const { page, itemsPerPage } = this.options;
      let { sortBy, sortDesc } = this.options;
      sortBy = isEmpty(sortBy) ? null : sortBy[0];
      sortDesc = isEmpty(sortDesc) ? null : sortDesc[0] ? "desc" : "asc";
      return { page, itemsPerPage, sortBy, sortDesc };
    },
    formattedSearch() {
      return this.search
        ? [
            {
              id: "address", // Specify the ID entered on the Hexabase screen
              search_value: [this.search],
              exact_match: false,
            },
          ]
        : null;
    },
    formattedItemList() {
      const mapItems = this.items.items.map(
        ({ i_id, address, zip, fax, telephone, mobile, user, rev_no }) => ({
          i_id,
          address,
          zip,
          fax,
          telephone,
          mobile,
          user,
          rev_no,
        })
      );
      return {
        items: mapItems,
        totalItems: this.items.totalItems,
      };
    },
  },
  methods: {
    async fetchFromServer() {
      const { page, itemsPerPage, sortBy, sortDesc } = this.formattedOptions;
      this.loading = true;
      const data = await hexabaseService.address.getItems({
        page,
        perPage: itemsPerPage,
        sortBy,
        sortOrder: sortDesc,
        search: this.formattedSearch,
      });
      this.items = data;
      this.loading = false;
    },
    async createAddress() {
      this.createDialog = false;
      this.loading = true;
      const newItem = { ...this.editItem, user: [this.userInfo.id] };
      if (!newItem.i_id) {
        await hexabaseService.address.createItem(newItem);
      } else {
        await hexabaseService.address.updateItem({
          item: newItem,
          itemId: newItem.i_id,
        });
      }
      await this.fetchFromServer();
    },
    async deleteAddress() {
      this.loading = true;
      this.deleteDialog = false;
      await hexabaseService.address.deleteItem(this.editItem.i_id);
      await this.fetchFromServer();
      this.loading = false;
    },
    openCreateDialog() {
      this.editItem = {
        i_id: "",
        address: "",
        zip: "",
        fax: "",
        telephone: "",
        mobile: "",
        rev_no: 0,
      };
      this.formTitle = "Create Address";
      this.createDialog = true;
    },
    openEditDialog(item) {
      this.editItem = item;
      this.formTitle = "Edit Address";
      this.createDialog = true;
    },
    openDeleteDialog(item) {
      this.editItem = {
        ...this.editItem,
        i_id: item.i_id,
      };
      this.deleteDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
