<template>
  <b-input-group class="mt-3 searchbarlenght  text-center font">
    <template v-slot:append>
      <input
        v-model="address.country"
        type="text"
        placeholder="Country"
        class="textInput"
      />
      <input
        v-model="address.city"
        type="text"
        placeholder="city"
        class="textInput"
      />
      <v-btn color="#f5393a" dark style="cursor:pointer">
        <v-icon color="white">mdi-magnify</v-icon>
      </v-btn>
    </template>
    <b-form-input
      v-model="address.place"
      placeholder="place"
      class="textInput"
    ></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  props: {
    address: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style>
@media screen and (max-width: 500px) {
  .searchbarlenght {
    width: 100% !important;
  }
}
.searchbarlenght {
  width: 50%;
}
.textInput {
  text-align: center;
  width: 90px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.322);
}
</style>
