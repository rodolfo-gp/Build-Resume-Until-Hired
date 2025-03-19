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
        self.phone = jobAppDict['phone']
        self.email = jobAppDict['email']
        self.skills = jobAppDict['skills']
        self.targetJobApplication = jobAppDict['jobDesc']
        self.experience = jobAppDict['workExperience']
        self.projects = jobAppDict['projects']
        self.additionalExperience = jobAppDict['additionalExperience']
        self.latex = jobAppDict['latex']
        print(self.latex)

class CoverLetter(JobAppMaterial):
    def __init__(self, jobAppJson):
        super().__init__(jobAppJson)
        self.materialType = "cover letter"
        if self.latex:
            f = open("llm/latexCoverLetter.txt", "r", encoding="utf-8")
            self.template = f.read()
        else:
            f = open("llm/coverLetterTemplate.txt", "r", encoding="utf-8")
            self.template = f.read()

    def extractJsonInfo(self, jobAppDict):
        super().extractJsonInfo(jobAppDict)

        self.userDesiredCompany = jobAppDict['companyName']
        self.userDesiredCompanyInfo = jobAppDict['companyLocation']
        self.hiringManagerName = jobAppDict['recipientInfo']

    def createCoverLetterPrompt(self):
        promptPayload = """
        Please make a {materialType} for a Software Engineering Intern. Use the following fields to construct it:
        Name: {userName}
        Address: {userAddress}
        Phone Number: {userNumber}
        Email: {userEmail}

        Hiring Manager Name: {userDesiredCompany}
        Company Name: {userCompanyName}
        Company Details: {userCompanyDetails}

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

            userDesiredCompany = self.hiringManagerName,
            userCompanyName = self.userDesiredCompany,
            userCompanyDetails = self.userDesiredCompanyInfo,

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
        if self.latex:
            f = open("llm/latexResume.txt", "r", encoding="utf-8")
            self.template = f.read()
        else:
            f = open("llm/resumeTemplate.txt", "r", encoding="utf-8")
            self.template = f.read()

    def extractJsonInfo(self, jobAppDict):
        super().extractJsonInfo(jobAppDict)

        self.socials = jobAppDict['socials']

    def createResumeLetterPrompt(self):
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
    "phone": "123-456-7890",
    "email": "johndoe@example.com",
    "skills": ["Python", "C++", "Embedded Systems", "React.js"],
    "jobDesc": "Software Engineering Intern at Seequent",
    "recipientInfo": "Odin Fox",
    "companyName": "Seequent",
    "companyLocation": "Calgary, AB",
    "projects": ["Developed an AI chatbot using Rasa and Llama 3",
                 "Optimized a C-based data compression algorithm for embedded systems"],
    "workExperience": ["Research Intern at University of Calgary, focusing on LLM evaluations",
                   "Software Developer Intern at XYZ Tech, developed REST APIs in Python"],
    "additionalExperience": ["Volunteer coding mentor at local high school"],
    "latex": False
}

# Dummy dictionary for testing Resume
resume_data = {
    "name": "Jane Smith",
    "education": "B.Sc. in Computer Science, University of Toronto",
    "address": "456 Elm St, Toronto, ON, Canada",
    "phone": "987-654-3210",
    "email": "janesmith@example.com",
    "socials": "https://github.com/janesmith",
    "skills": ["Java", "SQL", "PostgreSQL", "Docker"],
    "jobDesc": "Software Developer Intern at Garmin",
    "projects": ["Created a web app using React.js and Flask for Bluetooth communication",
                 "Built a CI/CD pipeline for automated testing with GitHub Actions"],
    "workExperience": ["Software Engineer Intern at ABC Corp, worked on database optimization",
                   "Teaching Assistant for Data Structures at University of Toronto"],
    "additionalExperience": ["Hackathon participant - 1st place in AI challenge"],
    "latex": "True"
}

# Convert to JSON strings
cover_letter_json = json.dumps(cover_letter_data)
resume_json = json.dumps(resume_data)

# Create instances of CoverLetter and Resume
cover_letter = CoverLetter(cover_letter_json)
resume = Resume(resume_json)

# Generate prompts
# print(cover_letter.createCoverLetterPrompt())
# print(resume.createCoverLetterPrompt())