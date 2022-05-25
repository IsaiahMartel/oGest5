<p align="center"><a href="https://ofgrancanaria.com/es/" target="_blank"><img src="https://ofgrancanaria.com/wp-content/uploads/2020/03/Group.png" width="400"></a></p>

# OrquestaFilarmonicaGC
    
### IONIC-frontend

Switch to the repo folder

    cd OrquestaFilarmonicaGC/fronted/

Install all the dependencies using npm

    npm install

Start the local development server

    ionic serve -l
    
### Laravel-backend

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.4/installation#installation)

Alternative installation is possible without local dependencies relying on [Docker](#docker). 

Switch to the repo folder

    cd OrquestaFilarmonicaGC/backend/

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Generate a new application key

    php artisan jwt:secret
    
Clear cache

    php artisan config:clear
    
Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve
    
WebSockets

    php artisan websockets:serve
    
**Make sure you set the correct database connection information before running the migrations** [Environment variables](#environment-variables)

    php artisan migrate
    php artisan serve

***Note*** : It's recommended to have a clean database before seeding. You can refresh your migrations at any point to clean the database by running the following command

    php artisan migrate:refresh
    
