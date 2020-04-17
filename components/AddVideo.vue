<template>
  <v-card class="px-2" style="height:70vh;overflow-y:scroll">
    <v-card-title>Embedded Videos</v-card-title>
    <dialog-custom />
    <v-row>
      <v-col v-for="(video, index) in 5" :key="index" md="6" cols="6">
        <div>
          <v-icon style="cursor:pointer" @click="deleteVideo(index)"
            >mdi-delete-empty</v-icon
          >
          <b-embed
            type="iframe"
            aspect="16by9"
            src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
            allowfullscreen
          ></b-embed>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import dialogCustom from "./dialog";
export default {
  components: {
    dialogCustom
  },
  data() {
    return {
      isDelete: false
    };
  }
};
</script>

<style></style>
