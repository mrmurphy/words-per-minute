// Select the button and the words per minute display
const startButton = document.getElementById("start-button");
const wordsPerMinuteDisplay = document.getElementById("words-per-minute");
const totalWordsDisplay = document.getElementById("total-words");
const transcriptDisplay = document.getElementById("transcript");

// Create a new Speech Recognition object
const recognition = new webkitSpeechRecognition();

// Set the Speech Recognition options
// recognition.interimResults = true;
recognition.continuous = true;
recognition.lang = "en-US";

let recording = false;

// Add an event listener for the start button click
startButton.addEventListener("click", () => {
  recording = !recording;

  if (!recording) {
    startButton.textContent = "Start";
    recognition.stop();
    return;
  }

  startButton.textContent = "Stop";

  // Reset the words per minute display, total words display, and transcript display
  wordsPerMinuteDisplay.textContent = "0";
  totalWordsDisplay.textContent = "0";
  transcriptDisplay.textContent = "";

  // Start the Speech Recognition
  recognition.start();

  // Set the start time
  const startTime = Date.now();

  // Initialize the word count
  let wordCount = 0;

  // Add an event listener for the interim Speech Recognition result
  recognition.onresult = (event) => {
    // Get the last result
    const result = event.results[event.results.length - 1];

    // Get the transcript
    const transcript = result[0].transcript;

    // Display the transcript
    transcriptDisplay.textContent += transcript;
    transcriptDisplay.scrollTop = transcriptDisplay.scrollHeight;

    // Count the words
    const words = transcript.split(" ").length;
    wordCount += words;

    // Calculate the time difference
    const timeDifference = (Date.now() - startTime) / 1000 / 60;

    // Calculate the words per minute
    const wordsPerMinute = Math.round(wordCount / timeDifference);

    // Display the words per minute and total words
    wordsPerMinuteDisplay.textContent = `${wordsPerMinute}`;
    totalWordsDisplay.textContent = `${wordCount}`;
  };
});
