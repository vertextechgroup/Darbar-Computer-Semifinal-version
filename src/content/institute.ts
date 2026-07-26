// [PLACEHOLDER INSTITUTE CONTENT - replace all [PLACEHOLDER] values before launch]
// Per build document §6.1 (Footer), §6.5 (About), §6.9 (Contact)

export const instituteInfo = {
  name: "DarbarTech",
  tagline: "GROUP OF TECHNOLOGY",
  about: {
    story:
      "[PLACEHOLDER — Institute story: Darbar Computer was founded in XXXX with a mission to make quality computer education accessible and affordable in Nepal. Over the years we have trained thousands of students across programming, design, accounting, and hardware disciplines. Our approach blends strong theory with extensive hands-on lab practice, under the guidance of certified, industry-experienced trainers.]",
    mission:
      "To empower every student with practical, job-ready digital skills through high-quality, affordable, and hands-on computer training — and to support them in their first career step after graduation.",
    vision:
      "To be the most trusted computer training institute in the region, known for producing skilled, ethical, and career-ready professionals in every field of information technology.",
  },
  contact: {
    phone: "[PLACEHOLDER: +977-XX-XXXXXXX]",
    whatsapp: "[PLACEHOLDER: +977-XX-XXXXXXX]",
    email: "info@darbarcomputer.edu.np",
    address: "[PLACEHOLDER: Full Street Address, Kathmandu, Nepal]",
    mapEmbed:
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.940!2d85.3!3d27.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sPLACEHOLDER!2sPLACEHOLDER!5e0!3m2!1sen!2snp!4vPLACEHOLDER" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  },
  hours: [
    { day: "Sunday – Friday", time: "7:00 AM – 8:00 PM" },
    { day: "Saturday", time: "8:00 AM – 6:00 PM" },
    { day: "Public Holidays", time: "Closed (except pre-announced events)" },
  ],
  socials: [
    { name: "Facebook", url: "https://facebook.com/darbarcomputer", icon: "facebook" },
    { name: "Instagram", url: "https://instagram.com/darbarcomputer", icon: "instagram" },
    { name: "YouTube", url: "https://youtube.com/@darbarcomputer", icon: "youtube" },
    { name: "LinkedIn", url: "https://linkedin.com/company/darbarcomputer", icon: "linkedin" },
  ],
  stats: [
    { label: "Years of Training Excellence", value: "12+", isPlaceholder: true },
    { label: "Students Trained", value: "3,000+", isPlaceholder: true },
    { label: "Courses Offered", value: "15" },
    { label: "Certification Rate", value: "98%", isPlaceholder: true },
  ],
  whyChooseUs: [
    {
      title: "Certified & Experienced Trainers",
      description: "Our trainers hold industry certifications and years of real-world experience in the fields they teach.",
      icon: "award",
    },
    {
      title: "Practical Lab Access",
      description: "Dedicated, fully equipped computer labs with ample hands-on practice time in every session.",
      icon: "monitor",
    },
    {
      title: "Placement Support",
      description: "Career guidance, resume/GitHub portfolio help, and introductions to our hiring partner network.",
      icon: "briefcase",
    },
    {
      title: "Flexible Batches",
      description: "Morning, day, and evening batches to fit students, working professionals, and school-goers.",
      icon: "clock",
    },
    {
      title: "Affordable Installments",
      description: "Transparent pricing with 2–3 part installment plans available for eligible courses.",
      icon: "wallet",
    },
    {
      title: "Government-Recognized Certification",
      description: "[Verify claim before publishing] Certificates issued per institute policy.",
      icon: "checkCircle",
      isPlaceholder: true,
    },
  ],
  team: [
    {
      id: "tm1",
      name: "[PLACEHOLDER: Director Name]",
      role: "Founder & Director",
      specialty: "Institute Leadership & Strategy",
      image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Professional portrait of Nepali executive director in business suit, warm confident smile, modern office background with bookshelf, professional headshot photography, 4K HD, photorealistic")}&image_size=square_hd`,
      isPlaceholder: true,
    },
    {
      id: "tm2",
      name: "[PLACEHOLDER: Trainer Name]",
      role: "Senior Programming Trainer",
      specialty: "Full-Stack Web Development, Python",
      image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Professional portrait of young Nepali software developer trainer, smart casual attire, coding on laptop in background blurred, friendly approachable expression, professional headshot photography HD photorealistic")}&image_size=square_hd`,
      isPlaceholder: true,
    },
    {
      id: "tm3",
      name: "[PLACEHOLDER: Trainer Name]",
      role: "Design Department Head",
      specialty: "Graphic Design, UI/UX, Video Editing",
      image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Creative portrait of Nepali graphic designer woman artist, stylish modern look, background with design studio Wacom tablet color swatches, warm studio lighting, confident smile, HD professional photography photorealistic")}&image_size=square_hd`,
      isPlaceholder: true,
    },
    {
      id: "tm4",
      name: "[PLACEHOLDER: Trainer Name]",
      role: "Hardware & Networking Trainer",
      specialty: "Hardware, Networks, IT Support",
      image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Professional portrait of Nepali IT network engineer trainer, working with server network rack background Ethernet cables, confident technical expression, professional attire HD photorealistic portrait")}&image_size=square_hd`,
      isPlaceholder: true,
    },
  ],
  facilities: [
    "Fully-equipped computer labs with modern PCs",
    "High-speed Wi-Fi throughout the campus",
    "Dedicated project studio for design/video students",
    "Hardware lab for hands-on assembly and networking practice",
    "Student library with course reference books",
    "Counseling room for one-on-one career guidance",
  ],
  gallery: [
    { id: "g1", category: "Classroom", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("MS Office computer class in Nepal, students learning Word Excel on desktop PCs, young Nepali instructor helping student at desk, bright modern classroom, professional education institute, HD photography photorealistic")}&image_size=square_hd`, alt: "Students in classroom training" },
    { id: "g2", category: "Lab", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Modern coding computer lab with rows of desktop monitors displaying programming code, students coding React JavaScript Python, Nepali institute interior, professional lab photography, photorealistic HD")}&image_size=square_hd`, alt: "Computer lab" },
    { id: "g3", category: "Lab", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Hardware networking lab, students assembling PC motherboards RAM, network cables routers switches on benches, technician instructor guiding, computer hardware training Nepal, hands-on lab HD photography photorealistic")}&image_size=square_hd`, alt: "Hardware lab" },
    { id: "g4", category: "Events", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Certification ceremony celebration at DarbarTech Group of Technology Nepal, happy students receiving certificate from director on decorated stage, audience clapping, garlands and ceremony decorations, joyful event photography HD photorealistic")}&image_size=square_hd`, alt: "Certification ceremony" },
    { id: "g5", category: "Classroom", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Nepali computer trainer teaching programming course, pointing to projector screen showing Java code, engaged students looking attentively, modern classroom, professional education environment, HD photo photorealistic")}&image_size=square_hd`, alt: "Trainer with students" },
    { id: "g6", category: "Certificates", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Proud Nepali student receiving DarbarTech certificate during ceremony, smiling student shaking hands with institute director on stage, certificate in hand, graduation celebration moment, HD photography photorealistic")}&image_size=square_hd`, alt: "Student receiving certificate" },
    { id: "g7", category: "Events", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Open house event at Nepali IT training institute, prospective students parents visiting, reception booth with course brochures, staff counselor talking to family, campus tour event, welcoming atmosphere HD photo")}&image_size=square_hd`, alt: "Open house event" },
    { id: "g8", category: "Lab", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("CCNA networking lab, students configuring Cisco MikroTik routers, network rack with patch panel Ethernet cables, Packet Tracer simulation on monitors, hands-on networking training Nepal, professional HD photo")}&image_size=square_hd`, alt: "Networking practice" },
    { id: "g9", category: "Certificates", image: `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent("Group photo of graduating students at DarbarTech Nepal, all proudly displaying certificates, diverse young men women wearing formal clothes, campus lawn sunny day, big smiling happy group, HD group photography photorealistic")}&image_size=square_hd`, alt: "Group photo with certificates" },
  ],
  galleryCategories: ["All", "Classroom", "Lab", "Events", "Certificates"],
};
