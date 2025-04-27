```vue
<template>
    <div class="container mt-4">
        <h1 class="mb-4">Список користувачів</h1>

        <!-- Кнопка для відкриття модального вікна -->
        <button class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#addUserModal">
            Додати користувача
        </button>

        <!-- Модальне вікно -->
        <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addUserModalLabel">Додати нового користувача</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <UserForm @add-user="addUser" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Скасувати</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Список користувачів -->
        <div v-if="isLoading" class="spinner-border" role="status">
            <span class="visually-hidden">Завантаження...</span>
        </div>
        <UserList
            v-else
            :users="users"
            :current-page="currentPage"
            @remove-user="removeUser"
            @change-page="changePage"
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserForm from '@/components/UserForm.vue'
import UserList from '@/components/UserList.vue'

const users = ref([])
const currentPage = ref(1)
const isLoading = ref(false)

const getData = async () => {
    isLoading.value = true
    try {
        const response = await fetch(`https://reqres.in/api/users?page=${currentPage.value}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`)
        }
        const json = await response.json()
        users.value = [...users.value.filter(u => u.userId), ...json.data.map(user => ({
            userId: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar
        }))]
    } catch (error) {
        console.error('Error in data retrieval:', error.message)
        if (error.message.includes('401')) {
            alert('Помилка авторизації: API вимагає авторизацію. Використовується резервний список.')
            users.value = [
                {
                    userId: 1,
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                    avatar: 'https://reqres.in/img/faces/1-image.jpg'
                }
            ]
        } else {
            alert('Не вдалося завантажити користувачів. Спробуйте пізніше.')
        }
    } finally {
        isLoading.value = false
    }
}

const addUser = (newUser) => {
    users.value.push(newUser)
    // Закрити модальне вікно
    const modal = document.querySelector('#addUserModal')
    modal.classList.remove('show')
    modal.style.display = 'none'
    document.body.classList.remove('modal-open')
    document.querySelector('.modal-backdrop')?.remove()
}

const removeUser = (userId) => {
    users.value = users.value.filter(user => user.userId !== userId)
}

const changePage = (newPage) => {
    currentPage.value = newPage
    getData()
}

onMounted(() => {
    getData()
})
</script>

<style>
/* Додаткові стилі, якщо потрібні */
</style>