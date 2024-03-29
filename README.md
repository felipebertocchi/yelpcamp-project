<div id="top"></div>

<p align="center">
  <a href="https://yelpcamp-p1p4.onrender.com" target="_blank">
    <img src=https://github.com/felipebertocchi/yelpcamp-project/blob/main/frontend/src/assets/logo-dark.png?raw=true/>
  </a>
</p>

YelpCamp is a website where users can browse, create and review campgrounds. This project is part of The Web Developer Bootcamp course by Colt Steele in Udemy. It was developed using Node.js, Express, MongoDB & Bootstrap. Passport.js was used to handle user authentication.

---

## Features
  - User registration & authentication
  - Browse, create and edit campgrounds
  - Submit campground reviews

## Prequisites
* [Node.js 14 or higher](https://nodejs.org/es/)
* [Local MongoDB](https://www.mongodb.com/docs/manual/installation/) (or set up and use [Mongo Atlas](https://www.mongodb.com/atlas))
* [Cloudinary](https://cloudinary.com/) account
* [Mapbox](https://account.mapbox.com/) account

## 🛠️ Install
Start by cloning the repository
  ```sh
  git clone https://github.com/felipebertocchi/yelpcamp-project
  ```
   
Then switch to the project's folder and install all dependencies
  ```sh
  cd yelpcamp-project && npm install
  ```

### .env file

To run this project, you need to create a .env file in the root of the project with the following parameters:
  ```sh
  MONGODB_URI=mongodb://localhost:27017/yelpcamp

  SESSION_SECRET=***********************
  
  UNSPLASH_API_KEY=********************************************

  CLOUDINARY_CLOUD_NAME=**********
  CLOUDINARY_API_KEY=**********************
  CLOUDINARY_SECRET=**********************************

  MAPBOX_TOKEN=********************************************************************
  ```
> *Unsplash API key is only required for running the seeds file, while Mapbox is required to display the map and Cloudinary to upload images*
<br>

> If you prefer to use Mongo Atlas instead, you should replace MONGODB_URI string with the [connection string provided by Mongo Atlas](https://www.mongodb.com/docs/guides/atlas/connection-string/):
  ```sh
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster.******.mongodb.net/prod?retryWrites=true&w=majority
  ```

## 🚀 Usage

  ```sh
  npm start
  ```
<br>

If all goes well, this should appear in the console:

> [mongodb] database connected <br>
> Webserver running on http://localhost:3000

## 🌐 Live Demo

### [YelpCamp on Render](https://yelpcamp-p1p4.onrender.com)

## 🛣️ Roadmap

- [x] Campgrounds index pagination
- [x] Search campgrounds by name
- [x] Sort campgrounds by price, rating, etc
- [ ] User profiles
- [ ] Campground bookmarks
- [ ] Search autocomplete/suggestions

## 🤝 Contributing
Contributions, issues and feature requests are welcome <br>
Don't foget to leave a star! ⭐

## 💻 Author
Felipe Bertocchi - fabertocchi@gmail.com
<p align="right"><a href="#top">Go to top</a></p>
