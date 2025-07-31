'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoSchema } from "@/lib/schemas";
import { handleFormSubmit } from "./actions";
import { AddProjectRoutes } from "@/lib/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function StepTwoForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof stepTwoSchema>>({
        resolver: zodResolver(stepTwoSchema),
        mode: "onChange",
        defaultValues: {
            modelName: "",
            provider: "",
            modelType: "",
            modelFamily: "",
            launchDate: "",
            discontinuationDate: "",
            contextWindow: "",
            params: "",
            priceMlnInput: "",
            priceMlnOutput: "",
        },
    });

    async function onSubmit(values: z.infer<typeof stepTwoSchema>) {
        try {
            const result = await handleFormSubmit(values);

            if (result.status === "success") {
                console.log('Result:', values)
                router.push(AddProjectRoutes.STEP_THREE);
            } else {
                // Handle validation errors - they should be displayed in form fields
                // The form will automatically show validation errors from Zod
            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Form submission error:", error);
            // You could show a toast notification here
            // toast.error("An unexpected error occurred. Please try again.");
        }
    }


    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField control={form.control} name="modelName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="provider" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Provider</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="modelType" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model Type</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="modelFamily" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Model Family</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="launchDate" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Launch Date</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>Select the launch date (between 2020-2030)</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="discontinuationDate" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Discontinuation Date</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormDescription>Optional: Select future discontinuation date</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="contextWindow" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Context Window</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="e.g., 1000" {...field} />
                        </FormControl>
                        <FormDescription>Enter the context window size (whole number)</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="params" render={({ field }) => (
                    <FormItem>
                        <FormLabel>JSON Params</FormLabel>
                        <FormControl>
                            <Input placeholder='{"key": "value"}' {...field} />
                        </FormControl>
                        <FormDescription>Enter valid JSON format</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="priceMlnInput" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price per Mln token input</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="e.g., 10.50" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="priceMlnOutput" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price per Mln token output</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="e.g., 15.75" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button disabled={!form.formState.isValid}>Submit</Button>

            </form>
        </Form>
    )
}