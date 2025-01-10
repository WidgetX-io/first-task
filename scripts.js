let headlines = [];
let currentIndex = -1;

const headlineText = document.getElementById("headline-text");
const fontFamily = document.getElementById("font-family");
const fontSize = document.getElementById("font-size");
const padding = document.getElementById("padding");
const border = document.getElementById("border");
const color = document.getElementById("color");
const backgroundColor = document.getElementById("background-color");
const textAlign = document.getElementById("text-align");
const textTransform = document.getElementById("text-transform");
const fontStyle = document.getElementById("font-style");
const hyperlink = document.getElementById("hyperlink");
const linkColor = document.getElementById("link-color");
const preview = document.getElementById("headline-preview");
const htmlCode = document.getElementById("html-code");
const cssCode = document.getElementById("css-code");
const generateButton = document.getElementById("generate-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const list_headline_target = document.getElementById("list-headlines");

function updatePreview() {
  const text = headlineText.value || "Your headline will appear here";
  const family = fontFamily.value;
  const size = fontSize.value || 16;
  const pad = padding.value || 10;
  const bord = border.value || "none";
  const col = color.value;
  const bgCol = backgroundColor.value;
  const align = textAlign.value;
  const transform = textTransform.value;
  const style = fontStyle.value;
  const link = hyperlink.value;
  const linkCol = linkColor.value;

  preview.style.fontFamily = family;
  preview.style.fontSize = size + "px";
  preview.style.padding = pad + "px";
  preview.style.border = bord;
  preview.style.color = col;
  preview.style.backgroundColor = bgCol;
  preview.style.textAlign = align;
  preview.style.textTransform = transform;
  preview.style.fontWeight = style === "bold" ? "bold" : "normal";
  preview.style.fontStyle = style === "italic" ? "italic" : "normal";

  if (link) {
    preview.innerHTML = `<a href="${link}" style="color: ${linkCol}; text-decoration: none;">${text}</a>`;
  } else {
    preview.textContent = text;
  }

  htmlCode.textContent = link
    ? `<a href="${link}">${text}</a>`
    : `<h1>${text}</h1>`;

  cssCode.textContent = `.headline {
font-family: ${family};
font-size: ${size}px;
padding: ${pad}px;
border: ${bord};
color: ${col};
background-color: ${bgCol};
text-align: ${align};
text-transform: ${transform};
font-weight: ${style === "bold" ? "bold" : "normal"};
font-style: ${style === "italic" ? "italic" : "normal"};
}`;
}

function addToList(headline) {
  const li = document.createElement("li");
  li.innerHTML = headline.html;
  li.setAttribute("data-code", JSON.stringify(headline));
  list_headline_target.appendChild(li);
}
generateButton.addEventListener("click", () => {
  updatePreview();
  const headline = {
    html: htmlCode.textContent,
    css: cssCode.textContent,
  };

  headlines.push(headline);
  addToList(headline);
  currentIndex = headlines.length - 1;
});

previousButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    const headline = headlines[currentIndex];
    htmlCode.textContent = headline.html;
    cssCode.textContent = headline.css;
    preview.innerHTML = headline.html;
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < headlines.length - 1) {
    currentIndex++;
    const headline = headlines[currentIndex];
    htmlCode.textContent = headline.html;
    cssCode.textContent = headline.css;
    preview.innerHTML = headline.html;
  }
});
