const { Configuration, OpenAIApi } = require("openai");
var prompt = require("prompt-sync")();
const chalk = require("chalk");

const configuration = new Configuration({
  organization: prompt("Enter Organization Key: "),
  apiKey: prompt("Enter API Key: "),
});

var openai = new OpenAIApi(configuration);

// Functions
async function getData(text = "") {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 1000,
    });
    console.log("Answer: ");
    return response.data.choices[0].text;
  } catch (error) {
    console.log(chalk.redBright("There is a error check api key or organization key!"));
    return -1;
  }
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

    const data = await getData(input);
    if (data == -1) {
      break;
    }

    console.log(chalk.gray("Loading..."));
    console.log(chalk.magentaBright(data, "\n"));
  }
}
main();
