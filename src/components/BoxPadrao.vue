<template>
    <div class="box columns has-text-weight-bold is-flex m-2" :style="estilos">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxPadrao',
    setup() {
        const estilos = {
            backgroundColor: '#FAF0CA',
        };

        return {
            estilos
        };
    }
});
</script>
<style scoped></style>