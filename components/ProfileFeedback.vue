<template>
  <v-card>
    <v-card-title>Feedback</v-card-title>
    <div style="height:70vh" class="profile-feedback" v-bar>
      <div class="px-2" v-if="firebaseFeedback.length !== 0">
        <feedback
          v-for="(i, index) in firebaseFeedback"
          :id="i.id"
          :feedback="i.feedback"
          :reply="i.reply"
          :isReply="true"
          :BusinessId="paramsId"
          :key="index"
        />
      </div>
      <h3 v-else>No Feedback</h3>
    </div>
  </v-card>
</template>

<script>
import feedback from "../components/feedback";
import { db } from "../plugins/firebase";

export default {
  data() {
    return {
      firebaseFeedback: []
    };
  },
  props: {
    paramsId: {
      type: String
    }
  },
  components: {
    feedback
  },
  mounted() {
    db.ref(`${this.paramsId}/feedback`).on("value", snap => {
      const data = snap.val();
      if (data) {
        this.firebaseFeedback = [];
        Object.keys(data).map(item => {
          this.firebaseFeedback.push({ id: item, ...data[item] });
        });
      }
    });
  }
};
</script>

<style>
.profile-feedback {
  width: 100%;
  background: white;
}
</style>
