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
import { defineComponent } from 'vue';
import 'bulma-tooltip/dist/css/bulma-tooltip.min.css';

export default defineComponent({
    name: 'ItemProjeto',
    props: {
        projeto: {
            type: Object,
            required: true
        }
    },
    methods: {
        apagarProjeto(): void {
            this.$emit('apagarProjeto', this.projeto.id);
        },
        editarProjeto(): void {
            this.$emit('editarProjeto', this.projeto);
        }
    }
});
</script>