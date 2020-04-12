<template>
  <v-col class="mb-12" cols="12" md="4">
    <v-skeleton-loader
      :loading="loading"
      :transition="transition"
      height="94"
      type="list-item-two-line"
    >
      <v-card>
        <v-card-title>Title</v-card-title>
        <v-card-text>Card Text</v-card-text>
      </v-card>
    </v-skeleton-loader>
  </v-col>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      transition: "scale-transition"
    };
  }
};
</script>

<style>
</style>