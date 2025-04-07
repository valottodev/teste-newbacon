<template>
  <div class="user-list">
    <div v-if="loading">Aguarde...</div>
    <div v-else>
      <UserCard v-for="user in users" :key="user.id" :user="user"
      @edit-user="$emit('edit-user', $event)"
      @delete-user="$emit('delete-user', $event)" />
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard.vue';

export default {
  components: { UserCard },
  props: {
    users: Array,
    loading: Boolean
  }
}
</script>
