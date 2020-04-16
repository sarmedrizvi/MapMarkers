<template>
  <div>
    <v-card>
      <v-card-title style="font-size:17px">{{ sideBar.name }}</v-card-title>
      <v-icon
        :large="true"
        style="cursor:pointer;padding:10px 0px"
        @click="$emit('updateClick')"
        >mdi-arrow-left</v-icon
      >

      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="p-3">
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
import { db } from "../plugins/firebase";
export default {
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
      show: true
    };
  },
  methods: {
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
    }
  }
};
</script>
