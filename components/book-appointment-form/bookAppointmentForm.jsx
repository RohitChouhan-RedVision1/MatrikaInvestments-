"use client"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./appointmentForm.module.css"
import { useRouter } from "next/navigation";


const FormSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    mobile: z.string().nonempty({ message: "Mobile number is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    country: z.string().nonempty({ message: "Country is required." }),
    state: z.string().nonempty({ message: "State is required." }),
    city: z.string().nonempty({ message: "City is required." }),
    date: z.string().nonempty({ message: "Date is required." }),
    time: z.string().nonempty({ message: "Time is required." }),
    message: z.string().nonempty({ message: " What are you looking for is required." }),
});

export function InputForm({ services, sitedata }) {
    console.log(sitedata,"nhcfsjhf")
    const [hcaptchaToken, setHcaptchaToken] = useState(null);
    const [loading, setLoading] = useState();
     const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            mobile: "",
            email: "",
            country: "",
            state: "",
            city: "",
            date: "",
            message: "",
            time: "",
        },
    });

    const onSubmit = async (data) => {
        if (!hcaptchaToken) {
            alert("Please complete the CAPTCHA.");
            return;
        }

        const emaildata = {
            user: data?.username,
            to: data?.email,
            subject: 'Thank You for Your Enquiry!',
            text: `Dear ${data?.username}, We sincerely appreciate your interest and the time you took to fill out our enquiry form. We have received your details, and our team will be in touch with you soon.
            Regards, 
            Website Team`
            ,
        }
        const senderdata = {
            user: sitedata?.name,
            to: sitedata?.email,
            subject: 'New Enquiry',
            text: `Name: ${data?.username}
Email: ${data?.email}
Mobile: ${data?.mobile}
Country: ${data?.country}
State: ${data?.state}
City: ${data?.city}
Date: ${data?.date}
Time: ${data?.time}
Message: ${data?.message}`,
        }
        try {
            const response = await axios.post('/api/leads/', data);
            await axios.post('/api/email/', emaildata);
            await axios.post('/api/email/', senderdata);
            if (response.status === 201) {
                toast({
                    description: "Your message has been sent.",
                });
                form.reset();
                setHcaptchaToken(null); // Reset the token after submission
                router.push("/thank-you");
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div className={`${styles.rvtform}`}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={styles.contactForm}>
                {/* Username Field */}
            <div className={`${styles.rvrowform}`}>
                <div className={`${styles.rvrowformcol} ${styles.rvrowformcol1}`}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="User Name" {...field} aria-label="User Name" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol1}`}>
                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Email</FormLabel> */}
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} aria-label="Email" className={styles.formControl} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                        
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol2}`}>
                    {/* Mobile Field */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Mobile</FormLabel> */}
                                <FormControl>
                                    <Input placeholder="Mobile" {...field} aria-label="Mobile Number" className={styles.formControl} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol2}`}>
                    {/* Country Field */}
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="Country Name" {...field} aria-label="Country Name" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol2}`}>
                    {/* State Field */}
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="State Name" {...field} aria-label="State Name" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol2}`}>
                    {/* City Field */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder="City Name" {...field} aria-label="City Name" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol1}`}>
                    {/* What are you looking for Field */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input placeholder=" What are you looking for?" {...field} aria-label=" What are you looking for?" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol2}`}>
                    {/* Date Field */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input type="date"  placeholder="Date" {...field} aria-label="date" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol2}`}>
                    {/* Time Field */}
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    {/* <FormLabel>Name</FormLabel> */}
                                    <FormControl>
                                        <Input type="time"  placeholder="Time" {...field} aria-label="Time" className={styles.formControl} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol1}`}>
                    {/* hCaptcha */}
                    <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                        onVerify={setHcaptchaToken}
                    />
                 </div>
                 <div className={`${styles.rvrowformcol} ${styles.rvrowformcol1}`}>

 
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={loading}>
                        Send Massage
                    </button>
                </div>
                </div>
            </form>
            <ToastContainer />
        </Form>
        </div>
    );
}