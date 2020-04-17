<template>
  <div>
    <v-card class="px-2 py-1">
      <location-info :sideBar="sideBar" />
      <v-icon
        :large="true"
        style="cursor:pointer;padding:10px 0px"
        @click="$emit('updateClick')"
        >mdi-arrow-left</v-icon
      >
      <div class="d-flex justify-content-center">
       
        <b-button variant="danger"  v-if="fbShow" @click="facebookAuth"
          >Login as facebook</b-button
        >
      </div>
      <b-form
        @submit="onSubmit"
        @reset="onReset"
        v-if="show && $store.state.SideBarData.sideBarUser !== {}"
      >
        <b-form-group
          id="input-group-3"
          label="Your First Name:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.fName"
            required
            placeholder="Enter First Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Your Last Name:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.lName"
            required
            placeholder="Enter Last Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Your Phone Number:"
          label-for="input-2"
          description="format: 0342-9999999"
        >
          <b-form-input
            id="input-2"
            type="tel"
            v-model="form.phone"
            pattern="[0]{1}[3]{1}[0-9]{2}-[0-9]{7}"
            required
            placeholder="Enter Phone Number"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter Email"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="danger">Submit</b-button>
        <b-button type="reset">Reset</b-button>
      </b-form>
    </v-card>
  </div>
</template>

<script>
import { db, auth, provider } from "../plugins/firebase";
import { mapActions, mapGetters, mapMutations } from "vuex";
import locationInfo from "./LocationInfo";
export default {
  components: {
    locationInfo
  },
  props: {
    sideBar: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        email: "",
        lName: "",
        fName: "",
        phone: ""
      },
      show: false,
      fbShow: true
    };
  },
  methods: {
    facebookAuth() {
      auth
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const {
            uid,
            displayName,
            photoURL,
            phoneNumber,
            emailVerified,
            email
          } = result.user;
          // ...
          this.AddUser({
            uid,
            displayName,
            email,
            phoneNumber,
            photoURL,
            emailVerified
          });
          db.ref(`BusinessDetails/${this.sideBar.id}/facebookLogin`).on(
            "value",
            snap => {
              if (snap.val()) {
                alert("Already Registered");
              } else {
                db.ref(`BusinessDetails/${this.sideBar.id}/facebookLogin`).set({
                  ...this.$store.state.SideBarData.sideBarUser
                });
                this.show = true;
                this.fbShow = false;
              }
            }
          );

          // console.log(this.$store.state.SideBarData.sideBarUser, "No");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      // this.form.businessName = this.sideBar.name;
      // this.form.businessType = this.sideBar.type;
      // this.form.location = this.sideBar.location;
      this.form = {
        ...this.form,
        businessName: this.sideBar.name,
        type: this.sideBar.types,
        location: this.sideBar.location
      };
      //   alert(JSON.stringify(this.form));
      const bussinessFormRef = db.ref(`/BusinessDetails/${this.sideBar.id}`);
      bussinessFormRef
        .set({
          ...this.form
        })
        .then(() => {
          alert("You are registered");
          this.form.businessName = "";
          this.form.businessType = "";
          this.form.location = "";
          this.form.email = "";
          this.form.fName = "";
          this.form.lName = "";
          this.form.phone = "";
        });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.fName = "";
      this.form.lName = "";
      this.form.phone = "";
      this.form.businessName = "";
      this.form.businessType = "";
      this.form.location = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    ...mapActions({ AddUser: "SideBarData/AddUser" })
  },
  computed: {
    // ...mapGetters({ User: "SideBarData/BusinessUser" }),
  }
};
</script>
