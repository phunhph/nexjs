<template>
  <p class="h3 text-center m-5">Nhập code đã cho để xác thực</p>
  <main
    class="container-fluid d-flex justify-content-center align-items-center"
  >
    <form class="w-25 border p-3 shadow rounded" @submit.prevent="submit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Code login</label>
        <input
          type="password"
          class="form-control"
          v-model="this.model.confirm.code"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </main>
</template>
<script>
import axios from "axios";
const api = "http://localhost:3000/confirm";
export default {
  name: "usersCreate",
  data() {
    return {
      model: {
        confirm: {
          code: "",
        },
      },
    };
  },
  mounted() {},
  methods: {
    submit() {
      let token = localStorage.getItem("user");
      axios
        .post(`${api}`, this.model.confirm, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 404 || error.response.status === 401) {
            this.$router.push("/logout");
          }
        });
    },
  },
};
</script>
