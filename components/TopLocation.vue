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
      <b-card-text>{{loadingMarker}}</b-card-text>
      <b-button href="#" variant="primary" @click="addMarkers">Locate</b-button>
    </b-card>
    <b-card bg-variant="gray" text-variant="black" title="Map">
      <GmapMap
        id="map"
        ref="mapRef"
        :center="{lat:latitude, lng:longitude}"
        :zoom="16"
        map-type-id="terrain"
        style="width: 100%; height: 300px;"
      
      >
        <GmapMarker
          v-for="(m, index) in markers"
          :key="index"
          :position="google && new google.maps.LatLng(m.position.lat, m.position.lng)"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
          style="color:blue"
        />
      </GmapMap>
    </b-card>
  </div>
</template>

<script>
import { gmapApi } from "~/node_modules/vue2-google-maps/src/main";
export default {
  data() {
    return {
      selected: [], // Must be an array reference!
      liveLocation: "",
      latitude: "",
      longitude: "",
      loadingMarker: "",
      types: ["Atm", "Gym","Bank","Medicines","Hospital","Health"],
      address: "",
      markers: [],
      location: ""
    };
  },
  methods: {
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
    // callback(results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results[0]);
    //     results.map(marker => {
    //       console.log(
    //         marker.geometry.location.lat(),
    //         marker.geometry.location.lng()
    //       );
    //       this.markers.push({
    //         position: {
    //           lat: marker.geometry.location.lat(),
    //           lng: marker.geometry.location.lng()
    //         }
    //       });
    //     });
    //   }
    // },
    addMarkers() {
      //   this.location = new google.maps.LatLng(this.latitude, this.longitude);
      //   const request = {
      //     location: this.location,
      //     radius: "1000",
      //     types: ["atm"],
      //     fields: ["name", "geometry"]
      //   };

      //   const infowindow = new google.maps.InfoWindow();
      //   const map = new google.maps.Map(document.getElementById("map"), {
      //     center: this.location,
      //     zoom: 15
      //   });

      //   var service = new google.maps.places.PlacesService(map);
      //   service.nearbySearch(request, this.callback);
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
                  }
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
    }
  },
  computed: {
    google: gmapApi
  },
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
</style>