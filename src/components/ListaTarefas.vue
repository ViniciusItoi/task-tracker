<template>
    <div class="field">
        <p class="control m-2 has-icons-left">
            <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
            </span>
            <input class="input m-1" type="text" placeholder="Filtrar tarefas" v-model="filtro" />
        </p>
    </div>
    <div v-for="tarefa in tarefasFiltradas" :key="tarefa.id">
        <ItemTarefa :tarefa="tarefa" @editar="editar" @deletar="deletar" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import http from '@/http';
import ItemTarefa from './ItemTarefa.vue';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
    name: 'ListaTarefas',
    components: {
        ItemTarefa
    },
    props: {
        tarefas: { type: Array as () => ITarefa[], required: true }
    },
    emits: ['editar', 'deletar'],
    setup(props, { emit }) {
        const filtro = ref('');
        const tarefasFiltradas = ref<ITarefa[]>(props.tarefas);

        watchEffect((onCleanup) => {
            const controller = new AbortController();
            const termo = filtro.value.trim();

            onCleanup(() => {
                controller.abort();
            });

            (async () => {
                try {
                    const resposta = await http.get<ITarefa[]>('tarefas', {
                        params: termo ? { q: termo } : {},
                        signal: controller.signal
                    });

                    tarefasFiltradas.value = resposta.data;
                } catch {
                    if (controller.signal.aborted) {
                        return;
                    }

                    tarefasFiltradas.value = props.tarefas;
                }
            })();
        });

        function editar(tarefa: ITarefa): void {
            emit('editar', tarefa);
        }

        function deletar(id: string): void {
            emit('deletar', id);
        }

        return {
            editar,
            deletar,
            filtro,
            tarefasFiltradas
        };
    }
});
</script>