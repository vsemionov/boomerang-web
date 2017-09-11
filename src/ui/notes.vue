<template>
    <div>
        <h1>Notes</h1>
        <p>user: {{ username }}</p>
        <p>notebook: {{ notebook_id }}</p>
    </div>
</template>


<script>
    export default {
        name: 'notes',
        props: ['username', 'notebook_id']
    };
</script>
