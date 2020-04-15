<template>
  <div style="">
    <b-card style="background-color:#f5393a" text-variant="white">
      <div class="d-flex justify-content-between">
        <b-card-title>Live Location</b-card-title>
        <b-button
          href="#"
          variant="light"
          style="color:#f5393a"
          class="px-4"
          @click="addMarkers"
          >Locate</b-button
        >
      </div>

      <loading :isLoading="isloading" />
      <!-- <b-card-text>{{ address }}</b-card-text> -->
      <!-- <b-form-group>
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="types"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-card-text>{{ loadingMarker }}</b-card-text> -->
      <!--   -->
      <b-button ref="markButton" style="display:none"></b-button>

      <b-toast
        id="error-toast"
        variant="warning"
        title="Network Issue"
        no-auto-hide
      >
        Something Went Wrong
      </b-toast>
    </b-card>
    <categories
      :selectedCategories="selected"
      @SelectedChanged="
        value => {
          selected = [...value];
          addMarkers();
        }
      "
    />

    <div style="position: relative;" class="overflow-hidden">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        right
       
        temporary
        class="navigate"
      >
        <div v-bar class="vuebar-location">
          <div>
            <side-bar
              :sideBar="sideBarData"
              :isSideBar="isSideBar"
              @updateClick="() => (isSideBar = false)"
              v-if="isSideBar"
            />
            <bussinessForm
              v-else
              @updateClick="() => (isSideBar = true)"
              :sideBar="sideBarData"
            />
          </div>
        </div>
      </v-navigation-drawer>

      <!-- <b-sidebar
        id="sidebar-right"
        title="Dashboard"
        right
        shadow
        class="sidebar"
      >
      </b-sidebar> -->
      <GmapMap
        id="map"
        ref="mapRef"
        :center="{ lat: latitude, lng: longitude }"
        :zoom="18"
        map-type-id="terrain"
        style="width: 100%; height: 75vh;"
      >
        <gmap-circle
          :center="{ lat: latitude, lng: longitude }"
          :radius="3"
          :options="{
            fillColor: '#208dfa',
            stroke: 'border',
            strokeColor: 'rgba(74, 164, 255, 0.5)',
            fillOpacity: 1,
            strokeOpacity: 0.8,
            strokeWeight: 2
          }"
        >
        </gmap-circle>
        <gmap-circle
          :center="{ lat: latitude, lng: longitude }"
          :radius="10"
          :options="{
            fillColor: 'rgba(74, 164, 255, 0.5)',
            stroke: 'border',
            strokeColor: '#208dfa',
            fillOpacity: 0.35,
            strokeOpacity: 0.8,
            strokeWeight: 2
          }"
        >
        </gmap-circle>
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="
            google && new google.maps.LatLng(m.position.lat, m.position.lng)
          "
          :clickable="true"
          :draggable="true"
          @click="
            () => {
              $refs.markButton.click(m);
              sideBarOpen(m, index);
            }
          "
          @mouseover="markersHover(m, index)"
          @mouseout="markerLeave"
        />

        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen = false"
        >
          <div v-html="infoContent"></div>
        </gmap-info-window>
      </GmapMap>
    </div>
    <footerCustom />
  </div>
</template>

<script>
import footerCustom from "./footer";
import categories from "./categories";
import loading from "./loading";
import { gmapApi } from "~/node_modules/vue2-google-maps/src/main";
import { db } from "../plugins/firebase";
import sideBar from "./SideBar";
import temp from "./Skeleton";
import bussinessForm from "./bussinessForm";
import axios from "axios";
export default {
  components: {
    sideBar,
    temp,
    loading,
    bussinessForm,
    categories,
    footerCustom
  },
  data() {
    return {
      drawer: false,
      isSideBar: true,
      hide: false,
      isloading: false,
      selected: [], // Must be an array reference!
      liveLocation: "",
      latitude: "",
      longitude: "",
      loadingMarker: "",
      types: [
        { text: "Restaurant", value: "restaurant" },
        { text: "Gym", value: "gym" },
        { text: "Hospital", value: "hospital" },
        { text: "Medicine", value: "medicine" },
        { text: "Food", value: "food" },
        { text: "Education", value: "education" }
      ],
      address: "",
      markers: [],
      location: "",
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      sideBarData: {
        picture: "",
        types: "",
        social: {
          likes: "",
          views: "",
          coupons: ""
        }
      },
      loading: true,
      transition: "scale-transition"
    };
  },
  methods: {
    sideBarOpen(m, id) {
      setTimeout(() => (this.drawer = !this.drawer), 200);
      const data = this.markers[id];
      this.sideBarData = {
        ...this.sideBarData,
        types: data.types,
        name: data.name,
        picture: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=200&photoreference=${data.pictureRef}&key=${this.$myApi}`,
        location: data.location,
        social: {
          likes: data.likes,
          views: data.views,
          coupons: data.coupons
        },
        id: data.id
      };
    },
    markersHover(marker, idx) {
      // console.log(marker);
      this.infoContent = ` loading...`;
      this.infoWindowPos = marker.position;

      this.fireBaseStore(marker, idx);

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    markerLeave() {
      this.infoWinOpen = false;
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.liveLocation =
        "Latitude: " +
        position.coords.latitude +
        "  Longitude: " +
        position.coords.longitude;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${this.$myApi}`
        )

        .then(data => {
          if (data.error_message) {
            console.log(data.error_message);
          } else {
            console.log(data);
            this.address = data.results[0].formatted_address;
          }
        })
        .catch(console.log);
    },
    getInfoWindowContent: function(marker) {
      return `<div class="">
          <div>
            <div>
              <div class="m-2"><span style="font-weight: bold;">Name: </span>
                ${marker.name}
              </div>
            </div>
            <div class="m-2"><span style="font-weight: bold;">Views:  </span>
              ${marker.views}
              <br>
            </div>
             <div class="m-2"><span style="font-weight: bold;">likes:  </span>
              ${marker.likes}
              <br>
            </div>
             <div class="m-2"><span style="font-weight: bold;">Coupons:  </span>
              ${marker.coupons}
              <br>
            </div>
          </div>
        </div>`;
    },
    addMarkers() {
      console.log(this.selected);
      this.markers = [];
      const request = {
        location: this.latitude + "," + this.longitude,
        radius: "1000",
        types: this.selected.toString(),
        // fields: ["name", "geometry"],
        api: this.$myApi
      };
      if (this.selected.length != 0) {
        this.isloading = true;
        this.loadingMarker = "Loading...";
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.location}&radius=${request.radius}&types=${request.types}&key=${request.api}`
          )
          .then(data => {
            if (data.data.error_message) {
              this.isloading = false;
              this.$bvToast.show("error-toast");
              console.log(data.data.error_message);
              this.loadingMarker = "Something Went Wrong";
            } else {
              this.isloading = false;
              console.log(data);
              if (data.data.next_page_token) {
                console.log("it has next");
                axios
                  .get(
                    `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.location}&radius=${request.radius}&types=${request.types}&key=${request.api}&pagetoken=${data.data.next_page_token}
`
                  )
                  .then(marker => {
                    data.data.results.map(marker => {
                      this.markers.push({
                        position: {
                          lat: marker.geometry.location.lat,
                          lng: marker.geometry.location.lng
                        },
                        name: marker.name,
                        id: marker.id,
                        types: marker.types[0],
                        pictureRef: marker.photos
                          ? marker.photos[0].photo_reference
                          : null,
                        location: marker.vicinity
                      });
                      this.loadingMarker = "Markers are Added";
                    });
                  });
              }
              data.data.results.map(marker => {
                this.markers.push({
                  position: {
                    lat: marker.geometry.location.lat,
                    lng: marker.geometry.location.lng
                  },
                  name: marker.name,
                  id: marker.id,
                  types: marker.types[0],
                  pictureRef: marker.photos
                    ? marker.photos[0].photo_reference
                    : null,
                  location: marker.vicinity
                });
                this.loadingMarker = "Markers are Added";
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.isloading = false;
            this.$bvToast.show("error-toast");
            this.loadingMarker = "Something is Wrong";
          });
      } else {
        this.loadingMarker = "";
        this.markers = [];
      }
    },
    fireBaseStore(marker, idx) {
      db.ref("/" + marker.id).once("value", snapshot => {
        if (snapshot.val()) {
          db.ref("/" + marker.id)
            .update({
              views: snapshot.val().views + 1
            })
            .then(() => {
              this.getMarkerData(marker.id, idx);
            });
        } else {
          db.ref("/" + marker.id)
            .set({
              views: parseInt(500 + Math.random() * 1000),
              likes: parseInt(300 + Math.random() * 400),
              coupons: parseInt(30 + Math.random() * 200)
            })
            .then(() => {
              this.getMarkerData(marker.id, idx);
            });
        }
      });
    },
    getMarkerData(id, idx) {
      db.ref("/" + id)
        .once("value")
        .then(snapshot => {
          // console.log({ ...this.markers[idx], ...snapshot.val() })
          this.markers[idx] = { ...this.markers[idx], ...snapshot.val() };
          this.infoContent = this.getInfoWindowContent(this.markers[idx]);
        });
    }
  },
  computed: {
    google: gmapApi
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
.navigate {
  width: 400px !important;
}
@media screen and (max-width: 500px) {
  .navigate {
    width: 300px !important;
  }
}
.sidebar {
  width: 430px;
}
.vuebar-location {
  height: 100%;
  width: 100%;
  max-width: 500px;
  background: white;
}
</style>
