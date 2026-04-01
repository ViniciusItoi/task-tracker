<template>
    <table class="table is-striped is-fullwidth">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>ID</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="projetos.length === 0">
                <td colspan="4">Nenhum projeto encontrado</td>
            </tr>
            <tr v-else v-for="projeto in projetos" :key="projeto.id">
                <ItemProjeto :projeto="projeto" @editarProjeto="editarProjeto" @apagarProjeto="apagarProjeto" />
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ItemProjeto from './ItemProjeto.vue';
import IProjeto from '../interfaces/IProjeto';

export default defineComponent({
    name: 'TabelaProjetos',
    components: {
        ItemProjeto
    },
    props: {
        projetos: { type: Array as () => IProjeto[], required: true }
    },
    methods: {
        apagarProjeto(id: string): void {
            this.$emit('apagarProjeto', id);
        },
        editarProjeto(projetoEditado: IProjeto): void {
            this.$emit('editarProjeto', projetoEditado);
        }
    }
});
</script>