<template>
    <div>
        <h1>Notes</h1>

        <a href="#" v-for="note in notes">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">{{ note.title }}</h3>
                </div>
                <div class="panel-body">{{ note.text }}</div>
            </div>
        </a>

        <spinner v-if="working"></spinner>

        <error v-if="error" :error="error"></error>
    </div>
</template>


<script>
    import { getNotes } from '../data.js';
    import Spinner from './spinner.vue';
    import Error from './error.vue';

    export default {
        name: 'notes',
        props: ['username', 'notebook_id'],
        components: { Spinner, Error },

        data: function () {
            return {
                notes: null,
                working: false,
                error: null
            };
        },

        created: function () {
            this.working = true;
            getNotes(this.username, this.notebook_id)
                .then(notes => this.notes = notes)
                .catch(error => { this.error = error; })
                .then(() => this.working = false);
        }
    };
</script>
