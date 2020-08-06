const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
};

// Get Quote From API
const getQuote = async (count) => {
  showLoadingSpinner();

  const method = "getQuote";
  const lang = "en";
  const format = "json";
  //const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const proxyUrl = "https://jacinto-cors-proxy.herokuapp.com/";
  const apiUrl = `${proxyUrl}http://api.forismatic.com/api/1.0/?method=${method}&lang=${lang}&format=${format}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    authorText.innerText =
      data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    if (count < 10) {
      getQuote(count + 1);
    } else {
      quoteText.innerText = "Oops, something gone wrong, sorry...";
      removeLoadingSpinner();
    }
  }
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
};

// Event LIsteners
newQuoteBtn.addEventListener("click", () => getQuote(1));
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote(1);
