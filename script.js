const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get Quote From API
const getQuote = async () => {
  const method = "getQuote";
  const lang = "en";
  const format = "json";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = `${proxyUrl}http://api.forismatic.com/api/1.0/?method=${method}&lang=${lang}&format=${format}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    authorText = data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;
    data.quoteText.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.innerText = data.quoteText;
  } catch (error) {
    //getQuote();
    console.log("Whoops, no qoute...", error);
  }
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
};

// Event LIsteners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote();
