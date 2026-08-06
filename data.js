/* =========================================================
   DATA.JS — this is the ONLY file you need to edit to make
   this site yours. Everything below gets read by script.js
   and rendered onto the page automatically.

   Rules:
   - Keep the commas between items.
   - Leave "" empty if you don't want to fill something in.
   - For images: put your image files inside the /images
     folder and reference them like "images/yourfile.jpg"
   ========================================================= */

const SITE_DATA = {

  /* ---------- HERO / PROFILE ---------- */
  profile: {
    name: "YOUR NAME",              // shown big, glitching, in the hero
    taglines: [                     // cycles through these, typewriter-style
      "digital wanderer",
      "collector of niche interests",
      "probably online right now"
    ],
    bio: "A short intro about yourself — a sentence or two is plenty. Say what you're about, what you're into, or just say hi."
  },

  /* ---------- INTERESTS ---------- */
  interests: [
    {
      tag: "01 // SIGNAL",
      title: "Interest One",
      body: "A short description of this interest — why it's on your radar."
    },
    {
      tag: "02 // SIGNAL",
      title: "Interest Two",
      body: "Another short description. Keep these punchy."
    },
    {
      tag: "03 // SIGNAL",
      title: "Interest Three",
      body: "You can add or remove as many of these blocks as you like."
    },
    {
      tag: "04 // SIGNAL",
      title: "Interest Four",
      body: "Just copy this block (the { ... } part) to add another one."
    }
  ],

  /* ---------- FAVORITES, GROUPED BY CATEGORY ---------- */
  favorites: [
    {
      category: "Movies",
      items: [
        { name: "Blade Runner (1982)", note: "obviously" },
        { name: "Movie Two", note: "why you like it" },
        { name: "Movie Three", note: "" }
      ]
    },
    {
      category: "Music",
      items: [
        { name: "Artist / Album", note: "" },
        { name: "Artist / Album", note: "" }
      ]
    },
    {
      category: "Games",
      items: [
        { name: "Game Title", note: "" },
        { name: "Game Title", note: "" }
      ]
    },
    {
      category: "Books",
      items: [
        { name: "Book Title", note: "" }
      ]
    }
  ],

  /* ---------- HOBBIES ---------- */
  hobbies: [
    {
      title: "Hobby One",
      body: "What it is and how long you've been doing it."
    },
    {
      title: "Hobby Two",
      body: "Another hobby. Add as many as you want."
    },
    {
      title: "Hobby Three",
      body: "This section auto-numbers itself, so you don't need to."
    }
  ],

  /* ---------- SOCIAL / CONTACT LINKS ---------- */
  socials: [
    { platform: "Email", handle: "you@example.com", url: "mailto:you@example.com" },
    { platform: "GitHub", handle: "@yourhandle", url: "https://github.com/yourhandle" },
    { platform: "Instagram", handle: "@yourhandle", url: "https://instagram.com/yourhandle" },
    { platform: "Twitter / X", handle: "@yourhandle", url: "https://x.com/yourhandle" },
    { platform: "Discord", handle: "yourhandle", url: "" }
  ]

};