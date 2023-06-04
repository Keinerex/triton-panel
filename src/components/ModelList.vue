<template>
  <section class="models">

    <model-card
        v-for="model in useModel.models"
        :modelId="model.id"
        :key="model.id"
        :is-loaded="model.triton_loaded"
        :name="model.name"
        @deleteModel="updateModels"
    />
    <FileUploadDirectory chooseLabel="Новая модель" :with-credentials="withCredentials"
                         customUpload @select="uploader"
                         :url="upload_url" name="file[]" mode="basic" :auto="true"/>
  </section>
</template>

<script>
import ModelCard from "@/components/ModelCard.vue";
import {useModelStore} from "@/stores/models";
import FileUploadDirectory from "@/components/FileUploadDirectory.vue";
import axios from "axios";

export default {
  components: {FileUploadDirectory, ModelCard},
  data() {
    return {
      useModel: useModelStore(),
    }
  },
  mounted() {
    this.useModel.loadModels()
  },
  computed: {
    upload_url() {
      return axios.defaults.baseURL + "/model"
    },
    withCredentials() {
      return axios.defaults.withCredentials
    }
  },
  methods: {
    uploader(event) {
      this.$toast.add({severity: "info", summary: "Загрузка", life: 3000})
      axios.postForm("/model", {
        file: event.originalEvent.target.files
      })
          .then(response => {
            if (response.status === 208) {
              if (confirm("Данная модель уже была загружена, желаете загрузить ее как новую версию?")) {
                response.config.url = `/model/${response.data.id}`
                response.config.method = "put"
                axios.request(response.config)
              }
            }
            else if (response.status === 200){
              this.$toast.add({severity: "success", summary: "Успешно", detail: "Модель успешно загружена", life: 3000})
              this.updateModels()
            }
          })
          .catch(err => {
            this.$toast.add({severity: "error", summary: "Ошибка", life: 3000})
          })
    },
    updateModels(){
      this.useModel.loadModels(true)
    }
  },
}
</script>

<style scoped lang="scss">
.models {
  font-family: "Open Sans", sans-serif;
  padding-top: 20px;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  color: $main-color;
  -webkit-text-fill-color: black;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 26px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 10px solid transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }
}

</style>