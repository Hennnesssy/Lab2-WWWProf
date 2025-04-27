```vue
<template>
<div class="container">
    <h1>Користувачі</h1>
    <button class="btn btn-primary mb-3" @click="openModal">Додати користувача</button>
    <UserList :users="userStore.users" />
    <UserForm 
    v-if="isModalOpen" 
    :selected-user="selectedUser"
    :mode="modalMode"
    @close="closeModal" 
    @submit="userStore.addUser" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import UserForm from '../components/UserForm.vue';
import UserList from '../components/UserList.vue';

const userStore = useUserStore();

const isModalOpen = ref(false);
const selectedUser = ref(null);
const modalMode = ref('add'); // 'add' or 'edit'

const openUserModal = (user) => {
  isModalOpen.value = true;
  selectedUser.value = user;
  modalMode.value = 'view';
};

// Закриття модального вікна
const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
  modalMode.value = 'add';
};
</script>

<style>
</style>