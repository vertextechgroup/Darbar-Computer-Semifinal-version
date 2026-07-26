// [PLACEHOLDER - do not publish without real student names/photos and their consent]
// Sample testimonials per build document §6.1 and course catalog content §12

import type { Testimonial } from "@/types/testimonial";

const tm = (p: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(p)}&image_size=square_hd`;

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sample Student One",
    course: "Full-Stack Web Development",
    quote: "The Full-Stack Web Development course gave me the confidence and portfolio to land my first developer job.",
    rating: 5,
    isPlaceholder: true,
    image: tm("Professional headshot portrait of happy young Nepali male software developer graduate, smart casual collared shirt, warm friendly smile, modern tech office background with laptop showing code blurred, professional headshot HD photorealistic"),
  },
  {
    id: "t2",
    name: "Sample Student Two",
    course: "Computer Fundamentals & MS Office",
    quote: "I started with zero computer knowledge and left able to handle a full office job.",
    rating: 5,
    isPlaceholder: true,
    image: tm("Professional headshot portrait of smiling young Nepali woman office administrator graduate, modest professional blouse, warm confident expression, bright modern office background with MS Excel on desktop blurred, professional headshot HD photorealistic"),
  },
  {
    id: "t3",
    name: "Sample Student Three",
    course: "Computer Hardware & Networking",
    quote: "The trainers were patient and the lab time made all the difference for hardware troubleshooting.",
    rating: 5,
    isPlaceholder: true,
    image: tm("Professional headshot portrait of confident young Nepali male hardware network technician graduate, technician polo shirt, background with network rack routers cables blurred, technical trustworthy expression, HD portrait photorealistic"),
  },
  {
    id: "t4",
    name: "Sample Student Four",
    course: "Graphic Design",
    quote: "The branding project we built in class became the centerpiece of my design portfolio.",
    rating: 4,
    isPlaceholder: true,
    image: tm("Creative headshot portrait of artistic young Nepali woman graphic designer graduate, stylish top with colorful accents, creative studio background Wacom tablet Illustrator screen blurred, vibrant friendly smile, HD portrait photorealistic"),
  },
  {
    id: "t5",
    name: "Sample Student Five",
    course: "Digital Marketing",
    quote: "Practical, campaign-focused learning. I ran my first real ad within a month of finishing.",
    rating: 5,
    isPlaceholder: true,
    image: tm("Professional headshot portrait of driven young Nepali male digital marketing specialist graduate, smart business casual shirt, background with Google Analytics dashboard blurred on monitor, ambitious confident expression, HD portrait photorealistic"),
  },
  {
    id: "t6",
    name: "Sample Student Six",
    course: "Advanced Excel",
    quote: "The dashboards module directly helped me get promoted at my office job.",
    rating: 5,
    isPlaceholder: true,
    image: tm("Professional headshot portrait of cheerful young Nepali woman accountant data analyst graduate, professional office outfit, background with Power BI dashboard Excel spreadsheets blurred on monitor, proud accomplished smile, HD portrait photorealistic"),
  },
];
