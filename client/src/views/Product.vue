<template>
  <div class="container-fluid">
    <Navbar />
    <div class="title-category-box">
      <span class="title-category">{{ title }}</span>
    </div>
    <div class="row mt-2">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import { mapState } from 'vuex'

export default {
  name: 'Product',
  components: {
    Navbar,
    ProductCard
  },
  computed: {
    ...mapState(['products', 'title'])
  },
  mounted () {
    if (!this.$route.params.category) {
      this.$store.dispatch('fetchProducts')
    }
  }
}
</script>

<style>
.title-category-box {
  margin: 30px 30px 0;
}
.title-category {
  font-size: 35px;
  font-weight: bold;
  line-height: 1.27778;
  color: #ffb703;
}
</style>
