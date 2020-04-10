<template>
  <div style="margin: 0px 20px">
    <b-card
      bg-variant="dark"
      text-variant="white"
      title="Location"
      sub-title="Live"
      style="margin:5px 0px"
    >
      <b-card-text>{{ address }}</b-card-text>
      <b-form-group>
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="types"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-card-text>{{ loadingMarker }}</b-card-text>
      <b-button href="#" variant="primary" @click="addMarkers">Locate</b-button>
      <b-button ref="mar" v-b-toggle.sidebar-right style="display:none"></b-button>
      <b-sidebar id="sidebar-right" title="Profile" right shadow><side-bar/></b-sidebar>
    </b-card>
    <b-card bg-variant="gray" text-variant="black" title="Map">
      <GmapMap
        id="map"
        ref="mapRef"
        :center="{ lat: latitude, lng: longitude }"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 300px;"
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="
            google && new google.maps.LatLng(m.position.lat, m.position.lng)
          "
          :clickable="true"
          :draggable="true"
          @click="$refs.mar.click()"
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
    </b-card>
  </div>
</template>

<script>
import { gmapApi } from "~/node_modules/vue2-google-maps/src/main";
import { db } from "../plugins/firebase";
import sideBar from './SideBar'
export default {
  components: {
    sideBar,
  },
  data() {
    return {
      selected: [], // Must be an array reference!
      liveLocation: "",
      latitude: "",
      longitude: "",
      loadingMarker: "",
      types: ["atm", "gym", "bank", "medicines", "hospital", "health"],
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
      }
    };
  },
  methods: {
    markersHover(marker, idx) {
      // console.log(marker);
      this.infoContent = "loading...";
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
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${this.$myApi}`
      )
        .then(res => res.json())
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
        types: this.selected,
        // fields: ["name", "geometry"],
        api: this.$myApi
      };
      if (this.selected.length != 0) {
        this.loadingMarker = "Loading...";
        fetch(
          `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${request.location}&radius=${request.radius}&types=${request.types}&key=${request.api}`
        )
          .then(res => res.json())
          .then(data => {
            if (data.error_message) {
              console.log(data.error_message);
              this.loadingMarker = "Something is Wrong";
            } else {
              console.log(data);
              data.results.map(marker => {
                this.markers.push({
                  position: {
                    lat: marker.geometry.location.lat,
                    lng: marker.geometry.location.lng
                  },
                  name: marker.name,
                  id: marker.id
                });
                this.loadingMarker = "Markers are Added";
              });
            }
          })
          .catch(err => {
            console.log(err);
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
<style></style>
