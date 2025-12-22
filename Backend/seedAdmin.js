require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/user');

(async () => {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(process.env.MONGO_URL);

    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists. No action taken.');
      process.exit(0);
    }

    const admin = new User({
      name: 'Bikram',
      email: 'bikram@email.com',
      password: 'bikram123',
      role: 'admin'
    });

    await admin.save();
    console.log(' Admin user created successfully');

    process.exit(0);
  } catch (err) {
    console.error(' Error seeding admin:', err);
    process.exit(1);
  }
})();
