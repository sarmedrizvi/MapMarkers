<template>
  <div class="conponContain">
    <div class="coupon">
      <p class="price">{{price}}</p>
      <p class="icon">&#9193;</p>
    </div>
  </div>
</template>

<script>
export default {
	props:{
		price:{
			type:String
		}
	}
  
};
</script>

<style >
.couponContain {
  /* padding: 10px; */
  width: 100%;
 
}
.coupon {
  width: 90px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  margin: 5px 0px;
  height: 50px;
   cursor: pointer;
  border-radius: 1px;
  border: 1px solid rgb(153, 29, 29);
}
.icon {
  height: 100%;
  padding: 10px;
  background-color: rgb(226, 19, 19);
  color: white;
  text-align: center;
}
.price {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;
  padding: 5px 10px;
  font-weight: bold;
}
</style>