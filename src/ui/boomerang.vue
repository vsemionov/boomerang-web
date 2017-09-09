<template>
    <div class="wrapper">
        <nav class="navbar navbar-static-top navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <a class='navbar-brand' href='/'>Boomerang</a>
                </div>

                <ul class="nav navbar-nav pull-right">
                    <template v-if="!isLoggedIn()">
                        <li><router-link to="/login"><span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In</router-link></li>
                        <li><router-link to="/signup"><span class="glyphicon glyphicon-check"></span>&nbsp;Sign Up</router-link></li>
                    </template>

                    <template v-else>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>&nbsp;vsemionov<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><router-link to="/settings"><span class="glyphicon glyphicon-cog"></span>&nbsp;Settings</router-link></li>
                                <li><router-link to="/logout"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</router-link></li>
                            </ul>
                        </li>
                    </template>
                </ul>
            </div>
        </nav>

        <div class="container">
            <h1>Boomerang</h1>
            <router-view></router-view>
        </div>
    </div>
</template>


<script>
    import { isLoggedIn } from '../auth.js';

    export default {
        name: 'boomerang',
        methods: {
            isLoggedIn() {
                return isLoggedIn();
            }
        }
    };
</script>
