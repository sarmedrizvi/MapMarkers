
  <template>
  <b-media tag="li">
    <template v-slot:aside>
      <v-avatar>
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>
    </template>
    <div class="d-flex justify-content-between">
      <div>
        <h5 class="mt-0 mb-1 colorTheme text-5">Nicole Woods</h5>
        <p
          class="mb-0 font-weight-dark text-break m-0"
          style="font-size:13px"
        >Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.</p>
      </div>
      <div  >
        <p class="m-0" style="font-size:13px">12:45PM</p>
        <div class="d-flex">
          <v-icon  color="#f5393a"  style="cursor:pointer" size="20">mdi-share-circle</v-icon>
          <v-icon   color="#f5393a"   style="cursor:pointer" size="20">mdi-heart</v-icon>
        </div>
      </div>
    </div>
    <hr />
  </b-media>
</template>
</template>

<script>
import color from '../contants/color'
export default {
  data: () => ({
   
  })
};
</script>

<style>
.colorTheme{
  color: #f5393a;
}
</style>