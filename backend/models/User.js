const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  phone: String,
  location: String,
  bio: String,
  occupation: String,
  interests: [String],
  preferences: {
    // Original fields
    cleanliness: Number,
    socialLevel: Number,
    smoking: Boolean,
    pets: Boolean,
    petsTolerance: Boolean,
    guests: String,
    sleepSchedule: Number,
    workSchedule: String,
    nightOwl: Boolean,
    earlyBird: Boolean,
    maxBudget: Number,
    preferredArea: String,
    roomType: String,
    // New lifestyle fields
    dailyRoutine: String,
    socialEnergy: String,
    noisePreference: String,
    workLifestyle: String,
    visitors: String,
    dishesAttitude: String,
    weekendVibe: String,
    morningEnergy: String,
    cleanlinessLevel: Number,
    noiseLevel: Number,
    smokingTolerance: Number,
    petTolerance: Number,
    isSmoker: Boolean,
    hasPets: Boolean,
    comfortableWithSmokers: Boolean,
    okayWithPets: Boolean,
    shareGroceries: Boolean,
    shareCooking: Boolean,
    noSmokers: Boolean,
    noPets: Boolean,
    noFrequentVisitors: Boolean,
    genderPreference: String,
    vibes: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
