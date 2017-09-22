<template>
    <div>
        <template v-if="!editing">
            <b-button variant="outline-secondary" class="pull-right" @click="edit"><span class="fa fa-pencil"></span></b-button>

            <slot></slot>
        </template>

        <template v-else>
            <b-form @submit.prevent="save" @keydown.esc="cancel">
                <b-form-row>
                    <b-col col>
                        <b-form-input ref="input" type="text" v-model.trim="value" :state="valid"></b-form-input>
                        <b-form-feedback>Enter 1 to 128 characters</b-form-feedback>
                    </b-col>

                    <b-col cols="12" md="auto" class="mt-2 mt-md-0">
                        <b-button type="submit" variant="primary">Save</b-button>
                        <b-button variant="secondary" @click="cancel">Cancel</b-button>
                    </b-col>
                </b-form-row>
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
