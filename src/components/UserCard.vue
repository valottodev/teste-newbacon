<template>
  <div class="user-card">
    <div class="container">
      <div class="col-20">
        <img :src="user.avatar" :alt="`Foto de ${user.first_name}`" class="user-avatar">
      </div>
      <div class="col-50 card-text">
        <p>#{{ user.id }}</p>
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        <p>{{ user.email }}</p>
      </div>
      <div class="col-20 card-icons">
        <span @click.stop="$emit('edit-user', user)"><img src="@/assets/edit.svg" alt="Editar usuário"
            title="Editar usuário"></span>
        <span @click.stop="confirmDelete" class="delete-btn"><img src="@/assets/bin.svg" alt="Deletar usuário" title="
            Deletar usuário"></span>
        <router-link :to="'/user/' + user.id"><img src="@/assets/eye.svg" alt="Visualizar detalhes"
            title="Visualizar detalhes"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import '@/styles/components/UserCard.css';
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    confirmDelete() {
      if (confirm(`Tem certeza que deseja deletar ${this.user.first_name}?`)) {
        this.$emit('delete-user', this.user.id);
      }
    }
  }
};
</script>
<style scoped>
</style>
