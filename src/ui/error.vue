<template>
    <div>
        <h3>Error</h3>

        <template v-if="error.response">
            <p v-if="error.response.status == 404">Not found</p>
            <p v-else-if="error.response.status == 401">Unauthorized</p>
            <p v-else-if="error.response.status == 403">Forbidden</p>
            <p v-else-if="error.response.status == 409">Conflict</p>
            <p v-else>Unknown error ({{error.response.status}})</p>
        </template>

        <p v-else>Communication error</p>
    </div>
</template>


<script>
    export default {
        name: 'error',
        props: [ 'error' ]
    };
</script>
