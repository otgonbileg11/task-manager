<template>
    <div class="container">
      <div class="card">
        <form id="signup" @submit.prevent="signup">
          <h2 class="title">Sign Up</h2>
          <div class="input-wrapper">
            <input type="email" v-model="email" required placeholder="E-mail" />
            <div class="email error">{{ emailError }}</div>
          </div>
          <div class="input-wrapper">
            <input type="password" v-model="password" required placeholder="Password" />
            <div class="password error">{{ passwordError }}</div>
          </div>
          <button type="submit" class="button">Sign up</button>
        </form>
      </div>
    </div>
</template>
  
<script>
  // import axios from 'axios';
  export default {
    name: 'SignUp',
    data() {
      return {
        email: "",
        password: "",
        emailError: "",
        passwordError: ""
      };
    },
    methods: {
      async signup() {
        const email = this.email;
        const password = this.password;
        this.emailError = "";
        this.passwordError = "";

        await fetch('http://localhost:3000/signup',{
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
            'Content-Type': 'application/json'
          },
            credentials: 'include',
        })
        .then(result => result.json())
        .then(data => { 
          console.log(data);
          if (data.errors) {
            this.emailError = data.errors.email;
            this.passwordError = data.errors.password;
          }
          if (data.user) {
            localStorage.setItem('jwt', data.token);
            this.$store.dispatch('setUserStatus', true)
            this.$router.push('/')
          }
        })
        .catch((err) => console.log(err))
        }
      },
    }
</script>
<style scoped>
  #signup {
    margin: 40px auto;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .error {
    color: salmon;
  }
</style>