<template>
  <v-card max-width="400" class="mx-auto" style="margin:10px 0px">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-img :src="picture" height="194"></v-img>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-comment</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-telegram</v-icon>
    </v-btn>
    <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

    <v-card-actions>
      <v-text-field placeholder="Comment" filled rounded dense style="width:100%"></v-text-field>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    picture: String
  }
};
</script>

<style>
</style>