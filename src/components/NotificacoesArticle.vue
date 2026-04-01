<template>
    <div class="notificacoes">
        <article v-for="notificacao in notificacoes" :key="notificacao.id" :class="`message is-${notificacao.tipo}`">
            <div class="message-header">{{ notificacao.titulo }}</div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: "NotificacoesArticle",
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.state.notificacoes)
    };
  }
});
</script>
<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>