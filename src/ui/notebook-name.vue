<template>
    <div>
        <template v-if="!editing && !working">
            <b-button variant="outline-secondary" class="pull-right" v-b-tooltip.hover.top title="Delete" v-b-modal.confirmModal><span class="fa fa-times"></span></b-button>
            <b-button variant="outline-secondary" class="pull-right" @click="edit" v-b-tooltip.hover.top title="Edit"><span class="fa fa-pencil"></span></b-button>

            <slot></slot>
        </template>

        <template v-else>
            <b-form @submit.prevent="save" @keydown.esc="cancel">
                <b-form-row>
                    <b-col col>
                        <b-form-input ref="input" type="text" v-model.trim="value" :state="valid"  :disabled="working"></b-form-input>
                        <b-form-feedback>Enter 1 to 128 characters</b-form-feedback>
                    </b-col>

                    <b-col cols="12" md="auto" class="mt-2 mt-md-0">
                        <b-button type="submit" variant="primary"  :disabled="working">Save<span v-if="working" class="fa fa-circle-o-notch fa-spin fa-fw"></span></b-button>
                        <b-button variant="secondary" @click="cancel" :disabled="working">Cancel</b-button>
                    </b-col>
                </b-form-row>
            </b-form>
        </template>

        <b-modal id="confirmModal" title="Confirm deletion" ok-title="Delete" ok-variant="danger" @ok="remove">
            Are you sure you want to delete notebook <b>{{ notebook.name }}</b>?
        </b-modal>

        <b-modal v-if="error" title="Error" ok-only ok-title="Close" :visible="true" @hidden="error = null">
            <error :error="error"></error>
        </b-modal>
    </div>
</template>


<script>
    import { renameNotebook } from '../data.js';
    import Error from './error.vue';

    export default {
        name: 'notebook-name',
        components: { Error },
        props: ['notebook'],

        data: function () {
            return {
                editing: false,
                value: false,
                working: false,
                error: null
            };
        },

        computed: {
            valid: function () {
                return this.value.length > 0 && this.value.length <= 128 ? null : false;
            }
        },

        methods: {
            edit: function () {
                this.value = this.notebook.name;
                this.editing = true;
                this.$nextTick(() => this.$refs.input.focus());
            },

            cancel: function () {
                this.editing = false;
            },

            save: function () {
                const valid = this.valid;
                if (valid === null || valid === true || valid === 'valid') {
                    this.editing = false;
                    this.working = true;

                    renameNotebook(this.notebook, this.value)
                        .then(notebook => { this.notebook.updated = notebook.updated; this.notebook.name = notebook.name; })
                        .catch(error => this.error = error)
                        .then(() => this.working = false);
                }
            },

            remove: function () {
            }
        }
    };
</script>
