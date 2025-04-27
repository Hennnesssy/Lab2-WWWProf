import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {

    const users = ref(JSON.parse(localStorage.getItem("users")) || []);

    const addUser = (user) => {
        users.value.push(user);
        localStorage.setItem("users", JSON.stringify(users.value));
    };

    return { 
        users,
        addUser,
    };
});