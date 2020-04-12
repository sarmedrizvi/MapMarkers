<template>
  <div class="main-content">
    <b-card :title="sideBar.name" :sub-title="sideBar.types.toUpperCase()">
      <p class="text-danger font-weight-bold text-10">
        <v-icon style="color:red;">mdi-map-marker</v-icon>
        {{ sideBar.location }}
      </p>
      <b-tabs card end v-model="tabIndex" content-class="tabs" fill>
        <b-tab :title-link-class="linkClass(0)" title="Wall">
          <div class="vuebar-element" v-bar>
            <div>
              <card :data="sideBar" v-for="i in 3" :key="i" />
            </div>
          </div>
        </b-tab>
        <b-tab :title-link-class="linkClass(1)" title="Feedback">
          <div class="vuebar-element" v-bar>
            <div>
              <ul class="list-unstyled">
                <Feedback v-for="i in 10" :key="i" />
              </ul>
            </div>
          </div>
        </b-tab>
        <b-tab :title-link-class="linkClass(2)" title="Profile">
          <div class="vuebar-element" v-bar>
            <div>
              <profile />
            </div>
          </div>
        </b-tab>
      </b-tabs>
      <b-card>
        <div style="display:flex;flex-wrap:wrap;justify-content:start">
          <p
            class="px-2 text-danger font-weight-bold"
            style="cursor:pointer"
            @click="heartFill = !heartFill"
          >
            <v-icon class="text-danger">{{
              heartFill ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon
            >Like
          </p>

          <p class="px-2 text-danger font-weight-bold" style="cursor:pointer">
            <v-icon class="text-danger">mdi-share</v-icon>Share
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
import profile from "./Profile";
export default {
  data() {
    return {
      heartFill: false,
      tabIndex: 0
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-secondary", "text-white", "px-2"];
      } else {
        return ["bg-outline-secondary", "text-dark", "px-2"];
      }
    }
  },
  components: {
    coupon,
    card,
    Feedback,
    profile
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
.vuebar-element {
  height: 350px;
  width: 100%;
  max-width: 500px;
  background: white;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out,
    height 100ms ease-out;
  background: #2e292970;
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background: #222020;
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background: #222020;
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background: #000000;
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background: #000000;
}
.coupons {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
