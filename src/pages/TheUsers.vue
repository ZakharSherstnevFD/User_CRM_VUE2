<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="_container">
        <table>
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('age')">Age &#8595;</th>
              <th @click="sort('gender')">Gender &#8595;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td>
                <img :src="user.img" :alt="user.name" />
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
        <p>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}</p>
      </div>
    </section>
    <section>
      <div class="_container">
        <div class="button-list">
          <div @click="prevPage" class="btn btnPrimary">&#8592;</div>
          <div @click="nextPage" class="btn btnPrimary">&#8594;</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      currentSort: "name",
      currentSortDir: "asc",
      page: {
        current: 1,
        length: 3,
      },
    };
  },

  created() {
    axios
      .get("https://tocode.ru/static/_secret/courses/1/usersCrmApi.php")
      .then((response) => {
        this.users = response.data;
      });
  },
  computed: {
    usersSort() {
      return this.users
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
        });
    },
  },
  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = e;
    },
    prevPage() {
      if (this.page.current > 1) {
        this.page.current -= 1;
      }
    },
    nextPage() {
      if (this.page.current * this.page.length < this.users.length) {
        this.page.current += 1;
      }
    },
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 60px;
  height: auto;
  margin-right: 16px;
}
.button-list {
  text-align: center;
  width: 100%;
}
.btn {
  border-radius: 60px;
  margin: 20px;
}
</style>
