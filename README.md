## About CMS

CMS - Camp Management System is a web-based application that enables the management of Camps, it covers the following
functionalities,

1. Managing Company
2. Managing Camps, Blocks and Rooms
3. Managing Members
4. Managing Camp room checkins and checkouts (Recording Members onsite and offsite periods).
5. Notifying members when they are checked out through sms.

## Installation

After unzip the project, open it with command tool and run the following commands,

1. composer install
2. npm install

Then, copy and paste the .env.example file and rename it to .env (remove the .example)

Open the phpmyadmin using Xampp and create a new database.

Open the .env file you created and fill the DB_DATABASE with the database name you created.

Run this command to create tables "php artisan migrate".

Then run these commands on different tabs to start the application,

1. php artisan serve
2. npm run dev

Access the application on the browser through http://127.0.0.1:8000
