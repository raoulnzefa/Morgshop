<template>
  <div class="col-md-3">
    <div class="card" style="width: 18rem; margin: 25px 25px">
      <span
        style="position: absolute; right: 0; top: 5px"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Add to your cart"
        @click.prevent="addProductToCart(product.id)"
        ><i
          class="bi bi-cart-plus"
          style="margin-right: 15px; font-size: 30px"
        ></i
      ></span>
      <img
        :src="product.image_url"
        class="card-img-top"
        height="375"
        style="object-fit: cover;"
      />
      <div class="card-body">
        <h5 class="card-title product-title">{{ product.name }}</h5>
        <p class="card-text">
          IDR<span style="font-weight: bold">{{ product.price }}</span
          ><br />
          <span style="color: black">Stock : {{ product.stock }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data () {
    return {
      show: false
    }
  },
  props: ['product'],
  methods: {
    addProductToCart (ProductId) {
      this.$store
        .dispatch('addProductToCart', ProductId)
        .then(() => {
          this.$toastr.success('', 'Add product to your cart!')
        })
        .catch(err => {
          const errorMessage = err.response.data.message
          this.$toastr.error('', `${errorMessage}!`)
        })
    }
  }
}
</script>

<style scoped>
.card {
  border: none;
}
</style>
