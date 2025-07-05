"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/admin/Layouts/DefaultLaout";

// Zod schema for investor photo upload
const FormSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.instanceof(File).optional(),
    eventDate: z.string().optional(),
});

export function InputForm() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            eventDate: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);

        const formData = new FormData();
        if (selectedImage) formData.append("image", selectedImage);
        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.eventDate) formData.append("eventDate", data.eventDate);

        try {
            const response = await axios.post('/api/investor-photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast({
                    title: "Photo uploaded successfully",
                });
                form.reset();
                router.push("/admin/manage-investor-meet-photos/manage");
                setSelectedImage(null);
            } else {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                });
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            toast({
                variant: "destructive",
                title: "Upload failed",
                description: "Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Event Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Short description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setSelectedImage(file);
                                            field.onChange(file);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="text-white bg-[var(--rv-primary)]" type="submit">
                    {!loading ? 'Submit' : 'Uploading...'}
                </Button>
            </form>
        </Form>
    );
}

const AddInvestorPhoto = () => {
    return (
        <DefaultLayout>
            <div>
                <div className="flex justify-between">
                    <h1 className='font-bold text-gray-700 text-2xl mb-7'>Add Investor Meet Photo</h1>
                    <Link href="/admin/manage-investor-meet-photos/manage">
                        <Button className="text-white bg-[var(--rv-primary)]">All Photos</Button>
                    </Link>
                </div>
                <div className='p-5 bg-gray-100 rounded'>
                    <InputForm />
                    <Toaster />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddInvestorPhoto;
