<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- [![project_license][license-shield]][license-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="images/logo.png" alt="Logo" width="500" height="">
  </a>

<h3 align="center">Build Resumes Until Hired</h3>

  <p align="center">
    Tailor your resumes and cover letter for a specific job
    <br />
    <a href="https://bru-h.xyz/"><strong>Demo »</strong></a>
    <br />
    <br />
    
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage-using-docker">Usage</a>
    </li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<a href="">
    <img src="images/cover.png" alt="Logo" width="100%" height="">
</a>
Build Resumes Until Hired is an intelligent web application designed to help job software developers tailor their resumes and cover letters for specific job postings. By leveraging automation and customization, the platform helps optimizes application documents to increase the chances of landing interviews.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Flask][Flask.io]][Flask-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
* [![Docker][Docker.com]][Docker-url]
* [![AWS][AWS.com]][AWS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

These are the things required to run a local version of the app
* npm
  ```sh
  npm install npm@latest -g
  ```
* Docker (for easiest setup)
  
* python 3.x

* MongoDb (If running without docker)

### Installation

1. Acquire tokens and a valid OpenAI API Key at [OpenAI's API](https://platform.openai.com/). 
2. Clone the repo
  
3. Install NPM packages
   ```sh
   cd persentationLayer
   cd react-app
   npm install -g serve
   npm run build
   serve -s build
   ```
4. Enter your backend API in `config.js` Alex Help
   ```js
   const API_KEY = 'localhost:5000';
   ```
5. go to backendLayer dir
   ```sh
   cd backendLayer
   ```
6. create .env file to host API Key and other info. This format:
   ```sh
   
    GPT_API_KEY = "your GPT API Key"
    EMAIL_HASH_KEY = "createHashKeyHere...a;ldkfjapeif" 
    MONGO_URI="mongodb://rootuser:rootpassword@mongodb:27017/ProjDBExample?authSource=admin"
    MONGO_USER=rootuser
    MONGO_PASSWORD=rootpassword
    MONGO_DATABASE=ProjDBExample

   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage using Docker

Now that you have installed everything these are the steps to run the app.

1. Be in the backendLayer dir. This will launch the entire backend. For info on ports used check the dockerfile and docker-compose file
   ```sh
   cd backenLayer
   ```
2. Start docker engine via cmd or docker desktop(just open app)
3. have latest .env file in backendLayer dir

4. Build and lauch containers:
   ```
   docker-compose up --build -d
   ```
To stop containers: ```docker-compose down``` \
To stop docker engine: ```stop docker```

5. Navigate to the persentationLayer react app dir
   ```sh
   cd persentationLayer
   cd react-app
   ```

5. build and run the npm run build
   ```sh
   npm run build
   serve -s build
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTRIBUTORS -->
## Contributors:

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/rodolfo-gp">
          <img src="https://github.com/rodolfo-gp.png" width="50" height="50" alt="rodolfo-gp" />
        </a>
        <br /><strong>Rodolfo Gil</strong>
        <br /><span style="color:gray;">DevOps & Backend Developer<br />Management Team</span>
      </td>
      <td align="center">
        <a href="https://github.com/SenorYuen">
          <img src="https://github.com/SenorYuen.png" width="50" height="50" alt="SenorYuen" />
        </a>
        <br /><strong>Adam Yuen</strong>
        <br /><span style="color:gray;">Fullstack Developer<br />Management Team</span>
      </td>
      <td align="center">
        <a href="https://github.com/s0uptim3">
          <img src="https://github.com/s0uptim3.png" width="50" height="50" alt="s0uptim3" />
        </a>
        <br /><strong>Odin Fox</strong>
        <br /><span style="color:gray;">Frontend Developer</span>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/FahmiSar">
          <img src="https://github.com/FahmiSar.png" width="50" height="50" alt="FahmiSar" />
        </a>
        <br /><strong>Fahmi Sardar</strong>
        <br /><span style="color:gray;">Frontend Developer</span>
      </td>
      <td align="center">
        <a href="https://github.com/Shiro3695">
          <img src="https://github.com/Shiro3695.png" width="50" height="50" alt="Shiro3695" />
        </a>
        <br /><strong>Alexander Lai</strong>
        <br /><span style="color:gray;">Frontend Developer</span>
      </td>
      <td align="center">
        <a href="https://github.com/Zaid-sh">
          <img src="https://github.com/Zaid-sh.png" width="50" height="50" alt="Zaid-sh" />
        </a>
        <br /><strong>Zaid Shaikh</strong>
        <br /><span style="color:gray;">Fullstack Developer<br />Management Team</span>
      </td>
    </tr>
  </table>
</div>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]: https://reactjs.org/

[Flask.io]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white

[Flask-url]: https://flask.palletsprojects.com/en/stable/


[MongoDB.com]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white

[MongoDB-url]: https://www.mongodb.com/

[AWS.com]: https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white

[AWS-url]: https://aws.amazon.com/

[Docker.com]: https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white

[Docker-url]: https://www.docker.com/
