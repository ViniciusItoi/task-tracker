<template>
  <div class="box formulario-tarefa">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input id="descricao-tarefa" type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
      </div>
      <div class="column">
        <TemporizadorTarefa @ao-temporizador-finalizado="finalizarTarefa"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TemporizadorTarefa from './TemporizadorTarefa.vue';

export default defineComponent({
  name: 'FormularioTarefa',
  emits: ['salvarTarefa'],
  components: {
    TemporizadorTarefa
  },
  data() {
    return {
      descricao: ''
    }
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit('salvarTarefa', { descricao: this.descricao, tempoDecorrido });
      this.descricao = '';
    }
  }
});
</script>
<style>
.formulario-tarefa{
  background-color: var(--bg-primario);
  color: var(--texto-primario);
} 
</style>