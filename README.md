Welcome to KPopular! the Kpop collection site!

WHAT DOES IT DO?

This site collects information from Spotify based on a list of artist IDs from the SQL server. It then displays all albums that are physically collectable which include Full albums and EPs.

Users will be able to sign in with their Spotify account, and add albums to their collection. Their Profile will be able to display all the albums they have collected.

SETUP

Requirements: - SQL - Spotify API ( create a spotify app using the following instructions: https://developer.spotify.com/documentation/web-api )

SQL

- create database titled Kpopular by typing CREATE DATABASE KPOPULAR; into sql cmd

SERVER-SIDE

- cd into the server folder and type into the cmd: npm install
- Create your .env file for the server folder, example of .env file is labeled server.env.sample
- we will need to run the knex commands in terminal :

  - npx knex migrate:latest
  - npx knex seed:run

- Check if Tables were created. There should be 3: artists, user, usercollection

- run server by typing: node index.js

CLIENT-SIDE

- cd into the client folder and run: npm install
- please create a .env using the client.env.sample as an example.
- run the application use npm start
