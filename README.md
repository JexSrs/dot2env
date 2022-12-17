# dot2env | dotenv environment

This library allows the user to read different `.env` files based on the environment
variable (`NODE_ENV`).

This project was inspired from [`dotenv`](https://github.com/motdotla/dotenv).

## Install
```shell
npm install dot2env
```

## Usage

## Simple

Create a `.env` file in the root of your project:
```
USERNAME="jex"
password="secret"
```

As early as possible in your application, import and configure dot2env:
```typescript
import "dot2env";

console.log(process.env.USERNAME);
console.log(process.env.PASSWORD);
```

## Environments
The supported environments are:
* `production`, `prod`
* `staging`, `stage`
* `testing`, `test`
* `development`, `dev`

For each environment you will have to create a `.env.[environment]` file (using the full name).

Now everytime you call your application using an environment,
it will automatically import all the variables in that file.

For example, running:
```shell
NODE_ENV=production node index.js
```
will import only the `.env.production` file.
 
If the `.env.[environment]` file is not found, it will always fallback to the `.env` file.

## Override default variables
If you want to override existing environment variables, use the `override` option.
```typescript
import {load} from "dot2env";

load({override: true});
```

## Custom mapping
In case you want to add more environments or use custom ones you can define your own mapping:
```typescript
import {load} from "dot2env";

load({
    envMap: {
        development: '.env.development',
        testing: '.env.testing',
        staging: '.env.staging',
        production: '.env.production',
        'custom-env': '.env.custom-environment'
    }
})
```