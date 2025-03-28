# Resume Builder - CS50 Web Final Project

Hi, my name is **Anees Ali**. I completed *Harvard CS50x*, an introduction to the intellectual enterprises of computer science and the art of programming. After finishing, I grew interested in web development and chose CS50 Web to continue my journey. I enjoy the CS50 staff’s teaching style and their rigorous approach, which suits my learning preferences perfectly.

Welcome to **Resume Builder**, my final project for CS50's Web Programming with Python and JavaScript. This web application enables tech professionals to create polished, customizable resumes with AI-powered suggestions, dynamic input fields, and downloadable PDF outputs. Built with Django, it integrates OpenAI’s API for real-time content generation and includes robust security features like rate limiting to ensure reliability and prevent denial-of-service attacks.

---

## Distinctiveness and Complexity

This project distinguishes itself from other CS50 web projects—like Project 4 (*Network*) or the commerce project—due to its unique focus on resume creation tailored for tech professionals. Unlike typical projects managing user posts or products, Resume Builder handles complex, structured data (e.g., education, experience, projects) and transforms it into visually appealing, downloadable resumes. Integrating OpenAI’s API to deliver contextual, real-time suggestions for resume fields (e.g., job descriptions, summaries) adds sophistication . This required managing asynchronous API calls, parsing JSON responses, and ensuring seamless user interaction via JavaScript, all within a responsive Bootstrap UI.

The complexity deepens with dynamic form management—users can add or remove entries (e.g., jobs, projects) on the fly, using client-side JavaScript cloning and server-side validation. Implementing rate limiting with `django_ratelimit` to shield the OpenAI API from excessive calls showcases practical security beyond basic authentication or CSRF protection. The PDF generation feature, powered by `pdfkit`, demanded precise HTML templating and styling for professional output, adding technical depth. Together, AI integration, dynamic forms, security, and document generation elevate this project beyond CS50 web problem sets, making it both distinct and complex.

---

## Files and Their Contents

- **`resume_builder/urls.py`**: Configures project-level URL routing, including admin and app routes, with static file serving for media.
- **`resumes/views.py`**: Manages core logic—rendering pages, processing forms, generating AI suggestions via OpenAI, and creating PDFs.
- **`resumes/urls.py`**: Defines app-specific routes (e.g., `/suggest`, `/create`, `/preview`, etc).
- **`resumes/models.py`**: Defines database models like `User` (AbstractUser), `Resume`, `Education`, `Experience`, etc.
- **`resumes/templates/resumes/`**: Includes HTML templates (`index.html`, `create.html`, `preview.html`, etc.) and four resume styles (`template1.html` to `template4.html`).
- **`resumes/static/resumes/`**: Contains `styles.css` for custom styling and `script.js` for dynamic form interactions.
- **`requirements.txt`**: Lists dependencies: `markdown`, `openai`, `django_ratelimit`, `pdfkit`, `python-decouple`.

---

## Challenges Faced

- **`OpenAI API`**: I researched free APIs to integrate into my project and found the *AIML website* useful for accessing a free AI service. Though its API calls are limited, it served as an experimental starting point. The syntax for integration was straightforward, but hiding my API key for security was challenging. I created a `.env` file to store it securely, then used `python-decouple` to load it into `settings.py` and imported it into `views.py`.

- **`PDF Generation`**: After integrating the AI API, generating PDFs became the next hurdle. Through research and notes, I used the `pdfkit` package with *wkhtmltopdf* to create resume PDFs. However, styling required adding `@media print` queries in `styles.css` to ensure the generated PDFs looked professional.

---

## How to Run the Application

1. **Clone the Repository**:
   ```bash
   git clone <this-repo-url>
   cd resume_builder
   install the dependencies of the project listed in requirements.txt
   make migrations
   run the server
