<template>
  <main class="container-fluid">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">FullName</label>
        <input
          type="text"
          class="form-control"
          name="fullName"
          v-model="model.user.fullname"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">DOB</label>
        <input
          type="date"
          name="dob"
          v-model="model.user.dob"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </main>
</template>

<script>
import axios from "axios";
const api = "http://localhost:3000/users";
export default {
  name: "usersCreate",
  data() {
    return {
      model: {
        user: {
          fullname: "",
          dob: "",
          status: 1,
        },
      },
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.checkToken();
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    submit() {
      let token = localStorage.getItem("user");
      axios
        .post(`${api}/create`, this.model.user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.$router.push("/");
        })
        .catch((err) => {
          if (error.response.status == 404) {
            this.$router.push("/confirm");
          }
        });
    },

    checkToken() {
      axios
        .get("http://localhost:3000/login/token", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.user.role == 1) {
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
    },
  },
};
</script>
