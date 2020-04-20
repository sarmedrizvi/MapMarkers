<template>
  <div>
    <div class="d-flex justify-content-center my-2">
      <v-btn color="red lighten-2" @click="inputShow = true" dark>
        Add Video
      </v-btn>
    </div>
    <div v-if="inputShow">
      <b-form @submit="AddVideoToFirebase">
        <b-input-group>
          <b-form-input required v-model="embeded" type="text"></b-form-input>

          <b-input-group-append>
            <b-button variant="outline-secondary" type="submit">Add</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { db, auth, provider } from "../plugins/firebase";
export default {
  props: {
    paramsId: {
      type: String
    }
  },
  data() {
    return {
      inputShow: false,
      embeded: ""
    };
  },
  methods: {
    AddVideoToFirebase(evt) {
      evt.stopPropagation();
      this.inputShow = false;
      db.ref(`BusinessProfile/${this.paramsId}/embededVideos`).push(
        this.embeded
      );
    }
  }
};
</script>
