<template>
    <div class="wrapper">
        <nav class="navbar navbar-static-top navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <a class='navbar-brand' href='/'>Boomerang</a>
                </div>

                <ul class="nav navbar-nav pull-right">
                    <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In</a></li>
                    <li><a href="/signup"><span class="glyphicon glyphicon-check"></span>&nbsp;Sign Up</a></li>

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>&nbsp;vsemionov<span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="/settings"><span class="glyphicon glyphicon-cog"></span>&nbsp;Settings</a></li>
                            <li><a href="/logout"><span class="glyphicon glyphicon-log-out"></span>&nbsp;Log Out</a></li>
                        </ul>
                    </li>
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
    export default {
        name: 'boomerang'
    };
</script>
