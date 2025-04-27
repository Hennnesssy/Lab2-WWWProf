```vue
<template>
    <div v-if="isOpen" class="container mt-4">
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="firstName" class="form-label">Firts Name</label>
                <input v-model="firstName" type="text" class="form-control" id="firstName" placeholder="Firts Name" required>
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Last Name" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" required>
            </div>
            <div class="mb-3">
                <label for="avatar" class="form-label">Avatar's Url</label>
                <input v-model="avatar" type="url" class="form-control" id="avatar" placeholder="Avatar's Url" required>
            </div>
            <button type="submit" class="btn btn-primary">Add users</button>
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-user'])

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const avatar = ref('')

const handleSubmit = () => {
    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        alert('Введіть правильний email')
        return
    }

    // Валідація URL аватара
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i
    if (!urlRegex.test(avatar.value)) {
        alert('Введіть правильний URL зображення (png, jpg, jpeg, gif, svg)')
        return
    }

    const newUser = {
        userId: Date.now(),
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        avatar: avatar.value
    }
    emit('add-user', newUser)

    // Очистити форму
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    avatar.value = ''
}
</script>