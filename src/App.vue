<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuro }">
    <div class="column is-one-quarter">
      <BarraLateral @alternarModoEscuro="alternarModoEscuro"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTarefa @salvarTarefa="salvarTarefa" />
      <ListaTarefas v-if="tarefas.length" :tarefas="tarefas" />
      <div v-else >
        <BoxPadrao>
          Voce nao esta muito produtivo hoje :(
        </BoxPadrao>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioTarefa from './components/FormularioTarefa.vue';
import ListaTarefas from './components/ListaTarefas.vue';
import ITarefa from './interfaces/ITarefa';
import BoxPadrao from './components/BoxPadrao.vue';

export default defineComponent({
  name: 'App',
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
    alternarModoEscuro(): void {
      this.modoEscuro = !this.modoEscuro;
    }
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuro: false
    }
  },
  components: { BarraLateral, FormularioTarefa, ListaTarefas, BoxPadrao }
});
</script>

<style>
main{
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro{
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo{
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>
