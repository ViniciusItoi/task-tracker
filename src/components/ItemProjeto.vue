<template>
    <td>
        <span>{{ projeto.nome || 'Projeto sem nome' }}</span>
    </td>
    <td>
        <span>{{ projeto.descricao || 'Projeto sem descrição' }}</span>
    </td>
    <td>
        <span>{{ projeto.id || 'Projeto sem ID' }}</span>
    </td>
    <td>
        <span class="tooltip" data-tooltip="Editar projeto">
            <i class="fas fa-edit" @click="editarProjeto"></i>
        </span>
        <span class="tooltip" data-tooltip="Apagar projeto">
            <i class="fas fa-trash" @click="apagarProjeto"></i>
        </span>
    </td>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IProjeto from '@/interfaces/IProjeto';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';

export default defineComponent({
    name: 'ItemProjeto',
    props: {
        projeto: {
            type: Object as PropType<IProjeto>,
            required: true
        }
    },
    emits: ['apagarProjeto', 'editarProjeto'],
    setup(props, { emit }) {
        function apagarProjeto(): void {
            emit('apagarProjeto', props.projeto.id);
        }

        function editarProjeto(): void {
            emit('editarProjeto', props.projeto);
        }

        return {
            apagarProjeto,
            editarProjeto
        };
    }
});
</script>