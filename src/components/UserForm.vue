<template>
  <div class="form-user">
    <h2>{{ isEditing ? 'Editar Usuário' : 'Novo Usuário' }}</h2>
    <label for="nome">Nome do usuário</label>
    <input v-model="localData.fullName" placeholder="Nome Completo" class="form-input" name="nome">
    <label for="job">Função do usuário</label>
    <select v-model="localData.job" class="form-input" name="job">
      <option :value="null" disabled selected>Selecione a função</option>
      <option value="Desenvolvedor">Desenvolvedor</option>
      <option value="Gerente de Projetos">Gerente de Projetos</option>
      <option value="Tech Lead">Tech Lead</option>
      <option value="UI/UX Designer">UI/UX Designer</option>
    </select>
    <button @click="$emit('submit')" :disabled="addingUser">{{ addingUser ?
      'Salvando...' : 'Salvar dados do usuário' }}</button>
    <button @click="$emit('cancel')">Cancelar</button>
  </div>
</template>
<script>
export default {
  props: {
    isEditing: Boolean,
    formData: Object
  },
  data() {
    return {
      localData: {
        fullName: this.formData.fullName,
        job: this.formData.job
      }
    }
  }
}
</script>
