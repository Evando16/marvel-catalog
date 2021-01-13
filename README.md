# MarvelCatalog
This project it's using:
- [Angular 11](https://angular.io/)
- [Marvel API](https://developer.marvel.com/docs)
- [NodeJs Express](https://expressjs.com/)
- [SASS](https://sass-lang.com/)

## Features
* [x] Comic list
* [x] Character list
* [x] Comic details
* [x] Filters

## Project structure
The structure of this project it's based on `folder-by-feature` and you will be able see some advantages bellow (try to take a look in the project structure first).

- src/
    - app/
        - core/
        - character/
        - comic/
        - shared/
            - component/
            - constant/
            - interface/
            - utils/
-  assests/
    -  fonts/
-  environments/

 In a structure like that you will easily indentify the systeam features and easily find a features files (e.g when you have a problem in a feature), just with files names you are able to know what that file contains (e.g `.spec` will have tests), all your features code will be separeted and organized (e.g each feature being a module), make it easy the *lazy loading* strategy, etc. You can read more about [LIFT](https://angular.io/guide/styleguide#lift) guidelines and [folder-by-feature](https://angular.io/guide/styleguide#folders-by-feature-structure)
 
# How to run
Since this project use the Marvel API, you have to follow some steps before run the application:
1. [Sign in](https://developer.marvel.com/account) on Marvel API 
2. Allow your domain to acess the API (if you are using `localhost` you also have to allow it)
##### In case you are running local
3. Create a new `environment.local.ts` on `src\environments` folder with the following structure:
```
export const environment = {
  production: false,
  marvelPublicKey: 'YOUR_PUBLIC_MARVEL_API'
};
```
4. Just run using `npm run start:hmr` or `ng serve --configuration=local`
##### In case you are running in a server
5.  You will have to setup your public Marvel API in you enviroment
6.  Create a script or use the `envConfig.js`, on root folder, to fill the `marvelPublicKey` on Angular enviroment file with **YOUR** public Marvel API 
    6.1.  The `environment.prod.ts` is already setup with a `marvelPublicKey: '$API_KEY'`
7.  Deploy it
    7.1. Take a look on [Heroku](https://www.heroku.com/)

## Tests
- 100% `.ts` file coverage with unitary tests
- Componet tests just to the main flow

#### Running tests
- `npm run test` to generate code coverage
    - open `coverage\marvel-catalog\index.html` to see the coverage
- `ng test` just run all the tests
