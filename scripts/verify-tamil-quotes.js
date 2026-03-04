/**
 * Update Tamil quotes with verified authentic texts from classical sources
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/timeline.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Verified authentic Tamil texts from classical sources
const verifiedQuotes = {
  // Purananuru 192 - Kaniyan Poonkundranar (already correct, but let's verify full text)
  "Every town's our home town; every man, our kinsman; Good and evil happen not because of others... Dying isn't something unknown.": {
    ta: "யாதும் ஊரே யாவரும் கேளிர் தீதும் நன்றும் பிறர்தர வாரா நோதலும் தணிதலும் அவற்றோரன்ன சாதலும் புதுவது அன்றே",
    verified: true,
    source: "Purananuru 192"
  },

  // Purananuru 56 - Yavana wine trade (from tamilsurangam.in)
  "Sweet-scented wine brought in by Yavana ships... gold that reached ashore by boats... black pepper carried in loads.": {
    ta: "யவனர் நன்கலம் தந்த தண்கமழ் தேறல் பொன்செய் புனைகலத்து ஏந்தி நாளும் ஒண்தொடி மகளிர் மடுப்ப",
    verified: true,
    source: "Purananuru 56, lines 17-20"
  },

  // Akananuru 149 - Yavana gold pepper trade at Muziris
  "The beautiful vessels of the Yavanas arrive with gold and depart with pepper.": {
    ta: "யவனர் தந்த வினைமான் நன்கலம் பொன்னொடு வந்து கறியொடு பெயரும் வளங்கெழு முசிறி",
    verified: true,
    source: "Akananuru 149, lines 7-11"
  },

  // Thirukkural 542 - verified from multiple sources
  "All creatures look to rain for their survival; subjects look to the ruler's fair governance for theirs.": {
    ta: "வான்நோக்கி வாழும் உலகெல்லாம் மன்னவன் கோல்நோக்கி வாழும் குடி",
    verified: true,
    source: "Thirukkural 542"
  }
};

// Update entries
data.timeline.forEach(entry => {
  if (entry.quote && entry.quote.text) {
    const englishText = entry.quote.text.en;
    if (verifiedQuotes[englishText]) {
      entry.quote.text.ta = verifiedQuotes[englishText].ta;
      console.log(`Updated: ${entry.quote.source.en} - verified from ${verifiedQuotes[englishText].source}`);
    }
  }
});

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log('\nVerified Tamil quotes updated');
console.log('Timeline data saved to:', dataPath);
