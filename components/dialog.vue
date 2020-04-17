<template>
  <div>
    <div class="d-flex justify-content-center my-2">
      <v-btn color="red lighten-2" @click="inputShow = true" dark>
        Add Video
      </v-btn>
    </div>
    <div v-if="inputShow">
      <b-input-group>
        <b-form-input type="text"></b-form-input>

        <b-input-group-append>
          <b-button variant="outline-secondary" @click="inputShow = false"
            >Add</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputShow: false
    };
  }
};
</script>
