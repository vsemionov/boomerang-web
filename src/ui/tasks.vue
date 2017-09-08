<template>
    <div>
        <h2>Tasks</h2>
        <p>user: {{username}}</p>
    </div>
</template>


<script>
    export default {
        name: 'tasks',
        props: ['username']
    };
</script>
