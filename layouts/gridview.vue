<template>
  <div class="py-10">
    <loading :isLoading="isloading" />

    <b-toast
      id="error-toast"
      variant="warning"
      title="Network Issue"
      no-auto-hide
    >
      Something Went Wrong
    </b-toast>
    <div
      class="d-flex justify-content-center w-100 flex-column align-items-center font px-2"
    >
      <h2 class="color text-center font-weight-bold mb-5">
        Your favorite Bay Area restaurant might close forever. Help save it.
      </h2>
      <h5 class=" font-weight-lighter text-muted mb-5">
        Gift Cards help "flatten the curve" of lost income from COVID-19
      </h5>
    </div>
    <div class="d-flex justify-content-center my-7">
      <search :address="address" />
    </div>

   
      <v-tabs v-model="tab" class="tabsCard mb-10" centered color="#f5393a">
        <v-tab
          @change="getContent(item.tab, index)"
          v-for="(item, index) in items"
          :key="item.tab"
        >
          <v-icon class="pr-2">mdi-{{ item.icon }}</v-icon> {{ item.tab }}
        </v-tab>
      </v-tabs>
   

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card flat>
          <!-- <v-card-text>{{ item.content }}</v-card-text> -->
          <v-row v-if="item.content.length !== 0">
            <v-col
              md="4"
              xl="2"
              sm="6"
              lg="3"
              cols="12"
              v-for="(res, index) in item.content"
              :key="index"
            >
              <card :sideBar="res" />
            </v-col>
          </v-row>

          <skeleton v-else />
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <grid-footer />
  </div>
</template>

<script>
import search from "../components/gridView/SearchComponent";
import card from "../components/gridView/GridCard";
import loading from "../components/loading";
import skeleton from "../components/Skeleton";
import axios from "axios";
import defaultPicture from "@/assets/images/default-picture.png";
import gridFooter from "../components/gridView/gridFooter";
export default {
  data() {
    return {
      latitude: "",
      longitude: "",
      isloading: false,
      tab: null,
      address: {
        city: "",
        country: "",
        place: ""
      },
      items: [
        { tab: "restaurant", icon: "warehouse", content: [] },
        { tab: "gym", icon: "dumbbell", content: [] },
        { tab: "hospital", icon: "hospital-building", content: [] },
        { tab: "food", icon: "noodles", content: [] },
        { tab: "school", icon: "school", content: [] }
      ]
    };
  },
  components: {
    search,
    card,
    loading,
    skeleton,
    gridFooter
  },
  methods: {
    async getContent(category, id) {
      this.isloading = true;
      let request = {
        location: this.latitude + "," + this.longitude,
        radius: "1000",
        types: category,
        name: "",
        // fields: ["name", "geometry"],
        api: this.$myApi
      };

      try {
        const data = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
            request.location
          }&radius=${request.radius}&name=${
            request.name ? request.name : ""
          }&types=${request.types}&key=${request.api}`
        );

        if (data.data.error_message) {
          this.$bvToast.show("error-toast");
          this.isloading = false;
        } else {
          this.items[id].content = [];
          data.data.results.map((marker, index) => {
            this.items[id].content.push({
              name: marker.name,
              id: marker.id,
              types: marker.types[0],
              picture: marker.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=200&photoreference=${marker.photos[0].photo_reference}&key=${this.$myApi}`
                : defaultPicture,
              location: marker.vicinity,
              feedback: []
            });
          });

          this.isloading = false;
        }
      } catch (error) {
        this.$bvToast.show("error-toast");
        console.log(error);
        this.isloading = false;
      }
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${this.$myApi}`
        )

        .then(data => {
          if (data.error_message) {
            this.$bvToast.toast(`Cannot get location`, {
              title: "Location Error",
              autoHideDelay: 5000,
              appendToast: append
            });
          } else {
            // console.log(data);
            const address_comp = data.data.results[0].address_components;
            this.address.country =
              address_comp[address_comp.length - 1].long_name;
            this.address.city = address_comp[address_comp.length - 5].long_name;
            this.address.place =
              address_comp[address_comp.length - 6].long_name;

            this.getContent("restaurant", 0);
          }
        })
        .catch(err => {
          this.$bvToast.toast(`Cannot get location`, {
            title: "Location Error",
            autoHideDelay: 5000,
            appendToast: append
          });
        });
    }
  },
  created() {},
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      this.liveLocation = "Geolocation is not supported by this browser.";
    }
  }
};
</script>

<style>
.tabsContainer {
  display: flex;
  /* border: 1px solid ; */
  padding: 10px 10px;
  box-shadow: 5px 5px 2px 5px #888888;
}
.tabsCard {
  margin-top: 20px;
  /* box-shadow: 5px 10px;
  width: 74% !important; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.color {
  color: #f5393a;
}
.background-color {
  background-color: #f5393a;
}
.font {
  font-family: "Times New Roman", Times, serif;
}
</style>
