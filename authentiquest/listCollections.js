const { MongoClient } = require('mongodb');

// Update the URI to reflect the intended database if necessary
const uri = "mongodb+srv://jgatwazakubwimana:2GgOFGoYabk2mrYo@cluster0.jcg8rvd.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

async function displayImages() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log("Connected successfully to server");

        // Assuming the database name is 'images'
        const database = client.db('images');

        // Assuming the collection name is 'image_collection'
        const collection = database.collection('images');

        // Find all documents in the collection
        const images = await collection.find().toArray();

        console.log("Images in the database:");
        if (images.length === 0) {
            console.log("No images found in this collection.");
        } else {
            images.forEach(image => {
                console.log(`Image ID: ${image._id}`);
                if (image.url) {
                    console.log(`Image URL: ${image.url}`); // Display URL if stored as links
                }
            });
        }
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    } finally {
        await client.close();
        console.log("Closed the connection to MongoDB");
    }
}

displayImages();
