<template>
  <v-card class="px-3 ">
    <v-card-title>Embedded Videos</v-card-title>
    <dialog-custom :paramsId="paramsId" />

    <div class="add-video " v-bar>
      <div>
        <v-row>
          <v-col md="6" cols="12" v-for="(video, index) in videos" :key="index">
            <v-icon style="cursor:pointer" @click="deleteVideo(index)"
              >mdi-delete-empty</v-icon
            >

            <b-embed
              type="iframe"
              aspect="16by9"
              :src="video.video"
              allowfullscreen
            ></b-embed>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>

<script>
import dialogCustom from "./dialog";
import { db, auth, provider } from "../plugins/firebase";

export default {
  props: {
    paramsId: {
      type: String
    }
  },
  components: {
    dialogCustom
  },
  data() {
    return {
      isDelete: false,
      videos: []
    };
  },
  computed: {
    UserDetails() {
      return this.$store.state.SideBarData.sideBarUser;
    }
  },
  mounted() {
    db.ref(`BusinessProfile/${this.paramsId}/embededVideos`).on(
      "value",
      snap => {
        const embeded = snap.val();
        this.videos = [];
        if (embeded) {
          Object.keys(embeded).map(key => {
            this.videos = [
              {
                id: key,
                video: embeded[key]
              },
              ...this.videos
            ];
          });
          console.log(this.videos);
        }
      }
    );
  }
};
</script>

<style>
.add-video {
  height: 62.75vh;
  width: 100%;

  background: white;
  /* max-width: 50vw; */
  /* width: 52em; */
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
</style>
