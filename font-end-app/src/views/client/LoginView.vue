<script setup></script>

<template>
  <main
    class="container-fluid d-flex justify-content-center align-items-center"
  >
    <form class="w-25 border p-3 shadow rounded" @submit.prevent="submit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="model.login.email"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="model.login.password"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
const api = "http://localhost:3000/login";
export default {
  name: "usersCreate",
  data() {
    return {
      model: {
        login: {
          email: "",
          password: "",
        },
      },
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      var url = location.href;
      var parts = url.split("/");
      var lastPart = parts.pop() || parts.pop();
      if (lastPart === "logout") {
        this.logout();
      } else {
        this.checkToken();
      }
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    submit() {
      axios.post(`${api}`, this.model.login).then((res) => {
        localStorage.setItem("user", res.data.data.token);

        if (res.data.data.role == 1) {
          alert(" Code bảo mật của bạn là : " + res.data.data.code);
          res.data.data.code = null;
          this.$router.push("/admin");
        } else {
          alert(" Code bảo mật của bạn là : " + res.data.data.code);
          res.data.data.code = null;
          this.$router.push("/");
        }
      });
    },
    logout() {
      localStorage.removeItem("user");
      this.checkToken();
    },
    checkToken() {
      if (localStorage.getItem("user")) {
        axios
          .get(`${api}/token`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.user.role == 1) {
                this.$router.push("/admin");
              } else {
                this.$router.push("/");
              }
            }
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.$router.push("/login");
            }
          });
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
