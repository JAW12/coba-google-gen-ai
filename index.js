import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';

import fs from 'fs';
import path from 'path';

import { createPartFromUri, createUserContent, GoogleGenAI } from '@google/genai';

// setup aplikasinya di sini

dotenv.config(); // load file .env

// contoh: tampilkan GOOGLE_GEMINI_API_KEY di dalam terminal
// console.log(process.env.GOOGLE_GEMINI_API_KEY, "ini adalah API Key nya Google Gemini API");

// inisialisasi Express.js
const app = express();

// tambah 1 middleware --> .use()
app.use(
    // tambahkan Express JSON middleware
    // Content-Type: application/json
    express.json()
);

// inisalisasi model
// gemini-2.0-flash
const genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
});

// const result = await genAI.models.generateContent({ model: 'gemini-2.0-flash', contents: "Hi. "});

// console.log(result.text)

const upload = multer({
    dest: 'uploads/'
});

// route endpoints

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt
        })

        res.json({
            output: result.text
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message
        });
    }    
})

// upload.single(formDataYangDicari: string)
// contoh: upload.single('file') --> yang dicari di FormData yang bernama 'file'
app.post('/generate-from-image', upload.single('image'), async (req, res) => {
    const { prompt = "Describe this image." } = req.body;
    
    try {

        // 1. Baca file gambar
        const image = await genAI.files.upload({
            file: req.file.path,
            config: {
                mimeType: req.file.mimetype
            }
        });

        console.log({image});

        // 2. Sertakan dalam prompt
        const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                createUserContent([
                    prompt,
                    createPartFromUri(image.uri, image.mimeType)
                ]),
            ],
        });
        res.json({ output: result.text });

    } catch (error) {
        console.error("Error generating content from image:", error);
        res.status(500).json({ error: "Failed to generate content from image.", details: error.message });
    } finally {
        if (req.file && req.file.path) { // Check if req.file and req.file.path exist
            try {
                fs.unlinkSync(req.file.path); // Use req.file.path
            } catch (cleanupError) {
                console.error("Error deleting uploaded file:", cleanupError);
            }
        }
    }
});

app.post('/generate-from-document', upload.single('document'), async (req, res) => {
    const { prompt = "Describe this uploaded document." } = req.body;

    try {
        const filePath = req.file.path;
        const buffer = fs.readFileSync(filePath);
        const base64Data = buffer.toString('base64');
        const mimeType = req.file.mimetype

        const documentPart = {
            inlineData: { data: base64Data, mimeType }
        };

        const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                createUserContent([
                    prompt,
                    documentPart
                ])
            ]
        });

        res.json({ output: result.text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to generate content from document.", details: error.message });
    } finally {
        if (req.file && req.file.path){
            try {
                fs.unlinkSync(req.file.path);
            } catch (cleanupError) {
                console.error("Error deleting uploaded file:", cleanupError);
            }
        }
    }
});

app.post('/generate-from-audio', upload.single('audio'), async (req, res) =>{
    const { prompt = "Describe this uploaded audio." } = req.body;

    try {
        const filePath = req.file.path;
        const audioBuffer = fs.readFileSync(filePath);
        const base64Audio = audioBuffer.toString('base64');
        const mimetype = req.file.mimetype;

        const audioPart = {
            inlineData: { data: base64Audio, mimeType: mimetype }
        };

        const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                createUserContent([
                    prompt,
                    audioPart
                ])
            ]
        });

        res.json({ output: result.text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to generate content from audio.", details: error.message });
    } finally {
        if (req.file && req.file.path){
            try {
                fs.unlinkSync(req.file.path);
            } catch (cleanupError) {
                console.error("Error deleting uploaded file:", cleanupError);
            }
        }
    }
});

const port = 3000;

app.listen(port, () => {
    console.log("I LOVE YOU " + port);
});

