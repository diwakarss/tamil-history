/**
 * Maps timeline entry slugs to artwork filenames
 * Artwork files are in /public/images/art/
 */
export const artworkMap: Record<string, string> = {
  // Prehistoric Era
  attirampakkam: "attirampakkam.webp",
  "attirampakkam-stone-tools": "attirampakkam.webp",
  payyampalli: "payyampalli.webp",
  "payyampalli-neolithic": "payyampalli.webp",

  // Pre-Sangam Era
  sivagalai: "sivagalai.webp",
  adichanallur: "adichanallur.webp",
  keezhadi: "keezhadi.webp",
  kodumanal: "kodumanal.webp",

  // Sangam Age
  "tamil-brahmi": "tamil-brahmi.webp",
  arikamedu: "arikamedu.webp",
  pattanam: "muziris.webp",
  muziris: "muziris.webp",
  poompuhar: "poompuhar.webp",
  korkai: "korkai.webp",
  alagankulam: "alangulam.webp",
  purananuru: "purananuru.webp",
  "tamil-merchants": "egypt-merchants.webp",
  "egypt-merchants": "egypt-merchants.webp",
  "egyptian-valley": "egypt-merchants.webp",

  // Post-Sangam / Literary
  tolkappiyam: "tolkappiyam.webp",
  thirukkural: "thirukural.webp",
  silappatikaram: "silapathikaram.webp",
  manimekalai: "manimekalai.webp",
  "manimekalai-epic": "manimekalai.webp",

  // Pallava Period
  pallava: "pallava.webp",
  "shore-temple": "shore-temple.webp",
  nayanars: "nayanars.webp",
  alvars: "nayanars.webp",
  "nayanars-alvars": "nayanars.webp",
  "bhakti-movement": "nayanars.webp",
  manigramam: "manigramam.webp",

  // Chola Empire
  rajaraja: "nataraja.webp",
  brihadeeswarar: "brihadeeswarar.webp",
  rajendra: "chola-warship.webp",
  "chola-warship": "chola-warship.webp",
  ayyavole: "ayyavole.webp",

  // Pandya Revival
  jatavarman: "meenakshi -temple.webp",
  sundara: "meenakshi -temple.webp",
  "meenakshi-temple": "meenakshi -temple.webp",

  // Vijayanagara / Nayak
  vijayanagara: "hampi.webp",
  hampi: "hampi.webp",

  // Colonial
  "fort-st-george": "george-fort.webp",
  british: "george-fort.webp",
  "george-fort": "george-fort.webp",

  // Modern
  "tamil-nadu": "tamilnadu-state.webp",
  "tamilnadu-state": "tamilnadu-state.webp",
  "classical-language": "classical-tamil.webp",
  "classical-tamil": "classical-tamil.webp",
};

/**
 * World context strings for each timeline entry
 * Provides historical perspective on what was happening globally
 */
export const worldContextMap: Record<string, { en: string; ta: string }> = {
  // Prehistoric Era
  "attirampakkam-stone-tools": {
    en: "Homo sapiens have not yet evolved. Neanderthals roam Europe. The Ice Ages reshape continents — while early hominins in Tamil Nadu craft sophisticated stone tools 250,000 years before modern humans leave Africa.",
    ta: "ஹோமோ சேபியன்ஸ் இன்னும் பரிணாமம் அடையவில்லை. நியாண்டர்தால்கள் ஐரோப்பாவில் சுற்றித் திரிகின்றனர். பனி யுகங்கள் கண்டங்களை மறுவடிவமைக்கின்றன — அதே நேரத்தில் நவீன மனிதர்கள் ஆப்பிரிக்காவை விட்டு வெளியேறுவதற்கு 250,000 ஆண்டுகளுக்கு முன்பே தமிழ்நாட்டில் ஆதி மனிதர்கள் நுட்பமான கற்கருவிகளை வடிவமைக்கின்றனர்.",
  },
  "payyampalli-neolithic-settlement": {
    en: "The Harappan civilization flourishes in the Indus Valley. Stonehenge is being built in Britain. The Bronze Age transforms the Near East — while Tamil farmers domesticate horse gram and settle into permanent villages.",
    ta: "சிந்து சமவெளியில் ஹரப்பா நாகரிகம் செழிக்கிறது. பிரிட்டனில் ஸ்டோன்ஹெஞ்ச் கட்டப்படுகிறது. வெண்கல யுகம் கிழக்கு நெருக்கமான பகுதியை மாற்றுகிறது — அதே நேரத்தில் தமிழ் விவசாயிகள் கொள்ளுவை வளர்த்து நிரந்தர கிராமங்களில் குடியேறுகின்றனர்.",
  },

  // Pre-Sangam Era
  "sivagalai-iron-age-settlement": {
    en: "The Trojan War is being fought in the Mediterranean. Ramesses III defends Egypt from the Sea Peoples. The Bronze Age is collapsing across the Near East — while Tamil farmers cultivate rice in the south.",
    ta: "மத்தியதரைக் கடலில் ட்ரோஜன் போர் நடக்கிறது. ராமசேஸ் III கடல் மக்களிடமிருந்து எகிப்தைப் பாதுகாக்கிறார். வெண்கல யுகம் கிழக்கு நெருக்கமான பகுதியில் சரிந்து கொண்டிருக்கிறது — அதே நேரத்தில் தமிழ் விவசாயிகள் தெற்கில் அரிசி பயிரிடுகின்றனர்.",
  },
  "adichanallur-megalithic-burials": {
    en: "King Solomon builds the First Temple in Jerusalem. Homer composes the Iliad and Odyssey in Greece. The Phoenicians spread their alphabet across the Mediterranean — while Tamil warriors are buried with gold and iron.",
    ta: "சாலமோன் மன்னன் எருசலேமில் முதல் கோவிலைக் கட்டுகிறார். ஹோமர் கிரேக்கத்தில் இலியட் மற்றும் ஒடிஸியை இயற்றுகிறார். ஃபீனீசியர்கள் மத்தியதரைக் கடல் முழுவதும் தங்கள் எழுத்துக்களை பரப்புகின்றனர் — அதே நேரத்தில் தமிழ் போர்வீரர்கள் தங்கமும் இரும்பும் கொண்டு புதைக்கப்படுகின்றனர்.",
  },
  "keezhadi-urban-settlement": {
    en: "Siddhartha Gautama becomes the Buddha in India. Confucius teaches philosophy in China. Athens experiments with democracy — while Tamils build planned cities with drainage systems rivaling Rome's.",
    ta: "சித்தார்த்த கௌதமர் இந்தியாவில் புத்தராகிறார். கன்பூசியஸ் சீனாவில் தத்துவம் கற்பிக்கிறார். ஏதென்ஸ் ஜனநாயகத்தை சோதனை செய்கிறது — அதே நேரத்தில் தமிழர்கள் ரோமின் வடிகால் அமைப்புகளுக்கு இணையான திட்டமிடப்பட்ட நகரங்களை கட்டுகின்றனர்.",
  },
  "kodumanal-iron-smelting-center": {
    en: "Cyrus the Great founds the Persian Empire. Greek philosophers debate in the agora. The Iron Age transforms warfare across Eurasia — while Tamil smiths forge wootz steel that will reach Roman swords.",
    ta: "சைரஸ் பெருமன்னன் பாரசீகப் பேரரசை நிறுவுகிறார். கிரேக்க தத்துவஞானிகள் அகோராவில் விவாதிக்கின்றனர். இரும்பு யுகம் யூரேசியா முழுவதும் போர்முறையை மாற்றுகிறது — அதே நேரத்தில் தமிழ் கொல்லர்கள் ரோமானிய வாள்களை அடையும் வூட்ஸ் எஃகை உருவாக்குகின்றனர்.",
  },

  // Sangam Age
  "tamil-brahmi-script-emergence": {
    en: "Alexander the Great conquers Persia. The Mauryan Empire unifies India under Ashoka. Greek becomes the lingua franca of the Mediterranean — while Tamils develop their own script from Brahmi.",
    ta: "அலெக்சாண்டர் பெருமன்னன் பாரசீகத்தைக் கைப்பற்றுகிறார். மௌரியப் பேரரசு அசோகரின் கீழ் இந்தியாவை ஒருங்கிணைக்கிறது. கிரேக்கம் மத்தியதரைக்கடலின் பொது மொழியாகிறது — அதே நேரத்தில் தமிழர்கள் பிராமியிலிருந்து தங்கள் சொந்த எழுத்தை உருவாக்குகின்றனர்.",
  },
  "arikamedu-roman-trade-settlement": {
    en: "Julius Caesar conquers Gaul and crosses the Rubicon. Cleopatra rules Egypt. The Han Dynasty extends the Silk Road — while Tamil merchants trade pepper, pearls, and muslin directly with Rome.",
    ta: "ஜூலியஸ் சீசர் காலை கைப்பற்றி ரூபிகானைக் கடக்கிறார். கிளியோபாட்ரா எகிப்தை ஆள்கிறாள். ஹான் வம்சம் பட்டுப் பாதையை விரிவாக்குகிறது — அதே நேரத்தில் தமிழ் வணிகர்கள் மிளகு, முத்துக்கள் மற்றும் மஸ்லின் துணிகளை நேரடியாக ரோமுடன் வர்த்தகம் செய்கின்றனர்.",
  },
  "pattanam-muziris-roman-trade-port": {
    en: "Augustus Caesar establishes the Roman Empire. The Silk Road connects China to Rome. Mediterranean ships sail the monsoon winds — while Tamil ports become the richest trading hubs in the Indian Ocean.",
    ta: "அகஸ்டஸ் சீசர் ரோமானியப் பேரரசை நிறுவுகிறார். பட்டுப் பாதை சீனாவை ரோமுடன் இணைக்கிறது. மத்தியதரைக் கப்பல்கள் பருவக்காற்றில் பயணிக்கின்றன — அதே நேரத்தில் தமிழ் துறைமுகங்கள் இந்திய சமுத்திரத்தின் மிகச்சிறந்த வர்த்தக மையங்களாகின்றன.",
  },
  "poompuhar-chola-port-city": {
    en: "Rome expands across the Mediterranean. The Parthian Empire controls Persia. Buddhism spreads along the Silk Road — while Chola ships carry Tamil goods to Southeast Asia and beyond.",
    ta: "ரோம் மத்தியதரைக் கடல் முழுவதும் விரிவடைகிறது. பார்த்தியப் பேரரசு பாரசீகத்தைக் கட்டுப்படுத்துகிறது. புத்தமதம் பட்டுப் பாதையில் பரவுகிறது — அதே நேரத்தில் சோழக் கப்பல்கள் தமிழ் பொருட்களை தென்கிழக்கு ஆசியாவிற்கும் அப்பாலும் கொண்டு செல்கின்றன.",
  },
  "korkai-pearl-fishing-capital": {
    en: "Roman senators wear Tamil pearls. Pliny complains of gold draining to India. The pearl becomes the ultimate status symbol in Rome — while Pandya divers descend 100 feet to harvest them.",
    ta: "ரோமானிய செனட்டர்கள் தமிழ் முத்துக்களை அணிகின்றனர். பிளினி இந்தியாவிற்கு தங்கம் வடிவதைப் பற்றி புகார் செய்கிறார். முத்து ரோமில் இறுதி அந்தஸ்து சின்னமாகிறது — அதே நேரத்தில் பாண்டிய முத்துக்குளிப்பாளர்கள் அவற்றை அறுவடை செய்ய 100 அடி ஆழத்தில் மூழ்குகின்றனர்.",
  },
  "alagankulam-roman-trade-port": {
    en: "The Roman Empire reaches its greatest extent under Trajan. Trade routes connect three continents. Roman coins flood Indian markets — while Tamil merchants accumulate Mediterranean gold.",
    ta: "ட்ரஜன் மன்னரின் கீழ் ரோமானியப் பேரரசு அதன் மிகப்பெரிய விரிவை அடைகிறது. வர்த்தகப் பாதைகள் மூன்று கண்டங்களை இணைக்கின்றன. ரோமானிய நாணயங்கள் இந்திய சந்தைகளை நிரப்புகின்றன — அதே நேரத்தில் தமிழ் வணிகர்கள் மத்தியதரைக் தங்கத்தைக் குவிக்கின்றனர்.",
  },
  "purananuru-war-poetry-composed": {
    en: "Virgil writes the Aeneid in Rome. The Dead Sea Scrolls are composed. Poetry becomes political propaganda across empires — while Tamil bards compose verses that will outlive the kings they praise.",
    ta: "வர்ஜில் ரோமில் ஈனியட் எழுதுகிறார். சவக்கடல் சுருள்கள் இயற்றப்படுகின்றன. கவிதை பேரரசுகள் முழுவதும் அரசியல் பிரச்சாரமாகிறது — அதே நேரத்தில் தமிழ் புலவர்கள் தாங்கள் புகழும் மன்னர்களை விட நீடிக்கும் பாடல்களை இயற்றுகின்றனர்.",
  },
  "tamil-merchants-in-egyptian-valley-of-kings": {
    en: "Rome rules Egypt as a province. Caravans cross the Sahara. Mediterranean merchants rarely venture beyond Alexandria — while Tamil traders leave their inscriptions in the tombs of Pharaohs.",
    ta: "ரோம் எகிப்தை ஒரு மாகாணமாக ஆள்கிறது. ஒட்டக வண்டிகள் சஹாராவைக் கடக்கின்றன. மத்தியதரை வணிகர்கள் அலெக்சாண்ட்ரியாவுக்கு அப்பால் அரிதாகவே செல்கின்றனர் — அதே நேரத்தில் தமிழ் வணிகர்கள் பாரோக்களின் கல்லறைகளில் தங்கள் கல்வெட்டுகளை விட்டுச் செல்கின்றனர்.",
  },

  // Post-Sangam / Literary
  "tolkappiyam-grammar-compiled": {
    en: "Panini codifies Sanskrit grammar in the north. Greek scholars debate at Alexandria. Language becomes a science — while Tamil grammarians create the Tinai system that maps emotion to landscape.",
    ta: "பாணினி வடக்கில் சமஸ்கிருத இலக்கணத்தை குறியீடாக்குகிறார். கிரேக்க அறிஞர்கள் அலெக்சாண்ட்ரியாவில் விவாதிக்கின்றனர். மொழி ஒரு அறிவியலாகிறது — அதே நேரத்தில் தமிழ் இலக்கணவாதிகள் உணர்வை நிலப்பரப்புடன் இணைக்கும் திணை முறையை உருவாக்குகின்றனர்.",
  },
  "thirukkural-composed": {
    en: "The Gupta Empire marks India's Golden Age. Buddhism reaches China via the Silk Road. Philosophers seek universal ethics — while Thiruvalluvar distills wisdom into 1,330 couplets that need no religion.",
    ta: "குப்தப் பேரரசு இந்தியாவின் பொற்காலத்தைக் குறிக்கிறது. புத்தமதம் பட்டுப் பாதை வழியாக சீனாவை அடைகிறது. தத்துவஞானிகள் உலகளாவிய நெறிமுறைகளைத் தேடுகின்றனர் — அதே நேரத்தில் திருவள்ளுவர் எந்த மதமும் தேவையில்லாத 1,330 குறள்களில் ஞானத்தை வடித்தெடுக்கிறார்.",
  },
  "silappatikaram-epic-composed": {
    en: "The Roman Empire splits into East and West. The Huns threaten Europe. Epic poetry defines civilizations — while Ilango Adigal weaves a tale of love and justice across three Tamil kingdoms.",
    ta: "ரோமானியப் பேரரசு கிழக்கு மேற்காகப் பிரிகிறது. ஹன்கள் ஐரோப்பாவை அச்சுறுத்துகின்றனர். காவிய இலக்கியம் நாகரிகங்களை வரையறுக்கிறது — அதே நேரத்தில் இளங்கோ அடிகள் மூன்று தமிழ் நாடுகளில் அன்பு மற்றும் நீதியின் கதையை பின்னுகிறார்.",
  },
  "manimekalai-epic-composed": {
    en: "The Byzantine Empire under Justinian codifies Roman law. Buddhism spreads through Central Asia. The Kalabhras rule Tamil Nadu — while Seethalai Satanar composes a Buddhist epic that questions worldly attachments.",
    ta: "ஜஸ்டினியனின் கீழ் பைசாந்தியப் பேரரசு ரோமானிய சட்டத்தை குறியீடாக்குகிறது. புத்தமதம் மத்திய ஆசியா முழுவதும் பரவுகிறது. களப்பிரர்கள் தமிழ்நாட்டை ஆள்கின்றனர் — அதே நேரத்தில் சீத்தலை சாத்தனார் உலக பற்றுகளை கேள்வி எழுப்பும் புத்த காப்பியத்தை இயற்றுகிறார்.",
  },

  // Pallava Period
  "pallava-dynasty-rises": {
    en: "The Byzantine Empire preserves Roman legacy. The Gupta Empire falls to the Huns. New powers reshape Asia — while the Pallavas pioneer rock-cut temples that will inspire Southeast Asian architecture.",
    ta: "பைசாந்தியப் பேரரசு ரோமானிய மரபைப் பாதுகாக்கிறது. குப்தப் பேரரசு ஹன்களிடம் வீழ்கிறது. புதிய சக்திகள் ஆசியாவை மறுவடிவமைக்கின்றன — அதே நேரத்தில் பல்லவர்கள் தென்கிழக்கு ஆசிய கட்டிடக்கலையை ஊக்குவிக்கும் குடைவரைக் கோயில்களை முன்னோடியாக உருவாக்குகின்றனர்.",
  },
  "shore-temple-mahabalipuram-built": {
    en: "The Tang Dynasty rules China's golden age. Islam spreads across Arabia. Stone temples rise across Asia — while Pallava architects master the art of carving mountains into shrines.",
    ta: "தாங் வம்சம் சீனாவின் பொற்காலத்தை ஆள்கிறது. இஸ்லாம் அரேபியா முழுவதும் பரவுகிறது. கற்கோயில்கள் ஆசியா முழுவதும் எழுகின்றன — அதே நேரத்தில் பல்லவ கட்டிடக் கலைஞர்கள் மலைகளை ஆலயங்களாக செதுக்கும் கலையில் தேர்ச்சி பெறுகின்றனர்.",
  },
  "nayanars-and-alvars-bhakti-movement": {
    en: "Charlemagne is crowned Holy Roman Emperor. The Abbasid Caliphate rules from Baghdad to Spain. Religions compete for souls across continents — while 75 Tamil poet-saints revolutionize Hindu worship through vernacular devotion.",
    ta: "சார்லமேன் புனித ரோமானிய பேரரசராக முடிசூட்டப்படுகிறார். அப்பாசிய கலிபாத்து பாக்தாத்திலிருந்து ஸ்பெயின் வரை ஆள்கிறது. மதங்கள் கண்டங்கள் முழுவதும் ஆன்மாக்களுக்காக போட்டியிடுகின்றன — அதே நேரத்தில் 75 தமிழ் கவி-புனிதர்கள் மக்கள் மொழி பக்தி மூலம் இந்து வழிபாட்டை புரட்சிகரமாக்குகின்றனர்.",
  },
  "manigramam-guild-in-thailand": {
    en: "The Abbasid Caliphate rules from Baghdad. Vikings raid European coasts. Trade networks span continents — while Tamil merchant guilds establish permanent bases across Southeast Asia.",
    ta: "அப்பாசிய கலிபாத்து பாக்தாத்திலிருந்து ஆள்கிறது. வைக்கிங்கள் ஐரோப்பிய கடற்கரைகளைச் சூறையாடுகின்றனர். வர்த்தக வலையமைப்புகள் கண்டங்களை விரிவாக்குகின்றன — அதே நேரத்தில் தமிழ் வணிகக் குழுக்கள் தென்கிழக்கு ஆசியா முழுவதும் நிரந்தர தளங்களை நிறுவுகின்றன.",
  },

  // Chola Empire
  "rajaraja-i-reign": {
    en: "The Holy Roman Empire forms in Europe. The Fatimid Caliphate rules Egypt. Kings build to immortalize themselves — while Rajaraja I commissions a temple that will stand for a millennium.",
    ta: "புனித ரோமானியப் பேரரசு ஐரோப்பாவில் உருவாகிறது. ஃபாத்திமியக் கலிபாத்து எகிப்தை ஆள்கிறது. மன்னர்கள் தங்களை நிலைநிறுத்த கட்டுகின்றனர் — அதே நேரத்தில் ராஜராஜன் ஒரு மில்லினியத்திற்கு நிற்கும் கோயிலை ஆணையிடுகிறார்.",
  },
  "brihadeeswarar-temple-completed": {
    en: "Vikings reach North America. The Song Dynasty invents movable type in China. Baghdad's House of Wisdom leads the Islamic Golden Age — while Chola architects raise an 80-ton capstone without cranes.",
    ta: "வைக்கிங்கள் வட அமெரிக்காவை அடைகின்றனர். சாங் வம்சம் சீனாவில் நகரும் அச்சை கண்டுபிடிக்கிறது. பாக்தாத்தின் ஞான இல்லம் இஸ்லாமிய பொற்காலத்தை வழிநடத்துகிறது — அதே நேரத்தில் சோழ கட்டிடக் கலைஞர்கள் கிரேன்கள் இல்லாமல் 80 டன் கல்லை உயர்த்துகின்றனர்.",
  },
  "rajendra-chola-defeats-srivijaya": {
    en: "William the Conqueror invades England. The First Crusade captures Jerusalem. Naval power reshapes geopolitics — while Chola fleets cross 1,500 miles of open ocean to defeat Srivijaya.",
    ta: "வில்லியம் வெற்றியாளர் இங்கிலாந்தைப் படையெடுக்கிறார். முதல் சிலுவைப்போர் எருசலேமைக் கைப்பற்றுகிறது. கடற்படை சக்தி புவிசார் அரசியலை மறுவடிவமைக்கிறது — அதே நேரத்தில் சோழக் கப்பற்படைகள் ஸ்ரீவிஜயத்தை தோற்கடிக்க 1,500 மைல் திறந்த கடலைக் கடக்கின்றன.",
  },
  "ayyavole-guild-in-sumatra": {
    en: "The Crusades reshape the Mediterranean. Genoa and Venice dominate European trade. Merchant guilds become political powers — while Tamil traders establish commercial networks rivaling any in the world.",
    ta: "சிலுவைப்போர்கள் மத்தியதரைக் கடலை மறுவடிவமைக்கின்றன. ஜெனோவா மற்றும் வெனிஸ் ஐரோப்பிய வர்த்தகத்தில் ஆதிக்கம் செலுத்துகின்றன. வணிகக் குழுக்கள் அரசியல் சக்திகளாகின்றன — அதே நேரத்தில் தமிழ் வணிகர்கள் உலகில் எதற்கும் நிகரான வணிக வலையமைப்புகளை நிறுவுகின்றனர்.",
  },

  // Pandya Revival
  "jatavarman-sundara-pandya-i-richest-empire": {
    en: "Marco Polo travels the Silk Road. The Mongol Empire rules from China to Persia. Travelers document wonders — while Polo himself calls the Pandya kingdom 'the richest empire in existence.'",
    ta: "மார்க்கோ போலோ பட்டுப் பாதையில் பயணிக்கிறார். மங்கோலியப் பேரரசு சீனாவிலிருந்து பாரசீகம் வரை ஆள்கிறது. பயணிகள் அதிசயங்களை ஆவணப்படுத்துகின்றனர் — அதே நேரத்தில் போலோவே பாண்டிய ராஜ்ஜியத்தை 'இருக்கும் மிகச்சிறந்த பேரரசு' என்கிறார்.",
  },

  // Vijayanagara / Nayak
  "vijayanagara-empire-founded": {
    en: "The Black Death devastates Europe. The Ming Dynasty rises in China. Empires fall and rise across continents — while Vijayanagara emerges to preserve Hindu traditions against northern invasions.",
    ta: "கருப்பு மரணம் ஐரோப்பாவை அழிக்கிறது. மிங் வம்சம் சீனாவில் எழுகிறது. பேரரசுகள் கண்டங்கள் முழுவதும் வீழ்ந்து எழுகின்றன — அதே நேரத்தில் விஜயநகரம் வடக்கு படையெடுப்புகளுக்கு எதிராக இந்து மரபுகளைப் பாதுகாக்க எழுகிறது.",
  },

  // Colonial
  "british-establish-fort-st-george": {
    en: "The Thirty Years' War ends in Europe. The Mughal Empire rules India. European trading companies compete for Asian markets — while a small fort in Madras becomes the seed of British India.",
    ta: "முப்பது ஆண்டுப் போர் ஐரோப்பாவில் முடிகிறது. முகலாயப் பேரரசு இந்தியாவை ஆள்கிறது. ஐரோப்பிய வர்த்தக நிறுவனங்கள் ஆசிய சந்தைகளுக்காக போட்டியிடுகின்றன — அதே நேரத்தில் மெட்ராஸில் ஒரு சிறிய கோட்டை பிரிட்டிஷ் இந்தியாவின் விதையாகிறது.",
  },

  // Modern
  "tamil-nadu-state-formed": {
    en: "India wins independence from Britain. The Cold War divides the world. Linguistic identity becomes political — while Tamil Nadu asserts its cultural distinctiveness within democratic India.",
    ta: "இந்தியா பிரிட்டனிடமிருந்து சுதந்திரம் பெறுகிறது. பனிப்போர் உலகைப் பிரிக்கிறது. மொழி அடையாளம் அரசியலாகிறது — அதே நேரத்தில் தமிழ்நாடு ஜனநாயக இந்தியாவுக்குள் தனது கலாச்சார தனித்துவத்தை உறுதிப்படுத்துகிறது.",
  },
  "tamil-recognized-as-classical-language": {
    en: "India emerges as an IT superpower. Globalization connects cultures. Ancient languages face extinction — while Tamil becomes the first Indian language officially recognized as 'Classical.'",
    ta: "இந்தியா ஐடி வல்லரசாக உருவெடுக்கிறது. உலகமயமாக்கல் கலாச்சாரங்களை இணைக்கிறது. பண்டைய மொழிகள் அழிவை எதிர்கொள்கின்றன — அதே நேரத்தில் தமிழ் 'செம்மொழி' என்று அதிகாரபூர்வமாக அங்கீகரிக்கப்பட்ட முதல் இந்திய மொழியாகிறது.",
  },
};

/**
 * Era labels for timeline navigation
 */
export const eraLabels: Record<string, { en: string; ta: string }> = {
  PREHISTORIC: { en: "Prehistoric · Deep Time", ta: "வரலாற்றுக்கு முற்பட்ட · ஆழ்ந்த காலம்" },
  PRE_SANGAM: { en: "Pre-Sangam · Iron Age", ta: "சங்க காலத்திற்கு முன் · இரும்பு யுகம்" },
  SANGAM: { en: "Sangam Age", ta: "சங்க காலம்" },
  POST_SANGAM: { en: "Post-Sangam", ta: "சங்க காலத்திற்கு பின்" },
  PALLAVA: { en: "Pallava Period", ta: "பல்லவர் காலம்" },
  CHOLA: { en: "Chola Empire", ta: "சோழ பேரரசு" },
  PANDYA_REVIVAL: { en: "Pandya Revival", ta: "பாண்டிய மறுமலர்ச்சி" },
  NAYAK: { en: "Nayak Period", ta: "நாயக்கர் காலம்" },
  COLONIAL: { en: "Colonial Period", ta: "காலனிய காலம்" },
  MODERN: { en: "Modern Era", ta: "நவீன காலம்" },
};
