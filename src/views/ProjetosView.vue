<template>
    <section>
        <BotaoPadrao class="m-2" label="Criar Projeto" :isDisabled="false" icon="fas fa-plus"
            @click="abrirModalCriacao" />
        <ModalProjeto :aberto="exibirModal" :acao="modoModal" :projeto="projetoEmEdicao" @aoFechar="fecharModal"
            @aoSalvar="salvarProjeto" />
    </section>
    <section>
        <TabelaProjetos class="m-2" :projetos="projetos" @editarProjeto="editarProjeto"
            @apagarProjeto="apagarProjeto" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TabelaProjetos from '@/components/TabelaProjetos.vue';
import ModalProjeto from '@/components/ModalProjeto.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue';
import { projetosModalMixin } from '@/mixins/projetosModal';

export default defineComponent({
    name: 'ProjetosView',
    components: {
        TabelaProjetos,
        ModalProjeto,
        BotaoPadrao
    },
    mixins: [projetosModalMixin],
    props: {
        projetoId: {
            type: String,
            default: null
        }
    }
});
</script>

<style scoped></style>
