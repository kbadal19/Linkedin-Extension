module.exports = {
  content: [
    "./entrypoints/**/*.{js,ts,jsx,tsx}", // include all source files
    "./public/**/*.html",
  ],
  safelist: [
    "modalpg",
    "w-full",
    "h-full",
    "opacity-55",
    "bg-black", // classes you're using dynamically
  ],
};
