'use server'

import { writeFile } from "fs/promises";

export async function processDetect(fileData: Buffer) {
    const fileName = `${process.env.AI_IMAGE_UPLOAD_PATH}/${Date.now()}.jpg`
    try {
        const promise = writeFile(fileName, fileData)
        await promise

        // 파일 저장 성공 후 추론
        const apiUrl = `${process.env.AI_API_URL}?path=${fileName}`
        const res = await fetch(apiUrl)
        return res.json()

    } catch (err) {
        console.error(err)
    }
} 