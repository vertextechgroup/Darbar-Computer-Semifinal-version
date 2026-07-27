// [PLACEHOLDER - do not publish without real student names/photos and their consent]
// Sample testimonials per build document §6.1 and course catalog content §12

import type { Testimonial } from "@/types/testimonial";

const portraitUrls = [
  "https://images.pexels.com/photos/33261955/pexels-photo-33261955.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/33261958/pexels-photo-33261958.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/33261951/pexels-photo-33261951.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/33261956/pexels-photo-33261956.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/34381970/pexels-photo-34381970.jpeg?auto=compress&cs=tinysrgb&w=300",
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sample Student One",
    course: "Full-Stack Web Development",
    quote: "The Full-Stack Web Development course gave me the confidence and portfolio to land my first developer job.",
    rating: 5,
    isPlaceholder: true,
    image: portraitUrls[0],
  },
  {
    id: "t2",
    name: "Sample Student Two",
    course: "Computer Fundamentals & MS Office",
    quote: "I started with zero computer knowledge and left able to handle a full office job.",
    rating: 5,
    isPlaceholder: true,
    image: portraitUrls[4],
  },
  {
    id: "t3",
    name: "Sample Student Three",
    course: "Computer Hardware & Networking",
    quote: "The trainers were patient and the lab time made all the difference for hardware troubleshooting.",
    rating: 5,
    isPlaceholder: true,
    image: portraitUrls[1],
  },
  {
    id: "t4",
    name: "Sample Student Four",
    course: "Graphic Design",
    quote: "The branding project we built in class became the centerpiece of my design portfolio.",
    rating: 4,
    isPlaceholder: true,
    image: portraitUrls[3],
  },
  {
    id: "t5",
    name: "Sample Student Five",
    course: "Digital Marketing",
    quote: "Practical, campaign-focused learning. I ran my first real ad within a month of finishing.",
    rating: 5,
    isPlaceholder: true,
    image: portraitUrls[2],
  },
  {
    id: "t6",
    name: "Sample Student Six",
    course: "Advanced Excel",
    quote: "The dashboards module directly helped me get promoted at my office job.",
    rating: 5,
    isPlaceholder: true,
    image: portraitUrls[4],
  },
];
