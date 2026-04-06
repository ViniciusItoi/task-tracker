<template>
    <ModalPadrao
        :aberto="aberto"
        :titulo="`${acao} Tarefa`"
        :textoBotaoConfirmar="acao"
        @aoFechar="fechar"
        @aoConfirmar="salvar"
    >
        <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição da Tarefa</label>
            <input type="text" id="descricaoDaTarefa" class="input" v-model="descricaoDaTarefa" />
        </div>
        <div class="field">
            <label for="tempoDecorrido" class="label">Tempo Decorrido (segundos)</label>
            <input type="number" id="tempoDecorrido" class="input" v-model.number="tempoDecorrido" min="0" />
        </div>
        <div class="field">
            <label for="projetoDaTarefa" class="label">Projeto</label>
            <div class="select">
                <select id="projetoDaTarefa" v-model="idProjetoDaTarefa">
                    <option value="">Selecione um projeto</option>
                    <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                        {{ projeto.nome }}
                    </option>
                </select>
            </div>
        </div>
    </ModalPadrao>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import ModalPadrao from './ModalPadrao.vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'ModalTarefa',
    components: {
        ModalPadrao
    },
    props: {
        aberto: {
            type: Boolean,
            required: true
        },
        acao: {
            type: String,
            required: true
        },
        tarefa: {
            type: Object as PropType<ITarefa | null>,
            default: null
        }
    },
    emits: ['aoFechar', 'aoSalvar'],
    setup(props, { emit }) {
        const store = useStore();

        const descricaoDaTarefa = ref('');
        const tempoDecorrido = ref(0);
        const idProjetoDaTarefa = ref('');

        function preencherCampos(): void {
            descricaoDaTarefa.value = props.tarefa?.descricao ?? '';
            tempoDecorrido.value = props.tarefa?.tempoDecorrido ?? 0;
            idProjetoDaTarefa.value = props.tarefa?.projeto?.id ?? '';
        }

        function fechar(): void {
            emit('aoFechar');
        }

        function salvar(): void {
            emit('aoSalvar', descricaoDaTarefa.value, tempoDecorrido.value, idProjetoDaTarefa.value);
            fechar();
        }

        watch(
            () => props.aberto,
            (estaAberto: boolean) => {
                if (estaAberto) {
                    preencherCampos();
                }
            }
        );

        watch(
            () => props.tarefa,
            () => {
                preencherCampos();
            },
            { immediate: true }
        );

        return {
            descricaoDaTarefa,
            tempoDecorrido,
            idProjetoDaTarefa,
            projetos: computed(() => store.state.projeto.projetos),
            fechar,
            salvar
        };
    }
});
</script>
