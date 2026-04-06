<template>
    <BoxPadrao>
        <div class="column is-7">
            <span>{{ tarefa.descricao || 'Tarefa sem descrição' }}</span>
        </div>
        <div class="column is-3">
            <span>{{ tarefa.projeto?.nome || 'Projeto não especificado' }}</span>
        </div>
        <div class="column is-1">
            <span>{{ tempoFormatado }}</span>
        </div>
        <div class="column is-1">
            <span class="tooltip" data-tooltip="Editar Tarefa">
                <i class="fas fa-edit" @click="editar"></i>
            </span>
            <span class="tooltip" data-tooltip="Apagar Tarefa">
                <i class="fas fa-trash" @click="deletar"></i>
            </span>
        </div>

    </BoxPadrao>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import BoxPadrao from './BoxPadrao.vue';
import ITarefa from '@/interfaces/ITarefa';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';

export default defineComponent({
    name: 'ItemTarefa',
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    emits: ['editar', 'deletar'],
    components: {
        BoxPadrao
    },
    setup(props, { emit }) {
        const tempoFormatado = computed(() => {
            const tempoEmSegundos = Number(props.tarefa?.tempoDecorrido ?? 0);

            if (!Number.isFinite(tempoEmSegundos) || tempoEmSegundos < 0) {
                return '00:00:00';
            }

            return new Date(tempoEmSegundos * 1000).toISOString().substring(11, 19);
        });

        function editar(): void {
            emit('editar', props.tarefa);
        }

        function deletar(): void {
            emit('deletar', props.tarefa.id);
        }

        return {
            tempoFormatado,
            editar,
            deletar
        };
    }
});
</script>