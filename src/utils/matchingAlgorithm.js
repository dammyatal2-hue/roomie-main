export const filterAndSortMatches = (potentialRoommates, userProfile) => {
  return potentialRoommates.map(roommate => ({
    ...roommate,
    matchScore: calculateMatchScore(roommate, userProfile)
  })).sort((a, b) => b.matchScore - a.matchScore);
};

export const calculateMatchScore = (roommate, userProfile) => {
  let score = 0;
  let totalFactors = 0;

  // Budget compatibility (30% weight)
  if (userProfile.budget && roommate.budget) {
    const budgetDiff = Math.abs(userProfile.budget - roommate.budget);
    const budgetScore = Math.max(0, 100 - (budgetDiff / 100));
    score += budgetScore * 0.3;
  } else {
    score += 75 * 0.3; // Default score if no budget info
  }
  totalFactors += 0.3;

  // Cleanliness compatibility (25% weight)
  if (userProfile.cleanliness && roommate.cleanliness) {
    const cleanlinessScore = userProfile.cleanliness === roommate.cleanliness ? 100 : 60;
    score += cleanlinessScore * 0.25;
  } else {
    score += 70 * 0.25;
  }
  totalFactors += 0.25;

  // Sleep schedule compatibility (20% weight)
  if (userProfile.sleepSchedule && roommate.sleepSchedule) {
    const sleepScore = userProfile.sleepSchedule === roommate.sleepSchedule ? 100 : 50;
    score += sleepScore * 0.2;
  } else {
    score += 70 * 0.2;
  }
  totalFactors += 0.2;

  // Smoking compatibility (15% weight)
  if (userProfile.smoking && roommate.smoking) {
    const smokingScore = userProfile.smoking === roommate.smoking ? 100 : 30;
    score += smokingScore * 0.15;
  } else {
    score += 70 * 0.15;
  }
  totalFactors += 0.15;

  // Pet compatibility (10% weight)
  if (userProfile.pets && roommate.pets) {
    const petScore = userProfile.pets === roommate.pets ? 100 : 60;
    score += petScore * 0.1;
  } else {
    score += 70 * 0.1;
  }
  totalFactors += 0.1;

  return Math.round(score / totalFactors);
};

export const getCompatibilityLevel = (score) => {
  if (score >= 80) return 'Excellent Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Fair Match';
  return 'Poor Match';
};

export const getMatchDescription = (score) => {
  if (score >= 80) return 'You have very similar preferences and lifestyle';
  if (score >= 60) return 'You share many common preferences';
  if (score >= 40) return 'Some compatibility with room for compromise';
  return 'Limited compatibility, may require significant adjustments';
};