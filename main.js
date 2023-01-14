const { Configuration, OpenAIApi } = require("openai");
var prompt = require("prompt-sync")();
const chalk = require("chalk");

// Config

const API_KEY = "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";
const configuration = new Configuration({
  organization: "org-8XgaqbFgRqUDio8odgHi8td1",
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

// Functions
async function getData(text = "") {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0,
    max_tokens: 1000,
  });

  console.log("Answer: ");
  return response.data.choices[0].text;
}

function clearChat() {
  process.stdout.write("\033c");
}

async function main() {
  while (1) {
    console.log(
      chalk.yellow("Hi! I am terminal GPT, How can help you?") +
        chalk.gray("\n(Enter -1 for exit program)\n(Enter clear for clear chat)")
    );
    input = prompt(">>> ");

    if (input == -1) break;
    else if (input == "clear") {
      clearChat();
      continue;
    }

    console.log(chalk.gray("Loading..."));
    console.log(chalk.magentaBright(await getData(input), "\n"));
  }
}
main();
