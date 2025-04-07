<template>
  <div class="users-page">
    <div class="header">
      <h1>Usuários</h1>
      <button v-if="!showUserForm" @click="toggleAddUser" class="btn btn-primary">Novo Usuário</button>
      <button v-else class="btn btn-secondary" @click="resetForm">Cancelar</button>
    </div>

    <div v-if="showUserForm" class="form-user">
      <label for="nome">Nome do usuário</label>
      <input v-model="formData.fullName" placeholder="Nome Completo" class="form-input montserrat-regular" name="nome">
      <label for="job">Função do usuário</label>
      <select v-model="formData.job" class="form-input montserrat-regular" name="job">
        <option :value="null" disabled selected>Selecione a função</option>
        <option value="Desenvolvedor">Desenvolvedor</option>
        <option value="Gerente de Projetos">Gerente de Projetos</option>
        <option value="Tech Lead">Tech Lead</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
      </select>
      <button @click="toggleMethod" class="btn btn-primary" :disabled="addingUser">{{ addingUser ?
        'Salvando...' : 'Salvar dados do usuário' }}</button>
    </div>
    <UserList :users="users" :loading="loading" @delete-user="handleDeleteUser" @edit-user="editUser" />
  </div>
</template>

<script>
import '@/styles/views/UsersView.css'
import '@/styles/components/UserForm.css'
import axios from 'axios';
import UserList from '@/components/UserList.vue';

export default {
  name: 'UsersView',
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
      loading: true,
      isEditing: false,
      addingUser: false,
      showUserForm: false,
      currentUserId: null,
      formData: {
        fullName: '',
        job: null
      },
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    // REGRAS DE NEGÓCIO

    // Popular Lista
    async fetchUsers() {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=1');
        this.users = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
      } finally {
        this.loading = false;
      }
    },

    // Submit formulário
    async handleSubmit() {

      // Validações
      if (!this.validateUserForm()) return;

      try {
        this.addingUser = true;

        // Separa nome e sobrenome e retorna um objeto no mesmo formato de formData
        const newUser = this.prepareUserData();

        // Simula POST (API fake)
        const response = await axios.post('https://reqres.in/api/users', newUser);
        console.log('Usuário criado:', response.data);

        // Adiciona localmente
        this.users.unshift({
          id: this.users.length + 1,
          ...newUser,
          avatar: `https://reqres.in/img/faces/${this.users.length + 1}-image.jpg`
        });

        // Limpa campos
        this.formData = {
          first_name: '',
          last_name: '',
          job: null
        };
        this.showUserForm = false
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
      } finally {
        this.addingUser = false;
      }
    },

    // Editar Usuário
    async updateUser() {
      if (!this.validateUserForm()) return;
      try {
        this.addingUser = true;

        // Prepara os dados atualizados
        const updatedUser = this.prepareUserData();

        // Encontra o índice do usuário sendo editado
        const userIndex = this.users.findIndex(user => user.id === this.currentUserId);

        if (userIndex === -1) {
          throw new Error('Usuário não encontrado');
        }

        // Simula PUT na API (atualização)
        const response = await axios.put(`https://reqres.in/api/users/${this.currentUserId}`, updatedUser);
        console.log('Usuário atualizado:', response.data);

        // Atualiza localmente mantendo o ID e avatar original
        this.users.splice(userIndex, 1, {
          ...this.users[userIndex],    // Mantém dados existentes (id, avatar)
          ...updatedUser               // Sobrescreve com os dados atualizados
        });

        // Limpa o formulário
        this.resetForm();
      } catch (error) {
        console.error('Erro ao editar:', error);
        alert('Erro ao atualizar usuário');
      } finally {
        this.addingUser = false;
      }
    },

    // Deletar usuário
    async handleDeleteUser(userId) {
      try {
        // Simulação de chamada à API
        await axios.delete(`https://reqres.in/api/users/${userId}`);

        // Remove localmente
        this.users = this.users.filter(user => user.id !== userId);

        console.log(`Usuário ${userId} deletado com sucesso!`);
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert('Não foi possível deletar o usuário');
      }
    },

    //HELPERS

    // toggle botão editar ou adicionar novo
    toggleMethod() {
      return this.isEditing ? this.updateUser() : this.handleSubmit();
    },
    // toggle formulário adicionar
    toggleAddUser() {
      this.showUserForm = !this.showUserForm
    },

    editUser(user) {
      this.currentUserId = user.id;
      this.formData = {
        fullName: `${user.first_name} ${user.last_name}`,
        job: user.job || null
      };
      this.showUserForm = true;
      this.isEditing = true;
    },

    validateUserForm() {

      if (!this.formData.fullName?.trim()) {
        alert('Nome completo é obrigatório');
        return false;
      }

      if (this.formData.fullName.trim().split(' ').length < 2) {
        alert('Digite nome e sobrenome');
        return false;
      }

      if (!this.formData.job) {
        alert('Selecione uma função para o usuário');
        return false;
      }


      return true;
    },

    prepareUserData() {
      const [first_name, ...lastParts] = this.formData.fullName.trim().split(' ');
      return {
        first_name,
        last_name: lastParts.join(' '),
        job: this.formData.job
      };
    },

    resetForm() {
      this.isEditing = false;
      this.currentUserId = null;
      this.formData = { fullName: '', job: null };
      this.showUserForm = false;
    },

  }
};
</script>
<style scoped>
</style>
