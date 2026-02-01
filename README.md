# 🤖 AI-Powered Healthcare Chatbot System  

🔗 **Live Demo:** https://ai-healthcare-hackathone-eight.vercel.app/  
🔗 **GitHub Repository:** https://github.com/Dabhi-Pratik/AI_HEALTHCARE_HACKATHONE  

An AI-powered healthcare assistant chatbot designed to provide users with basic medical guidance, symptom-related insights, and general health information through a clean and interactive interface.



---

## 📌 Project Overview  

The AI Healthcare Chatbot is integrated into a healthcare web application as a floating chat widget available at the bottom-right corner of the screen.

Users can:
- Ask health-related questions  
- Get AI-powered responses  
- Use a basic symptom checker  
- Access the chatbot anytime without interrupting the main UI  

The system securely handles authentication, stores chat history, and communicates with an AI model to deliver intelligent responses.

---

## ✨ Key Features  

- 💬 AI-powered healthcare chatbot  
- 🧠 Intelligent responses using OpenAI (ChatGPT API)  
- 🩺 Basic AI symptom checker for guidance  
- 🔐 Secure user authentication (JWT)  
- 🗂️ Chat history storage  
- 📱 Fully responsive UI (Mobile & Desktop)  
- ➕ Chatbot zoom / minimize option  
- 🎯 Floating chatbot widget for easy access  

---

## 🖥️ Frontend Tech Stack  

- React.js – Component-based UI  
- Tailwind CSS – Modern, responsive styling  
- JavaScript (ES6+) – Application logic  
- Axios / Fetch API – Backend communication  

---

## ⚙️ Backend Tech Stack  

- Node.js – Server-side runtime  
- Express.js – REST API framework  
- OpenAI API – AI chatbot responses  
- JWT (JSON Web Token) – Authentication & authorization  
- bcrypt – Password hashing & security  

---

## 🗄️ Database  

- MongoDB – Stores:
  - User accounts  
  - Chat history  
  - Authentication data  
- Mongoose – MongoDB object modeling  

---

## 🏗️ System Architecture  

```text
Frontend (React)
      ↓
Backend API (Node.js + Express)
      ↓
OpenAI API (ChatGPT)
      ↓
MongoDB Database
      ↓
Response back to User

🔐 Authentication Flow

User registers or logs in

Backend validates credentials

JWT token is generated

Token is used for protected routes

Passwords are securely hashed using bcrypt

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Dabhi-Pratik/AI_HEALTHCARE_HACKATHONE.git
cd AI_HEALTHCARE_HACKATHONE

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

3️⃣ Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret

🌐 Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

Database: MongoDB Atlas

🎯 Future Enhancements

👨‍⚕️ Doctor / Admin dashboard

📊 Health analytics & reports

📞 Video consultation feature

🌍 Multi-language support

📱 Mobile application

⚠️ Disclaimer

This chatbot provides general health guidance only.
It does not diagnose diseases or replace professional medical consultation.
Always consult a certified healthcare professional for medical concerns.

## 📜 License
This project is licensed under the

## 👩‍💻 Team  

**Team Leader:**  
👑 **Chauhan Vaishali**  

**Team Members:**  
- **Dabhi Pratik**  
- **Brij Rathod**  
- **Utsav Kalathiya**  
- **Dharmik Sanga**  

**Institute:**  
Government Engineering College, Bhavnagar  


