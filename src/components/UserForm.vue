<template>
<div class="modal fade show" style="display: block;" tabindex="-1" @click.self="emit('close')">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Додати користувача</h5>
          <button type="button" class="btn-close" @click="emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="firstName" class="form-label">Ім'я</label>
              <input
                v-model="form.firstName"
                type="text"
                class="form-control"
                id="firstName"
                required
              />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Прізвище</label>
              <input
                v-model="form.lastName"
                type="text"
                class="form-control"
                id="lastName"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Емейл</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                id="email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="photo" class="form-label">Фото (URL)</label>
              <input
                v-model="form.photo"
                type="url"
                class="form-control"
                id="photo"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <button type="submit" class="btn btn-primary">Додати</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" @click="emit('close')"></div>
</template>

<script setup>
import { ref } from 'vue';

// Реактивна форма
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  photo: '',
});

// Визначаємо події
const emit = defineEmits(['close', 'submit']);

// Обробка відправлення форми
const submitForm = () => {
  emit('submit', { ...form.value });
  form.value = { firstName: '', lastName: '', email: '', photo: '' };
}
</script>