<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <div>
      <profile-form :paramsId="paramsId" />
      <div class="other">
        <v-row>
          <v-col md="6" cols="12">
            <add-video :paramsId="paramsId" />
          </v-col>
          <v-col md="6" cols="12">
            <feedback :paramsId="paramsId" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import feedback from "../../components/ProfileFeedback";

import profileForm from "../../components/ProfileForm";
import addVideo from "../../components/AddVideo";
export default {
 
  data() {
    return {
      paramsId: null,
      items: [
        {
          text: "Map",
          href: "/"
        },
        {
          text: "Business Profile",
          href: "#"
        }
      ]
    };
  },
  components: {
    profileForm,
    addVideo,
    feedback
  },
  mounted() {
   
  },
  created() {
    this.paramsId = this.$route.params.id;
  }
};
</script>

<style>
.other {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center; */
}
</style>
