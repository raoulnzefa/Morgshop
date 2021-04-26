<template>
  <section id="login-page">
    <div class="outter-container">
      <div class="inner-container">
        <div class="box">
          <h1>Log In to</h1>
          <h1 class="title">Morgshop</h1>
          <form @submit.prevent="login">
            <input
              type="text"
              placeholder="Email"
              required="required"
              v-model="email"
            />
            <input
              type="password"
              placeholder="Password"
              required="required"
              v-model="password"
            />
            <button>LOG IN</button>
          </form>
          <p style="color: #666">
            Not a member?
            <span
              ><router-link to="/signup"
                ><a
                  href="/signup"
                  style="text-decoration: none; color: #ffb703;"
                  id="to-signup"
                  >Sign Up</a
                ></router-link
              ></span
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = { email: this.email, password: this.password }
      this.$store
        .dispatch('login', payload)
        .then(response => {
          this.$store.commit('SET_CURRENT_USER', response.data.email)
          const accessToken = response.data.access_token
          localStorage.setItem('access_token', accessToken)
          this.$toastr.success(
            'You have successfully Log In!',
            'Welcome to Morghsop!'
          )
          this.$router.push('/')
        })
        .catch(err => {
          const errorMessage = err.response.data.message
          this.$toastr.error(`${errorMessage}!`, 'Failed to Log In')
        })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style></style>
