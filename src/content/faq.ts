// [PLACEHOLDER FAQ - confirm all policy answers with Darbar Computer admin before publishing]
// Per build document §6.10 and course catalog content §11

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isPlaceholder?: boolean;
}

export const faqCategories: FAQCategory[] = [
  {
    category: "Admissions",
    items: [
      {
        id: "adm-1",
        question: "Do I need prior computer experience to enroll?",
        answer: "Most courses assume no prior experience; prerequisites (if any) are listed on each course page. We have tracks from absolute beginner (Basic Computer Literacy, Computer Fundamentals) up to advanced professional programs.",
      },
      {
        id: "adm-2",
        question: "Can I switch batches after enrolling?",
        answer: "[Confirm actual institute policy] — generally, batch swaps are possible within the first week depending on seat availability in the target batch.",
        isPlaceholder: true,
      },
      {
        id: "adm-3",
        question: "Is there an age limit?",
        answer: "Most courses are open to ages 14+; some short courses (Basic Computer Literacy) have no age restriction. For minors, a guardian signature may be required at enrollment.",
      },
    ],
  },
  {
    category: "Fees",
    items: [
      {
        id: "fee-1",
        question: "Are installment plans available?",
        answer: "Yes, for most courses over NPR 8,000 — see each course's fee note for details on available installments (typically 2–3 equal parts).",
      },
      {
        id: "fee-2",
        question: "What is the refund policy?",
        answer: "[Confirm actual institute policy before publishing]. A general guideline: full refund within the first 2 days if classes haven't started, partial refund within the first week of classes, no refund after the second week.",
        isPlaceholder: true,
      },
      {
        id: "fee-3",
        question: "Which payment methods are accepted?",
        answer: "We accept cash, bank transfer, mobile wallets (eWallet), and card payment at the front desk. Ask about group discounts for schools, colleges, or corporate batches.",
      },
    ],
  },
  {
    category: "Courses & Certification",
    items: [
      {
        id: "cert-1",
        question: "Will I receive a certificate on completion?",
        answer: "Yes, a completion certificate is issued for every course after attending the minimum required classes and submitting the required project/assessment. [Confirm any external/government certification affiliation claims before publishing — do not claim accreditation that hasn't been verified.]",
        isPlaceholder: true,
      },
      {
        id: "cert-2",
        question: "Are classes available in the evening for working professionals?",
        answer: "Most courses offer morning, day, and evening batch options. Check the course detail page or ask at the front desk for current batch schedules.",
      },
      {
        id: "cert-3",
        question: "What is the typical class size?",
        answer: "Our classes are intentionally kept small — usually 8–15 students — so every student gets individual trainer attention and adequate lab time.",
      },
    ],
  },
];
