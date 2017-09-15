<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link :to="{ name: 'index' }" class="navbar-brand" @click.native="$event.target.blur()">Boomerang</router-link>
            </div>

            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <router-link tag="li" :to="{ name: 'about' }" active-class="active"><a>About</a></router-link>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <template v-if="!authState.username">
                        <router-link tag="li" :to="{ name: 'login' }" active-class="active"><a><span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In</a></router-link>
                        <li><a :href="apiAccountsBaseUrl + 'signup/'" target="_blank"><span class="glyphicon glyphicon-check"></span>&nbsp;Sign Up</a></li>
                    </template>

                    <template v-else>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>&nbsp;{{ authState.username }}<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a :href="apiAccountsBaseUrl + 'email/'" target="_blank"><span class="glyphicon glyphicon-cog"></span>&nbsp;Settings</a></li>
                                <li><router-link :to="{ name: 'logout' }"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</router-link></li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
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
