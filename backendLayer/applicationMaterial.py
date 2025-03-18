import json

class JobAppMaterial ():
    def __init__(self, jobAppJson):
        self.materialType = None
        self.template = None
        self.experience = None
        self.additionalExperience = None
        jobAppInfo = json.loads(jobAppJson)
        self.extractJsonInfo(jobAppInfo)

    def extractJsonInfo(self, jobAppDict):
        '''
        Reads a dictionary and updates the necessary fields.
        args:
            jobAppDict: dict, stores field information from the json sent from the frontend.
        returns:
            none
        '''
        self.name = jobAppDict['name']
        self.education = jobAppDict['education']
        self.address = jobAppDict['address']
        self.phone = jobAppDict['phone number']
        self.email = jobAppDict['email']
        self.socials = jobAppDict['social media']
        self.skills = jobAppDict['skills']
        self.targetJobApplication = jobAppDict['job description']        

class CoverLetter(JobAppMaterial):
    def __init__(self, jobAppJson):
        super().__init__(jobAppJson)
        self.materialType = "cover letter"
        f = open("llm/coverLetterTemplate.txt", "r", encoding="utf-8")
        self.template = f.read()

    def extractJsonInfo(self, jobAppDict):
        super().extractJsonInfo(jobAppDict)

        self.userDesiredCompany = jobAppDict['job contact info']
        self.projects = jobAppDict['projects']
        self.experience = jobAppDict['experience']
        self.additionalExperience = jobAppDict['additional experience']

    def createCoverLetterPrompt(self):
        promptPayload = """
        Please make a {materialType} for a Software Engineering Intern. Use the following fields to construct it:
        Name: {userName}
        Address: {userAddress}
        Phone Number: {userNumber}
        Email: {userEmail}
        Social Media (optional): {userSocials}

        Hiring Manager Information: {userDesiredCompany}

        Education: {userEducation}
        Skills: {userSkills}
        Work Experience: {userExperience}
        Projects: {userProjects}
        Other Experience (optional): {additionalUserExperience}

        Please use the enclosed {materialType} as a template for filling the information in:
        {templateLetter}

        Here is the job description that the {materialType} should be tailored towards:
        {jobDescription}
        """.format(
            materialType = self.materialType,
            userName = self.name,
            userAddress = self.address,
            userNumber = self.phone,
            userEmail = self.email,
            userSocials = self.socials,

            userDesiredCompany = self.targetJobApplication,

            userEducation = self.education,
            userSkills = self.skills,
            userExperience = self.experience,
            userProjects = self.projects,
            additionalUserExperience = self.additionalExperience,

            templateLetter = self.template,
            jobDescription = self.targetJobApplication
        )

        return promptPayload


class Resume(JobAppMaterial):
    def __init__(self, jobAppJson):
        super().__init__(jobAppJson)
        self.materialType = "resume"
        f = open("llm/resumeTemplate.txt", "r", encoding="utf-8")
        self.template = f.read()

    def extractJsonInfo(self, jobAppDict):
        super().extractJsonInfo(jobAppDict)

        self.userDesiredCompany = jobAppDict['job contact info']
        self.projects = jobAppDict['projects']
        self.experience = jobAppDict['experience']
        self.additionalExperience = jobAppDict['additional experience']

    def createCoverLetterPrompt(self):
        promptPayload = """
        Please make a resume for a Software Engineering Intern. Use the following information to generate a resume. Please return ONLY the text associated with the template.
        Name: {userName}
        Address: {userAddress}
        Phone Number: {userNumber}
        Email: {userEmail}
        Social Medias (optional): {userSocials}

        Education: {userEducation}
        Skills: {userSkills}
        Work Experience: {userExperience}
        Projects: {userProjects}
        Additional Experience: {additionalUserExperience}

        The resume template should adhere to the following template:
        {resumeTemplate}

        Here is the job description that the resume should be tailored towards:
        {jobDescription}
        """.format(
            materialType = self.materialType,
            userName = self.name,
            userAddress = self.address,
            userNumber = self.phone,
            userEmail = self.email,
            userSocials = self.socials,

            userEducation = self.education,
            userSkills = self.skills,
            userExperience = self.experience,
            userProjects = self.projects,
            additionalUserExperience = self.additionalExperience,

            resumeTemplate = self.template,
            jobDescription = self.targetJobApplication
        )

        return promptPayload

# TESTING AREA

# Dummy dictionary for testing CoverLetter
cover_letter_data = {
    "name": "John Doe",
    "education": "B.Sc. in Software Engineering, University of Calgary",
    "address": "123 Main St, Calgary, AB, Canada",
    "phone number": "123-456-7890",
    "email": "johndoe@example.com",
    "social media": "https://linkedin.com/in/johndoe",
    "skills": ["Python", "C++", "Embedded Systems", "React.js"],
    "job description": "Software Engineering Intern at Seequent",
    "job contact info": "Hiring Manager, Seequent, Calgary, AB",
    "projects": ["Developed an AI chatbot using Rasa and Llama 3", 
                 "Optimized a C-based data compression algorithm for embedded systems"],
    "experience": ["Research Intern at University of Calgary, focusing on LLM evaluations",
                   "Software Developer Intern at XYZ Tech, developed REST APIs in Python"],
    "additional experience": ["Volunteer coding mentor at local high school"]
}

# Dummy dictionary for testing Resume
resume_data = {
    "name": "Jane Smith",
    "education": "B.Sc. in Computer Science, University of Toronto",
    "address": "456 Elm St, Toronto, ON, Canada",
    "phone number": "987-654-3210",
    "email": "janesmith@example.com",
    "social media": "https://github.com/janesmith",
    "skills": ["Java", "SQL", "PostgreSQL", "Docker"],
    "job description": "Software Developer Intern at Garmin",
    "job contact info": "Recruiter, Garmin, Toronto, ON",
    "projects": ["Created a web app using React.js and Flask for Bluetooth communication",
                 "Built a CI/CD pipeline for automated testing with GitHub Actions"],
    "experience": ["Software Engineer Intern at ABC Corp, worked on database optimization",
                   "Teaching Assistant for Data Structures at University of Toronto"],
    "additional experience": ["Hackathon participant - 1st place in AI challenge"]
}

# Convert to JSON strings
cover_letter_json = json.dumps(cover_letter_data)
resume_json = json.dumps(resume_data)

# Create instances of CoverLetter and Resume
cover_letter = CoverLetter(cover_letter_json)
resume = Resume(resume_json)

# Generate prompts
print(cover_letter.createCoverLetterPrompt())
print(resume.createCoverLetterPrompt())