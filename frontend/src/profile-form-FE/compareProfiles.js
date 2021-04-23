function compareProfiles(p1, p2) {
  // Destructring
  let {
    gender: gender1,
    major: major1,
    personality: personality1,
    romance: romance1,
    friendship: friendship1,
    hobbies: hobbies1,
    spirituality: spirituality1,
    partying: partying1
  } = p1;
  if (gender1 === "Male") {
    gender1 = "Men";
  }
  if (gender1 === "Female") {
    gender1 = "Women";
  }
  let {
    gender: gender2,
    major: major2,
    personality: personality2,
    romance: romance2,
    friendship: friendship2,
    hobbies: hobbies2,
    spirituality: spirituality2,
    partying: partying2
  } = p2;
  if (gender2 === "Male") {
    gender2 = "Men";
  }
  if (gender2 === "Female") {
    gender2 = "Women";
  }

  // Score to be returned
  let score = 0;

  // Not looking for the same thing --> Fail Case
  if (
    romance1.includes("Not looking for this") &&
    friendship2.includes("Not looking for this")
  ) {
    return 0;
  }
  if (
    romance2.includes("Not looking for this") &&
    friendship1.includes("Not looking for this")
  ) {
    return 0;
  }

  // Gender Mismatch --> Fail Case
  if (
    !romance1.includes("Not looking for this") ||
    !romance2.includes("Not looking for this")
  ) {
    if (!romance2.includes(gender1) || !romance1.includes(gender2)) {
      return 0;
    }
  } else if (
    !friendship1.includes("Not looking for this") ||
    !friendship2.includes("Not looking for this")
  ) {
    if (!friendship2.includes(gender1) || !friendship1.includes(gender2)) {
      return 0;
    }
  }

  // Major (10% weight out of 100points)
  if (major1 === major2) {
    score += 10;
  }

  // Personality (10% weight out of 100points)
  if (personality1 === personality2) {
    score += 10;
  }

  // Hobbies (50% weight out of 100points)
  let hobbyPoints = 50 / Math.min(hobbies1.length, hobbies2.length);
  let moreHobby = hobbies1.length > hobbies2.length ? hobbies1 : hobbies2;
  let lessHobby = hobbies1.length <= hobbies2.length ? hobbies1 : hobbies2;

  for (let hobby in lessHobby) {
    if (!moreHobby.includes(hobby)) {
      score += hobbyPoints;
    }
  }

  // Spirituality (10% weight out of 100points)
  if (spirituality1 === spirituality2) {
    score += 10;
  }

  // Party Favors (20% weight out of 100points)
  let partyPoints = 20 / Math.min(partying1.length, partying2.length);
  let moreParty = partying1.length > partying2.length ? partying1 : partying2;
  let lessParty = partying1.length <= partying2.length ? partying1 : partying2;

  for (let party in lessParty) {
    if (!moreParty.includes(party)) {
      score += partyPoints;
    }
  }

  // Return Score
  return score;
}

export default compareProfiles;
