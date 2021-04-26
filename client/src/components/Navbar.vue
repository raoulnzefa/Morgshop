<template>
  <nav class="navbar navbar-expand-lg shadow">
    <div class="nav-left">
      <router-link to="/" class="logo">
        <img src="@/assets/images/morgyFix.png" alt="logo" />
      </router-link>
    </div>
    <div class="nav-center navbar-collapse">
      <ul class="navbar-nav">
        <li>
          <router-link to="/"><i class="bi bi-house mr-2"></i>HOME</router-link>
        </li>
        <li>
          <a href="/product" @click.prevent="toCategory()">ALL PRODUCT</a>
        </li>
        <li>
          <a href="/product/tops" @click.prevent="toCategory('tops')">TOPS</a>
        </li>
        <li>
          <a href="/product/bottoms" @click.prevent="toCategory('bottoms')"
            >BOTTOMS</a
          >
        </li>
        <li>
          <a href="/product/shoes" @click.prevent="toCategory('shoes')"
            >SHOES</a
          >
        </li>
      </ul>
    </div>
    <div class="nav-right">
      <ul class="navbar-nav">
        <li class="account">
          <router-link to="/product"
            ><i class="bi bi-caret-down" style="margin-right: 10px;"></i>Hello,
            {{ currentUser }}</router-link
          >
          <div class="sub-menu">
            <ul>
              <li>
                <router-link to="/cart"
                  ><i class="bi bi-cart3 mr-2"></i>Cart</router-link
                >
              </li>
              <li>
                <router-link to="/transaction/history"
                  ><i class="bi bi-cart-check mr-2"></i>Transaction
                  History</router-link
                >
              </li>
              <li>
                <a href="/logout" @click.prevent="logout">
                  <i class="bi bi-box-arrow-right mr-2"></i>
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$toastr.success('You have successfully Log Out!', 'Log Out')
    },
    toCategory (category) {
      if (category) {
        this.$router.push(`/product/${category}`)
        localStorage.setItem('category', category)
        this.$store.commit('SET_TITLE', category.toUpperCase())
      } else {
        this.$store.commit('SET_TITLE', 'ALL PRODUCT')
        this.$router.push('/product')
      }
      this.$store.dispatch('fetchProducts')
    }
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style></style>
