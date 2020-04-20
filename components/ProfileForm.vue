<template>
  <div class="w-100 p-2">
    <b-toast id="success-toast" variant="success" title="Updated">
      Profile Successfully Updated
    </b-toast>
    <v-card-title>Profile</v-card-title>
    <v-card class="formCard">
      <div class="d-flex" style="position:relative">
        <b-img
          width="300"
          height="200"
          :src="form.photoURL"
          alt="Profile Picture"
          class="image"
        ></b-img>
        <v-avatar size="80" style="position:absolute;right:120px;top:60px">
          <b-img :src="form.photoURL" alt="Profile Picture"></b-img
        ></v-avatar>
      </div>
      <v-form v-model="form.valid" class="w-100">
        <div class="form">
          <v-text-field
            v-model="form.displayName"
            :rules="nameRules"
            :counter="10"
            label="First name"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.middlename"
            label="Middle Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.companyName"
            label="Company Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="Company E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.phoneNumber"
            label="Company Phone Number"
            required
          ></v-text-field>
        </div>
        <div>
          <v-card-title class="text-muted m-2 p-0"
            >Company Address</v-card-title
          >
          <v-card-text class="p-0 m-2"
            ><hr class="p-0 m-0 w-75 border"
          /></v-card-text>
        </div>
        <div class="form">
          <v-text-field
            v-model="form.companyAddress.Address1"
            label="Address 1"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.companyAddress.Address2"
            label="Address 2"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.companyAddress.city"
            label="City"
            required
          ></v-text-field>

          <country-select
            v-model="form.country"
            :country="form.country"
            topCountry="PK"
            class="country"
            aria-placeholder="Pk"
          />
        </div>
        <div class="d-flex justify-content-end mx-3 my-2">
          <v-btn
            color="#f5393a"
            @click="SetBusinessForm"
            depressed
            style="color:white"
          >
            Save
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { db, auth, provider } from "../plugins/firebase";

export default {
  props: {
    paramsId: {
      type: String
    }
  },

  data: () => ({
    result: null,

    form: {
      companyName: "",
      phoneNumber: "",
      photoURL: "",
      companyAddress: {
        Address1: "",
        Address2: "",
        city: "",
        country: ""
      },
      valid: false,
      middlename: "",
      displayName: "",
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
    UserDetails() {
      return this.$store.state.SideBarData.sideBarUser;
    }
  },
  methods: {
    ...mapActions({
      AddUser: "SideBarData/AddUser"
    }),
    SetBusinessForm(evt) {
      db.ref(`BusinessProfile/${this.paramsId}`)
        .set({
          ...this.form
        })
        .then(res => {
          this.$bvToast.show("success-toast");
          // alert("Done");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    db.ref(`BusinessProfile/${this.paramsId}`).on("value", snap => {
      if (snap.val()) {
        this.AddUser({
          ...snap.val()
        });
      }
    });

    // const {
    //   uid,
    //   displayName,
    //   photoURL,
    //   phoneNumber,
    //   emailVerified,
    //   email
    // } = this.UserDetails;
    this.form = {
      ...this.form,
      // displayName,
      // email,
      // phoneNumber,
      // photoURL
      ...this.UserDetails
    };
  }
};
</script>

<style>
@media screen and (max-width: 620px) {
  .formCard {
    display: grid !important;
    align-items: center;
    justify-content: center;
  }
}

.image {
  border-radius: 10px;
  opacity: 0.3;
}
.formCard {
  display: flex;
  width: 100%;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.form {
  /* width: 80%; */
  display: grid;
  grid-template-columns: repeat(auto-fill, 17em);
  /* justify-content: center;
  align-items: center; */
  column-gap: 15px;
  padding: 10px;
}
.country {
  border-bottom: 1px solid rgba(0, 0, 0, 0.445);
  cursor: pointer;
  color: rgba(0, 0, 0, 0.651);
  align-self: center;
}

.country:hover {
  border-bottom: 1px solid rgb(0, 0, 0);
}
</style>
