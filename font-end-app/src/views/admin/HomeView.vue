<template>
  <main class="container-fluid">
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-success w-25">
        <RouterLink class="nav-link active" aria-current="page" to="/add"
          >Add user +</RouterLink
        >
      </button>
    </div>
    <div class="card-body">
      <table class="table table-bodered">
        <thead>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>DOB</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.users" :key="index">
            <td>{{ user.id }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.dob }}</td>
            <td>{{ user.createdAt }}</td>
            <td>{{ user.updatedAt }}</td>
            <td>
              <button class="btn btn-warning me-2">
                <RouterLink
                  class="nav-link active"
                  aria-current="page"
                  :to="`fix/${user.id}`"
                >
                  Fix
                </RouterLink>
              </button>
              <button class="btn btn-danger" @click="deleteUser(user.id)">
                Delete
              </button>
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
        .get(`${api}/users`, {
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
    deleteUser(id) {
      let token = localStorage.getItem("user");
      if (confirm("Are you sure you want to delete")) {
        id = parseInt(id);
        axios
          .delete(`${api}/user/delete/${id}`, {
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
