<template>
    <div>
        <template v-if="!editing">
            <b-button variant="outline-secondary" class="pull-right" @click="edit"><span class="fa fa-pencil"></span></b-button>
            <slot></slot>
        </template>

        <template v-else>
            <b-form @submit.prevent="save" @keydown.esc="cancel">
                <b-input-group>
                    <b-form-input ref="input" type="text" v-model.trim="value" :state="valid"></b-form-input>
                    <b-form-feedback>Enter 1 to 128 characters</b-form-feedback>
                    <b-input-group-button><b-button type="submit" variant="primary">Save</b-button></b-input-group-button>
                    <b-input-group-button><b-button variant="secondary" @click="cancel">Cancel</b-button></b-input-group-button>
                </b-input-group>
            </b-form>
        </template>
    </div>
</template>


<script>
    export default {
        name: 'notebook-name',
        props: ['notebook'],

        data: function () {
            return {
                editing: false,
                value: false
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
                if (valid == null || valid == true || valid == 'valid') {
                    this.editing = false;
                    this.notebook.name = this.value;
                }
            }
        }
    };
</script>
