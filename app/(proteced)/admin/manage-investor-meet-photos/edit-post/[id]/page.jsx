"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import DefaultLayout from "@/components/admin/Layouts/DefaultLaout";

const FormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  eventDate: z.string().optional(),
  image: z.instanceof(File).optional(),
});

const EditInvestorMeet = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previousImage, setPreviousImage] = useState(null);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      eventDate: "",
    },
  });

  // Load existing data
  useEffect(() => {
    if (id) {
      axios.get(`/api/investor-photos/${id}`).then((res) => {
        
        const data = res?.data?.post;

        form.setValue("title", data?.title || "");
        form.setValue("description", data?.description || "");
        form.setValue("eventDate", data?.eventDate ? new Date(data.eventDate).toISOString().slice(0, 10) : "");
        setPreviousImage(data?.image?.url);
      });
    }
  }, [id]);

  const onSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    if (values?.title) formData.append("title", values?.title);
    if (values?.description) formData.append("description", values?.description);
    if (values?.eventDate) formData.append("eventDate", values?.eventDate);
    if (values?.image instanceof File) formData.append("image", values?.image);

    try {
      await axios.put(`/api/investor-photos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Updated successfully." });
      router.push("/admin/manage-investor-meet-photos/manage");
    } catch (error) {
      toast({ title: "Update failed.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-6">Edit Investor Meet</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event Title" />
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
                  <Input {...field} placeholder="Short Description" />
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
                <FormLabel>Upload New Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                </FormControl>
                <FormMessage />
                {previousImage && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Previous Image:</p>
                    <img src={previousImage} alt="Previous" className="w-40 rounded shadow" />
                  </div>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="bg-[var(--rv-primary)] text-white">
            {loading ? "Updating..." : "Update Event"}
          </Button>
        </form>
      </Form>
    </DefaultLayout>
  );
};

export default EditInvestorMeet;
