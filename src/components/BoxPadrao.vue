<template>
    <div class="box has-text-weight-bold is-flex m-2 is-justify-content-space-between" :style="estilos">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxPadrao',
    data() {
        return {
            estilos: {
                backgroundColor: '#FAF0CA',
            }
        }
    }
});
</script>
<style scoped></style>