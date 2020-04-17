<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <b-row >
      <v-col cols="12" md="2">
        <profilePicture />
      </v-col>
      <v-col cols="12" md="9">
        <profile-form />
      </v-col>
      <v-col cols="12" md="6" > <add-video /> </v-col>
      <v-col cols="12" md="6"> <feedback /> </v-col>
      
    </b-row>
  </div>
</template>

<script>
import feedback from "../../components/ProfileFeedback";
import profilePicture from "../../components/profilepicture";
import profileForm from "../../components/ProfileForm";
import addVideo from "../../components/AddVideo";
export default {
  data() {
    return {
      items: [
        {
          text: "Map",
          href: "#"
        },
        {
          text: "Business Profile",
          href: "#"
        }
      ]
    };
  },
  components: {
    profilePicture,
    profileForm,
    addVideo,
    feedback
  }
};
</script>

<style></style>
