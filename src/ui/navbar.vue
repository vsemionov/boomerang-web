<template>
    <nav class="navbar navbar-static-top navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand" @click.native="$event.target.blur()">Boomerang</router-link>
            </div>

            <ul class="nav navbar-nav pull-right">
                <template v-if="!authState.username">
                    <li><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In</router-link></li>
                    <li><router-link to="/signup"><span class="glyphicon glyphicon-check"></span>&nbsp;Sign Up</router-link></li>
                </template>

                <template v-else>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>&nbsp;{{authState.username}}<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/settings"><span class="glyphicon glyphicon-cog"></span>&nbsp;Settings</router-link></li>
                            <li><router-link to="/logout"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</router-link></li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<script>
    import { authState } from '../auth.js';

    export default {
        name: 'navbar',
        data () {
            return { authState };
        }
    };
</script>
