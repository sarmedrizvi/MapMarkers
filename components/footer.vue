<template>
  <div class="customFooter">
    <v-card style="background-color:#f5393a">
      <div class="d-flex justify-content-between W-100">
        <v-card-text style="color:white;margin:auto"
          ><v-icon size="18" color="#ffff">mdi-copyright</v-icon> 2020, AvidHaus
          Ltd. All rights reserved</v-card-text
        >
        <v-card-text class="d-flex justify-content-end"
          ><v-icon color="#ffff">mdi-facebook</v-icon
          ><v-icon color="#ffff">mdi-twitter</v-icon
          ><v-icon color="#ffff">mdi-google</v-icon>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
.customFooter {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
