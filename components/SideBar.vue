<template>
  <div class="main-content">
    <b-card :title="sideBar.name" :sub-title="sideBar.types.toUpperCase()">
      <p class="text-danger font-weight-bold text-10">
        <v-icon style="color:red;">mdi-map-marker</v-icon>
        {{sideBar.location}}
      </p>
      <b-tabs
        class="mytabs"
        card
        pills
        end
        active-nav-item-class="font-weight-bold text-uppercase text-white"
        active-tab-class="font-weight-bold "
        content-class="mt-3"
      >
        <!-- https://picsum.photos/500/500/?image=54 -->
        <b-tab title="Wall" style="overflow: scroll;height:400px;">
          <card :picture="sideBar.picture" v-for="i in 3" :key="i" />
        </b-tab>
        <b-tab title="Feedback" style="height:400px;overflow: scroll;">
          <ul class="list-unstyled">
            <Feedback v-for="i in 10" :key="i" />
          </ul>
        </b-tab>
        <b-tab title="Profile">
          <b-card-text>Profile</b-card-text>
        </b-tab>
      </b-tabs>
      <b-card>
        <div style="display:flex;flex-wrap:wrap;justify-content:start">
          <p
            class="px-2 text-danger font-weight-bold"
            style="cursor:pointer"
            @click="heartFill=!heartFill"
          >
            <v-icon class="text-danger">{{heartFill ? "mdi-heart":"mdi-heart-outline"}}</v-icon>Like
          </p>

          <p class="px-2 text-danger font-weight-bold" style="cursor:pointer">
            <v-icon class="text-danger">mdi-share-circle</v-icon>Share
          </p>
          <p class="px-2 text-danger font-weight-bold" style="cursor:pointer">
            <v-icon class="text-danger">mdi-account-box-outline</v-icon>Contact
          </p>
        </div>
        <b-card-text class="font-weight-bold">Buy Coupons Now</b-card-text>
        <hr class="w-25 border border border-secondary" />

        <div class="coupons">
          <coupon price="$20" type="Bronze" />
          <coupon price="$50" type="Silver" />
          <coupon price="$100" type="Gold" />
          <coupon price="$200" type="Platinum" />
        </div>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import coupon from "./coupons";
import card from "./InstaCard";
import Feedback from "./feedback";
export default {
  data() {
    return {
      heartFill: false
    };
  },
  components: {
    coupon,
    card,
    Feedback
  },
  props: {
    sideBar: {
      type: Object
    }
  },
  computed: {}
};
</script>

<style >
.tabs.mytabs .nav-tabs .nav-link.active {
  background-color: #aabbcc !important;
}
.coupons {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>