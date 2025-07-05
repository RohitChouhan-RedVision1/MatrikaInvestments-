import { NextResponse } from 'next/server';
import BlogsModel from '@/lib/models/BlogModel';
import { ConnectDB } from '@/lib/db/ConnectDB';
import cloudinary from '@/lib/cloudinary';
import path from 'path';
import fs from 'fs';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await ConnectDB();

        // Find the blog by ID
        const blog = await BlogsModel.findById(id);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const publicId = blog.image.public_id;
        if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId);

            if (result.result !== 'ok') {
                return NextResponse.json({ error: 'Failed to delete image from Cloudinary' }, { status: 500 });
            }
        }
        await BlogsModel.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}

// GET Blog by ID
export async function GET(req, { params }) {
    const { id } = params; // Extract ID from params

    try {
        await ConnectDB(); // Ensure DB connection
        const blog = await BlogsModel.findById(id); // Properly await the findById function

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ blog }, { status: 200 });
    } catch (error) {
        console.error('Error fetching blog:', error);
        return NextResponse.json({ error: 'Error while fetching blog' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params; // Extract blog ID from params
    const data = await req.formData(); // Retrieve FormData from request
    try {
        await ConnectDB(); // Ensure DB connection

        // Find the blog by ID
        const blog = await BlogsModel.findById(id);

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }
        const uploadDirectory = path.join(process.cwd(), 'public/images');

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        };
        // Check if there's a new image to upload/update
        let newImageUrl = blog?.image?.url; // Keep the current image URL by default
        let newPublicId = blog?.image?.public_id; // Keep the current Cloudinary public_id by default
        const image = data.get('image'); // Get the new image from form data
        // Handle image only if it's provided and not 'null'
        if (data.get('image') && data.get('image') !== 'null') {
            const publicId = blog?.image?.public_id;
            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId);
                if (result.result !== 'ok') {
                    return NextResponse.json({ error: 'Failed to delete old image from Cloudinary' }, { status: 500 });
                }
            }
            // Generate a unique filename
            const a = await image.arrayBuffer();
            const buffer = Buffer.from(a)
            const uniqueFilename = `${Date.now()}_${image.name}`;
            const filePath = path.join(uploadDirectory, uniqueFilename);
            await fs.promises.writeFile(filePath, buffer);
            // Return the file path as a response
            const fileUrl = `public/images/${uniqueFilename}`
                // Upload the new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(fileUrl, {
                folder: 'maprikainvestments/blogs',
            });

            newImageUrl = uploadResult.secure_url;
            newPublicId = uploadResult.public_id;
        }

        // Update the blog with the new data
        const updatedBlog = await BlogsModel.findByIdAndUpdate(
            id, {
                image: {
                    url: newImageUrl,
                    public_id: newPublicId,
                },
                posttitle: data?.get('posttitle'), // Access form fields correctly
                slug: slugify(data?.get('posttitle')),
                metatitle: data?.get('metatitle'),
                description: data?.get('description'),
                content: data?.get('content'),
                keywords: data?.get('keywords'),
                category: data?.get('category'),
            }, { new: true } // Return the updated document
        );

        return NextResponse.json({ blog: updatedBlog }, { status: 200 });
    } catch (error) {
        console.error('Error updating blog:', error);
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}