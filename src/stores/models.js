import {defineStore} from 'pinia'
import axios from "axios";

export const useModelStore = defineStore(
    "model",
    {
        state: () => ({
            data: undefined
        }),
        getters: {
            models(state) {
                return state.data
            },
            model(state) {
                return (modelId) => state.data?.filter(elem => elem.id === modelId)[0]
            }
        },
        actions: {
            async loadModels(force = false) {
                if (!this.data || force) {
                    axios.get("/models")
                        .then(r => r.data)
                        .then(r => this.data = r)
                        .then(r => console.log(this.models))
                }
            }
        }
    }
)