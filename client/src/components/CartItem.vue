<template>
  <li class="list-group-item">
    <button
      type="button"
      class="close"
      data-dismiss="modal"
      aria-label="Close"
      @click.prevent="deleteProductFromCart(cart.id)"
    >
      <span aria-hidden="true" style="color: black">&times;</span>
    </button>
    <div class="media">
      <img
        width="100px"
        :src="cart.Product.image_url"
        class="mr-3"
        :alt="cart.Product.name"
      />
      <div class="media-body mt-3">
        <h5 class="mt-0">{{ cart.Product.name }}</h5>
        <button
          class="btn-qty btn btn-sm btn-secondary"
          @click.prevent="dropProductFromCart(cart.id)"
        >
          -
        </button>
        <span style="font-weight: bold; margin: 0 10px"
          >x {{ cart.quantity }}</span
        >
        <button
          class="btn-qty btn btn-sm btn-secondary"
          @click.prevent="addProductToCart(cart.Product.id)"
        >
          +
        </button>
      </div>
      <span style="margin-top: 10px"
        >PRODUCT TOTAL
        <hr />
        IDR<span style="font-weight: bold;">{{
          getProductPrice(cart.Product.price, cart.quantity)
        }}</span></span
      >
    </div>
  </li>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['cart'],
  methods: {
    deleteProductFromCart (id) {
      this.$store
        .dispatch('deleteProductFromCart', id)
        .then(() => {
          this.$toastr.success('', 'Delete product from your cart!')
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          const errorMessage = err.response.data.message
          this.$toastr.error('', `${errorMessage}!`)
        })
    },
    addProductToCart (ProductId) {
      this.$store
        .dispatch('addProductToCart', ProductId)
        .then(() => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          const errorMessage = err.response.data.message
          this.$toastr.error('', `${errorMessage}!`)
        })
    },
    dropProductFromCart (id) {
      this.$store
        .dispatch('dropProductFromCart', id)
        .then(response => {
          if (response.data.message) {
            this.$toastr.success('', 'Delete product from your cart!')
            this.$store.dispatch('fetchCarts')
          }
          this.$store.dispatch('fetchCarts')
        })
        .catch(err => {
          const errorMessage = err.response.data.message
          this.$toastr.error('', `${errorMessage}!`)
        })
    },
    getProductPrice (price, quantity) {
      const totalPrice = price * quantity
      return this.convertToRupiah(totalPrice)
    },
    convertToRupiah (angka) {
      let rupiah = ''
      const angkarev = angka
        .toString()
        .split('')
        .reverse()
        .join('')
      for (let i = 0; i < angkarev.length; i++) {
        if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.'
      }
      return rupiah
        .split('', rupiah.length - 1)
        .reverse()
        .join('')
    }
  }
}
</script>

<style scoped>
.btn-qty {
  border-radius: 50%;
  width: 30px;
}
.list-group-item {
  justify-content: center;
}
.media {
  width: 90%;
}
.media-body {
  text-align: center;
  width: 500px;
}
</style>
