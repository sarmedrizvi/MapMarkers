<template>
  <v-card>
    <v-card-title>Feedback</v-card-title>
    <div style="height:70vh" class="profile-feedback" v-bar>
      <div class="px-2">
        <feedback v-for="(item, index) in 10" :isReply="true" :key="index" />
      </div>
    </div>
  </v-card>
</template>

<script>
import feedback from "../components/feedback";
export default {
  components: {
    feedback
  }
};
</script>

<style>
.profile-feedback {
  width: 100%;
  background: white;
}
</style>
