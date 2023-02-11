// popup.js
import { API_KEY } from './config.js';

const solveButton = document.querySelector('#solve-button');
const output = document.querySelector('#output');

solveButton.addEventListener('click', async () => {
  // Scan the page for questions or math questions

  // Example code for getting the text content of the page:
  const pageText = await new Promise((resolve) => {
    chrome.tabs.executeScript({
      code: 'document.body.innerText',
    }, (result) => {
      resolve(result[0]);
    });
  });

  // Send the questions to the OpenAI API for solving
  const response = await fetch(`https://api.openai.com/v1/engines/davinci/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: pageText,
      max_tokens: 100,
    }),
  });
  const json = await response.json();

  // Display the answers in the output pre element
  output.textContent = json.choices[0].text;
});
