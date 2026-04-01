<template>
  <FormularioTarefa @salvarTarefa="salvarTarefa" />
  <ListaTarefas v-if="tarefas.length" :tarefas="tarefas" />
  <div v-else>
    <BoxPadrao>
      Voce nao esta muito produtivo hoje :(
    </BoxPadrao>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import ListaTarefas from '../components/ListaTarefas.vue';
import ITarefa from '../interfaces/ITarefa';
import BoxPadrao from '../components/BoxPadrao.vue';

export default defineComponent({
  name: 'TarefasView',
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.tarefas.push(tarefa);
    },
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    }
  },
  components: { FormularioTarefa, ListaTarefas, BoxPadrao },

});
</script>

<style></style>
