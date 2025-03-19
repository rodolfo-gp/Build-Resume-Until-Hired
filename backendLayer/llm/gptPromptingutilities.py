import os
import openai
from dotenv import load_dotenv

load_dotenv()

# Creates an OpenAi object and sends a prompt to ChatGPT
def gpt_prompter(full_prompt):
    '''
    Makes a call to the OpenAI API to send a prompt to ChatGPT
    args:
        full_prompt: str, accepts a string that contains the main body of the prompt.
    returns:
        str, the response from ChatGPT.
    '''
    header = "The prompt being sent will contain details about creating a resume or cover letter template. please return ONLY the text associated with the template"
    try:
        # Retrieve the API key
        api_key = os.getenv('GPT_API_KEY')
        if not api_key:
            raise ValueError("API key not found. Make sure it's set in the .env file.")
        client = openai.OpenAI(api_key=api_key)

        # Set model details
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": header},
                {"role": "user", "content": full_prompt}
            ],
            max_tokens=3000,
            temperature=0.5
        )

        # Format the output and handle errors
        prompt_output = response.choices[0].message.content.strip()
        return prompt_output
    except Exception as e:
        print(f"Error: {e}")
        return None