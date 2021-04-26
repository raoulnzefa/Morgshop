import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from '@/api/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: '',
    products: [],
    carts: [],
    purchasedItems: [],
    title: '',
    showButton: false
  },
  mutations: {
    SET_CURRENT_USER (state, payload) {
      state.currentUser = payload
    },
    SET_LIST_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_LIST_CART (state, payload) {
      state.carts = payload
    },
    SET_TITLE (state, payload) {
      state.title = payload
    },
    SET_LIST_TRANSACTION_HISTORY (state, payload) {
      state.purchasedItems = payload
    },
    SET_SHOW_BUTTON (state, payload) {
      state.showButton = payload
    }
  },
  actions: {
    register (_, payload) {
      const { email, password } = payload
      return axios({
        url: '/register',
        method: 'post',
        data: {
          email,
          password
        }
      })
    },
    login (_, payload) {
      const { email, password } = payload
      return axios({
        url: '/login',
        method: 'post',
        data: {
          email,
          password
        }
      })
    },
    logout () {
      localStorage.removeItem('access_token')
      router.push('/login')
    },
    fetchProducts (context) {
      axios({
        url: '/products',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(products => {
          const listProducts = products.data
          if (localStorage.category) {
            const categoryProducts = []
            listProducts.forEach(el => {
              if (el.category.toLowerCase() === localStorage.category) {
                categoryProducts.push(el)
              }
            })
            context.commit('SET_LIST_PRODUCT', categoryProducts)
            localStorage.removeItem('category')
          } else context.commit('SET_LIST_PRODUCT', listProducts)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCarts (context) {
      axios({
        url: '/carts',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(carts => {
          const listCarts = carts.data
          if (listCarts.length) {
            context.commit('SET_SHOW_BUTTON', true)
          } else {
            context.commit('SET_SHOW_BUTTON', false)
          }
          context.commit('SET_LIST_CART', listCarts)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProductToCart (_, ProductId) {
      return axios({
        url: `/carts/${ProductId}`,
        method: 'post',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    deleteProductFromCart (_, id) {
      return axios({
        url: `/carts/${id}`,
        method: 'delete',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    dropProductFromCart (_, id) {
      return axios({
        url: `/carts/${id}`,
        method: 'patch',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    checkout () {
      return axios({
        url: '/checkout',
        method: 'patch',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    fetchTransactionHistory (context) {
      axios({
        url: '/transaction/history',
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const listTransactionHistory = data
          context.commit(
            'SET_LIST_TRANSACTION_HISTORY',
            listTransactionHistory
          )
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
