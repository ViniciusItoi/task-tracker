<template>
    <BoxPadrao>
        <div>
            <span>{{ tarefa.descricao || 'Tarefa sem descrição' }}</span>
        </div>
        <div>
            <span>{{ new Date(tarefa.tempoDecorrido * 1000).toISOString().substr(11, 8) }}</span>
        </div>
    </BoxPadrao>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BoxPadrao from './BoxPadrao.vue';

export default defineComponent({
    name: 'ItemTarefa',
    props: {
        tarefa: {
            type: Object,
            required: true
        }
    },
    components: {
        BoxPadrao
    }
});
</script>