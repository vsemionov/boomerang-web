<template>
    <div>
        <h2>Notebooks</h2>
        <p>user: {{username}}</p>
    </div>
</template>


<script>
    export default {
        name: 'notebooks',
        props: ['username']
    };
</script>
