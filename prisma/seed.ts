import { PrismaClient, FileFormat } from '@prisma/client';

const prisma = new PrismaClient();

const CURRICULUM = [
  {
    "id": "sub-nuclear-401",
    "code": "PHYS-401",
    "name": "নিউক্লিয়ার পদার্থবিজ্ঞান-২ (Nuclear Physics-2)",
    "department": "Honours 4th Year • Department of Physics",
    "category": "Core Theoretical",
    "icon": "radiation",
    "isSample": false,
    "createdAt": "2026-11-08",
    "description": "সম্পূর্ণ কোর্স ক্রমানুসারে: ডিউটেরণ, দুই নিউক্লিয়ন বিক্ষেপণ, নিউক্লিয় বল, শেল মডেল, যৌথ মডেল, নিউক্লিয় বিক্রিয়া, অপটিক্যাল মডেল, ত্বরক এবং মৌলিক কণিকা।",
    "chapters": [
      {
        "num": 1,
        "title": "অধ্যায়-১: দুই নিউক্লিয়ন ব্যবস্থা : ডিউটেরণ (Deuteron)",
        "desc": "দুই নিউক্লিয়ন ব্যবস্থা : ডিউটেরণ — প্রশ্ন নং ১ থেকে ১৩ পর্যন্ত সম্পূর্ণ সমাধান ও লেকচার।",
        "topics": [
          {
            "num": 1,
            "title": "ডিউটেরণ ব্যবস্থা ও গ্রাউন্ড স্টেট বৈশিষ্ট্য (প্রশ্ন ১–১৩)",
            "desc": "অধ্যায়-১ এর সকল প্রশ্নভিত্তিক ইউটিউব ক্লাস এবং নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (৪,৫,৬,৭,১), (৮,৯,১০,১১,১২,১৩) এবং (২,৩)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪,৫,৬,৭,১) | ডিউটেরণ",
                "url": "https://youtu.be/wr7gF3nR99M",
                "desc": "অধ্যায়-১ (দুই নিউক্লিয়ন ব্যবস্থা : ডিউটেরণ) — প্রশ্ন নং ৪, ৫, ৬, ৭, ১ এর সম্পূর্ণ সমাধান।",
                "popular": true
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৮,৯,১০,১১,১২,১৩) | ডিউটেরণ",
                "url": "https://youtu.be/rUkPUESi6zQ",
                "desc": "অধ্যায়-১ (দুই নিউক্লিয়ন ব্যবস্থা : ডিউটেরণ) — প্রশ্ন নং ৮, ৯, ১০, ১১, ১২, ১৩।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (২,৩) | ডিউটেরণ",
                "url": "https://youtu.be/UVmxVINo5V8",
                "desc": "অধ্যায়-১ (দুই নিউক্লিয়ন ব্যবস্থা : ডিউটেরণ) — প্রশ্ন নং ২ এবং ৩।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 2,
        "title": "অধ্যায়-২: দুই নিউক্লিয়ন ব্যবস্থা : বিক্ষেপণ (Scattering)",
        "desc": "দুই নিউক্লিয়ন ব্যবস্থা : বিক্ষেপণ — প্রশ্ন নং ১ থেকে ৫ পর্যন্ত সম্পূর্ণ সমাধান।",
        "topics": [
          {
            "num": 1,
            "title": "নিউক্লিয়ন-নিউক্লিয়ন বিক্ষেপণ ও দশা স্থানান্তর (প্রশ্ন ১–৫)",
            "desc": "অধ্যায়-২ এর প্রশ্নভিত্তিক লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (২,১,৪,৩) ও (৫)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (২,১,৪,৩) | দুই নিউক্লিয়ন বিক্ষেপণ",
                "url": "https://youtu.be/hTNV-SUz6GE",
                "desc": "অধ্যায়-২ (দুই নিউক্লিয়ন ব্যবস্থা : বিক্ষেপণ) — প্রশ্ন নং ২, ১, ৪, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫) | দুই নিউক্লিয়ন বিক্ষেপণ",
                "url": "https://youtu.be/ZApzScUAhVY",
                "desc": "অধ্যায়-২ (দুই নিউক্লিয়ন ব্যবস্থা : বিক্ষেপণ) — প্রশ্ন নং ৫।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 3,
        "title": "অধ্যায়-৩: নিউক্লিয় বল (Nuclear Force)",
        "desc": "নিউক্লিয় বলের প্রকৃতি, বিনিময় বল ও মেসন তত্ত্ব — প্রশ্ন নং ১ থেকে ৮।",
        "topics": [
          {
            "num": 1,
            "title": "নিউক্লিয় বলের ধর্ম ও ইউকাওয়া মেসন তত্ত্ব (প্রশ্ন ১–৮)",
            "desc": "অধ্যায়-৩ এর প্রশ্নভিত্তিক লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (২,১,৪,৫,৩) এবং (৬,৭,৮)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (২,১,৪,৫,৩) | নিউক্লিয় বল",
                "url": "https://youtu.be/XhqoS_AcJng",
                "desc": "অধ্যায়-৩ (নিউক্লিয় বল) — প্রশ্ন নং ২, ১, ৪, ৫, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৬,৭,৮) | নিউক্লিয় বল",
                "url": "https://youtu.be/0tdkNXg9Xfk",
                "desc": "অধ্যায়-৩ (নিউক্লিয় বল) — প্রশ্ন নং ৬, ৭, ৮।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 4,
        "title": "অধ্যায়-৪: নিউক্লিয়ার শেল মডেল (Nuclear Shell Model)",
        "desc": "ম্যাজিক সংখ্যা, স্পিন-অরবিট কাপলিং ও শেল মডেল — প্রশ্ন নং ১ থেকে ৭।",
        "topics": [
          {
            "num": 1,
            "title": "নিউক্লিয়ার শেল মডেল ও ম্যাজিক নাম্বার (প্রশ্ন ১–৭)",
            "desc": "অধ্যায়-৪ এর প্রশ্নভিত্তিক লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (১,২) এবং (৭,৩,৪,৫,৬)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,২) | নিউক্লিয়ার শেল মডেল",
                "url": "https://youtu.be/4BhPYwocKU0",
                "desc": "অধ্যায়-৪ (নিউক্লিয়ার শেল মডেল) — প্রশ্ন নং ১, ২।",
                "popular": true
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৭,৩,৪,৫,৬) | নিউক্লিয়ার শেল মডেল",
                "url": "https://youtu.be/Xv24aFV2HWA",
                "desc": "অধ্যায়-৪ (নিউক্লিয়ার শেল মডেল) — প্রশ্ন নং ৭, ৩, ৪, ৫, ৬।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 5,
        "title": "অধ্যায়-৫: যৌথ বা সমষ্টিগত মডেল (Collective Model)",
        "desc": "যৌথ বা সমষ্টিগত মডেল — প্রশ্ন নং ১ থেকে ৪।",
        "topics": [
          {
            "num": 1,
            "title": "যৌথ বা সমষ্টিগত নিউক্লিয়ার মডেল (প্রশ্ন ১–৪)",
            "desc": "অধ্যায়-৫ এর প্রশ্নভিত্তিক লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (১,২,৩) এবং (৪)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,২,৩) | যৌথ বা সমষ্টিগত মডেল",
                "url": "https://youtu.be/a1Dij5YCTj4",
                "desc": "অধ্যায়-৫ (যৌথ বা সমষ্টিগত মডেল) — প্রশ্ন নং ১, ২, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৪) | যৌথ বা সমষ্টিগত মডেল",
                "url": "https://youtu.be/z2jrAYcBCSw",
                "desc": "অধ্যায়-৫ (যৌথ বা সমষ্টিগত মডেল) — প্রশ্ন নং ৪।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 6,
        "title": "অধ্যায়-৬: নিউক্লিয় বিক্রিয়া (Nuclear Reactions)",
        "desc": "নিউক্লিয় বিক্রিয়া, Q-সমীকরণ, কম্পাউন্ড নিউক্লিয়াস ও প্রস্থচ্ছেদ — প্রশ্ন নং ১ থেকে ১৫।",
        "topics": [
          {
            "num": 1,
            "title": "নিউক্লিয় বিক্রিয়া ও বোরের যৌগিক নিউক্লিয়াস তত্ত্ব (প্রশ্ন ১–১৫)",
            "desc": "অধ্যায়-৬ এর ৪টি ধারাবাহিক লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং ১ থেকে ১৫ পর্যন্ত ৪টি লেকচারে সম্পন্ন।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,২,৩,৪) | নিউক্লিয় বিক্রিয়া",
                "url": "https://youtu.be/i1ez6OFsrrc",
                "desc": "অধ্যায়-৬ (নিউক্লিয় বিক্রিয়া) — প্রশ্ন নং ১, ২, ৩, ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৬) | নিউক্লিয় বিক্রিয়া",
                "url": "https://youtu.be/TR3Q9GN5gxQ",
                "desc": "অধ্যায়-৬ (নিউক্লিয় বিক্রিয়া) — প্রশ্ন নং ৫, ৬।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৭,৮,৯,১০,১১,১২) | নিউক্লিয় বিক্রিয়া",
                "url": "https://youtu.be/ayaEB40vK0g",
                "desc": "অধ্যায়-৬ (নিউক্লিয় বিক্রিয়া) — প্রশ্ন নং ৭, ৮, ৯, ১০, ১১, ১২।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (১৩,১৪,১৫) | নিউক্লিয় বিক্রিয়া",
                "url": "https://youtu.be/H3OsCmckftk",
                "desc": "অধ্যায়-৬ (নিউক্লিয় বিক্রিয়া) — প্রশ্ন নং ১৩, ১৪, ১৫।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 7,
        "title": "অধ্যায়-৭: আপটিক্যাল মডেল (Optical Model)",
        "desc": "আপটিক্যাল মডেল ও কমপ্লেক্স পটেনশিয়াল — প্রশ্ন নং ১ থেকে ৪।",
        "topics": [
          {
            "num": 1,
            "title": "নিউক্লিয়ার আপটিক্যাল মডেল (প্রশ্ন ৩,৪,১,২)",
            "desc": "অধ্যায়-৭ এর সম্পূর্ণ লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (৩,৪,১,২)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৩,৪,১,২) | আপটিক্যাল মডেল",
                "url": "https://youtu.be/MeOR3fwdGYM",
                "desc": "অধ্যায়-৭ (আপটিক্যাল মডেল) — প্রশ্ন নং ৩, ৪, ১, ২।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 8,
        "title": "অধ্যায়-৮: ত্বরক (Particle Accelerators)",
        "desc": "সাইক্লোট্রন, সিনক্রোসাইক্লোট্রন, বিটাট্রন ও রৈখিক ত্বরক — প্রশ্ন নং ১ থেকে ৭।",
        "topics": [
          {
            "num": 1,
            "title": "কণা ত্বরক যন্ত্রসমূহ (প্রশ্ন ১–৭)",
            "desc": "অধ্যায়-৮ এর প্রশ্নভিত্তিক লেকচার ও নোট।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (১,২,৩,৪,৬) এবং (৫,৭)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,২,৩,৪,৬) | ত্বরক",
                "url": "https://youtu.be/Sdy8HrXEv2A",
                "desc": "অধ্যায়-৮ (ত্বরক) — প্রশ্ন নং ১, ২, ৩, ৪, ৬।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৭) | ত্বরক",
                "url": "https://youtu.be/km8fzM6R1Qo",
                "desc": "অধ্যায়-৮ (ত্বরক) — প্রশ্ন নং ৫, ৭।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 9,
        "title": "অধ্যায়-৯: মৌলিক কণিকা (Elementary Particles)",
        "desc": "মৌলিক কণিকা, সংরক্ষণ সূত্র, কোয়ার্ক মডেল — প্রশ্ন নং ১ থেকে ৭।",
        "topics": [
          {
            "num": 1,
            "title": "মৌলিক কণিকা ও কোয়ার্ক গঠন (প্রশ্ন ১–৭)",
            "desc": "অধ্যায়-৯ এর লেকচার ১, ২ এবং Lec 3 প্রশ্ন নং (৭) নোট।",
            "note": "❤️Complete❤️ — Lec 1 (১,২,৩,৪), Lec 2 (৫,৬), এবং Lec 3 প্রশ্ন নং (৭) স্টাডি নোট।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,২,৩,৪) | মৌলিক কণিকা",
                "url": "https://youtu.be/vk5jm5gk1fw",
                "desc": "অধ্যায়-৯ (মৌলিক কণিকা) — প্রশ্ন নং ১, ২, ৩, ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৬) | মৌলিক কণিকা",
                "url": "https://youtu.be/xmOjnEeaMRU",
                "desc": "অধ্যায়-৯ (মৌলিক কণিকা) — প্রশ্ন নং ৫, ৬। URL: https://youtu.be/xmOjnEeaMRU (Lec 3 প্রশ্ন নং ৭ লিখিত নোটে অন্তর্ভুক্ত)।",
                "popular": false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sub-qm-402",
    "code": "PHYS-402",
    "name": "কোয়ান্টাম মেকানিক্স-2 (Quantum Mechanics-2)",
    "department": "Honours 4th Year • Department of Physics",
    "category": "Quantum & Spectroscopy",
    "icon": "atom",
    "isSample": false,
    "createdAt": "2026-11-08",
    "description": "সম্পূর্ণ কোর্স ক্রমানুসারে: অপারেটর ও ম্যাট্রিক্স, ম্যাট্রিক্স সূত্রায়ন, কৌণিক ভরবেগের তত্ত্ব, সন্নিকর্ষ পদ্ধতি, বিক্ষেপণের তত্ত্ব, অভিন্ন কণা এবং আপেক্ষিক-তত্ত্বীয় তরঙ্গ সমীকরণ।",
    "chapters": [
      {
        "num": 1,
        "title": "প্রথম অধ্যায়: অপারেটর এবং ম্যাট্রিক্স (Operators and Matrices)",
        "desc": "হার্মিশিয়ান ও ইউনিটারি অপারেটর, বিনিময় সম্পর্ক, আইগেনমান — Lec 1 থেকে Lec 9।",
        "topics": [
          {
            "num": 1,
            "title": "অপারেটর এবং ম্যাট্রিক্স (Lec 1 – Lec 9 সম্পূর্ণ)",
            "desc": "প্রশ্ন নং ১ থেকে ১৬ এবং ২০২২ সালের অতিরিক্ত প্রশ্নসমূহ।",
            "note": "নোট: Lec 4 এ ৭নং প্রশ্নের আলাদা প্রমাণ দেয়া আছে; Lec 5 এ আন্তঃবদল ও বিনিময় একই; Lec 9 প্রশ্ন নং (৫) নোট।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (২,৮,১,৯,৪) | অপারেটর এবং ম্যাট্রিক্স",
                "url": "https://youtu.be/z0oY6WZyCXc",
                "desc": "প্রথম অধ্যায় (অপারেটর এবং ম্যাট্রিক্স) — প্রশ্ন নং ২, ৮, ১, ৯, ৪।",
                "popular": true
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৬,৭,১১, extra 2022 সালে এসেছে)",
                "url": "https://youtu.be/GoOBKtv-2RQ",
                "desc": "প্রশ্ন নং ৬, ৭, ১১ এবং extra (২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১২, extra 2022 সালে এসেছে) Cycle-1",
                "url": "https://youtu.be/-nDNxYNXRqg",
                "desc": "প্রশ্ন নং ১২ এবং extra (২০২২ সালে এসেছে) — Cycle-1।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৬,৭,১১) [৭নং প্রশ্নের বিশেষ প্রমাণ]",
                "url": "https://youtu.be/quATN_ucYVU",
                "desc": "৭নং প্রশ্নের জন্য এটা করবে। উপরের lec 2 তে ও আছে কিন্তু ভালো ভাবে আলাদা করে প্রমান করা নাই।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৩) [আন্তঃবদল ও বিনিময় একই]",
                "url": "https://youtu.be/8aZ28zGfESc",
                "desc": "প্রশ্ন নং ৩ — আন্তঃবদল ও বিনিময় একই।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (10,16)",
                "url": "https://youtu.be/YGjRGSgePJ4",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ১০ এবং ১৬।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — প্রশ্ন নং (১৫,extra,১৪)",
                "url": "https://youtu.be/LWEi74Oh6Do",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ১৫, extra, ১৪।",
                "popular": false
              },
              {
                "lec": 8,
                "title": "Lec 8 — প্রশ্ন নং (১৩) [এবং Lec 9 প্রশ্ন নং ৫ নোট]",
                "url": "https://youtu.be/CrcUX1mA1Oo",
                "desc": "প্রশ্ন নং ১৩ (এবং Lec 9 প্রশ্ন নং ৫ লিখিত নোট)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 2,
        "title": "দ্বিতীয় অধ্যায়: কোয়ান্টাম বলবিজ্ঞানের ম্যাট্রিক্স সূত্রায়ন (Matrix Formulation)",
        "desc": "শ্রোডিঙ্গার, হাইজেনবার্গ ও মিথস্ক্রিয়া চিত্র, হিলবার্ট স্পেস ও ব্রা-কেট নোটেশন।",
        "topics": [
          {
            "num": 1,
            "title": "কোয়ান্টাম বলবিজ্ঞানের ম্যাট্রিক্স সূত্রায়ন (Lec 1 – Lec 6)",
            "desc": "দ্বিতীয় অধ্যায়ের সকল প্রশ্ন ও সমাধান।",
            "note": "Lec 4 প্রশ্ন নং (৫,১০) প্রথম অধ্যায়ের ১৩ নং প্রশ্নের অনুরূপ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (২,১৫,৪) | ম্যাট্রিক্স সূত্রায়ন",
                "url": "https://youtu.be/d5kBRoZKP2A",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ২, ১৫, ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১৩,extra,extra) | ম্যাট্রিক্স সূত্রায়ন",
                "url": "https://youtu.be/rUdNlq7FVCA",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১৩ এবং extra প্রশ্নসমূহ।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১৪,১১,১২) | ম্যাট্রিক্স সূত্রায়ন",
                "url": "https://youtu.be/BHXvGknZCd0",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১৪, ১১, ১২।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৫,১০) [১ম অধ্যায়ের ১৩ নং প্রশ্নের অনুরূপ]",
                "url": "https://youtu.be/CrcUX1mA1Oo",
                "desc": "প্রশ্ন নং ৫, ১০ — প্রথম অধ্যায়ের ১৩ নং প্রশ্নের অনুরূপ।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (১,৬,৮) | ম্যাট্রিক্স সূত্রায়ন",
                "url": "https://youtu.be/Zo84mINNkso",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১, ৬, ৮।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (৩,extra,৭,৯) | ম্যাট্রিক্স সূত্রায়ন",
                "url": "https://youtu.be/0zINzREmFHw",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৩, extra, ৭, ৯।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 3,
        "title": "তৃতীয় অধ্যায়: কৌণিক ভরবেগের তত্ত্ব (Theory of Angular Momentum)",
        "desc": "কৌণিক ভরবেগ অপারেটর, ল্যাডার অপারেটর, পাউলি স্পিন ম্যাট্রিক্স ও ক্লেবশ-গরডান সহগ।",
        "topics": [
          {
            "num": 1,
            "title": "কৌণিক ভরবেগের তত্ত্ব (Lec 1 – Lec 8)",
            "desc": "বেসিক ও প্রশ্ন নং ১ থেকে ১৫ পর্যন্ত সম্পূর্ণ সমাধান।",
            "note": "★ Lec 2 (extra, ১২) এই অধ্যায়ের জন্য অনেক গুরুত্বপূর্ণ; Lec 5 এ ৮ ও ৯ একই প্রশ্ন।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — (বেসিক) | কৌণিক ভরবেগের তত্ত্ব",
                "url": "https://youtu.be/akhpTKpQaXQ",
                "desc": "তৃতীয় অধ্যায় — কৌণিক ভরবেগের তত্ত্ব বেসিক আলোচনা।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১২ ও ৯টি extra) [অনেক গুরুত্বপূর্ণ]",
                "url": "https://youtu.be/9RmwZmovlt8",
                "desc": "প্রশ্ন নং (extra,১২,extra) — অনেক গুরুত্বপূর্ণ, এই অধ্যায়ের জন্য।",
                "popular": true
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১,৫,৩(i),৭,৪,৩(ii),extra)",
                "url": "https://youtu.be/ZpTCwYFhaeA",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১, ৫, ৩(i), ৭, ৪, ৩(ii), extra।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (১৪) | কৌণিক ভরবেগ",
                "url": "https://youtu.be/c-dV6yD29oc",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১৪।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৮,৯,১০) [৮ ও ৯ একই প্রশ্ন]",
                "url": "https://youtu.be/6ni4zp4A98I",
                "desc": "প্রশ্ন নং ৮, ৯, ১০ (৮ ও ৯ একই প্রশ্ন)।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (১১,১৩) | কৌণিক ভরবেগ",
                "url": "https://youtu.be/Sbr1F8UU-fY",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১১, ১৩।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — প্রশ্ন নং (২,৬) | কৌণিক ভরবেগ",
                "url": "https://youtu.be/cV4Say6Sdcg",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ২, ৬ (চতুর্থ অধ্যায়ের ৭নং প্রশ্নের অনুরূপ)।",
                "popular": false
              },
              {
                "lec": 8,
                "title": "Lec 8 — প্রশ্ন নং (১৫) | কৌণিক ভরবেগ",
                "url": "https://youtu.be/4B_GazvJvJA",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১৫।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 4,
        "title": "চতুর্থ অধ্যায়: সন্নিকর্ষ পদ্ধতি (Approximation Methods)",
        "desc": "কাল-অনির্ভর ও কাল-নির্ভর বিচলন তত্ত্ব (Perturbation Theory), WKB ও ভ্যারিয়েশনাল পদ্ধতি।",
        "topics": [
          {
            "num": 1,
            "title": "সন্নিকর্ষ পদ্ধতি (Lec 1 – Lec 7)",
            "desc": "প্রশ্ন নং ১ থেকে ১৩ পর্যন্ত সম্পূর্ণ সমাধান।",
            "note": "Lec 6 প্রশ্ন নং (৭) অধ্যায় ৩ এর ৬নং প্রশ্নের অনুরূপ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৮,১০,১২,extra,৯,৩) | সন্নিকর্ষ পদ্ধতি",
                "url": "https://youtu.be/i8hPR0uTJ7s",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৮, ১০, ১২, extra, ৯, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১৩,১) | সন্নিকর্ষ পদ্ধতি",
                "url": "https://youtu.be/Mi_Hd0Kl7zE",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ১৩, ১।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (২) | সন্নিকর্ষ পদ্ধতি",
                "url": "https://youtu.be/XZTOHYfRsOQ",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ২।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (১১) | সন্নিকর্ষ পদ্ধতি",
                "url": "https://youtu.be/5ruul_BBuLo",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ১১।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৪) | সন্নিকর্ষ পদ্ধতি",
                "url": "https://youtu.be/JFG3OQN2FRg",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৪।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (৭) [অধ্যায় ৩ এর ৬নং প্রশ্নের অনুরূপ]",
                "url": "https://youtu.be/cV4Say6Sdcg",
                "desc": "প্রশ্ন নং ৭ — অধ্যায় ৩ এর ৬নং প্রশ্নের অনুরূপ।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — প্রশ্ন নং (৫,extra,৬) | সন্নিকর্ষ পদ্ধতি",
                "url": "https://youtu.be/JKml1lVltdE",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৫, extra, ৬।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 5,
        "title": "পঞ্চম অধ্যায়: বিক্ষেপণের তত্ত্ব (Scattering Theory)",
        "desc": "বর্ন আসন্ন মান (Born Approximation), আংশিক তরঙ্গ বিশ্লেষণ ও বিক্ষেপণ প্রস্থচ্ছেদ।",
        "topics": [
          {
            "num": 1,
            "title": "বিক্ষেপণের তত্ত্ব (Lec 1 – Lec 5)",
            "desc": "প্রশ্ন নং ১ থেকে ৮ পর্যন্ত লেকচারসমূহ।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (২,১), (৩,৪), (৮,৭), এবং (৫,৬)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (২,১) | বিক্ষেপণের তত্ত্ব",
                "url": "https://youtu.be/HzpocXKKAvw",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ২, ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৩,৪) | বিক্ষেপণের তত্ত্ব",
                "url": "https://youtu.be/zLLZtWQR1q8",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৩, ৪।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৮,৭) | বিক্ষেপণের তত্ত্ব",
                "url": "https://youtu.be/HwkAQAUq_-A",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৮, ৭।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৫,৬) | বিক্ষেপণের তত্ত্ব",
                "url": "https://youtu.be/Hcr4b4aJD4c",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৫, ৬।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 6,
        "title": "ষষ্ঠ অধ্যায়: অভিন্ন কণা (Identical Particles)",
        "desc": "প্রতিসম ও অপ্রতিসম তরঙ্গ ফাংশন, স্লেটার ডিটারমিন্যান্ট ও পাউলির বর্জন নীতি।",
        "topics": [
          {
            "num": 1,
            "title": "অভিন্ন কণা (Lec 1 – Lec 4)",
            "desc": "প্রশ্ন নং ১ থেকে ৮ ও extra প্রশ্নসমূহ।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (৪), (৫,৩), (৬), এবং (৮,৭,১,২,extra)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪) | অভিন্ন কণা",
                "url": "https://youtu.be/GmTcXVuxhe8",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৩) | অভিন্ন কণা",
                "url": "https://youtu.be/l4Ywto7ma0o",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৫, ৩।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৬) | অভিন্ন কণা",
                "url": "https://youtu.be/8aZ28zGfESc",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৬।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৮,৭,১,২,extra) | অভিন্ন কণা",
                "url": "https://youtu.be/FU1AHv2iaMo",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৮, ৭, ১, ২, extra।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 7,
        "title": "সপ্তম অধ্যায়: আপেক্ষিক-তত্ত্বীয় তরঙ্গ সমীকরণ (Relativistic Wave Equations)",
        "desc": "ক্লেইন-গর্ডন সমীকরণ, ডিরাকের আপেক্ষিক তরঙ্গ সমীকরণ ও স্পিন-অর্ধেক কণা।",
        "topics": [
          {
            "num": 1,
            "title": "আপেক্ষিক-তত্ত্বীয় তরঙ্গ সমীকরণ (Lec 1 – Lec 4)",
            "desc": "প্রশ্ন নং ১ থেকে ৭ পর্যন্ত সম্পূর্ণ সমাধান।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (৫,১), (২,৪), (৬), এবং (৩,৭)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৫,১) | আপেক্ষিক তরঙ্গ সমীকরণ",
                "url": "https://youtu.be/d-YFbpM_dyE",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৫, ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২,৪) | আপেক্ষিক তরঙ্গ সমীকরণ",
                "url": "https://youtu.be/B7KkWCpp6uc",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ২, ৪।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৬) | আপেক্ষিক তরঙ্গ সমীকরণ",
                "url": "https://youtu.be/2aYmyg4lS5w",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৬।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৩,৭) | আপেক্ষিক তরঙ্গ সমীকরণ",
                "url": "https://youtu.be/YKS3h1MKenA",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৩, ৭।",
                "popular": false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sub-solid-403",
    "code": "PHYS-403",
    "name": "Solid State Physics-2 (কঠিন অবস্থার পদার্থবিজ্ঞান-২)",
    "department": "Honours 4th Year • Department of Physics (D3)",
    "category": "Core Theoretical",
    "icon": "boxes",
    "isSample": false,
    "createdAt": "2026-11-08",
    "description": "★ সলিড ২ একটু কঠিন তাই এখানে প্রতিটি লেকচার এর নোট এ একটু বেশি বাংলা লেখা দিয়েছি যাতে তোমরা সহজে বুঝতে পারো, তোমরা নিজেদের মতো করে একটু বাংলা লেখা কমাতে পারো, কিন্তু ইকুয়েশন যেন ঠিক থাকে ★",
    "chapters": [
      {
        "num": 1,
        "title": "প্রথম অধ্যায়: কঠিন পদার্থের ব্যান্ড তত্ত্ব (Band Theory of Solids)",
        "desc": "ব্লখ উপপাদ্য, ক্রনিক-পেনি মডেল ও ব্যান্ড তত্ত্ব — Lec 1 থেকে Lec 6।",
        "topics": [
          {
            "num": 1,
            "title": "কঠিন পদার্থের ব্যান্ড তত্ত্ব ও ক্রনিক-পেনি মডেল (Lec 1 – Lec 6)",
            "desc": "প্রশ্ন নং ১ থেকে ৮ এবং ক্রনিক পেনি মডেল (২০২২ সালে এসেছে)।",
            "note": "♥ Complete ♥ — ইকুয়েশন যেন ঠিক থাকে!",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১) | কঠিন পদার্থের ব্যান্ড তত্ত্ব",
                "url": "https://youtu.be/YXLfNESTJf4",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২,৪) | কঠিন পদার্থের ব্যান্ড তত্ত্ব",
                "url": "https://youtu.be/21juC5_NLCk",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ২, ৪।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৩,৮) | কঠিন পদার্থের ব্যান্ড তত্ত্ব",
                "url": "https://youtu.be/LrjBJGerfJo",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৩, ৮।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৭,extra,৬) | ব্যান্ড তত্ত্ব",
                "url": "https://youtu.be/D6Hwn5GJ15g",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৭, extra, ৬।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৫) | ব্যান্ড তত্ত্ব",
                "url": "https://youtu.be/jlQcWYbhREw",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৫।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — ক্রনিক পেনি মডেল (২০২২ সালে এসেছে)",
                "url": "https://youtu.be/9jFaddMCFHg",
                "desc": "ক্রনিক পেনি মডেল (২০২২ সালে এসেছে)।",
                "popular": true
              }
            ]
          }
        ]
      },
      {
        "num": 2,
        "title": "দ্বিতীয় অধ্যায়: ফার্মি তল ও ধাতু (Fermi Surface and Metals)",
        "desc": "ফার্মি তল, ধাতু ও ক্লসিয়াস-মসেটি সম্পর্ক — Lec 1 থেকে Lec 7।",
        "topics": [
          {
            "num": 1,
            "title": "ফার্মি তল ও ক্লসিয়াস-মসেটি সম্পর্ক (Lec 1 – Lec 7)",
            "desc": "প্রশ্ন নং ১ থেকে ১০ এবং ক্লসিয়াস মসেটি সম্পর্ক।",
            "note": "♥ Complete ♥ — ২০২২ সালে আসা প্রশ্নসমূহ অন্তর্ভুক্ত।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৯) | ফার্মি তল ও ধাতু",
                "url": "https://youtu.be/bZsYj0l4FOE",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৯।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৭, ২০২২ সালে এসেছে)",
                "url": "https://youtu.be/WwtQdSf1a-w",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৭ (২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৮,৬,৪) | ফার্মি তল ও ধাতু",
                "url": "https://youtu.be/qexl9CMqU4Q",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৮, ৬, ৪।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (২০২২ সালে এসেছে, ১)",
                "url": "https://youtu.be/GhEwLHiVZt0",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১ (২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (১০) | ফার্মি তল ও ধাতু",
                "url": "https://youtu.be/PZ6SS_zk940",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১০।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (২,৫,৩) | ফার্মি তল ও ধাতু",
                "url": "https://youtu.be/hmBVc5I1ZQo",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ২, ৫, ৩।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — ক্লসিয়াস মসেটি সম্পর্ক (২০২২ সালে এসেছে)",
                "url": "https://youtu.be/5oHZaGzg3QU",
                "desc": "ক্লসিয়াস মসেটি সম্পর্ক (২০২২ সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 3,
        "title": "তৃতীয় অধ্যায়: ডাই ইলেকট্রিক ধর্মাবলি (Dielectric Properties)",
        "desc": "মেরুকরণ, ডিবাই সমীকরণ, দ্বিপোল বিরতি ও ডাইইলেকট্রিক ক্ষতি — Lec 1 থেকে Lec 6।",
        "topics": [
          {
            "num": 1,
            "title": "ডাই ইলেকট্রিক ধর্মাবলি ও ডিবাই সমীকরণ (Lec 1 – Lec 6)",
            "desc": "প্রশ্ন নং ১ থেকে ৯ এবং ডিবাই মডেল।",
            "note": "★ 'দ্বিপোল বিরতি ও ডাইইলেকট্রিক ক্ষতি সম্পর্কিত ঘটনা' অথবা 'বিরামকাল/শ্লথন কাল বললে', সমীকরণ (১৮) পর্যন্ত লিখে বিরামকাল পার্ট লিখবে। ★★ আর যদি 'সর্বোচ্চ শক্তি শোষণের ঘটনা বলে' তাহলে সমীকরণ (১৮) পর্যন্ত লিখে সর্বোচ্চ শক্তি শোষণের শর্ত পার্ট লিখবে। ★★★ শুধু যদি ডিবাই মডেল/সমীকরণ বলে তাহলে সমীকরণ (১৮) পর্যন্ত লিখলে হবে।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৫,৪) | ডাই ইলেকট্রিক ধর্মাবলি",
                "url": "https://youtu.be/gR5eiBSPv4I",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৫, ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২,৯,৩) | ডাই ইলেকট্রিক ধর্মাবলি",
                "url": "https://youtu.be/PLgn0ZhZ1VQ",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ২, ৯, ৩।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১) | ডাই ইলেকট্রিক ধর্মাবলি",
                "url": "https://youtu.be/5Hbo5G9vfqY",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৬,৮) | ডাই ইলেকট্রিক ধর্মাবলি",
                "url": "https://youtu.be/8zMYV3RS_DI",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৬, ৮।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৭) | ডাই ইলেকট্রিক ধর্মাবলি",
                "url": "https://youtu.be/8yifPOQY6Eg",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৭।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — ডিবাই মডেল, দ্বিপোল বিরতি ও সর্বোচ্চ শক্তি শোষণ (২০২২)",
                "url": "https://youtu.be/C-6QlSykLgc",
                "desc": "সমীকরণ (১৮) পর্যন্ত ডিবাই মডেল + বিরামকাল/শ্লথন কাল বা সর্বোচ্চ শক্তি শোষণের শর্ত।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 4,
        "title": "চতুর্থ অধ্যায়: অর্ধ পরিবাহী (Semiconductors)",
        "desc": "p-n জাংশন ডিপ্লেশন স্তর, বাহক ঘনত্ব ও টানেল ডায়োড — Lec 1 থেকে Lec 7।",
        "topics": [
          {
            "num": 1,
            "title": "অর্ধ পরিবাহী ও p-n জাংশন / টানেল ডায়োড (Lec 1 – Lec 7)",
            "desc": "প্রশ্ন নং ১ থেকে ১১ এবং টানেল ডায়োডের V-I বৈশিষ্ট্য।",
            "note": "p-n জাংশন ডিপ্লেশন স্তর সৃষ্টি ২০২২ সালে এসেছে (১১নং প্রশ্ন ও ২০২২ সালে এসেছে তবু গুরুত্বপূর্ণ)। Lec 6 প্রশ্ন নং (৪) অধ্যায়-১ এর ১ নং প্রশ্নের অনুরূপ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১১,২, ২০২২ সালে এসেছে) [p-n ডিপ্লেশন স্তর]",
                "url": "https://youtu.be/3Rb09wUqmjs",
                "desc": "p-n জাংশন ডিপ্লেশন স্তর সৃষ্টি ২০২২ সালে এসেছে (১১নং প্রশ্ন ও ২০২২ সালে এসেছে তবু গুরুত্বপূর্ণ)।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১,৬,৯,১০) | অর্ধ পরিবাহী",
                "url": "https://youtu.be/aPQLueDqzqk",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ১, ৬, ৯, ১০।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৮, ২০২২ সালে এসেছে)",
                "url": "https://youtu.be/25F7wFSJt1I",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৮ (২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৫) | অর্ধ পরিবাহী",
                "url": "https://youtu.be/zZ6oa119_iA",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৫।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৩,৭) | অর্ধ পরিবাহী",
                "url": "https://youtu.be/JaqOZVxt16A",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৩, ৭।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (৪) [অধ্যায়-১ এর ১ নং প্রশ্নের অনুরূপ]",
                "url": "https://youtu.be/uz9whQd2Zi0",
                "desc": "প্রশ্ন নং ৪ — অধ্যায়-১ (১ নং প্রশ্নের অনুরূপ)।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — টানেল ডায়োডের V-I বৈশিষ্ট্য (২০২২ সালে এসেছে)",
                "url": "https://youtu.be/qKq81mGgH3g",
                "desc": "টানেল ডায়োডের vi বৈশিষ্ট্য (২০২২ সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 5,
        "title": "পঞ্চম অধ্যায়: অতি পরিবাহীতা (Superconductivity)",
        "desc": "মাইসনার ক্রিয়া, লন্ডন সমীকরণ, BCS তত্ত্ব ও উচ্চ তাপমাত্রা অতিপরিবাহী — Lec 1 থেকে Lec 6।",
        "topics": [
          {
            "num": 1,
            "title": "অতি পরিবাহীতা ও লন্ডন সমীকরণ (Lec 1 – Lec 6)",
            "desc": "প্রশ্ন নং ১ থেকে ৯ এবং লন্ডন সমীকরণ।",
            "note": "♥ Complete ♥ — উচ্চ অতিপরিবাহী ও লন্ডন সমীকরণ (২০২২ সালে এসেছে)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (২, ২০২২ সালে এসেছে, ১) [উচ্চ অতিপরিবাহী]",
                "url": "https://youtu.be/SZjEc1h_IWE",
                "desc": "প্রশ্ন নং ২, ১ (উচ্চ অতিপরিবাহী ২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৭) | অতি পরিবাহীতা",
                "url": "https://youtu.be/AGU71Efr_QE",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৫, ৭।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (২০২২ সালে এসেছে, ৪)",
                "url": "https://youtu.be/OVG-VfrPb-I",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৪ (২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৮,৬) | অতি পরিবাহীতা",
                "url": "https://youtu.be/vWqG5TKyRHg",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৮, ৬।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৯,৩) | অতি পরিবাহীতা",
                "url": "https://youtu.be/C3EkFx-3lWQ",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ৯, ৩।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — লন্ডন সমীকরণ (২০২২ সালে এসেছে)",
                "url": "https://youtu.be/vGuQpL4SPSo",
                "desc": "লন্ডন সমীকরণ (২০২২ সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 6,
        "title": "ষষ্ঠ অধ্যায়: চুম্বকত্ব (Magnetism)",
        "desc": "ডায়া, প্যারা ও ফেরোচুম্বকত্ব, ল্যাঞ্জেভিন তত্ত্ব ও কুরি-ভাইস সূত্র — Lec 1 থেকে Lec 6।",
        "topics": [
          {
            "num": 1,
            "title": "চুম্বকত্ব ও ল্যাঞ্জেভিন ফাংশন (Lec 1 – Lec 6)",
            "desc": "প্রশ্ন নং ১ থেকে ১২।",
            "note": "বিশেষ নির্দেশনা: Lec 4 (প্রশ্ন ৯) — Lec 3 এর প্রথম থেকে (a) পার্ট পর্যন্ত লিখে 'এভাবে স্থায়ী চুম্বক মোমেন্ট সৃষ্টি হয়' লিখবে। Lec 5 (প্রশ্ন ৭) — প্রথম থেকে ল্যাংগেভিন ফাংশন পর্যন্ত লিখে (b) পার্ট শেষ করবে। Lec 6 প্রশ্ন নং (১) নোট।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪) | চুম্বকত্ব",
                "url": "https://youtu.be/mDuNnxAmJ6U",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২০২২ সালে এসেছে, ২,৫,১০,৩,৬)",
                "url": "https://youtu.be/8jhUiqsVQ_o",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ২, ৫, ১০, ৩, ৬ (২০২২ সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (12, 9, 7) | ল্যাংগেভিন তত্ত্ব ও চুম্বক ভ্রামক",
                "url": "https://youtu.be/k4I7joM5Fi8",
                "desc": "প্রশ্ন ১২ (শেষ পর্যন্ত), প্রশ্ন ৯ ((a) পার্ট পর্যন্ত), এবং প্রশ্ন ৭ (ল্যাংগেভিন ফাংশন + (b) পার্ট)।",
                "popular": false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sub-stat-404",
    "code": "PHYS-404",
    "name": "Statistical Mechanics (পরিসংখ্যান বলবিজ্ঞান)",
    "department": "Honours 4th Year • Department of Physics",
    "category": "Quantum & Spectroscopy",
    "icon": "bar-chart-3",
    "isSample": false,
    "createdAt": "2026-11-08",
    "description": "সম্পূর্ণ কোর্স ক্রমানুসারে: পরিসংখ্যানের পরিসর, তাপমাত্রা ও এনট্রপি, গ্যাসের তাপগতিবিদ্যা, কণা পরিসংখ্যান, বোস-আইনস্টাইন ও ফার্মি-ডিরাক বন্টন, পরিবহন ঘটনাবলী ও দশা স্থানান্তর।",
    "chapters": [
      {
        "num": 1,
        "title": "প্রথম অধ্যায়: পদার্থবিজ্ঞানে পারিসাংখ্যানের পরিসর (Scope of Statistics)",
        "desc": "ফেজ স্পেস, এনসেম্বল, শক্তির সমবিভাজন নীতি ও চিরায়ত লিউভিল উপপাদ্য — Lec 1 থেকে Lec 9।",
        "topics": [
          {
            "num": 1,
            "title": "পদার্থবিজ্ঞানে পারিসাংখ্যানের পরিসর (Lec 1 – Lec 9)",
            "desc": "প্রশ্ন নং ১ থেকে ১৪ এবং ২০২২ সালের প্রশ্নসমূহ।",
            "note": "⚡ Lec 2: ২ নং প্রশ্নের সমাধান প্রথম হতে ১৩নং সমীকরণ পর্যন্ত দিতে পারলে খুব ভালো হয় (বেস্ট পদ্ধতি), না পারলে ৭নং সমীকরণের পর থেকে 'p ও p+dp সীমার মধ্যে ম্যাক্সওয়েল বোল্টজম্যান সূত্র হতে জানি' লিখে ৮ নং সমীকরণ হতে লিখবে (২ ও ৩ নং প্রশ্ন সেম)। ⚡",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,৫,৭) | পারিসাংখ্যানের পরিসর",
                "url": "https://youtu.be/ub6CWAVQEyI",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ১, ৫, ৭।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২,৩,৪) [ম্যাক্সওয়েল বোল্টজম্যান বিশেষ নির্দেশনা]",
                "url": "https://youtu.be/eu85JuOjC_I",
                "desc": "প্রশ্ন ২, ৩, ৪ — ১ম হতে ১৩নং সমীকরণ (অথবা ৭নং সমীকরণের পর হতে)।",
                "popular": true
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১১,১২)",
                "url": "https://youtu.be/N20Do26Qo40",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ১১, ১২।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৮,১৩,১০,১৪)",
                "url": "https://youtu.be/uAxy4SQQsbA",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৮, ১৩, ১০, ১৪।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৯)",
                "url": "https://youtu.be/GmTcXVuxhe8",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৯।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (৬)",
                "url": "https://youtu.be/Q3gMrDRG0ug",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৬।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — সর্বনিম্ন h³ আয়তন দখল | বিধেয় সমাবেশ (2022)",
                "url": "https://youtu.be/MkrB8rciNrc",
                "desc": "সর্বনিম্ন h3 আয়তন দখল | দুইটি বিধেয় সমাবেশ একটি বিধেয় সমাবেশ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 8,
                "title": "Lec 8 — শক্তির সমবিভাজন নীতি (2022, extra)",
                "url": "https://youtu.be/U5x7-w1Z2H8",
                "desc": "শক্তির সমবিভাজন নীতি (চিরায়ত পরিসংখ্যান ও গ্যাস তত্ত্বের ভিত্তিতে)।",
                "popular": false
              },
              {
                "lec": 9,
                "title": "Lec 9 — চিরায়ত লিউভিল উপপাদ্য (2022 সালে এসেছে)",
                "url": "https://youtu.be/CcMWCj20nos",
                "desc": "চিরায়ত লিউভিল উপপাদ্য (2022 সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 2,
        "title": "দ্বিতীয় অধ্যায়: তাপমাত্রা ও এনট্রপি (Temperature and Entropy)",
        "desc": "বোল্টজম্যান এনট্রপি সম্পর্ক S = k ln W, হেলমহোজের মুক্তশক্তি — Lec 1 থেকে Lec 8।",
        "topics": [
          {
            "num": 1,
            "title": "তাপমাত্রা, এনট্রপি ও হেলমহোজ মুক্তশক্তি (Lec 1 – Lec 8)",
            "desc": "প্রশ্ন নং ১ থেকে ৯ এবং ২০২২ সালের প্রশ্নসমূহ।",
            "note": "♥ Complete ♥ — আন্তঃবদল অপারেটরের আইগেন মান ±1 এবং হেলমহোজ মুক্তশক্তি অন্তর্ভুক্ত।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১) | তাপমাত্রা ও এনট্রপি",
                "url": "https://youtu.be/qwDz2z76Y3M",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫) | তাপমাত্রা ও এনট্রপি",
                "url": "https://youtu.be/PGlcUxrnkSs",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৫ (৩য় অধ্যায়ের ২নং প্রশ্নের অনুরূপ)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৬) | তাপমাত্রা ও এনট্রপি",
                "url": "https://youtu.be/3p7ZVohbyx4",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৬।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৩) | তাপমাত্রা ও এনট্রপি",
                "url": "https://youtu.be/wnhXLkVHK6A",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৩।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (৮,extra,৪)",
                "url": "https://youtu.be/jDDHLQpCgsQ",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৮, extra, ৪।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (৯,২,৭)",
                "url": "https://youtu.be/976Aua2cabA",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৯, ২, ৭।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — আন্তঃবদল অপারেটরের আইগেন মান ±1 (2022)",
                "url": "https://youtu.be/8aZ28zGfESc",
                "desc": "আন্তঃবদল অপারেটরের আইগেন মান +-1 (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 8,
                "title": "Lec 8 — হেলমহোজের মুক্তশক্তি ও এন্ট্রপির রাশিমালা (2022)",
                "url": "https://youtu.be/h22q2gi8Inc",
                "desc": "হেলমহোজের মুক্তশক্তি ও এন্ট্রপির রাশিমালা (2022 সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 3,
        "title": "তৃতীয় অধ্যায়: গ্যাসের তাপগতিবিদ্যা (Thermodynamics of Gases)",
        "desc": "বিভাজন ফাংশন (Partition Function) ও আদর্শ গ্যাসের তাপগতিবিদ্যা — Lec 1 থেকে Lec 4।",
        "topics": [
          {
            "num": 1,
            "title": "গ্যাসের তাপগতিবিদ্যা ও বিভাজন ফাংশন (Lec 1 – Lec 4)",
            "desc": "প্রশ্ন নং ১, ২, ৪ এবং বিভাজন ফাংশনের গুরুত্ব।",
            "note": "Lec 2 প্রশ্ন নং (২) অধ্যায় ২ এর ৫ নং প্রশ্নের অনুরূপ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১) | গ্যাসের তাপগতিবিদ্যা",
                "url": "https://youtu.be/bvaFsQRhnCs",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২) [অধ্যায় ২ এর ৫ নং প্রশ্নের অনুরূপ]",
                "url": "https://youtu.be/PGlcUxrnkSs",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ২।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৪) | গ্যাসের তাপগতিবিদ্যা",
                "url": "https://youtu.be/K9iL_LAAWdA",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৪।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — বিভাজন ফাংশন ব্যাখ্যা ও গুরুত্ব (2022)",
                "url": "https://youtu.be/w9Ab9kYtiBQ",
                "desc": "বিভাজন ফাংশন ব্যাখ্যা ও গুরুত্ব (2022 সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 4,
        "title": "চতুর্থ অধ্যায়: কণা পারিসাংখ্যান (Particle Statistics)",
        "desc": "প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক, বোসন ও ফার্মিয়ন — Lec 1 থেকে Lec 3।",
        "topics": [
          {
            "num": 1,
            "title": "কণা পারিসাংখ্যান ও তরঙ্গ অপেক্ষক (Lec 1 – Lec 3)",
            "desc": "প্রশ্ন নং ১ থেকে ৬।",
            "note": "♥ Complete ♥ — প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক (2022 সালে এসেছে)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 & 2 — প্রশ্ন নং (৩, ১) প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক (2022)",
                "url": "https://youtu.be/FBJBYtmi9u0",
                "desc": "প্রশ্ন ৩ (2022 সালে এসেছে) ও প্রশ্ন ১ — প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক ব্যাখ্যা কর।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (২,৬,৪,৫) | কণা পারিসাংখ্যান",
                "url": "https://youtu.be/QTZp9f0hbME",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ২, ৬, ৪, ৫।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 5,
        "title": "পঞ্চম অধ্যায়: বোস আইনস্টাইনের বন্টন সূত্র (Bose-Einstein & Fermi-Dirac)",
        "desc": "বোস-আইনস্টাইন বন্টন, ফার্মি-ডিরাক বন্টন, কৃষ্ণবস্তু বিকিরণ ও B-E ঘনীভবন — Lec 1 থেকে Lec 10।",
        "topics": [
          {
            "num": 1,
            "title": "বোস-আইনস্টাইন ও ফার্মি-ডিরাক বন্টন সূত্র (Lec 1 – Lec 10)",
            "desc": "প্রশ্ন নং ১ থেকে ১২ এবং ২০২২ সালের ৪টি বিশেষ প্রশ্ন।",
            "note": "⚡ Lec 1: ৭ ও ১২ নং প্রশ্নের সমাধান প্রথম হতে ৫নং সমীকরণ পর্যন্ত লিখবে (ধাতুর ইলেকট্রন তত্ত্ব/চ্যুতি উৎপাদক); ৪ নং প্রশ্নের সমাধান প্রথম হতে শেষ পর্যন্ত বা ৩নং সমীকরণের পর হতে লিখবে। ⚡",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪,৭,১২) [চ্যুতি উৎপাদক ও ইলেকট্রন তত্ত্ব]",
                "url": "https://youtu.be/dJxZkKV1lIs",
                "desc": "প্রশ্ন ৪, ৭, ১২ — ধাতুর ইলেকট্রন তত্ত্ব ও চ্যুতি উৎপাদক সম্পর্ক।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২) | B-E বন্টন",
                "url": "https://youtu.be/wYPvp_4fEHU",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ২।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১০) | B-E বন্টন",
                "url": "https://youtu.be/DTeONu8qbHI",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ১০।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (১১) | B-E বন্টন",
                "url": "https://youtu.be/T4AlgKoCFCA",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ১১।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (extra,৬,৫,৩,৮)",
                "url": "https://youtu.be/GM0DO8r8FNE",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং extra, ৬, ৫, ৩, ৮।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (১,৯)",
                "url": "https://youtu.be/eHA6sFI-mSk",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ১, ৯।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — ফার্মি ডিরাক বন্টন সূত্র (2022 সালে এসেছে)",
                "url": "https://youtu.be/Ffro-7l8Pvk",
                "desc": "ফার্মি ডিরাক বন্টন সূত্র (2022 সালে এসেছে)।",
                "popular": true
              },
              {
                "lec": 8,
                "title": "Lec 8 — B-E কৃষ্ণবস্তু বিকিরণ, রেলে-জিনস ও ভিনের সূত্র (2022)",
                "url": "https://youtu.be/6DRdmxaPpAY",
                "desc": "B-E কৃষ্ণবস্তু বিকিরণ সূত্র, রেলে জিনস, ভিনের সূত্র (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 9,
                "title": "Lec 9 — B-E গ্যাসের চাপ থেকে চ্যুতি নির্ণয় (2022)",
                "url": "https://youtu.be/UG33_U30t64",
                "desc": "B-E গ্যাসের চাপ থেকে চ্যুতি নির্ণয় (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 10,
                "title": "Lec 10 — B-E ঘণীভবন (2022 সালে এসেছে)",
                "url": "https://youtu.be/qcnBAd2rf5YU",
                "desc": "বোস-আইনস্টাইন (B-E) ঘণীভবন (2022 সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 6,
        "title": "ষষ্ঠ অধ্যায়: পারিসাংখ্যিক তাপগতিবিদ্যার প্রয়োগ (Applications)",
        "desc": "পারিসাংখ্যিক তাপগতিবিদ্যার প্রয়োগ — প্রশ্ন নং ১ থেকে ৪।",
        "topics": [
          {
            "num": 1,
            "title": "পারিসাংখ্যিক তাপগতিবিদ্যার প্রয়োগ (Lec 1 – Lec 4)",
            "desc": "প্রশ্ন নং ১, ২, ৩, ৪।",
            "note": "Lec 2 (প্রশ্ন ২): Lec 1 এর প্রথম থেকে (a) পার্ট পর্যন্ত লিখে 'এভাবে স্থায়ী চুম্বক মোমেন্ট সৃষ্টি হয়' লিখবে। Lec 3 (প্রশ্ন ৪): প্রথম থেকে (a) পার্ট পর্যন্ত লিখবে।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1, 2 & 3 — প্রশ্ন নং (১, ২, ৪) | তাপগতিবিদ্যার প্রয়োগ",
                "url": "https://youtu.be/Ruy165-ub3U",
                "desc": "প্রশ্ন নং ১, ২ ((a) পার্ট পর্যন্ত + স্থায়ী চুম্বক মোমেন্ট), এবং ৪ ((a) পার্ট পর্যন্ত)।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৩) | তাপগতিবিদ্যার প্রয়োগ",
                "url": "https://youtu.be/DEYr7Eu1r1s",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৩।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 7,
        "title": "সপ্তম অধ্যায়: পরিবহন ঘটনাবলী (Transport Phenomena)",
        "desc": "বোল্টজম্যান পরিবহন সমীকরণ, সান্দ্রতা, তাপ পরিবাহিতা ও বোল্টজম্যান H তত্ত্ব — Lec 1 থেকে Lec 5।",
        "topics": [
          {
            "num": 1,
            "title": "পরিবহন ঘটনাবলী ও বোল্টজম্যান H তত্ত্ব (Lec 1 – Lec 5)",
            "desc": "প্রশ্ন নং ১ থেকে ৭, extra important এবং বোল্টজম্যান H তত্ত্ব।",
            "note": "♥ Complete ♥ — Lec 3 (extra) গুরুত্বসহকারে পড়তে হবে।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪) | পরিবহন ঘটনাবলী",
                "url": "https://youtu.be/rjweMioNPJc",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১) | পরিবহন ঘটনাবলী",
                "url": "https://youtu.be/976kyftnmLA",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ১।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (extra) [Important — গুরুত্বসহকারে পড়তে হবে]",
                "url": "https://youtu.be/anP_nCewWtY",
                "desc": "প্রশ্ন নং (extra) important — গুরুত্বসহকারে পড়তে হবে।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (২,৩,৬,৫,৭) | পরিবহন ঘটনাবলী",
                "url": "https://youtu.be/qs41pTZVgW4",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ২, ৩, ৬, ৫, ৭।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — বোল্টজম্যান H তত্ত্ব (২০২২ সালে এসেছে)",
                "url": "https://youtu.be/Q_vT6xqFUSY",
                "desc": "বোল্টজম্যান H তত্ত্ব (২০২২ সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 8,
        "title": "অষ্টম অধ্যায়: দশা স্থানান্তর (Phase Transitions)",
        "desc": "প্রথম ও দ্বিতীয় ক্রমের দশা স্থানান্তর, ক্লাউসিয়াস-ক্ল্যাপিরন ও ল্যান্ডাউ তত্ত্ব — Lec 1 থেকে Lec 4।",
        "topics": [
          {
            "num": 1,
            "title": "দশা স্থানান্তর (Lec 1 – Lec 4 + বিকল্প লেকচার)",
            "desc": "প্রশ্ন নং ১ থেকে ৬ এবং ২০২২ সালের গুরুত্বপূর্ণ প্রশ্ন।",
            "note": "♥ Complete ♥ — Lec 1 এর মূল ও বিকল্প উভয় আনলিস্টেড লিংক দেওয়া হয়েছে।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১) [আনলিস্টেড]",
                "url": "https://youtu.be/bLtnHYi_nT0",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ১ (মূল আনলিস্টেড লিংক)।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 1 (বিকল্প) — প্রশ্ন নং (১) [বিকল্প আনলিস্টেড]",
                "url": "https://youtu.be/uX1GJC82-ls",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ১ (♦ বিকল্প ♦ আনলিস্টেড লিংক)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 2 — প্রশ্ন নং (৪) | দশা স্থানান্তর",
                "url": "https://youtu.be/fBEDk4AVQaw",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ৪।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 3 — প্রশ্ন নং (2022 সালে এসেছে, ৫, extra important)",
                "url": "https://youtu.be/f8xjuWw8hl8",
                "desc": "প্রশ্ন নং ৫ (2022 সালে এসেছে, extra important — গুরুত্বসহকারে পড়তে হবে)।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 4 — প্রশ্ন নং (৬,২,৩) | দশা স্থানান্তর",
                "url": "https://youtu.be/QKPqWWkP4nc",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ৬, ২, ৩।",
                "popular": false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sub-ced-405",
    "code": "PHYS-405",
    "name": "চিরায়ত তড়িৎগতিবিদ্যা (Classical Electrodynamics)",
    "department": "Honours 4th Year • Department of Physics",
    "category": "Core Theoretical",
    "icon": "zap",
    "isSample": false,
    "createdAt": "2026-11-08",
    "description": "সম্পূর্ণ কোর্স ক্রমানুসারে: স্থির তড়িৎ (১.১ তড়িৎ ক্ষেত্র, ১.২ স্কেলার বিভব, ১.৩ পরাবিদ্যুৎ), চৌম্বকীয় স্থিতিবিদ্যা, ম্যাক্সওয়েলের সমীকরণ (৩.১–৩.৩), তড়িৎ চৌম্বক তরঙ্গ (৪.১–৪.৩), তরঙ্গ বাহক ও তাড়িতচৌম্বক বিকিরণ।",
    "chapters": [
      {
        "num": 1,
        "title": "প্রথম অধ্যায়: স্থির তড়িৎ (Electrostatics — ১.১, ১.২, ১.৩)",
        "desc": "১.১ তড়িৎ ক্ষেত্র, ১.২ স্কেলার বিভব, এবং ১.৩ পরাবিদ্যুতে স্থির তড়িৎ ক্ষেত্র।",
        "topics": [
          {
            "num": 1,
            "title": "১.১ {তড়িৎ ক্ষেত্র} (Electric Field)",
            "desc": "প্রশ্ন নং ১ থেকে ৬ পর্যন্ত ৩টি লেকচার।",
            "note": "❤️Complete❤️ — তড়িৎ ক্ষেত্র (প্রশ্ন ১–৬)।",
            "lectures": [
              {
                "lec": 1,
                "title": "১.১ Lec 1 — প্রশ্ন নং (৩) | তড়িৎ ক্ষেত্র",
                "url": "https://youtu.be/7fgTwOXUIA0",
                "desc": "অধ্যায় ১.১ {তড়িৎ ক্ষেত্র} — প্রশ্ন নং ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "১.১ Lec 2 — প্রশ্ন নং (১,২,৫) | তড়িৎ ক্ষেত্র",
                "url": "https://youtu.be/265lsOVn-nA",
                "desc": "অধ্যায় ১.১ {তড়িৎ ক্ষেত্র} — প্রশ্ন নং ১, ২, ৫।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "১.১ Lec 3 — প্রশ্ন নং (৪,৬) | তড়িৎ ক্ষেত্র",
                "url": "https://youtu.be/tfODO4KmG0E",
                "desc": "অধ্যায় ১.১ {তড়িৎ ক্ষেত্র} — প্রশ্ন নং ৪, ৬।",
                "popular": false
              }
            ]
          },
          {
            "num": 2,
            "title": "১.২ {স্কেলার বিভব} (Scalar Potential)",
            "desc": "প্রশ্ন নং ১ থেকে ৫ পর্যন্ত ২টি লেকচার।",
            "note": "❤️Complete❤️ — স্কেলার বিভব (প্রশ্ন ১–৫)।",
            "lectures": [
              {
                "lec": 1,
                "title": "১.২ Lec 1 — প্রশ্ন নং (৫,২,১,৩) | স্কেলার বিভব",
                "url": "https://youtu.be/IuP699QM-h4",
                "desc": "অধ্যায় ১.২ {স্কেলার বিভব} — প্রশ্ন নং ৫, ২, ১, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "১.২ Lec 2 — প্রশ্ন নং (৪) | স্কেলার বিভব",
                "url": "https://youtu.be/s6ftAz9DoCU",
                "desc": "অধ্যায় ১.২ {স্কেলার বিভব} — প্রশ্ন নং ৪ (১.৩ এর ৬নং প্রশ্নের অনুরূপ)।",
                "popular": false
              }
            ]
          },
          {
            "num": 3,
            "title": "১.৩ {পরাবিদ্যুতে স্থির তড়িৎ ক্ষেত্র} (Dielectrics)",
            "desc": "প্রশ্ন নং ১ থেকে ৯ পর্যন্ত ৫টি লেকচার।",
            "note": "Lec 4 প্রশ্ন নং (৬) অধ্যায় ১.২ এর ২নং প্রশ্নের অনুরূপ।",
            "lectures": [
              {
                "lec": 1,
                "title": "১.৩ Lec 1 — প্রশ্ন নং (১,২,৩) | পরাবিদ্যুতে স্থির তড়িৎ ক্ষেত্র",
                "url": "https://youtu.be/U4RorIw7dR0",
                "desc": "অধ্যায় ১.৩ — প্রশ্ন নং ১, ২, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "১.৩ Lec 2 — প্রশ্ন নং (৮) | পরাবিদ্যুৎ",
                "url": "https://youtu.be/08AQOUKEUAA",
                "desc": "অধ্যায় ১.৩ — প্রশ্ন নং ৮।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "১.৩ Lec 3 — প্রশ্ন নং (৪,৫) | পরাবিদ্যুৎ",
                "url": "https://youtu.be/3GNe8GOol1w",
                "desc": "অধ্যায় ১.৩ — প্রশ্ন নং ৪, ৫।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "১.৩ Lec 4 — প্রশ্ন নং (৬) [অধ্যায় ১.২ এর ২নং প্রশ্নের অনুরূপ]",
                "url": "https://youtu.be/s6ftAz9DoCU",
                "desc": "অধ্যায় ১.৩ — প্রশ্ন নং ৬ (অধ্যায় ১.২ এর ২নং প্রশ্নের অনুরূপ)।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "১.৩ Lec 5 — প্রশ্ন নং (৭,৯) | পরাবিদ্যুৎ",
                "url": "https://youtu.be/D8_RtV-FQ6Y",
                "desc": "অধ্যায় ১.৩ — প্রশ্ন নং ৭, ৯।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 2,
        "title": "দ্বিতীয় অধ্যায়: চৌম্বকীয় স্থিতিবিদ্যার উপাদান (Magnetostatics)",
        "desc": "বায়োট-সাভার্ট সূত্র, অ্যাম্পিয়ারের সূত্র ও ভেক্টর বিভব — Lec 1 থেকে Lec 4।",
        "topics": [
          {
            "num": 1,
            "title": "চৌম্বকীয় স্থিতিবিদ্যার উপাদান (Lec 1 – Lec 4)",
            "desc": "প্রশ্ন নং ১ থেকে ৮ এবং extra প্রশ্ন।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (৪,১), (৫,extra,৩), (২,৭), (৬,৮)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪,১) | চৌম্বকীয় স্থিতিবিদ্যা",
                "url": "https://youtu.be/q1gjmeRiil4",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৪, ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,extra,৩) | চৌম্বকীয় স্থিতিবিদ্যা",
                "url": "https://youtu.be/HzjvPqNitZk",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৫, extra, ৩।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (২,৭) | চৌম্বকীয় স্থিতিবিদ্যা",
                "url": "https://youtu.be/tAZr0zQzabA",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ২, ৭।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৬,৮) | চৌম্বকীয় স্থিতিবিদ্যা",
                "url": "https://youtu.be/iT6oKDNAxgM",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৬, ৮।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 3,
        "title": "তৃতীয় অধ্যায়: ম্যাক্সওয়েলের সমীকরণ (Maxwell's Equations — ৩.১, ৩.২, ৩.৩)",
        "desc": "৩.১ ধারাবাহিকতার সমীকরণ, ৩.২ স্কেলার ও ভেক্টর বিভব, এবং ৩.৩ পয়েন্টিং তত্ত্ব।",
        "topics": [
          {
            "num": 1,
            "title": "৩.১ {ধারাবাহিকতার সমীকরণ} (Continuity Equation)",
            "desc": "প্রশ্ন নং ১, ২ ও extra।",
            "note": "❤️Complete❤️ — ধারাবাহিকতার সমীকরণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "৩.১ Lec 1 — প্রশ্ন নং (extra,১) | ধারাবাহিকতার সমীকরণ",
                "url": "https://youtu.be/m-7uv9U4euE",
                "desc": "অধ্যায় ৩.১ — প্রশ্ন নং extra, ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "৩.১ Lec 2 — প্রশ্ন নং (২) | ধারাবাহিকতার সমীকরণ",
                "url": "https://youtu.be/nXarkfiCYAM",
                "desc": "অধ্যায় ৩.১ — প্রশ্ন নং ২।",
                "popular": false
              }
            ]
          },
          {
            "num": 2,
            "title": "৩.২ {ম্যাক্সওয়েলের সমীকরণে স্কেলার ও ভেক্টর বিভব}",
            "desc": "প্রশ্ন নং ১ থেকে ৬।",
            "note": "❤️Complete❤️ — লরেন্জ ও কুলম্ব গেজ রূপান্তর।",
            "lectures": [
              {
                "lec": 1,
                "title": "৩.২ Lec 1 — প্রশ্ন নং (২,৩) | স্কেলার ও ভেক্টর বিভব",
                "url": "https://youtu.be/Zs6KM0Q6Ofs",
                "desc": "অধ্যায় ৩.২ — প্রশ্ন নং ২, ৩।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "৩.২ Lec 2 — প্রশ্ন নং (৪,৬,১,৫) | স্কেলার ও ভেক্টর বিভব",
                "url": "https://youtu.be/MMhhUEA_q3U",
                "desc": "অধ্যায় ৩.২ — প্রশ্ন নং ৪, ৬, ১, ৫।",
                "popular": false
              }
            ]
          },
          {
            "num": 3,
            "title": "৩.৩ {পয়েন্টিং তত্ত্ব এবং শক্তি ও ভরবেগ নিত্যতা}",
            "desc": "প্রশ্ন নং ১ থেকে ৪ ও extra।",
            "note": "Lec 4 প্রশ্ন নং (2) অধ্যায়-২ এর ৫নং প্রশ্নের অনুরূপ।",
            "lectures": [
              {
                "lec": 1,
                "title": "৩.৩ Lec 1 — প্রশ্ন নং (৩,extra) | পয়েন্টিং তত্ত্ব",
                "url": "https://youtu.be/Cdh6wqaHEck",
                "desc": "অধ্যায় ৩.৩ — প্রশ্ন নং ৩, extra।",
                "popular": true
              },
              {
                "lec": 2,
                "title": "৩.৩ Lec 2 — প্রশ্ন নং (১) | পয়েন্টিং তত্ত্ব",
                "url": "https://youtu.be/BMk9ymmYq1M",
                "desc": "অধ্যায় ৩.৩ — প্রশ্ন নং ১।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "৩.৩ Lec 3 — প্রশ্ন নং (৪,extra) | পয়েন্টিং তত্ত্ব",
                "url": "https://youtu.be/cHu1TnncdiE",
                "desc": "অধ্যায় ৩.৩ — প্রশ্ন নং ৪, extra।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "৩.৩ Lec 4 — প্রশ্ন নং (2) [অধ্যায়-২ এর ৫নং প্রশ্নের অনুরূপ]",
                "url": "https://youtu.be/HzjvPqNitZk",
                "desc": "অধ্যায় ৩.৩ — প্রশ্ন নং ২ (অধ্যায়-২ এর ৫নং প্রশ্নের অনুরূপ)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 4,
        "title": "চতুর্থ অধ্যায়: তড়িৎ চৌম্বক তরঙ্গ (Electromagnetic Waves — ৪.১, ৪.২, ৪.৩)",
        "desc": "৪.১ তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ, ৪.২ পরিবাহক E.M তরঙ্গ, এবং ৪.৩ বিচ্ছুরণ।",
        "topics": [
          {
            "num": 1,
            "title": "৪.১ {তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ}",
            "desc": "প্রশ্ন নং ১ থেকে ৪ ও extra।",
            "note": "❤️Complete❤️ — তড়িৎ চুম্বকীয় তরঙ্গ সমীকরণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "৪.১ Lec 1 — প্রশ্ন নং (extra,১) | তরঙ্গ সমীকরণ",
                "url": "https://youtu.be/y6dE-wRaQ8M",
                "desc": "অধ্যায় ৪.১ — প্রশ্ন নং extra, ১।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "৪.১ Lec 2 — প্রশ্ন নং (৩,extra,৪,২) | তরঙ্গ সমীকরণ",
                "url": "https://youtu.be/NwHmySBHh4Y",
                "desc": "অধ্যায় ৪.১ — প্রশ্ন নং ৩, extra, ৪, ২।",
                "popular": false
              }
            ]
          },
          {
            "num": 2,
            "title": "৪.২ {পরিবাহক E.M তরঙ্গ}",
            "desc": "প্রশ্ন নং ১, ২।",
            "note": "❤️Complete❤️ — পরিবাহী মাধ্যমে তড়িৎ চৌম্বক তরঙ্গ ও স্কিন ডেপথ।",
            "lectures": [
              {
                "lec": 1,
                "title": "৪.২ Lec 1 — প্রশ্ন নং (১,২) | পরিবাহক E.M তরঙ্গ",
                "url": "https://youtu.be/MjUJua8ECX8",
                "desc": "অধ্যায় ৪.২ — প্রশ্ন নং ১, ২।",
                "popular": false
              }
            ]
          },
          {
            "num": 3,
            "title": "৪.৩ {বিচ্ছুরণ} (Dispersion)",
            "desc": "প্রশ্ন নং ১, ২, ৩, ৫।",
            "note": "❤️Complete❤️ — স্বাভাবিক ও ব্যতিক্রমী বিচ্ছুরণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "৪.৩ Lec 1 — প্রশ্ন নং (১,৩,২) | বিচ্ছুরণ",
                "url": "https://youtu.be/DuZImTex3KQ",
                "desc": "অধ্যায় ৪.৩ — প্রশ্ন নং ১, ৩, ২।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "৪.৩ Lec 2 — প্রশ্ন নং (৫) | বিচ্ছুরণ",
                "url": "https://youtu.be/QKlErHDTfyA",
                "desc": "অধ্যায় ৪.৩ — প্রশ্ন নং ৫।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 5,
        "title": "পঞ্চম অধ্যায়: তরঙ্গ বাহক (Waveguides)",
        "desc": "আয়তাকার তরঙ্গ বাহক, TE ও TM মোড এবং কাট-অফ কম্পাঙ্ক — Lec 1 ও Lec 2।",
        "topics": [
          {
            "num": 1,
            "title": "তরঙ্গ বাহক (Waveguides — প্রশ্ন ১–৬)",
            "desc": "প্রশ্ন নং ১ থেকে ৬ পর্যন্ত ২টি লেকচার।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (১,৪,২) এবং (৫,৩,৬)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,৪,২) | তরঙ্গ বাহক",
                "url": "https://youtu.be/BJHdpxIG-FI",
                "desc": "পঞ্চম অধ্যায় (তরঙ্গ বাহক) — প্রশ্ন নং ১, ৪, ২।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৩,৬) | তরঙ্গ বাহক",
                "url": "https://youtu.be/YTHY41jqXFI",
                "desc": "পঞ্চম অধ্যায় (তরঙ্গ বাহক) — প্রশ্ন নং ৫, ৩, ৬।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 6,
        "title": "ষষ্ঠ অধ্যায়: তাড়িতচৌম্বক বিকিরণ (Electromagnetic Radiation)",
        "desc": "বিলম্বিত বিভব, দ্বিপোল বিকিরণ ও লার্মর সূত্র — Lec 1 থেকে Lec 3।",
        "topics": [
          {
            "num": 1,
            "title": "তাড়িতচৌম্বক বিকিরণ (প্রশ্ন ১–৮)",
            "desc": "প্রশ্ন নং ১ থেকে ৮ পর্যন্ত ৩টি লেকচার।",
            "note": "❤️Complete❤️ — প্রশ্ন নং (৩,৫,৪), (৭,৬), এবং (১,২,৮)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৩,৫,৪) | তাড়িতচৌম্বক",
                "url": "https://youtu.be/KHgebPXdv80",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৩, ৫, ৪।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৭,৬) | তাড়িতচৌম্বক",
                "url": "https://youtu.be/xhtq0tEg6tk",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৭, ৬।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১,২,৮) | তাড়িতচৌম্বক",
                "url": "https://youtu.be/t4eQ6Il4jnI",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ১, ২, ৮।",
                "popular": false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "sub-elec-406",
    "code": "PHYS-406",
    "name": "Electronics-2 (ইলেকট্রনিক্স-২)",
    "department": "Honours 4th Year • Department of Physics",
    "category": "Applied & Electronics",
    "icon": "cpu",
    "isSample": false,
    "createdAt": "2026-11-08",
    "description": "সম্পূর্ণ কোর্স ক্রমানুসারে (অধ্যায় ১–১১): ক্ষমতা বিবর্ধক, স্পন্দক সার্কিট, FET, SCR ও TRIAC, পরিমাপ ডিভাইস, ডিজিটাল ইলেকট্রনিক্স, ডিজিটাল লজিক সার্কিট, রেডিও নীতি, IC ফেব্রিকেশন, টেলিভিশন ও রাডার।",
    "chapters": [
      {
        "num": 1,
        "title": "প্রথম অধ্যায়: ক্ষমতা বিবর্ধক (Power Amplifiers)",
        "desc": "Class A, B, AB, Push-Pull ও ট্রান্সফরমার কাপলড পাওয়ার অ্যামপ্লিফায়ার — Lec 1 থেকে Lec 4।",
        "topics": [
          {
            "num": 1,
            "title": "ক্ষমতা বিবর্ধক (Lec 1 – Lec 4 + বিকল্প)",
            "desc": "প্রশ্ন নং ১ থেকে ৮ এবং ২০২২ সালের প্রশ্নসমূহ।",
            "note": "❤️ Complete ❤️ — Lec 2 এর মূল (বেস্ট) ও বিকল্প উভয় লিংক যুক্ত করা হয়েছে।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪,৭, 2022 সালে এসেছে) | ক্ষমতা বিবর্ধক",
                "url": "https://youtu.be/FcezqosNm-U",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ৪, ৭ (2022 সালে এসেছে)।",
                "popular": true
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (2022 সালে এসেছে, ৬) [এটা বেস্ট]",
                "url": "https://youtu.be/QxhTJ4ZyGZg",
                "desc": "প্রশ্ন নং ৬ (2022 সালে এসেছে) — এটা বেস্ট পদ্ধতি।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 2 (বিকল্প) — প্রশ্ন নং (2022 সালে এসেছে)",
                "url": "https://youtu.be/0sNY6f8t-Bs",
                "desc": "♦ বিকল্প ♦ উপরের টা বেস্ট বাট এটা করলেও সমস্যা নেই।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 3 — প্রশ্ন নং (১,৫,৮,২,৩) | ক্ষমতা বিবর্ধক",
                "url": "https://youtu.be/bynXB5v0smg",
                "desc": "প্রথম অধ্যায় — প্রশ্ন নং ১, ৫, ৮, ২, ৩।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 4 — ট্রান্সফরমার A শ্রেণীর কার্যপদ্ধতি ও রূপান্তর দক্ষতা (2022)",
                "url": "https://youtu.be/Y6ieU97W3-A",
                "desc": "ট্রান্সফরমার A শ্রেণীর কার্যপদ্ধতি, রূপান্তর দক্ষতা, লোড ইম্পিডেন্স (2022 সালে এসেছে)।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 2,
        "title": "দ্বিতীয় অধ্যায়: স্পন্দক সার্কিট (Oscillator Circuits)",
        "desc": "বার্কহাউসেন শর্ত, হার্টলি, কলপিটস, ফেজ-শিফট ও ভিন ব্রিজ স্পন্দক — Lec 1 থেকে Lec 6।",
        "topics": [
          {
            "num": 1,
            "title": "স্পন্দক সার্কিট (Lec 1 – Lec 6)",
            "desc": "প্রশ্ন নং ১ থেকে ১১ এবং ২০২২ সালের প্রশ্ন।",
            "note": "❤️ Complete ❤️ — প্রশ্ন নং ৪ (2022 সালে এসেছে তবুও গুরুত্বপূর্ণ)।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৭,৮) | স্পন্দক সার্কিট",
                "url": "https://youtu.be/jixkJKweA-4",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ৭, ৮।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৪) [2022 সালে এসেছে তবুও গুরুত্বপূর্ণ]",
                "url": "https://youtu.be/pX_ER35jZLc",
                "desc": "প্রশ্ন নং ৪ — এটা 2022 সালে এসেছে তবুও গুরুত্বপূর্ণ।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (১০,৯,৩) | স্পন্দক সার্কিট",
                "url": "https://youtu.be/UCLt1DhW_nY",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১০, ৯, ৩।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (১,৬,৫,১১) | স্পন্দক সার্কিট",
                "url": "https://youtu.be/_MxR4NtUIdk",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ১, ৬, ৫, ১১।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (2) | স্পন্দক সার্কিট",
                "url": "https://youtu.be/_rUbRs3HT0g",
                "desc": "দ্বিতীয় অধ্যায় — প্রশ্ন নং ২।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (2022 সালে এসেছে) | স্পন্দক সার্কিট",
                "url": "https://youtu.be/fBE7Skww7ws",
                "desc": "দ্বিতীয় অধ্যায় — ২০২২ সালে আসা প্রশ্ন।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 3,
        "title": "তৃতীয় অধ্যায়: ফিল্ড ইফেক্ট ট্রানজিস্টার (FET & MOSFET)",
        "desc": "JFET এবং MOSFET এর গঠন, কার্যপ্রণালী ও বৈশিষ্ট্য রেখা — Lec 1 থেকে Lec 5।",
        "topics": [
          {
            "num": 1,
            "title": "ফিল্ড ইফেক্ট ট্রানজিস্টার (Lec 1 – Lec 5)",
            "desc": "প্রশ্ন নং ১ থেকে ১২।",
            "note": "❤️ Complete ❤️ — প্রশ্ন নং ১ থেকে ১২ সম্পূর্ণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,৫) | ফিল্ড ইফেক্ট ট্রানজিস্টার",
                "url": "https://youtu.be/Mka4alNQED8",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১, ৫।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (2022 সালে এসেছে, ৪,৭) | FET",
                "url": "https://youtu.be/Q0J7raVJC_M",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৪, ৭ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৮,৬, 2022 সালে এসেছে) | FET",
                "url": "https://youtu.be/VaWfj5PalRU",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৮, ৬ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৯,১১,১০) | FET",
                "url": "https://youtu.be/mUZnY103ZwI",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ৯, ১১, ১০।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (১২,২,৩) | FET",
                "url": "https://youtu.be/_5RapXVmfHA",
                "desc": "তৃতীয় অধ্যায় — প্রশ্ন নং ১২, ২, ৩।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 4,
        "title": "চতুর্থ অধ্যায়: SCR ও TRIAC",
        "desc": "সিলিকন কন্ট্রোল্ড রেকটিফায়ার (SCR), TRIAC ও DIAC — Lec 1 থেকে Lec 4।",
        "topics": [
          {
            "num": 1,
            "title": "SCR ও TRIAC (Lec 1 – Lec 4)",
            "desc": "প্রশ্ন নং ১ থেকে ১০ (৫ ও ৬ একই প্রশ্ন)।",
            "note": "❤️ Complete ❤️ — প্রশ্ন নং ৫ ও ৬ একই প্রশ্ন।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৩,২) | SCR ও TRIAC",
                "url": "https://youtu.be/Jyr1rk7-nNY",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৩, ২।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১,৪) | SCR ও TRIAC",
                "url": "https://youtu.be/qnntGSpEUv0",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ১, ৪।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৭,৫,৬,৮) [৫ ও ৬ একই প্রশ্ন]",
                "url": "https://youtu.be/GtC4Chg7OJM",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৭, ৫, ৬, ৮।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৯,১০) | SCR ও TRIAC",
                "url": "https://youtu.be/ZkzCBPR4Yyg",
                "desc": "চতুর্থ অধ্যায় — প্রশ্ন নং ৯, ১০।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 5,
        "title": "পঞ্চম অধ্যায়: পরিমাপের ইলেকট্রনিক্স ডিভাইস (Measuring Instruments)",
        "desc": "ইলেকট্রনিক ভোল্টমিটার, VTVM ও ক্যাথোড রে অসিলোস্কোপ (CRO) — Lec 1 ও Lec 2।",
        "topics": [
          {
            "num": 1,
            "title": "পরিমাপের ইলেকট্রনিক্স ডিভাইস (Lec 1 – Lec 2)",
            "desc": "প্রশ্ন নং ১ থেকে ৪ এবং ২০২২ সালের প্রশ্ন।",
            "note": "❤️ Complete ❤️ — পরিমাপের ইলেকট্রনিক্স ডিভাইস।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (2022 সালে এসেছে, ২) | পরিমাপ ডিভাইস",
                "url": "https://youtu.be/y0VJNRtrapo",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ২ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (১,৩,৪) | পরিমাপ ডিভাইস",
                "url": "https://youtu.be/baQOKEJdEu4",
                "desc": "পঞ্চম অধ্যায় — প্রশ্ন নং ১, ৩, ৪।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 6,
        "title": "ষষ্ঠ অধ্যায়: ডিজিটাল ইলেকট্রনিক্স সম্পর্কে ধারণা (Digital Concepts)",
        "desc": "সংখ্যা পদ্ধতির রূপান্তর, বাইনারি গাণিতিক অপারেশন ও কোড — Lec 1 থেকে Lec 4।",
        "topics": [
          {
            "num": 1,
            "title": "ডিজিটাল ইলেকট্রনিক্স ও সংখ্যা পদ্ধতি (Lec 1 – Lec 4)",
            "desc": "বিভিন্ন সংখ্যা পদ্ধতির রূপান্তর এবং প্রশ্ন নং ১ থেকে ১১।",
            "note": "❤️ Complete ❤️ — Basic সংখ্যা পদ্ধতির রূপান্তর সহ সম্পূর্ণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — Basic {বিভিন্ন সংখ্যা পদ্ধতির রূপান্তর}",
                "url": "https://youtu.be/bojJGdCL5B8",
                "desc": "ষষ্ঠ অধ্যায় — বিভিন্ন সংখ্যা পদ্ধতির রূপান্তর (Basic)।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৫,৬,৭,৮) | ডিজিটাল ইলেকট্রনিক্স",
                "url": "https://youtu.be/eJekCZN_sJg",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৫, ৬, ৭, ৮।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৯,১০) | ডিজিটাল ইলেকট্রনিক্স",
                "url": "https://youtu.be/9CF-7wb_8lw",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ৯, ১০।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (১,২,৩,৪,১১) | ডিজিটাল ইলেকট্রনিক্স",
                "url": "https://youtu.be/N7y52gM2S4k",
                "desc": "ষষ্ঠ অধ্যায় — প্রশ্ন নং ১, ২, ৩, ৪, ১১।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 7,
        "title": "সপ্তম অধ্যায়: ডিজিটাল লজিক সার্কিট (Digital Logic Circuits)",
        "desc": "বুলিয়ান অ্যালজেবরা, ডি-মরগান উপপাদ্য, লজিক গেইট ও NAND/NOR সার্বজনীনতা — Lec 1 থেকে Lec 7।",
        "topics": [
          {
            "num": 1,
            "title": "ডিজিটাল লজিক সার্কিট ও সার্বজনীন গেইট (Lec 1 – Lec 7)",
            "desc": "প্রশ্ন নং ১ থেকে ১৫ এবং NAND/NOR গেইটের সার্বজনীনতা।",
            "note": "❤️ Complete ❤️ — ৭টি লেকচারে সম্পূর্ণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৩,৪,৮) | ডিজিটাল লজিক সার্কিট",
                "url": "https://youtu.be/C2i36GJKdYw",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৩, ৪, ৮।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (6 + extra) | ডিজিটাল লজিক সার্কিট",
                "url": "https://youtu.be/8X16nClZG7A",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৬ + extra।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (2022 সালে এসেছে, ৯)",
                "url": "https://youtu.be/vUwSr2Hr-tc",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৯ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (২,৭,১৪) | ডিজিটাল লজিক সার্কিট",
                "url": "https://youtu.be/OXwbKDy_vzA",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ২, ৭, ১৪।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (১০,১১,১২,১৩) | লজিক সার্কিট",
                "url": "https://youtu.be/T1gOMZLDY3g",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ১০, ১১, ১২, ১৩।",
                "popular": false
              },
              {
                "lec": 6,
                "title": "Lec 6 — প্রশ্ন নং (৫,১,১৫) | লজিক সার্কিট",
                "url": "https://youtu.be/iUUf6kZFv5k",
                "desc": "সপ্তম অধ্যায় — প্রশ্ন নং ৫, ১, ১৫।",
                "popular": false
              },
              {
                "lec": 7,
                "title": "Lec 7 — NAND ও NOR গেইটের সার্বজনীনতা",
                "url": "https://youtu.be/K91OeAaeTo4",
                "desc": "সপ্তম অধ্যায় — NAND ও NOR গেইটের সার্বজনীনতা প্রমাণ।",
                "popular": true
              }
            ]
          }
        ]
      },
      {
        "num": 8,
        "title": "অষ্টম অধ্যায়: রেডিও নীতি (Principles of Radio)",
        "desc": "AM ও FM মডুলেশন, ডিমডুলেশন ও সুপারহেটারোডাইন রিসিভার — Lec 1 থেকে Lec 5।",
        "topics": [
          {
            "num": 1,
            "title": "রেডিও নীতি (Lec 1 – Lec 5)",
            "desc": "প্রশ্ন নং ১ থেকে ১১ এবং ২০২২ সালের প্রশ্নসমূহ।",
            "note": "❤️ Complete ❤️ — রেডিও নীতি সম্পূর্ণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (৪,৬) | রেডিও নীতি",
                "url": "https://youtu.be/7cbBBe5P-4E",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ৪, ৬।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (2022 সালে এসেছে, ৩,১১) | রেডিও নীতি",
                "url": "https://youtu.be/4At6jwff1jE",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ৩, ১১ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (2022 সালে এসেছে, ৭) | রেডিও নীতি",
                "url": "https://youtu.be/A0MLlMDKxa0",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ৭ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 4,
                "title": "Lec 4 — প্রশ্ন নং (৮,৯,১০) | রেডিও নীতি",
                "url": "https://youtu.be/z6-3TQUZ__U",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ৮, ৯, ১০।",
                "popular": false
              },
              {
                "lec": 5,
                "title": "Lec 5 — প্রশ্ন নং (২,১,৫) | রেডিও নীতি",
                "url": "https://youtu.be/iwQ3z-aeHOA",
                "desc": "অষ্টম অধ্যায় — প্রশ্ন নং ২, ১, ৫।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 9,
        "title": "নবম অধ্যায়: IC ফেব্রিকেশন কৌশল (IC Fabrication Techniques)",
        "desc": "মনোলিথিক IC তৈরি, এপিট্যাক্সিয়াল গ্রোথ, ফটোলিথোগ্রাফি — Lec 1 ও Lec 2।",
        "topics": [
          {
            "num": 1,
            "title": "IC ফেব্রিকেশন কৌশল (Lec 1 – Lec 2)",
            "desc": "প্রশ্ন নং ১, ২, ৩।",
            "note": "❤️ Complete ❤️ — IC ফেব্রিকেশন কৌশল।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১,২) | IC ফেব্রিকেশন কৌশল",
                "url": "https://youtu.be/WdC9Wg1__CI",
                "desc": "নবম অধ্যায় — প্রশ্ন নং ১, ২।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (৩) | IC ফেব্রিকেশন কৌশল",
                "url": "https://youtu.be/i1kiD-3Jz2E",
                "desc": "নবম অধ্যায় — প্রশ্ন নং ৩।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 10,
        "title": "দশম অধ্যায়: টেলিভিশন (Television)",
        "desc": "টেলিভিশন ক্যামেরা টিউব, স্ক্যানিং ও রিসিভার ব্লক ডায়াগ্রাম — Lec 1 ও Lec 2।",
        "topics": [
          {
            "num": 1,
            "title": "টেলিভিশন (Lec 1 – Lec 2)",
            "desc": "প্রশ্ন নং ১, ২, ৩ এবং ২০২২ সালের প্রশ্ন।",
            "note": "❤️ Complete ❤️ — টেলিভিশন অধ্যায়।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১, 2022 সালে এসেছে) | টেলিভিশন",
                "url": "https://youtu.be/9W4dFxuONQc",
                "desc": "দশম অধ্যায় — প্রশ্ন নং ১ (2022 সালে এসেছে)।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২,৩) | টেলিভিশন",
                "url": "https://youtu.be/AnVP6Io8rEg",
                "desc": "দশম অধ্যায় — প্রশ্ন নং ২, ৩।",
                "popular": false
              }
            ]
          }
        ]
      },
      {
        "num": 11,
        "title": "একাদশ অধ্যায়: রাডার (Radar)",
        "desc": "রাডার রেঞ্জ সমীকরণ, পালস ও ডপলার রাডার সিস্টেম — Lec 1 থেকে Lec 3।",
        "topics": [
          {
            "num": 1,
            "title": "রাডার (Lec 1 – Lec 3)",
            "desc": "প্রশ্ন নং ১ থেকে ৬ ও extra।",
            "note": "❤️ Complete ❤️ — রাডার অধ্যায় সম্পূর্ণ।",
            "lectures": [
              {
                "lec": 1,
                "title": "Lec 1 — প্রশ্ন নং (১, extra) | রাডার",
                "url": "https://youtu.be/Xw1nyY0_idQ",
                "desc": "একাদশ অধ্যায় — প্রশ্ন নং ১, extra।",
                "popular": false
              },
              {
                "lec": 2,
                "title": "Lec 2 — প্রশ্ন নং (২,৪,৩) | রাডার",
                "url": "https://youtu.be/I9-bkotv5RQ",
                "desc": "একাদশ অধ্যায় — প্রশ্ন নং ২, ৪, ৩।",
                "popular": false
              },
              {
                "lec": 3,
                "title": "Lec 3 — প্রশ্ন নং (৬,৫) | রাডার",
                "url": "https://youtu.be/kwqNvcUdZhM",
                "desc": "একাদশ অধ্যায় — প্রশ্ন নং ৬, ৫।",
                "popular": false
              }
            ]
          }
        ]
      }
    ]
  }
];

async function main() {
  console.log('🌱 Importing the Honors 4th Year curriculum safely (no existing records will be deleted)...');

  let subjectCount = 0;
  let chapterCount = 0;
  let topicCount = 0;
  let lectureCount = 0;

  for (const subData of CURRICULUM) {
    const subject = await prisma.subject.upsert({
      where: { code: subData.code },
      create: {
        id: subData.id,
        code: subData.code,
        name: subData.name,
        slug: subData.id,
        department: subData.department,
        description: subData.description,
        iconName: subData.icon,
        isSampleData: false,
      },
      update: {
        name: subData.name,
        department: subData.department,
        description: subData.description,
        iconName: subData.icon,
        isSampleData: false,
      },
    });
    subjectCount++;

    for (const chData of subData.chapters) {
      const chapterId = `${subData.id}-ch-${chData.num}`;
      const chapter = await prisma.chapter.upsert({
        where: {
          subjectId_chapterNumber: {
            subjectId: subject.id,
            chapterNumber: chData.num,
          },
        },
        create: {
          id: chapterId,
          subjectId: subject.id,
          chapterNumber: chData.num,
          title: chData.title,
          slug: chapterId,
          description: chData.desc,
        },
        update: {
          title: chData.title,
          description: chData.desc,
        },
      });
      chapterCount++;

      for (const topData of chData.topics) {
        const topicId = `${chapterId}-top-${topData.num}`;
        const topic = await prisma.topic.upsert({
          where: {
            chapterId_topicNumber: {
              chapterId: chapter.id,
              topicNumber: topData.num,
            },
          },
          create: {
            id: topicId,
            subjectId: subject.id,
            chapterId: chapter.id,
            topicNumber: topData.num,
            title: topData.title,
            slug: topicId,
            description: topData.desc,
            additionalResources: topData.note,
          },
          update: {
            title: topData.title,
            description: topData.desc,
            additionalResources: topData.note,
          },
        });
        topicCount++;

        const noteId = `${topicId}-study-note`;
        await prisma.studyNote.upsert({
          where: { id: noteId },
          create: {
            id: noteId,
            subjectId: subject.id,
            chapterId: chapter.id,
            topicId: topic.id,
            title: `${chData.title} — ${topData.title}`,
            summary: topData.note || topData.desc,
            author: 'Honors 4th Year Physics Archive',
          },
          update: {
            title: `${chData.title} — ${topData.title}`,
            summary: topData.note || topData.desc,
          },
        });

        for (const lec of topData.lectures) {
          if (!lec.url) {
            console.warn(`Skipping lecture without a YouTube URL: ${subData.name} / ${chData.title} / Lec ${lec.lec}`);
            continue;
          }
          const videoId = lec.url.split('/').pop()?.split('?')[0] || '';
          const lectureId = `${topicId}-lec-${lec.lec}`;
          await prisma.youTubeClass.upsert({
            where: { id: lectureId },
            create: {
              id: lectureId,
              subjectId: subject.id,
              chapterId: chapter.id,
              topicId: topic.id,
              lectureNumber: lec.lec,
              title: lec.title,
              shortDescription: lec.desc,
              youtubeUrl: lec.url.trim(),
              youtubeVideoId: videoId,
              thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              duration: 'Full Class',
              instructorName: subData.name,
              isPopular: Boolean(lec.popular),
            },
            update: {
              lectureNumber: lec.lec,
              title: lec.title,
              shortDescription: lec.desc,
              youtubeUrl: lec.url.trim(),
              youtubeVideoId: videoId,
              thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              instructorName: subData.name,
              isPopular: Boolean(lec.popular),
            },
          });
          lectureCount++;
        }
      }
    }
  }

  console.log(`✅ Imported ${subjectCount} subjects, ${chapterCount} chapters, ${topicCount} topics, and ${lectureCount} YouTube lectures.`);
  console.log('ℹ️ Existing records and uploaded files were preserved. No placeholder PDF files were created.');
}

main()
  .catch((e) => {
    console.error('❌ Curriculum import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
