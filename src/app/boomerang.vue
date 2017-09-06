<template>
    <div>
        <h1>Boomerang App {{appVersion}}</h1>
        <h1>Boomerang API {{apiVersion}}</h1>
    </div>
</template>


<script>
    import {version} from '../../package.json';

    import axios from 'axios';

    export default {
        name: 'boomerang',
        data: function () {
            return {
                appVersion: version,
                apiVersion: null
            };
        },
        created: function () {
            let vm = this;
            axios.get('https://boomerang-core.herokuapp.com/api/info/').then(function (response) {
                vm.apiVersion = response.data.app.version;
            });
        }
    };
</script>
