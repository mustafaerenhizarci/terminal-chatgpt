const { Configuration, OpenAIApi } = require("openai");
const chalk = require("chalk");

var prompt = require("prompt-sync")();

async function main() {
  var loader = (function () {
    var P = ["Loading [\\] ", "Loading [|] ", "Loading [|] ", "Loading [-] "];
    var x = 0;
    return setInterval(function () {
      process.stdout.write("\r" + chalk.blueBright(P[x++]));
      x &= 3;
    }, 300);
  })();

  var keys = await getKeys();
  console.log(
    chalk.yellow("Hi! I am terminal GPT, How can help you?") +
      chalk.gray("\n(-1 for exit program)\n(Write clear for clear chat)")
  );

  while (1) {
    input = prompt(">>> ");

    if (input == -1) break;
    else if (input == "clear") {
      clearChat();
      continue;
    }

    const data = await getData(input, keys);
    if (data == -1) {
      break;
    }

    console.log(chalk.bold.blue(data, "\n\n\n"));
  }
  clearInterval(loader);
}
main();

// Functions

async function getKeys() {
  const url = "https://portfolio-backend.cyclic.app/keys";
  var response;

  try {
    response = await fetch(url).then((res) => res.json());
    console.log(chalk.bgGreen.bold("\nApi Key Received Succesfully!\n\n"));
  } catch {
    console.log(chalk.bgRedBright.bold("\nAn error happened while getting Api Key!\n\n"));
  }
  return response;
}

async function getData(text = "", keys) {
  const configuration = new Configuration({
    organization: keys.CHATGPT_ORG_KEY,
    apiKey: keys.CHATGPT_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0,
      max_tokens: 1000,
    });
    console.log("\n\nAnswer: ");
    return response.data.choices[0].text;
  } catch (error) {
    console.log(chalk.redBright("\n\nAn error happened reason: "));
    console.log(chalk.bold(error.response.statusText));
    return -1;
  }
}

function clearChat() {
  process.stdout.write("\033c");
}
