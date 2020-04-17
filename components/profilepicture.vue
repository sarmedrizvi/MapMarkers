<template>
  <div class="profile-pic">
    <b-card no-body>
      <b-img
        :src="userDetails.picture || 'https://picsum.photos/200/400/?image=58'"
        alt="Image"
      ></b-img>
  
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log(this.userDetails);
  },
  computed: {
    userDetails() {
      return this.$store.state.SideBarData.sideBarData;
    }
  }
};
</script>

<style>
.profile-pic {
  /* width: 300px; */
}
</style>
