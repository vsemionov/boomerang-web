<template>
    <div class="spinner"></div>
</template>


<script>
    export default {
        name: 'spinner'
    };
</script>


<style>
    .spinner {
        margin: auto;
        width: 64px;
        height: 64px;
        border: 6px solid rgba(0, 174, 239, .15);
        border-top: 6px solid rgba(0, 174, 239, .8);
        border-radius: 50%;
        animation: rotation 1s infinite linear;
    }

    @keyframes rotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
