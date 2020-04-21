<template>
  <b-input-group class="mt-3 w-50 text-center font">
    <template v-slot:append>
      <input type="text" placeholder="Country" class="textInput" />
      <input type="text" placeholder="city" class="textInput" />
      <v-btn color="#f5393a" dark style="cursor:pointer">
        <v-icon color="white">mdi-magnify</v-icon>
      </v-btn>
    </template>
    <b-form-input placeholder="place" class="textInput"></b-form-input>
  </b-input-group>
</template>

<script>
export default {};
</script>

<style>
.textInput {
  text-align: center;
  width: 90px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.322);
}
</style>
