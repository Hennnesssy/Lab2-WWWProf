
<template>
<div class="row">
    <div v-for="(user, index) in users" :key="index" class="col-md-4 mb-3">
      <div class="card">
        <img
          v-if="user.photo"
          :src="user.photo"
          class="card-img-top"
          alt="Фото користувача"
          style="height: 200px; object-fit: cover;"
        />
        <div class="card-body">
          <h5 class="card-title">{{ user.firstName }} {{ user.lastName }}</h5>
          <p class="card-text">Емейл: {{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
});
</script>