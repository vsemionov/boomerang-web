<template>
    <b-navbar toggleable="md" type="light" variant="light" class="mt-2">

        <b-navbar-brand :to="{ name: 'index' }">Boomerang</b-navbar-brand>

        <b-nav-toggle target="collapse"></b-nav-toggle>

        <b-collapse is-nav id="collapse">

            <b-nav is-nav-bar>
                <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
            </b-nav>

            <b-nav is-nav-bar class="ml-auto">

                <template v-if="!authState.username">
                    <b-nav-item :to="{ name: 'login' }"><span class="fa fa-sign-in"></span>&nbsp;Log In</b-nav-item>
                    <b-nav-item :href="apiAccountsBaseUrl + 'signup/'" target="_blank"><span class="fa fa-check-square-o"></span>&nbsp;Sign Up</b-nav-item>
                </template>

                <template v-else>
                    <b-nav-item-dropdown :text="authState.username" right>
                        <b-dropdown-item :href="apiAccountsBaseUrl + 'email/'" target="_blank"><span class="fa fa-cog"></span>&nbsp;Settings</b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'logout' }"><span class="fa fa-sign-out"></span>&nbsp;Log Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </template>

            </b-nav>

        </b-collapse>
    </b-navbar>
</template>


<script>
    import { authState } from '../auth.js';
    import { BASE_URL } from '../urls.js';

    export default {
        name: 'navbar',

        data: function () {
            return {
                authState,
                apiAccountsBaseUrl: BASE_URL + 'accounts/'
            };
        }
    };
</script>
