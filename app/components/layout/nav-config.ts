import { paths } from "~/lib/paths";

export const NAV_CONFIG = [
  {
    title: "รายการรถ",
    url: "#",
    children: [
      {
        title: "รถแชมป์",
        url: paths.cars.owner.list,
      },
      {
        title: "รถฝากขาย",
        url: paths.cars.consignment.list,
      },
    ],
  },
  {
    title: "คำขอ",
    url: "#",
    children: [
      {
        title: "ฝากขายรถ",
        url: paths.requests.selling.consignment,
      },
      {
        title: "ขายรถ",
        url: paths.requests.selling.owner,
      },
      {
        title: "ประเมินราคา",
        url: paths.requests.estimate,
      },
    ],
  },
];
