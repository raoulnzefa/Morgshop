<template>
  <section class="container-fluid">
    <Navbar />
    <div class="title-box">
      <span class="title"><i class="bi bi-cart3 mr-2"></i>CART</span>
    </div>
    <div class="content mt-4">
      <ul class="list-group">
        <CartItem v-for="cart in carts" :key="cart.id" :cart="cart" />
      </ul>
    </div>
    <div class="button-checkout" v-show="showButton">
      <button
        class="btn-checkout btn btn-lg btn-block btn-warning"
        style="color: white; font-size: 17px"
        @click.prevent="checkout"
      >
        CHECKOUT
      </button>
    </div>
    <div v-show="!showButton" style="margin-top: 130px">
      <h3>YOUR CART IS EMPTY</h3>
      <router-link to="/product">
        <button
          href="/product"
          class="btn btn-warning"
          style="color: white; width: 270px;"
          @click="changeTitle"
        >
          Shop Now
        </button>
      </router-link>
    </div>
  </section>
</template>

<script>
import Navbar from '@/components/Navbar'
import CartItem from '@/components/CartItem'
import { mapState } from 'vuex'

export default {
  name: 'Cart',
  components: {
    Navbar,
    CartItem
  },
  computed: {
    ...mapState(['carts', 'showButton'])
  },
  methods: {
    checkout () {
      this.$store
        .dispatch('checkout')
        .then(response => {
          this.$store.dispatch('fetchCarts')
          this.$toastr.success('', `${response.data.message}!`)
        })
        .catch(err => {
          const errorMessage = err.response.data.message
          this.$toastr.error('', `${errorMessage}!`)
        })
    },
    changeTitle () {
      this.$store.commit('SET_TITLE', 'ALL PRODUCT')
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style scoped>
.title-box {
  display: flex;
  justify-content: center;
  margin: 30px 30px 0;
}
.title {
  font-size: 35px;
  font-weight: bold;
  line-height: 1.27778;
  color: #ffb703;
}
.content {
  display: flex;
  justify-content: center;
}
.button-checkout {
  display: flex;
  justify-content: center;
}
.btn-checkout {
  margin-top: 20px;
  width: 800px;
}
</style>
