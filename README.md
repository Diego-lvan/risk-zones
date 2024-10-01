# Table of contents

- [Intro](#intro)
- [Development Setup](#requirements)
- [Examples](#examples)

## Intro <a name="intro"></a>

TODO

## Development Setup with Docker for the database <a name="requirements"></a>
### First, clone the repository with git 
```bash 
git clone https://github.com/Diego-lvan/price-tracker.git](https://github.com/Diego-lvan/risk-zones/
cd risk-zones/api
```
### Install dependencies
```bash
npm i

```
### Add environment variables
Create a .env file in ./api with the next variables (you can change values if you want)
```bash
TWILIO_AUTH_TOKEN=[your twilio secret token]
TWILIO_ACCOUNT_SID=[your twilio id account]
TWILIO_FROM_NUMBER=[your twilio number]
DB_PASSWORD=[your db password]
DB_PORT=[3002]
```
### Run Docker container
```bash
docker compose up
```
