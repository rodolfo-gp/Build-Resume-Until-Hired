import os
import openai
from dotenv import load_dotenv

import os
import openai
from dotenv import load_dotenv


load_dotenv()

# Creates an OpenAi object and sends a prompt to ChatGPT
def gpt_prompter(full_prompt, header):
    try:
        # Retrieve the API key
        api_key = os.getenv('GPT_API_KEY')
        if not api_key:
            raise ValueError("API key not found. Make sure it's set in the .env file.")
        client = openai.OpenAI(api_key=api_key)

        # Set model details
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": header},
                {"role": "user", "content": full_prompt}
            ],
            max_tokens=1000,
            temperature=0.5
        )

        # Format the output and handle errors
        prompt_output = response.choices[0].message.content.strip()
        return prompt_output
    except Exception as e:
        print(f"Error: {e}")
        return None
