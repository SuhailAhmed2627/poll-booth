const switchDarkMode = () => {
   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = "http://localhost:3000/CSS/dark-theme.css";
      document.head.appendChild(link);
   }
};

export default switchDarkMode;
