from gptPromptingutilities import gpt_prompter

# Constants:
name = "Zaid Shaikh the FBI Agent"
profession = "Software Engineer"
address = "123 1st Street NW"
profession = "Software Engineer"
phone = "1234567890"
socials = "zaid@mail.com, linkedin.com/zaid"

education = "University of Calgary, Schulich School of Engineering, Software Engineering Undergraduate"
skills = ["c++", "c", "java", "complaining", "sleeping", "yelling at customers", "sleeping"]
experience = """
   Tip Top Tailors										 August 2022 - Present
   Sales Associate 											        	        Calgary, AB
•	Achieved over $300,000 in sales, demonstrating strong interpersonal skills and product knowledge.
•	Attended customers in a fast-paced busy environment while working with a diverse and inclusive team.
•	Resolved customer concerns in consultation with the store manager when required.
•	Closed sales deals by effectively communicating and addressing questions promptly and accurately.
"""
supplemental = """
   Embedded in Embedded								   September 2023 – April 2024
•	Leveraged in-class fundamentals to develop practical applications on a development board.
•	Integrated an inertial measurement unit (IMU) to design and implement various functional applications. 
   Facial Recognition Program | Python								    August 2024
•	Built a facial recognition program in Python utilizing the TensorFlow library and convolutional neural networks (CNNs) for high-precision facial identification. 
•	Trained and fine-tuned the CNN model to accurately detect and recognize facial features, achieving an accuracy of 99.63% on the LFW (Labeled Faces in the Wild) dataset.
   IMU Based Speedometer | C							        January 2024 – April 2024
•	Developed a precise speedometer using an inertial measurement unit (IMU) and IAR debugger, enabling real-time speed tracking with an accuracy of 95%.
•	Analyzed the IMU data sheet and modified driver code to support customized functionalities, including a conversion algorithm to transform raw IMU readings into meters per second.
   Flight Management System | C++								            November 2023	
•	Developed a robust flight management system in C++ to streamline operations, allowing users to efficiently search, book, and manage flights.
   Mini Game Console | C										    March 2023
•	Designed and 3D-printed a custom mini game console powered by an Arduino, featuring an interactive, built-in Battleship game.
•	Utilized the Arduino’s TFT library and TFT LCD screen to implement a simple GUI.
   Automated Garden | C										February 2023
•	Developed an automated garden system using an Adafruit soil condition sensor and motorized mechanism, improving the maintenance for Arugula plants, resulting in a 25% increase in plant growth efficiency.
"""

f = open("backendLayer\\llm\\resumeTemplate.txt", "r", encoding='utf8')
resumeTemplate = f.read()

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

promptPayload = """
Please make a resume for a {userProfession}. Use the following information to generate a resume. Please return ONLY the text associated with the template.
Name: {userName}
Address: {userAddress}
Phone Number: {userNumber}
Social Medias: {userSocials}

Education: {userEducation}
Skills: {userSkills}
Work Experience: {userExperience}
Projects: {userProjects}
Additional Experience: {supplementaryUserExperience}

The resume template should adhere to the following:
{resumeTemplate}

Here is the job description that the resume should be tailored towards:
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
    supplementaryUserExperience = supplemental,
    jobDescription = jobDescription,
    resumeTemplate = resumeTemplate
    )
header = "The prompt being sent will contain details about creating a resume template. please return ONLY the text associated with the template"

print(gpt_prompter(promptPayload, header))