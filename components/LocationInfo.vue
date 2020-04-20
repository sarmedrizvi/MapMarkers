<template>
  <div class>
    <v-card-text class="p-0 m-0 font-weight-bold" style="font-size:17px;overflow: hidden ;text-overflow: ellipsis; white-space: nowrap ">{{
      sideBar.name
    }}</v-card-text>
    <v-card-text class=" p-0 m-0 text-danger font-weight-bold" style="overflow: hidden ;text-overflow: ellipsis; white-space: nowrap ">
      <v-icon style="color:red;">mdi-map-marker</v-icon>
      {{ sideBar.location }}
    </v-card-text>
    
  </div>
</template>

<script>
export default {
  props: {
    sideBar: {
      type: Object
    }
  }
};
</script>

<style>

.headingSmall {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
