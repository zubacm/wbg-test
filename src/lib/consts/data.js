// export const ExternalShareItems = {
//     FACEBOOK: {
//         text: "Facebook",
//         icon: "fa-brands fa-facebook",
//         link: "https://www.facebook.com/sharer/sharer.php?u=[link]&hashtag=%23Mungos",
//     },
//     WHATS_APP: {
//         text: "Whatsapp",
//         icon: "fa-brands fa-whatsapp",
//         link: "https://wa.me/?text=[link]",
//     },
//     VIBER: {
//         text: "Viber",
//         icon: "fa-brands fa-viber",
//         link: "viber://pa/?text=[link]",
//     },
// }

export const ExternalShareItems = [
  {
    text: "Facebook",
    icon: "fa-brands fa-facebook",
    link: "https://www.facebook.com/sharer/sharer.php?u=[link]",
    share: `https://www.facebook.com/sharer/sharer.php?u=`,
  },
  {
    text: "Whatsapp",
    icon: "fa-brands fa-whatsapp",
    link: "https://wa.me/?text=[link]",
    share: `https://wa.me/?text=`,
  },
  {
    text: "Viber",
    icon: "fa-brands fa-viber",
    link: "viber://pa/?text=[link]",
    share: `viber://forward?text=`,
  },
];
