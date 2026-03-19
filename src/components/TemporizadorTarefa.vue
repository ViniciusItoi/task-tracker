<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <section>
            <CronometroTarefa :tempoEmSegundos="tempoEmSegundos" />
        </section>
        <BotaoPadrao :isDisabled="cronometroRodando" label="play" icon="fas fa-play" @click="iniciarTarefa" />
        <BotaoPadrao :isDisabled="!cronometroRodando" label="stop" icon="fas fa-stop" @click="pararTarefa" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import BotaoPadrao from './BotaoPadrao.vue';

export default defineComponent({
    name: 'TemporizadorTarefa',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        CronometroTarefa,
        BotaoPadrao
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    methods: {
        iniciarTarefa() {
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000);
        },
        pararTarefa() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        },
    },
    computed: {
        tempoDecorrido(): string {
            return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8);
        }
    }
});
</script>
<style scoped></style>