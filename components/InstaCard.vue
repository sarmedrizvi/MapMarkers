<template>
  <v-card max-width="400" class="mx-auto" style="margin:10px 0px">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-card-text
          class="font-weight-bold d-flex justify-content-between align-items-center px-1"
        >
          Best Perth
          <v-btn icon>
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-card-text>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="data.picture"
      height="194"
    ></v-img>
    <div class="d-flex justify-content-between py-0 px-2">
      <div>
        <v-btn icon @click="heartFill = !heartFill">
          <v-icon :class="heartFill ? 'text-danger' : ''">{{
            heartFill ? "mdi-heart" : "mdi-heart-outline"
          }}</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-chat-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-telegram</v-icon>
        </v-btn>
      </div>
      <v-btn icon>
        <v-icon>mdi-bookmark-outline</v-icon>
      </v-btn>
    </div>
    <v-card-text class="text-danger py-0 px-3 font-weight-bold"
      >{{ data.social.likes }} likes</v-card-text
    >
    <v-card-text class="py-0 px-3"
      >Visit ten places on our planet that are undergoing the biggest changes
      today.</v-card-text
    >
    <v-card-text class="text-5 py-1 text-black-50" style="cursor:pointer"
      >View all comments</v-card-text
    >
    <v-card-actions>
      <b-form-input
        v-model="comment"
        placeholder="Add a comment"
        size="sm"
      ></b-form-input>

      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      comment: "",
      heartFill: false
    };
  }
};
</script>

<style></style>
