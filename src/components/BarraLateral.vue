<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="logo alura tracker">
        </h1>
        <BotaoPadrao :label="textoBotao" :isDisabled="false" :icon="iconeBotao" @click="alternarModoEscuro" />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BotaoPadrao from './BotaoPadrao.vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ['alternarModoEscuro'],
    data() {
        return{
            modoEscuro: false
        }
    },
    components: {
        BotaoPadrao
    },
    methods: {
        alternarModoEscuro(): void {
            this.$emit('alternarModoEscuro');
            this.modoEscuro = !this.modoEscuro;
        }
    },
    computed: {
        textoBotao(): string {
            return this.modoEscuro ? 'Modo Claro' : 'Modo Escuro';
        },
        iconeBotao(): string {
            return this.modoEscuro ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
});
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>