<template>
    <div>
        <h1>Tasks</h1>
        <p>user: {{username}}</p>
    </div>
</template>


<script>
    export default {
        name: 'tasks',
        props: ['username']
    };
</script>
