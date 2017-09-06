<template>
    <div>
        <h1>Boomerang {{version}}</h1>
    </div>
</template>


<script>
    import axios from 'axios';

    export default {
        name: 'hello',
        data: function () {
            return {
                version: ''
            };
        },
        created: function () {
            let vm = this;
            axios.get('https://boomerang-core.herokuapp.com/api/info/').then(function (response) {
                vm.version = response.data.app.version;
            });
        }
    };
</script>
