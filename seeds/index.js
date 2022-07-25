import cities from './cities.js';
import mongoose from 'mongoose';
import Campground from '../models/campground.js';
import { descriptors, places } from './seedHelpers.js';

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // Your User Id
      author: '62c5e28056717c8620086f48',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/df4ivtgni/image/upload/v1657991185/YelpCamp/oi9mhcq7kgb8znijhp3y.jpg',
          filename: 'YelpCamp/anfnenvca4tha00h2ubt',
        },
        {
          url: 'https://res.cloudinary.com/df4ivtgni/image/upload/v1657987406/YelpCamp/e8lj6uazahwxgvxtjhxj.jpg',
          filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  console.log('Seeds data inserted -- closing database');
  mongoose.connection.close();
});
