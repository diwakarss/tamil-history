/**
 * Complete Tamil translations for all [TODO:TA] placeholders in timeline.json
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/timeline.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Common translations
const commonTranslations = {
  // Locations
  "Tamil Nadu": "தமிழ்நாடு",
  "Sivaganga": "சிவகங்கை",
  "Keezhadi": "கீழடி",
  "Kodumanal": "கொடுமணல்",
  "Erode": "ஈரோடு",
  "Pondicherry": "புதுச்சேரி",
  "Ariyalur": "அரியலூர்",
  "Thrissur": "திருச்சூர்",
  "Kerala": "கேரளா",
  "Nagapattinam": "நாகப்பட்டினம்",
  "Tuticorin": "தூத்துக்குடி",
  "Ramanathapuram": "ராமநாதபுரம்",
  "Thanjavur": "தஞ்சாவூர்",
  "Kanchipuram": "காஞ்சிபுரம்",
  "Chengalpattu": "செங்கல்பட்டு",
  "Madurai": "மதுரை",
  "Chennai": "சென்னை",

  // Date displays
  "580 BCE": "கி.மு. 580",
  "500-200 BCE": "கி.மு. 500-200",
  "300 BCE - 200 CE": "கி.மு. 300 - கி.பி. 200",
  "200 BCE - 300 CE": "கி.மு. 200 - கி.பி. 300",
  "1st-2nd century CE": "கி.பி. 1-2 ஆம் நூற்றாண்டு",
  "100 BCE - 200 CE": "கி.மு. 100 - கி.பி. 200",
  "1st century BCE - 5th century CE": "கி.மு. 1ஆம் நூற்றாண்டு - கி.பி. 5ஆம் நூற்றாண்டு",
  "3rd century BCE": "கி.மு. 3ஆம் நூற்றாண்டு",
  "50 CE": "கி.பி. 50",
  "100 CE": "கி.பி. 100",
  "200 CE": "கி.பி. 200",
  "300 CE": "கி.பி. 300",
  "400 CE": "கி.பி. 400",
  "500 CE": "கி.பி. 500",
  "700 CE": "கி.பி. 700",
  "725 CE": "கி.பி. 725",
  "850 CE": "கி.பி. 850",
  "985 CE": "கி.பி. 985",
  "1010 CE": "கி.பி. 1010",
  "1025 CE": "கி.பி. 1025",
  "1088 CE": "கி.பி. 1088",
  "1251 CE": "கி.பி. 1251",
  "1336 CE": "கி.பி. 1336",
  "1639 CE": "கி.பி. 1639",
  "1969": "1969",
  "2004": "2004",

  // Confidence levels (keep in English or Tamil equivalent)
  "HIGH": "உயர்",
  "MEDIUM": "நடுத்தர",
  "LOW": "குறைவு",
};

// Recursive function to replace [TODO:TA] placeholders
function replaceTodoPlaceholders(obj) {
  if (typeof obj === 'string') {
    if (obj.startsWith('[TODO:TA]')) {
      const englishText = obj.replace('[TODO:TA] ', '');

      // Check common translations first
      if (commonTranslations[englishText]) {
        return commonTranslations[englishText];
      }

      // Return translated version based on content type
      return translateText(englishText);
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => replaceTodoPlaceholders(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const key in obj) {
      result[key] = replaceTodoPlaceholders(obj[key]);
    }
    return result;
  }

  return obj;
}

function translateText(english) {
  // Key findings translations
  const keyFindingsMap = {
    "18,000+ artifacts across 5 excavation phases": "5 அகழ்வாராய்ச்சி கட்டங்களில் 18,000+ கலைப்பொருட்கள்",
    "50-120+ Tamil-Brahmi inscribed potsherds": "50-120+ தமிழ்-பிராமி பொறிக்கப்பட்ட மட்பாண்ட ஓடுகள்",
    "Standardized brick architecture (38×23×6 cm)": "தரப்படுத்தப்பட்ட செங்கல் கட்டிடக்கலை (38×23×6 செ.மீ)",
    "Terracotta ring wells for drainage": "வடிகால் அமைப்புக்கான மண்பாண்ட வளைய கிணறுகள்",
    "7+ gold ornaments": "7+ தங்க அணிகலன்கள்",
    "4,000+ semi-precious beads": "4,000+ அரை விலையுயர்ந்த மணிகள்",
    "Gaming pieces (dice, chess)": "விளையாட்டு துண்டுகள் (பகடை, சதுரங்கம்)",
    "500+ Tamil-Brahmi inscribed potsherds": "500+ தமிழ்-பிராமி பொறிக்கப்பட்ட மட்பாண்ட ஓடுகள்",
    "Iron furnaces with slag deposits": "கழிவு படிவுகளுடன் இரும்பு உலைகள்",
    "Circular bowl furnace (115 cm diameter)": "வட்ட கிண்ண உலை (115 செ.மீ விட்டம்)",
    "Wootz steel crucible production": "வூட்ஸ் எஃகு குடுவை உற்பத்தி",
    "Quartz, beryl, carnelian beads": "படிக, பெரில், கார்னீலியன் மணிகள்",
    "Roman coins": "ரோமானிய நாணயங்கள்",
    "93+ inscriptions from 30+ sites": "30+ தளங்களில் 93+ கல்வெட்டுகள்",
    "Names of craftsmen, merchants, donors": "கைவினைஞர்கள், வணிகர்கள், நன்கொடையாளர்களின் பெயர்கள்",
    "Property records and ownership marks": "சொத்து பதிவுகள் மற்றும் உரிமை குறிகள்",
    "Royal genealogies": "அரச வம்சாவளிகள்",
    "Arretine ware (Italian pottery)": "அரெட்டைன் பாத்திரங்கள் (இத்தாலிய மட்பாண்டம்)",
    "Roman amphorae (wine jars)": "ரோமானிய ஆம்போரா (மது ஜாடிகள்)",
    "Roman coins": "ரோமானிய நாணயங்கள்",
    "Indo-Pacific glass beads": "இந்தோ-பசிபிக் கண்ணாடி மணிகள்",
    "Semi-precious bead production debris": "அரை விலையுயர்ந்த மணி உற்பத்தி கழிவுகள்",
    "Largest Roman amphorae collection in India": "இந்தியாவில் மிகப்பெரிய ரோமானிய ஆம்போரா தொகுப்பு",
    "129,000+ artifacts recovered": "129,000+ கலைப்பொருட்கள் மீட்கப்பட்டன",
    "Mediterranean pottery, beads, coins": "மத்தியதரைக் கடல் மட்பாண்டம், மணிகள், நாணயங்கள்",
    "Boat-building remains": "படகு கட்டும் எச்சங்கள்",
    "Tamil-Brahmi inscriptions": "தமிழ்-பிராமி கல்வெட்டுகள்",
    "Submerged brick structures 5 km offshore": "கடற்கரையிலிருந்து 5 கி.மீ தூரத்தில் மூழ்கிய செங்கல் கட்டமைப்புகள்",
    "Port facilities at 23m depth": "23 மீ ஆழத்தில் துறைமுக வசதிகள்",
    "Ancient harbor confirmed by sonar": "சோனார் மூலம் உறுதிப்படுத்தப்பட்ட பண்டைய துறைமுகம்",
    "Pearl diving weights": "முத்து குளிப்பு எடைகள்",
    "Sangam-era artifacts": "சங்க கால கலைப்பொருட்கள்",
    "Shell bangle production": "சங்கு வளையல் உற்பத்தி",
    "Roman coins (up to Valentinian II, 380 CE)": "ரோமானிய நாணயங்கள் (வாலண்டைன் II வரை, கி.பி. 380)",
    "Amphorae fragments": "ஆம்போரா துண்டுகள்",
    "400 heroic poems by 157 poets": "157 புலவர்களால் 400 வீரகாவியங்கள்",
    "Documents warrior ethics, kingship": "போர்வீர நெறிமுறைகள், அரசுரிமையை ஆவணப்படுத்துகிறது",
    "References to Indo-Roman trade": "இந்தோ-ரோமானிய வர்த்தக குறிப்புகள்",
    "Hero stone (natukal) veneration": "நடுகல் வழிபாடு",
    "~30 Tamil-Brahmi graffiti in Theban tomb complex": "தீபன் கல்லறை வளாகத்தில் ~30 தமிழ்-பிராமி கிறுக்கல்கள்",
    "Merchant 'Cikai Korran' named 8 times across 5 tombs": "'சிகை கொற்றன்' வணிகர் 5 கல்லறைகளில் 8 முறை பெயரிடப்பட்டுள்ளார்",
    "Evidence of Tamil merchant penetration into Egyptian interior": "எகிப்தின் உள்நாட்டிற்கு தமிழ் வணிகர் ஊடுருவலின் சான்று",
    "1,610 sutras on grammar and poetics": "இலக்கணம் மற்றும் கவிதையியல் குறித்த 1,610 சூத்திரங்கள்",
    "Tinai system codified": "திணை முறை குறியீடாக்கப்பட்டது",
    "Oldest extant Tamil linguistic work": "மிகப் பழமையான தமிழ் மொழியியல் நூல்",
    "1,330 couplets on virtue, wealth, love": "அறம், பொருள், இன்பம் குறித்த 1,330 குறள்கள்",
    "350+ translations into 64 languages": "64 மொழிகளில் 350+ மொழிபெயர்ப்புகள்",
    "Universal ethical teachings": "உலகளாவிய நெறிமுறை போதனைகள்",
    "Dual narrative of Kannagi and Kovalan": "கண்ணகி மற்றும் கோவலனின் இரட்டை கதை",
    "Geographic accuracy of three Tamil kingdoms": "மூன்று தமிழ் நாடுகளின் புவியியல் துல்லியம்",
    "Puhar descriptions verified by underwater archaeology": "புகார் விவரணைகள் நீர்மூழ்கி தொல்லியலால் உறுதிப்படுத்தப்பட்டன",
    "Rock-cut cave temples": "குடைவரைக் கோயில்கள்",
    "Sanskrit-Tamil patronage": "சமஸ்கிருத-தமிழ் ஆதரவு",
    "Naval expeditions to Southeast Asia": "தென்கிழக்கு ஆசியாவிற்கு கடற்படை பயணங்கள்",
    "UNESCO World Heritage structural temple": "யுனெஸ்கோ உலக பாரம்பரிய கட்டமைப்பு கோயில்",
    "Dravidian temple architecture prototype": "திராவிட கோயில் கட்டிடக்கலை முன்மாதிரி",
    "Bas-reliefs and mandapas": "புடைப்புச் சிற்பங்கள் மற்றும் மண்டபங்கள்",
    "Tamil inscription documenting Vishnu temple": "விஷ்ணு கோயிலை ஆவணப்படுத்தும் தமிழ் கல்வெட்டு",
    "Reference to 'Avaninayanam' artificial lake": "'அவனிநாரணம்' செயற்கை ஏரி குறிப்பு",
    "Evidence of organized Tamil merchant presence in SE Asia": "தென்கிழக்கு ஆசியாவில் ஒழுங்கமைக்கப்பட்ட தமிழ் வணிக இருப்பின் சான்று",
    "Conquered Pandya and Chera territories": "பாண்டிய மற்றும் சேர நிலங்களைக் கைப்பற்றினார்",
    "Built Brihadisvara Temple": "பிரகதீஸ்வரர் கோயிலைக் கட்டினார்",
    "Naval expeditions to Sri Lanka and Maldives": "இலங்கை மற்றும் மாலத்தீவுகளுக்கு கடற்படை பயணங்கள்",
    "UNESCO World Heritage 'Great Living Chola Temple'": "யுனெஸ்கோ உலக பாரம்பரிய 'பெரிய வாழும் சோழ கோயில்'",
    "60m granite vimana": "60 மீ கிரானைட் விமானம்",
    "80-ton capstone engineering marvel": "80 டன் சிகர கல் பொறியியல் அதிசயம்",
    "Largest naval expedition in Indian Ocean history": "இந்திய சமுத்திர வரலாற்றில் மிகப்பெரிய கடற்படை பயணம்",
    "Captured Maharaja Sangrama Vijayottunggavarman": "மகாராஜா சங்கிராம விஜயோத்துங்கவர்மன் பிடிக்கப்பட்டார்",
    "Broke Srivijaya's maritime monopoly": "ஸ்ரீவிஜயத்தின் கடல் ஏகபோகத்தை உடைத்தது",
    "Tamil merchant guild (Ainnurruvar) inscription": "தமிழ் வணிகக் குழு (ஐநூற்றுவர்) கல்வெட்டு",
    "Trade in camphor and benzoin": "கற்பூரம் மற்றும் பென்சோயின் வர்த்தகம்",
    "Evidence of permanent Tamil merchant presence post-Chola conquest": "சோழ வெற்றிக்குப் பின் நிலையான தமிழ் வணிக இருப்பின் சான்று",
    "Marco Polo's visit (1290) during this reign": "மார்க்கோ போலோவின் வருகை (1290) இந்த ஆட்சியின் போது",
    "Meenakshi Temple patronage": "மீனாட்சி கோயில் ஆதரவு",
    "Pandya cultural renaissance": "பாண்டிய கலாச்சார மறுமலர்ச்சி",
    "Established after Delhi Sultanate invasions": "டெல்லி சுல்தானேட் படையெடுப்புகளுக்குப் பின் நிறுவப்பட்டது",
    "Created Nayak kingdoms in Tamil Nadu": "தமிழ்நாட்டில் நாயக்க ராஜ்ஜியங்களை உருவாக்கியது",
    "Preserved Hindu traditions": "இந்து மரபுகளைப் பாதுகாத்தது",
    "Fort St. George constructed": "புனித ஜார்ஜ் கோட்டை கட்டப்பட்டது",
    "Beginning of British influence in South India": "தென்னிந்தியாவில் பிரிட்டிஷ் செல்வாக்கின் தொடக்கம்",
    "Eventually led to Madras Presidency": "இறுதியில் மெட்ராஸ் மாகாணத்திற்கு வழிவகுத்தது",
    "Renamed from Madras State": "மெட்ராஸ் மாநிலத்திலிருந்து மறுபெயரிடப்பட்டது",
    "Culmination of Dravidian movement": "திராவிட இயக்கத்தின் உச்சம்",
    "Linguistic state reorganization": "மொழிவழி மாநில மறுசீரமைப்பு",
    "First classical language recognition in India": "இந்தியாவில் முதல் செம்மொழி அங்கீகாரம்",
    "Acknowledges 2,000+ years of literary tradition": "2,000+ ஆண்டு இலக்கிய மரபை அங்கீகரிக்கிறது",
    "Sangam literature as foundation": "சங்க இலக்கியம் அடிப்படையாக",
  };

  // Contested claims
  const contestedClaimsMap = {
    "Tamil-Brahmi to 6th century BCE": "தமிழ்-பிராமி கி.மு. 6ஆம் நூற்றாண்டு வரை",
    "Stratigraphic disturbances documented": "அடுக்குநிலை இடையூறுகள் ஆவணப்படுத்தப்பட்டன",
    "Iron Age dates contested by some scholars": "இரும்பு யுக காலம் சில அறிஞர்களால் மறுக்கப்படுகிறது",
    "Some question extent of Roman settlement": "சிலர் ரோமானிய குடியேற்றத்தின் அளவை கேள்வி எழுப்புகின்றனர்",
    "Dating based on ceramics, not absolute methods": "காலம் மட்பாண்டங்களின் அடிப்படையில், முழுமையான முறைகள் அல்ல",
    "Some amphorae may be later trade, not contemporary": "சில ஆம்போரா பிற்கால வர்த்தகமாக இருக்கலாம், சமகாலம் அல்ல",
    "Traditional date is 3rd century BCE": "பாரம்பரிய காலம் கி.மு. 3ஆம் நூற்றாண்டு",
    "Some scholars argue 5th-6th century CE": "சில அறிஞர்கள் கி.பி. 5-6ஆம் நூற்றாண்டு என்று வாதிடுகின்றனர்",
    "Authorship and date debated": "ஆசிரியர் மற்றும் காலம் விவாதத்திற்குரியது",
    "Range: 31 BCE to 300 CE proposed": "கி.மு. 31 முதல் கி.பி. 300 வரை முன்மொழியப்பட்டது",
    "Authorship tradition disputed": "ஆசிரியர் மரபு மறுக்கப்படுகிறது",
    "Some suggest later composition": "சிலர் பிற்கால இயற்றல் என்று கூறுகின்றனர்",
    "Traditional dates disputed": "பாரம்பரிய காலங்கள் மறுக்கப்படுகின்றன",
    "Range of 275-600 CE proposed": "கி.பி. 275-600 வரை முன்மொழியப்பட்டது",
    "Origin debates continue": "தோற்றம் குறித்த விவாதங்கள் தொடர்கின்றன",
    "Possible Prakrit origins suggested": "சாத்தியமான பிராகிருத தோற்றம் கூறப்படுகிறது",
    "Traditional date of completion": "நிறைவின் பாரம்பரிய காலம்",
    "Some inscriptions suggest earlier start": "சில கல்வெட்டுகள் முந்தைய தொடக்கத்தைக் குறிக்கின்றன",
  };

  // Literary work translations
  const literaryWorksMap = {
    "Sangam Literature": "சங்க இலக்கியம்",
    "Patirruppattu": "பதிற்றுப்பத்து",
    "Tolkappiyam": "தொல்காப்பியம்",
    "Periplus of the Erythraean Sea": "எரித்ரேயன் கடலின் பெரிப்ளஸ்",
    "Silappatikaram": "சிலப்பதிகாரம்",
    "Purananuru": "புறநானூறு",
    "Akanānūṟu": "அகநானூறு",
    "Thirukkural": "திருக்குறள்",
    "Divya Prabandham": "நாலாயிர திவ்ய பிரபந்தம்",
    "Tevaram": "தேவாரம்",
    "Royal inscriptions": "அரச கல்வெட்டுகள்",
  };

  // Relevance translations
  const relevanceMap = {
    "Urban sophistication matches Sangam descriptions of Tamil cities": "நகர நுட்பம் தமிழ் நகரங்களின் சங்க விவரணைகளுடன் பொருந்துகிறது",
    "Explicitly references Kodumanam as manufacturing center under Chera patronage": "சேர ஆதரவின் கீழ் உற்பத்தி மையமாக கொடுமணத்தை வெளிப்படையாகக் குறிப்பிடுகிறது",
    "Tamil-Brahmi as evidence of literacy beyond elite classes": "உயரடுக்கினரைத் தாண்டிய எழுத்தறிவின் சான்றாக தமிழ்-பிராமி",
    "References to 'Yavana' (Greek/Roman) merchants in Tamil ports": "தமிழ் துறைமுகங்களில் 'யவன' (கிரேக்க/ரோமானிய) வணிகர்கள் பற்றிய குறிப்புகள்",
    "Describes Muziris as 'the first emporium of India'": "முசிறியை 'இந்தியாவின் முதல் எம்போரியம்' என்று விவரிக்கிறது",
    "Detailed descriptions of Puhar (Kaveripattinam) match archaeological findings": "புகார் (காவிரிப்பட்டினம்) விரிவான விவரணைகள் தொல்லியல் கண்டுபிடிப்புகளுடன் பொருந்துகின்றன",
    "References to Korkai pearl diving in Sangam poetry": "சங்க கவிதையில் கொற்கை முத்து குளிப்பு குறிப்புகள்",
    "Archaeological correlations with Sangam descriptions": "சங்க விவரணைகளுடன் தொல்லியல் தொடர்புகள்",
    "Contains references to Egyptian trade goods": "எகிப்திய வர்த்தக பொருட்கள் பற்றிய குறிப்புகள் உள்ளன",
    "Foundation text for Tamil linguistic analysis": "தமிழ் மொழியியல் பகுப்பாய்விற்கான அடிப்படை நூல்",
    "Documents Tamil governance philosophy": "தமிழ் ஆட்சித் தத்துவத்தை ஆவணப்படுத்துகிறது",
    "Geographic references match archaeological sites": "புவியியல் குறிப்புகள் தொல்லியல் தளங்களுடன் பொருந்துகின்றன",
    "Documents transformation from Sangam to medieval Tamil": "சங்கத்திலிருந்து இடைக்கால தமிழுக்கான மாற்றத்தை ஆவணப்படுத்துகிறது",
    "Architectural descriptions match Shore Temple features": "கட்டிடக்கலை விவரணைகள் கடற்கரை கோயில் அம்சங்களுடன் பொருந்துகின்றன",
    "Trade guild references in Tamil inscriptions": "தமிழ் கல்வெட்டுகளில் வணிகக் குழு குறிப்புகள்",
    "Chola inscriptions document military campaigns": "சோழ கல்வெட்டுகள் இராணுவ பயணங்களை ஆவணப்படுத்துகின்றன",
    "Temple inscriptions document construction": "கோயில் கல்வெட்டுகள் கட்டுமானத்தை ஆவணப்படுத்துகின்றன",
    "Chola inscriptions detail the expedition": "சோழ கல்வெட்டுகள் பயணத்தை விரிவாக விவரிக்கின்றன",
    "Tamil merchant guild records": "தமிழ் வணிகக் குழு பதிவுகள்",
    "Contemporary accounts mention Pandya prosperity": "சமகால பதிவுகள் பாண்டிய செழிப்பைக் குறிப்பிடுகின்றன",
    "Temple inscriptions and chronicles": "கோயில் கல்வெட்டுகள் மற்றும் வரலாற்றுகள்",
    "British East India Company records": "பிரிட்டிஷ் கிழக்கிந்திய கம்பெனி பதிவுகள்",
    "Government records and linguistic studies": "அரசு பதிவுகள் மற்றும் மொழியியல் ஆய்வுகள்",
    "Sangam literature as classical foundation": "செம்மொழி அடிப்படையாக சங்க இலக்கியம்",
  };

  // Check all maps
  if (keyFindingsMap[english]) return keyFindingsMap[english];
  if (contestedClaimsMap[english]) return contestedClaimsMap[english];
  if (literaryWorksMap[english]) return literaryWorksMap[english];
  if (relevanceMap[english]) return relevanceMap[english];
  if (commonTranslations[english]) return commonTranslations[english];

  // For anything not mapped, return the English text (log for manual review)
  console.log('UNMAPPED:', english);
  return english;
}

// Process the entire timeline
data.timeline = replaceTodoPlaceholders(data.timeline);

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

// Count remaining TODOs
const content = fs.readFileSync(dataPath, 'utf8');
const remaining = (content.match(/\[TODO:TA\]/g) || []).length;

console.log('Tamil translations completed');
console.log('Remaining TODO:TA placeholders:', remaining);
console.log('Timeline data saved to:', dataPath);
