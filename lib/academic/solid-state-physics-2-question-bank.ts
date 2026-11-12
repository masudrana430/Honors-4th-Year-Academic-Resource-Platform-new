export interface SolidStatePhysics2Question {
  number: string;
  text: string;
  aliases: string[];
}

export interface SolidStatePhysics2TopicQuestionSet {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: SolidStatePhysics2Question[];
}

/**
 * QC question list supplied for Solid State Physics-2 (PHYS-403).
 * Existing lecture mappings are taken from the seeded subject curriculum.
 * Questions without a clear existing video mapping route to their chapter topic.
 */
export const SOLID_STATE_PHYSICS_2_QUESTION_BANK: SolidStatePhysics2TopicQuestionSet[] = [
  {
    chapterNumber: 1, topicNumber: 1, code: "১", title: "কঠিন পদার্থের ব্যান্ড তত্ত্ব",
    lectures: {
      "1": ["1"],
      "2": ["2", "4"],
      "3": ["3", "8"],
      "4": ["7", "6"],
      "5": ["5"],
      "6": ["9"]
    },
    questions: [
      { number: "1", text: "কঠিন পদার্থের ব্যান্ড তত্ত্বের আলোকে পরিবাহী, অপরিবাহী ও অর্ধপরিবাহীর মধ্যে পার্থক্য আলোচনা কর।", aliases: ["পরিবাহী অপরিবাহী অর্ধপরিবাহীর ব্যান্ড তত্ত্ব", "conductor insulator semiconductor band theory", "difference between conductors insulators and semiconductors"] },
      { number: "2", text: "ব্লখ ওয়াল কী? ব্লখ ওয়ালের পুরুত্ব কোন কোন বিষয়ের উপর নির্ভর করে আলোচনা কর।", aliases: ["ব্লখ ওয়াল কী", "Bloch wall thickness", "Bloch wall and factors affecting thickness"] },
      { number: "3", text: "দৃঢ় বন্ধন আসন্নায়ন মডেল অনুসারে একটি সরল ঘনকীয় ল্যাটিসের কার্যকরী ভর এবং শক্তি ব্যান্ডের প্রশস্ততা বের কর। অথবা, দৃঢ় বন্ধন সন্নিকর্ষ পদ্ধতি বর্ণনা কর এবং শক্তির রাশিমালা প্রতিষ্ঠা কর।", aliases: ["দৃঢ় বন্ধন আসন্নায়ন", "tight binding approximation", "effective mass simple cubic lattice tight binding bandwidth"] },
      { number: "4", text: "কঠিন পদার্থের শক্তিব্যান্ড কীভাবে উদ্ভব হয় ব্যাখ্যা কর।", aliases: ["শক্তিব্যান্ডের উদ্ভব", "origin of energy bands in solids", "formation of energy bands"] },
      { number: "5", text: "ব্লখ তত্ত্বটি লেখ ও প্রমাণ কর।", aliases: ["ব্লখ উপপাদ্য প্রমাণ", "Bloch theorem proof", "Bloch theory"] },
      { number: "6", text: "কঠিন পদার্থের শক্তি ফাঁকের উৎস ব্যাখ্যা কর।", aliases: ["শক্তি ফাঁকের উৎস", "origin of energy gap in solids", "origin of band gap"] },
      { number: "7", text: "দেখাও যে, ইলেকট্রনের কার্যকরী ভর $m^* = \\frac{\\hbar^2}{\\frac{d^2E}{dk^2}}$। অথবা, হোলের ধারণা ব্যক্ত করে ইলেকট্রনের কার্যকরী ভরের রাশিমালা বের কর। দেখাও যে, $m_h^* = -m_e^*$।", aliases: ["ইলেকট্রনের কার্যকরী ভর", "effective mass of electron", "hole effective mass negative electron effective mass"] },
      { number: "8", text: "কঠিন বস্তুর ইলেকট্রনের শক্তিস্তর নির্ণয়ে ব্যবহৃত LCAO প্রণালীর মৌলিক স্বীকার্যসমূহ কী কী ব্যাখ্যা কর।", aliases: ["LCAO প্রণালীর স্বীকার্য", "LCAO method assumptions", "linear combination of atomic orbitals"] },
      { number: "9", text: "ক্রনিগ-পেনি মডেল অনুসারে পর্যায়বৃত্ত বিভবে ইলেকট্রনের প্রকৃতি বর্ণনা কর।", aliases: ["ক্রনিগ পেনি মডেল", "Kronig Penney model", "electron in periodic potential Kronig Penney"] }
    ]
  },
  {
    chapterNumber: 2, topicNumber: 1, code: "২", title: "ফার্মি তল ও ধাতু",
    lectures: {
      "1": ["9"],
      "2": ["7"],
      "3": ["8", "6", "4"],
      "4": ["1", "11"],
      "5": ["10"],
      "6": ["2", "5", "3"],
      "7": ["12"]
    },
    questions: [
      { number: "1", text: "উইগনার-সেইজ সেলুলার পদ্ধতির মূল বক্তব্যগুলো লিখ।", aliases: ["উইগনার সেইজ সেলুলার পদ্ধতি", "Wigner Seitz cellular method", "Wigner-Seitz cell"] },
      { number: "2", text: "ডি-হ্যাস-ভ্যান-আলফেন প্রভাব বর্ণনা কর।", aliases: ["ডি হ্যাস ভ্যান আলফেন প্রভাব", "de Haas van Alphen effect", "de Haas–van Alphen effect"] },
      { number: "3", text: "ইলেকট্রন অরবিট, হোল অরবিট এবং ওপেন অরবিট বলতে কী বুঝ।", aliases: ["ইলেকট্রন হোল ওপেন অরবিট", "electron orbit hole orbit open orbit", "closed and open orbits in metals"] },
      { number: "4", text: "ফার্মি লেভেলের ভৌত তাৎপর্য বর্ণনা কর।", aliases: ["ফার্মি লেভেলের ভৌত তাৎপর্য", "physical significance of Fermi level", "Fermi energy significance"] },
      { number: "5", text: "একটি বর্গ ল্যাটিসের জন্য ফার্মিতলের গঠন বর্ণনা কর।", aliases: ["বর্গ ল্যাটিসের ফার্মি তল", "Fermi surface square lattice", "Fermi surface for square lattice"] },
      { number: "6", text: "মুক্ত প্রায় ইলেকট্রন মডেলের গুরুত্বপূর্ণ বৈশিষ্ট্য আলোচনা কর।", aliases: ["মুক্ত প্রায় ইলেকট্রন মডেল", "nearly free electron model characteristics", "nearly free electron model"] },
      { number: "7", text: "পর্যায়ক্রমিক অঞ্চল/জোন স্কিম ব্যাখ্যা কর।", aliases: ["জোন স্কিম", "zone scheme in solid state physics", "periodic zone scheme"] },
      { number: "8", text: "প্রায় মুক্ত ইলেকট্রন মডেল ব্যাখ্যা কর/আলোচনা কর।", aliases: ["প্রায় মুক্ত ইলেকট্রন মডেল ব্যাখ্যা", "nearly free electron model explanation"] },
      { number: "9", text: "চিত্রসহ ক্রোমকৃত স্কিমজোন বিভব ব্যাখ্যা কর।", aliases: ["ক্রোমকৃত স্কিমজোন বিভব", "reduced zone scheme potential", "reduced zone scheme"] },
      { number: "10", text: "চৌম্বক ক্ষেত্রের তীব্রতার সাথে অরবিটালের কোয়ান্টাইজেশন আলোচনা কর।", aliases: ["অরবিটালের কোয়ান্টাইজেশন চৌম্বক ক্ষেত্র", "quantization of orbits magnetic field", "Landau orbit quantization"] },
      { number: "11", text: "উইগনার-সেইজ পদ্ধতিতে আসন্নকৃত তরঙ্গফাংশন ও আইগেন মান নির্ণয় কর।", aliases: ["উইগনার সেইজ তরঙ্গফাংশন আইগেন মান", "Wigner Seitz approximate wave function eigenvalue", "Wigner-Seitz method wavefunction eigenvalues"] },
      { number: "12", text: "ক্লসিয়াস-মসটি সম্পর্ক প্রতিপাদন কর।", aliases: ["ক্লসিয়াস মসটি সম্পর্ক", "Clausius Mossotti relation", "Clausius-Mossotti equation"] },
      { number: "13", text: "কপারের ফার্মিতল বর্ণনা কর।", aliases: ["কপারের ফার্মি তল", "Fermi surface of copper", "copper Fermi surface"] }
    ]
  },
  {
    chapterNumber: 3, topicNumber: 1, code: "৩", title: "ডাই-ইলেকট্রিক ধর্মাবলি",
    lectures: {
      "1": ["5", "4"],
      "2": ["2", "9", "3"],
      "3": ["1"],
      "4": ["6", "8"],
      "5": ["7"],
      "6": ["10"]
    },
    questions: [
      { number: "1", text: "পোলের ফেরোইলেকট্রিক তত্ত্ব আলোচনা কর।", aliases: ["পোলের ফেরোইলেকট্রিক তত্ত্ব", "Pohl ferroelectric theory", "ferroelectric theory of Pohl"] },
      { number: "2", text: "স্থির ডাই-ইলেকট্রিক ধ্রুবক বলতে কী বুঝ? স্থির ডাই-ইলেকট্রিক ধ্রুবকের আণুবীক্ষণিক বর্ণনা দাও।", aliases: ["স্থির ডাই ইলেকট্রিক ধ্রুবক", "static dielectric constant microscopic description", "microscopic theory of static dielectric constant"] },
      { number: "3", text: "অপরিবাহী বস্তুর ডাই-ইলেকট্রিক বৈশিষ্ট্যসমূহ ব্যাখ্যা কর।", aliases: ["অপরিবাহীর ডাই ইলেকট্রিক বৈশিষ্ট্য", "dielectric properties of insulators", "dielectric characteristics of insulating materials"] },
      { number: "4", text: "বৈদ্যুতিক/ইলেকট্রিক পোলারাইজেশন এবং আলোকীয় শোষণ ব্যাখ্যা কর।", aliases: ["ইলেকট্রিক পোলারাইজেশন ও আলোকীয় শোষণ", "electric polarization optical absorption", "polarization and optical absorption"] },
      { number: "5", text: "$\\alpha_d = \\frac{p^2}{3k_B T}$ সমীকরণ প্রতিপাদন কর।", aliases: ["আলফা ডি p square 3 kBT", "dielectric polarizability alpha d p squared 3 kBT", "Debye polarizability equation"] },
      { number: "6", text: "সোডিয়াম ক্লোরাইড ক্রিস্টালের স্থৈতিক ডাই-ইলেকট্রিক ধ্রুবক 5.6 এবং আলোকীয় প্রতিসরাঙ্ক 1.5। আয়নিক পোলারাইজেবিলিটির শতকরা হার বের কর।", aliases: ["সোডিয়াম ক্লোরাইড আয়নিক পোলারাইজেবিলিটি", "NaCl ionic polarizability percentage", "ionic polarizability of sodium chloride"] },
      { number: "7", text: "দেখাও যে, একটি পরাবৈদ্যুতিক মাধ্যমে শক্তির অপচয় $\\sin\\delta$ এর সমানুপাতিক, যেখানে $\\delta$ অপচয় কোণ নির্দেশ করে।", aliases: ["ডাই ইলেকট্রিক শক্তির অপচয় sin delta", "dielectric loss proportional to sin delta", "dielectric loss angle"] },
      { number: "8", text: "পারমাণবিক ও ইলেকট্রিক পোলারাইজিবিলিটির মধ্যে পার্থক্য কর।", aliases: ["পারমাণবিক ও ইলেকট্রিক পোলারাইজিবিলিটি পার্থক্য", "atomic and electronic polarizability difference"] },
      { number: "9", text: "$P = (K - 1)\\frac{E}{4\\pi}$ সমীকরণ প্রতিপাদন কর।", aliases: ["P K minus one E four pi", "polarization equation dielectric constant", "P equals K minus 1 E over 4 pi"] },
      { number: "10", text: "জটিল ডাই-ইলেকট্রিক ধ্রুবকের ক্ষেত্রে ডিবাই সমীকরণ প্রতিপাদন কর। ডিপোল বিকৃতি ও ডাই-ইলেকট্রিক ক্ষতি সম্পর্কিত ঘটনা, সর্বোচ্চ শক্তি শোষণ শর্ত এবং বিরাম/শ্লথ কাল ব্যাখ্যা কর।", aliases: ["ডিবাই সমীকরণ জটিল ডাই ইলেকট্রিক ধ্রুবক", "Debye equation complex dielectric constant", "dipole relaxation dielectric loss maximum energy absorption condition relaxation time"] },
      { number: "11", text: "পিজো ইলেকট্রিক ক্রিয়া ব্যাখ্যা কর।", aliases: ["পিজো ইলেকট্রিক ক্রিয়া", "piezoelectric effect", "piezoelectric phenomenon"] }
    ]
  },
  {
    chapterNumber: 4, topicNumber: 1, code: "৪", title: "অর্ধ-পরিবাহী",
    lectures: {
      "1": ["11", "2"],
      "2": ["1", "6", "9", "10"],
      "3": ["8"],
      "4": ["5"],
      "5": ["3", "7"],
      "6": ["4"],
      "7": ["7"]
    },
    questions: [
      { number: "1", text: "অর্ধ-পরিবাহীর প্রত্যক্ষ ও পরোক্ষ শক্তি ফাঁক ব্যাখ্যা কর।", aliases: ["প্রত্যক্ষ ও পরোক্ষ শক্তি ফাঁক", "direct and indirect band gap semiconductor", "direct indirect energy gap"] },
      { number: "2", text: "অর্ধ-পরিবাহীর ধর্ম সম্পর্কিত বৈশিষ্ট্যগুলো কী?", aliases: ["অর্ধপরিবাহীর বৈশিষ্ট্য", "properties of semiconductors", "characteristics of semiconductor"] },
      { number: "3", text: "একটি অবিশুদ্ধ অর্ধ-পরিবাহীর দাতা ও গ্রহীতা শক্তিস্তর ব্যাখ্যা কর।", aliases: ["দাতা ও গ্রহীতা শক্তিস্তর", "donor and acceptor energy levels", "impurity energy levels semiconductor"] },
      { number: "4", text: "অপরিবাহী, অর্ধপরিবাহী এবং পরিবাহী পদার্থের মধ্যে পার্থক্য দেখাও।", aliases: ["অপরিবাহী অর্ধপরিবাহী পরিবাহীর পার্থক্য", "insulator semiconductor conductor difference"] },
      { number: "5", text: "প্রমাণ কর যে, বিশুদ্ধ অর্ধপরিবাহীর ক্ষেত্রে ফার্মি লেভেল নিষিদ্ধ শক্তিগ্যাপের মাঝখানে অবস্থান করে।", aliases: ["বিশুদ্ধ অর্ধপরিবাহীর ফার্মি লেভেল", "Fermi level intrinsic semiconductor middle of band gap", "intrinsic Fermi level proof"] },
      { number: "6", text: "আধান বাহকের লাইফ টাইম ও জাংশন ধারকত্ব ব্যাখ্যা কর।", aliases: ["আধান বাহকের লাইফ টাইম", "carrier lifetime junction capacitance", "charge carrier lifetime"] },
      { number: "7", text: "একটি টানেল ডায়োডের কারেন্ট-ভোল্টেজ (V-I) বৈশিষ্ট্য ব্যাখ্যা কর।", aliases: ["টানেল ডায়োড V I বৈশিষ্ট্য", "tunnel diode current voltage characteristics", "tunnel diode VI curve"] },
      { number: "8", text: "দেখাও যে, n-টাইপ অর্ধপরিবাহীর পরিবাহী ব্যান্ডে ইলেকট্রন ঘনত্ব দাতা শক্তিস্তরের ঘনত্বের বর্গমূলের সমানুপাতিক এবং তাপমাত্রা বৃদ্ধির সাথে এর আচরণ সহজাত অর্ধপরিবাহীর আচরণের দিকে অভিগমন করে।", aliases: ["n type electron density donor level square root", "n-type semiconductor carrier concentration donor density", "intrinsic behaviour at high temperature"] },
      { number: "9", text: "কীভাবে p-n জাংশনের ঘাটতি স্তর/ডিপ্লেশন স্তর/প্রতিবন্ধকতা স্তর সৃষ্টি হয় ব্যাখ্যা কর।", aliases: ["p n জাংশনের ডিপ্লেশন স্তর সৃষ্টি", "formation of depletion layer in pn junction", "potential barrier pn junction"] },
      { number: "10", text: "ভেজাল অর্ধপরিবাহীর শক্তিচিত্র অঙ্কন করে সৃষ্ট বিভবের রাশিমালা বের কর।", aliases: ["ভেজাল অর্ধপরিবাহীর শক্তিচিত্র", "energy band diagram extrinsic semiconductor", "potential of doped semiconductor"] },
      { number: "11", text: "জার্মেনিয়ামের শক্তি ফাঁক $0.75\\text{ eV}$। কত তরঙ্গদৈর্ঘ্যের জার্মেনিয়াম আলোক রশ্মি শোষণ করতে শুরু করবে?", aliases: ["জার্মেনিয়ামের শক্তি ফাঁক থেকে তরঙ্গদৈর্ঘ্য", "germanium absorption wavelength 0.75 eV", "cutoff wavelength germanium"] },
      { number: "12", text: "$300\\text{ K}$ তাপমাত্রায় জার্মেনিয়ামের সহজাত বাহক ঘনত্ব নির্ণয় কর। দেওয়া আছে $m_e = 0.12m_0$, $m_h = 0.28m_0$, $E_g = 0.6\\text{ eV}$।", aliases: ["জার্মেনিয়ামের সহজাত বাহক ঘনত্ব 300 K", "intrinsic carrier concentration germanium 300 K", "Ge intrinsic carrier density"] },
      { number: "13", text: "বিশুদ্ধ অর্ধপরিবাহীর তাড়ন বেগ, মোবিলিটি এবং পরিবাহিতার সমীকরণ প্রতিপাদন কর। অথবা, অর্ধপরিবাহীর মোট পরিবাহিতার সমীকরণ প্রতিপাদন কর।", aliases: ["অর্ধপরিবাহীর drift velocity mobility conductivity", "semiconductor conductivity equation derivation", "total conductivity of semiconductor"] },
      { number: "14", text: "সহজাত ও বহিঃজাত অর্ধপরিবাহীর মধ্যে পার্থক্য দেখাও।", aliases: ["সহজাত ও বহিঃজাত অর্ধপরিবাহীর পার্থক্য", "intrinsic and extrinsic semiconductor difference"] }
    ]
  },
  {
    chapterNumber: 5, topicNumber: 1, code: "৫", title: "অতি-পরিবাহীতা",
    lectures: {
      "1": ["2", "1", "10"],
      "2": ["5", "7"],
      "3": ["4"],
      "4": ["8", "6"],
      "5": ["9", "3"],
      "6": ["11"]
    },
    questions: [
      { number: "1", text: "অতি-পরিবাহী বস্তুর ধর্মগুলো আলোচনা কর।", aliases: ["অতি পরিবাহীর ধর্ম", "properties of superconductors", "characteristics of superconductivity"] },
      { number: "2", text: "জোসেফসন প্রভাব কী? এসি ও ডিসি জোসেফসন প্রভাব আলোচনা কর।", aliases: ["এসি ডিসি জোসেফসন প্রভাব", "AC and DC Josephson effect", "Josephson effect"] },
      { number: "3", text: "মেইজনার ক্রিয়া ব্যাখ্যা কর।", aliases: ["মেইজনার ক্রিয়া", "Meissner effect", "Meissner phenomenon"] },
      { number: "4", text: "সংকট ক্ষেত্র ও সংকট তাপমাত্রা বলতে কী বুঝ?", aliases: ["সংকট ক্ষেত্র সংকট তাপমাত্রা", "critical field critical temperature superconductivity"] },
      { number: "5", text: "জোসেফসন ইফেক্ট ও ফ্লাক্স কোয়ান্টাইজেশন ব্যাখ্যা কর।", aliases: ["জোসেফসন প্রভাব ও ফ্লাক্স কোয়ান্টাইজেশন", "Josephson effect and flux quantization"] },
      { number: "6", text: "টাইপ-I ও টাইপ-II অতিপরিবাহীতার মধ্যে পার্থক্য লিখ। অথবা, টাইপ-১ ও টাইপ-২ অতিপরিবাহীতার সাধারণ গুণাবলি বর্ণনা কর।", aliases: ["টাইপ ১ টাইপ ২ অতিপরিবাহীর পার্থক্য", "Type I and Type II superconductors difference"] },
      { number: "7", text: "অতিপরিবাহীতার ক্ষেত্রে ফ্লাক্স কোয়ান্টাইজেশন রাশি প্রতিষ্ঠিত কর।", aliases: ["ফ্লাক্স কোয়ান্টাইজেশন রাশি", "flux quantization in superconductors derivation"] },
      { number: "8", text: "অতিপরিবাহিতা সম্পর্কিত BCS তত্ত্ব বর্ণনা কর। ভূমি অবস্থা নির্দেশক তরঙ্গ ফাংশনের মৌলিক ধারণা ব্যাখ্যা কর।", aliases: ["BCS তত্ত্ব", "BCS theory of superconductivity", "Cooper pair ground state wavefunction"] },
      { number: "9", text: "জোসেফসন এসি প্রবাহ ঘনত্বের রাশিমালা নির্ণয় কর।", aliases: ["জোসেফসন এসি প্রবাহ ঘনত্ব", "AC Josephson current density"] },
      { number: "10", text: "উচ্চ $T_c$ অতিপরিবাহীতা সংক্ষেপে আলোচনা কর।", aliases: ["উচ্চ Tc অতিপরিবাহীতা", "high Tc superconductivity", "high temperature superconductors"] },
      { number: "11", text: "অতিপরিবাহীতার ক্ষেত্রে লন্ডন সমীকরণ প্রতিপাদন কর এবং দেখাও এর থেকে মেইজনার ক্রিয়া পাওয়া যায়।", aliases: ["লন্ডন সমীকরণ থেকে মেইজনার ক্রিয়া", "London equations Meissner effect derivation", "London equations superconductivity"] },
      { number: "12", text: "দেখাও যে, সাধারণ অবস্থা থেকে অতিপরিবাহী অবস্থা অধিক শৃঙ্খলিত।", aliases: ["অতিপরিবাহী অবস্থা অধিক শৃঙ্খলিত", "superconducting state more ordered than normal state", "entropy superconducting state"] }
    ]
  },
  {
    chapterNumber: 6, topicNumber: 1, code: "৬", title: "চুম্বকত্ব",
    lectures: {
      "1": ["4"],
      "2": ["2", "5", "10", "3", "6"],
      "3": ["12", "9", "7"]
    },
    questions: [
      { number: "1", text: "ফেরোচৌম্বক পদার্থের হিস্টেরেসিস ঘটনা বর্ণনা/ব্যাখ্যা কর।", aliases: ["ফেরোচৌম্বক হিস্টেরেসিস", "ferromagnetic hysteresis", "hysteresis loop ferromagnetism"] },
      { number: "2", text: "ডায়াচৌম্বক, প্যারাচৌম্বক ও ফেরোচৌম্বকত্বের পার্থক্য লিখ।", aliases: ["ডায়া প্যারা ফেরোচৌম্বকত্ব পার্থক্য", "diamagnetism paramagnetism ferromagnetism difference"] },
      { number: "3", text: "ফেরোচৌম্বক ও এন্টিফেরোচৌম্বকত্বের মধ্যে পার্থক্য লিখ।", aliases: ["ফেরো ও এন্টিফেরোচৌম্বকত্ব পার্থক্য", "ferromagnetism and antiferromagnetism difference"] },
      { number: "4", text: "ডায়াচৌম্বক পদার্থের ভেদ্যতার/সংবেদনশীলতার একটি রাশিমালা নির্ণয় কর কোয়ান্টাম তত্ত্বের সাহায্যে। অথবা, ডায়াচৌম্বক ভেদ্যতার একটি রাশিমালা নির্ণয় কর।", aliases: ["ডায়াচৌম্বক ভেদ্যতা কোয়ান্টাম তত্ত্ব", "quantum theory diamagnetic susceptibility", "diamagnetic susceptibility derivation"] },
      { number: "5", text: "ফেরোচৌম্বক ও ফেরিচৌম্বকত্বের মধ্যে পার্থক্য লিখ।", aliases: ["ফেরোচৌম্বক ফেরিচৌম্বকত্ব পার্থক্য", "ferromagnetism and ferrimagnetism difference"] },
      { number: "6", text: "ফেরোম্যাগনেটিজম, এন্টিফেরোম্যাগনেটিজম এবং ফেরি-ম্যাগনেটিজমের মধ্যে পার্থক্য কর।", aliases: ["ফেরো এন্টিফেরো ফেরিম্যাগনেটিজম পার্থক্য", "ferro antiferro ferrimagnetism comparison"] },
      { number: "7", text: "ল্যাঞ্জেভিনের প্যারাচৌম্বকত্বের সমীকরণ প্রতিপাদন কর এবং এ হতে কুরি সূত্র বিবৃত কর।", aliases: ["ল্যাঞ্জেভিনের প্যারাচৌম্বকত্ব", "Langevin theory paramagnetism Curie law", "Langevin paramagnetic equation"] },
      { number: "8", text: "ফেরোচৌম্বক ও ফেরিচৌম্বক শৃঙ্খলার মধ্যে পার্থক্য লিখ।", aliases: ["ফেরোচৌম্বক ফেরিচৌম্বক শৃঙ্খলার পার্থক্য", "ferromagnetic and ferrimagnetic ordering"] },
      { number: "9", text: "প্যারাচৌম্বক পদার্থে স্থায়ী চৌম্বক ভ্রামকের উপস্থিতি কীভাবে গ্রহণযোগ্য হবে?", aliases: ["প্যারাচৌম্বকে স্থায়ী চৌম্বক ভ্রামক", "permanent magnetic moment in paramagnetic materials", "permanent magnetic dipole paramagnetism"] },
      { number: "10", text: "ফেরোচৌম্বক বস্তুসমূহের বৈশিষ্ট্যগুলো আলোচনা কর।", aliases: ["ফেরোচৌম্বক পদার্থের বৈশিষ্ট্য", "properties of ferromagnetic materials"] },
      { number: "11", text: "স্বতঃস্ফূর্ত চুম্বকায়ন বলতে কী বুঝ? চৌম্বক ডোমেন কীভাবে গঠিত হয়? অথবা, চৌম্বক ডোমেন তত্ত্ব ব্যাখ্যা কর।", aliases: ["স্বতঃস্ফূর্ত চুম্বকায়ন ও ডোমেন", "spontaneous magnetization magnetic domains", "magnetic domain theory"] },
      { number: "12", text: "প্যারাচৌম্বকের কোয়ান্টাম তত্ত্ব আলোচনা কর এবং কুরি নিয়ম বর্ণনা কর।", aliases: ["প্যারাচৌম্বকের কোয়ান্টাম তত্ত্ব", "quantum theory of paramagnetism Curie law"] },
      { number: "13", text: "ফেরোচুম্বকের ক্ষেত্রে কুরি-ওয়েইস সূত্র প্রতিপাদন কর।", aliases: ["কুরি ওয়েইস সূত্র ফেরোচুম্বক", "Curie Weiss law ferromagnetism", "Curie-Weiss law derivation"] },
      { number: "14", text: "কোন মাধ্যমের প্রবেশ্যতা ও সংবেদনশীলতার মধ্যে সম্পর্ক স্থাপন কর।", aliases: ["প্রবেশ্যতা ও সংবেদনশীলতার সম্পর্ক", "relation between permeability and susceptibility", "magnetic permeability susceptibility relation"] }
    ]
  }
];

const BENGALI_DIGITS: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
};

function toBengaliDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
}

function questionTextForTitle(value: string): string {
  return value.replace(/\s+/g, " ").replace(/[।.]+$/, "").trim();
}

/** Adds complete QC wording only to lectures with an explicit question mapping. */
export function buildSolidStatePhysics2LectureTitle(
  chapterNumber: number,
  topicNumber: number,
  lectureNumber: number,
  currentTitle: string
): string {
  const topic = SOLID_STATE_PHYSICS_2_QUESTION_BANK.find(
    (entry) => entry.chapterNumber === chapterNumber && entry.topicNumber === topicNumber
  );
  const questionNumbers = topic?.lectures[lectureNumber];
  if (!topic || !questionNumbers?.length) return currentTitle;

  const details = questionNumbers.map((number) => {
    const question = topic.questions.find((entry) => entry.number === number);
    return question ? "-" + toBengaliDigits(number) + " (" + questionTextForTitle(question.text) + ")" : null;
  }).filter((value): value is string => Boolean(value));

  const oldQuestionList = currentTitle.match(/প্রশ্ন\s*নং\s*\(([^)]*)\)/)?.[1] || "";
  const extras = oldQuestionList.split(",").map((value) => value.trim())
    .filter((value) => value && !/^[0-9০-৯]+$/.test(value))
    .map((value) => value.replace(/^[0-9০-৯]+\s*\+\s*/, "").trim())
    .filter(Boolean);
  const noteTags = Array.from(currentTitle.matchAll(/\[[^\]]+\]/g)).map((match) => match[0]);
  const rawPrefix = currentTitle.split(" — ")[0] || "Lec " + lectureNumber;
  const chapterDigits = toBengaliDigits(chapterNumber);
  const prefix = rawPrefix.replace(new RegExp("^" + chapterDigits + "\\s+"), "");
  const chapterPrefix = chapterDigits + " " + prefix;
  const titleBody = currentTitle.split(" — ").slice(1).join(" — ");
  const bodyWithoutQuestion = titleBody
    .replace(/প্রশ্ন\s*নং\s*\([^)]*\)/, "")
    .replace(/\[[^\]]+\]/g, "")
    .replace(/\|\s*[^|]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
  const label = currentTitle.match(/\|\s*([^|]+)$/)?.[1]?.trim() || bodyWithoutQuestion || topic.title;
  const preservedNotes = [...extras, ...noteTags.map((note) => note.replace(/^\[|\]$/g, ""))].join(", ");
  const extraSuffix = preservedNotes ? " [" + preservedNotes + "]" : "";
  return chapterPrefix + " — প্রশ্ন নং " + details.join("; ") + extraSuffix + " | " + label;
}

export function getSolidStatePhysics2LectureNumbersForQuestion(
  topic: SolidStatePhysics2TopicQuestionSet,
  questionNumber: string
): number[] {
  return Object.entries(topic.lectures)
    .filter(([, questionNumbers]) => questionNumbers.includes(questionNumber))
    .map(([lectureNumber]) => Number(lectureNumber));
}
