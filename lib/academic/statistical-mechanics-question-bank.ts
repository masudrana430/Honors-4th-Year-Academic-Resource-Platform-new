export interface StatisticalMechanicsQuestion {
  number: string;
  text: string;
  aliases: string[];
}

export interface StatisticalMechanicsTopicQuestionSet {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: StatisticalMechanicsQuestion[];
}

/**
 * QC questions supplied for Statistical Mechanics (PHYS-404).
 * Lecture mappings are derived from the existing course lecture titles/descriptions.
 * Questions without an explicit lecture mapping intentionally open their topic instead.
 */
export const STATISTICAL_MECHANICS_QUESTION_BANK: StatisticalMechanicsTopicQuestionSet[] = [
  {
    chapterNumber: 1, topicNumber: 1, code: "১", title: "পদার্থবিজ্ঞানে পরিসংখ্যানের পরিসর",
    lectures: { "1": ["1", "5", "7"], "2": ["2", "3", "4"], "3": ["11", "12"], "4": ["8", "13", "10", "14"], "5": ["9"], "6": ["6"], "7": ["16", "20"], "8": ["17", "19"], "9": ["18"] },
    questions: [
      { number: "1", text: "অতি সম্ভাব্য বণ্টনের ক্ষেত্রে দেখাও যে, $n_i = \\frac{n}{A} a_i$, এখানে প্রতীকগুলো প্রচলিত অর্থ বহন করে।", aliases: ["অতি সম্ভাব্য বণ্টন", "most probable distribution"] },
      { number: "2", text: "ম্যাক্সওয়েল-বোল্টজম্যান বণ্টন সূত্র ব্যবহার করে দেখাও যে, $p$ এবং $p+dp$ ভরবেগ সীমার মধ্যে গ্যাসের অণুর সংখ্যা $$n(p)\\,dp = \\frac{4\\pi N}{(2\\pi mkT)^{3/2}} e^{-\\frac{p^2}{2mkT}} p^2 dp$$ অথবা, ম্যাক্সওয়েল-বোল্টজম্যান ভরবেগ বণ্টন সূত্র প্রতিষ্ঠা কর।", aliases: ["ম্যাক্সওয়েল বোল্টজম্যান ভরবেগ বণ্টন", "momentum distribution"] },
      { number: "3", text: "ম্যাক্সওয়েল-বোল্টজম্যান শক্তি বণ্টন সূত্র প্রতিষ্ঠা কর।", aliases: ["ম্যাক্সওয়েল বোল্টজম্যান শক্তি বণ্টন", "energy distribution"] },
      { number: "4", text: "ম্যাক্সওয়েল-বোল্টজম্যান বেগ বণ্টন সূত্র প্রতিষ্ঠা কর।", aliases: ["ম্যাক্সওয়েল বোল্টজম্যান বেগ বণ্টন", "velocity distribution"] },
      { number: "5", text: "অতি সম্ভাব্য বণ্টনের শর্ত প্রতিপাদন কর। অথবা, দেখাও যে, $\\sum_i \\ln g_i\\, \\delta n_i - \\sum_i \\ln n_i\\, \\delta n_i = 0$", aliases: ["অতি সম্ভাব্য বণ্টনের শর্ত", "most probable distribution condition"] },
      { number: "6", text: "ম্যাক্সওয়েল বণ্টন সূত্র প্রতিপাদন কর। অথবা, ম্যাক্সওয়েল-বোল্টজম্যান বণ্টন সূত্র প্রতিপাদন কর।", aliases: ["ম্যাক্সওয়েল বণ্টন সূত্র", "ম্যাক্সওয়েল বোল্টজম্যান বণ্টন সূত্র"] },
      { number: "7", text: "ম্যাক্সওয়েল-বোল্টজম্যান পরিসংখ্যানের সীমাবদ্ধতা আলোচনা কর। অথবা, ম্যাক্সওয়েল-বোল্টজম্যান বেগ বণ্টন/শক্তি বণ্টনের সীমাবদ্ধতা/ত্রুটি/অসুবিধা সমূহ লিখ।", aliases: ["ম্যাক্সওয়েল বোল্টজম্যান পরিসংখ্যানের সীমাবদ্ধতা", "বেগ বণ্টনের সীমাবদ্ধতা", "শক্তি বণ্টনের অসুবিধা"] },
      { number: "8", text: "$V$ আয়তনের পাত্রে একটি কণা আবদ্ধ। দেখাও যে, $p$ থেকে $p+dp$ ভরবেগ পাল্লার মধ্যে এ কণার সূক্ষ্মাবস্থা বা দশাকোষের সংখ্যা $\\rho(p)\\,dp = \\frac{4\\pi V p^2 dp}{h^3}$; প্রতীকগুলো প্রচলিত অর্থ বহন করে।", aliases: ["দশাকোষের সংখ্যা", "phase space cell", "density of states momentum"] },
      { number: "9", text: "কোয়ান্টাম লিউভিলের উপপাদ্যটি প্রতিপাদন কর। অথবা, ঘনত্ব ম্যাট্রিক্স এ গতির সমীকরণ প্রতিপাদন কর।", aliases: ["কোয়ান্টাম লিউভিল উপপাদ্য", "ঘনত্ব ম্যাট্রিক্সের গতির সমীকরণ", "quantum liouville theorem"] },
      { number: "10", text: "গড় বর্গবেগ ও মূল গড় বর্গবেগ ব্যাখ্যা কর।", aliases: ["মূল গড় বর্গবেগ", "rms speed"] },
      { number: "11", text: "ম্যাক্সওয়েল-বোল্টজম্যান বণ্টনের ক্ষেত্রে বেগের RMS মান নির্ণয় কর।", aliases: ["বেগের RMS মান", "ম্যাক্সওয়েল বোল্টজম্যান rms speed"] },
      { number: "12", text: "ম্যাক্সওয়েল-বোল্টজম্যান বণ্টনসূত্র ব্যবহার করে প্রমাণ কর যে, $v_{rms} > \\bar{v} > v_p$ সূচকগুলো প্রচলিত অর্থ বহন করে। অথবা, ম্যাক্সওয়েল-বোল্টজম্যান বণ্টনসূত্রের ভিত্তিতে প্রমাণ কর যে, (১) অতি সম্ভাব্য বেগ $v_p = 1.41\\sqrt{\\frac{kT}{m}} = \\sqrt{2}\\cdot\\sqrt{\\frac{kT}{m}}$ (২) গড় বেগ $\\bar{v} = 1.59\\sqrt{\\frac{kT}{m}} = \\frac{4}{\\sqrt{2\\pi}}\\sqrt{\\frac{kT}{m}}$ (৩) বর্গমূল গড় বর্গবেগ $v_{rms} = 1.74\\sqrt{\\frac{kT}{m}} = \\sqrt{3}\\sqrt{\\frac{kT}{m}}$", aliases: ["প্রমাণ কর v rms গড় বেগ অতি সম্ভাব্য বেগ", "সবচেয়ে সম্ভাব্য বেগ গড় বেগ RMS বেগ", "vp vbar vrms"] },
      { number: "13", text: "$300\\text{ K}$ উষ্ণতায় অক্সিজেন অণুর $v_{rms}$ মান নির্ণয় কর।", aliases: ["300 K অক্সিজেন অণুর rms বেগ", "oxygen rms speed"] },
      { number: "14", text: "$200\\text{ K}$ উষ্ণতায় $100\\text{ ms}^{-1}$ থেকে $102\\text{ ms}^{-1}$ বেগ পাল্লার মধ্যে অবস্থিত অক্সিজেন অণুর সম্ভাব্যতা নির্ণয় কর।", aliases: ["অক্সিজেন অণুর বেগ পাল্লার সম্ভাব্যতা", "oxygen molecule probability speed range"] },
      { number: "15", text: "দেখাও যে, ম্যাক্সওয়েল-বোল্টজম্যান বিন্যাস ধ্রুবক $\\beta = \\frac{1}{kT}$ অথবা, দেখাও যে, ম্যাক্সওয়েল-বোল্টজম্যান সূত্র হতে $$e^{-\\alpha} = \\frac{Nh^3}{V} \\left(\\frac{\\beta}{2\\pi m}\\right)^{3/2}$$", aliases: ["বিন্যাস ধ্রুবক beta", "ম্যাক্সওয়েল বোল্টজম্যান beta", "e to the minus alpha"] },
      { number: "16", text: "দেখাও যে, দশা স্থানে কোন বিন্দু সর্বনিম্ন $h^3$ বা $h_0^3$ আয়তন দখল করে।", aliases: ["দশা স্থানে সর্বনিম্ন h cube আয়তন", "phase space minimum volume"] },
      { number: "17", text: "ম্যাক্সওয়েল-বোল্টজম্যান বেগ বণ্টন সূত্র ব্যবহার করে শক্তির সমবিভাজন নীতি প্রতিষ্ঠা কর (চিরায়ত পরিসংখ্যানে ভিত্তিতে)। অথবা, স্বাধীনতার মাত্রা কাকে বলে, শক্তির সমবিভাজন নীতি প্রতিষ্ঠা কর।", aliases: ["শক্তির সমবিভাজন নীতি", "স্বাধীনতার মাত্রা", "equipartition theorem"] },
      { number: "18", text: "চিরায়ত পরিসাংখ্যিক বলবিজ্ঞানে লিউভিলের উপপাদ্য প্রতিপাদন কর। অথবা, লিউভিলের উপপাদ্যটি বিবৃত ও প্রতিপাদন কর।", aliases: ["চিরায়ত লিউভিল উপপাদ্য", "লিউভিলের উপপাদ্য", "classical liouville theorem"] },
      { number: "19", text: "শক্তির সমবিভাজন নীতি (গ্যাসগতি তত্ত্বের ভিত্তিতে) প্রতিপাদন কর।", aliases: ["গ্যাসগতি তত্ত্বের ভিত্তিতে শক্তির সমবিভাজন নীতি"] },
      { number: "20", text: "দেখাও যে, একই উষ্ণতার দুটি বিধেয় সমাবেশের সংযোগে একই বিধেয় সমাবেশ উৎপন্ন হয়।", aliases: ["দুটি বিধেয় সমাবেশের সংযোগ", "একই উষ্ণতার বিধেয় সমাবেশ", "combining canonical ensembles"] }
    ]
  },
  {
    chapterNumber: 2, topicNumber: 1, code: "২", title: "তাপমাত্রা ও এনট্রপি",
    lectures: { "1": ["1"], "2": ["5"], "3": ["6"], "4": ["3"], "5": ["8", "4"], "6": ["9", "2", "7"], "7": ["11"], "8": ["10"] },
    questions: [
      { number: "1", text: "এনট্রপি ও বিভাজন অপেক্ষকের মধ্যে সম্পর্ক স্থাপন কর।", aliases: ["এনট্রপি বিভাজন অপেক্ষক সম্পর্ক", "entropy partition function relation"] },
      { number: "2", text: "সিস্টেমের স্থূলাবস্থা ও সূক্ষ্মাবস্থা ব্যাখ্যা কর।", aliases: ["স্থূলাবস্থা সূক্ষ্মাবস্থা", "macrostate microstate"] },
      { number: "3", text: "তাপীয় সাম্যাবস্থায় গাণিতিক শর্ত প্রতিপাদন কর। দেখাও যে, তাপীয় সাম্যাবস্থায় কোন স্তরের কণার সংখ্যা $N_i = \\frac{N}{Z} \\exp(-\\beta \\epsilon_i)$ প্রতীকগুলো প্রচলিত অর্থ বহন করে।", aliases: ["তাপীয় সাম্যাবস্থার গাণিতিক শর্ত", "ni N over Z exponential beta epsilon"] },
      { number: "4", text: "সূক্ষ্ম বিধেয় ও মহাবিধেয় সমাবেশের মধ্যে পার্থক্য লিখ। অথবা, অনুবিধেয়/সূক্ষ্মবিধেয়, বিধেয় ও মহাবিধেয় সমাবেশ গুলোর মধ্যে আলোচনা কর বা পার্থক্য লিখ।", aliases: ["সূক্ষ্ম বিধেয় মহাবিধেয় সমাবেশের পার্থক্য", "microcanonical grand canonical ensemble difference"] },
      { number: "5", text: "মহাবিধেয় ব্যবস্থাদলে সম্ভাব্যতা ঘনত্ব বা বণ্টন ঘনত্বের রাশিমালা প্রতিপাদন কর।", aliases: ["মহাবিধেয় ব্যবস্থাদলে সম্ভাব্যতা ঘনত্ব", "grand canonical probability density"] },
      { number: "6", text: "দেখাও যে, পরমশূন্য তাপমাত্রায় এনট্রপি $S = k \\ln g_0$ যেখানে $g_0$ ভূমি অবস্থার চ্যুতি বা পরিসাংখ্যিক ভার।", aliases: ["পরমশূন্য তাপমাত্রায় এনট্রপি", "S equals k ln g zero", "ground state degeneracy entropy"] },
      { number: "7", text: "দেখাও যে, পরিসাংখ্যিক বলবিজ্ঞানে কোন চলকের ব্যবস্থাদল গড় ও গড় সময় সমান।", aliases: ["ব্যবস্থাদল গড় ও গড় সময় সমান", "ensemble average time average"] },
      { number: "8", text: "বোল্টজম্যানের নীতি বিবৃত ও প্রতিষ্ঠা কর। অথবা, বোল্টজম্যান এনট্রপি ও সম্ভাবনার মধ্যে সম্পর্ক প্রতিষ্ঠা কর। অথবা, এনট্রপি ও সম্ভাবনার সংযুক্তকারী বোল্টজম্যানের উপপাদ্য প্রতিপাদন/বর্ণনা কর।", aliases: ["বোল্টজম্যানের নীতি", "এনট্রপি ও সম্ভাবনার সম্পর্ক", "Boltzmann entropy probability"] },
      { number: "9", text: "সূক্ষ্ম বিধেয় সমাবেশ ব্যবহার করে একটি নিখুঁত একপারমাণবিক গ্যাসের জন্য অন্তঃস্থ শক্তি এবং রাসায়নিক বিভব শক্তির রাশিমালা নির্ণয় কর।", aliases: ["একপারমাণবিক গ্যাসের অন্তঃস্থ শক্তি", "রাসায়নিক বিভব", "monatomic gas internal energy chemical potential"] },
      { number: "10", text: "আইনানুগ সমভাদল ব্যবহার করে একটি একক পরমাণুর আদর্শ গ্যাসের জন্য হেলমহোল্টজের মুক্ত-শক্তি ও এনট্রপির রাশিমালা নির্ণয় কর।", aliases: ["হেলমহোল্টজ মুক্তশক্তি এনট্রপি", "Helmholtz free energy entropy canonical ensemble"] },
      { number: "11", text: "আন্তঃবদল অপারেটর কাকে বলে, দেখাও যে, এর আইগেন মান $\\pm 1$", aliases: ["আন্তঃবদল অপারেটরের আইগেন মান", "exchange operator eigenvalues plus minus one"] }
    ]
  },
  {
    chapterNumber: 3, topicNumber: 1, code: "৩", title: "গ্যাসের তাপগতিবিদ্যা",
    lectures: { "1": ["1"], "2": ["2"], "3": ["4"], "4": ["5"] },
    questions: [
      { number: "1", text: "সূক্ষ্ম বিধেয় সমাবেশে কোন সিস্টেমের বিভাজন অপেক্ষক হলো $Z = \\sum g_i e^{-\\beta E_i}$; দেখাও যে, সিস্টেমের গড় গতিশক্তি $\\bar{E} = -\\frac{\\partial}{\\partial\\beta}(\\ln Z)$ যেখানে প্রতীকগুলো প্রচলিত অর্থ বহন করে।", aliases: ["বিভাজন অপেক্ষক হতে গড় শক্তি", "average energy derivative ln Z", "partition function average energy"] },
      { number: "2", text: "মুক্তশক্তি কী? মহাবিধেয় ব্যবস্থাদলে সম্ভাব্যতা ঘনত্বের রাশিমালা বের কর। (অধ্যায়-২ - ৫নং প্রশ্নের অনুরূপ)", aliases: ["মহাবিধেয় ব্যবস্থাদলে সম্ভাব্যতা ঘনত্ব", "grand canonical distribution density"] },
      { number: "3", text: "অসম্পূর্ণ গ্যাসের তত্ত্ব বর্ণনা কর।", aliases: ["অসম্পূর্ণ গ্যাসের তত্ত্ব", "imperfect gas theory"] },
      { number: "4", text: "বিধেয় সমাবেশে এক পারমাণবিক আদর্শ গ্যাসের জন্য বিভাজন ফাংশন নির্ণয় কর।", aliases: ["এক পারমাণবিক আদর্শ গ্যাসের বিভাজন ফাংশন", "monatomic ideal gas partition function"] },
      { number: "5", text: "বিভাজন ফাংশন ব্যাখ্যা কর ও এর গুরুত্ব লিখ।", aliases: ["বিভাজন ফাংশনের গুরুত্ব", "partition function importance"] }
    ]
  },
  {
    chapterNumber: 4, topicNumber: 1, code: "৪", title: "কণা পরিসংখ্যান",
    lectures: { "1": ["3", "1"], "3": ["2", "6", "4", "5"] },
    questions: [
      { number: "1", text: "দেখাও যে, চিরায়ত সদৃশ্য কণা শনাক্তযোগ্য কিন্তু কোয়ান্টাম সদৃশ কণা শনাক্তযোগ্য নয়।", aliases: ["চিরায়ত কণা শনাক্তযোগ্য কোয়ান্টাম কণা শনাক্তযোগ্য নয়", "identical classical quantum particles distinguishable"] },
      { number: "2", text: "চিরায়ত পরিসংখ্যান ও কোয়ান্টাম পরিসংখ্যানের তুলনা কর বা উপযোগিতা বর্ণনা কর।", aliases: ["চিরায়ত ও কোয়ান্টাম পরিসংখ্যানের পার্থক্য", "classical quantum statistics comparison"] },
      { number: "3", text: "পার্থক্য ও অযোগ্যতার নীতি ব্যাখ্যা কর। অথবা, অভিন্ন কণাসমূহের পার্থক্য ও অযোগ্যতার নীতি ব্যাখ্যা কর।", aliases: ["অভিন্ন কণার পার্থক্য ও অযোগ্যতার নীতি", "indistinguishability exclusion principle"] },
      { number: "4", text: "কোয়ান্টাম সদৃশ কণার ক্ষেত্রে দুই ধরনের পরিসংখ্যান প্রয়োজন- ব্যাখ্যা কর।", aliases: ["কোয়ান্টাম সদৃশ কণার দুই ধরনের পরিসংখ্যান", "two types of quantum statistics"] },
      { number: "5", text: "কোয়ান্টাম সদৃশ্য কণার শ্রেণিবিভাগ আলোচনা কর।", aliases: ["কোয়ান্টাম সদৃশ কণার শ্রেণিবিভাগ", "classification of identical quantum particles"] },
      { number: "6", text: "কণার চিরায়ত বণ্টন সূত্রের সাথে কোয়ান্টাম বণ্টনের সূত্র তুলনা কর।", aliases: ["চিরায়ত ও কোয়ান্টাম বণ্টন সূত্রের তুলনা", "classical quantum distribution comparison"] },
      { number: "7", text: "প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক ব্যাখ্যা কর? অথবা, কীভাবে প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক গঠন করা যায়।", aliases: ["প্রতিসম অপ্রতিসম তরঙ্গ অপেক্ষক", "symmetric antisymmetric wavefunction"] },
      { number: "8", text: "বিশৃঙ্খল ল্যাটিস ও প্যারাম্যাগনেটিক গ্যাস ব্যাখ্যা কর।", aliases: ["বিশৃঙ্খল ল্যাটিস", "প্যারাম্যাগনেটিক গ্যাস", "disordered lattice paramagnetic gas"] }
    ]
  },
  {
    chapterNumber: 5, topicNumber: 1, code: "৫", title: "বোস-আইনস্টাইনের বণ্টন সূত্র",
    lectures: { "1": ["4", "7", "12"], "2": ["2"], "3": ["10"], "4": ["11"], "5": ["6", "5", "3", "8"], "6": ["1", "9"], "7": ["15"], "8": ["14"], "9": ["13"], "10": ["17"] },
    questions: [
      { number: "1", text: "বোস ও আইনস্টাইন বণ্টন সূত্র প্রতিপাদন কর (বোসনসমূহের জন্য বণ্টন সূত্র)। অথবা, বোস-আইনস্টাইন পরিসংখ্যানের সূত্র প্রতিপাদন কর।", aliases: ["বোস আইনস্টাইন বণ্টন সূত্র", "বোসন বণ্টন সূত্র", "Bose Einstein distribution"] },
      { number: "2", text: "বোস ও ফার্মি পরিসংখ্যান ব্যবহার করে আদর্শ গ্যাসের সমীকরণ $P_v = \\frac{2}{3}\\bar{E}$ প্রতিপাদন কর।", aliases: ["বোস ফার্মি পরিসংখ্যান হতে আদর্শ গ্যাসের সমীকরণ", "Pv two thirds E"] },
      { number: "3", text: "ঘনত্ব ম্যাট্রিক্স কি? এর তাৎপর্য ব্যাখ্যা কর।", aliases: ["ঘনত্ব ম্যাট্রিক্স", "density matrix significance"] },
      { number: "4", text: "ইলেকট্রন তত্ত্ব ব্যবহার করে দেখাও যে, ইলেকট্রন গ্যাসের আপেক্ষিক তাপ পরম তাপমাত্রার সমানুপাতিক।", aliases: ["ইলেকট্রন গ্যাসের আপেক্ষিক তাপ তাপমাত্রার সমানুপাতিক", "electron gas specific heat proportional temperature"] },
      { number: "5", text: "দেখাও যে, পরমশূন্য তাপমাত্রায়, ভূমি অবস্থায় ইলেকট্রন গ্যাসের ফার্মি ভরবেগ $P_F = h \\left(\\frac{3n}{8\\pi V}\\right)^{1/3}$", aliases: ["ফার্মি ভরবেগ", "fermi momentum"] },
      { number: "6", text: "ইলেকট্রন গ্যাসের ক্ষেত্রে ফার্মি-ডিরাক সূত্র প্রয়োগ করে দেখাও যে, $E_F = \\frac{h^2}{8m}\\left(\\frac{3N}{\\pi V}\\right)^{2/3}$ প্রতীকগুলো প্রচলিত অর্থ বহন করে।", aliases: ["ফার্মি শক্তি", "Fermi energy", "E F formula"] },
      { number: "7", text: "ধাতুর ইলেকট্রন তত্ত্ব বর্ণনা কর।", aliases: ["ধাতুর ইলেকট্রন তত্ত্ব", "electron theory of metals"] },
      { number: "8", text: "বোসন ও ফার্মিয়নের মধ্যে পার্থক্য লিখ / বৈশিষ্ট্যা ব্যাখ্যা কর।", aliases: ["বোসন ও ফার্মিয়নের পার্থক্য", "bosons and fermions difference"] },
      { number: "9", text: "বোস ও আইনস্টাইন বণ্টন সূত্রে ধ্রুবক $e^\\alpha$ এর মান নির্ণয় কর।", aliases: ["বোস আইনস্টাইন বণ্টনের e alpha ধ্রুবক", "Bose Einstein e alpha constant"] },
      { number: "10", text: "$1\\text{ cm}^3$ আয়তনের বাক্সে $7.2 \\times 10^{21}$ ইলেকট্রন থাকলে ফার্মি তরঙ্গদৈর্ঘ্য নির্ণয় কর।", aliases: ["ফার্মি তরঙ্গদৈর্ঘ্য নির্ণয়", "fermi wavelength electron gas"] },
      { number: "11", text: "$273\\text{ K}$ উষ্ণতায় $22.4$ লিটার আয়তনের পাত্রে ফোটনের গড় সংখ্যা নির্ণয় কর।", aliases: ["ফোটনের গড় সংখ্যা", "average number of photons"] },
      { number: "12", text: "ইলেকট্রন গ্যাসের চ্যুতি পরিমিতি হিসাব কর।", aliases: ["ইলেকট্রন গ্যাসের চ্যুতি পরিমিতি", "degeneracy parameter electron gas"] },
      { number: "13", text: "আদর্শ বোস-আইনস্টাইন গ্যাসের চাপ নির্ণয় কর এবং তা থেকে গ্যাসের চ্যুতি ব্যাখ্যা কর।", aliases: ["বোস আইনস্টাইন গ্যাসের চাপ", "Bose Einstein gas pressure and degeneracy"] },
      { number: "14", text: "বোস-আইনস্টাইনের বণ্টনসূত্র প্রয়োগ করে প্লাংকের কৃষ্ণবস্তু বিকিরণ সূত্র নির্ণয় কর? এবং এর থেকে তরঙ্গদৈর্ঘ্যে প্রকাশিত প্লাংকের বিকিরণ সূত্র, র্যালে-জিনস্ এর সূত্র ও ভিন-এর সূত্র প্রতিপাদন কর।", aliases: ["প্লাংকের কৃষ্ণবস্তু বিকিরণ সূত্র", "র্যালে জিনস ও ভিনের সূত্র", "Planck blackbody radiation Rayleigh Jeans Wien"] },
      { number: "15", text: "ফার্মি-ডিরাক পরিসংখ্যানের সূত্র প্রতিপাদন কর। অথবা, ফার্মি-ডিরাক বণ্টন সূত্র প্রতিপাদন কর।", aliases: ["ফার্মি ডিরাক বণ্টন সূত্র", "Fermi Dirac distribution"] },
      { number: "16", text: "উদাহরণসহ বোস-আইনস্টাইন ও ফার্মি ডিরাক পরিসংখ্যানের মধ্যে তুলনা/পার্থক্য আলোচনা কর।", aliases: ["বোস আইনস্টাইন ও ফার্মি ডিরাক পরিসংখ্যানের পার্থক্য", "Bose Einstein Fermi Dirac comparison"] },
      { number: "17", text: "বোস-আইনস্টাইন ঘনীভবন বলতে কী বুঝ? অথবা, বোস-আইনস্টাইন ঘনীভবন অবস্থা গঠিত হয় কেন।", aliases: ["বোস আইনস্টাইন ঘনীভবন", "Bose Einstein condensation", "BEC"] }
    ]
  },
  {
    chapterNumber: 6, topicNumber: 1, code: "৬", title: "পরিসাংখ্যিক তাপগতিবিদ্যার প্রয়োগ",
    lectures: { "1": ["1", "2", "4"], "4": ["3"] },
    questions: [
      { number: "1", text: "পদার্থের চৌম্বক গুণাবলী সম্পর্কিত প্যারাচৌম্বক তত্ত্ব বিবৃত কর। → কুরি-ওয়েজ/কুরি ভাইস সূত্র প্রতিপাদন কর। → ল্যাঞ্জেভিনের তত্ত্ব প্রতিপাদন কর।", aliases: ["প্যারাচৌম্বক তত্ত্ব", "কুরি ওয়েজ সূত্র", "ল্যাঞ্জেভিনের তত্ত্ব", "Langevin paramagnetism"] },
      { number: "2", text: "পরমাণু এবং আয়নে কীভাবে স্থায়ী চৌম্বক মোমেন্ট সৃষ্টি হয় ব্যাখ্যা কর।", aliases: ["স্থায়ী চৌম্বক মোমেন্ট", "পরমাণু আয়নে চৌম্বক মোমেন্ট", "permanent magnetic moment atoms ions"] },
      { number: "3", text: "ফেরোচৌম্বকের ক্ষেত্রে কুরি-ওয়েজ সূত্র প্রতিপাদন কর।", aliases: ["ফেরোচৌম্বকের কুরি ওয়েজ সূত্র", "Curie Weiss law ferromagnetism"] },
      { number: "4", text: "প্যারাচৌম্বক সম্পর্কিত ল্যাঞ্জেভিনের তত্ত্ব প্রতিপাদন করে চৌম্বক সম্পৃক্তির শর্ত নিরূপন কর।", aliases: ["ল্যাঞ্জেভিন তত্ত্ব চৌম্বক সম্পৃক্তি", "magnetic saturation condition"] }
    ]
  },
  {
    chapterNumber: 7, topicNumber: 1, code: "৭", title: "পরিবহন ঘটনাবলী",
    lectures: { "1": ["4"], "2": ["1"], "3": [], "4": ["2", "3", "6", "5", "7"], "5": ["8"] },
    questions: [
      { number: "1", text: "গ্যাসীয় মাধ্যমে ব্যাপনের মৌলিক তত্ত্ব বর্ণনা কর।", aliases: ["গ্যাসীয় মাধ্যমে ব্যাপন", "diffusion in gases"] },
      { number: "2", text: "পরিবহন তত্ত্ব বলতে কী বুঝ/পরিবহন ঘটনা ব্যাখ্যা কর।", aliases: ["পরিবহন তত্ত্ব", "পরিবহন ঘটনা", "transport phenomena"] },
      { number: "3", text: "তড়িৎ পরিবাহিতা বলতে কী বুঝ।", aliases: ["তড়িৎ পরিবাহিতা", "electrical conductivity"] },
      { number: "4", text: "বোল্টজম্যান পরিবহন সমীকরণ প্রতিপাদন কর। অথবা, বোল্টজম্যান ট্রান্সপোর্ট সমীকরণ নির্ণয়ের রাশিমালা প্রতিপাদন কর।", aliases: ["বোল্টজম্যান পরিবহন সমীকরণ", "Boltzmann transport equation"] },
      { number: "5", text: "ব্যাপনশীল/ব্যাপন এর সূত্রগুলো বিবৃত কর বা ফিকের সূত্র বিবৃত কর। অথবা, ব্যাপন কাকে বলে? ব্যাখ্যা কর ও বৈশিষ্ট্য লিখ।", aliases: ["ফিকের সূত্র", "ব্যাপনের সূত্র", "Fick law diffusion"] },
      { number: "6", text: "ব্রাউনীয় গতির বৈশিষ্ট্যগুলো আলোচনা কর।", aliases: ["ব্রাউনীয় গতি", "Brownian motion"] },
      { number: "7", text: "শ্বেত বামন তত্ত্ব আলোচনা কর।", aliases: ["শ্বেত বামন তত্ত্ব", "white dwarf theory"] },
      { number: "8", text: "H এর সংজ্ঞা দাও। বোল্টজম্যান H-তত্ত্ব বর্ণনা কর বিবৃতি ও প্রমাণ কর।", aliases: ["বোল্টজম্যান H তত্ত্ব", "Boltzmann H theorem", "H theorem"] }
    ]
  },
  {
    chapterNumber: 8, topicNumber: 1, code: "৮", title: "দশা স্থানান্তর",
    lectures: { "1": ["1"], "2": ["1"], "3": ["4"], "4": ["5"], "5": ["6", "2", "3"] },
    questions: [
      { number: "1", text: "ক্ল্যাপিরনের সমীকরণ প্রতিপাদন কর।", aliases: ["ক্ল্যাপিরনের সমীকরণ", "Clapeyron equation"] },
      { number: "2", text: "প্রথম ও দ্বিতীয় ক্রম দশা স্থানান্তরের মধ্যে পার্থক্য লিখ।", aliases: ["প্রথম দ্বিতীয় ক্রম দশা স্থানান্তরের পার্থক্য", "first second order phase transition"] },
      { number: "3", text: "প্রথম ও দ্বিতীয় ক্রম দশা পরিবর্তনের প্রধান বৈশিষ্ট্য গুলো আলোচনা কর। অথবা, প্রথম ও দ্বিতীয় ক্রম দশা পরিবর্তন ব্যাখ্যা কর।", aliases: ["প্রথম দ্বিতীয় ক্রম দশা পরিবর্তনের বৈশিষ্ট্য", "phase transition characteristics"] },
      { number: "4", text: "দশাসহ অবস্থানের শর্ত নিরূপন কর। অথবা, দশা অবস্থার শর্ত লিখ।", aliases: ["দশা অবস্থার শর্ত", "phase equilibrium conditions"] },
      { number: "5", text: "দশা স্থানান্তরের আধুনিক শ্রেণী বিন্যাস ব্যাখ্যা কর। অথবা, দশা রূপান্তরের তাপগতীয় শ্রেণীবিন্যাস কর।", aliases: ["দশা স্থানান্তরের আধুনিক শ্রেণীবিন্যাস", "phase transition thermodynamic classification"] },
      { number: "6", text: "প্রথম সুপ্ততাপের সমীকরণটি প্রতিপাদন কর এবং স্ফুটনাংকের উপর চাপের প্রভাব আলোচনা কর।", aliases: ["সুপ্ততাপের সমীকরণ", "স্ফুটনাংকের উপর চাপের প্রভাব", "latent heat equation boiling point pressure"] }
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

/** Adds QC wording only to lectures with an explicit question mapping. */
export function buildStatisticalMechanicsLectureTitle(
  chapterNumber: number,
  topicNumber: number,
  lectureNumber: number,
  currentTitle: string
): string {
  const topic = STATISTICAL_MECHANICS_QUESTION_BANK.find(
    (entry) => entry.chapterNumber === chapterNumber && entry.topicNumber === topicNumber
  );
  const questionNumbers = topic?.lectures[lectureNumber];
  if (!topic || !questionNumbers?.length) return currentTitle;

  const details = questionNumbers.map((number) => {
    const question = topic.questions.find((entry) => entry.number === number);
    return question ? "-" + toBengaliDigits(number) + " (" + questionTextForTitle(question.text) + ")" : null;
  }).filter((value): value is string => Boolean(value));

  const oldQuestionList = currentTitle.match(/প্রশ্ন\s*নং\s*\(([^)]*)\)/)?.[1] || "";
  const extras = oldQuestionList.split(",").map((value) => value.trim()).filter(
    (value) => value && !/^[0-9০-৯]+$/.test(value)
  );
  const noteTags = Array.from(currentTitle.matchAll(/\[[^\]]+\]/g)).map((match) => match[0]);
  const prefix = currentTitle.split(" — ")[0] || "Lec " + lectureNumber;
  const chapterPrefix = toBengaliDigits(chapterNumber) + " " + prefix;
  const label = currentTitle.match(/\|\s*([^|]+)$/)?.[1]?.trim() || topic.title;
  const preservedNotes = [...extras, ...noteTags].join(", ");
  const extraSuffix = preservedNotes ? " [" + preservedNotes.replace(/^\[|\]$/g, "") + "]" : "";
  return chapterPrefix + " — প্রশ্ন নং " + details.join("; ") + extraSuffix + " | " + label;
}

export function getStatisticalMechanicsLectureNumbersForQuestion(
  topic: StatisticalMechanicsTopicQuestionSet,
  questionNumber: string
): number[] {
  return Object.entries(topic.lectures)
    .filter(([, questionNumbers]) => questionNumbers.includes(questionNumber))
    .map(([lectureNumber]) => Number(lectureNumber));
}
