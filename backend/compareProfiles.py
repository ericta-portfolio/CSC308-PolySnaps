def compareProfiles(p1, p2):

    score = 0

    if (p1['gender'] == "Male"):
        p1['gender'] = "Men"
    if (p1['gender'] == "Female"):
        p1['gender'] = "Women"

    if (p2['gender'] == "Male"):
        p2['gender'] = "Men"
    if (p2['gender'] == "Female"):
        p2['gender'] = "Women"

    # Not looking for the same thing --> Fail Case
    if (
        "Not looking for this" in p1['romance'] and
        "Not looking for this" in p2['friendship']
    ):
        return 0

    if (
        "Not looking for this" in p2['romance'] and
        "Not looking for this" in p1['friendship']
    ):
        return 0

    # Gender Mismatch --> Fail Case
    if (
        "Not looking for this" in p1['romance'] or
        "Not looking for this" in p2['romance']
    ):
        if (p1['gender'] not in p2['friendship'] or p2['gender'] not in p1['friendship']):
            return 0

    if (
        "Not looking for this" in p1['friendship'] or
        "Not looking for this" in p2['friendship']
    ):
        if (p1['gender'] not in p2['romance'] or p2['gender'] not in p1['romance']):
            return 0

    # Major (10% weight out of 100points)
    if (p1['major'] == p2['major']):
        score += 10

    # Personality (10% weight out of 100points)
    if (p1['personality'] == p2['personality']):
        score += 10

    # Hobbies (50% weight out of 100points)
    hobbyPoints = 50 / min(len(p1['hobbies']), len(p2['hobbies']))
    moreHobby = p1['hobbies'] if (
        len(p1['hobbies']) > len(p2['hobbies'])) else p2['hobbies']
    lessHobby = p1['hobbies'] if (
        len(p1['hobbies']) <= len(p2['hobbies'])) else p2['hobbies']

    for hobby in lessHobby:
        if (hobby in moreHobby):
            score += hobbyPoints

    # Spirituality (10% weight out of 100points)
    if (p1['spirituality'] == p2['spirituality']):
        score += 10

    # Party Favors (20% weight out of 100points)
    partyPoints = 20 / min(len(p1['partying']), len(p2['partying']))
    moreParty = p1['partying'] if (
        len(p1['partying']) > len(p2['partying'])) else p2['partying']
    lessParty = p1['partying'] if (
        len(p1['partying']) <= len(p2['partying'])) else p2['partying']

    for party in lessParty:
        if (party in moreParty):
            score += partyPoints

    # Return Score
    return score
