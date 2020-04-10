<template>
  <div class="main-content">
    <b-card :title="sideBar.name" :sub-title="sideBar.types.toUpperCase()">
      <p class="text-danger font-weight-bold text-10">{{sideBar.location}}</p>
      <b-tabs
        pills
        tab-class="text-warning"
        end
        active-nav-item-class="font-weight-bold text-uppercase text-white"
        active-tab-class="font-weight-bold text-success"
        content-class="mt-3"
      >
        <!-- https://picsum.photos/500/500/?image=54 -->
        <b-tab title="Wall" style="overflow: scroll;height:400px;">
		  <card :picture='sideBar.picture'/>
		  <card/>
        </b-tab>
        <b-tab title="Feedback">
          <b-card-text>Feedback</b-card-text>
        </b-tab>
        <b-tab title="Profile">
          <b-card-text>Profile</b-card-text>
        </b-tab>
      </b-tabs>
      <b-card>
        <div style="display:flex;flex-wrap:wrap;justify-content:start">
          <p class="px-2 text-danger font-weight-bold">&#x2764; Like</p>
          <p class="px-2 text-danger font-weight-bold">Share</p>
          <p class="px-2 text-danger font-weight-bold">Contact</p>
        </div>
        <b-card-text class="font-weight-bold">Buy Coupons Now</b-card-text>
        <hr class="w-25 border border border-secondary" />

        <div class="coupons">
          <coupon price="$5" />
          <coupon price="$10" />
          <coupon price="$15" />
          <coupon price="$20" />
        </div>
      </b-card>
    </b-card>
  </div>
</template>

<script>
import coupon from "./coupons";
import card from './InstaCard'
export default {
  components: {
	coupon,
	card
  },
  props: {
    sideBar: {
      type: Object
    }
  },
  computed: {}
};
</script>

<style>
.coupons {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>