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
import { defineComponent, PropType } from 'vue';
import IProjeto from '@/interfaces/IProjeto';
import ModalPadrao from './ModalPadrao.vue';

export default defineComponent({
    name: 'ModalProjeto',
    components: {
        ModalPadrao
    },
    data() {
        return {
            nomeDoProjeto: '',
            descricaoDoProjeto: ''
        };
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
    watch: {
        aberto(estaAberto: boolean): void {
            if (estaAberto) {
                this.preencherCampos();
            }
        },
        projeto: {
            immediate: true,
            handler(): void {
                this.preencherCampos();
            }
        }
    },
    methods: {
        preencherCampos(): void {
            this.nomeDoProjeto = this.projeto?.nome ?? '';
            this.descricaoDoProjeto = this.projeto?.descricao ?? '';
        },
        fechar() {
            this.$emit('aoFechar');
        },
        salvar() {
            this.$emit('aoSalvar', this.nomeDoProjeto, this.descricaoDoProjeto);
            this.fechar();
        }
    }
});
</script>