<template>
  <b-media tag="li">
    <template v-slot:aside>
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </template>
    <div class="d-flex justify-content-between">
      <div>
        <h5 class="mt-0 mb-1 colorTheme text-5">Nicole Woods</h5>
        <p class="mb-0 font-weight-dark text-break m-0" style="font-size:13px">
          {{
            feedback ||
              "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin."
          }}
        </p>
        <b-input-group class="mb-3" prepend="Reply" type="text" v-if="isReply">
          <b-form-input></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-secondary" @click="inputShow = false"
              >Add</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
      <div>
        <p class="m-0" style="font-size:13px">12:45PM</p>
        <div class="d-flex">
          <v-icon color="#f5393a" style="cursor:pointer" size="20"
            >mdi-share-circle</v-icon
          >
          <v-icon color="#f5393a" style="cursor:pointer" size="20"
            >mdi-heart</v-icon
          >
        </div>
      </div>
    </div>
    <hr />
  </b-media>
</template>

<script>
import color from "../contants/color";
export default {
  props: {
    feedback: {
      type: String
    },
    isReply: {
      type: Boolean
    }
  },
  data: () => ({})
};
</script>

<style>
.colorTheme {
  color: #f5393a;
}
</style>
