<template>
    <button class="button" :disabled="isDisabled">
        <span class="icon">
            <i :class="icon"></i>
        </span>
        <span>{{ label }}</span>
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoPadrao',
    props: {
        isDisabled: { type: Boolean, required: true },
        label: { type: String, required: true },
        icon: { type: String, required: true }
    },
});
</script>
<style scoped></style>