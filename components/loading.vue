<template>
  <div class="vld-parent">
    <loading
      loader="dots"
      color="#f5393a"
      :active.sync="isLoading"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <!-- <label><input type="checkbox" v-model="fullPage" />Full page?</label>
    <button @click.prevent="doAjax">fetch Data</button> -->
  </div>
</template>

<script>
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  props: {
    isLoading: {
      type: Boolean
    }
  },
  data() {
    return {
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
    },
    onCancel() {
      console.log("User cancelled the loader.");
    }
  }
};
</script>
