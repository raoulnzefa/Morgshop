<template>
  <li class="list-group-item">
    <div class="media">
      <img
        width="100px"
        :src="purchasedItem.Product.image_url"
        class="mr-3"
        :alt="purchasedItem.Product.name"
      />
      <div class="media-body mt-3">
        <h5 class="mt-0">{{ purchasedItem.Product.name }}</h5>
        <span style="margin: 0 15px">x {{ purchasedItem.quantity }}</span>
      </div>
      <br />
      <span style="margin-top: 10px;"
        >TOTAL PRICE PURCHASED
        <hr />
        IDR<span style="font-weight: bold;">{{
          getTotalPrice(purchasedItem.Product.price, purchasedItem.quantity)
        }}</span></span
      >
    </div>
  </li>
</template>

<script>
export default {
  name: 'PurchasedItem',
  props: ['purchasedItem'],
  methods: {
    getTotalPrice (price, quantity) {
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
