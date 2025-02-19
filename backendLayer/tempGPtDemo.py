from gptPromptingutilities import gpt_prompter

promptPayload = "Please print a cover letter template for a software engineering student"
header = "The prompt being sent will contian details about creating a resume or cover letter template. please return ONLY the text associated with the template"

print(gpt_prompter(promptPayload, header))