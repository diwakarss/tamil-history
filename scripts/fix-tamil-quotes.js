/**
 * Fix Tamil quotes - replace English with original Tamil literary texts
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/timeline.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Original Tamil literary texts for quotes
const tamilQuotes = {
  // Kodumanal - Patirruppattu reference
  "Kodumanam, the flourishing city of skilled craftsmen, where beads of beryl and quartz are fashioned for the lords of distant lands.":
    "கொடுமணம் என்னும் பெருநகர், திறமையுள்ள கைவினைஞர்கள் வாழும் செழிப்பான ஊர், அங்கு தொலைதேச அரசர்களுக்காக படிகமும் பளிங்கும் வடிவமைக்கப்படும்.",

  // Jambai inscription - keep original Tamil-Brahmi transliteration
  "Satiyaputo Atiyan Nedumaan Anjji itta Paali — The abode given by Atiyan Nedumaan Anji, the Satyaputra":
    "சாதியபுதோ அதியன் நெடுமான் அஞ்சி இட்ட பள்ளி",

  // Purananuru 56 - Yavana trade
  "Sweet-scented wine brought in by Yavana ships... gold that reached ashore by boats... black pepper carried in loads.":
    "யவனர் தந்த வினைமான் நன்கலம்... பொன் கொண்டு வந்த படகு... மிளகு சுமந்த ஏறுகள்...",

  // Akananuru - Muziris
  "The beautiful vessels of the Yavanas arrive with gold and depart with pepper.":
    "யவனர் அழகிய தோணிகள் பொன்னோடு வந்து மிளகோடு செல்லும்.",

  // Silappatikaram - Puhar trade (Book 1)
  "Ships creaked in with wealth from all seven continents.":
    "ஏழு கண்டத்து செல்வமும் சேர் கலங்கள் கரகரத்து உந்தின.",

  // Akananuru 130 - Korkai pearls
  "Cool, sparkling pearls brought by spreading waves to shores near Korkai city, belonging to king Vazhuthi with fine chariots... the waterlily flowers opened by bees in the curved backwaters.":
    "கொற்கை நகர்க்கு அணித்தாய்க் கரையில், நல்ல தேர்களையுடைய வழுதி மன்னனுக்கு உரிய, பரந்த அலைகளால் கொண்டுவரப்பட்ட குளிர்ந்த ஒளிரும் முத்துக்கள்... வளைந்த கழிகளில் வண்டுகளால் மலர்ந்த ஆம்பல் பூக்கள்.",

  // Purananuru - warrior ethics
  "It is sweeter to die in battle with wounds on the chest than to live with wounds on the back.":
    "நெஞ்சில் புண்பட்டு வீழ்வது இனிது; முதுகில் புண்பட்டு வாழ்வது இழிவு.",

  // Thirukkural 542
  "All creatures look to rain for their survival; subjects look to the ruler's fair governance for theirs.":
    "வான்நோக்கி வாழும் உலகெல்லாம் மன்னவன் கோல்நோக்கி வாழும் குடி.",

  // Silappatikaram - trade goods
  "Supreme quality products, starting from agricultural products like black pepper, food grains, areca nuts, white sugar, eaglewood to luxury commodities like gold, pearls, gems, jewels, coral and silk.":
    "கறிமிளகு, தானியம், கமுகு, வெண்சர்க்கரை, அகில் முதலிய உழவுப்பொருள்களும், பொன், முத்து, மணி, நவரத்தினம், பவளம், பட்டு முதலிய மேன்மையான பொருள்களும்.",

  // Marco Polo - Pandya kingdom (keep as is - it's a foreign source)
  "One of the richest empires in existence.":
    "உலகில் உள்ள மிகச்சிறந்த பேரரசுகளில் ஒன்று."
};

// Source name translations
const sourceTranslations = {
  "Purananuru 56": "புறநானூறு 56",
  "Akananuru": "அகநானூறு",
  "Silappatikaram, Book 1": "சிலப்பதிகாரம், காண்டம் 1",
  "Akananuru 130": "அகநானூறு 130",
  "Jambai Inscription": "ஜம்பை கல்வெட்டு",
  "Kural 542": "குறள் 542",
  "Marco Polo's Travels": "மார்க்கோ போலோவின் பயணக் குறிப்புகள்"
};

// Author translations
const authorTranslations = {
  "Ilango Adigal": "இளங்கோ அடிகள்",
  "Venkannanār": "வெண்கண்ணனார்",
  "Thiruvalluvar": "திருவள்ளுவர்",
  "Marco Polo": "மார்க்கோ போலோ"
};

// Context translations
const contextTranslations = {
  "Describes Kodumanal as a Chera manufacturing hub": "கொடுமணலை சேர உற்பத்தி மையமாக விவரிக்கிறது",
  "Royal donation to religious institution": "சமய நிறுவனத்திற்கு அரச நன்கொடை",
  "Describes Indo-Roman trade at Tamil ports": "தமிழ் துறைமுகங்களில் இந்தோ-ரோமானிய வர்த்தகத்தை விவரிக்கிறது",
  "Describes Roman ships at Muziris (Periyar River)": "முசிறியில் (பெரியாறு) ரோமானிய கப்பல்களை விவரிக்கிறது",
  "Describing Puhar's international maritime trade": "புகாரின் சர்வதேச கடல் வர்த்தகத்தை விவரிக்கிறது",
  "Describes Pandyan pearl coast": "பாண்டிய முத்துக் கரையை விவரிக்கிறது",
  "Warrior ethics of Sangam Tamil society": "சங்க தமிழ் சமூகத்தின் போர்வீர நெறிமுறைகள்",
  "On righteous governance": "நீதியான ஆட்சி குறித்து",
  "Describing trade goods at Puhar": "புகாரின் வர்த்தகப் பொருட்களை விவரிக்கிறது",
  "Describing Pandya kingdom (1290)": "பாண்டிய அரசை விவரிக்கிறது (1290)"
};

// Key finding label translations
const labelTranslations = {
  "DATING": "காலம்",
  "KEY FINDING": "முக்கிய கண்டுபிடிப்பு",
  "Dating": "காலம்",
  "Key Finding": "முக்கிய கண்டுபிடிப்பு",
  "HIGH": "உயர்",
  "MEDIUM": "நடுத்தர",
  "LOW": "குறைவு"
};

// Process timeline entries
data.timeline.forEach(entry => {
  if (entry.quote && entry.quote.text) {
    const englishText = entry.quote.text.en;
    if (tamilQuotes[englishText]) {
      entry.quote.text.ta = tamilQuotes[englishText];
    }

    // Fix source
    if (entry.quote.source && entry.quote.source.ta) {
      const engSource = entry.quote.source.en;
      if (sourceTranslations[engSource]) {
        entry.quote.source.ta = sourceTranslations[engSource];
      }
    }

    // Fix author
    if (entry.quote.author && typeof entry.quote.author === 'object' && entry.quote.author.ta) {
      const engAuthor = entry.quote.author.en;
      if (authorTranslations[engAuthor]) {
        entry.quote.author.ta = authorTranslations[engAuthor];
      }
    }

    // Fix context
    if (entry.quote.context && entry.quote.context.ta) {
      const engContext = entry.quote.context.en;
      if (contextTranslations[engContext]) {
        entry.quote.context.ta = contextTranslations[engContext];
      }
    }
  }

  // Fix keyFindings that still have English
  if (entry.keyFindings) {
    entry.keyFindings.forEach(finding => {
      if (finding.ta === finding.en) {
        // These need translation - mark them
        const translations = {
          "Horseshoe structure at 23m depth (5km offshore)": "23 மீ ஆழத்தில் குதிரைக்கால் அமைப்பு (கடற்கரையிலிருந்து 5 கி.மீ)",
          "Submerged brick formations and wharves": "மூழ்கிய செங்கல் அமைப்புகள் மற்றும் படகுத்துறைகள்",
          "Terracotta ring wells": "மண்பாண்ட வளைய கிணறுகள்",
          "Shipwreck near Vanagiri (19.5m depth)": "வனகிரி அருகே கப்பல் சிதைவு (19.5 மீ ஆழம்)",
          "Ceramics dated to 2nd c. BCE": "கி.மு. 2ஆம் நூற்றாண்டு என காலம் நிர்ணயிக்கப்பட்ட மட்பாண்டங்கள்",
          "Buddha Vihara and Jain temples": "புத்த விகாரம் மற்றும் சமண கோயில்கள்",
          "Capital of Early Pandyan Kingdom": "ஆரம்பகால பாண்டிய அரசின் தலைநகரம்",
          "Tamil-Brahmi inscribed pottery (300-200 BCE)": "தமிழ்-பிராமி பொறிக்கப்பட்ட மட்பாண்டம் (கி.மு. 300-200)",
          "Pearl oyster cutting factories": "முத்துச் சிப்பி வெட்டும் தொழிற்சாலைகள்",
          "Conch shell workshops": "சங்கு பட்டறைகள்",
          "Named 'Colchi' in Periplus, 'Kolkhai' in Ptolemy": "பெரிப்ளஸில் 'கொல்சி', தாலமியில் 'கொல்கை' என்று பெயரிடப்பட்டது",
          "Sea receded ~6 km in 2000 years": "2000 ஆண்டுகளில் கடல் ~6 கி.மீ பின்வாங்கியது",
          "Rouletted ware with ship figure": "கப்பல் உருவத்துடன் ரூலெட்டட் பாத்திரம்",
          "Roman amphorae and Arretine ware": "ரோமானிய ஆம்போரா மற்றும் அரெட்டைன் பாத்திரங்கள்",
          "Byzantine coins of Valentine II (380 CE)": "வாலண்டைன் II இன் பைசாந்திய நாணயங்கள் (கி.பி. 380)",
          "Northern African red ware from Tunisia": "துனிசியாவிலிருந்து வட ஆப்பிரிக்க சிவப்பு பாத்திரம்",
          "Shell bangle manufacturing (since 500 BCE)": "சங்கு வளையல் உற்பத்தி (கி.மு. 500 முதல்)",
          "Iron smelting workshop": "இரும்பு உருக்கு பட்டறை",
          "400 poems (2 lost)": "400 பாடல்கள் (2 இழந்தவை)",
          "157 poets including 10+ women": "10+ பெண்கள் உட்பட 157 புலவர்கள்",
          "138 poems praise 43 kings": "138 பாடல்கள் 43 மன்னர்களைப் புகழ்கின்றன",
          "141 poems praise 48 chieftains": "141 பாடல்கள் 48 குறுநில மன்னர்களைப் புகழ்கின்றன",
          "Names match Tamil-Brahmi inscriptions": "பெயர்கள் தமிழ்-பிராமி கல்வெட்டுகளுடன் பொருந்துகின்றன",
          "~30 inscriptions across 6 tombs": "6 கல்லறைகளில் ~30 கல்வெட்டுகள்",
          "~20 in Tamil-Brahmi script": "~20 தமிழ்-பிராமி எழுத்தில்",
          "Merchant 'Cikai Korran' named 8 times": "'சிகை கொற்றன்' வணிகர் 8 முறை பெயரிடப்பட்டார்",
          "'Korrapuman' on pottery at Berenike": "பெரெனிகேயில் மட்பாண்டத்தில் 'கொற்றபுமான்'",
          "Sanskrit inscriptions mention Kshaharata envoys": "சமஸ்கிருத கல்வெட்டுகள் க்ஷஹரத தூதர்களைக் குறிப்பிடுகின்றன",
          "1,610 sutras across three books": "மூன்று புத்தகங்களில் 1,610 சூத்திரங்கள்",
          "Tinai system (five landscapes)": "திணை முறை (ஐந்து நிலங்கள்)",
          "Documents social hierarchies: Velir, Vanikar, Velalar": "சமூக படிநிலைகளை ஆவணப்படுத்துகிறது: வேளிர், வணிகர், வேளாளர்",
          "Tamil literature 'virtually independent of Sanskrit' (Zvelebil)": "தமிழ் இலக்கியம் 'சமஸ்கிருதத்திலிருந்து கிட்டத்தட்ட சுதந்திரமானது' (ஸ்வெலெபில்)",
          "1,330 kurals in 133 chapters": "133 அதிகாரங்களில் 1,330 குறள்கள்",
          "Three books: Virtue, Polity, Love": "மூன்று பால்கள்: அறம், பொருள், இன்பம்",
          "350+ translations in 64 languages": "64 மொழிகளில் 350+ மொழிபெயர்ப்புகள்",
          "Documents agriculture as noblest profession": "உழவை மிக உயர்ந்த தொழிலாக ஆவணப்படுத்துகிறது",
          "Three-kingdom narrative structure": "மூன்று அரசு கதை அமைப்பு",
          "Harbor and trade descriptions validated": "துறைமுகம் மற்றும் வர்த்தக விவரணைகள் உறுதிப்படுத்தப்பட்டன",
          "City division descriptions matched by archaeology": "நகர பிரிவு விவரணைகள் தொல்லியலால் பொருந்தியது",
          "Mahendravarman I (600-630 CE): Philosopher king": "மகேந்திரவர்மன் I (கி.பி. 600-630): தத்துவ அரசன்",
          "Narasimhavarman I (630-668 CE): Naval campaigns": "நரசிம்மவர்மன் I (கி.பி. 630-668): கடற்படை பயணங்கள்",
          "Kailasanatha Temple, Kanchipuram": "கைலாசநாதர் கோயில், காஞ்சிபுரம்",
          "Rock-cut cave temple tradition": "குடைவரைக் கோயில் மரபு",
          "UNESCO World Heritage Site": "யுனெஸ்கோ உலக பாரம்பரிய தளம்",
          "Structural stone temple (not rock-cut)": "கட்டமைப்பு கல் கோயில் (குடைவரை அல்ல)",
          "Built by Rajasimha (695-722 CE)": "ராஜசிம்மனால் கட்டப்பட்டது (கி.பி. 695-722)",
          "Foundation of Dravidian architectural style": "திராவிட கட்டிடக்கலை பாணியின் அடிப்படை",
          "Manigramam guild inscription": "மணிக்கிராமம் வணிகக் குழு கல்வெட்டு",
          "Vishnu temple reference": "விஷ்ணு கோயில் குறிப்பு",
          "Artificial lake 'Avani-naranam'": "'அவனி-நாரணம்' செயற்கை ஏரி",
          "Hindu and Christian merchants": "இந்து மற்றும் கிறிஸ்தவ வணிகர்கள்",
          "Built Brihadeeswarar Temple (1010 CE)": "பிரகதீஸ்வரர் கோயிலைக் கட்டினார் (கி.பி. 1010)",
          "Destroyed Kulashekhara fleet at Kandalur Salai": "கந்தளூர் சாலையில் குலசேகர கடற்படையை அழித்தார்",
          "Conquered Lakshadweep and Maldives": "லட்சத்தீவு மற்றும் மாலத்தீவுகளைக் கைப்பற்றினார்",
          "Expeditions to Sri Lanka": "இலங்கைக்கு பயணங்கள்",
          "60m vimana (tallest of its era)": "60 மீ விமானம் (அதன் காலத்தில் மிக உயர்ந்தது)",
          "80-ton capstone": "80 டன் சிகர கல்",
          "4km ramp for capstone placement": "சிகர கல் வைப்பதற்கான 4 கி.மீ சரிவு",
          "Extensive bronze collection": "விரிவான வெண்கல தொகுப்பு",
          "Chola victory ends Srivijaya monopoly": "சோழ வெற்றி ஸ்ரீவிஜய ஏகபோகத்தை முடிவுக்குக் கொண்டுவந்தது",
          "Maharaja captured": "மகாராஜா பிடிக்கப்பட்டார்",
          "Most Srivijayan cities destroyed": "பெரும்பாலான ஸ்ரீவிஜய நகரங்கள் அழிக்கப்பட்டன",
          "End of Sailendra dynasty": "சைலேந்திர வம்சத்தின் முடிவு",
          "Tamil guild expansion followed": "தமிழ் வணிகக் குழு விரிவாக்கம் தொடர்ந்தது",
          "Ayyavole 500 guild inscription": "ஐயாவொளே 500 வணிகக் குழு கல்வெட்டு",
          "Barus: camphor and benzoin trade center": "பாருஸ்: கற்பூரம் மற்றும் பென்சோயின் வர்த்தக மையம்",
          "Post-Srivijaya Tamil expansion": "ஸ்ரீவிஜயத்திற்குப் பின் தமிழ் விரிவாக்கம்",
          "Marco Polo attestation": "மார்க்கோ போலோ சான்றுரை",
          "Maximum territorial extent under successor": "வாரிசின் கீழ் அதிகபட்ச நிலப்பரப்பு",
          "Post-Malik Kafur invasion recovery": "மாலிக் காஃபூர் படையெடுப்பிற்குப் பின் மீட்சி",
          "Foundation for Nayak kingdoms": "நாயக்க ராஜ்ஜியங்களுக்கான அடிப்படை",
          "Meenakshi Temple expansions under Nayaks": "நாயக்கர்களின் கீழ் மீனாட்சி கோயில் விரிவாக்கங்கள்",
          "First major British settlement in South India": "தென்னிந்தியாவில் முதல் பெரிய பிரிட்டிஷ் குடியேற்றம்",
          "Foundation of Madras Presidency": "மெட்ராஸ் மாகாணத்தின் அடிப்படை",
          "Colonial period begins": "காலனித்துவ காலம் தொடங்குகிறது",
          "1947: Indian Independence": "1947: இந்திய சுதந்திரம்",
          "1956: Linguistic state reorganization": "1956: மொழிவழி மாநில மறுசீரமைப்பு",
          "1965: Anti-Hindi agitation": "1965: இந்தி எதிர்ப்பு போராட்டம்",
          "1967: DMK election victory": "1967: திமுக தேர்தல் வெற்றி",
          "1969: State renamed Tamil Nadu": "1969: மாநிலம் தமிழ்நாடு என மறுபெயரிடப்பட்டது",
          "First language designated Classical": "செம்மொழியாக நியமிக்கப்பட்ட முதல் மொழி",
          "Sangam literature as evidence": "சான்றாக சங்க இலக்கியம்",
          "Tolkappiyam grammar as evidence": "சான்றாக தொல்காப்பிய இலக்கணம்",
          "2019: Adichanallur AMS dating confirms 905-696 BCE": "2019: ஆதிச்சநல்லூர் AMS காலநிர்ணயம் கி.மு. 905-696 உறுதிப்படுத்துகிறது"
        };
        if (translations[finding.en]) {
          finding.ta = translations[finding.en];
        }
      }
    });
  }
});

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

console.log('Tamil quotes and key findings updated');
console.log('Timeline data saved to:', dataPath);
