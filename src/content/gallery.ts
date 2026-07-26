// [PLACEHOLDER GALLERY - replace with real Darbar Computer photos + written consent before launch]

export const GALLERY_CATEGORIES = [
  "All",
  "Campus",
  "Labs",
  "Events",
  "Classes",
  "Certifications",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  date?: string;
  category: Exclude<GalleryCategory, "All">;
  isPlaceholder?: boolean;
}

const GALLERY_SIZE = "square_hd";

const gal = (prompt: string) =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${GALLERY_SIZE}`;

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: gal("Modern computer training institute campus building entrance with DarbarTech branding, glass doors, clean reception area, Kathmandu Nepal architecture aesthetic, sunny day, professional architectural photography, photorealistic"),
    alt: "DarbarTech main campus building entrance",
    title: "Main Campus Entrance",
    date: "2026-01-15",
    category: "Campus",
  },
  {
    id: "g2",
    src: gal("Modern web development computer lab with rows of desktop PCs, young Nepali students writing code on monitors displaying React Next.js syntax highlighted code, instructor walking through aisle, bright LED ceiling lights, clean organized lab interior, professional photography"),
    alt: "Modern computer lab with students practicing",
    title: "Web Development Lab",
    date: "2026-02-10",
    category: "Labs",
  },
  {
    id: "g3",
    src: gal("Hardware and networking lab with network racks Cisco switches routers, students connecting Ethernet cables patch panels, Packet Tracer simulation on monitor, MikroTik router configuration setup, server room LEDs blinking, technical education Nepal, professional lab photography"),
    alt: "Hardware and networking lab equipment",
    title: "Hardware & Networking Lab",
    date: "2026-02-15",
    category: "Labs",
  },
  {
    id: "g4",
    src: gal("Python programming class in session, young Nepali instructor at whiteboard explaining algorithm flow chart, students taking notes and following along on laptops, bright classroom with large windows, engaged students raising hands, classroom education environment Nepal"),
    alt: "Trainer teaching students in a classroom",
    title: "Python Class in Session",
    date: "2026-03-05",
    category: "Classes",
  },
  {
    id: "g5",
    src: gal("Graphic design workshop with creative students working on Wacom tablets and Adobe Photoshop Illustrator on large monitors, designer sketching logo concepts, color palette swatches on desk, creative studio interior, warm inspiring lighting, design training Nepal"),
    alt: "Graphic design students working on projects",
    title: "Graphic Design Workshop",
    date: "2026-03-12",
    category: "Classes",
  },
  {
    id: "g6",
    src: gal("Open house day event at computer training institute, diverse prospective students and parents touring labs, reception desk with welcome sign and brochures, institute booth demonstrations, friendly counselors greeting guests, event day Nepal, professional event photography"),
    alt: "Open house event attendees exploring labs",
    title: "Open House Day — Jan 2026",
    date: "2026-01-25",
    category: "Events",
  },
  {
    id: "g7",
    src: gal("Students presenting final project demo on stage, projector showing full stack web application, young developers explaining their portfolio website to audience, classmates applauding, demo day event at tech institute Nepal, conference room setting"),
    alt: "Students at front of room presenting final project",
    title: "Full-Stack Demo Workshop",
    date: "2026-02-22",
    category: "Events",
  },
  {
    id: "g8",
    src: gal("Tech seminar audience attentively listening to keynote speaker on stage, projector screen showing Python automation slides, large seminar hall with rows of seated participants, professional conference event at IT training institute Nepal, event photography"),
    alt: "Seminar audience listening to speaker",
    title: "Python Automation Seminar",
    date: "2026-03-05",
    category: "Events",
  },
  {
    id: "g9",
    src: gal("Certification ceremony, happy Nepali students receiving DarbarTech certificates on stage from director, proud graduate shaking hands, auditorium stage backdrop, audience clapping, ceremony garlands and flowers, graduation celebration event Nepal, joyful moment"),
    alt: "Students receiving certificates on stage",
    title: "Batch 23 Certification Ceremony",
    date: "2026-04-10",
    category: "Certifications",
  },
  {
    id: "g10",
    src: gal("Group photo of graduating batch, diverse young men and women in smart casual attire proudly displaying their DarbarTech Group of Technology certificates, posing together in institute campus garden, sunny cheerful graduation day Nepal, all smiling for camera"),
    alt: "Group photo of graduating batch with certificates",
    title: "Batch 24 Graduation Group Photo",
    date: "2026-07-10",
    category: "Certifications",
  },
  {
    id: "g11",
    src: gal("Modern student lounge and reception area at DarbarTech, comfortable sofa seating, reception desk with friendly receptionist greeting student, digital notice board showing course schedule, plants and natural lighting, welcoming modern interior design Nepal"),
    alt: "Student lounge and reception area",
    title: "Reception & Student Lounge",
    date: "2026-01-20",
    category: "Campus",
  },
  {
    id: "g12",
    src: gal("Accounting and Tally software training lab, students practicing GST invoicing and inventory management on desktop PCs with Tally Prime open, Excel spreadsheets with financial data, Nepali accountant instructor helping student, organized business lab, professional training Nepal"),
    alt: "Accounting lab with students practicing Tally",
    title: "Accounting & Tally Lab",
    date: "2026-02-28",
    category: "Labs",
  },
];

export function getImagesByCategory(category: GalleryCategory): GalleryImage[] {
  if (category === "All") return galleryImages;
  return galleryImages.filter((g) => g.category === category);
}
