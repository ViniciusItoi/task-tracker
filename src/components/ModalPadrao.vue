<template>
    <div class="modal" :class="{ 'is-active': aberto }">
        <div class="modal-background" @click="fechar"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ titulo }}</p>
                <button class="delete" aria-label="close" @click="fechar"></button>
            </header>

            <section class="modal-card-body">
                <slot></slot>
            </section>

            <footer class="modal-card-foot" v-if="mostrarRodape">
                <slot name="acoes">
                    <div class="buttons">
                        <button class="button" @click="confirmar">{{ textoBotaoConfirmar }}</button>
                        <button class="button" @click="fechar">Fechar</button>
                    </div>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ModalPadrao',
    props: {
        aberto: {
            type: Boolean,
            required: true
        },
        titulo: {
            type: String,
            default: ''
        },
        textoBotaoConfirmar: {
            type: String,
            default: 'Confirmar'
        },
        mostrarRodape: {
            type: Boolean,
            default: true
        }
    },
    emits: ['aoFechar', 'aoConfirmar'],
    setup(_, { emit }) {
        function fechar(): void {
            emit('aoFechar');
        }

        function confirmar(): void {
            emit('aoConfirmar');
        }

        return {
            fechar,
            confirmar
        };
    }
});
</script>