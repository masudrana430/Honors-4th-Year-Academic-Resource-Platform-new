export interface Electronics2Question {
  number: string;
  text: string;
  aliases: string[];
}

export interface Electronics2TopicQuestionSet {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: Electronics2Question[];
}

/**
 * QC question list supplied for Electronics-2 (PHYS-406).
 * Lecture links are mapped only where the existing course catalog explicitly names
 * the question number or a clear equivalent. Unmapped questions route to their topic.
 */
export const ELECTRONICS_2_QUESTION_BANK: Electronics2TopicQuestionSet[] = [
  {
    chapterNumber: 1, topicNumber: 1, code: "১", title: "ক্ষমতা বিবর্ধক",
    lectures: {
      "1": ["4", "7"],
      "2": ["6"],
      "3": ["6"],
      "4": ["1", "5", "8", "2", "3"],
      "5": ["9", "10"]
    },
    questions: [
      { number: "1", text: "ক্রসওভার ও হারমোনিক ডিসটরশন ব্যাখ্যা কর।", aliases: ["ক্রসওভার ডিসটরশন", "হারমোনিক ডিসটরশন", "crossover distortion harmonic distortion"] },
      { number: "2", text: "পুশপুল কেন ক্ষমতা বিবর্ধকে ব্যবহার করা হয়।", aliases: ["পুশপুল কেন ক্ষমতা বিবর্ধকে ব্যবহার", "why push pull amplifier"] },
      { number: "3", text: "ভোল্টেজ বিবর্ধক ও ক্ষমতা বিবর্ধকের মধ্যে পার্থক্য লিখ।", aliases: ["ভোল্টেজ বিবর্ধক ক্ষমতা বিবর্ধকের পার্থক্য", "voltage amplifier power amplifier difference"] },
      { number: "4", text: "কমপ্লিমেন্টারী \"B\" শ্রেনী পুশপুল বিবর্ধকের চিত্রসহ কার্যনীতি/কার্যপ্রনালী বর্ণনা কর।", aliases: ["কমপ্লিমেন্টারি B শ্রেণী পুশপুল বিবর্ধক", "complementary class B push pull amplifier"] },
      { number: "5", text: "ডিসটরশন/বিকৃতি কী? ক্রসওভার ডিসটরশন কীভাবে দূর করা যায়।", aliases: ["ক্রসওভার ডিসটরশন দূর করার উপায়", "distortion crossover distortion removal"] },
      { number: "6", text: "\"B\" শ্রেনী পুশপুল বিবর্ধকের সুবিধা অসুবিধা লিখ।", aliases: ["B শ্রেণী পুশপুল বিবর্ধকের সুবিধা অসুবিধা", "class B push pull advantages disadvantages"] },
      { number: "7", text: "ক্ষমতা বিবর্ধকের প্রয়োজনীয়তা লিখ। অথবা, ইলেকট্রিক বর্তনীতে কেন ক্ষমতা বিবর্ধক ব্যবহৃত হয়।", aliases: ["ক্ষমতা বিবর্ধকের প্রয়োজনীয়তা", "কেন ক্ষমতা বিবর্ধক ব্যবহৃত হয়", "need of power amplifier"] },
      { number: "8", text: "ক্ষমতা অপচয় বলতে কী বুঝ? পুশপুল কেন ক্ষমতা বিবর্ধকে ব্যবহৃত হয়।", aliases: ["ক্ষমতা অপচয়", "power dissipation push pull amplifier"] },
      { number: "9", text: "ট্রান্সফরমার সংযুক্ত \"A\" শ্রেনী / \"ক\" শ্রেনীর বিবর্ধক বর্তনীর কার্যপ্রনালী বর্ণনা করে সর্বোচ্চ রুপান্তর দক্ষতা নির্ণয় কর। অথবা, ট্রান্সফরমার সংযোজিত \"A\" শ্রেনী বিবর্ধকের দক্ষতা ৫০% প্রমান কর। অথবা, ট্রান্সফরমার সংযোজিত \"A\" শ্রেনীর বিবর্ধকের দক্ষতার রাশি নির্ণয় কর।", aliases: ["ট্রান্সফরমার সংযুক্ত A শ্রেণী বিবর্ধকের দক্ষতা", "A class transformer coupled amplifier efficiency 50 percent"] },
      { number: "10", text: "ট্রান্সফরমার সংযোজিত \"A\" শ্রেনীর বিবর্ধকের লোড ইম্পিডেন্স নির্ণয় কর।", aliases: ["A শ্রেণী বিবর্ধকের লোড ইম্পিডেন্স", "load impedance transformer coupled class A amplifier"] },
      { number: "11", text: "\"A\" শ্রেনী, \"B\" শ্রেনী, \"C\" শ্রেনী বিবর্ধকের মধ্যে তুলনা/পার্থক্য বা বিবর্ধকের কার্যক্রম গুলো আলোচনা কর।", aliases: ["A B C শ্রেণী বিবর্ধকের পার্থক্য", "class A B C amplifier comparison"] },
      { number: "12", text: "\"B\" শ্রেনীর পুশপুল বিবর্ধকের গঠন ও কার্যপ্রনালী বর্ণনা করে এর রুপান্তর দক্ষতা নির্ণয় কর। অথবা, দেখাও যে, \"B\" শ্রেনীর পুশপুল বিবর্ধকের রুপান্তর দক্ষতা বা সর্বোচ্চ দক্ষতা ৭৮.৫%।", aliases: ["B শ্রেণী পুশপুল বিবর্ধকের সর্বোচ্চ দক্ষতা", "78.5 percent efficiency class B push pull"] }
    ]
  },
  {
    chapterNumber: 2, topicNumber: 1, code: "২", title: "স্পন্দক সার্কিট",
    lectures: {
      "1": ["7", "8"],
      "2": ["4", "14"],
      "3": ["10", "9", "3"],
      "4": ["1", "6", "5", "11"],
      "5": ["2"],
      "6": []
    },
    questions: [
      { number: "1", text: "স্পন্দকের জন্য বারখাউজেন নির্ণয়ক/শর্ত সমূহ প্রতিপাদন কর।", aliases: ["বারখাউজেন নির্ণায়ক", "বারখাউজেন শর্ত", "Barkhausen criterion oscillator"] },
      { number: "2", text: "একটি উইনব্রীজ অসিলেটরের কম্পাংকের রাশিমালা নির্ণয় কর এবং কম্পাংক নিরবচ্ছিন্নভাবে উৎপন্ন হওয়ার শর্ত প্রতিপাদন কর। অথবা, উইনব্রীজ স্পন্দকের বর্তনীর চিত্র আঁক এবং স্পন্দক উৎপন্ন হওয়ার শর্ত প্রতিপাদন কর।", aliases: ["উইনব্রীজ অসিলেটরের কম্পাঙ্ক", "Wien bridge oscillator frequency condition"] },
      { number: "3", text: "বিবর্ধক ও স্পন্দকের মধ্যে পার্থক্য লিখ।", aliases: ["বিবর্ধক স্পন্দকের পার্থক্য", "amplifier oscillator difference"] },
      { number: "4", text: "দেখাও যে, মুক্ত চলনশীল মাল্টিভাইব্রেটরের দোলনকাল $T = 1.38\\, RC$", aliases: ["মাল্টিভাইব্রেটরের দোলনকাল 1.38 RC", "free running multivibrator period"] },
      { number: "5", text: "স্পন্দকের শ্রেনীবিভাগ লিখ। স্পন্দক ও বহুস্পন্দকের মধ্যে পার্থক্য লিখ।", aliases: ["স্পন্দকের শ্রেণীবিভাগ", "স্পন্দক ও বহুস্পন্দকের পার্থক্য", "oscillator multivibrator classification"] },
      { number: "6", text: "স্পন্দকের জন্য বারখাউজেন নীতি প্রতিপাদন কর ও ব্যাখ্যা কর।", aliases: ["বারখাউজেন নীতি", "Barkhausen principle"] },
      { number: "7", text: "কলপিটস স্পন্দকের শর্ত প্রতিপাদন কর।", aliases: ["কলপিটস স্পন্দকের শর্ত", "Colpitts oscillator condition"] },
      { number: "8", text: "[একই প্রশ্ন উত্তর করা যায়] একটি কলপিটস স্পন্দকের কার্যনীতি ব্যাখ্যা কর এবং ইহার স্পন্দকের কম্পাংকের রাশিমালা প্রতিপাদন কর।", aliases: ["কলপিটস স্পন্দকের কার্যনীতি", "কলপিটস স্পন্দকের কম্পাঙ্ক", "Colpitts oscillator frequency"] },
      { number: "9", text: "যদি মাল্টিভাইব্রেটরের ডিউটি সাইকেল 50% হয় তবে $350\\text{ Hz}$ কম্পাঙ্কের বর্গাকার তরঙ্গ তৈরী করতে টাইমিং রোধক ও ধারকের মান নির্ণয় কর।", aliases: ["50 percent duty cycle 350 Hz square wave", "টাইমিং রোধক ধারকের মান"] },
      { number: "10", text: "$C_1 = 0.2\\,\\mu\\text{F}$; $C_2 = 0.5\\,\\mu\\text{F}$ ও $L = 50\\text{ mHz}$ বিশিষ্ট কোন কলপিটস স্পন্দক থেকে কত কম্পাংকের সিগন্যাল পাওয়া যাবে? এর জন্য কী ধরনের ট্রানজিস্টর ব্যবহার করতে হবে।", aliases: ["C1 C2 L কলপিটস স্পন্দকের কম্পাঙ্ক", "Colpitts oscillator numerical frequency"] },
      { number: "11", text: "একটি অ্যাসটেবল মাল্টিভাইব্রেটরের সময় নির্ধারক রোধ এবং ধারকের মান যথাক্রমে $10\\text{ k}\\Omega$ এবং $0.01\\,\\mu\\text{F}$ হলে বর্গ তরঙ্গের পর্যায়কাল ও কম্পাংক বের কর।", aliases: ["অ্যাসটেবল মাল্টিভাইব্রেটরের পর্যায়কাল কম্পাঙ্ক", "astable multivibrator period frequency"] },
      { number: "12", text: "একটি হার্টলি স্পন্দকের বর্তনী চিত্র অঙ্কনপূর্বক এর কম্পাংকের রাশিমালা প্রতিপাদন কর।", aliases: ["হার্টলি স্পন্দকের কম্পাঙ্ক", "Hartley oscillator frequency"] },
      { number: "13", text: "একটি অ্যাসটাবল মাল্টিভাইব্রেটরের কার্যপ্রনালী ও কম্পাংকের রাশিমালা প্রতিপাদন কর।", aliases: ["অ্যাসটেবল মাল্টিভাইব্রেটরের কার্যপ্রণালী", "astable multivibrator operation frequency"] },
      { number: "14", text: "দেখাও যে, ফ্রি রানিং/মুক্তচলনশীল মাল্টিভাইব্রেটরের দোলনকাল $T = 1.38\\, RC$ [প্রশ্ন নং (৪) একই] অথবা, অ্যাসটাবল মাল্টিভাইব্রেটরকে মুক্ত চলনশীল মাল্টিভাইব্রেটর কেন বলা হয়? ইহার দোলনকালের সমীকরণ নির্ণয় কর। অথবা, ফ্রি-রানিং মাল্টিভাইব্রেটরের কার্যনীতি বর্ণনা কর এবং প্রমান কর, এর কম্পাংক $f = \\frac{0.72}{RC}\\text{ Hz}$", aliases: ["ফ্রি রানিং মাল্টিভাইব্রেটরের দোলনকাল", "T equals 1.38 RC", "f equals 0.72 over RC"] },
      { number: "15", text: "ঋনাত্মক ফিডব্যাক কীভাবে বিবর্ধকের গেইনের স্থিতিশীলতা বজায় রাখে তা ব্যাখ্যা কর।", aliases: ["ঋণাত্মক ফিডব্যাক গেইনের স্থিতিশীলতা", "negative feedback gain stability"] }
    ]
  },
  {
    chapterNumber: 3, topicNumber: 1, code: "৩", title: "ফিল্ড ইফেক্ট ট্রানজিস্টার",
    lectures: {
      "1": ["1", "5"],
      "2": ["4", "7"],
      "3": ["8", "6"],
      "4": ["9", "11", "10"],
      "5": ["12", "2", "3"]
    },
    questions: [
      { number: "1", text: "দেখাও যে, ডি-মসফেট ডিপ্লেশন ও ইনহ্যান্সমেন্ট উভয় মোডে কাজ করে।", aliases: ["ডি মসফেট ডিপ্লেশন ও ইনহ্যান্সমেন্ট মোড", "D MOSFET depletion enhancement mode"] },
      { number: "2", text: "JFET কীভাবে ভোল্টেজ নিয়ন্ত্রক ডিভাইস হিসাবে কাজ করে ব্যাখ্যা কর।", aliases: ["JFET ভোল্টেজ নিয়ন্ত্রক", "JFET voltage controlled device"] },
      { number: "3", text: "ইনহ্যান্সমেন্ট শ্রেনী মসফেটের গঠন ও কার্যাবলী ব্যাখ্যা কর। অথবা, E-only MOSFET এর গঠন ও কার্যাবলী বর্ণনা কর।", aliases: ["ইনহ্যান্সমেন্ট MOSFET", "E only MOSFET structure operation", "enhancement MOSFET"] },
      { number: "4", text: "JFET প্যারামিটারের মধ্যে সম্পর্ক নির্ণয় কর।", aliases: ["JFET প্যারামিটারের সম্পর্ক", "JFET parameter relation"] },
      { number: "5", text: "D-MOSFET / DE-MOSFET এর গঠন ও কার্যপ্রনালী ব্যাখ্যা কর।", aliases: ["D MOSFET DE MOSFET গঠন কার্যপ্রণালী", "depletion MOSFET structure operation"] },
      { number: "6", text: "FET ও MOSFET এর গঠন তুলনা কর/পার্থক্য লিখ।", aliases: ["FET MOSFET পার্থক্য", "FET and MOSFET difference"] },
      { number: "7", text: "FET প্যারামিটার কী? এদের মধ্যে সম্পর্ক স্থাপন কর।", aliases: ["FET প্যারামিটার", "FET parameters relation"] },
      { number: "8", text: "Pinch off voltage কী? ড্রেন বৈশিষ্ট্যের উপর ইহার প্রভাব বর্ণনা কর।", aliases: ["পিঞ্চ অফ ভোল্টেজ", "drain characteristics pinch off voltage"] },
      { number: "9", text: "একটি JFET এর বিবর্ধন ফ্যাক্টর ও ট্রান্সকন্ডাক্টেন্স যথাক্রমে $40$ এবং $3\\text{ mS}$ হলে, ড্রেন রোধ নির্ণয় কর।", aliases: ["JFET drain resistance numerical", "বিবর্ধন ফ্যাক্টর ট্রান্সকন্ডাক্টেন্স হতে ড্রেন রোধ"] },
      { number: "10", text: "একটি নির্দিষ্ট E-MOSFET এর ক্ষেত্রে দেওয়া আছে, $I_D = 4.5\\text{ mA}$ যখন $V_{GS} = 12\\text{ volt}$ এবং $V_{GS(th)} = 6\\text{ volt}$; $V_{GS} = 10\\text{ volt}$ হলে $I_D$ এর মান নির্ণয় কর।", aliases: ["E MOSFET drain current numerical", "ID VGS threshold voltage"] },
      { number: "11", text: "একটি JFET এর ড্রেন রোধ ও বিবর্ধক ফ্যাক্টর যথাক্রমে $40\\text{ K}$ এবং $10$ হলে, ট্রান্সকন্ডাক্ট্যান্স নির্ণয় কর।", aliases: ["JFET transconductance numerical", "ড্রেন রোধ বিবর্ধক ফ্যাক্টর থেকে ট্রান্সকন্ডাক্ট্যান্স"] },
      { number: "12", text: "JFET ও MOSFET এর গঠন বর্ণনা কর।", aliases: ["JFET MOSFET গঠন", "JFET and MOSFET structure"] },
      { number: "13", text: "সাধারন ড্রেইন JFET বিবর্ধকের ভোল্টেজ গেইনের রাশিমালা নির্ণয় কর।", aliases: ["সাধারণ ড্রেইন JFET বিবর্ধকের ভোল্টেজ গেইন", "common drain JFET voltage gain"] },
      { number: "14", text: "ফেট ও ট্রানজিস্টর এর মধ্যে পার্থক্য লিখ। অথবা, FET ও BJT এর মধ্যে পার্থক্য লিখ।", aliases: ["FET BJT পার্থক্য", "FET transistor difference"] }
    ]
  },
  {
    chapterNumber: 4, topicNumber: 1, code: "৪", title: "SCR ও TRIAC",
    lectures: {
      "1": ["3", "2"],
      "2": ["1", "4"],
      "3": ["7", "5", "6", "8"],
      "4": ["9", "10"]
    },
    questions: [
      { number: "1", text: "SCR এর কার্যপ্রনালী ও V-I বৈশিষ্ট্য বর্ণনা কর। অথবা, SCR এর V-I লেখচিত্র অঙ্কনপূর্বক ফরোয়ার্ড ও রিভার্স বৈশিষ্ট্য বর্ণনা কর।", aliases: ["SCR V-I বৈশিষ্ট্য", "SCR forward reverse characteristics"] },
      { number: "2", text: "ট্রায়াকের V-I বৈশিষ্ট্য বর্ণনা কর।", aliases: ["ট্রায়াকের V I বৈশিষ্ট্য", "TRIAC VI characteristics"] },
      { number: "3", text: "ট্রান্সকন্ডাক্ট্যান্স কী? $g_m$ ও $V_{GS}$ এর মধ্যে সম্পর্ক ব্যাখ্যা কর।", aliases: ["ট্রান্সকন্ডাক্ট্যান্স gm VGS সম্পর্ক", "transconductance relation gm VGS"] },
      { number: "4", text: "SCR এর সমতুল বর্তনী অঙ্কনপূর্বক এর কার্যপ্রনালী ব্যাখ্যা কর।", aliases: ["SCR সমতুল বর্তনী", "SCR equivalent circuit operation"] },
      { number: "5", text: "বর্তনীর চিত্রসহ SCR এর অর্ধতরঙ্গ দশা নিয়ন্ত্রন কার্যনীতি বর্ণনা কর।", aliases: ["SCR অর্ধতরঙ্গ দশা নিয়ন্ত্রণ", "SCR half wave phase control"] },
      { number: "6", text: "SCR এর অর্ধতরঙ্গ রেক্টিফায়ারের কার্যনীতি বর্ণনা কর।", aliases: ["SCR অর্ধতরঙ্গ রেক্টিফায়ার", "SCR half wave rectifier"] },
      { number: "7", text: "সুইচ হিসাবে SCR এর ক্রিয়া ব্যাখ্যা কর।", aliases: ["সুইচ হিসাবে SCR", "SCR as a switch"] },
      { number: "8", text: "পূর্ণতরঙ্গ দশা নিয়ন্ত্রনে SCR এর কার্যনীতি চিত্রসহ বর্ণনা কর।", aliases: ["SCR পূর্ণতরঙ্গ দশা নিয়ন্ত্রণ", "SCR full wave phase control"] },
      { number: "9", text: "TRIAC- এর গঠন ও কার্যাবলী চিত্রসহ বর্ণনা কর।", aliases: ["TRIAC গঠন কার্যপ্রণালী", "TRIAC structure operation"] },
      { number: "10", text: "TRIAC এর সাহায্যে পূর্ণতরঙ্গ দশা নিয়ন্ত্রনে সচিত্র বর্ণনা কর।", aliases: ["TRIAC পূর্ণতরঙ্গ দশা নিয়ন্ত্রণ", "TRIAC full wave phase control"] }
    ]
  },
  {
    chapterNumber: 5, topicNumber: 1, code: "৫", title: "পরিমাপের ইলেকট্রনিক ডিভাইস",
    lectures: {
      "1": ["2"],
      "2": ["1", "3", "4"]
    },
    questions: [
      { number: "1", text: "থার্মিস্টরের গঠন ও ব্যবহারিক প্রয়োগ উল্লেখ কর।", aliases: ["থার্মিস্টরের গঠন", "thermistor structure application"] },
      { number: "2", text: "সেভেন সিগমেন্ট ডিসপ্লের কার্যক্রম ব্যাখ্যা কর। অথবা, সেভেন সিগমেন্ট ডিসপ্লে বর্ণনা কর।", aliases: ["সেভেন সেগমেন্ট ডিসপ্লে", "seven segment display"] },
      { number: "3", text: "ফটোকন্ডাকটিভ কোষের বর্ণনা দাও। অথবা, ফটোকন্ডাকটিভ সেলের গঠন ও কার্যপ্রনালী বর্ণনা কর।", aliases: ["ফটোকন্ডাকটিভ কোষ", "photoconductive cell structure operation"] },
      { number: "4", text: "একটি CRT এর গঠন ও কার্যপ্রনালী বর্ণনা কর। অথবা, একটি ক্যাথোডরে টিউব / CRT এর গঠন ও কার্যপ্রনালী আলোচনা কর।", aliases: ["CRT গঠন কার্যপ্রণালী", "cathode ray tube CRT"] },
      { number: "5", text: "LED কী? এটি কীভাবে কাজ করে। অথবা, তরল কেলাস ডিসপ্লে কী? এটি কীভাবে কাজ করে।", aliases: ["LED কীভাবে কাজ করে", "তরল কেলাস ডিসপ্লে", "LCD operation"] }
    ]
  },
  {
    chapterNumber: 6, topicNumber: 1, code: "৬", title: "ডিজিটাল ইলেকট্রনিক্স সম্পর্কে ধারণা",
    lectures: {
      "1": [],
      "2": ["5", "6", "7", "8"],
      "3": ["9", "10"],
      "4": ["1", "2", "3", "4", "11"]
    },
    questions: [
      { number: "1", text: "ডাটা স্থানান্তর প্রক্রিয়ায় ডিজিটাল ব্যবহারের সুবিধা সমূহ লিখ।", aliases: ["ডাটা স্থানান্তরে ডিজিটাল ব্যবহারের সুবিধা", "advantages of digital data transmission"] },
      { number: "2", text: "ডিজিটাল সিস্টেম কী? ডিজিটাল পদ্ধতির সুবিধা অসুবিধা লিখ।", aliases: ["ডিজিটাল সিস্টেম সুবিধা অসুবিধা", "digital system advantages disadvantages"] },
      { number: "3", text: "এনালগ ও ডিজিটাল সিস্টেমের মধ্যে পার্থক্য লিখ।", aliases: ["এনালগ ডিজিটাল সিস্টেমের পার্থক্য", "analog digital system difference"] },
      { number: "4", text: "BCD ও ASCII কোডের পার্থক্য লিখ।", aliases: ["BCD ASCII কোডের পার্থক্য", "BCD and ASCII code difference"] },
      { number: "5", text: "$(ABCD.EF)_{16}$ কে ১০ ভিত্তিক এবং $(11010.11)_2$ কে ৮ ভিত্তিক সংখ্যায় রূপান্তর কর। {যাবতীয় সব রূপান্তর করবে নিশ্চিত পরীক্ষায় আসবে}", aliases: ["ABCD.EF hexadecimal to decimal", "11010.11 binary to octal", "সংখ্যা পদ্ধতির রূপান্তর"] },
      { number: "6", text: "$(ABCD)_{16}$ কে অক্টাল এবং $(1657.55)_{10}$ কে হেক্সাডেসিমেল সংখ্যায় রূপান্তর কর। {যাবতীয় সব রূপান্তর সংখ্যা পদ্ধতির}", aliases: ["ABCD hexadecimal to octal", "1657.55 decimal to hexadecimal"] },
      { number: "7", text: "$(2AF.5D)_{16}$ কে বাইনারিতে রূপান্তর কর।", aliases: ["2AF.5D hexadecimal to binary"] },
      { number: "8", text: "$(175.15)_{10}$ সংখ্যাকে ৪ ভিত্তিক ও ১৬ ভিত্তিক সংখ্যায় রূপান্তর কর।", aliases: ["175.15 decimal to base 4 and hexadecimal"] },
      { number: "9", text: "ASCII বলতে কী বুঝায়? ডিজিটাল ইলেকট্রনিক্স ও বাইনারি পদ্ধতি ব্যবহার করা হয় কেন।", aliases: ["ASCII কী", "ডিজিটাল ইলেকট্রনিক্সে বাইনারি পদ্ধতি কেন", "ASCII binary system"] },
      { number: "10", text: "BCD কোড কী? রূপান্তর কর - (i) $(110101)_2 = (?)_8$ (ii) $(9AF.8)_{16} = (?)_{10}$", aliases: ["BCD কোড রূপান্তর", "110101 binary to octal", "9AF.8 hexadecimal to decimal"] },
      { number: "11", text: "$(2676.25)_{10}$ সংখ্যাকে ৮ ভিত্তিক ও ১৬ ভিত্তিক সংখ্যায় রূপান্তর কর।", aliases: ["2676.25 decimal to octal hexadecimal"] }
    ]
  },
  {
    chapterNumber: 7, topicNumber: 1, code: "৭", title: "ডিজিটাল লজিক সার্কিট",
    lectures: {
      "1": ["3", "4", "8"],
      "2": ["6"],
      "3": ["9"],
      "4": ["2", "7", "14"],
      "5": ["10", "11", "12", "13"],
      "6": ["5", "1", "15"],
      "7": ["16"]
    },
    questions: [
      { number: "1", text: "JK ফ্লিপফ্লপের গঠন চিত্র বর্ণনা কর।", aliases: ["JK ফ্লিপফ্লপের গঠন", "JK flip flop structure"] },
      { number: "2", text: "ট্রানজিস্টর দিয়ে AND এবং NOR গেটের বর্তনী বাস্তবায়ন কর এবং সত্যক সারণীসহ ব্যাখ্যা কর।", aliases: ["ট্রানজিস্টর দিয়ে AND NOR গেট", "transistor AND NOR gate truth table"] },
      { number: "3", text: "ডি-মরগ্যানের সূত্র লিখ এবং তিন চলকের ক্ষেত্রে প্রমান কর।", aliases: ["ডি মরগ্যানের সূত্র", "De Morgan theorem three variables"] },
      { number: "4", text: "ব্ল্যাংকিং পালস ব্যাখ্যা কর।", aliases: ["ব্ল্যাংকিং পালস", "blanking pulse"] },
      { number: "5", text: "কীভাবে দুটি হাফ অ্যাডার দিয়ে একটি ফুল অ্যাডার তৈরী করা যায়? ব্যাখ্যা কর। অথবা, হাফ এডার কী? হাফ অ্যাডারের সাহায্যে কীভাবে ফুল অ্যাডার পাওয়া যায় চিত্র ও সত্যক সারণী সহ বর্ণনা কর।", aliases: ["দুটি হাফ অ্যাডার দিয়ে ফুল অ্যাডার", "half adder to full adder"] },
      { number: "6", text: "যোগ কারক বর্তনী কী? লজিক গেট দিয়ে তৈরী একটি অর্ধযোগকারকের কার্যপ্রনালী সত্যক সারণীসহ বর্ণনা কর।", aliases: ["অর্ধযোগকারক", "half adder truth table"] },
      { number: "7", text: "বৈদ্যুতিক সমতল বর্তনীসহ একটি NAND গেটের কার্যপ্রনালী ব্যাখ্যা কর / অথবা, ট্রানজিস্টর ব্যবহার করে NAND গেটের কার্যপ্রনালী ব্যাখ্যা কর।", aliases: ["NAND গেটের কার্যপ্রণালী", "transistor NAND gate"] },
      { number: "8", text: "DTL ও TTL এর দুইটি বৈশিষ্ট্য উল্লেখ কর।", aliases: ["DTL TTL বৈশিষ্ট্য", "DTL TTL characteristics"] },
      { number: "9", text: "কম্বিনেশনাল ও সিকুয়েন্সিয়াল লজিক বলতে কী বুঝ।", aliases: ["কম্বিনেশনাল সিকুয়েন্সিয়াল লজিক", "combinational sequential logic"] },
      { number: "10", text: "প্রমান কর যে, (i) $(A+B)(A+C) = A+BC$ (ii) $A+\\bar{A}B = A+B$ {যাবতীয় বুলিয়ান ম্যাথ}", aliases: ["বুলিয়ান বীজগণিতের প্রমাণ", "A plus B times A plus C", "Boolean algebra identities"] },
      { number: "11", text: "প্রমান কর যে, $A\\bar{B}C + \\bar{A}BC + AB\\bar{C} + ABC = AB+BC+CA$", aliases: ["Boolean expression AB BC CA", "বুলিয়ান সমীকরণ AB BC CA"] },
      { number: "12", text: "প্রমান কর যে, $(A+B)(A+\\bar{B})(\\bar{A}+C) = AC$", aliases: ["Boolean expression equals AC", "বুলিয়ান সমীকরণ AC"] },
      { number: "13", text: "বুলিয়ান বীজগণিত কী। প্রমান কর $(AB+C)(AB+D) = AB+CD$", aliases: ["বুলিয়ান বীজগণিত", "Boolean algebra AB CD identity"] },
      { number: "14", text: "ট্রানজিস্টর ব্যবহার করে AND ও OR গেটের কার্যাবলী লিখ।", aliases: ["ট্রানজিস্টর দিয়ে AND OR গেট", "transistor AND OR gate"] },
      { number: "15", text: "বাইনারি কাউন্টারের গঠন ও কার্যাবলী বর্ণনা কর।", aliases: ["বাইনারি কাউন্টার", "binary counter structure operation"] },
      { number: "16", text: "দেখাও যে, NAND এবং NOR গেইটকে সার্বজনীন গেইট হিসাবে ব্যবহার করা যায়।", aliases: ["NAND NOR সার্বজনীন গেইট", "universal gates NAND NOR"] },
      { number: "17", text: "একটি ফ্লিপ-ফ্লপের চিত্রসহ কার্যপ্রনালী ব্যাখ্যা কর? অথবা, ব্লক চিত্র সহ S-R ফ্লিপ-ফ্লপের আলোচনা কর।", aliases: ["S R ফ্লিপ ফ্লপ", "SR flip flop operation", "flip flop working"] }
    ]
  },
  {
    chapterNumber: 8, topicNumber: 1, code: "৮", title: "রেডিও নীতি",
    lectures: {
      "1": ["4", "6"],
      "2": ["3", "11"],
      "3": ["7"],
      "4": ["8", "9", "10"],
      "5": ["2", "1", "5"]
    },
    questions: [
      { number: "1", text: "মডুলেশনের প্রয়োজনীয়তা ব্যাখ্যা কর।", aliases: ["মডুলেশনের প্রয়োজনীয়তা", "need for modulation"] },
      { number: "2", text: "একটি সুপার হেটারোডাইন রিসিভারের ব্লকচিত্র অঙ্কন করে বিভিন্ন ধাপের কাজ বর্ণনা কর। অথবা, একটি সুপার হেটারোডাইন বেতার গ্রাহক যন্ত্রের ব্লকচিত্র অংকন কর এবং এর কার্যপ্রনালী বর্ণনা কর।", aliases: ["সুপার হেটারোডাইন রিসিভার", "superheterodyne receiver block diagram"] },
      { number: "3", text: "রেডিও তরঙ্গের বৈশিষ্ট্য বর্ণনা কর।", aliases: ["রেডিও তরঙ্গের বৈশিষ্ট্য", "radio wave properties"] },
      { number: "4", text: "দেখাও যে, বিস্তার মডুলেশনের ব্যান্ড প্রস্থ সিগন্যাল কম্পাঙ্কের দ্বিগুন।", aliases: ["AM ব্যান্ড প্রস্থ সিগন্যাল কম্পাঙ্কের দ্বিগুণ", "amplitude modulation bandwidth"] },
      { number: "5", text: "মডুলেশন ফ্যাক্টর ব্যাখ্যা কর।", aliases: ["মডুলেশন ফ্যাক্টর", "modulation factor"] },
      { number: "6", text: "বিস্তার মডুলেশনের ক্ষমতা বন্টনের রাশিমালা প্রতিপাদন কর। অথবা, বিস্তার মডুলেশনের তরঙ্গ ও ভোল্টেজের সমীকরণ প্রতিপাদন কর? এবং বিভিন্ন পদের ব্যাখ্যা দাও। অথবা, বিস্তার মডুলেশন (AM) সংকেতের সমীকরণ নির্ণয় কর এবং এর তিনটি উপাংশ ব্যাখ্যা কর।", aliases: ["বিস্তার মডুলেশনের ক্ষমতা বণ্টন", "AM signal equation", "AM power distribution"] },
      { number: "7", text: "ডি-মডুলেশন পদ্ধতি আলোচনা কর।", aliases: ["ডি মডুলেশন পদ্ধতি", "demodulation method"] },
      { number: "8", text: "কোন প্রেরক যন্ত্র ব্যবস্থায় বাহক তরঙ্গের সমীকরণ $50\\text{ kW}$ পূর্নমাত্রায় মডুলেশন করার জন্য অডিও সিগন্যালের ক্ষমতা কত হবে? মডুলেশন ব্যবস্থার দক্ষতা $72\\%$।", aliases: ["50 kW carrier audio signal power 72 percent efficiency", "AM transmitter audio power numerical"] },
      { number: "9", text: "কোনো AM তরঙ্গের মোট ক্ষমতা $1500\\text{ W}$ শতকরা $100$ ভাগ মডুলেশনের জন্য সাইডব্যান্ড ক্ষমতা নির্ণয় কর।", aliases: ["AM total power sideband power 1500 W", "sideband power 100 percent modulation"] },
      { number: "10", text: "বিস্তার / AM ট্রান্সমিটারের চিত্রসহ কার্যপদ্ধতি বর্ণনা কর।", aliases: ["AM ট্রান্সমিটার কার্যপদ্ধতি", "AM transmitter operation"] },
      { number: "11", text: "যদি বাহক তরঙ্গের সর্বোচ্চ ভোল্টেজ $100\\text{ V}$ হয় এবং $100\\,\\Omega$ লোডের সাথে যুক্ত হয়, তাহলে লোড কর্তৃক কত পাওয়ার শোষিত হবে? ($m_a = 0.40$)", aliases: ["AM load power 100 V 100 ohm", "carrier voltage load absorbed power"] },
      { number: "12", text: "বিস্তার মডুলেশন কী।", aliases: ["বিস্তার মডুলেশন কী", "amplitude modulation definition"] },
      { number: "13", text: "কম্পাংক মডুলেশন বলতে কী বুঝ? কম্পাংক মডুলেশনকৃত সংকেতের সমীকরণ প্রতিপাদন কর।", aliases: ["কম্পাঙ্ক মডুলেশন", "frequency modulation signal equation", "FM"] },
      { number: "14", text: "TRF এবং সুপার হেটারোডাইন রিসিভারের মধ্যে পার্থক্য লিখ।", aliases: ["TRF সুপার হেটারোডাইন রিসিভারের পার্থক্য", "TRF superheterodyne receiver difference"] }
    ]
  },
  {
    chapterNumber: 9, topicNumber: 1, code: "৯", title: "IC ফেব্রিকেশন কৌশল",
    lectures: {
      "1": ["1", "2"],
      "2": ["3"]
    },
    questions: [
      { number: "1", text: "সমন্বিত বর্তনীর সুবিধা ও অসুবিধা লিখ।", aliases: ["সমন্বিত বর্তনীর সুবিধা অসুবিধা", "IC advantages disadvantages"] },
      { number: "2", text: "গঠন অনুসারে IC-এর প্রকারভেদ লিখ। অথবা, IC কী? গঠনের উপর এবং কার্যক্রমের উপর ভিত্তি করে IC এর শ্রেনীবিভাগ দেখাও।", aliases: ["IC শ্রেণীবিভাগ", "IC classification by construction and function"] },
      { number: "3", text: "মনোলিথিক আইসি (IC) গঠনের মৌলিক প্রক্রিয়া বর্ণনা কর। অথবা, মনোলিথিক সমন্বিত বর্তনীর গঠন প্রনালী বর্ণনা কর।", aliases: ["মনোলিথিক IC গঠন প্রক্রিয়া", "monolithic IC fabrication process"] }
    ]
  },
  {
    chapterNumber: 10, topicNumber: 1, code: "১০", title: "টেলিভিশন",
    lectures: {
      "1": ["1"],
      "2": ["2", "3"]
    },
    questions: [
      { number: "1", text: "একটি সাদাকালো টেলিভিশন গ্রাহক যন্ত্রের ব্লকচিত্র অঙ্কন কর। অথবা, ব্লকচিত্রসহ B/W টেলিভিশনের রিসিভারের কার্যপদ্ধতি বর্ণনা কর।", aliases: ["সাদাকালো টেলিভিশন গ্রাহক যন্ত্র", "black and white TV receiver block diagram"] },
      { number: "2", text: "একটি সাদাকালো (B/W) টেলিভিশনের প্রেরক যন্ত্রের ব্লকচিত্র অঙ্কন করে কার্যপ্রনালী বর্ণনা কর।", aliases: ["সাদাকালো টেলিভিশনের প্রেরক যন্ত্র", "black and white TV transmitter"] },
      { number: "3", text: "ভিডিকন ক্যামেরা টিউবের গঠন ও কার্যপ্রনালী বর্ণনা কর। অথবা, ভিডিকন ক্যামেরা টিউবের গঠন ও কার্যনীতি ব্যাখ্যা কর।", aliases: ["ভিডিকন ক্যামেরা টিউব", "vidicon camera tube structure operation"] },
      { number: "4", text: "টেলিভিশনের ইমেজ স্ক্যানিং পদ্ধতি আলোচনা কর।", aliases: ["টেলিভিশনের ইমেজ স্ক্যানিং", "TV image scanning"] }
    ]
  },
  {
    chapterNumber: 11, topicNumber: 1, code: "১১", title: "রাডার",
    lectures: {
      "1": ["1"],
      "2": ["2", "4", "3"],
      "3": ["6", "5"]
    },
    questions: [
      { number: "1", text: "সংক্ষেপে ব্লকচিত্রসহ রাডারের কার্যপ্রনালী ব্যাখ্যা কর। অথবা, একটি MTI রাডারের ব্লকচিত্র আঁক ও বিভিন্ন ধাপের বর্ননা দাও।", aliases: ["রাডারের কার্যপ্রণালী", "MTI radar block diagram", "radar operation"] },
      { number: "2", text: "একটি পাল্‌স ডপলার রাডার $600\\text{ MHz}$ এ কাজ করছে। এর পাল্‌স পুনরাবৃত্তি কম্পাঙ্ক $700\\text{ Hz}$ হলে দ্বিতীয় অন্ধবেগ নির্নয় কর।", aliases: ["পালস ডপলার রাডারের দ্বিতীয় অন্ধবেগ", "second blind speed pulse doppler radar"] },
      { number: "3", text: "কেন নিম্ন কম্পাঙ্কের সংকেত দূরে প্রেরন করা যায় না ব্যাখ্যা কর। ($\\rightarrow$ ম্যাথ দুইটা গুরুত্বপূর্ন)", aliases: ["নিম্ন কম্পাঙ্কের সংকেত দূরে প্রেরণ", "low frequency signal transmission"] },
      { number: "4", text: "একটি রাডার $3\\text{ cm}$ তরঙ্গদৈর্ঘ্যে $1\\text{ MW}$ পিক পালস ক্ষমতায় কাজ করে। যদি ইহার নূন্যতম গ্রহনযোগ্য ক্ষমতা $4 \\times 10^{-13}\\text{ W}$ এন্টিনার ক্যাপচার এরিয়া $6\\text{ m}^2$ ও টার্গেট রাডার এরিয়া $15\\text{ m}^2$ হয়, তাহলে রাডারটির সর্বাধিক পাল্লা কত।", aliases: ["রাডারের সর্বাধিক পাল্লা numerical", "radar maximum range equation numerical"] },
      { number: "5", text: "একটিমাত্র এন্টেনার সাহায্যে রাডার ওয়েব প্রেরন ও গ্রহন আলোচনা কর।", aliases: ["একটি অ্যান্টেনা দিয়ে রাডার তরঙ্গ প্রেরণ গ্রহণ", "single antenna radar transmit receive"] },
      { number: "6", text: "রাডারের পাল্লার সমীকরন নির্নয় কর। অথবা, রাডারের পাল্লা কী? মুক্ততলে রাডারের পাল্লার সমীকরন নির্নয় কর।", aliases: ["রাডারের পাল্লার সমীকরণ", "radar range equation"] }
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

/** Adds full QC wording to mapped Electronics-2 lectures. */
export function buildElectronics2LectureTitle(
  chapterNumber: number,
  topicNumber: number,
  lectureNumber: number,
  currentTitle: string
): string {
  const topic = ELECTRONICS_2_QUESTION_BANK.find(
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

export function getElectronics2LectureNumbersForQuestion(
  topic: Electronics2TopicQuestionSet,
  questionNumber: string
): number[] {
  return Object.entries(topic.lectures)
    .filter(([, questionNumbers]) => questionNumbers.includes(questionNumber))
    .map(([lectureNumber]) => Number(lectureNumber));
}
