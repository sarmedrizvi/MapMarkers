<template>
  <v-card class="mx-auto font" max-width="270">
    <v-img :src="sideBar.picture" height="200px"></v-img>
    <div class="d-flex flex-column justify-content-center align-items-center">
      <v-card-title
        class="w-100 pb-0 d-flex justify-content-center color title1 font"
      >
        {{ sideBar.name }}
      </v-card-title>

      <p class="text-muted text-center">
        {{ sideBar.types }}
      </p>
    </div>
    <v-card-actions>
      <v-btn dark color="#f5393a" @click="openSlider" class=" w-100">
        Get Gift Card
      </v-btn>
    </v-card-actions>

    <!-- <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import { db } from "../../plugins/firebase";

export default {
  props: {
    sideBar: {
      type: Object
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    ...mapActions({
      AddUser: "SideBarData/AddUser",
      AddSideBarData: "SideBarData/AddSideBar",
      changeDrawer: "SideBarData/DrawerChange",
      AddFeedback: "SideBarData/AddFeedback"
    }),
    openSlider() {
      setTimeout(() => this.changeDrawer(true), 200);
      this.AddSideBarData({ ...this.sideBar });
      db.ref(`${this.sideBar.id}/feedback`).on("value", snap => {
        const data = snap.val();
        if (data) {
          Object.keys(data).map(item => {
            this.AddFeedback({ id: item, ...data[item] });
          });
        }
      });
      db.ref(`BusinessProfile/${this.sideBar.id}`).on("value", snap => {
        if (snap.val()) {
          this.AddUser({
            ...snap.val()
          });
        } else {
          this.AddUser({});
        }
      });
    }
  }
};
</script>

<style>
.title1 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.295);
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
