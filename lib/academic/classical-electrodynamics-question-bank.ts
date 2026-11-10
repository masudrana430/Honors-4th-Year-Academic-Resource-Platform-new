export interface ClassicalElectrodynamicsQuestion {
  number: string;
  text: string;
  aliases: string[];
}

export interface ClassicalElectrodynamicsTopicQuestionSet {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: ClassicalElectrodynamicsQuestion[];
}

export const CLASSICAL_ELECTRODYNAMICS_QUESTION_BANK: ClassicalElectrodynamicsTopicQuestionSet[] = [
  {
    "chapterNumber": 1,
    "topicNumber": 1,
    "code": "১.১",
    "title": "তড়িৎ ক্ষেত্র",
    "lectures": {
      "1": [
        "3"
      ],
      "2": [
        "1",
        "2",
        "5"
      ],
      "3": [
        "4",
        "6"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "গসের সূত্র বিবৃত ও প্রমাণ কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "গসের সূত্রের ব্যবকলিত রূপ প্রতিপাদন কর এবং তা থেকে পয়সন ও ল্যাপলাসের সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "গসের সূত্র বিবৃত এবং এটি হতে কুলম্বের সূত্র প্রতিপাদন কর। অথবা, কুলম্বের উপপাদ্য কাকে বলে? গসের সূত্র হতে কুলম্বের উপপাদ্য প্রতিপাদন কর।",
        "aliases": [
          "কুলম্বের উপপাদ্য",
          "গসের সূত্র হতে কুলম্বের সূত্র প্রতিপাদন"
        ]
      },
      {
        "number": "4",
        "text": "গোলীয় পোলার স্থানাংকে ল্যাপলাসের সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "প্রমাণ কর যে, $\\vec{\\nabla}\\cdot\\vec{E} = \\frac{\\rho}{\\epsilon_0}$ গসের সূত্রের সাধারণ রূপ।",
        "aliases": [
          "গসের সূত্রের সাধারণ রূপ",
          "ডাইভারজেন্স E",
          "নাবলা ডট ই"
        ]
      },
      {
        "number": "6",
        "text": "$50\\text{ cm}$ ব্যাসার্ধ বিশিষ্ট একটি গোলকীয় গাউসিয়ান তলের কেন্দ্রে $10^{-6}\\text{ coul}$ বিন্দু চার্জ স্থাপন করা হলে উক্ত তলের তড়িৎ ফ্লাক্স কত?",
        "aliases": []
      },
      {
        "number": "7",
        "text": "গসের সূত্র ব্যবহার করে একটি অসীম দৈর্ঘ্যের সুষম চার্জিত দন্ড হতে r দূরত্বে বিদ্যুৎ প্রাবল্য নির্ণয় কর।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 1,
    "topicNumber": 2,
    "code": "১.২",
    "title": "স্কেলার বিভব",
    "lectures": {
      "1": [
        "5",
        "2",
        "1",
        "3"
      ],
      "2": [
        "4"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "তড়িৎ দ্বিপোল ও তড়িৎ চতুর্পোলের ভ্রামকের চিত্রসহ ব্যাখ্যা প্রদান কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "বৈদ্যুতিক বিম্ব বলতে কী বুঝ? স্থির বৈদ্যুতিক সমস্যা সমাধানে বিম্ব পদ্ধতি বর্ণনা কর।",
        "aliases": [
          "বৈদ্যুতিক বিম্ব",
          "বিম্ব পদ্ধতি"
        ]
      },
      {
        "number": "3",
        "text": "তড়িৎ দ্বিমেরু ও তড়িৎ ক্ষেত্রের প্রাবল্য ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "রৈখিক চতুর্পোলের জন্য তড়িৎ বিভব নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "অভেদতা বা একরূপতা উপপাদ্য বিবৃত ও প্রমাণ কর।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "পয়সনের সমীকরণের সাধারণ সমাধান নির্ণয় কর।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 1,
    "topicNumber": 3,
    "code": "১.৩",
    "title": "পরাবিদ্যুতে স্থির তড়িৎ ক্ষেত্র",
    "lectures": {
      "1": [
        "1",
        "2",
        "3"
      ],
      "2": [
        "8"
      ],
      "3": [
        "4",
        "5"
      ],
      "4": [
        "6"
      ],
      "5": [
        "7",
        "9"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "তড়িৎ ক্ষেত্র $\\vec{D}$, $\\vec{E}$ ও $\\vec{P}$ এর সংজ্ঞা দাও।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "তিনটি তড়িৎ ক্ষেত্র $\\vec{D}$, $\\vec{E}$ ও $\\vec{P}$ এর মধ্যে সম্পর্ক প্রতিপাদন কর। অথবা, তিন তড়িৎ ক্ষেত্রের মধ্যে সম্পর্ক প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "পরাবৈদ্যুতিক মাধ্যমে গাসের সূত্র প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "পরাবিদ্যুৎ কী? পরাবৈদ্যুতিক মাধ্যমে গসের সূত্রের ব্যবকলিত রূপ $\\vec{\\nabla}\\cdot\\vec{D} = \\rho$ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "পরাবৈদ্যুতিক ধ্রুবক এবং বৈদ্যুতিক সংবেদ্যতার মধ্যে সম্পর্ক স্থাপন কর।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "স্থির বৈদ্যুতিক সমস্যা সমাধানে প্রতিবিম্ব পদ্ধতি বর্ণনা কর।",
        "aliases": []
      },
      {
        "number": "7",
        "text": "দুটি মাধ্যমের বিভেদতলে $\\vec{D}$ এবং $\\vec{E}$ এর সীমানা শর্ত ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "8",
        "text": "সুষম তড়িৎ ক্ষেত্রে একটি পরাবৈদ্যুতিক গোলক স্থাপন করা হলে, গোলকের বাইরের কোন বিন্দুতে এবং অভ্যন্তরে তড়িৎ বিভব ও ক্ষেত্র ভেক্টরের উপাংশগুলো নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "9",
        "text": "একটি পরিবাহী গোলকের নিকটে তড়িৎ ক্ষেত্রের মান $5 \\times 10^4\\text{ NC}^{-1}$ চার্জের তলমাত্রিক ঘনত্ব নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "10",
        "text": "মেরুবর্তী চার্জ ঘনত্ব $\\rho_p$ হলে দেখাও যে, $\\rho_p = -\\vec{\\nabla}\\cdot\\vec{P}$; যেখানে $\\vec{P}$ হলো মেরুবর্তীতা।",
        "aliases": []
      },
      {
        "number": "11",
        "text": "শূন্য মাধ্যমে একটি সমতল সাইনসদৃশ তড়িৎ চুম্বকীয় তরঙ্গ সঞ্চারন করছে। দেখাও যে, গড় পয়েন্টিং ভেক্টরের মান $\\vec{S}_{av} = (2.66 \\times 10^{-3} E_{rms}^2)\\hat{k}",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 2,
    "topicNumber": 1,
    "code": "২",
    "title": "চৌম্বকীয় স্থিতিবিদ্যার উপাদান",
    "lectures": {
      "1": [
        "4",
        "1"
      ],
      "2": [
        "5",
        "3"
      ],
      "3": [
        "2",
        "7"
      ],
      "4": [
        "6",
        "8"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "অ্যাম্পিয়ারের বলসূত্র প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "দুটি মাধ্যমের অন্তস্থলে $\\vec{B}$ ও $\\vec{H}$ এর জন্য সীমান্তিক শর্ত প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "দেখাও যে, চৌম্বক আদিক বিভব $\\phi_m = \\frac{\\mu_0}{4\\pi}\\frac{\\vec{m}\\cdot\\vec{r}}{r^3}$; এখানে প্রতীকগুলো প্রচলিত অর্থ বহন করে।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "দেখাও যে, চৌম্বক আবেশ ক্ষেত্র হতে বায়োট স্যাভার্টের সূত্র পাওয়া যায়।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "দেখাও যে, চৌম্বক আবেশ B এর ডাইভারজেন্স শূন্য বা অপসারিতা শূন্য।",
        "aliases": [
          "চৌম্বক আবেশের অপসারিতা শূন্য",
          "divergence B zero"
        ]
      },
      {
        "number": "6",
        "text": "চৌম্বক ভেক্টর বিভব বলতে কী বুঝ? চৌম্বক ভেক্টর বিভবের জন্য ব্যবকলিত সমীকরণ প্রতিপাদন কর। অথবা, চৌম্বক ভেক্টর বিভবের ধারণা দাও এবং ব্যবকলন সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "7",
        "text": "দুটি মাধ্যমের বিভেদ তলে $\\vec{B}$ ভেক্টরের জন্য সীমান্ত শর্ত প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "8",
        "text": "ভেক্টর বিভবের বহুপোল প্রসারণ বর্ণনা কর।",
        "aliases": []
      },
      {
        "number": "9",
        "text": "নিরবচ্ছিন্নতার সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "10",
        "text": "চৌম্বক দ্বিপোল ভ্রামক কী? দেখাও যে, চৌম্বক ভেক্টর বিভব $\\vec{A}(\\vec{r}) = \\frac{\\mu_0}{4\\pi}\\cdot\\frac{\\vec{m}\\times\\vec{r}}{r^3}",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 3,
    "topicNumber": 1,
    "code": "৩.১",
    "title": "ধারাবাহিকতার সমীকরণ",
    "lectures": {
      "1": [
        "1"
      ],
      "2": [
        "2"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "চার্জের সংরক্ষণনীতি লিখ এবং ধারাবাহিকতার সমীকরণ প্রতিপাদন কর। অথবা, ধারাবাহিকতার/অবিচ্ছিন্নতার সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "ম্যাক্সওয়েল কীভাবে অ্যাম্পিয়ারের বর্তনী সূত্রের সঠিকরূপ পরিবর্তন করেন বর্ণনা কর।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 3,
    "topicNumber": 2,
    "code": "৩.২",
    "title": "ম্যাক্সওয়েলের সমীকরণে স্কেলার ও ভেক্টর বিভব",
    "lectures": {
      "1": [
        "2",
        "3"
      ],
      "2": [
        "4",
        "6",
        "1",
        "5"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "ম্যাক্সওয়েলের তড়িৎ চুম্বকীয় ব্যবকলন সমীকরণসমূহ লিখ। এই সমীকরণ সমূহের উৎস গুলো কী কী? অথবা, ম্যাক্সওয়েলের তড়িৎ চুম্বকীয় সমীকরণ গুলো ব্যাখ্যাসহ প্রতিপাদন কর এবং এই সমীকরণ গুলো কোথা থেকে আগত।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "ম্যাক্সওয়েলের তড়িৎ চুম্বকীয়/ব্যবকলন সমীকরণ গুলোর ভৌত তাৎপর্য ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "ম্যাক্সওয়েলের ক্ষেত্র সমীকরণের সমাকলিত রূপ প্রতিপাদন কর এবং ভৌত তাৎপর্য ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "ম্যাক্সওয়েলের ক্ষেত্র সমীকরণকে স্কেলার ও ভেক্টর বিভবের মাধ্যমে প্রকাশ কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "প্রমাণ কর যে, ম্যাক্সওয়েলের তড়িৎ চুম্বকীয় তরঙ্গ শূন্য মাধ্যমে আলোর বেগের সাথে/আলোর বেগে সঞ্চালিত হয়।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "ম্যাক্সওয়েলের ক্ষেত্র সমীকরণ হতে লরেঞ্জের শর্ত প্রতিপাদন করে দেখাও যে, ভেক্টর ও স্কেলার বিভব তরঙ্গ সমীকরণ সিদ্ধ করে।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 3,
    "topicNumber": 3,
    "code": "৩.৩",
    "title": "পয়েন্টিং তত্ত্ব এবং শক্তি ও ভরবেগের নিত্যতা",
    "lectures": {
      "1": [
        "3"
      ],
      "2": [
        "1"
      ],
      "3": [
        "4"
      ],
      "4": [
        "2"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "পয়েন্টিং উপপাদ্য বিবৃত ও প্রমাণ কর। অথবা, তড়িৎ চুম্বকীয় ক্ষেত্রে শক্তির সংরক্ষণ নীতি সম্পর্কিত পয়েন্টিং উপপাদ্য প্রতিষ্ঠা কর। অথবা, U = 1/2(εE² + μH²) রাশিটি প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "দেখাও যে, চৌম্বক আবেশ B এর অপসারিতা শূন্য।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "মুক্ত শক্তির ধারণা ব্যক্ত কর। মুক্ত শক্তি সম্পর্কিত থমসনের তত্ত্ব বর্ণনা ও প্রমাণ কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "নিম্নের টেনসর সমীকরণ প্রতিপাদন কর, $T_{pq} = \\epsilon_0 \\left[E_p E_q - \\frac{1}{2}\\delta_{pq} E^2\\right]",
        "aliases": []
      },
      {
        "number": "5",
        "text": "পয়েন্টিং ভেক্টরের মাত্রা সমীকরণ বের কর। অথবা, পয়েন্টিং ভেক্টরের মাত্রা সমীকরণ প্রতিপাদন করে এর সংজ্ঞা দাও।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "দেখাও যে, ম্যাক্সওয়েলের তড়িৎ চুম্বকীয় তরঙ্গ একটি আড় তরঙ্গ।",
        "aliases": []
      },
      {
        "number": "7",
        "text": "শূন্য স্থানে তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "8",
        "text": "দেখাও যে, শূন্যস্থানে তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ মেনে চলে, $\\nabla^2\\vec{E} = \\frac{1}{c^2}\\frac{\\partial^2\\vec{E}}{\\partial t^2}\\;; \\quad \\nabla^2\\vec{B} = \\frac{1}{c^2}\\frac{\\partial^2\\vec{B}}{\\partial t^2}\\;; \\quad \\nabla^2\\vec{H} = \\frac{1}{c^2}\\frac{\\partial^2\\vec{H}}{\\partial t^2}$",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 4,
    "topicNumber": 1,
    "code": "৪.১",
    "title": "তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ",
    "lectures": {
      "1": [
        "1"
      ],
      "2": [
        "3",
        "4",
        "2"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "ব্রুস্টার কোণের সংজ্ঞা দাও। দেখাও যে, ব্রুস্টার কোণ $\\theta_B = \\tan^{-1}\\left(\\frac{n_2}{n_1}\\right)$; যেখানে, $n_1$ এবং $n_2$ হচ্ছে মাধ্যমের প্রতিসরাঙ্ক।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "1.5 প্রতিসরাঙ্কের কাচের পৃষ্ঠে সাধারণ আলো 45° কোণে আপতিত হলে সমবর্তনের মাত্রা নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "বিকিরণ প্রতিক্রিয়া বলের জন্য আব্রাহাম লরেঞ্জ সূত্র প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "$\\lambda = 3$ দৈর্ঘ্যের সমতল তড়িৎচুম্বকীয় তরঙ্গ তামার উপর আপতিত হলে প্রতিসরণ সহগ বের কর। [তামার পরিবাহিতা $5.6 \\times 10^7\\text{ mhos/m}$]",
        "aliases": []
      },
      {
        "number": "5",
        "text": "দেখাও যে, তড়িৎচুম্বক তরঙ্গ সমীকরণকে $(\\nabla^2 + k^2)\\vec{E} = 0$ রূপে প্রকাশ করা যায়। যেখানে $k = \\frac{2\\pi}{\\lambda}$ = তরঙ্গ ভেক্টর।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "সূর্যের ব্যাসার্ধ $7 \\times 10^8\\text{ m}$। সূর্য হতে নির্গত শক্তির হার $3.8 \\times 10^{26}\\text{ W}$ হলে সূর্যপৃষ্ঠে পয়েন্টিং ভেক্টরের মান নির্ণয় কর।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 4,
    "topicNumber": 2,
    "code": "৪.২",
    "title": "পরিবাহকে E.M তরঙ্গ",
    "lectures": {
      "1": [
        "1",
        "2"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "ভেদন গভীরতার রাশিমালা প্রতিপাদন কর। অথবা, ত্বক গভীরতার রাশিমালা প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "কোনো সুপরিবাহী পদার্থের ($\\sigma = 5.8 \\times 10^7\\ \\Omega^{-1}\\text{m}^{-1}$) জন্য $\\omega = 2\\pi \\times 10^6\\text{ Hz}$ এর ত্বক গভীরতা নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "প্রতিফলন ও প্রতিসরণ সহগের সংজ্ঞা দাও। এদের রাশিমালা প্রতিপাদন কর। দেখাও যে, প্রতিফলন ও প্রতিসরণ সহগের সমষ্টি সর্বদাই এক (১)। অথবা, কোন ডাইইলেকট্রিক তলে তীর্যকভাবে আপতিত প্রতিফলন ও প্রতিসরণ সহগের মান বের কর।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 4,
    "topicNumber": 3,
    "code": "৪.৩",
    "title": "বিচ্ছুরণ",
    "lectures": {
      "1": [
        "1",
        "3",
        "2"
      ],
      "2": [
        "5"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "স্বাভাবিক বিচ্ছুরণ কাকে বলে? স্বাভাবিক বিচ্ছুরণের ক্ষেত্রে কচির সমীকরণ নির্ণয় কর এবং বিচ্ছুরণ ক্ষমতার রাশি প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "স্বাভাবিক বিচ্ছুরণ ও ব্যতিক্রম বিচ্ছুরণ এর মধ্যে পার্থক্য লিখ।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "বিচ্ছুরণ কাকে বলে? গ্যাসীয় মাধ্যমে বিচ্ছুরণ ফর্মুলা প্রতিপাদন কর এবং তা থেকে স্বাভাবিক বিচ্ছুরণের ক্ষেত্রে কচির সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "তড়িৎ চুম্বকীয় তরঙ্গের ভিত্তিতে পূর্ণ অভ্যন্তরীণ প্রতিফলন ব্যাখ্যা কর। অথবা, পূর্ণ অভ্যন্তরীণ প্রতিফলন ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "প্লাজমা কম্পাঙ্কের রাশিমালা প্রতিপাদন কর। অথবা, আয়নিত গ্যাসে (প্লাজমা) সমতলে তড়িৎ চৌম্বক তরঙ্গের সমীকরণ বের কর এবং প্লাজমা কম্পাঙ্কের রাশিমালা নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "সমতল তড়িৎচুম্বকীয় তরঙ্গের গড় শক্তি ঘনত্বের রাশিমালা বের কর।",
        "aliases": []
      },
      {
        "number": "7",
        "text": "দুটি সমান্তরাল পরিবাহী তলের মধ্য দিয়ে তড়িৎচুম্বকীয় তরঙ্গ সঞ্চালনের ক্ষেত্রে কার্যকর তড়িৎ ক্ষেত্রের রাশি নির্ণয় কর এবং দেখাও যে, $\\frac{1}{\\lambda_g^2} + \\frac{1}{\\lambda_c^2} = \\frac{1}{\\lambda_0^2}$ যেখানে প্রতীক গুলো প্রচলিত অর্থ বহন করে।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 5,
    "topicNumber": 1,
    "code": "৫",
    "title": "তরঙ্গ বাহক",
    "lectures": {
      "1": [
        "1",
        "4",
        "2"
      ],
      "2": [
        "5",
        "3",
        "6"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "একটি আয়তকার বাহকের ক্ষেত্রে TE তরঙ্গের সমাধান নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "একটি আয়তকার TM তরঙ্গের সমাধান বের কর তরঙ্গ বাহকের ক্ষেত্রে। অথবা, আয়তকার তরঙ্গবাহকের লম্ব বাহুদ্বয়ের দৈর্ঘ্য যথাক্রমে a ও b। a > b হলে দেখাও যে, TM তরঙ্গের সর্বনিম্ন ছেদক কম্পাঙ্ক TE তরঙ্গের সর্বনিম্ন ছেদক কম্পাঙ্কের চেয়ে (1 + b²/a²)^(1/2) গুণ বড়।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "একটি বিবর অনুনাদের ব্যাখ্যা দাও। ইলেকট্রনিক অনুনাদ বর্তনীর চেয়ে এটা কি কি বিষয়ে শ্রেষ্ঠ?",
        "aliases": []
      },
      {
        "number": "4",
        "text": "আয়তকার তরঙ্গ বাহকের সংজ্ঞা দাও। আয়তকার তরঙ্গ বাহকের ক্ষেত্রে TE তরঙ্গ সমীকরণের সমাধান কর এবং ছেদন কম্পাঙ্ক ও তরঙ্গদৈর্ঘ্যের রাশি নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "তরঙ্গ বাহকে ম্যাক্সওয়েলের তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "আয়তকার তরঙ্গ বাহকের প্রস্থ কত হলে তড়িৎচুম্বকীয় তরঙ্গ চৌম্বক বিকিরণের শক্তি যার শূন্যস্থানে তরঙ্গদৈর্ঘ্য $3\\text{ cm}$, ঐ বাহকের মধ্যদিয়ে আলোর দ্রুতির 95% দ্রুতিতে সঞ্চালিত হবে।",
        "aliases": []
      }
    ]
  },
  {
    "chapterNumber": 6,
    "topicNumber": 1,
    "code": "৬",
    "title": "তড়িৎচৌম্বক",
    "lectures": {
      "1": [
        "3",
        "5",
        "4"
      ],
      "2": [
        "7",
        "6"
      ],
      "3": [
        "1",
        "2",
        "8"
      ]
    },
    "questions": [
      {
        "number": "1",
        "text": "অ্যান্টেনা সজ্জা কী? একটি অ্যান্টেনা সজ্জার কার্যকারীতা আলোচনা কর।",
        "aliases": []
      },
      {
        "number": "2",
        "text": "এন্টেনা সজ্জা বর্ণনা কর।",
        "aliases": []
      },
      {
        "number": "3",
        "text": "গুচ্ছবেগ কী? গুচ্ছবেগ $v_g = \\frac{d\\omega}{dk}$ সমীকরণটি প্রতিপাদন কর।",
        "aliases": []
      },
      {
        "number": "4",
        "text": "একটি তড়িৎ দ্বিপোল কীভাবে বিকিরণ সৃষ্টি করে? ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "5",
        "text": "দেখাও যে, $\\vec{v}$ বেগে গতিশীল চার্জিত কণার জন্য ভেক্টর বিভব $\\vec{A} = \\frac{\\vec{v}}{c^2}V$; যখন V হলো স্থির তড়িৎ বিভব।",
        "aliases": []
      },
      {
        "number": "6",
        "text": "লিনার্ড উইশার্ট বিভবের প্রয়োজনীয়তা ব্যাখ্যা কর।",
        "aliases": []
      },
      {
        "number": "7",
        "text": "গতিশীল বিন্দুচার্জের জন্য মন্দিত বিভবের রাশি প্রতিপাদন কর। অথবা, মন্দিত বিভবের সংজ্ঞা দাও। গতিশীল বিন্দু চার্জের জন্য মন্দিত বিভবের রাশিমালা প্রদান কর।",
        "aliases": []
      },
      {
        "number": "8",
        "text": "সাধারণ ব্যবধান $0.5\\text{ m}$ সহ একটি প্রশস্ত পার্শ্ব এন্টেনা সজ্জার চারটি অর্ধতরঙ্গ এরিয়েল রয়েছে এবং এটা $1\\text{ m}$ তরঙ্গদৈর্ঘ্যে কাজ করে। প্রতিটি উপাদান সমদশায় $0.5\\text{ amp}$ প্রবাহ বহন করে। বিকিরণ ক্ষমতা ও প্রধান লোব এর অর্ধপ্রশস্ততা নির্ণয় কর।",
        "aliases": []
      },
      {
        "number": "9",
        "text": "বিকিরণ রোধের ভৌত তাৎপর্য কী?",
        "aliases": []
      },
      {
        "number": "10",
        "text": "একটি ক্ষুদ্র রৈখিক কারেন্ট উপাদানের জন্য বিকিরণ রোধের মান বাহির কর।",
        "aliases": []
      },
      {
        "number": "11",
        "text": "দেখাও যে, একটি অর্ধতরঙ্গ অ্যান্টেনা কর্তৃক মোট বিকিরণ ক্ষমতা $P_t = 73.2\\, I_{rms}^2$; যেখানে $I_{rms}$ হলো প্রবাহমাত্রার মূল গড় বর্গ মান।",
        "aliases": []
      }
    ]
  }
];

const BENGALI_DIGITS: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
};
const SUBSCRIPTS: Record<string, string> = { "0":"₀", "1":"₁", "2":"₂", "3":"₃", "4":"₄", "5":"₅", "6":"₆", "7":"₇", "8":"₈", "9":"₉" };
const SUPERSCRIPTS: Record<string, string> = { "0":"⁰", "1":"¹", "2":"²", "3":"³", "4":"⁴", "5":"⁵", "6":"⁶", "7":"⁷", "8":"⁸", "9":"⁹", "-":"⁻" };

export function toBengaliDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
}

/** Converts the simple LaTeX used in the question bank into readable symbols for plain-text video titles. */
export function questionTextForTitle(value: string): string {
  return value
    .replace(/\\text\{([^{}]*)\}/g, "$1")
    .replace(/\\vec\{([^{}]*)\}/g, "$1⃗")
    .replace(/\\hat\{([^{}]*)\}/g, "$1̂")
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)")
    .replace(/\\epsilon_0/g, "ε₀").replace(/\\mu_0/g, "μ₀")
    .replace(/\\rho/g, "ρ").replace(/\\nabla/g, "∇").replace(/\\vec\{∇\}/g, "∇⃗")
    .replace(/\\delta/g, "δ").replace(/\\theta/g, "θ")
    .replace(/\\lambda/g, "λ").replace(/\\omega/g, "ω")
    .replace(/\\sigma/g, "σ").replace(/\\pi/g, "π")
    .replace(/\\partial/g, "∂").replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·").replace(/\\rightarrow/g, "→")
    .replace(/\\;/g, " ").replace(/\\,/g, " ")
    .replace(/\^\{(-?\d+)\}/g, (_match, digits: string) => digits.split("").map((digit) => SUPERSCRIPTS[digit] || digit).join(""))
    .replace(/_\{?(\d)\}?/g, (_match, digit: string) => SUBSCRIPTS[digit] || digit)
    .replace(/\$+/g, "")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[।.]+$/, "")
    .trim();
}

/** Enriches only videos explicitly mapped to question numbers in the supplied course question list. */
export function buildClassicalElectrodynamicsLectureTitle(
  chapterNumber: number,
  topicNumber: number,
  lectureNumber: number,
  currentTitle: string
): string {
  const topic = CLASSICAL_ELECTRODYNAMICS_QUESTION_BANK.find(
    (entry) => entry.chapterNumber === chapterNumber && entry.topicNumber === topicNumber
  );
  const questionNumbers = topic?.lectures[lectureNumber];
  if (!topic || !questionNumbers?.length) return currentTitle;

  const details = questionNumbers.map((number) => {
    const question = topic.questions.find((entry) => entry.number === number);
    return question ? `-${toBengaliDigits(number)} (${questionTextForTitle(question.text)})` : null;
  }).filter((value): value is string => Boolean(value));

  const oldQuestionList = currentTitle.match(/প্রশ্ন\s*নং\s*\(([^)]*)\)/)?.[1] || "";
  const extras = oldQuestionList.split(",").map((value) => value.trim()).filter(
    (value) => value && !/^[0-9০-৯]+$/.test(value)
  );
  const prefix = currentTitle.split(" — ")[0] || currentTitle;
  const label = currentTitle.match(/\|\s*([^|]+)$/)?.[1]?.trim();
  const suffix = label ? ` | ${label}` : "";
  const extraSuffix = extras.length ? `, ${extras.join(", ")}` : "";
  return `${prefix} — প্রশ্ন নং ${details.join("; ")}${extraSuffix}${suffix}`;
}

export function getLectureNumbersForQuestion(
  topic: ClassicalElectrodynamicsTopicQuestionSet,
  questionNumber: string
): number[] {
  return Object.entries(topic.lectures)
    .filter(([, questionNumbers]) => questionNumbers.includes(questionNumber))
    .map(([lectureNumber]) => Number(lectureNumber));
}
