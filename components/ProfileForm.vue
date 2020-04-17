<template>
  <div>
    <b-card>
      <v-form v-model="form.valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.firstname"
                :rules="nameRules"
                :counter="10"
                label="First name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.middlename"
                label="Middle Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.lastname"
                :rules="nameRules"
                :counter="10"
                label="Last name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.companyName"
                :rules="emailRules"
                label="Company Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Company E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-card-title class="text-muted ">Company Address</v-card-title>
            <v-card-text class=""
              ><hr class=" p-0 m-0 w-100 border"
            /></v-card-text>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="form.companyAddress.Address1"
                label="Address 1"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="form.companyAddress.Address2"
                label="Address 2"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.companyAddress.city"
                label="City"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.companyAddress.country"
                label="Country"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </b-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    result: null,
    form: {
      companyName: "",
      companyAddress: {
        Address1: "",
        Address2: "",
        city: "",
        country: ""
      },
      valid: false,
      middlename: "",
      firstname: "",
      lastname: "",
      email: ""
    },

    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],

    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  computed: {
    sideBar() {
      return this.$store.state.SideBarData.sideBarData;
    }
  },
  created() {
    console.log(this.sideBar);
  }
};
</script>

<style></style>
