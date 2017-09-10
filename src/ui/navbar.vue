<template>
    <nav class="navbar navbar-static-top navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand" @click.native="$event.target.blur()">Boomerang</router-link>
            </div>

            <ul class="nav navbar-nav pull-right">
                <template v-if="!authState.username">
                    <router-link tag="li" to="/login" active-class="active"><a href="/login"><span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In</a></router-link>
                    <li><a :href="apiAccountsBaseUrl + 'signup/'" target="_blank"><span class="glyphicon glyphicon-check"></span>&nbsp;Sign Up</a></li>
                </template>

                <template v-else>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>&nbsp;{{authState.username}}<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a :href="apiAccountsBaseUrl + 'email/'" target="_blank"><span class="glyphicon glyphicon-cog"></span>&nbsp;Settings</a></li>
                            <li><router-link to="/logout"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</router-link></li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<script>
    import { authState, updateAuthState } from '../auth.js';
    import { BASE_URL } from '../urls.js';

    export default {
        name: 'navbar',
        data: function () {
            return {
                authState,
                apiAccountsBaseUrl: BASE_URL + 'accounts/'
            };
        },
        created: function () {
            updateAuthState();
        }
    };
</script>
