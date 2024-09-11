import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";


function AiAPI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer(e) {
    e.preventDefault();            
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_INTELSYAIKEY}`,
        {
          contents: [{ parts: [{ text:question }] }],
        }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
      toast.success("Intelsy AI : Answer Generated")
    } catch (error) {
      console.log(error);
      setAnswer("Sorry, something went wrong. Please try again!");
    }
    setLoading(false);
  }

  return (
    <div style={{ backgroundColor: "#0D1117", height: "80vh", borderRadius: "20px" }}>
      <style>
        {`
          .custom-btn {
            border-radius: 20px;
            color: #FFF;
            font-weight: bold;
            width: 90%;
            background: linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5);
            background-size: 600%;
            animation: anime 16s linear infinite;
            border: none;
            cursor: pointer;
          }

          .custom-btn:disabled {
            cursor: not-allowed;
          }

          @keyframes anime {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .textarea {
            width: 90%;
            height: 15vh;
            border-radius: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            font-size: 18px;
            font-family: 'PT sans';
            color: #036EFD;
            padding: 10px;
          }
        `}
      </style>
      <form
        onSubmit={generateAnswer}
        className="w-full md:w-2/3 mx-auto text-center bg-gray-50 py-2"
      >
        <textarea 
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask Intelsy AI "
          className="textarea my-2"
          style={{backgroundColor:"#212529" , borderColor:"black"}}
        ></textarea>

        <button
          type="submit"
          className="custom-btn mx-2"
          disabled={loading}
          style={{height:"40px"}}
        >
         {loading ? "Generating..." : <><i className="fa-solid fa-poo-storm"></i> &nbsp;Generate Answer</>}

        </button>
      </form>
      <div className="w-full md:w-2/3 mx-auto text-left bg-gray-50 my-1" style={{ backgroundColor: "#0E1117", maxHeight: "50%", width: "90%", borderRadius: "20px", overflowY: "auto" }}>
        <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
      </div>
      
    </div>
    
  );
}

export default AiAPI;
