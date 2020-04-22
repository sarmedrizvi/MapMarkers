<template>
  <div style="">
    <b-card style="background-color: #f5393a;" text-variant="white">
      <div class="d-flex justify-content-between">
        <b-card-title class="p-0 m-0 d-flex align-items-center"
          >SaveSMB</b-card-title
        >
        <div class="d-flex " v-if="!gridView">
          <b-form-input
            v-model="nameSearch"
            size="md"
            class="webSearch mx-3"
            style="width:30em"
            placeholder="Search By Name"
            type="text"
            @keydown.enter="
              () => {
                addMarkers();
                selected = [];
              }
            "
          ></b-form-input>

          <b-button
            href="#"
            variant="light"
            style="color: #f5393a;"
            class="px-4 webSearch"
            @click="
              () => {
                addMarkers();
                selected = [];
              }
            "
            >Locate</b-button
          >
        </div>
        <v-btn icon color="white">
          <v-icon id='gridtooltip' v-if="!gridView" @click="gridView = true">
            mdi-grid
          </v-icon>
          <v-icon id="gridtooltip" v-else @click="gridView = false">
            mdi-grid-off
          </v-icon>
          <b-tooltip target="gridtooltip">Grid</b-tooltip>
        </v-btn>
      </div>

      <loading :isLoading="isloading" />

      <b-button ref="markButton" style="display: none;"></b-button>

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
      v-if="!gridView"
      @SelectedChanged="
        value => {
          selected = [...value];
          addMarkers();
        }
      "
    />
    <b-form-input
      size="sm"
      class="mobSearch"
      v-if="!gridView"
      placeholder="Search By Name"
      type="text"
      @keydown.enter="
        () => {
          addMarkers();
          selected = [];
        }
      "
      v-model="nameSearch"
    ></b-form-input>
    <div style="position: relative;" class="overflow-hidden">
      <!-- <b-sidebar
        id="sidebar-right"
        title="Dashboard"
        right
        shadow
        class="sidebar"
      >
      </b-sidebar> -->
      <transition name="slide-fade">
        <GmapMap
          id="map"
          key="1"
          ref="mapRef"
          :center="{ lat: latitude, lng: longitude }"
          :zoom="15"
          map-type-id="terrain"
          style="width: 100%; height: 80vh;"
          v-if="!gridView"
        >
          <gmap-circle
            :center="{ lat: latitude, lng: longitude }"
            :radius="3"
            :options="{
              fillColor: '#208dfa',

              strokeColor: 'rgba(74, 164, 255, 0.5)',
              fillOpacity: 1,
              strokeOpacity: 0.8
            }"
          >
          </gmap-circle>
          <gmap-circle
            :center="{ lat: latitude, lng: longitude }"
            :radius="10"
            :options="{
              fillColor: 'rgba(74, 164, 255, 0.5)',

              strokeColor: '#208dfa',
              fillOpacity: 0.35,
              strokeOpacity: 0.8
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
      </transition>
      <transition name="slide-fade">
        <div>
          <grid-view v-if="gridView" />
        </div>
      </transition>
      <v-navigation-drawer
        v-model="getDrawer"
        fixed=""
        app
        right
        clipped=""
        temporary
        class="navigate"
      >
        <div v-bar class="vuebar-location">
          <div>
            <side-bar
              :isSideBar="isSideBar"
              @updateClick="() => (isSideBar = false)"
              v-if="isSideBar"
            />
            <bussinessForm v-else @updateClick="() => (isSideBar = true)" />
          </div>
        </div>
      </v-navigation-drawer>
      <footerCustom />
    </div>
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
import { mapActions } from "vuex";
import defaultPicture from "../assets/images/default-picture.png";
import gridView from "../layouts/gridview";
export default {
  components: {
    sideBar,
    temp,
    loading,
    bussinessForm,
    categories,
    footerCustom,
    gridView
  },
  data() {
    return {
      gridView: false,
      nameSearch: null,
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
        },
        feedback: [],
        isBusinessClaimed: null
      },
      loading: true,
      transition: "scale-transition"
    };
  },
  methods: {
    ...mapActions({
      AddUser: "SideBarData/AddUser",
      sideBar: "SideBarData/AddSideBar",
      changeDrawer: "SideBarData/DrawerChange",
      ClearFeedback: "SideBarData/ClearFeedback",
      AddFeedback: "SideBarData/AddFeedback"
    }),
    sideBarOpen(m, id) {
      const data = this.markers[id];
      this.sideBarData = {
        ...this.sideBarData,
        types: data.types,
        name: data.name,
        picture: data.pictureRef
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=200&photoreference=${data.pictureRef}&key=${this.$myApi}`
          : defaultPicture,
        location: data.location,
        social: {
          likes: data.likes,
          views: data.views,
          coupons: data.coupons
        },
        id: data.id
      };

      db.ref(`ClaimBusiness/${this.sideBarData.id}`).on("value", snap => {
        if (snap.val()) {
          this.sideBarData.isBusinessClaimed = true;
        } else {
          this.sideBarData.isBusinessClaimed = false;
        }
      });

      db.ref(`BusinessProfile/${this.sideBarData.id}`).on("value", snap => {
        if (snap.val()) {
          this.AddUser({
            ...snap.val()
          });
        } else {
          this.AddUser({});
        }
      });

      this.sideBar({ ...this.sideBarData });
      db.ref(`${data.id}/feedback`).on("value", snap => {
        const data = snap.val();
        if (data) {
          this.ClearFeedback();
          Object.keys(data).map(item => {
            this.AddFeedback({ id: item, ...data[item] });
          });
        }
      });
      setTimeout(() => this.changeDrawer(true), 200);
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
            // console.log(data);
            // this.address = data.results[0].formatted_address;
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
      let request = {
        location: this.latitude + "," + this.longitude,
        radius: "1000",
        types: this.selected.toString(),
        // fields: ["name", "geometry"],
        api: this.$myApi
      };
      if (this.nameSearch) {
        request = { ...request, name: this.nameSearch };
      }
      if (this.selected.length != 0 || this.nameSearch != "") {
        this.isloading = true;
        this.loadingMarker = "Loading...";
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
              request.location
            }&radius=${request.radius}&name=${
              request.name ? request.name : ""
            }&types=${request.types}&key=${request.api}`
          )
          .then(data => {
            if (data.data.error_message) {
              this.isloading = false;
              this.$bvToast.show("error-toast");
              console.log(data.data.error_message);
              this.loadingMarker = "Something Went Wrong";
            } else {
              this.isloading = false;
              
              if (data.data.next_page_token) {
                //                 axios
                //                   .get(
                //                     `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.location}&radius=${request.radius}&types=${request.types}&key=${request.api}&pagetoken=${data.data.next_page_token}
                // `
                //                   )
                //                   .then(marker => {
                //                     data.data.results.map(marker => {
                //                       this.markers.push({
                //                         position: {
                //                           lat: marker.geometry.location.lat,
                //                           lng: marker.geometry.location.lng
                //                         },
                //                         name: marker.name,
                //                         id: marker.id,
                //                         types: marker.types[0],
                //                         pictureRef: marker.photos
                //                           ? marker.photos[0].photo_reference
                //                           : null,
                //                         location: marker.vicinity
                //                       });
                //                       this.loadingMarker = "Markers are Added";
                //                     });
                //                   });
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
                this.nameSearch = "";
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
    google: gmapApi,
    getDrawer: {
      get() {
        return this.$store.state.SideBarData.drawer;
      },
      set(value) {
        this.$store.dispatch("SideBarData/DrawerChange", value);
      }
    },
    sideBarVuex() {
      return this.$store.state.SideBarData.sideBarData;
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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.mobSearch {
  display: none;
}
@media screen and (max-width: 1200px) {
  .webSearch {
    display: none;
  }
  .mobSearch {
    display: flex;
  }
}
.webSearch {
  /* display: flex; */
  /* width: 75vw !important; */
}
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
