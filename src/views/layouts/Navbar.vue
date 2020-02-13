<template>
  <div>
    <div class="container-scroller">
      <div class="horizontal-menu">
        <nav class="navbar top-navbar col-lg-12 col-12 p-0">
          <div class="nav-top flex-grow-1">
            <div class="container d-flex flex-row h-100 align-items-center">
              <div
                class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
              >
                <router-link to="/" class="navbar-brand brand-logo">
                  <img src="assets/img/logo.svg" />
                </router-link>
                <!-- <a class="navbar-brand brand-logo" href="indexf.html">
                  <img src="assets/img/logo.svg" />
                </a>-->
                <router-link to="/" class="navbar-brand brand-logo-mini">
                  <img src="assets/img/logo.svg" />
                </router-link>
                <router-link class="navbar-brand brand-logo-mini" to="/">
                  <img src="assets/img/logo.svg" alt="POIN SISWA" srcset />
                </router-link>
              </div>
              <div
                class="navbar-menu-wrapper d-flex align-items-center justify-content-end flex-grow-1"
              >
                <b-nav-item v-if="isLoggedIn" @click="logout" class="nav-link">Logout</b-nav-item>
                <!-- <ul class="navbar-nav navbar-nav-right">                  
                <li class="nav-item nav-profile dropdown">                   
                  <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                    Hi, Admin   
                  </a>
                  <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                    <a class="dropdown-item">
                       <i class="mdi mdi-logout text-primary"></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
              <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                <span class="mdi mdi-menu"></span>
                </button>-->
              </div>
            </div>
          </div>
        </nav>
        <nav class="bottom-navbar">
          <div class="container">
            <ul class="nav page-navigation">
              <li class="nav-item">
                <router-link to="/" class="nav-link">
                  <i class="mdi mdi-view-dashboard-outline menu-icon"></i>
                  <span class="menu-title">Beranda</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/petugas" class="nav-link">
                  <i class="mdi mdi-account-settings menu-icon"></i>
                  <span class="menu-title">Petugas Tatib</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dataSiswa" class="nav-link">
                  <i class="mdi mdi-file-document-box-outline menu-icon"></i>
                  <span class="menu-title">Data Siswa</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pelanggaran" class="nav-link">
                  <i class="mdi mdi-codepen menu-icon"></i>
                  <span class="menu-title">Pelanggaran</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/inputPelanggaran" class="nav-link">
                  <i class="mdi mdi-puzzle-outline menu-icon"></i>
                  <span class="menu-title">Input Pelanggaran</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/poinSiswa" class="nav-link">
                  <i class="mdi mdi-image-filter menu-icon"></i>
                  <span class="menu-title">Poin Siswa</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      let conf = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization")
        }
      };
      let form = new FormData();
      this.axios
        .post("/logout", form, conf)
        .then(response => {
          if (response.data.logged === false || response.data.status === 0) {
            this.$store.commit("logout");
            localStorage.removeItem("Authorization");
            this.$router.push({ name: "login" });
          }
        })
        .catch(error => {});
    }
  }
};
</script>