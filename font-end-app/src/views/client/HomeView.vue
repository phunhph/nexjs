<template>
  <main
    class="container-fluid d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="card" style="width: 18rem">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Full name: {{ this.model.user.fullname }}
        </li>
        <li class="list-group-item">DOB: {{ this.model.user.dob }}</li>
        <li class="list-group-item">
          <button class="btn btn-outline-success" @click="submit()">
            Điểm danh
          </button>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";
const api = "http://localhost:3000";
export default {
  name: "usersCreate",
  data() {
    return {
      model: {
        user: {
          fullname: "",
          dob: "",
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
      const time = new Date();
      axios
        .get("https://api.ipify.org?format=json")
        .then((response) => {
          const data = {
            date: time.toLocaleString(),
            ipv4: response.data.ip,
          };
          axios
            .post(`${api}/timeIn`, data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            })
            .then((response) => {
              alert("done");
            });
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.$router.push("/login");
          }
        });
    },
    getuser(id) {
      axios
        .get(`${api}/user/infor/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        })
        .then((res) => {
          this.model.user.fullname = res.data.fullname;
          this.model.user.dob = res.data.dob;
        })
        .catch((error) => {
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
            if (res.data.user.role == 2) {
              this.getuser(res.data.user.id_user);
            } else {
              this.$router.push("/admin");
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
