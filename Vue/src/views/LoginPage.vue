<template>
    <div class="container">
      <div class="card">
        <form id="login" @submit.prevent="login">
          <h2 class="title">Login</h2>
          <div class="input-wrapper">
            <input type="email" v-model="email" required placeholder="E-mail" />
            <div class="email error">{{ emailError }}</div>
          </div>
          <div class="input-wrapper">
            <input type="password" v-model="password" required placeholder="Password" />
            <div class="password error">{{ passwordError }}</div>
          </div>
          <button type="submit" class="button">Login</button>
        </form>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'LoginPage',

    data() {
      return {
        email: "",
        password: "",
        emailError: "",
        passwordError: ""
      };
    },
    methods: {
      async login() {
        const email = this.email;
        const password = this.password;
        this.emailError = "";
        this.passwordError = "";

        await fetch('http://localhost:3000/login',{
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
            'Content-Type': 'application/json',
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
  };
</script>
<style scoped>
  #login {
    margin: 40px auto;
  }
  .error {
    color: salmon;
    margin: 10px;
  }
</style>