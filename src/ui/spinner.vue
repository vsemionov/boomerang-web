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
       width: 64px;
       height: 64px;
       margin: auto;
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
