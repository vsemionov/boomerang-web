<template>
    <div>
        <template v-if="!editing">
            <b-button variant="outline-secondary" class="pull-right" @click="edit"><span class="fa fa-pencil"></span></b-button>
            <slot></slot>
        </template>

        <template v-else>
            <b-form @submit.prevent="save" @keydown.esc="cancel">
                <b-row>
                    <b-col cols="12" sm="7" md="8" lg="9" xl="9">
                        <b-form-input ref="input" type="text" v-model.trim="value" :state="valid"></b-form-input>
                        <b-form-feedback>Enter 1 to 128 characters</b-form-feedback>
                    </b-col>
                    <b-col cols="12" sm="5" md="4" lg="3" xl="3">
                        <b-row>
                            <b-col cols="6">
                                <b-button type="submit" variant="primary" block>Save</b-button>
                            </b-col>
                            <b-col cols="6">
                                <b-button variant="secondary" @click="cancel" block>Cancel</b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
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
