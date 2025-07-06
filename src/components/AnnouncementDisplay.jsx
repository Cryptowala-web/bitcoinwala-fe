"use client";

import { CardBody, CardContainer, CardItem } from "./3dCard";

// const announcements = [
//   {
//     id: 1,
//     title: "System Maintenance",
//     description: "Our systems will be down for maintenance on July 5th.",
//     expiryDate: "2025-07-06",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&q=80",
//   },
//   {
//     id: 1,
//     title: "System Maintenance",
//     description: "Our systems will be down for maintenance on July 5th.",
//     expiryDate: "2025-07-06",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&q=80",
//   },
//   {
//     id: 1,
//     title: "System Maintenance",
//     description: "Our systems will be down for maintenance on July 5th.",
//     expiryDate: "2025-07-06",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&q=80",
//   },
//   {
//     id: 1,
//     title: "System Maintenance",
//     description: "Our systems will be down for maintenance on July 5th.",
//     expiryDate: "2025-07-06",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&q=80",
//   },
//   {
//     id: 1,
//     title: "System Maintenance",
//     description: "Our systems will be down for maintenance on July 5th.",
//     expiryDate: "2025-07-06",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&q=80",
//   },
// ];

export function ThreeDCardDemo({ announcements }) {
  function formatDatePretty(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-8 gap-y-0 p-4">
      {announcements.map((announcement) => (
        <CardContainer key={announcement.id} className="inter-var">
          <CardBody
            className="
              bg-gray-50 
              relative 
              group/card 
              dark:hover:shadow-2xl 
              dark:hover:shadow-emerald-500/[0.1] 
              dark:bg-black 
              dark:border-white/[0.2] 
              border-black/[0.1] 
              w-full 
              rounded-xl 
              p-6 
              border
            "
          >
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-800 dark:text-white"
            >
              {announcement.title}
            </CardItem>

            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
            >
              {announcement.description}
            </CardItem>

            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="w-full mt-4"
            >
              <img
                src={announcement.image}
                alt={announcement.title}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              />
            </CardItem>

            <div className="flex justify-between items-center mt-6">
              <CardItem
                translateZ={20}
                translateX={-40}
                as="div"
                className="text-xs font-normal text-neutral-600 dark:text-neutral-300"
              >
                Expires: {formatDatePretty(announcement.expiry_date)}
              </CardItem>
              {/* <CardItem
                translateZ={20}
                translateX={40}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                Learn More
              </CardItem> */}
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
