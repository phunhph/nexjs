<template>
  <div class="about">
    <p class="h3 text-center m-3">Danh sách đi làm ngày {{ this.time }}</p>
  </div>
  <main class="container-fluid">
    <div class="d-flex justify-content-end">
      <button class="btn btn-outline-success w-25" @click="submit()">
        Submit
      </button>
    </div>
    <div class="card-body">
      <table class="table table-bodered">
        <thead>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>DOB</th>
            <th>Time In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.users" :key="index">
            <td>{{ user.id_user }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.dob }}</td>
            <td>{{ user.time_in }}</td>
            <td>{{ user.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import axios from "axios";
const api = "http://localhost:3000/admin";
const time = new Date();
const day =
  time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
export default {
  name: "users",
  data() {
    return {
      users: [],
      time: day,
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
      axios
        .post(`${api}/users/createTimeIn`, this.users, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        })
        .then((res) => {
          this.getTimeInUser();
        });
    },
    getTimeInUser() {
      axios
        .get(`${api}/users/userByTimeIn`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
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
              this.getTimeInUser();
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
