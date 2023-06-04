import {defineStore} from 'pinia'

export const useUserStore = defineStore(
    "user",
    {
        state: () => ({
            isAuthorized: false
        }),
        getters: {
            status(state) {
                return state.isAuthorized
            }
        },
        actions: {
            login() {
                this.isAuthorized = true;
            },
            logout() {
                this.isAuthorized = false;
            }
        }
    }
)