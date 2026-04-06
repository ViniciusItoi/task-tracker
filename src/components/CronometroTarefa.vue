<template>
    <section>
        <strong class="display">{{ tempoDecorrido }}</strong>
    </section>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'CronometroTarefa',
    props: {
        tempoEmSegundos: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const tempoDecorrido = computed(() => {
            const tempoNormalizado = Number(props.tempoEmSegundos ?? 0);

            if (!Number.isFinite(tempoNormalizado) || tempoNormalizado < 0) {
                return '00:00:00';
            }

            return new Date(tempoNormalizado * 1000).toISOString().substring(11, 19);
        });

        return {
            tempoDecorrido
        };
    }
});
</script>
<style>
.display{
    color: var(--texto-primario);
}
</style>