<template>
  <div id="app">
    <b-container fluid>
      <b-col sm="12">
        <h1>Churrascômetro</h1>
      </b-col>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
          <b-col sm="6">
            <b-row class="mb-2">
              <b-col sm="2">
                <label>Homens</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-qtdMan"
                  v-model.number="bbq.qtdMan"
                  type="number"
                  min="0"
                  required
                />
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="2">
                <label>Mulheres</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-qtdWMan"
                  v-model.number="bbq.qtdWMan"
                  type="number"
                  min="0"
                  required
                />
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="2">
                <label>Crianças</label>
              </b-col>
              <b-col sm="10">
                <b-form-input
                  id="input-qtdChild"
                  v-model.number="bbq.qtdChild"
                  type="number"
                  min="0"
                  required
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12">
                <b-button
                  class="mb-1"
                  block
                  variant="success"
                  @click="onSubmit()"
                  >Calcular</b-button
                >
                <b-button class="mb-1" block variant="danger" @click="onReset()"
                  >Limpar</b-button
                >
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="6">
            <div v-if="itens">
              <b-list-group>
                <div
                  v-for="({ nome, peso }, index) in itens"
                  v-bind:key="index"
                >
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    {{ nome }}
                    <b-badge variant="primary" pill>{{ peso }} Kg</b-badge>
                  </b-list-group-item>
                </div>
              </b-list-group>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
// import ItensService from "../domain/ItensService";

export default {
  name: "app",
  data() {
    return {
      bbq: {
        qtdMan: 0,
        qtdWMan: 0,
        qtdChild: 0
      },
      itens: []
    };
  },
  methods: {
    async onSubmit(e) {
      return await this.$http
        .post(`http://localhost:3000/itens/calcular`, { bbq: this.bbq })
        .then(
          res => {
            let i = 0;
            for (const key in res.data) {
              if (res.data.hasOwnProperty(key)) {
                const element = res.data[key];
                if (key == this.itens[i].nome) {
                  this.itens[i].peso = element;
                }
              }
              i++;
            }
            return;
          },
          err => {
            throw new Error(err.body);
          }
        );
    },
    onReset(e) {
      this.bbq.qtdMan = 0;
      this.bbq.qtdWMan = 0;
      this.bbq.qtdChild = 0;
      for (const item of this.itens) {
        item.peso = 0;
      }
    }
  },
  asyncComputed: {
    itens() {
      const itensDados = [];

      return this.$http.get(`http://localhost:3000/itens`).then(
        res => {
          for (const { item } of res.data) {
            itensDados.push({ nome: item, peso: 0 });
          }

          return itensDados;
        },
        err => {
          console.log(err);
          throw new Error(err.body);
        }
      );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
