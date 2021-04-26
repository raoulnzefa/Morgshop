<template>
  <section class="container-fluid">
    <Navbar />
    <div class="title-box">
      <span class="title"
        ><i class="bi bi-cart-check mr-2"></i>TRANSACTION HISTORY</span
      >
    </div>
    <div class="content mt-4">
      <ul class="list-group">
        <PurchasedItem
          v-for="purchasedItem in purchasedItems"
          :key="purchasedItem.id"
          :purchasedItem="purchasedItem"
        />
      </ul>
    </div>
  </section>
</template>

<script>
import Navbar from '@/components/Navbar'
import PurchasedItem from '@/components/PurchasedItem'
import { mapState } from 'vuex'

export default {
  name: 'TransactionHistory',
  components: {
    Navbar,
    PurchasedItem
  },
  computed: {
    ...mapState(['purchasedItems'])
  },
  mounted () {
    this.$store.dispatch('fetchTransactionHistory')
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
</style>
