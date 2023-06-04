import {defineStore} from 'pinia'
import axios from "axios";

export const useVersionStore = defineStore(
    "version",
    {
        state: () => ({
            data: {}
        }),
        getters: {
            versions(state) {
                return (modelId) => state.data[modelId]
            },
            version(state) {
                return (modelId, versionId) => state.data[modelId]?.filter(elem => elem.id === versionId).at(0)
            }
        },
        actions: {
            async loadModels(modelId, force = false) {
                if (!(modelId in this.data) || force) {
                    axios.get(`/model/${modelId}`)
                        .then(r => {
                            if (r.status === 205){
                                this.data[modelId] = []
                            }
                            else if (r.status === 200){
                                this.data[modelId] = r.data.versions
                            }
                        })
                }
            }
        }
    }
)