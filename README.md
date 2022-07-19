# Minify

A url shortner with url configuration , tracking and analytics - [LIVE 🔴](http://v-7.herokuapp.com/)

## Features 
1. Short long urls.
1. Add limit and expiring date to the url
1. View demographics of clickers and limit usage in graphical form
1. Beautiful and Responsive Landing page and modern interface

## Tech Stack

- 🌐 **Client** : React , Tailwind CSS , Typescript
- 💽 **Server** : Express , Passport ,  Mongoose
- 🔢 **DataBase** : MongoDB
- ✈️ **Deployed On** : Heroku

## Technical notes
- Monolith architecture , client build with vite and a server with express
- Why **MongoDB** ? Faster than sql database for Key - Value pair searching and the datamodels were not too complex 
- **Generation of unique ids** for urls : Using first 6 digits of hash of Nth url generated. That way we can also assign ranges to multiple server for generation.

## Future Notes
- Checking if short id collide (Skipped because very unlikely to happen)
- Change advance button from checkbox to slider
- Add slide animation when advance button in toogled
