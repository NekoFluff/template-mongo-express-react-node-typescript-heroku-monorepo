# Purpose

This is a template monorepo for a full-stack application that can be easily be deployed to Heroku.

Some key technologies:

Frontend (a.k.a package/client): `create-react-app`, `typescript`
Backend (a.k.a package/server): `mongodb`, `express`, `nodejs`, `typescript`
Shared Things (a.k.a package/common): `typescript`

Requires `yarn` to run to make sure to install that with `npm`

Questions? My email is `alexnou@gmail.com`


# How to use

I broke up the set up into four steps (listed below).


## 1. Set up Files

- Clone or download repo
- run `yarn` (installs dependencies)
- add a `.env` file to the `packages/server` with some variables:

```
  MONGO_CONNECTION_URL=<insert mongodb connection url here>
  PORT=8080 (if you choose a different port, update the proxy port in packages/client/setupProxy.js)
```

## 2. Set up MongoDB

Note: You can get a free Atlas cluster from MongoDB and get the connection url for it

Create a database named `sample-db` with an `items` collection. This is used by the `ItemRepository class` that comes with this project to test the DB by inserting and retrieving a simple `Item` object.


## 3. Start up the Development environment!

- Open up three terminals from the root folder
- Run `npm run start-common-dev` in one terminal
- Run `npm run start-server-dev` in one terminal
- Run `npm run start-client-dev` in one terminal

Now you should be able to see the react app working!


## 4. Add this code to your own github repo (optional)

- If you don't now know how, now's a good time as ever to find out how to add code to a github repo.
- There are plenty of online guides.


## 5. Send it to Heroku!

- Install heroku command line tools (CLI) if you haven't already.


### Create heroku apps

- Create an app for the client

`heroku create my-test-client-app --remote heroku-test-client`

- Create an app for the server

`heroku create my-test-server-app --remote heroku-test-server`


### Add buildpacks for the client

- Add the monorepo buildpack to the client

`heroku buildpacks:set https://github.com/lstoll/heroku-buildpack-monorepo --app my-test-client-app --index 1`

- Add the create-react-app buildpack to the client

`heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git --app my-test-client-app --index 2`

- Note: You can actually ignore the `--index` flag as long as you add the `monorepo` buildpack first then the `create-react-app` buildpack second. ORDER MATTERS.


### Add buildpacks for the server

- Add the Multi-profile buildpack to the server

`heroku buildpacks:set https://github.com/heroku/heroku-buildpack-multi-procfile --app my-test-server-app --index 1`

- Add the Multi-profile buildpack to the server

`heroku buildpacks:set heroku/nodejs --app my-test-server-app --index 2`


### Add the config variables for the client

- Set the PROCFILE environment variable for the server ...for the proxy to work on prod

`heroku config:set API_URL=https://my-test-server-app.herokuapp.com --app my-test-client-app`

- Set the MONGO_CONNECTION_URL environment variable for the server (used by the monorepo buildpack)

`heroku config:set APP_BASE=packages/client --app my-test-client-app`


### Add the config variables for the server

- Set the PROCFILE environment variable for the server

`heroku config:set PROCFILE=packages/server/Procfile --app my-test-server-app`

- Set the MONGO_CONNECTION_URL environment variable for the server

`heroku config:set MONGO_CONNECTION_URL=<your mongodb connection url> --app my-test-server-app`

- Upload the server the heroku

`git push heroku-test-client master`

- Upload the client to heroku

`git push heroku-test-server master`

You're done! Now you should be able to visit the your heroku app and it should all be working!


# Proxy Notes

- All api requests on the client such as `/api/whatever` get shortened to `/whatever` when it hits the express server due to the proxy defined.
- Edit the proxy for prod in `static.json` in the `packages/client` folder
- Edit the proxy for dev in `setupProxy.js` in the `packages/client/src` folder
