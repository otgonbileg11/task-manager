<template>
  <div>
    <div id="nav">
      <router-link id="home" to="/">Task Manager</router-link>
      <div class="link-container">
      <router-link v-if="!isLoggedIn" class="li" to="/signup">Sign up</router-link>
      <router-link v-if="!isLoggedIn" class="li" to="/login">Log In</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
      <router-link v-if="isLoggedIn" class="li" to="/">Manage Task</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState({isLoggedIn: state => state.isLoggedIn})
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.$store.dispatch('setUserStatus', false)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
button {
  width: 120px
}
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.link-container {
  display:flex;
  gap: 20px;
  margin-right: 40px;
}

.link-container * {
  text-decoration: none;
  color: steelblue;
  padding: 10px;
  text-align: center;
  width: 150px;
}

.link-container .li.router-link-active {
  background-color: salmon;
  text-shadow: none;
  color: #fff;
}

#home {
  width:auto;
  text-decoration: none;
  border: none;
  box-shadow: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 18px;
}
</style>