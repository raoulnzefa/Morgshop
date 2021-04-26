<template>
  <section id="signup-page">
    <div class="outter-container">
      <div class="inner-container">
        <div class="box">
          <h1>Create an Account</h1>
          <h1 class="title">Morgshop</h1>
          <form @submit.prevent="register">
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
            <button>SIGN UP</button>
          </form>
          <div>
            <p style="font-size: 12px; color: #999">
              With creating an account, I agree to let Morgshop<br />process my
              personal data in order to manage my <br />personal account, in
              accordance with Morgshop's
            </p>
            <p style="color: #666">
              Have an account?
              <span
                ><router-link to="/login"
                  ><a
                    href="/login"
                    style="text-decoration: none; color: #ffb703;"
                    >Log In</a
                  ></router-link
                ></span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = { email: this.email, password: this.password }
      this.$store
        .dispatch('register', payload)
        .then(() => {
          this.$router.push('/login')
          this.$toastr.success('You have successfully Sign Up!', 'Sign Up')
        })
        .catch(err => {
          const errorMessage = err.response.data.message.join(', ')
          this.$toastr.error(`${errorMessage}!`, 'Failed to Sign Up')
        })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style></style>
