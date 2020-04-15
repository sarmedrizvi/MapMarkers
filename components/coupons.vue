<template>
  <div class="conponContain">
    <div class="coupon">
      <p class="price">{{type}}</p>
      <p class="icon">{{price}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: String
    },
    type: {
      type: String
    }
  }
};
</script>

<style >
.couponContain {
  /* padding: 10px; */
  /* width: 100%; */
}
.coupon {
  width: 125px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  margin: 5px 0px;
  height: 50px;
  cursor: pointer;
  border-radius: 1px;
  border: 1px solid #f5393a;
}
.icon {
  height: 100%;
  padding: 10px 5px;
  width: 40%;
  background-color: #f5393a;
  color: white;
  text-align: center;
}
.price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 5px 5px;
  font-size: 12px;
  font-weight: bold;
}
</style>