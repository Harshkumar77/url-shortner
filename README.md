# Minify

A url shortner with url configuration , tracking and analytics

## Backend

### Routes

1. POST **/api/generate**
   - Generates url
   - Takes expiration time , long url
   - returns short url link

### Data Models

Made using prisma + mongoDB

1. USER

- NAME , ACCOUNT CREATED , URLS , AUTH

2. URL

- URL , SHORT ID , EXPIRATION TIME , TOTAL_CLICKS , CLICKS_BY_COUNTRY , CLICKS_BY_TIME
