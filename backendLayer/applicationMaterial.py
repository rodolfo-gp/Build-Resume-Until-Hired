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
        self.template = jobAppDict['template']

class CoverLetter(JobAppMaterial):
    def __init__(self, jobAppJson):
        super().__init__(jobAppJson)
        self.materialType = "cover letter"
        if self.template == "":
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
        if self.template == "":
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