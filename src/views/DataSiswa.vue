<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title float-left">
                <b>Data Siswa</b>
              </p>
              <p class="card-description float-right">
                <b-button variant="success" v-b-modal.modalTatib v-on:click="Add">
                  <i class="mdi mdi-plus btn-icon-prepend"></i> Tambah
                </b-button>
              </p>
              <div class="table-responsive">
                <b-table striped hover :items="user" :fields="fields">
                  <template v-slot:cell(aksi)="data">
                    <b-button
                      size="sm"
                      variant="info"
                      v-on:click="Edit(data.item)"
                      v-b-modal.modalTatib
                    >
                      <i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah
                    </b-button>&nbsp;
                    <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)">
                      <i class="mdi mdi-delete btn-icon-prepend"></i> Hapus
                    </b-button>
                  </template>
                </b-table>

                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination"
                ></b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="success"></b-spinner>
                  <strong class="text-success">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-success">{{ message }}</strong>
                </b-toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modalTatib" @ok="Save">
      <template v-slot:modal-title>Form Siswa</template>
      <form ref="form">
        <div class="form-group">
          <label for="nama" class="col-form-label">Nama Siswa</label>
          <input
            type="text"
            name="nama_siswa"
            class="form-control"
            id="nama_siswa"
            placeholder="Nama Siswa"
            v-model="nama_siswa"
          />
        </div>
        <div class="form-group">
          <label for="nis" class="col-form-label">NIS</label>
          <input
            type="text"
            name="nis"
            class="form-control"
            id="nis"
            placeholder="NIS"
            v-model="nis"
          />
        </div>
        <div class="form-group">
          <label for="kelas" class="col-form-label">Kelas</label>
          <select class="form-control" name="kelas" id="kelas" v-model="kelas" placeholder="Kelas">
            <option value="XI RPL 1" checked>X RPL 1</option>
            <option value="XI RPL 2">X RPL 2</option>
            <option value="XI RPL 3">X RPL 3</option>
          </select>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      search: "",
      id: "",
      nis: "",
      nama_siswa: "",
      kelas: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      user: [],
      fields: ["nis", "nama_siswa", "kelas", "aksi"]
    };
  },

  methods: {
    getData: function() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/siswa/" + this.perPage + "/" + offset, conf)
        .then(response => {
          if (response.data.status == 1) {
            this.$bvToast.hide("loadingToast");
            this.user = response.data.siswa;
            this.rows = response.data.count;
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Gagal menampilkan data siswa.";
            this.$bvToast.show("message");
            this.$router.push({ name: "login" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    pagination: function() {
      if (this.search == "") {
        this.getData();
      } else {
        this.searching();
      }
    },

    Add: function() {
      this.action = "insert";
      this.nis = "";
      this.nama_siswa = "";
      this.kelas = "";
    },

    Edit: function(item) {
      this.action = "update";
      this.id = item.id;
      this.nis = item.nis;
      this.nama_siswa = item.nama_siswa;
      this.kelas = item.kelas;
    },

    Save: function() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.$bvToast.show("loadingToast");
      if (this.action === "insert") {
        let form = new FormData();
        form.append("id", this.id);
        form.append("nis", this.nis);
        form.append("nama_siswa", this.nama_siswa);
        form.append("kelas", this.kelas);

        this.axios
          .post("/siswa", form, conf)
          .then(response => {
            this.$bvToast.hide("loadingToast");
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let form = {
          nama_siswa: this.nama_siswa,
          nis: this.nis,
          kelas: this.kelas,
          role: this.role
        };
        this.axios
          .put("/siswa/" + this.id, form, conf)
          .then(response => {
            this.$bvToast.hide("loadingToast");
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    Drop: function(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
        this.$bvToast.show("loadingToast");
        this.axios
          .delete("/siswa/" + id, conf)
          .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
};
</script>