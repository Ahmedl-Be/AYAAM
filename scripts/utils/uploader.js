export default class ImageUploader {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = `https://api.imgbb.com/1/upload?key=${this.apiKey}`;
    }

    async uploadImages(files) {
        if (!files || files.length === 0) {
            throw new Error("No files provided");
        }

        const urls = [];
        for (let file of files) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const res = await fetch(this.apiUrl, {
                    method: "POST",
                    body: formData
                });

                const data = await res.json();
                if (!data.success) {
                    throw new Error(`Failed to upload ${file.name}`);
                }

                urls.push(data.data.url);
            } catch (err) {
                console.error("Upload failed for", file.name, err);
                throw err;
            }
        }
        return urls;
    }
}