<template>
  <div class="wrapper-content wrapper-content--fixed">
      <section>
        <div class="container">
          <p>Поиск репозиториев на github по имени пользователя</p>
          <search :value="search" placeholder="Имя пользователя github ..." @search="search = $event" />

          <button v-if="!repos" class="btn btnPrimary" @click="getRepos">Искать!</button>
          <button v-else class="btn btnPrimary" @click="getRepos">Искать снова!</button>

          <div class="repos__wrapper" v-if="repos">
            <div class="repos-item" v-for="repo in repos" :key="repo.id">
              <div class="repos-info">
                <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
                <span> {{ repo.stargazers_count }} ⭐</span>
              </div>
            </div>
          </div>
          <div class="error" v-if="error">
            <p> {{ error }} </p>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import search from '@/components/Search.vue'
import axios from 'axios'

export default {
  components: {
    search
  },
  data() {
    return {
      search: '',
      error: null,
      repos: null
    }
  },
  methods: {
    getRepos () {
      axios
        .get(`https://api.github.com/users/${this.search}/repos`)
          .then(res => {
            console.log(res)
           
 this.error = null
              this.repos = res.data
            if(res.data.length == 0) this.error = 'У данного пользователя нет публичных репозиториев'
            else{
             
            }
          
          })
          .catch(err => {
            console.log(err)
            this.repos = null
            this.error = 'Пользователь не найден'
          })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  p{
    margin-bottom: 40px;
    text-align: center;
  }
  button{
    margin-top: 40px;
  }
  .repos__wrapper {
    width: 400px;
    margin: 30px 0;
    @media screen and (max-width: 575px) { /* Минимум 512 цветов */
      width: 100%;
    }
  }
  .repos-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #dbdbdb;
  }
  .error{
    margin-top: 40px;
  }
</style>