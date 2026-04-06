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
import { defineComponent, onMounted } from 'vue';
import TabelaProjetos from '@/components/TabelaProjetos.vue';
import ModalProjeto from '@/components/ModalProjeto.vue';
import BotaoPadrao from '@/components/BotaoPadrao.vue';
import { tipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
import { useStore } from '@/store';
import { OBTER_PROJETOS } from '@/store/tipoAcoes';
import { useProjetosModal } from '@/composables/useProjetosModal';

export default defineComponent({
    name: 'ProjetosView',
    components: {
        TabelaProjetos,
        ModalProjeto,
        BotaoPadrao
    },
    setup() {
        const store = useStore();
        const { notificar } = useNotificador();
        const projetosModal = useProjetosModal();

        onMounted(async () => {
            try {
                await store.dispatch(OBTER_PROJETOS);
            } catch {
                notificar('Erro ao carregar projetos', 'Não foi possível carregar a lista de projetos.', tipoNotificacao.ERRO);
            }
        });

        return {
            ...projetosModal
        };
    },
    props: {
        projetoId: {
            type: String,
            default: null
        }
    }
});
</script>

<style scoped></style>
