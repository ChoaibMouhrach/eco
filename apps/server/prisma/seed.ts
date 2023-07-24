import { PrismaClient } from "@prisma/client";
import { dirname, join } from "path";
import { copyFileSync, readdir } from "fs";

const rootDir = dirname(__dirname);

const db = new PrismaClient();

const main = async () => {
  await Promise.all([
    db.orderState.createMany({
      data: [
        {
          name: "Pending",
        },
        {
          name: "Progress",
        },
        {
          name: "Completed",
        },
      ],
    }),
    db.role.createMany({
      data: [
        {
          name: "member",
        },
        {
          name: "admin",
        },
      ],
    }),

    db.category.create({
      data: {
        name: "Tech",
      },
    }),

    db.unit.create({
      data: {
        name: "Piece",
      },
    }),

    db.tag.createMany({
      data: [
        {
          name: "Tech",
        },
        {
          name: "Innovation",
        },
      ],
    }),
  ]);

  await Promise.all([
    db.product.create({
      data: {
        name: 'ASUS Vivobook S14 OLED S1403ZA-KM116W 14" OLED 2.8k Laptop (Intel Core i5 12500H, 8G RAM, 512 GB PCIE SSD, Windows 11) French QWERTY Keyboard + Fingerprint Reader',
        description:
          "Equipped with 12th Gen Intel Core i5-12500H processor (2.5 GHz up to 4.5 GHz, 18M Cache, 12 cores) boosted by 8GB of fast memory and 512GB of M.2 NVMe PCIe 3.0 SSD storage\r\n16:10 aspect ratio, 2880 x 1800 OLED resolution, 90 Hz refresh rate, 600 nits peak brightness, NanoEdge on three sides, 0.2 ms response time, 100% DCI-P3 color gamut, PANTONE Validated, 1,000,000:1 contrast ratio, TUV RheinLand Certified\r\nThe Vivobook 14X OLED is anything but ordinary, sporting a sleek design and two vibrant colorways. It's thin enough (1.99 cm) to slip discreetly into any backpack and light enough (1.6 kg) to be carried with one hand\r\nWith long-lasting 70 watt-hour batteries, ASUS laptops with H-series processors deliver enough battery life to keep up with your busy life. Zero compromise on productivity and leisure\r\nASUS IceCool thermal technology in the Vivobook 14X OLED uses improved heat pipes, along with an IceBlade fan that efficiently accelerates heat transfer. The 87-blade fan and impeller are made from a liquid crystal polymer, making them lighter and thinner than traditional fans\r\nVivobook 14X OLED features a precision-engineered 180° hinge that lays the laptop flat so you can easily share content or collaborate with those around you\r\nConnectivity: 1x USB 2.0 Type-A, 1x USB 3.2 Gen 1 Type-C, 2x USB 3.2 Gen 1 Type-A, 1x HDMI 1.4, 1x 3.5mm Combo Audio Jack, 1x DC-in",
        price: 699,
        quantity: 12,
        isExclusive: true,
        categoryId: 1,
        unitId: 1,
        tags: {
          connect: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
        images: {
          createMany: {
            data: [
              "storage/images/asus1.jpg",
              "storage/images/asus2.jpg",
              "storage/images/asus3.jpg",
              "storage/images/asus4.jpg",
            ].map((path) => ({
              path,
            })),
          },
        },
      },
    }),

    db.product.create({
      data: {
        name: "Redragon S101 Gaming Keyboard, M601 Mouse, RGB Backlit Gaming Keyboard, Programmable Backlit Gaming Mouse, Value Combo Set [New Version]",
        description: `About this item
          PC GAMING KEYBOARD AND GAMING MOUSE COMBO: Includes Redragon RGB Backlit Computer Gaming Keyboard and RGB Backlit Gaming Mouse. ALL-IN-ONE PC GAMER VALUE KIT, Fantastic for Gamers (New Improved Version)
          RGB BACKLIT GAMING KEYBOARD; 7 different RGB Lighting modes & effects, 4 backlight brightness levels, adjustable breathing speed. The keycaps offering clear uniform backlighting WIN key can be disabled for gaming. The PC Gaming Keyboard has been ergonomically designed to be a superb typing tool for office work as well. The gaming Keyboard is built to withstand the average liquid spill. The integrated wrist rest gives you the comfort you need for marathon gaming sessions
          MULTI MEDIA & ANTI GHOSTING; The Gaming Keyboard has 25 conflict free (n-Key Rollover) 10 Dedicated Multimedia keys plus 12 additional FN+ Multimedia keys (Total 114 keys). Keys are quiet, designed for longevity, durability delivering precise tactile feedback. Comes with Full numeric keypad and a gold-plated corrosion free USB connector for a reliable connection and ultimate Gaming performance
          WIRED GAMING MOUSE; Ergonomic Redragon RED Backlit Gaming Mouse up to 3200 DPI (user adjustable 800/1600/2400/3200 DPI), 30G acceleration and Weight Tuning set. Total 6 Buttons of which 5 are programmable. The High-Precision Sensor delivers Pinpoint Accuracy while the Gaming Grade Micro Switches ensure longevity, greater durability and extreme responsiveness, giving you an even greater edge over your competition
          PC GAMING KEYBOARD AND GAMING MOUSE COMPATIBILITY: Windows 10, Windows 8, Windows 7, Windows Vista, or Windows XP, Limited Mac OS keyboard support. Works well with all major Computers Brands and Gaming PCs.
          Note: Products with electrical plugs are designed for use in the US. Outlets and voltage differ internationally and this product may require an adapter or converter for use in your destination. Please check compatibility before purchasing.`,
        price: 39.99,
        quantity: 125,
        isExclusive: true,
        categoryId: 1,
        unitId: 1,
        tags: {
          connect: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
        images: {
          createMany: {
            data: [
              "storage/images/keyboard.jpg",
              "storage/images/keyboard2.jpg",
              "storage/images/keyboard3.jpg",
            ].map((path) => ({
              path,
            })),
          },
        },
      },
    }),

    db.product.create({
      data: {
        name: "Apple Watch Series 8 [GPS 45mm] Smart Watch w/Midnight Aluminum Case with Midnight Sport Band - M/L. Fitness Tracker, Blood Oxygen & ECG Apps, Always-On Retina Display, Water Resistant",
        description: `WHY APPLE WATCH SERIES 8 — Your essential companion for a healthy life is now even more powerful. Advanced sensors provide insights to help you better understand your health. New safety features can get you help when you need it. The bright, Always-On Retina display is easy to read, even when your wrist is down.
EASILY CUSTOMIZABLE — Available in a range of sizes and materials, with dozens of bands to choose from and watch faces with complications tailored to whatever you’re into.
INNOVATIVE SAFETY FEATURES — Crash Detection and Fall Detection can automatically connect you with emergency services in the event of a severe car crash or a hard fall. And Emergency SOS provides urgent assistance with the press of a button.
ADVANCED HEALTH FEATURES — Temperature sensing is a breakthrough feature that provides deep insights into women’s health. Keep an eye on your blood oxygen. Take an ECG anytime. Get notifications if you have an irregular rhythm. And see how much time you spent in REM, Core, or Deep sleep with Sleep Stages.
SIMPLY COMPATIBLE — It works seamlessly with your Apple devices and services. Unlock your Mac automatically. Find your devices with a tap. Pay and send money with Apple Pay. Apple Watch requires an iPhone 8 or later with the latest iOS version.
INCREDIBLE DURABILITY — Tougher than tough. It’s crack resistant, IP6X-certified dust resistant, and swimproof with WR50 water resistance.
A POWERFUL FITNESS PARTNER — The enhanced Workout app gives you new ways to train, and advanced metrics for more information about your workout performance. And Apple Watch comes with three months of Apple Fitness+ free.`,
        price: 355.0,
        quantity: 25,
        isExclusive: true,
        categoryId: 1,
        unitId: 1,
        tags: {
          connect: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
        images: {
          createMany: {
            data: [
              "storage/images/applewatch.jpg",
              "storage/images/applewatch2.jpg",
              "storage/images/applewatch3.jpg",
            ].map((path) => ({
              path,
            })),
          },
        },
      },
    }),

    db.product.create({
      data: {
        name: "Apple AirPods Pro (2nd Generation) Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive Transparency, Personalized Spatial Audio, MagSafe Charging Case, Bluetooth Headphones for iPhone",
        description: `RICHER AUDIO EXPERIENCE – The Apple-designed H2 chip pushes advanced audio performance even further, resulting in smarter noise cancellation and more immersive sound. The low-distortion, custom-built driver delivers crisp, clear high notes and deep, rich bass in stunning definition. So every sound is more vivid than ever..Note : If the size of the earbud tips does not match the size of your ear canals or the headset is not worn properly in your ears, you may not obtain the correct sound qualities or call performance. Change the earbud tips to ones that fit more snugly in your ear
NEXT-LEVEL ACTIVE NOISE CANCELLATION – Up to 2x more Active Noise Cancellation than the previous AirPods Pro for dramatically less noise on your commute, or when you want to focus. Adaptive Transparency lets you comfortably hear the world around you, adjusting for intense noise—like sirens or construction—in real time.
CUSTOMIZABLE FIT – Now with four pairs of silicone tips (XS, S, M, L) to fit a wider range of ears and provide all-day comfort. The tips create an acoustic seal to help keep out noise and secure AirPods Pro in place.
SOUND ALL AROUND – Personalized Spatial Audio surrounds you in sound tuned just for you. It works with dynamic head tracking to immerse you deeper in music and movies.
HIGHER LEVEL OF CONTROL – Now you can swipe the stem to adjust volume. Press it to play and pause music or to answer and end a call, or hold it to switch between Active Noise Cancellation and Adaptive Transparency.
A LEAP IN BATTERY LIFE – Up to 6 hours of listening time with Active Noise Cancellation enabled — 33% more than AirPods Pro (1st generation). With the charging case, you can get 30 hours of total listening time with Active Noise Cancellation enabled — 6 hours longer than AirPods Pro (1st generation).
A MORE CAPABLE CASE – Keep track of AirPods Pro with Precision Finding and a built-in speaker. A lanyard loop keeps your AirPods Pro close. Charge with an Apple Watch or MagSafe charger, or use the Lightning connector or a Qi-certified charger.
MAGICAL EXPERIENCE – Quick access to Siri by saying “Hey Siri”. Easy setup, in-ear detection, and automatic switching between devices. Audio Sharing lets you share a song or a show between two sets of AirPods on your iPhone, iPad, iPod touch, or Apple TV`,
        price: 400.0,
        quantity: 15,
        isExclusive: false,
        categoryId: 1,
        unitId: 1,
        tags: {
          connect: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
        images: {
          createMany: {
            data: [
              "storage/images/applepods1.jpg",
              "storage/images/applepods2.jpg",
              "storage/images/applepods3.jpg",
            ].map((path) => ({
              path,
            })),
          },
        },
      },
    }),

    readdir(
      join(rootDir, "storage/images/default/products"),
      (error, files) => {
        if (error) console.log(error);
        const productsPath = join(rootDir, "storage/images/default/products");
        files.forEach(async (file) => {
          copyFileSync(
            join(productsPath, file),
            join(rootDir, "storage/images", file)
          );
        });
      }
    ),
  ]);

  console.log("Done");
};

main();
