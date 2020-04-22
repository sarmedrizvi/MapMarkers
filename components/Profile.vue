<template>
  <div class="container">
    <v-row align="center" justify="center">
      <v-img
        :src="sideBar.picture"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="100"
        style="border-bottom-left-radius: 100px;border-bottom-right-radius: 100px;"
      ></v-img>
    </v-row>
    <div
      class="d-flex flex-column justify-content-center align-items-center avatar"
    >
      <v-avatar size="70">
        <img
          :src="UserDetails.photoURL || dp"
          alt="John"
          style="border:3px white solid"
        />
      </v-avatar>
      <p
        class="m-0 text-20 font-weight-bold text-center w-75"
        style="overflow: hidden ;text-overflow: ellipsis; white-space: nowrap"
      >
        {{ sideBar.name }}
      </p>
      <p class="font-weight-bold m-0 text-danger font-size-small">
        {{ sideBar.types }}
      </p>
      <p class="font-size-small text-center">
        {{ sideBar.location }} | +9233-7263727
      </p>
    </div>
    <div class="d-flex justify-content-center">
      <v-avatar size="36" color="#1A237E" class="mx-2">
        <v-icon class="text-white headline">mdi-facebook</v-icon>
      </v-avatar>
      <v-avatar size="36" color="#BF360C" class="mx-2">
        <v-icon class="text-white headline">mdi-google-plus</v-icon>
      </v-avatar>
      <v-avatar size="36" color="#B71C1C" class="mx-2">
        <v-icon class="text-white headline">mdi-kodi</v-icon>
      </v-avatar>
    </div>
    <p class="text-muted ">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
</template>

<script>
import dp from "../assets/images/default-picture-dp.jpg";
export default {
  data() {
    return {
      dp
    };
  },
  props: {
    sideBar: {
      type: Object
    }
  },
  computed: {
    UserDetails() {
      return this.$store.state.SideBarData.sideBarUser;
    }
  }
};
</script>

<style>
.container {
  display: grid;
}
.avatar {
  position: relative;
  top: -23px;
}
.font-size-small {
  font-size: 13px;
}
.font-size-large {
  font-size: 23px;
}
</style>
