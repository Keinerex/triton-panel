<template>
  <main class="main">
    <section class="section">
      <h1 class="title">Вход в систему</h1>
      <form class="form" @submit.prevent.stop="handleSubmit">
        <span class="p-float-label">
          <InputText required class="p-inputtext-lg input" id="username"
                     v-model="username" type="text"/>
          <label for="username">Логин</label>
        </span>
        <span class="p-float-label">
          <InputText required class="p-inputtext-lg input" id="password" v-model="password" type="password"/>
          <label for="password">Пароль</label>
        </span>
        <Button class="p-button-lg" type="submit" label="Войти"/>
      </form>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import {useUserStore} from "@/stores/user";


export default {
  data() {
    return {
      username: "",
      password: "",
      userStore: useUserStore(),
    }
  },
  methods: {
    handleSubmit(event) {
      axios.post("/user/login", {
        username: this.username,
        password: this.password
      })
          .then(this.handleRequest)
          .catch(this.handelRequestError);
    },

    handelRequestError(error) {
      if (error.response?.status === 401) {
        this.showToast({severity: "error", summary: "Ошибка", detail: "Неверный логин или пароль", life: 3000});
        return
      }
      this.showToast({severity: "error", summary: "Ошибка", detail: "Произошла ошибка запроса", life: 3000});
    },

    handleRequest(response) {
      if (response.status === 200) {
        this.showToast({severity: "success", summary: "Успешно", detail: "Вход выполнен", life: 3000});
        this.userStore.login();
      }
    },

    showToast(data) {
      this.$toast.add(data);
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  @include flex_center;
  height: 100%;
}

.section {
  background-color: $secondary-color;
  padding: 40px 100px;
  border-radius: 10px;
  @include flex-form
}

.form {
  @include flex-form
}

.title {
  font-family: "Open Sans", sans-serif;

}

.input {
  cursor: pointer;
}
</style>