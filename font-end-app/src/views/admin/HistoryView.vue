<template>
  <main class="container-fluid">
    <div class="about">
      <p class="h3 text-center m-3">Lịch sử xoá user</p>
    </div>
    <div class="card-body">
      <table class="table table-bodered">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>FullName</th>
            <th>Time delete</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.updatedAt }}</td>
            <td>
              <button
                class="btn btn-warning me-3"
                @click="rollBackUser(user.id)"
              >
                Khôi phục
              </button>
              <!-- <button class="btn btn-danger" @click="deleteUser(user.id)">
                Delete
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<script>
import axios from "axios";
const api = "http://localhost:3000/admin";
export default {
  name: "users",
  data() {
    return {
      users: [],
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
    getAll() {
      let token = localStorage.getItem("user");
      axios
        .get(`${api}/users/destroyed`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$router.push("/login");
          } else if (error.response.status == 403) {
          } else if (error.response.status == 404) {
            this.$router.push("/confirm");
          }
        });
    },
    rollBackUser(id) {
      let token = localStorage.getItem("user");
      if (confirm("Are you sure you want to roll back this user")) {
        id = parseInt(id);
        axios
          .delete(`${api}/user/rollBack/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.getAll();
          });
      }
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
              this.getAll();
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
