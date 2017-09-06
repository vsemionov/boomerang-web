Boomerang-Web
=============

Boomerang front-end
-------------------


### Website

https://boomerang-notes.herokuapp.com/


### Deployment

#### Local
* install *node.js* (version 6)
* build: `npm install`
* start: `npm start`

#### Heroku
* install *heroku toolbelt*
* create a heroku application, add buildpacks *heroku/nodejs* and *https://github.com/heroku/heroku-buildpack-static*
* connect: `heroku login && heroku git:remote -a <app_name>`
* deploy: `git push heroku`
