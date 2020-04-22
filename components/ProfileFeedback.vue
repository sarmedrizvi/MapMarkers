<template>
  <v-card>
    <v-card-title>Feedback</v-card-title>
    <div style="height:70vh" class="profile-feedback px-2" v-bar>
      <div>
        <ul
          style="display:flex;flex-direction:column-reverse"
          class="list-unstyled"
        >
          <feedback
            v-for="(i, index) in firebaseFeedback"
            :id="i.id"
            :feedback="i.feedback"
            :reply="i.reply"
            :isReply="true"
            :BusinessId="paramsId"
            :key="index"
          />
        </ul>
      </div>
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
