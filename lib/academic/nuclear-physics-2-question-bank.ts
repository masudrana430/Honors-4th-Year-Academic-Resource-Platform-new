export interface NuclearPhysics2Question {
  number: string;
  text: string;
  aliases: string[];
}

export interface NuclearPhysics2TopicQuestionSet {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: NuclearPhysics2Question[];
}

/**
 * QC list supplied for Nuclear Physics-2 (PHYS-401).
 * Video mappings follow only the question numbers already present in the seeded
 * lecture catalog. Questions without an explicit lecture mapping open the topic.
 */
export const NUCLEAR_PHYSICS_2_QUESTION_BANK: NuclearPhysics2TopicQuestionSet[] = [
  {
    chapterNumber: 1, topicNumber: 1, code: "১", title: "দুই নিউক্লিয়ন ব্যবস্থা: ডিউটেরন",
    lectures: {
      "1": ["4", "5", "6", "7", "1"],
      "2": ["8", "9", "10", "11", "12", "13"],
      "3": ["2", "3"]
    },
    questions: [
      { number: "1", text: "নিউক্লিয় পদার্থবিজ্ঞানে ডিউটেরনের গুরুত্ব আলোচনা কর।", aliases: ["ডিউটেরনের গুরুত্ব", "importance of deuteron", "deuteron importance in nuclear physics"] },
      { number: "2", text: "ডিউটেরনের ভূমি অবস্থায় অরীয় তরঙ্গ অপেক্ষকের সমাধান কর।", aliases: ["ডিউটেরনের ভূমি অবস্থার অরীয় তরঙ্গ অপেক্ষক", "radial wave function of deuteron ground state"] },
      { number: "3", text: "বিভব সীমা/পাল্লা এবং বিভব গভীরতার মধ্যে সম্পর্ক স্থাপন কর।", aliases: ["বিভব পাল্লা ও গভীরতার সম্পর্ক", "potential range and depth relation"] },
      { number: "4", text: "ডিউটেরনের $^3_1S \\;\\; ^3_1D$ অবস্থা ব্যাখ্যা কর।", aliases: ["ডিউটেরনের S D অবস্থা", "triplet S D states of deuteron", "deuteron 3S1 3D1 states"] },
      { number: "5", text: "টেনসর বলের অধীনে ডিউটেরনের তরঙ্গ অপেক্ষক নির্ণয় কর।", aliases: ["ডিউটেরনের টেনসর বল তরঙ্গ অপেক্ষক", "deuteron wave function under tensor force"] },
      { number: "6", text: "ডিউটেরনের S ও D অবস্থা দুটি ব্যাখ্যা কর এবং দেখাও যে মিশ্রন প্যারিটি সংরক্ষন করে।", aliases: ["S D state parity conservation", "ডিউটেরনের S D মিশ্রণ প্যারিটি", "parity conservation deuteron states"] },
      { number: "7", text: "ডিউটেরনের টেনসর বলের প্রয়োজনীয়তা সম্পর্কে লিখ বা ব্যাখ্যা কর।", aliases: ["ডিউটেরনে টেনসর বলের প্রয়োজনীয়তা", "need of tensor force in deuteron"] },
      { number: "8", text: "দেখাও যে, ডিউটেরন হাল্কাভাবে আবদ্ধ একটি নিউক্লিয় ব্যবস্থা যার কোন উত্তেজিত স্তর/শক্তিস্তর নেই।", aliases: ["ডিউটেরনের উত্তেজিত শক্তিস্তর নেই", "deuteron has no excited state", "loosely bound deuteron"] },
      { number: "9", text: "দেখাও যে, ডিউটেরন উত্তেজিত অবস্থায় থাকতে পারে না।", aliases: ["ডিউটেরন উত্তেজিত অবস্থায় থাকতে পারে না", "deuteron cannot be excited"] },
      { number: "10", text: "ভূমি অবস্থায় ডিউটেরনের বন্ধনশক্তি এবং বিভব কূপ গভীরতার মধ্যে সম্পর্ক স্থাপন কর।", aliases: ["ডিউটেরনের বন্ধনশক্তি ও বিভব গভীরতার সম্পর্ক", "deuteron binding energy potential well depth"] },
      { number: "11", text: "দেখাও যে, ডিউটেরন উত্তেজিত S- অবস্থায় থাকতে পারে না।", aliases: ["ডিউটেরনের excited S state নেই", "deuteron excited S state"] },
      { number: "12", text: "দেখাও যে, ডিউটেরন উত্তেজিত P অবস্থায় থাকতে পারে না।", aliases: ["ডিউটেরনের excited P state নেই", "deuteron excited P state"] },
      { number: "13", text: "ডিউটেরনের উত্তেজিত অবস্থার সম্ভাবনা নির্ণয় কর।", aliases: ["ডিউটেরনের উত্তেজিত অবস্থার সম্ভাবনা", "probability of excited state of deuteron"] },
      { number: "14", text: "ভূমি অবস্থায় ডিউটেরনের ধর্মসমূহ লেখ/গুনাগুন আলোচনা কর।", aliases: ["ডিউটেরনের ভূমি অবস্থার ধর্ম", "properties of deuteron ground state"] },
      { number: "15", text: "বর্গাকার বিভবের জন্য ডিউটেরনের ভূমি অবস্থার নর্মায়িত তরঙ্গ অপেক্ষক নির্ণয় কর অথবা, ভূমি/কেন্দ্রীয় বিভবের অধীনে ডিউটেরনের ভূমি অবস্থায় নর্মায়িত তরঙ্গ অপেক্ষক নির্ণয় কর।", aliases: ["ডিউটেরনের নর্মায়িত তরঙ্গ অপেক্ষক", "normalized ground state wave function deuteron", "square well deuteron wave function"] },
      { number: "16", text: "ডিউটেরনের বন্ধনশক্তি $2.26\\text{ MeV}$ হলে এর আকার নির্ণয় কর।", aliases: ["ডিউটেরনের আকার নির্ণয়", "deuteron size from binding energy 2.26 MeV", "deuteron radius"] }
    ]
  },
  {
    chapterNumber: 2, topicNumber: 1, code: "২", title: "দুই নিউক্লিয়ন ব্যবস্থা: বিক্ষেপণ",
    lectures: {
      "1": ["2", "1", "4", "3"],
      "2": ["5"]
    },
    questions: [
      { number: "1", text: "স্পিন সিংগলেট ও স্পিন ট্রিপলেট বলতে কী বুঝ? ডিউটেরন কি স্পিন ট্রিপলেট না স্পিন সিংগলেট নিউক্লিয়াস ব্যাখ্যা কর।", aliases: ["স্পিন সিংগলেট ট্রিপলেট", "ডিউটেরন স্পিন ট্রিপলেট না সিংগলেট", "spin singlet triplet deuteron"] },
      { number: "2", text: "দেখাও যে, বিক্ষেপন দৈর্ঘ্যের মাধ্যমে s তরঙ্গ বিক্ষেপন প্রস্থচ্ছেদ $\\sigma_{sc} = \\frac{4\\pi}{\\left[k^2 + \\frac{1}{a^2(k)}\\right]}$; প্রতীকগুলো প্রচলিত অর্থ বহন করে। অথবা, সমগ্র বিক্ষেপন প্রস্থচ্ছেদের রাশিমালা প্রতিপাদন কর।", aliases: ["s তরঙ্গ বিক্ষেপন প্রস্থচ্ছেদ", "scattering cross section scattering length", "sigma sc 4 pi k a"] },
      { number: "3", text: "$(p\\text{-}p)$ বিক্ষেপন এবং $(n\\text{-}p)$ বিক্ষেপন ব্যাখ্যা কর/পার্থক্য লিখ। অথবা, $nn$ এবং $np$ বিক্ষেপনের তুলনামূলক আলোচনা কর/পার্থক্য লিখ।", aliases: ["pp np scattering difference", "nn np scattering comparison", "প্রোটন প্রোটন নিউট্রন প্রোটন বিক্ষেপন"] },
      { number: "4", text: "$(n\\text{-}p)$ বিক্ষেপনের স্পিন নির্ভরশীলতা ব্যাখ্যা কর। অথবা, দেখাও যে, নিম্নশক্তি $(n\\text{-}p)$ বিক্ষেপনে s তরঙ্গের প্রাধান্য থাকে। অথবা, দেখাও যে, $(n\\text{-}p)$ বিক্ষেপন স্পিন ওরিয়েন্টেশন এর উপর নির্ভর করে।", aliases: ["np scattering spin dependence", "নিউট্রন প্রোটন বিক্ষেপনের স্পিন নির্ভরশীলতা", "low energy np s wave dominance"] },
      { number: "5", text: "$(n\\text{-}p)$ বিক্ষেপনের কার্যকরী পাল্লা তত্ত্ব আলোচনা কর। অথবা, s তরঙ্গ $(n\\text{-}p)$ বিক্ষেপনের কার্যকরী পাল্লা তত্ত্ব বিশ্লেষন করে এর আলোকে বিক্ষেপন প্রস্থচ্ছেদের রাশিমালা প্রতিপাদন কর এবং প্রস্থচ্ছেদের সূত্রে উপস্থিত চারটি প্যারামিটার কী কী।", aliases: ["np scattering effective range theory", "কার্যকর পাল্লা তত্ত্ব", "effective range parameters"] },
      { number: "6", text: "কার্যকর পাল্লা বলতে কী বুঝ/কাকে বলে? এর ভৌত তাৎপর্য লিখ।", aliases: ["কার্যকর পাল্লার ভৌত তাৎপর্য", "effective range physical significance"] },
      { number: "7", text: "দেখাও যে, নিউক্লিয়াসের সমগ্র বিক্ষেপন প্রস্থচ্ছেদ জ্যামিতিক প্রস্থচ্ছেদের দ্বিগুন।", aliases: ["বিক্ষেপন প্রস্থচ্ছেদ জ্যামিতিক প্রস্থচ্ছেদের দ্বিগুণ", "total scattering cross section twice geometrical cross section"] },
      { number: "8", text: "একটি বিশুদ্ধ s তরঙ্গ $(n\\text{-}p)$ নিউট্রন-প্রোটন নিম্নশক্তির বিক্ষেপনের জন্য শক্তির ঊর্দ্ধসীমা সম্পর্ক প্রতিষ্ঠা কর।", aliases: ["np low energy scattering upper energy limit", "বিশুদ্ধ s তরঙ্গ বিক্ষেপনের শক্তির ঊর্ধ্বসীমা"] },
      { number: "9", text: "ধনাত্মক ও ঋনাত্মক বিক্ষেপন দৈর্ঘ্যের ভৌত তাৎপর্য ব্যাখ্যা কর। অথবা, বিক্ষেপন দৈর্ঘ্যের ভৌত তাৎপর্য ব্যাখ্যা কর।", aliases: ["ধনাত্মক ঋণাত্মক scattering length", "positive negative scattering length significance", "বিক্ষেপন দৈর্ঘ্যের তাৎপর্য"] }
    ]
  },
  {
    chapterNumber: 3, topicNumber: 1, code: "৩", title: "নিউক্লিয় বল",
    lectures: {
      "1": ["2", "1", "4", "5", "3"],
      "2": ["6", "7", "8"]
    },
    questions: [
      { number: "1", text: "নিউক্লিয় বল কী? নিউক্লিয় বলের বৈশিষ্ট্যগুলো লেখ। অথবা, নিউক্লিয় বলের ধর্মগুলো আলোচনা কর।", aliases: ["নিউক্লিয় বলের বৈশিষ্ট্য", "ধর্ম of nuclear force", "properties of nuclear force"] },
      { number: "2", text: "নিউক্লিয় বলের সম্পৃক্তি ব্যাখ্যা কর।", aliases: ["নিউক্লিয় বলের সম্পৃক্তি", "saturation of nuclear force"] },
      { number: "3", text: "$l = 1$ স্তরের জন্য $144\\text{ MeV}$ গভীরতার বিভবকূপ বা বর্গাকার বিভবকূপের পাল্লা/রেঞ্জ/সীমা বের কর।", aliases: ["144 MeV potential well range l=1", "বিভবকূপের পাল্লা নির্ণয়", "square well range nuclear force"] },
      { number: "4", text: "একক পায়ন বিনিময়ের জন্য $n\\text{-}n$ বিভবের পাল্লা নির্নয় কর [নিশ্চল ভর $140\\text{ MeV}/c^2$] অথবা, মেসন বিনিময়ের ক্ষেত্রে বিভবের পাল্লা নির্নয় কর, যেখানে স্থির ভর $140\\text{ MeV}/c^2$।", aliases: ["একক পায়ন বিনিময় বিভবের পাল্লা", "pion exchange range", "meson exchange potential range 140 MeV"] },
      { number: "5", text: "$r = 5\\text{ farmi}$ হলে বিনিময়কৃত $\\pi$-মেসনের ভর কত।", aliases: ["5 fermi pion mass", "পায়ন মেসনের ভর নির্ণয়", "pion mass from range"] },
      { number: "6", text: "একক মেসন বিনিময় বিভব বর্ননা কর। অথবা, একক মেসন বিনিময় বিভব সম্পর্কে আলোচনা কর। অথবা, একক মেসন বিনিময় বিভবের রাশিমালা প্রতিপাদন কর।", aliases: ["একক মেসন বিনিময় বিভব", "one meson exchange potential", "single meson exchange potential"] },
      { number: "7", text: "নিউক্লিয় বলের মেসন তত্ত্ব প্রতিপাদন কর। অথবা, নিউক্লিয় বলের ইউকাওয়া মেসন তত্ত্বটি প্রতিপাদন কর।", aliases: ["ইউকাওয়া মেসন তত্ত্ব", "Yukawa meson theory of nuclear force", "meson theory nuclear force"] },
      { number: "8", text: "নিউক্লিয় বলের মেসন সমীকরন প্রতিপাদন কর। অথবা, মেসন ক্ষেত্র সমীকরন প্রতিপাদন কর। অথবা, নিউক্লিয় বলের ইউকাওয়া সমীকরন প্রতিপাদন কর।", aliases: ["মেসন ক্ষেত্র সমীকরণ", "Yukawa equation", "meson field equation"] },
      { number: "9", text: "নিউক্লিয়ন-নিউক্লিয়ন $(n\\text{-}n)$ বিভবের জন্য বিনিময় বলের প্রয়োজনীয়তা আলোচনা অথবা, দ্বি-বস্তু/দ্বি-নিউক্লিয় ব্যবস্থায় বিনিময় বলের প্রয়োজনীয়তা আলোচনা কর।", aliases: ["nn potential exchange force necessity", "বিনিময় বলের প্রয়োজনীয়তা", "exchange force two nucleon system"] },
      { number: "10", text: "বিভিন্ন প্রকার বিনিময় বল সম্পর্কে আলোচনা কর এবং বিনিময় কারক গুলোকে স্পিন ও আইসোস্পিন কারকের মাধ্যমে প্রকাশ কর।", aliases: ["বিনিময় বলের প্রকার", "spin isospin exchange operators", "exchange operators spin isospin factors"] }
    ]
  },
  {
    chapterNumber: 4, topicNumber: 1, code: "৪", title: "নিউক্লিয় শেল মডেল",
    lectures: {
      "1": ["1", "2"],
      "2": ["7", "3", "4", "5", "6"]
    },
    questions: [
      { number: "1", text: "দেখাও যে, শেল মডেল বিভবে স্পিন কক্ষ যুগ্মের জন্য শক্তি স্থানান্তর $(2l+1)$ এর সমানুপাতিক। অথবা, দেখাও যে, শেল মডেল বিভবের জন্য কক্ষযুগ্মের পার্থক্য $(2l+1)$ এর সমানুপাতিক।", aliases: ["spin orbit splitting 2l+1", "শেল মডেলে শক্তি ব্যবধান", "spin orbit coupling energy splitting"] },
      { number: "2", text: "শেল মডেল বিভবে স্পিন কক্ষ প্রত্যাবর্তন করে ম্যাজিক সংখ্যাগুলো কীভাবে পুনঃউৎপাদন করা যায় দেখাও। অথবা, শেল মডেল বিন্যাস দেখাও ও ম্যাজিক সংখ্যার প্রাপ্তি আলোচনা কর।", aliases: ["ম্যাজিক সংখ্যা পুনরুৎপাদন", "shell model magic numbers", "spin orbit magic numbers"] },
      { number: "3", text: "শেল মডেলের সফলতা ও ব্যার্থতাগুলো লেখ। অথবা, নিউক্লিয় মডেলের সফলতা ও ব্যর্থতা/সীমাবদ্ধতাগুলো লেখ।", aliases: ["শেল মডেলের সফলতা ব্যর্থতা", "successes and limitations of shell model"] },
      { number: "4", text: "নিউক্লিয় শেল মডেলের প্রয়োজনীয়তা লিখ। অথবা, শেল মডেলের প্রয়োজনীয়তা বা যৌক্তিকতা বা গুরুত্ব লিখ।", aliases: ["শেল মডেলের প্রয়োজনীয়তা", "importance of nuclear shell model", "need for shell model"] },
      { number: "5", text: "ম্যাজিক সংখ্যা গুলো কী কী? শেল মডেলে ম্যাজিক সংখ্যার প্রয়োজনীয়তা লিখ।", aliases: ["ম্যাজিক সংখ্যা কী কী", "magic numbers significance shell model"] },
      { number: "6", text: "নিউক্লিয় শেল মডেল তত্ত্ব ব্যাখ্যা কর। অথবা, স্বাধীন কনা মডেল ব্যাখ্যা কর।", aliases: ["নিউক্লিয় শেল মডেল তত্ত্ব", "independent particle model", "nuclear shell model theory"] },
      { number: "7", text: "শেল মডেল ব্যবহার করে (i) $^{13}_{6}\\text{C}$ (ii) $^{12}_{6}\\text{C}$ (iii) $^{59}_{28}\\text{Ni}$ (iv) $^{11}_{5}\\text{B}$ (v) $^{17}_{8}\\text{O}$ ইত্যাদির জন্য ভূমি অবস্থায় কৌনিক ভরবেগ, স্পিন প্যারিটি/$J^\\pi$-এর মান এবং প্যারিটি/সমতা নির্ণয় কর।", aliases: ["13C 12C 59Ni 11B 17O ground state spin parity", "নিউক্লিয়াসের J parity নির্ণয়", "nuclear ground state angular momentum parity"] }
    ]
  },
  {
    chapterNumber: 5, topicNumber: 1, code: "৫", title: "যৌথ বা সমষ্টিগত মডেল",
    lectures: {
      "1": ["1", "2", "3"],
      "2": ["4"]
    },
    questions: [
      { number: "1", text: "বোর প্রকল্প অনুযায়ী যৌগিক নিউক্লিয় বিক্রিয়া/তত্ত্ব ব্যাখ্যা কর। অথবা, যৌগিক নিউক্লিয় তত্ত্ব ব্যাখ্যা কর।", aliases: ["বোরের যৌগিক নিউক্লিয়াস তত্ত্ব", "Bohr compound nucleus theory", "compound nuclear reaction theory"] },
      { number: "2", text: "নিউক্লিয় সমষ্টিগত মডেলের স্বীকার্যসমূহ লিখ। অথবা, যৌথ/সমষ্টিগত/কালেক্টিভ মডেলের স্বীকার্যসমূহ বা অনুমিতিসমূহ লিখ।", aliases: ["সমষ্টিগত মডেলের স্বীকার্য", "collective model assumptions", "যৌথ মডেলের অনুমিতি"] },
      { number: "3", text: "নিউক্লিয় কালেক্টিভ/সমষ্টিগত মডেলের উদ্দেশ্য কী?", aliases: ["কালেক্টিভ মডেলের উদ্দেশ্য", "purpose of nuclear collective model"] },
      { number: "4", text: "নিউক্লিয় সমষ্টিগত/কালেক্টিভ মডেলের উপর ভিত্তি করে জোড়-জোড় নিউক্লিয়াসের ঘূর্নন তরঙ্গ অপেক্ষক ও শক্তির রাশিমালা নির্ণয় কর। অথবা, কালেক্টিভ বা সমষ্টিগত মডেলের উপর ভিত্তি করে জোড়-জোড় নিউক্লিয়াসের তরঙ্গ রাশিমালা বের কর ও শক্তির রাশিমালা বের কর।", aliases: ["জোড় জোড় নিউক্লিয়াসের ঘূর্ণন তরঙ্গ অপেক্ষক", "even even nuclei rotational wave function energy", "collective model rotational energy"] },
      { number: "5", text: "সমষ্টিগত/কালেক্টিভ/যৌথ মডেলের বৈশিষ্ট্যসমূহ আলোচনা কর।", aliases: ["কালেক্টিভ মডেলের বৈশিষ্ট্য", "features of collective model"] },
      { number: "6", text: "নিউক্লিয়াসের $\\beta$ ও $\\gamma$ কম্পন ব্যাখ্যা কর।", aliases: ["বিটা গামা কম্পন", "beta and gamma vibrations of nucleus", "nuclear beta gamma vibration"] }
    ]
  },
  {
    chapterNumber: 6, topicNumber: 1, code: "৬", title: "নিউক্লিয় বিক্রিয়া",
    lectures: {
      "1": ["1", "2", "3", "4", "17"],
      "2": ["5", "6"],
      "3": ["7", "8", "9", "10", "11", "12"],
      "4": ["13", "14", "15"]
    },
    questions: [
      { number: "1", text: "নিউক্লিয় বিক্রিয়ার নিউক্লিয় প্রস্থচ্ছেদ/ক্রসসেকশন বলতে কী বুঝ।", aliases: ["নিউক্লিয় বিক্রিয়ার ক্রস সেকশন", "nuclear reaction cross section definition"] },
      { number: "2", text: "নিউক্লিয় বিক্রিয়ার নিউক্লিয় প্রস্থচ্ছেদের গাণিতিক রাশিমালা নির্ণয় কর। অথবা, নিউক্লিয় বিক্রিয়ার ক্রস-সেকশনের গাণিতিক রাশিমালা নির্ণয় কর।", aliases: ["নিউক্লিয় ক্রস সেকশনের গাণিতিক রাশি", "mathematical expression nuclear cross section"] },
      { number: "3", text: "তরল ফোটা মডেল ব্যাখ্যা কর/মূল বক্তব্য লিখ। অথবা, তরল ফোটা মডেলের অনুমিতিগুলো আলোচনা বা ব্যাখ্যা কর।", aliases: ["তরল ফোটা মডেল", "liquid drop model assumptions", "liquid drop model explanation"] },
      { number: "4", text: "যৌগিক নিউক্লিয়াস কাকে বলে? যৌগিক নিউক্লিয় বিক্রিয়ার প্রধান বৈশিষ্ট্য/অনুমিতি বর্ণনা কর। অথবা, যৌগিক নিউক্লিয়াসের প্রধান বৈশিষ্ট্যগুলো ব্যাখ্যা কর।", aliases: ["যৌগিক নিউক্লিয়াসের বৈশিষ্ট্য", "compound nucleus properties", "compound nuclear reaction assumptions"] },
      { number: "5", text: "$Q$ মান কী? নিউক্লিয় বিক্রিয়ার $Q$ মানের সূত্রটি প্রতিপাদন কর। অথবা, $Q$ মানের সমীকরণের জন্য একটি রাশিমালা প্রতিষ্ঠা কর।", aliases: ["নিউক্লিয় বিক্রিয়ার Q মান", "Q value nuclear reaction equation", "Q value derivation"] },
      { number: "6", text: "নিউক্লিয় বিক্রিয়ার $Q$ মান ও সূচন শক্তির মধ্যে সম্পর্ক স্থাপন কর। অথবা, সূচনশক্তি ও $Q$ মানের সম্পর্ক প্রতিষ্ঠা কর।", aliases: ["Q value threshold energy relation", "সূচন শক্তি ও Q মান", "threshold energy Q value"] },
      { number: "7", text: "নিউক্লিয় বিক্রিয়ার সংরক্ষণশীলতা নীতি আলোচনা কর। অথবা, নিউক্লিয় বিক্রিয়ার ভৌত রাশিসমূহের সংরক্ষণশীলতার নীতি আলোচনা কর।", aliases: ["নিউক্লিয় বিক্রিয়ার সংরক্ষণ সূত্র", "conservation laws nuclear reactions"] },
      { number: "8", text: "ফিশন কী? ফিশন সংঘটিত হওয়ার মৌলিক শর্তগুলো লিখ।", aliases: ["ফিশন সংঘটিত হওয়ার শর্ত", "nuclear fission conditions"] },
      { number: "9", text: "প্রত্যক্ষ নিউক্লিয়াসের বিক্রিয়ার প্রধান বৈশিষ্ট্যগুলো আলোচনা কর।", aliases: ["প্রত্যক্ষ নিউক্লিয় বিক্রিয়া", "direct nuclear reaction characteristics"] },
      { number: "10", text: "স্ট্রিপিং ও পিকআপ নিউক্লিয় বিক্রিয়া উদাহরণসহ ব্যাখ্যা কর।", aliases: ["স্ট্রিপিং পিকআপ বিক্রিয়া", "stripping pickup reactions"] },
      { number: "11", text: "স্ট্রিপিং ও পিকআপ বিক্রিয়ার তুলনা/পার্থক্য ব্যাখ্যা কর।", aliases: ["স্ট্রিপিং পিকআপ পার্থক্য", "difference between stripping and pickup reaction"] },
      { number: "12", text: "নিউক্লিয় প্রস্থচ্ছেদের জ্যামিতিক তাৎপর্য লিখ। অথবা, বিক্রিয়া প্রস্থচ্ছেদ/ক্রসসেকশনের জ্যামিতিক তাৎপর্য লিখ বা ব্যাখ্যা কর।", aliases: ["ক্রস সেকশনের জ্যামিতিক তাৎপর্য", "geometrical meaning of nuclear cross section"] },
      { number: "13", text: "নিয়ন্ত্রিত ও অনিয়ন্ত্রিত শৃঙ্খল বিক্রিয়া কাকে বলে আলোচনা কর। অথবা, নিউক্লিয় শৃঙ্খল/চেইন বিক্রিয়া কী? নিয়ন্ত্রিত ও অনিয়ন্ত্রিত শৃঙ্খল বিক্রিয়া আলোচনা কর।", aliases: ["নিয়ন্ত্রিত অনিয়ন্ত্রিত শৃঙ্খল বিক্রিয়া", "controlled uncontrolled chain reaction", "nuclear chain reaction"] },
      { number: "14", text: "$^9_4\\text{Be}\\,(^1_1\\text{p}\\;;\\; ^1_0\\text{n})\\,\\text{Y}$ বিক্রিয়াটি লিখ এবং এর $Q$ মান হিসাব কর। দেওয়া আছে, $E_{th} = 2.089\\text{ MeV}$, $M(^9_4\\text{Be}) = 9.016190\\text{ amu}$ এবং $m_p = 1.008144\\text{ amu}$।", aliases: ["বেরিলিয়াম 9 প্রোটন নিউট্রন Q মান", "Be9 p n reaction Q value", "Q value 9Be proton reaction"] },
      { number: "15", text: "$^{12}\\text{C}\\,(\\alpha, \\text{p})\\,^{15}\\text{N}$ এর $Q$ মান নির্ণয় কর এবং সূচনশক্তি নির্ণয় কর।", aliases: ["carbon 12 alpha proton nitrogen 15 Q value", "12C alpha p 15N threshold energy"] },
      { number: "16", text: "কঠিন অ্যালুমিনিয়াম ঘনমিটারে প্রায় $6 \\times 10^{28}\\text{ atom/m}^3$ পরমাণু আছে। $0.1\\text{ mm}$ পুরু অ্যালুমিনিয়াম পাতে $0.5\\text{ MeV}$ নিউট্রন রশ্মি আপতিত হচ্ছে। যদি ঐ শক্তির নিউট্রন পোষকের প্রস্থচ্ছেদ $0.002\\text{ barn}$ হয় তবে আপতিত নিউট্রনের কত অংশ শোষিত হয়।", aliases: ["অ্যালুমিনিয়াম পাত নিউট্রন শোষণ", "neutron absorption aluminum foil 0.002 barn", "fraction of neutrons absorbed aluminum"] },
      { number: "17", text: "যৌগিক নিউক্লিয় মডেলের অনুমিতিসমূহ/প্রধান বৈশিষ্ট্যসমূহ লিখ।", aliases: ["যৌগিক নিউক্লিয় মডেলের অনুমিতি", "compound nucleus model assumptions", "compound nucleus main features"] }
    ]
  },
  {
    chapterNumber: 7, topicNumber: 1, code: "৭", title: "অপটিক্যাল মডেল",
    lectures: {
      "1": ["3", "4", "1", "2"]
    },
    questions: [
      { number: "1", text: "নিউক্লিয় অপটিক্যাল মডেলের অনুমিতিগুলো লিখ।", aliases: ["অপটিক্যাল মডেলের অনুমিতি", "optical model assumptions"] },
      { number: "2", text: "অপটিক্যাল/আলোকীয় মডেলের স্বীকার্যসমূহ লিখ।", aliases: ["আলোকীয় মডেলের স্বীকার্য", "optical model postulates"] },
      { number: "3", text: "নিউক্লিয় অপটিক্যাল মডেল/আলোকীয় মডেল বিভব বলতে কী বুঝ।", aliases: ["অপটিক্যাল মডেল বিভব", "nuclear optical model potential"] },
      { number: "4", text: "নিউক্লিয় অপটিক্যাল মডেল/আলোকীয় বিভবের সাধারণ আকার আলোচনা কর।", aliases: ["অপটিক্যাল বিভবের সাধারণ আকার", "general form optical potential"] },
      { number: "5", text: "নিম্ন বিভব শক্তিতে অপটিক্যাল মডেল বিভব ব্যবহার করে গড় প্রস্থচ্ছেদের রাশিমালা প্রতিষ্ঠা কর।", aliases: ["optical model average cross section low energy", "গড় প্রস্থচ্ছেদের রাশিমালা অপটিক্যাল মডেল"] },
      { number: "6", text: "অপটিক্যাল/আলোকীয় মডেলের জটিল বিভবের প্রয়োজনীয়তা লেখ।", aliases: ["অপটিক্যাল মডেলের জটিল বিভব", "need for complex optical potential"] }
    ]
  },
  {
    chapterNumber: 8, topicNumber: 1, code: "৮", title: "ত্বরক",
    lectures: {
      "1": ["1", "2", "3", "4", "6"],
      "2": ["5", "7"]
    },
    questions: [
      { number: "1", text: "একটি সাইক্লোট্রন যন্ত্রের গঠন ও কার্যপ্রণালী আলোচনা কর। অথবা, সাইক্লোট্রনের কার্যপ্রণালী বর্ণনা কর।", aliases: ["সাইক্লোট্রনের গঠন ও কার্যপ্রণালী", "cyclotron construction and working"] },
      { number: "2", text: "একটি ভ্যানডিগ্রাফ জেনারেটরের বেল্টতলে লম্বভাবে $20\\text{ kV/cm}$ প্রয়োগ করা হলো। সর্বোচ্চ আধান প্রবাহমাত্রা নির্ণয় কর। দেওয়া আছে বেল্ট প্রস্থ $50\\text{ cm}$, বেল্ট গতিবেগ $20\\text{ m s}^{-1}$।", aliases: ["ভ্যান ডি গ্রাফ সর্বোচ্চ আধান প্রবাহমাত্রা", "Van de Graaff maximum charge current belt speed"] },
      { number: "3", text: "একটি সাইক্লোট্রন যন্ত্রের কম্পাঙ্ক $1.5\\text{ MHz}$ এবং ডী এর ব্যাসার্ধ $55\\text{ cm}$, যন্ত্র হতে নির্গত $\\alpha$ কণার শক্তি নির্ণয় কর।", aliases: ["cyclotron alpha particle energy 1.5 MHz 55 cm", "আলফা কণার শক্তি সাইক্লোট্রন"] },
      { number: "4", text: "একটি সাইক্লোট্রন যন্ত্রের কম্পাঙ্ক $2.2\\text{ Hz}$ এবং এর ডী এর ব্যাসার্ধ $60\\text{ cm}$। এটি হতে নির্গত $\\alpha$ কণার শক্তি নির্ণয় কর।", aliases: ["cyclotron alpha particle energy 2.2 Hz 60 cm", "সাইক্লোট্রন শক্তি নির্ণয় 2.2"] },
      { number: "5", text: "সরল রৈখিক ত্বরন যন্ত্রের গঠন ও কার্যপ্রণালী বর্ণনা কর। অথবা, একটি সরল রৈখিক ত্বরন যন্ত্রের গঠন ও কার্যপ্রণালী বর্ণনা কর এবং সুবিধা-অসুবিধা লিখ।", aliases: ["সরল রৈখিক ত্বরক", "linear accelerator construction working advantages disadvantages"] },
      { number: "6", text: "একটি গাইগার-মুলার গণকের প্রতি মিনিটে প্রদর্শিত গণনা $12500$। গণকটির অসাড় সময় $175\\,\\mu\\text{sec}$, অসাড় সময় না থাকলে গণনার হার কত হত?", aliases: ["Geiger Muller dead time correction 12500", "গাইগার মুলার অসাড় সময়", "dead time count rate correction"] },
      { number: "7", text: "সিনক্রোট্রন কী? সিনক্রোট্রন যন্ত্রের সংক্ষিপ্ত বর্ণনা দাও। অথবা, একটি ইলেকট্রন সিনক্রোট্রন যন্ত্রের বর্ণনা দাও। অথবা, একটি প্রোটন সিনক্রোট্রন যন্ত্রের বর্ণনা দাও।", aliases: ["সিনক্রোট্রন যন্ত্র", "electron proton synchrotron", "synchrotron description"] },
      { number: "8", text: "একটি গাইগার-মুলার গণক/কাউন্টারের গঠন ও কার্যাবলি বর্ণনা কর। অথবা, গাইগার-মুলার কাউন্টার সম্পর্কে যা জান লিখ।", aliases: ["গাইগার মুলার কাউন্টারের গঠন", "Geiger Muller counter construction working"] },
      { number: "9", text: "কণা ত্বরক বলতে কী বুঝ? ব্যাখ্যা কর।", aliases: ["কণা ত্বরক কী", "particle accelerator definition"] },
      { number: "10", text: "একটি ভ্যান-ডি গ্রাফ জেনারেটরের গঠন ও কার্যপদ্ধতি বর্ণনা কর এবং এর সুবিধা ও অসুবিধাগুলো আলোচনা কর।", aliases: ["ভ্যান ডি গ্রাফ জেনারেটরের গঠন", "Van de Graaff generator construction working advantages"] }
    ]
  },
  {
    chapterNumber: 9, topicNumber: 1, code: "৯", title: "মৌলিক কণিকা",
    lectures: {
      "1": ["1", "2", "3", "4"],
      "2": ["5", "6"]
    },
    questions: [
      { number: "1", text: "মৌলিক কণাসমূহের ক্ষেত্রে কোয়ান্টাম সংখ্যাগুলো কী কী ব্যাখ্যা কর। অথবা, মৌলিক কণাসমূহের কোয়ান্টাম সংখ্যা কী কী।", aliases: ["মৌলিক কণার কোয়ান্টাম সংখ্যা", "quantum numbers of elementary particles"] },
      { number: "2", text: "মুক্ত প্রোটন ক্ষয় হতে পারে না অথচ, নিউক্লিয়াসের মধ্যে থাকলে এটি ক্ষয় হতে পারে - ব্যাখ্যা কর।", aliases: ["মুক্ত প্রোটন ক্ষয় হয় না", "free proton cannot decay bound proton nuclear decay", "proton decay inside nucleus"] },
      { number: "3", text: "লেপ্টন ও হ্যাড্রনের মধ্যে পার্থক্য লিখ/তুলনা কর। অথবা, লেপ্টনের বৈশিষ্ট্যগুলো লিখ। অথবা, হ্যাড্রনের বৈশিষ্ট্যগুলো লিখ।", aliases: ["লেপ্টন হ্যাড্রন পার্থক্য", "leptons and hadrons differences", "properties of leptons hadrons"] },
      { number: "4", text: "হিগস বোসন কী? এর বৈশিষ্ট্যগুলো লিখ। অথবা, হিগস বোসনের বৈশিষ্ট্য লিখ ও ব্যাখ্যা কর।", aliases: ["হিগস বোসনের বৈশিষ্ট্য", "Higgs boson properties", "what is Higgs boson"] },
      { number: "5", text: "নিম্নলিখিত বিক্রিয়াগুলো কেন সংঘটিত হয় না তা কোয়ান্টাম সংখ্যার নিত্যতার আলোকে আলোচনা কর: (i) $\\mu^- \\rightarrow e^- + \\gamma$ (ii) $\\pi^- + P \\rightarrow \\Sigma^+ + K^-$ (iii) $\\Sigma^- \\rightarrow n + \\pi^-$ (iv) $\\Sigma^+ \\rightarrow P + \\gamma$।", aliases: ["নিষিদ্ধ কণা বিক্রিয়া quantum number conservation", "muon pion sigma forbidden reactions", "elementary particle forbidden decays"] },
      { number: "6", text: "নিম্নলিখিত পরিক্রিয়াগুলোতে সম্ভাব্য অজানা কণা কী হতে পারে তা নির্ণয় কর/বের কর/$X$-এর মান নির্ণয় কর: (i) $\\pi^+ + n \\rightarrow \\Lambda^0 + X$ (ii) $\\pi^- + P \\rightarrow K^0 + X$ (iii) $e^+ + e^- \\rightarrow \\mu^+ + X$।", aliases: ["অজানা কণা X নির্ণয়", "unknown particle X conservation laws", "find X particle reactions"] },
      { number: "7", text: "নভোরশ্মির বর্ষণ আলোচনা কর।", aliases: ["নভোরশ্মির বর্ষণ", "cosmic ray shower", "cosmic ray showers"] },
      { number: "8", text: "কীভাবে নভোরশ্মি উৎপত্তি হয়।", aliases: ["নভোরশ্মির উৎপত্তি", "origin of cosmic rays"] },
      { number: "9", text: "বোসন ও ফার্মিয়নের পার্থক্য লিখ/বৈশিষ্ট্য আলোচনা কর।", aliases: ["বোসন ফার্মিয়ন পার্থক্য", "bosons and fermions differences"] },
      { number: "10", text: "মেসন ও বেরিয়নের মধ্যে পার্থক্য/সাদৃশ্য, বৈসাদৃশ্য/বৈশিষ্ট্য লিখ।", aliases: ["মেসন বেরিয়ন পার্থক্য", "mesons and baryons differences", "meson baryon properties"] },
      { number: "11", text: "মৌলিক/প্রাথমিক কণাসমূহের ক্ষেত্রে সংরক্ষণ বিধি বা নীতিসমূহ বা বিধিসমূহ আলোচনা কর।", aliases: ["মৌলিক কণার সংরক্ষণ বিধি", "conservation laws elementary particles"] },
      { number: "12", text: "হাইপেরন তৈরির জন্য $\\pi$-মেসনের চেয়ে $K$-মেসন বেশি উপযোগী কেন আলোচনা কর।", aliases: ["হাইপেরন তৈরিতে K meson", "why K meson better than pion for hyperon production", "hyperon production K meson"] },
      { number: "13", text: "মৌলিক/প্রাথমিক কণা বলতে কী বুঝ? মৌলিক/প্রাথমিক কণাসমূহের শ্রেণিবিন্যাস কর। অথবা, মৌলিক কণা কী? এদের শ্রেণিবিন্যাস কর।", aliases: ["মৌলিক কণার শ্রেণিবিন্যাস", "classification of elementary particles", "elementary particles definition"] },
      { number: "14", text: "চার ধরনের মিথস্ক্রিয়ায় পরিবাহক কণাসমূহের নাম ও ধর্মগুলো উল্লেখ কর।", aliases: ["চার মৌলিক মিথস্ক্রিয়ার বাহক কণা", "force carrier particles four interactions", "interaction carrier particles properties"] }
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
export function buildNuclearPhysics2LectureTitle(
  chapterNumber: number,
  topicNumber: number,
  lectureNumber: number,
  currentTitle: string
): string {
  const topic = NUCLEAR_PHYSICS_2_QUESTION_BANK.find(
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

export function getNuclearPhysics2LectureNumbersForQuestion(
  topic: NuclearPhysics2TopicQuestionSet,
  questionNumber: string
): number[] {
  return Object.entries(topic.lectures)
    .filter(([, questionNumbers]) => questionNumbers.includes(questionNumber))
    .map(([lectureNumber]) => Number(lectureNumber));
}
