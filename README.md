# Genesis SE School: Practice task

    Web API for current BTC price in UAH with the login/sign up.

## Introduction

### Requirements

    1. git
    2. node.js
    3. npm

### Commands for setup and run server

    1. Clone the current repository
    : git clone https://github.com/Berkendorff/BTC-UAH_test.git;
    2. Go to the new directory: cd BTC-UAH_test;
    3. Install dependencies: npm i;
    4. Run server: node server.js .

    The server runs at http://localhost:8000 by default.

### Endpoints

1. ```/user/create```:

    type: POST

    header: { ContentType: "application/x-www-form-urlencoded" }

    body: { email: string!, password: string! }

    return: string

2. ```/user/login```:

    type: POST

    header: { ContentType: "application/x-www-form-urlencoded" }

    body: { email: string!, password: string! }

    return: { token: string }

3. ```/btcRate```:

    type: GET

    query: { secret_token: string! }

    return: { btcRate: number, message: string }

### Using

    1. Create a user by the first endpoint with some email and password.
    2. Login and get secure_token by the second endpoint by the email and password.
    3. Enter secure_token to the query of request like this: http://localhost:8000/btcRate?secret_token={{secret_token}}

Also, you can try the following [link](https://btc-uah.herokuapp.com/index.html) and get Postman collection.

### Used API`s

    1. https://bank.gov.ua/ - for USD/UAH rate
    2. https://blockchain.info/ - for BTC/USD rate
