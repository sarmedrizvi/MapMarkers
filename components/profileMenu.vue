<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
        <v-btn color="#f5393a" icon dark v-on="on">
          <v-icon>mdi-account-details</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="BusinessDetail.picture" alt="Dp" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ BusinessDetail.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                BusinessDetail.types
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-action>
              <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <div v-if="UserDetail.displayName">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="UserDetail.photoURL" alt="DP" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{
                  UserDetail.displayName
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  UserDetail.email
                }}</v-list-item-subtitle>
                <nuxt-link
                  :to="`/user/${BusinessDetail.id}`"
                  tag="v-btn"
                  style="background-color:#f5393a;color:white;width:50px;"
                >
                  <v-icon>mdi-pencil-outline</v-icon> Profile
                </nuxt-link>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="menu = false">Cancel</v-btn>
          </v-card-actions>
        </div>
        <div v-else class="d-flex justify-content-center">
          <v-btn @click="facebookAuth">
            Login<v-icon>mdi-facebook</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { db, auth, provider } from "../plugins/firebase";
import { mapActions } from "vuex";

export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true
  }),
  methods: {
    ...mapActions({
      AddUser: "SideBarData/AddUser",
      sideBar: "SideBarData/AddSideBar"
    }),

    facebookAuth() {
      auth
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          // fetch(result.user.photoURL)
          //   .then(res => res.blob())
          //   .then(res => {
          //     const imageUrl = URL.createObjectURL(res);
          //     user = { ...user, photoURL: imageUrl };
          //   });
          console.log(user)
          const {
            uid,
            displayName,
            photoURL,
            phoneNumber,
           
            emailVerified,
            email
          } = user;
          this.AddUser({
            uid,
            displayName,
            email,
            phoneNumber,
            photoURL,
            emailVerified
          });
          db.ref(`BusinessProfile/${this.BusinessDetail.id}`).set({
            ...this.$store.state.SideBarData.sideBarUser
          });

          // console.log(this.$store.state.SideBarData.sideBarUser, "No");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(error);
          this.$bvToast.show("error-toast");
        });
    }
  },
  computed: {
    BusinessDetail() {
      return this.$store.state.SideBarData.sideBarData;
    },
    UserDetail() {
      return this.$store.state.SideBarData.sideBarUser;
    }
  },
  created() {}
};
</script>
