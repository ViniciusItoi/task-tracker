<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="logo alura tracker">
        </h1>
        <div class="has-text-centered">
            <BotaoPadrao :label="textoBotao" :isDisabled="false" :icon="iconeBotao" @click="alternarModoEscuro" />
        </div>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </router-link>
                </li>
                <li>
                    <router-link to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import BotaoPadrao from './BotaoPadrao.vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['alternarModoEscuro'],
    components: {
        BotaoPadrao
    },
    setup(_, { emit }) {
        const modoEscuro = ref(false);

        function alternarModoEscuro(): void {
            emit('alternarModoEscuro');
            modoEscuro.value = !modoEscuro.value;
        }

        const textoBotao = computed(() => (modoEscuro.value ? 'Modo Claro' : 'Modo Escuro'));
        const iconeBotao = computed(() => (modoEscuro.value ? 'fas fa-sun' : 'fas fa-moon'));

        return {
            alternarModoEscuro,
            textoBotao,
            iconeBotao
        };
    }
});
</script>

<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 2rem;
}
@media only screen and (max-width: 768px) {
  header {
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}
</style>