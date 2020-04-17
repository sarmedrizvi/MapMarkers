<template>
  <div>
    <v-card-title style="font-size:17px" class="p-0 m-0">{{
      sideBar.name
    }}</v-card-title>
    <v-card-text
      class=" p-0 m-0 text-danger font-weight-bold"
      style="overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;"
    >
      <v-icon style="color:red;">mdi-map-marker</v-icon>
      {{ sideBar.location }}
    </v-card-text>
    <v-card-title style="font-size:17px" class="p-0 m-0"
      >Introductory Video</v-card-title
    >
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

<style></style>
