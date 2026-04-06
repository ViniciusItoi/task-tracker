<template>
    <ModalPadrao
        :aberto="aberto"
        :titulo="`${acao} Projeto`"
        :textoBotaoConfirmar="acao"
        @aoFechar="fechar"
        @aoConfirmar="salvar"
    >
        <div class="field">
            <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
            <input type="text" id="nomeDoProjeto" class="input" v-model="nomeDoProjeto" />
        </div>
        <div class="field">
            <label for="descricaoDoProjeto" class="label">Descrição do Projeto</label>
            <input type="text" id="descricaoDoProjeto" class="input" v-model="descricaoDoProjeto" />
        </div>
    </ModalPadrao>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import IProjeto from '@/interfaces/IProjeto';
import ModalPadrao from './ModalPadrao.vue';

export default defineComponent({
    name: 'ModalProjeto',
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
        projeto: {
            type: Object as PropType<IProjeto | null>,
            default: null
        }
    },
    emits: ['aoFechar', 'aoSalvar'],
    setup(props, { emit }) {
        const nomeDoProjeto = ref('');
        const descricaoDoProjeto = ref('');

        function preencherCampos(): void {
            nomeDoProjeto.value = props.projeto?.nome ?? '';
            descricaoDoProjeto.value = props.projeto?.descricao ?? '';
        }

        function fechar(): void {
            emit('aoFechar');
        }

        function salvar(): void {
            emit('aoSalvar', nomeDoProjeto.value, descricaoDoProjeto.value);
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
            () => props.projeto,
            () => {
                preencherCampos();
            },
            { immediate: true }
        );

        return {
            nomeDoProjeto,
            descricaoDoProjeto,
            fechar,
            salvar
        };
    }
});
</script>