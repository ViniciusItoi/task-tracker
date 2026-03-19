<template>
    <div v-for="tarefa in tarefas" :key="tarefa.descricao">
        <ItemTarefa :tarefa="tarefa" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ItemTarefa from './ItemTarefa.vue';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
    name: 'ListaTarefas',
    components: {
        ItemTarefa
    },
    props: {
        tarefas: { type: Array as () => ITarefa[], required: true }
    }
});
</script>