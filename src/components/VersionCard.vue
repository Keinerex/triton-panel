<template>
  <div class="card" :class="{selected: isSelected}" @click="select">
    <h2>{{ name }}</h2>
    <span>
      <span :class="{cloud_done: isSelected, cloud: !isSelected}">
        <CloudDone class="cloud_done" v-if="isLoaded"/>
      <Cloud v-else/>
      </span>
      <a :href="downloadLink" :download="downloadName" class="download">
        <Download/>
      </a>
      <span class="trash">
        <Trash @click="deleteVersion"/>
      </span>
    </span>
  </div>
</template>

<script>
import Cloud from "@/icons/cloud.svg"
import CloudDone from "@/icons/cloud_done.svg"
import Trash from "@/icons/trash.svg"
import Download from "@/icons/download.svg"
import axios from "axios";
import {useModelStore} from "@/stores/models";

export default {
  components: {Cloud, CloudDone, Trash, Download},
  props: {
    versionId: {
      type: String,
      required: true
    },
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
      useModel: useModelStore()
    }
  },
  computed: {
    isSelected() {
      return this.versionId === this.$route.params.versionId
    },
    downloadLink() {
      return axios.defaults.baseURL + `/model/version/${this.versionId}`
    },
    downloadName() {
      return `${this.useModel.model(this.modelId).name}_${this.name}.zip`
    }
  },
  methods: {
    select() {
      if (!this.isSelected) {
        this.$router.push({name: 'version', params: {modelId: this.modelId, versionId: this.versionId}})
      }
    },
    deleteVersion() {
      if (confirm(`Удалить версию ${this.name}?`)) {
        this.$toast.add({severity: "info", summary: "Удаление", life: 3000})
        axios.delete(`/model/version/${this.versionId}`)
            .then(r => {
              if (r.status === 200) {
                this.$toast.add({severity: "success", summary: "Успешно", detail: "Версия успешно удалена", life: 3000})
                this.$emit("deleteVersion", this.modelId)
                if (r.data.model_delete) {
                  this.$emit("deleteModel")
                }
              }
            })
            .catch(err => {
              this.$toast.add({severity: "error", summary: "Ошибка", life: 3000})
            })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  width: 90%;
  height: 100px;
  padding: 20px;
  border-radius: 20px;
  border: solid 2px $secondary-color;
  background: $secondary-color;
}

.trash > svg {
  fill: $error-color;
  cursor: pointer;
}

.download > svg {
  fill: $main-color;
  cursor: pointer;
}

.selected {
  border-color: $main-color;
}
</style>