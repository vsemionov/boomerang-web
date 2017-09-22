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
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 64px;
        height: 64px;
        margin: -32px 0 0 -32px;
        border-radius: 50%;
        border: 6px solid rgba(192, 192, 192, .25);
        border-top: 6px solid rgba(0, 153, 255, 1);
        animation: rotation 1s infinite linear;
    }

    @keyframes rotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
