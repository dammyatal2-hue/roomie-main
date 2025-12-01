// Roommate matching algorithm utilities
export const calculateMatchScore = (userProfile, potentialRoommate) => {
    let score = 0;
    const maxScore = 100;

    // Cleanliness compatibility (25 points)
    if (userProfile.cleanliness === potentialRoommate.cleanliness) {
        score += 25;
    }

    // Sleep schedule compatibility (25 points)
    if (userProfile.sleepSchedule === potentialRoommate.sleepSchedule) {
        score += 25;
    }

    // Smoking preference compatibility (25 points)
    if (userProfile.smoking === potentialRoommate.smoking) {
        score += 25;
    }

    // Budget compatibility (25 points)
    if (Math.abs(userProfile.budget - potentialRoommate.budget) <= 100) {
        score += 25;
    }

    return score;
};

export const filterAndSortMatches = (allProfiles, currentUser) => {
    return allProfiles
        .filter(profile => profile.id !== currentUser.id)
        .map(profile => ({
            ...profile,
            matchScore: calculateMatchScore(currentUser, profile)
        }))
        .sort((a, b) => b.matchScore - a.matchScore);
};

export const getCompatibilityLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
};