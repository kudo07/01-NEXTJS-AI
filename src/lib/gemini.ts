import { GoogleGenerativeAI } from "@google/generative-ai";

// It's a good practice to validate the API key at startup.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const aiSummariseCommit = async (diff: string): Promise<string> => {
  // Add a check for an empty diff to avoid unnecessary API calls.
  if (!diff || diff.trim() === "") {
    console.log("Diff is empty, returning a default message.");
    return "No changes to summarize.";
  }

  try {
    const prompt = [
      `You are an expert programmer, and you are trying to summarize a git diff. Reminders about the git diff format: For every file, there are a few metadata lines, like (for example): ''' diff --git a/lib/index.js b/lib/index.js index aadf691..bfef603 100644 ---a/lib/index.js +++ b/lib/index.js ''' This means that 'lib/index.js' was modified in this commit. Note that this is only an example. Then there is a specifier of the lines that were modified. A line starting with '+' means it was added. A line that starting with '-' means that line was deleted. A line that starts with neither '+' nor '-' is code given for context and better understanding. It is not part of the diff. [...] EXAMPLE SUMMARY COMMENTS: ''' * Raised the amount of returned recordings from '10' to '100' [packages/server/recordings_api.ts], [package/server/constants.ts] * Fixed a type in the github action name [.github/workflows/gpt-commit-summarizer.yml] * Moved the 'octokit' initalization to a seperate file [src/octokit.ts], [src/index.ts] * Added on OpenAI API for completions [package/utils/apis/openai.ts] * Lowered numeric tolerance for test files ''' Most commits will have less comments that this examples list. The last comment does not include the file names, because there were more than two relevant files in the hypothetical commit. Do not include parts of the example in your summary. It is given only as an example of appropriate comments.`,
      `Please summarise the following diff file: \n\n${diff}`,
    ];

    const result = await model.generateContent(prompt);

    // CORRECTED: Access the response directly from the result object
    const response = result.response;
    const summaryText = response.text();

    return summaryText;
  } catch (error) {
    console.error("Error summarizing commit with AI:", error);
    // Return a fallback message so the application doesn't crash
    return "Could not generate summary due to an error.";
  }
};
