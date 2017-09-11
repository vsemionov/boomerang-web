<template>
    <div>
        <h1>Notebooks</h1>
        <p>user: {{ username }}</p>
    </div>
</template>


<script>
    export default {
        name: 'notebooks',
        props: ['username'],

        data: function () {
            return {
                notes: null,
                working: false,
                error: null
            };
        },

        created: function () {
        }
    };
</script>
