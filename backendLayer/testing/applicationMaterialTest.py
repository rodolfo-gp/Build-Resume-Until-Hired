import unittest
import json

import sys
import os

# Get the parent directory and add it to sys.path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../"))
sys.path.append(parent_dir)

from helpers.applicationMaterial import (Resume, CoverLetter)

class TestJobAppMaterial(unittest.TestCase):
    
    def setUp(self):
        self.resumeDict = {
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
            "latex": "False"
        }

        self.coverLetterDict = {
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
            "latex": "False"
        }

        # Convert to JSON strings before passing to class constructors
        self.coverLetterInstance = CoverLetter(json.dumps(self.coverLetterDict))
        self.resumeInstance = Resume(json.dumps(self.resumeDict))

    def test_attributes_initialization(self):
        """Test if attributes are correctly initialized from JSON input"""
        self.assertEqual(self.coverLetterInstance.name, "John Doe")
        self.assertEqual(self.coverLetterInstance.education, "B.Sc. in Software Engineering, University of Calgary")
        self.assertEqual(self.coverLetterInstance.skills, ["Python", "C++", "Embedded Systems", "React.js"])
        self.assertEqual(self.coverLetterInstance.materialType, "cover letter")

        self.assertEqual(self.resumeInstance.name, "Jane Smith")
        self.assertEqual(self.resumeInstance.education, "B.Sc. in Computer Science, University of Toronto")
        self.assertEqual(self.resumeInstance.skills, ["Java", "SQL", "PostgreSQL", "Docker"])
        self.assertEqual(self.resumeInstance.materialType, "resume")

    def test_create_cover_letter_prompt(self):
        """Test if createCoverLetterPrompt() generates expected prompt content"""
        prompt = self.coverLetterInstance.createCoverLetterPrompt()
        self.assertIn("John Doe", prompt)
        self.assertIn("Software Engineering Intern", prompt)
        self.assertIn("Seequent", prompt)
        self.assertIn("B.Sc. in Software Engineering", prompt)
        self.assertIn("Python", prompt)

    def test_create_resume_prompt(self):
        """Test if createResumeLetterPrompt() generates expected prompt content"""
        prompt = self.resumeInstance.createResumeLetterPrompt()
        self.assertIn("Jane Smith", prompt)
        self.assertIn("Software Developer Intern", prompt)
        self.assertIn("University of Toronto", prompt)
        self.assertIn("Java", prompt)
        self.assertIn("https://github.com/janesmith", prompt)

if __name__ == '__main__':
    unittest.main()
