<template>
  <v-card style="height:70vh;overflow-y:scroll">
    <v-card-title>Feedback</v-card-title>
    <div class="px-2">
      <feedback v-for="(item,index) in 10" :isReply='true' :key="index"/>
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

<style></style>
