# Gemini AI API Express Server (Maju Bareng AI - Hacktiv Submission)

This project is a Node.js Express application that demonstrates the use of Google's Gemini AI API to generate content from various inputs including text, images, documents, and audio. It was developed as a submission for the "Maju Bareng AI" event by Hacktiv.

## Features

* **Text Generation:** Generate text based on textual prompts.

* **Image-to-Text Generation:** Describe an uploaded image or answer questions about it.

* **Document-to-Text Generation:** Summarize or extract insights from uploaded documents (e.g., TXT, PDF - depending on Gemini's supported document MIME types for inline data).

* **Audio-to-Text Generation:** Transcribe or describe uploaded audio files (e.g., WAV, MP3 - depending on Gemini's supported audio MIME types for inline data).

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (version 20 or later, as recommended by the `@google/genai` SDK)

* npm (Node Package Manager, comes with Node.js) or yarn

* A **Google Gemini API Key**. You can obtain one from Google AI Studio.

## Installation

1. **Clone the repository:**

   ```
   git clone <your-repository-url>
   cd <your-repository-directory>
   ```

2. **Install dependencies:**
   Using npm:

   ```
   npm install
   ```

   Or using yarn:

   ```
   yarn install
   ```

## Environment Variables

This project uses a `.env` file to manage environment variables.

1. Create a file named `.env` in the root directory of the project.

2. Add your Google Gemini API Key to the `.env` file:

   ```
   GOOGLE_GEMINI_API_KEY=YOUR_API_KEY_HERE
   ```

   Replace `YOUR_API_KEY_HERE` with your actual Gemini API key.

## Running the Application

1. **Start the server:**
   Using npm:

   ```
   npm start
   ```

   (This assumes you have a `start` script in your `package.json` like `"start": "node index.js"`. If not, you can run it directly.)

   ```
   node index.js
   ```

2. The server will start and listen on `http://localhost:3000`. You'll see a message in the console:

   ```
   I LOVE YOU 3000
   ```

## API Endpoints

The application uses the `gemini-2.0-flash` model for all generation tasks. Uploaded files are temporarily stored in the `uploads/` directory and are deleted after processing.

### 1. Generate Text from Text

* **Endpoint:** `POST /generate-text`

* **Description:** Generates text content based on a given text prompt.

* **Request Body:** `application/json`

  ```json
  {
      "prompt": "Write a short story about a friendly robot."
  }
  ```

* **Response Body:** `application/json`

  ```json
  {
      "output": "Once upon a time, in a bustling city of the future, lived a shiny chrome robot named Bolt..."
  }
  ```

* **Example using `curl`:**

  ```bash
  curl -X POST -H "Content-Type: application/json" \
  -d '{ "prompt": "What is the capital of France?" }' \
  http://localhost:3000/generate-text
  ```

### 2. Generate Text from Image

* **Endpoint:** `POST /generate-from-image`

* **Description:** Generates text content based on an uploaded image and an optional text prompt. If no prompt is provided, it defaults to "Describe this image."

* **Request Body:** `multipart/form-data`

  * `image`: The image file to upload.

  * `prompt` (optional): A text prompt related to the image.

* **Response Body:** `application/json`

  ```json
  {
      "output": "This image shows a beautiful sunset over a mountain range..."
  }
  ```

* **Example using `curl`:**

  ```bash
  curl -X POST -F "image=@/path/to/your/image.jpg" \
  -F "prompt=What objects are in this image?" \
  http://localhost:3000/generate-from-image
  ```

  (Replace `/path/to/your/image.jpg` with the actual path to your image file.)

### 3. Generate Text from Document

* **Endpoint:** `POST /generate-from-document`

* **Description:** Generates text content based on an uploaded document and an optional text prompt. If no prompt is provided, it defaults to "Describe this uploaded document."

* **Request Body:** `multipart/form-data`

  * `document`: The document file to upload (e.g., `.txt`, potentially others supported by Gemini for inline data).

  * `prompt` (optional): A text prompt related to the document.

* **Response Body:** `application/json`

  ```json
  {
      "output": "This document appears to be a research paper discussing the impacts of climate change..."
  }
  ```

* **Example using `curl`:**

  ```bash
  curl -X POST -F "document=@/path/to/your/document.txt" \
  -F "prompt=Summarize this document in three sentences." \
  http://localhost:3000/generate-from-document
  ```

  (Replace `/path/to/your/document.txt` with the actual path to your document file.)

### 4. Generate Text from Audio

* **Endpoint:** `POST /generate-from-audio`

* **Description:** Generates text content based on an uploaded audio file and an optional text prompt. If no prompt is provided, it defaults to "Describe this uploaded audio."

* **Request Body:** `multipart/form-data`

  * `audio`: The audio file to upload (e.g., `.wav`, `.mp3`, potentially others supported by Gemini for inline data).

  * `prompt` (optional): A text prompt related to the audio.

* **Response Body:** `application/json`

  ```json
  {
      "output": "This audio file contains a person speaking about their travel experiences..."
  }
  ```

* **Example using `curl`:**

  ```bash
  curl -X POST -F "audio=@/path/to/your/audio.mp3" \
  -F "prompt=What is the main topic of this audio?" \
  http://localhost:3000/generate-from-audio
  ```

  (Replace `/path/to/your/audio.mp3` with the actual path to your audio file.)

## Example Files Provided

For testing and demonstration purposes, the following files are included in the project:

* **`testing.json`**: An exported Postman collection containing example requests for all API endpoints. You can import this into Postman to easily test the functionalities.

* **`image.jpg`**: A dummy image file that can be used with the `/generate-from-image` endpoint.

* **`0_AVPN_IT Dev Onboarding.pdf`**: A dummy PDF document for testing the `/generate-from-document` endpoint.

* **`a phone call from God.mp3`**: A dummy audio file for testing the `/generate-from-audio` endpoint.

## Technologies Used

* **Node.js:** JavaScript runtime environment.

* **Express.js:** Web application framework for Node.js.

* **Google Gen AI SDK (`@google/genai`):** Official SDK for interacting with Google's Generative AI models.

* **Multer:** Middleware for handling `multipart/form-data`, used for file uploads.

* **Dotenv:** Module to load environment variables from a `.env` file.

---

This README should provide a good overview for anyone looking to understand or use your project. Good luck with your submission!
