// Compatibility scoring algorithms
export const calculateCompatibility = (user1, user2) => {
  const scores = {
    lifestyle: calculateLifestyleScore(user1, user2),
    schedule: calculateScheduleScore(user1, user2),
    interests: calculateInterestsScore(user1, user2),
    preferences: calculatePreferencesScore(user1, user2),
    location: calculateLocationScore(user1, user2)
  };

  // Weighted average (lifestyle and preferences are most important)
  const totalScore = (
    scores.lifestyle * 0.3 +
    scores.schedule * 0.2 +
    scores.interests * 0.15 +
    scores.preferences * 0.25 +
    scores.location * 0.1
  );

  return {
    total: Math.round(totalScore * 100),
    breakdown: scores,
    matchLevel: getMatchLevel(totalScore)
  };
};

const calculateLifestyleScore = (user1, user2) => {
  let score = 0;
  const maxScore = 5;

  // Cleanliness
  if (user1.cleanliness === user2.cleanliness) score += 1;
  else if (Math.abs(user1.cleanliness - user2.cleanliness) === 1) score += 0.5;

  // Social vs Quiet
  if (user1.socialLevel === user2.socialLevel) score += 1;
  else if (Math.abs(user1.socialLevel - user2.socialLevel) === 1) score += 0.5;

  // Smoking
  if (user1.smoking === user2.smoking) score += 1;

  // Pets
  if (user1.pets === user2.pets) score += 1;
  else if (user1.petsTolerance && user2.pets) score += 0.5;

  // Guests
  if (user1.guests === user2.guests) score += 1;

  return score / maxScore;
};

const calculateScheduleScore = (user1, user2) => {
  let score = 0;
  const maxScore = 4;

  // Sleep schedule
  if (user1.sleepSchedule === user2.sleepSchedule) score += 1;
  else if (Math.abs(user1.sleepSchedule - user2.sleepSchedule) === 1) score += 0.5;

  // Work schedule
  if (user1.workSchedule === user2.workSchedule) score += 1;

  // Morning person vs Night owl
  if (user1.dayPreference === user2.dayPreference) score += 1;

  // Weekend schedule
  if (user1.weekendSchedule === user2.weekendSchedule) score += 1;

  return score / maxScore;
};

const calculateInterestsScore = (user1, user2) => {
  if (!user1.interests || !user2.interests) return 0.5;

  const commonInterests = user1.interests.filter(interest =>
    user2.interests.includes(interest)
  ).length;

  const totalUniqueInterests = new Set([...user1.interests, ...user2.interests]).size;

  return commonInterests / totalUniqueInterests;
};

const calculatePreferencesScore = (user1, user2) => {
  let score = 0;
  const maxScore = 5;

  // Budget range (within 20% is good match)
  const budgetDiff = Math.abs(user1.maxBudget - user2.maxBudget) / Math.max(user1.maxBudget, user2.maxBudget);
  if (budgetDiff <= 0.2) score += 1;

  // Lease duration
  if (user1.leaseDuration === user2.leaseDuration) score += 1;

  // Location preference
  if (user1.locationPreference === user2.locationPreference) score += 1;

  // Room type preference
  if (user1.roomType === user2.roomType) score += 1;

  // Move-in date (within 2 weeks is good match)
  const dateDiff = Math.abs(new Date(user1.moveInDate) - new Date(user2.moveInDate)) / (1000 * 60 * 60 * 24);
  if (dateDiff <= 14) score += 1;

  return score / maxScore;
};

const calculateLocationScore = (user1, user2) => {
  // Simple location proximity score
  if (user1.preferredArea === user2.preferredArea) return 1;
  if (user1.preferredArea === user2.secondaryArea || user2.preferredArea === user1.secondaryArea) return 0.7;
  return 0.3;
};

const getMatchLevel = (score) => {
  if (score >= 0.8) return 'Excellent';
  if (score >= 0.6) return 'Good';
  if (score >= 0.4) return 'Fair';
  return 'Poor';
};

// Filter and sort potential matches
export const findBestMatches = (currentUser, allUsers, limit = 10) => {
  const matches = allUsers
    .filter(user => user.id !== currentUser.id) // Exclude self
    .map(user => ({
      user,
      compatibility: calculateCompatibility(currentUser, user)
    }))
    .filter(match => match.compatibility.total >= 40) // Minimum 40% compatibility
    .sort((a, b) => b.compatibility.total - a.compatibility.total)
    .slice(0, limit);

  return matches;
};

// Mock data generator for demo
export const generateMockUser = (id, baseUser) => ({
  id,
  name: `User${id}`,
  age: Math.floor(Math.random() * 15) + 20, // 20-35
  occupation: ['Software Engineer', 'Student', 'Designer', 'Teacher', 'Nurse', 'Accountant'][Math.floor(Math.random() * 6)],
  bio: 'Looking for a compatible roommate to share expenses and create a comfortable living environment.',
  maxBudget: Math.floor(Math.random() * 500) + 300,
  preferredArea: ['Kibagabaga', 'Kicukiro', 'Nyarutarama', 'Gikondo'][Math.floor(Math.random() * 4)],
  ...baseUser
});