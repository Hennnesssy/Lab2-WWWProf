```vue
<template>
    <div>
        <div class="row">
            <div v-for="user in users" :key="user.userId" class="col-md-4 mb-4">
                <div class="card h-100">
                    <img :src="user.avatar" class="card-img-top" alt="Аватар" @error="setFallbackImage">
                    <div class="card-body">
                        <h5 class="card-title">{{ user.first_name }} {{ user.last_name }}</h5>
                        <p class="card-text">{{ user.email }}</p>
                        <button @click="handleRemove(user.userId)" class="btn btn-danger">Видалити</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
            <button @click="handlePrevPage" class="btn btn-secondary" :disabled="currentPage === 1">Попередня</button>
            <button @click="handleNextPage" class="btn btn-secondary">Наступна</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    users: {
        type: Array,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['remove-user', 'change-page'])

const handleRemove = (userId) => {
    emit('remove-user', userId)
}

const handleNextPage = () => {
    emit('change-page', props.currentPage + 1)
}

const handlePrevPage = () => {
    emit('change-page', props.currentPage - 1)
}

const setFallbackImage = (event) => {
    event.target.src = 'https://reqres.in/img/faces/1-image.jpg' // Резервне зображення
}
</script>