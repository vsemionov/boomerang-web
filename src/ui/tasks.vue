<template>
    <div>
        <h1>Tasks</h1>

        <a href="#" v-for="task in tasks">
            <div :class="['panel', task.done ? 'panel-info' : 'panel-warning']">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ task.title }}</h3>
                </div>
                <div class="panel-body">{{ task.description }}</div>
            </div>
        </a>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>
    </div>
</template>


<script>
    import { getTasks } from '../data.js';
    import Spinner from './spinner.vue';
    import Error from './error.vue';

    export default {
        name: 'tasks',
        props: ['username'],
        components: { Spinner, Error },

        data: function () {
            return {
                tasks: null,
                working: false,
                error: null
            };
        },

        created: function () {
            this.working = true;
            getTasks(this.username)
                .then(tasks => this.tasks = tasks)
                .catch(error => { this.error = error; })
                .then(() => this.working = false);
        }
    };
</script>
