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
import { computed, defineComponent, onBeforeUnmount, ref } from 'vue';
import CronometroTarefa from './CronometroTarefa.vue';
import BotaoPadrao from './BotaoPadrao.vue';

export default defineComponent({
    name: 'TemporizadorTarefa',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        CronometroTarefa,
        BotaoPadrao
    },
    setup(_, { emit }) {
        const tempoEmSegundos = ref(0);
        const cronometro = ref<ReturnType<typeof setInterval> | null>(null);
        const cronometroRodando = ref(false);

        function limparCronometro(): void {
            if (cronometro.value) {
                clearInterval(cronometro.value);
                cronometro.value = null;
            }
        }

        function iniciarTarefa(): void {
            limparCronometro();
            cronometroRodando.value = true;
            cronometro.value = setInterval(() => {
                tempoEmSegundos.value += 1;
            }, 1000);
        }

        function pararTarefa(): void {
            cronometroRodando.value = false;
            limparCronometro();
            emit('aoTemporizadorFinalizado', tempoEmSegundos.value);
            tempoEmSegundos.value = 0;
        }

        const tempoDecorrido = computed(() => {
            const tempoNormalizado = Number(tempoEmSegundos.value ?? 0);

            if (!Number.isFinite(tempoNormalizado) || tempoNormalizado < 0) {
                return '00:00:00';
            }

            return new Date(tempoNormalizado * 1000).toISOString().substring(11, 19);
        });

        onBeforeUnmount(() => {
            limparCronometro();
        });

        return {
            tempoEmSegundos,
            cronometroRodando,
            iniciarTarefa,
            pararTarefa,
            tempoDecorrido
        };
    }
});
</script>
<style scoped></style>