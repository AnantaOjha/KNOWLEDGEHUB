# KNOWLEDGEHUB
"A full-stack web application with React and Django for managing and organizing knowledge resources."

## 🚀 Features  
- 🔐 User authentication system (Django Auth / JWT)  
- ⚡ Responsive frontend with React  
- 📡 REST API integration between frontend and backend  
- 🎨 Modern UI with TailwindCSS (if used)  
- 📁 Clean and organized project structure  

## 🛠️ Tech Stack  
**Frontend:** React, CSS/Tailwind  
**Backend:** Django, Django REST Framework  
**Database:** SQLite / PostgreSQL  
**Version Control:** Git + GitHub  

## 📂 Project Structure 


knowledgehub/
│── backend/ # Django backend
│── frontend/ # React frontend
│── README.md


## ⚡ Installation  

```bash
# Clone the repository
git clone https://github.com/AnantaOjha/KNOWLEDGEHUB.git
cd KNOWLEDGEHUB

# Setup backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Setup frontend
cd ../frontend
npm install
npm start
