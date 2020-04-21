<template>
  <v-card class="mx-auto font" max-width="270">
    <v-img :src="picture" height="200px"></v-img>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <v-card-title
        class="w-100 pb-0 d-flex justify-content-center color title1 font"
      >
        {{ title }}
      </v-card-title>

      <p class="text-muted text-center">
        {{ text }}
      </p>
    </div>
    <v-card-actions>
      <v-btn dark color="#f5393a" class=" w-100">
        Get Gift Card
      </v-btn>
    </v-card-actions>

    <!-- <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    title: {
      type: String
    },
    picture: {
      type: String
    }
  },
  data: () => ({
    show: false
  })
};
</script>

<style>
.title1 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.295);
  flex-wrap: nowrap;
    overflow-x: auto;
}
</style>
