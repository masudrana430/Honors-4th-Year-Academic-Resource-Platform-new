export interface QuantumMechanics2Question {
  number: string;
  text: string;
  aliases: string[];
}

export interface QuantumMechanics2TopicQuestionSet {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: QuantumMechanics2Question[];
}

/**
 * QC question list supplied for Quantum Mechanics-2 (PHYS-402).
 * Only existing lecture numbers explicitly identified in the curriculum are mapped.
 * Other questions safely route to their chapter topic.
 */
export const QUANTUM_MECHANICS_2_QUESTION_BANK: QuantumMechanics2TopicQuestionSet[] = [
  {
    chapterNumber: 1, topicNumber: 1, code: "১", title: "অপারেটর এবং ম্যাট্রিক্স",
    lectures: {
      "1": ["2", "8", "1", "9", "4"],
      "2": ["6", "7", "11"],
      "3": ["12"],
      "4": ["6", "7", "11"],
      "5": ["3"],
      "6": ["10", "16"],
      "7": ["15", "14"],
      "8": ["13"]
    },
    questions: [
      { number: "1", text: "দেখাও যে, ভরবেগ সংগঠক/অপারেটরটি হার্মিশিয়ান।", aliases: ["ভরবেগ অপারেটর হার্মিশিয়ান", "momentum operator is Hermitian", "Hermitian momentum operator"] },
      { number: "2", text: "দেখাও যে, সমতা অপারেটরের আইগেন মান $\\pm 1$।", aliases: ["সমতা অপারেটরের আইগেন মান", "parity operator eigenvalues", "parity eigenvalue plus minus one"] },
      { number: "3", text: "দেখাও যে, বিনিময় অপারেটরের আইগেন মান $\\pm 1$।", aliases: ["বিনিময় অপারেটরের আইগেন মান", "exchange operator eigenvalues", "interchange operator eigenvalue"] },
      { number: "4", text: "প্রমাণ কর যে, প্যারিটি অপারেটর একটি হার্মিশিয়ান অপারেটর।", aliases: ["প্যারিটি অপারেটর হার্মিশিয়ান", "parity operator is Hermitian"] },
      { number: "5", text: "হ্যামিল্টনিয়ান অপারেটরের সাথে হার্মিশিয়ান অপারেটরের তুলনা কর।", aliases: ["হ্যামিল্টনিয়ান ও হার্মিশিয়ান অপারেটরের তুলনা", "Hamiltonian and Hermitian operator comparison"] },
      { number: "6", text: "অভিক্ষেপ অপারেটরের আইগেন মান বের কর।", aliases: ["অভিক্ষেপ অপারেটরের আইগেন মান", "eigenvalues of projection operator"] },
      { number: "7", text: "অভিক্ষেপ অপারেটর কাকে বলে? প্রমাণ কর যে, $\\hat{P}_\\alpha$ অভিক্ষেপ অপারেটর হলে $\\hat{P}_\\alpha^2 = \\hat{P}_\\alpha$ হয়।", aliases: ["অভিক্ষেপ অপারেটর", "projection operator idempotent", "projection operator P squared equals P"] },
      { number: "8", text: "প্রমাণ কর যে, হার্মিশিয়ান অপারেটরের আইগেন মান বাস্তব।", aliases: ["হার্মিশিয়ান অপারেটরের আইগেন মান বাস্তব", "eigenvalues of Hermitian operator are real"] },
      { number: "9", text: "দেখাও যে, হ্যামিল্টোনিয়ান একটি হার্মিশীয় অপারেটর।", aliases: ["হ্যামিল্টোনিয়ান হার্মিশিয়ান প্রমাণ", "Hamiltonian is a Hermitian operator"] },
      { number: "10", text: "দুইটি হার্মিশীয় অপারেটরের গুণফলও হার্মিশীয় হবে যদি তারা পরস্পর বিনিময়ী হয়।", aliases: ["দুই হার্মিশিয়ান অপারেটরের গুণফল হার্মিশিয়ান", "product of commuting Hermitian operators is Hermitian"] },
      { number: "11", text: "প্রমাণ কর যে, কোন অপারেটরের বিভিন্ন আইগেন মানসম্পন্ন আইগেন কেটসমূহ অভিলম্বিক হবে।", aliases: ["ভিন্ন আইগেন মানের আইগেন কেট অভিলম্বিক", "eigenkets of different eigenvalues orthogonal", "orthogonality of eigenvectors"] },
      { number: "12", text: "দেখাও যে, ঐকিক অপারেটরের আইগেন মান জটিল।", aliases: ["ঐকিক অপারেটরের আইগেন মান", "unitary operator eigenvalues complex", "eigenvalues of unitary operator"] },
      { number: "13", text: "তরঙ্গ ফাংশনের ম্যাট্রিক্স রূপ নির্ধারণ কর।", aliases: ["তরঙ্গ ফাংশনের ম্যাট্রিক্স রূপ", "matrix representation of wave function"] },
      { number: "14", text: "দেখাও যে, ঐকিক রূপান্তর কোন অবস্থা ভেক্টরের ভিত্তি পরিবর্তন করে।", aliases: ["ঐকিক রূপান্তরে ভিত্তি পরিবর্তন", "unitary transformation changes basis of state vector"] },
      { number: "15", text: "দেখাও যে, ঐকিক রূপান্তর দুটি অবস্থা ভেক্টরের স্কেলার গুণন সংরক্ষণ করে।", aliases: ["ঐকিক রূপান্তরে স্কেলার গুণন সংরক্ষণ", "unitary transformation preserves scalar product", "unitary transformation preserves inner product"] },
      { number: "16", text: "কোয়ান্টাম বলবিজ্ঞানের মৌলিক স্বীকার্যসমূহ বিবৃত কর।", aliases: ["কোয়ান্টাম বলবিজ্ঞানের মৌলিক স্বীকার্য", "postulates of quantum mechanics", "basic postulates quantum mechanics"] },
      { number: "17", text: "দেখাও যে, হার্মিশিয়ান ম্যাট্রিক্সকে ঐকিক রূপান্তর দ্বারা কর্ণায়িত করা যায়।", aliases: ["হার্মিশিয়ান ম্যাট্রিক্স কর্ণায়িত", "diagonalization of Hermitian matrix by unitary transformation"] },
      { number: "18", text: "ব্রা ও কেট ভেক্টরের সংজ্ঞা দাও। এদের কয়েকটি বৈশিষ্ট্য উল্লেখ কর।", aliases: ["ব্রা কেট ভেক্টর", "bra and ket vectors definition properties", "Dirac bra ket notation"] },
      { number: "19", text: "দেখাও যে, দুটি হার্মিশিয়ান অপারেটরের যুগপৎ আইগেন কেট থাকার প্রয়োজনীয় ও যথেষ্ট শর্ত হলো অপারেটরদ্বয় বিনিময়ী। অথবা, দেখাও যে, দুটি অপারেটর বিনিময়ী হলেই শুধুমাত্র তাদের যুগপৎ আইগেন ফাংশন থাকা সম্ভব।", aliases: ["দুটি হার্মিশিয়ান অপারেটরের যুগপৎ আইগেন কেট", "commuting Hermitian operators simultaneous eigenkets", "simultaneous eigenfunctions commuting operators"] }
    ]
  },
  {
    chapterNumber: 2, topicNumber: 1, code: "২", title: "কোয়ান্টাম বলবিজ্ঞানে ম্যাট্রিক্স সূত্রায়ন",
    lectures: {
      "1": ["2", "15", "4"],
      "2": ["13"],
      "3": ["14", "11", "12"],
      "4": ["5", "10"],
      "5": ["1", "6", "8"],
      "6": ["3", "7", "9"]
    },
    questions: [
      { number: "1", text: "শ্রোডিংগার সমীকরণের ম্যাট্রিক্স রূপ প্রতিষ্ঠা কর।", aliases: ["শ্রোডিংগার সমীকরণের ম্যাট্রিক্স রূপ", "matrix form of Schrodinger equation"] },
      { number: "2", text: "হাইজেনবার্গ চিত্রে অবস্থা ভেক্টরের গতির সমীকরণ প্রতিপাদন কর। অথবা, কোয়ান্টাম বলবিদ্যায় হাইজেনবার্গ চিত্র আলোচনা কর এবং গতির সমীকরণ নির্ধারণ কর।", aliases: ["হাইজেনবার্গ চিত্রে অবস্থা ভেক্টরের গতির সমীকরণ", "Heisenberg picture equation of motion state vector", "Heisenberg picture quantum mechanics"] },
      { number: "3", text: "রৈখিক ছন্দিত স্পন্দকের ক্ষেত্রে দেখাও যে, অবস্থান ও ভরবেগের প্রত্যাশিত মান শূন্য।", aliases: ["ছন্দিত স্পন্দকে অবস্থান ভরবেগের প্রত্যাশিত মান শূন্য", "harmonic oscillator expectation values position momentum zero"] },
      { number: "4", text: "দেখাও যে, কোন অপারেটর হ্যামিল্টনিয়ানের সাথে বিনিময় করলে এর সংশ্লিষ্ট ভৌত নিরীক্ষ্য গতীয় ধ্রুবক হবে।", aliases: ["হ্যামিল্টনিয়ানের সাথে বিনিময় করলে গতীয় ধ্রুবক", "operator commuting with Hamiltonian conserved quantity", "conserved observable"] },
      { number: "5", text: "দেখাও যে, একটি সংগঠককে ম্যাট্রিক্স দ্বারা প্রতিরূপ করানো যায়। অথবা, কোন অপারেটরের ম্যাট্রিক্স রূপ নির্ধারণ কর।", aliases: ["অপারেটরের ম্যাট্রিক্স রূপ", "matrix representation of an operator", "operator represented by a matrix"] },
      { number: "6", text: "কোয়ান্টাম বলবিদ্যায় সকল ভেক্টর স্পেসই হিলবার্ট স্পেস ব্যাখ্যা কর।", aliases: ["কোয়ান্টাম বলবিদ্যায় হিলবার্ট স্পেস", "Hilbert space in quantum mechanics", "vector space Hilbert space"] },
      { number: "7", text: "হাইজেনবার্গের অনিশ্চয়তা (অবস্থান ও ভরবেগের মধ্যে) নীতির মৌলিক প্রমাণ প্রতিষ্ঠা কর এবং তার তাৎপর্য ব্যাখ্যা কর।", aliases: ["হাইজেনবার্গের অনিশ্চয়তা নীতির প্রমাণ", "Heisenberg uncertainty principle position momentum proof significance"] },
      { number: "8", text: "এরেনফেস্টের উপপাদ্যটি বিবৃত ও ব্যাখ্যা কর।", aliases: ["এরেনফেস্টের উপপাদ্য", "Ehrenfest theorem"] },
      { number: "9", text: "তরঙ্গ-কণার দ্বৈততা ব্যাখ্যা কর।", aliases: ["তরঙ্গ কণার দ্বৈততা", "wave particle duality"] },
      { number: "10", text: "একটি অপেক্ষক এবং একটি কারকের ম্যাট্রিক্স চিত্র বের কর। [৫ নং প্রশ্নের অনুরূপ]", aliases: ["অপেক্ষক ও কারকের ম্যাট্রিক্স চিত্র", "matrix representation of a function and operator"] },
      { number: "11", text: "হাইজেনবার্গ চিত্র প্রয়োগ করে দেখাও যে, $\\frac{dx}{dt} = \\frac{p}{m}$ এবং $\\frac{dp}{dt} = -\\frac{dV}{dx}$।", aliases: ["হাইজেনবার্গ চিত্রে dx dt p m", "Heisenberg equations dx dt p over m dp dt force", "equations of motion x p Heisenberg picture"] },
      { number: "12", text: "প্রমাণ কর যে, শ্রোডিংগার চিত্রে কোন অপারেটর হ্যামিল্টানিয়ানের সাথে বিনিময় করলে তা অন্যান্য চিত্রেও বৈধ হবে।", aliases: ["শ্রোডিংগার চিত্রে সংরক্ষিত অপারেটর অন্যান্য চিত্র", "conservation operator in Schrödinger Heisenberg pictures"] },
      { number: "13", text: "ম্যাট্রিক্স পদ্ধতি ব্যবহার করে সরল ছন্দিত দোলকের আইগেন মান নির্ণয় কর। অথবা, দেখাও যে, কোয়ান্টাম ছন্দিত দোলকের আইগেন মান $E_n = \\left(n + \\frac{1}{2}\\right)\\hbar\\omega$, যেখানে $n = 0, 1, 2, \\dots$।", aliases: ["ছন্দিত দোলকের আইগেন মান", "quantum harmonic oscillator energy eigenvalues", "En n plus half hbar omega"] },
      { number: "14", text: "দেখাও যে, তিনটি চিত্রে অপারেটরের প্রত্যাশিত মান একই/অভিন্ন।", aliases: ["তিনটি চিত্রে প্রত্যাশিত মান একই", "expectation value same in three pictures", "Schrodinger Heisenberg Dirac expectation values"] },
      { number: "15", text: "শ্রোডিংগার, হাইজেনবার্গ ও ডিরাক চিত্রের অবস্থা ভেক্টর ও অপারেটরের জন্য গতির সমীকরণ প্রতিপাদন কর। অথবা, শ্রোডিংগার চিত্র ও হাইজেনবার্গ চিত্রের অবস্থা ভেক্টরের মধ্যে গতির সমীকরণ প্রতিপাদন কর। অথবা, শ্রোডিংগার, হাইজেনবার্গ ও ডিরাক চিত্রের অপারেটরের জন্য গতির সমীকরণ প্রতিপাদন কর।", aliases: ["শ্রোডিংগার হাইজেনবার্গ ডিরাক চিত্রের গতির সমীকরণ", "equations of motion Schrodinger Heisenberg Dirac pictures", "three pictures of quantum mechanics"] },
      { number: "16", text: "হিলবার্ট স্পেস কী ব্যাখ্যা কর। বাস্তব স্পেসের সাথে পার্থক্য কী।", aliases: ["হিলবার্ট স্পেস ও বাস্তব স্পেসের পার্থক্য", "Hilbert space versus real space"] },
      { number: "17", text: "$j = 1$ হলে $J^2$ এর ম্যাট্রিক্স নির্ণয় কর।", aliases: ["j equals 1 J square matrix", "J squared matrix j=1", "angular momentum matrix j one"] }
    ]
  },
  {
    chapterNumber: 3, topicNumber: 1, code: "৩", title: "কৌণিক ভরবেগের তত্ত্ব",
    lectures: {
      "2": ["12"],
      "3": ["1", "5", "3", "7", "4"],
      "4": ["14"],
      "5": ["8", "9", "10"],
      "6": ["11", "13"],
      "7": ["2", "6"],
      "8": ["15"]
    },
    questions: [
      { number: "1", text: "দেখাও যে, কৌণিক ভরবেগ অপারেটর $\\vec{J}$ নিম্নের সম্পর্কটি পরিতৃপ্ত করে $\\vec{J} \\times \\vec{J} = i\\hbar\\vec{J}$।", aliases: ["J cross J i hbar J", "angular momentum vector cross product commutation", "angular momentum cross product identity"] },
      { number: "2", text: "ক্লেবশ-গর্ডন সহগ ব্যাখ্যা কর।", aliases: ["ক্লেবশ গর্ডন সহগ", "Clebsch Gordan coefficients"] },
      { number: "3", text: "দেখাও যে, (i) $[J_+, J_-] = 2\\hbar J_z$ বা $2J_z$ এবং (ii) $[J_z, J_+] = \\hbar J_+$ বা $J_+$।", aliases: ["J plus J minus commutator", "Jz J plus commutator", "angular momentum ladder operator commutation relations"] },
      { number: "4", text: "প্রমাণ কর যে, $[J_z, J_\\pm] = \\pm\\hbar J_\\pm$ বা $\\pm J_\\pm$।", aliases: ["Jz J plus minus commutator", "Jz ladder operator commutation relation"] },
      { number: "5", text: "প্রমাণ কর যে, $\\vec{J} \\times \\vec{J} = i\\hbar\\vec{J}$।", aliases: ["J cross J equals i hbar J", "angular momentum cross product proof"] },
      { number: "6", text: "পাউলির বর্জননীতি বিবৃত ও ব্যাখ্যা কর। দেখাও যে, বোসন কণার কোন বর্জন নীতি নেই।", aliases: ["পাউলির বর্জননীতি", "Pauli exclusion principle bosons", "bosons do not obey exclusion principle"] },
      { number: "7", text: "প্রমাণ কর যে, $[\\hat{J}_+, \\hat{J}_-] = 2\\hbar\\hat{J}_z$ বা $2\\hat{J}_z$।", aliases: ["J plus J minus commutator 2 hbar Jz", "ladder operators commutator proof"] },
      { number: "8", text: "যে অবস্থায় $J^2$ এবং $J_z$ সুনির্দিষ্ট হয়, সেক্ষেত্রে প্রমাণ কর যে, $\\langle J_x \\rangle = \\langle J_y \\rangle = 0$। অথবা, প্রমাণ কর যে, $\\langle jm | J_x | jn \\rangle = \\langle jm | J_y | jn \\rangle = 0$।", aliases: ["Jx Jy expectation value zero", "angular momentum expectation Jx Jy zero", "matrix elements Jx Jy angular momentum"] },
      { number: "9", text: "প্রমাণ কর যে, $\\hat{J}_x$ ও $\\hat{J}_y$ এর গড় মান শূন্য।", aliases: ["Jx Jy এর গড় মান শূন্য", "mean value Jx Jy zero"] },
      { number: "10", text: "প্রমাণ কর যে, $\\langle jm | \\hat{J}_x^2 | jm \\rangle = \\langle jm | \\hat{J}_y^2 | jm \\rangle = \\frac{1}{2}\\hbar^2 [j(j+1) - m^2]$।", aliases: ["Jx square Jy square expectation", "angular momentum uncertainty Jx squared Jy squared", "j j+1 minus m squared"] },
      { number: "11", text: "পাউলির স্পিন ম্যাট্রিক্সসমূহ নির্ণয় কর। অথবা, পাউলির ঘূর্ণন ম্যাট্রিক্সগুলো প্রতিপাদন কর।", aliases: ["পাউলির স্পিন ম্যাট্রিক্স", "Pauli spin matrices", "Pauli matrices derivation"] },
      { number: "12", text: "দেখাও যে, $[L_x, L_y] = i\\hbar L_z$।", aliases: ["Lx Ly commutator", "angular momentum Lx Ly i hbar Lz"] },
      { number: "13", text: "$\\hat{L}^2$ এর আইগেন মান নির্ণয় কর।", aliases: ["L square eigenvalue", "eigenvalues of orbital angular momentum L squared"] },
      { number: "14", text: "যে প্রতিরূপে $J^2$ এবং $J_z$ কর্ণায়িত হয় তাতে $J_\\pm = J_x \\pm iJ_y$ সংগঠকের ম্যাট্রিক্স উপাদানসমূহ নির্ণয় কর।", aliases: ["J plus minus matrix elements", "angular momentum ladder matrix elements", "matrix elements Jx plus i Jy"] },
      { number: "15", text: "কৌণিক ভরবেগ অপারেটরের বর্গ $\\hat{J}^2$ এবং এর z-এর উপাংশ $J_z$ এর যুগপৎ আইগেন ভেক্টর $|jm\\rangle$ এর সমর্থনে যুক্তি দেখাও। $j$ এবং $m$ এর সম্ভাব্য মান নির্ণয় কর।", aliases: ["J squared Jz simultaneous eigenvectors jm", "possible values j and m", "angular momentum quantum numbers"] },
      { number: "16", text: "দেখাও যে, $L^2$ এবং $L$ এর যেকোন উপাংশ যুগপৎ পরিমাপ করা যায়।", aliases: ["L square and component simultaneously measurable", "simultaneous measurement angular momentum component"] },
      { number: "17", text: "দেখাও যে, কৌণিক ভরবেগের বর্গ অপারেটরটি মূলত ল্যাপ্লাসিয়ান অপারেটরের কৌণিক অংশ।", aliases: ["কৌণিক ভরবেগ ও ল্যাপ্লাসিয়ান", "angular part of Laplacian angular momentum squared"] }
    ]
  },
  {
    chapterNumber: 4, topicNumber: 1, code: "৪", title: "সন্নিকর্ষ পদ্ধতি",
    lectures: {
      "1": ["8", "10", "12", "9", "3"],
      "2": ["13", "1"],
      "3": ["2"],
      "4": ["11"],
      "5": ["4"],
      "6": ["7"],
      "7": ["5", "6"]
    },
    questions: [
      { number: "1", text: "ফার্মির সুবর্ণ নীতি কী? অথবা, ফার্মির গোল্ডেন নীতি কী বর্ণনা কর।", aliases: ["ফার্মির সুবর্ণ নীতি", "Fermi golden rule"] },
      { number: "2", text: "সময় নির্ভর বিচলন তত্ত্বের প্রথম ক্রম নির্ণয় কর। অথবা, ডিসক্রিট সময় নির্ভর বিচলন তত্ত্বের প্রথম ক্রম নির্ণয় কর।", aliases: ["সময় নির্ভর বিচলন তত্ত্ব প্রথম ক্রম", "first order time dependent perturbation theory"] },
      { number: "3", text: "পরিবর্তনশীল পদ্ধতি কোথায় প্রয়োজনীয়।", aliases: ["পরিবর্তনশীল পদ্ধতির প্রয়োজনীয়তা", "when variational method is needed", "need of variational method"] },
      { number: "4", text: "হাইড্রোজেন পরমাণুর ভূমি স্তরের তরঙ্গফাংশন $\\psi = A e^{-\\alpha r}$, এখানে $\\alpha$ ধ্রুবক হলে, পরিবর্তনশীল পদ্ধতি ব্যবহার করে পরমাণুর ভূমি স্তরের শক্তি নির্ণয় কর। অথবা, পরিবর্তনশীল পদ্ধতি ব্যবহার করে হাইড্রোজেন পরমাণুর ভূমিস্তরের শক্তি বের কর।", aliases: ["হাইড্রোজেন পরমাণুর ভূমি স্তরের শক্তি variational", "variational method hydrogen ground state energy", "psi A e alpha r"] },
      { number: "5", text: "W.K.B সন্নিকর্ষ পদ্ধতির বৈধতার শর্ত প্রতিপাদন কর।", aliases: ["WKB বৈধতার শর্ত", "WKB validity condition", "validity condition WKB approximation"] },
      { number: "6", text: "W.K.B সন্নিকর্ষ পদ্ধতি ব্যবহার করে সোমারফিল্ড-উইলসন কোয়ান্টাম শর্ত প্রতিপাদন কর।", aliases: ["সোমারফিল্ড উইলসন কোয়ান্টাম শর্ত", "Sommerfeld Wilson quantization condition WKB"] },
      { number: "7", text: "পাউলির বর্জননীতি বিবৃত ও ব্যাখ্যা কর।", aliases: ["পাউলির বর্জননীতি", "Pauli exclusion principle"] },
      { number: "8", text: "বিচলন তত্ত্ব কখন প্রযোজ্য হয় ব্যাখ্যা কর।", aliases: ["বিচলন তত্ত্ব কখন প্রযোজ্য", "when perturbation theory is applicable"] },
      { number: "9", text: "পরিবর্তনশীল পদ্ধতি প্রয়োগের ধাপসমূহ উল্লেখ কর।", aliases: ["পরিবর্তনশীল পদ্ধতির ধাপ", "steps of variational method"] },
      { number: "10", text: "সময় নির্ভর বিচলন তত্ত্ব কখন প্রযোজ্য হয় ব্যাখ্যা কর।", aliases: ["সময় নির্ভর বিচলন তত্ত্বের প্রয়োগ", "when time dependent perturbation theory applies"] },
      { number: "11", text: "অচ্যুত অবস্থার জন্য সময় অনির্ভরশীল বিচলন তত্ত্বের প্রথম ক্রম পর্যন্ত সংশোধন নির্ণয় কর।", aliases: ["সময় অনির্ভর বিচলন তত্ত্ব প্রথম ক্রম সংশোধন", "first order time independent perturbation correction nondegenerate state"] },
      { number: "12", text: "সময় অনির্ভর বিচলন তত্ত্ব কখন প্রযোজ্য? ব্যাখ্যা কর।", aliases: ["সময় অনির্ভর বিচলন তত্ত্ব কখন প্রযোজ্য", "when time independent perturbation theory is applicable"] },
      { number: "13", text: "সময় নির্ভর বিচলন পদ্ধতি ব্যবহার করে পরিবর্তন হারের জন্য ফার্মির সুবর্ণ নীতি প্রতিপাদন কর।", aliases: ["বিচলন তত্ত্ব থেকে ফার্মির সুবর্ণ নীতি", "derive Fermi golden rule using time dependent perturbation"] },
      { number: "14", text: "চ্যুতি কীভাবে দূর করা যায় ব্যাখ্যা কর।", aliases: ["চ্যুতি দূর করার উপায়", "removal of degeneracy", "lifting degeneracy"] },
      { number: "15", text: "দেখাও যে, হাইড্রোজেন পরমাণুর ভূমি অবস্থায় স্টার্ক ক্রিয়া ঘটে না।", aliases: ["হাইড্রোজেন ভূমি অবস্থায় স্টার্ক ক্রিয়া হয় না", "Stark effect absent hydrogen ground state"] },
      { number: "16", text: "W.K.B সন্নিকর্ষ পদ্ধতি কী? একে অর্ধচিরায়ত পদ্ধতি বলা হয় কেন।", aliases: ["WKB অর্ধচিরায়ত পদ্ধতি", "why WKB is called semiclassical method"] },
      { number: "17", text: "W.K.B সন্নিকর্ষ পদ্ধতি প্রয়োগ করে একমাত্রিক ছন্দিত স্পন্দকের জন্য শক্তিস্তরের সমীকরণ নির্ণয় কর।", aliases: ["WKB harmonic oscillator energy levels", "one dimensional harmonic oscillator WKB energy spectrum"] },
      { number: "18", text: "স্টার্ক ক্রিয়া কী? চ্যুত সিস্টেমের জন্য বিচলন তত্ত্ব প্রয়োগ করে স্টার্ক ক্রিয়া ব্যাখ্যা কর। অথবা, ডিজেনারেট ব্যবস্থার জন্য বিচলন তত্ত্ব প্রয়োগ করে স্টার্ক ক্রিয়া ব্যাখ্যা কর।", aliases: ["স্টার্ক ক্রিয়া ডিজেনারেট ব্যবস্থা", "Stark effect degenerate perturbation theory"] }
    ]
  },
  {
    chapterNumber: 5, topicNumber: 1, code: "৫", title: "বিক্ষেপন তত্ত্ব",
    lectures: {
      "1": ["2", "1"],
      "2": ["3", "4"],
      "3": ["8", "7"],
      "5": ["5", "6"]
    },
    questions: [
      { number: "1", text: "আংশিক তরঙ্গ পদ্ধতি কখন প্রযোজ্য?", aliases: ["আংশিক তরঙ্গ পদ্ধতির প্রয়োগ", "when partial wave method is applicable"] },
      { number: "2", text: "প্রমাণ কর, ব্যবকলনীয় প্রস্থচ্ছেদ বিক্ষেপন বিস্তারের বর্গের সমান।", aliases: ["ব্যবকলনীয় প্রস্থচ্ছেদ বিক্ষেপন বিস্তারের বর্গ", "differential cross section square of scattering amplitude"] },
      { number: "3", text: "প্রমাণ কর যে, সমতল তরঙ্গকে আংশিক গোলীয় তরঙ্গসমূহের সমষ্টিরূপে প্রকাশ করা যায়।", aliases: ["সমতল তরঙ্গ আংশিক গোলীয় তরঙ্গ", "plane wave expansion partial waves"] },
      { number: "4", text: "প্রথম বর্ন সন্নিকর্ষ বিক্ষেপন বিস্তারের রাশিমালা প্রতিপাদন কর।", aliases: ["প্রথম বর্ন সন্নিকর্ষ", "first Born approximation scattering amplitude"] },
      { number: "5", text: "ইউকাওয়া বিভব $V(r) = \\frac{V_0}{\\mu r} e^{-\\mu r}$ এর জন্য ব্যবকলন প্রস্থচ্ছেদ নির্ণয় কর। এখান হতে রাদারফোর্ড বিক্ষেপন সূত্র নির্ণয় কর।", aliases: ["ইউকাওয়া বিভবের ব্যবকলন প্রস্থচ্ছেদ", "Yukawa potential differential cross section Rutherford formula"] },
      { number: "6", text: "বিক্ষেপনের ক্ষেত্রে আলোকীয় উপপাদ্য প্রতিপাদন কর।", aliases: ["বিক্ষেপনে আলোকীয় উপপাদ্য", "optical theorem in scattering"] },
      { number: "7", text: "বর্ন সন্নিকর্ষ পদ্ধতি ব্যাখ্যা কর।", aliases: ["বর্ন সন্নিকর্ষ পদ্ধতি", "Born approximation method"] },
      { number: "8", text: "আংশিক তরঙ্গ বিশ্লেষণ পদ্ধতি ব্যবহার করে প্রমাণ কর যে, মোট বিক্ষেপন প্রস্থচ্ছেদ $\\sigma = \\frac{4\\pi}{k^2} \\sum_{l=0}^{\\infty} (2l+1) \\sin^2 \\delta_l$।", aliases: ["আংশিক তরঙ্গ মোট বিক্ষেপন প্রস্থচ্ছেদ", "partial wave total scattering cross section phase shift formula"] },
      { number: "9", text: "অনুনাদ বিক্ষেপন ব্যাখ্যা কর।", aliases: ["অনুনাদ বিক্ষেপন", "resonance scattering"] },
      { number: "10", text: "দশা ব্যবধান/চ্যুতি পরিবর্তনের ভৌত তাৎপর্য ব্যাখ্যা কর।", aliases: ["দশা ব্যবধানের ভৌত তাৎপর্য", "physical significance of phase shift"] },
      { number: "11", text: "দৃঢ় গোলক দ্বারা বিক্ষেপনের ক্ষেত্রে প্রমাণ কর যে, নিম্নশক্তির জন্য $\\sigma_t = 4\\pi r^2$ এবং উচ্চ শক্তির জন্য $\\sigma_t = 2\\pi r^2$।", aliases: ["দৃঢ় গোলক বিক্ষেপন নিম্ন উচ্চ শক্তি", "hard sphere scattering total cross section low high energy"] }
    ]
  },
  {
    chapterNumber: 6, topicNumber: 1, code: "৬", title: "অভিন্ন কণা",
    lectures: {
      "1": ["4"],
      "2": ["5", "3"],
      "3": ["6"],
      "4": ["8", "7", "1", "2"]
    },
    questions: [
      { number: "1", text: "উদাহরণসহ ফার্মিয়ন ও বোসন ব্যাখ্যা কর। অথবা, ফার্মিয়ন ও বোসনের পার্থক্য দেখাও।", aliases: ["ফার্মিয়ন ও বোসন পার্থক্য", "fermions and bosons with examples", "difference between fermion and boson"] },
      { number: "2", text: "বোসন কণাসমূহের বৈশিষ্ট্য লিখ।", aliases: ["বোসন কণার বৈশিষ্ট্য", "properties of bosons"] },
      { number: "3", text: "প্রতিসম ও অপ্রতিসম তরঙ্গ অপেক্ষক কীভাবে গঠন করা যায় ব্যাখ্যা কর।", aliases: ["প্রতিসম অপ্রতিসম তরঙ্গ অপেক্ষক", "symmetric antisymmetric wave functions construction"] },
      { number: "4", text: "দেখাও যে, নিরপেক্ষ সিস্টেমের জন্য ঘনত্ব ম্যাট্রিক্স গতীয় ধ্রুবক। অথবা, কোয়ান্টাম লিউভিলের গতির সমীকরণ প্রতিপাদন কর।", aliases: ["ঘনত্ব ম্যাট্রিক্স গতীয় ধ্রুবক", "কোয়ান্টাম লিউভিলের গতির সমীকরণ", "quantum Liouville equation density matrix"] },
      { number: "5", text: "অভিন্ন কণার পার্থক্য ও অযোগ্যতার নীতি ব্যাখ্যা কর।", aliases: ["অভিন্ন কণার অযোগ্যতার নীতি", "indistinguishability principle identical particles"] },
      { number: "6", text: "আন্তঃবদল অপারেটর কাকে বলে? দেখাও যে, এর মান $\\pm 1$।", aliases: ["আন্তঃবদল অপারেটর", "interchange operator eigenvalue plus minus one", "exchange operator definition eigenvalues"] },
      { number: "7", text: "দেখাও যে, ফার্মিয়ন ও বোসন কণাকে যথাক্রমে অপ্রতিসম ও প্রতিসম তরঙ্গ ফাংশন দ্বারা বর্ণনা করা যায়।", aliases: ["ফার্মিয়ন অপ্রতিসম বোসন প্রতিসম তরঙ্গ ফাংশন", "fermions antisymmetric bosons symmetric wave functions"] },
      { number: "8", text: "স্পিন $\\frac{1}{2}$ এর জন্য ঘনত্ব ম্যাট্রিক্স নির্ণয় কর।", aliases: ["স্পিন অর্ধেক ঘনত্ব ম্যাট্রিক্স", "density matrix for spin one half"] },
      { number: "9", text: "পাউলির বর্জন নীতি বর্ণনা কর। দেখাও যে, বোসন কণার জন্য কোন বর্জন নীতি নেই। (অধ্যায়-৩, ৬নং প্রশ্নের অনুরূপ)", aliases: ["পাউলির বর্জন নীতি বোসন", "Pauli exclusion principle for fermions bosons", "bosons no exclusion principle"] },
      { number: "10", text: "দেখাও যে, শূন্য স্পিন বিশিষ্ট কণার s তরঙ্গ বিক্ষেপনে মোট বিক্ষেপন প্রস্থচ্ছেদের রাশিমালা $\\sigma_0 = \\frac{16\\pi}{k^2} \\sin^2 \\delta_0$।", aliases: ["শূন্য স্পিন কণার s তরঙ্গ বিক্ষেপন", "zero spin particle s wave total cross section", "sigma zero 16 pi k squared phase shift"] }
    ]
  },
  {
    chapterNumber: 7, topicNumber: 1, code: "৭", title: "আপেক্ষিক-তত্ত্বীয় তরঙ্গ সমীকরণ",
    lectures: {
      "1": ["5", "1"],
      "2": ["2", "4"],
      "3": ["6"],
      "4": ["3", "7"]
    },
    questions: [
      { number: "1", text: "শ্রোডিংগার এবং ডিরাকের হ্যামিল্টনিয়ান দুটিতে ধারাবাহিকতার সমীকরণ প্রতিপাদন কর।", aliases: ["শ্রোডিংগার ডিরাক ধারাবাহিকতার সমীকরণ", "continuity equation Schrodinger Dirac Hamiltonian"] },
      { number: "2", text: "ডিরাক সমীকরণের সহপরিবর্তিত সমীকরণ রূপটি প্রতিপাদন কর।", aliases: ["ডিরাক সমীকরণের সহপরিবর্তিত রূপ", "covariant form of Dirac equation"] },
      { number: "3", text: "একটি মুক্ত কণার জন্য শ্রোডিংগার ও ডিরাকের হ্যামিল্টনিয়ান ব্যাখ্যা কর।", aliases: ["মুক্ত কণার শ্রোডিংগার ডিরাক হ্যামিল্টনিয়ান", "Schrodinger Dirac Hamiltonian free particle"] },
      { number: "4", text: "দেখাও যে, লরেন্টজ রূপান্তরের অধীনে ডিরাক সমীকরণ অপরিবর্তিত থাকে।", aliases: ["লরেন্টজ রূপান্তরে ডিরাক সমীকরণ", "Dirac equation Lorentz invariant", "Lorentz covariance of Dirac equation"] },
      { number: "5", text: "ক্লেইন-গর্ডন তরঙ্গ সমীকরণ প্রতিপাদন কর।", aliases: ["ক্লেইন গর্ডন সমীকরণ প্রতিপাদন", "Klein Gordon wave equation derivation"] },
      { number: "6", text: "ডিরাক আপেক্ষিক-তত্ত্বীয় তরঙ্গ সমীকরণ লেখ এবং মুক্ত ইলেকট্রনের জন্য এর সমাধান নির্ণয় কর। অথবা, ডিরাকের মুক্ত ইলেকট্রন তত্ত্বে উদ্ভূত ধনাত্মক ও ঋণাত্মক শক্তি অবস্থাসমূহের অর্থ পর্যালোচনা কর।", aliases: ["ডিরাক মুক্ত ইলেকট্রন সমাধান", "Dirac equation free electron solution", "positive and negative energy states Dirac theory"] },
      { number: "7", text: "ডিরাক ও শ্রোডিংগার সমীকরণের মধ্যকার মৌলিক পার্থক্যসমূহ লিখ। অথবা, শ্রোডিংগার, ক্লেইন-গর্ডন ও ডিরাক সমীকরণের একটি তুলনামূলক আলোচনা কর।", aliases: ["ডিরাক শ্রোডিংগার সমীকরণের পার্থক্য", "Schrodinger Klein Gordon Dirac equation comparison"] },
      { number: "8", text: "ডিরাকের গহ্বর তত্ত্ব ব্যাখ্যা কর।", aliases: ["ডিরাকের গহ্বর তত্ত্ব", "Dirac hole theory"] },
      { number: "9", text: "ডিরাক সমীকরণ অনুসারে কোন আপেক্ষিক-তত্ত্বীয় কণার বেগ নির্ণয় কর।", aliases: ["ডিরাক সমীকরণে কণার বেগ", "particle velocity from Dirac equation", "velocity operator in Dirac theory"] }
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
export function buildQuantumMechanics2LectureTitle(
  chapterNumber: number,
  topicNumber: number,
  lectureNumber: number,
  currentTitle: string
): string {
  const topic = QUANTUM_MECHANICS_2_QUESTION_BANK.find(
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

export function getQuantumMechanics2LectureNumbersForQuestion(
  topic: QuantumMechanics2TopicQuestionSet,
  questionNumber: string
): number[] {
  return Object.entries(topic.lectures)
    .filter(([, questionNumbers]) => questionNumbers.includes(questionNumber))
    .map(([lectureNumber]) => Number(lectureNumber));
}
