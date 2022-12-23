import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "test1@example.com",
      username: "test_user1",
      hashedPassword:
        "$2a$10$C6w/P1FALyrQ7Y6zsUljMOKxf8tZxavymQf8WDiX71IIQufBx0/Mu",
      avatar:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1670981381/seven-wonders/avatars/Photo_12-12-2022_21_45_06_xkn6f9.jpg",
      submissions: {
        createMany: {
          data: getPlaces(),
        },
      },
    },
  });
}

function getPlaces() {
  return [
    {
      name: "Rijksmuseum",
      country: "The Netherlands",
      city: "Amsterdam",
      category: "Museum",
      tags: ["Family Friendly", "Cheap"],
      coverImage:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1669875925/seven-wonders/rijksmuseum_bhch2l.jpg",
      budget: 49.99,
      costRating: "Cheap",
    },
    {
      name: "Mount Rushmore",
      country: "USA",
      city: "Denver",
      category: "Historical Site",
      tags: ["Family Friendly", "Cheap"],
      coverImage:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1669875929/seven-wonders/mt-rushmore_xublxg.jpg",
      budget: 49.99,
      costRating: "Affordable",
    },
    {
      name: "Rijksmuseum",
      country: "The Netherlands",
      city: "Amsterdam",
      category: "Museum",
      tags: ["Family Friendly", "Cheap"],
      coverImage:
        "https://res.cloudinary.com/ta1da-cloud/image/upload/v1669875925/seven-wonders/rijksmuseum_bhch2l.jpg",
      budget: 49.99,
      costRating: "Cheap",
    },
  ];
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);
