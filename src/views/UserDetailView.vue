<!-- views/UserDetail.vue -->
<template>
  <div v-if="loading">Carregando...</div>
  <div v-else-if="user" class="users-page user-detail">
    <div class="header">
      <h1>#{{ user.data.id }}</h1>
      <router-link to="/" class="btn btn-secondary">Voltar</router-link>
    </div>
    <div class="titulo">
      <img :src="user.data.avatar" :alt="user.data.first_name" class="user-avatar">
      <TituloTexto titulo="Primeiro nome" :texto="user.data.first_name" />
      <TituloTexto titulo="Último nome" :texto="user.data.last_name" />
    </div>
    <TituloTexto titulo="Endereço de e-mail" :texto="user.data.email" />
    <TituloTexto titulo="Link do avatar:" :texto="user.data.avatar" />
    <TituloTexto titulo="Link de suporte:" :texto="user.support.url" />
    <TituloTexto titulo="Descrição do usuário:" :texto="user.support.text" />
  </div>
  <div v-else>
    Usuário não encontrado
  </div>
</template>

<script>
import '@/styles/views/UserDetailView.css'
import axios from 'axios';
import TituloTexto from '@/components/utils/TituloTexto.vue';

export default {
  components: {
    TituloTexto
  },
  data() {
      return {
          user: null,
          loading: true
      }
  },
  async created() {
      try {
          const response = await axios.get(`https://reqres.in/api/users/${this.$route.params.id}`);
        console.log(response.data.data);
          this.user = response.data;
      } catch (error) {
          console.error(error);
      } finally {
          this.loading = false;
      }
  }
};
</script>
