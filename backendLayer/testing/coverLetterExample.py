import sys
import os

# Get the parent directory and add it to sys.path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
sys.path.append(parent_dir)


from llm.gptPromptingutilities import gpt_prompter

'''
Testing File to test the original JobAppMaterial class and the gpt prompter. Depricated.
'''

# Constants:
name = "Zaid Shaikh the FBI Agent"
profession = "Software Engineer"
education = "University of Calgary, Schulich School of Engineering, Software Engineering Undergraduate"
address = "123 1st Street NW"
recipientAddress = "Tip Top Tailors, 3625 Shaganapi Trail NW, Calgary NW"
recipientName = "Rodolfo Fox-Pereira "
phone = "1234567890"
socials = "zaid@linkedin.com"
skills = ["c++", "c", "java", "complaining", "sleeping", "yelling at customers", "sleeping"]
experience = """
Sandoz Canada, Calgary, Alberta (Remote)	September 2024 - Present 
Software Engineering Researcher 
•	Collaborating in a government funded research project to develop a Chatbot for Sandoz to improve access to reliable and comprehensive drug information to improve user experience
•	Developing a RAG (Retrieval Augmented Generation) application for the chatbot to improve its dependence on updated training data
University of Calgary, Calgary, Alberta	May 2024 – Present 
Software Engineering Researcher	 
•	The Impact of Prompt Stylometry in Large Language Models (LLMs):
o	Leading a research study to evaluate the impact of different prompting strategies on the complexity, reliability, and readability of LLM generated code
o	Conducted an extensive literature review and manually developed 400 prompts tailored to class level coding problems to test multiple LLMs 
o	Designed a Python plug-in pipeline to automate test cases and code quality evaluation different metrics 
•	Using ChatGPT to Augment Software Engineering Chatbots Dataset:
o	Collaborated on the rebuttal of a project submitted to a top Software Engineering journal to leverage ChatGPT to augment natural language training data on NLUs
o	Implemented a new data augmentation method based on random deletion and swap techniques to benchmark against the ChatGPT-based approach, achieving 8% improvement in F1 scores over baseline
"""

jobDescription = """
Overview

The Aerospace and Defense engineering team within Hexagon's Autonomous Solutions division is looking for a Software Test Designer/Engineer to join our high-tech engineering and manufacturing company committed to customer service excellence and continuous improvement. Reporting to the Software Manager, Aerospace and Defense, the role will focus on extending the reach and capability of Hexagon's resilient positioning products for aerospace and defense customers. Your previous experience, drive for innovation, excellent troubleshooting abilities, and methodical problem-solving approach will support ongoing business initiatives in our exciting high-tech environment and, most importantly, provide solutions and products for our customers’ positioning and situational awareness needs across various applications. Join a diverse group of highly skilled engineers in an exhilarating environment where you will integrate cutting-edge technologies while embracing industry standards. We celebrate contributions to team growth through personal skill enhancement, continuous improvement initiatives, and knowledge sharing.

The Location: Hexagon is a global company with offices worldwide. The position will be based in Calgary, AB. Relocaton to Calgary can be provided.

Responsibilities

As a Software Test Designer/Engineer in our Aerospace and Defense engineering team focused on the Next Generation Ground Reference Receivers and GAJT SDR products, you will play a critical role in:

 Developing and executing test plans, test cases, and test scripts for receiver software. 
 Understand and apply system requirements to develop test strategies and build test setups. 
 Conducting thorough software unit, integration, system, and acceptance testing, ensuring robust tracking algorithms meet the highest reliability standards. 
 Engage with cutting-edge GNSS technologies, Validate and test high-performance GNSS software for NovAtel's next-generation ground reference receivers 
 Engaging in manual and automated testing to validate GNSS signal processing algorithms, data processing, and overall system performance. 
 Analyzing test results, troubleshooting test failures, investigating software issues, and collaborating closely with the development team to bring effective solutions. 
 Support regression testing and continuous improvement in the software verification process. 

Qualifications

 Must-Have: 

 Education: Bachelor's or Master's Degree in engineering or computer science. 
 Experience: 5+ years of proven experience in software verification and testing, preferably in GNSS, aerospace, automotive, and telecommunications. 
 Programming Skills: Proficiency in Python or similar scripting languages and C++. 
 Technical Expertise: Hands-on experience with test automation frameworks and scripting languages (Python, C++, Shell scripts, and MATLAB) 
 Tools: Experience with version control systems (e.g., Git) and debugging tools like JTAG 
 Soft Skills: Excellent analytical and problem-solving skills, and clear communication. 
 Documentation: Maintain technical documentation, design specifications, and testing reports. 

 Key Success Factors: 

 Excellent interpersonal skills within a multi-disciplinary team. 
 Innate sense of curiosity and conscientiousness. 
 Passion for new technologies and real-world applications. 
 Commitment to high-quality work and continuous improvement. 
 Effective written and verbal communication. 
 Quick learning and efficient implementation of product capabilities. 

 Nice-to-Have: 

 Familiarity with satellite navigation systems, positioning methods, and inertial sensors. 
 Knowledge of GNSS receiver architecture and multi-constellation GNSS signal processing 
 Experience with GNSS simulation tools like Spirent. 
 Knowledge of software verification methodologies 
 Experience with CI/CD, DevOps practices (e.g., Git, Jenkins), 

Not sure if you meet all the qualifications for this role? Let us decide! At Hexagon, we are committed to a diverse and inclusive work environment. If you’re excited about the opportunities this role could bring, we encourage you to apply. If you have any questions about the role or our company, please email our team at hrrecruitingteam.ap@hexagon.com and we will be pleased to follow up with you. Please do not send cover letters or resumes to this address.

The Company: Hexagon is a global leader in digital reality solutions, combining sensor, software and autonomous technologies. We are putting data to work to boost efficiency, productivity, quality and safety across industrial, manufacturing, infrastructure, public sector and mobility applications. You’ll be joining over 22,000 people in 50 countries on the leading edge of your field. This position is with Hexagon’s Autonomous Solutions division, a global technology leader, pioneering end-to-end solutions industry leaders rely on for assured positioning and autonomy on land, sea and air. Our work touches every aspect of life, from sustainability on Earth to enabling autonomy. Within the Autonomous Solutions division, your work will contribute to the operation of our NovAtel, AutonomouStuff, Veripos and Antcom brands.

Applicants who require accommodation in the job application process may contact Human Resources at hrrecruitingteam.ap@hexagon.com
"""

f = open("backendLayer\llm\coverLetterTemplate.txt", "r")
letterTemplate = f.read()


promptPayload = """
Please make a cover letter for a {userProfession}. Use the following fields:
Name: {userName}
Address: {userAddress}
Phone Number: {userNumber}
Social Media: {userSocials}

Hiring Manager Information: {userDesiredCompany}

Education: {userEducation}
Skills: {userSkills}
Experience: {userExperience}

Please use the enclosed cover letter as a template for filling the information in:
{templateLetter}

Here is the job description that the cover letter should be tailored towards:
{jobDescription}
""".format(
    userProfession = profession,
    userName = name, 
    userEducation = education, 
    userAddress = address,
    userNumber = phone,
    userSocials = socials,
    userSkills = skills,
    userExperience = experience,
    templateLetter = letterTemplate,
    userDesiredCompany = recipientAddress + recipientName,
    jobDescription = jobDescription
    )
header = "The prompt being sent will contain details about creating a resume or cover letter template. please return ONLY the text associated with the template"

print(gpt_prompter(promptPayload, header))