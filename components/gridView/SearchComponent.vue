<template>
  <v-sheet elevation="2" class="searchbarlenght">
    <b-input-group class="text-center font">
      <template v-slot:append>
        <p class="font-weight-bold d-flex align-items-center mb-1">|</p>
        <input
          v-model="address.country"
          type="text"
          placeholder="Country"
          class="textInput"
        />
         <p class="font-weight-bold d-flex align-items-center mb-1">|</p>
        <input
          v-model="address.city"
          type="text"
          placeholder="city"
          class="textInput"
        />
        <v-btn color="#f5393a" dark class="h-100" style="border-radius:0px">
          <v-icon color="white">mdi-magnify</v-icon>
        </v-btn>
      </template>
      <b-form-input
        style="border:0px;"
        v-model="address.place"
        placeholder="place"
        class="textInput mr-2 "
      ></b-form-input>
    </b-input-group>
  </v-sheet>
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
  /* border-radius: 20px; */
  /* border-left: 1px solid rgba(0, 0, 0, 0.322); */
}
</style>
