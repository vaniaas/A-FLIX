import { assetPath } from "../lib/assets";

export const heroContent = {
  title: "Catatan dan Soal",
  description:
    "Website ini berisi catatan dan soal-soal yang dibuat oleh Vincent, Stefanus, dan Vania, plus koleksi soal bagus yang ditemukan dari internet.",
  backgroundImage: assetPath("images/joshy-heist.png"),
};

export const originals = [
  {
    title: "Stefanus Kurus",
    image: assetPath("images/stefanuskurus.jpg"),
  },
  {
    title: "Stefanus Oplas",
    image: assetPath("images/stefanusoplas.jpg"),
  },
  {
    title: "Jos Absurd",
    image: assetPath("images/josabsurd.png"),
  },
  {
    title: "Vincent Wibu",
    image: assetPath("images/vincentwibu.jpg"),
  },
];

export const libraries = [
  {
    id: "home",
    label: "Home",
    items: [],
  },
  {
    id: "primary",
    label: "Primary",
    items: [
      {
        title: "Olympiad",
        href: "https://drive.google.com/drive/folders/19KJPfmvugbJgp5zgQHWm__WYvSDB92vo?usp=sharing",
      },
      {
        title: "Sample Test Paper",
        href: "https://drive.google.com/drive/folders/19GNhYAoJ0C0dXcN-eHwCnwwUSj-12Elr?usp=sharing",
      },
      {
        title: "Chemistry IB",
        href: "https://drive.google.com/drive/folders/1DLVHYQ6WWlP1v26XJ13yqDC-6g1i_0Yq?usp=sharing",
      },
    ],
  },
  {
    id: "secondary",
    label: "Secondary",
    items: [
      {
        title: "Sec 1 / Kelas 7",
        href: "https://drive.google.com/drive/folders/1WKsG938rm-YJCi9IiICwHeFfxH3MwS-d?usp=sharing",
      },
      {
        title: "Sec 2 / Kelas 8",
        href: "https://drive.google.com/drive/folders/10ODXlshVE33tM5L8Y7yvasZ1auOcyms9?usp=sharing",
      },
      {
        title: "Sec 3 / Kelas 9",
        href: "https://drive.google.com/drive/folders/1tOi78iBxdf70t6tM13-WVPec8nNDuN5h?usp=sharing",
      },
      {
        title: "Olympiad",
        href: "https://drive.google.com/drive/folders/1N0t8WZHYMXfO_RVcF-hr6ONLXAWYZa0f?usp=sharing",
      },
    ],
  },
  {
    id: "juniorcollege",
    label: "Junior College",
    items: [
      {
        title: "Sec 4 / Kelas 10",
        href: "https://drive.google.com/drive/folders/1HVO_W0-RpZQgpMB40aVj9oUbms_U-89b?usp=sharing",
      },
      {
        title: "Olympiad",
        href: "https://drive.google.com/drive/folders/1NUSWKuRgMyTvbL73ZGmwrYKSHFF4Ivt2",
      },
    ],
  },
];
