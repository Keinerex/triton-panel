<template>
  <div class="card" :class="{selected: isSelected}" @click="select">
    <h2>{{ name }}</h2>
    <span>
      <span :class="{cloud_done: isSelected, cloud: !isSelected}">
        <CloudDone class="cloud_done" v-if="isLoaded"/>
      <Cloud v-else/>
      </span>
      <span class="trash">
        <Trash @click="deleteModel"/>
      </span>
    </span>
  </div>
</template>

<script>
import {useVersionStore} from "@/stores/versions";
import Cloud from "@/icons/cloud.svg"
import CloudDone from "@/icons/cloud_done.svg"
import Trash from "@/icons/trash.svg"

import {useModel} from "vue";
import axios from "axios";

export default {
  components: {Cloud, CloudDone, Trash},
  props: {
    modelId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isLoaded: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      useVersion: useVersionStore(),
    }
  },
  computed: {
    isSelected() {
      return this.modelId === this.$route.params.modelId
    }
  },
  methods: {
    select() {
      this.useVersion.loadModels(this.modelId)
      if (!this.isSelected) {
        this.$router.push({name: 'model', params: {modelId: this.modelId}})
      }
    },
    deleteModel(){
      if (confirm(`Удалить модель ${this.name}?`)){
        this.$toast.add({severity: "info", summary: "Удаление", life: 3000})
        axios.delete(`/model/${this.modelId}`)
            .then(r => {
              if (r.status === 200){
                this.$toast.add({severity: "success", summary: "Успешно", detail: "Модель успешно удалена", life: 3000})
                this.$emit("deleteModel")
              }
            })
            .catch(err => {
              this.$toast.add({severity: "error", summary: "Ошибка", life: 3000})
            })
      }

    }
  },
  mounted() {
    if (this.isSelected) {
      this.useVersion.loadModels(this.modelId)
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  height: 100px;
  padding: 20px;
  border-radius: 20px;
  border: solid 2px $secondary-color;
  background: $secondary-color;
}

.selected {
  border-color: $main-color;
}
.trash > svg{
  cursor: pointer;
  fill: $error-color;
}
</style>