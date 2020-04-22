<template>
  <div>
    <div
      class="categories shadow-sm p-3 bg-white rounded d-flex justify-content-between"
    >
      <div
        class="px-2 d-flex text-center category"
        v-for="(category, i) in categories"
        :key="i"
        @click="ReturnSelected(category.name)"
      >
        <v-icon>mdi-{{ category.icon }}</v-icon>
        <p class="text-muted px-1" style="margin:auto">
          {{ category.name.toUpperCase() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedCategories: {
      type: Array
    }
  },
  data() {
    return {
      categories: [
        {
          name: "restaurant",
          icon: "warehouse"
        },
        {
          name: "gym",
          icon: "dumbbell"
        },
        {
          name: "hospital",
          icon: "hospital-building"
        },
        {
          name: "park",
          icon: "beach"
        },
        {
          name: "school",
          icon: "school"
        }
      ]
    };
  },
  methods: {
    ReturnSelected(value) {
      this.$emit("SelectedChanged", value);
    }
  }
};
</script>

<style>
@media screen and (max-width: 500px) {
  .categories {
    overflow-x: scroll;
  }
}
.categories {
}
.category {
  cursor: pointer;
}
</style>
