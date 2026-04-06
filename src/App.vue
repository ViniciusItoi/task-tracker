<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuro }">
    <div class="column is-one-quarter">
      <BarraLateral @alternarModoEscuro="alternarModoEscuro"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <NotificacoesArticle />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesArticle from './components/NotificacoesArticle.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const modoEscuro = ref(false);

    function alternarModoEscuro(): void {
      modoEscuro.value = !modoEscuro.value;
    }

    return {
      modoEscuro,
      alternarModoEscuro
    };
  },
  components: { BarraLateral, NotificacoesArticle }
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
