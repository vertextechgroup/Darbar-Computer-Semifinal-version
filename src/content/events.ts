// [PLACEHOLDER EVENTS - replace with real Darbar Computer events before launch]

import type { EventItem } from "@/types/event";

const evSize = "landscape_16_9";
const ev = (p: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(p)}&image_size=${evSize}`;

export const events: EventItem[] = [
  {
    id: "e1",
    slug: "open-house-day-2026",
    title: "Open House Day — Explore DarbarTech",
    date: "2026-08-15",
    time: "10:00 AM – 4:00 PM",
    location: "DarbarTech Campus, [PLACEHOLDER Address]",
    shortDescription: "Tour our labs, meet trainers, watch live demos, and get free counseling. Exclusive on-the-spot admission discounts for attendees.",
    fullDescription: "Join us for a full day of exploration at DarbarTech Group of Technology. Tour our computer labs, meet our certified trainers, watch live demonstrations of our most popular courses, and get one-on-one free career counseling. Attendees who enroll on the spot receive an exclusive discount. Parents and guardians welcome.",
    image: ev("Open house event at DarbarTech computer training institute Nepal, large banner with institute name, welcome desk with staff greeting visitors with brochures, families and prospective students touring modern labs, bright sunny campus day, professional event banner HD photography"),
    category: "Open House",
    upcoming: true,
  },
  {
    id: "e2",
    slug: "full-stack-demo-workshop",
    title: "Free Workshop: Build Your First Website in 2 Hours",
    date: "2026-08-22",
    time: "1:00 PM – 3:00 PM",
    location: "Lab 3, DarbarTech Campus",
    shortDescription: "A hands-on beginner-friendly workshop. No coding experience required — leave with a live personal website.",
    fullDescription: "A completely free, hands-on introductory workshop led by our senior web development trainer. You will build and deploy a simple personal website using HTML and CSS. Open to everyone ages 14+. Bring your own laptop if possible (limited lab seats available).",
    image: ev("Hands-on web development workshop in Nepal, young Nepali instructor helping students code HTML CSS website on laptops, lab classroom with students following along coding, projector showing website code in background, educational workshop HD photography photorealistic"),
    category: "Workshop",
    upcoming: true,
  },
  {
    id: "e3",
    slug: "python-automation-seminar",
    title: "Seminar: Python for Everyday Automation",
    date: "2026-09-05",
    time: "11:00 AM – 1:00 PM",
    location: "Seminar Hall, DarbarTech Campus",
    shortDescription: "See practical Python automation demos for office tasks, data, and more — perfect for working professionals.",
    fullDescription: "A one-time seminar showcasing how Python can save hours every week through simple automation scripts — Excel processing, file renaming, report generation, and more. Presented with live demos. No prior Python knowledge needed.",
    image: ev("Professional tech seminar at DarbarTech Nepal training institute, speaker presenting Python automation slides on large projector screen, audience of working professionals seated attentively, seminar hall with modern seating, professional conference event HD photography"),
    category: "Seminar",
    upcoming: true,
  },
  {
    id: "e4",
    slug: "batch-24-certification-ceremony",
    title: "Batch 24 Certification Ceremony",
    date: "2026-07-10",
    time: "2:00 PM – 5:00 PM",
    location: "Main Campus Auditorium",
    shortDescription: "Celebrating the graduating students of Batch 24 with certificates, guest speakers, and an alumni meet-and-greet.",
    fullDescription: "Our quarterly certification ceremony honoring Batch 24 graduates. Family, friends, and alumni are invited. The program includes distribution of certificates, guest talks from industry professionals, and an alumni networking session.",
    image: ev("DarbarTech Group of Technology batch graduation certification ceremony in Nepal, decorated auditorium stage with flowers and institute logo banner, students on stage receiving certificates from director, audience seated clapping, celebration event HD photography joyful atmosphere"),
    category: "Certification",
    upcoming: false,
  },
  {
    id: "e5",
    slug: "freelancing-info-session",
    title: "Info Session: Turning Your Skills Into Freelance Income",
    date: "2026-07-28",
    time: "3:00 PM – 4:30 PM",
    location: "Online (Zoom) + In-person Lab 2",
    shortDescription: "Hybrid info session covering how our graduates launch freelance careers. Live Q&A with working alumni.",
    fullDescription: "An honest, practical information session about freelance work for IT/design graduates. The session features three DarbarTech alumni working as freelancers sharing their journeys, platform recommendations, and answering all your questions.",
    image: ev("Hybrid freelancing information session at DarbarTech Nepal, panel of three successful Nepali freelancer alumni sitting at table with microphones sharing Upwork Fiverr stories, audience of students taking notes, hybrid setup with video conferencing screen, info session HD photo"),
    category: "Seminar",
    upcoming: false,
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(): EventItem[] {
  return events
    .filter((e) => e.upcoming)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastEvents(): EventItem[] {
  return events
    .filter((e) => !e.upcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
