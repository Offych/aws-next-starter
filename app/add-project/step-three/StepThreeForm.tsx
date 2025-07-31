'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepThreeSchema } from "@/lib/schemas";
import { handleFormSubmit } from "./actions";
import { AddProjectRoutes } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";



export default function StepThreeForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof stepThreeSchema>>({
        resolver: zodResolver(stepThreeSchema),
        mode: "onChange",
        defaultValues: {
            apiKeyName: "",
            enabled: true,
        },
    });

    async function onSubmit(values: z.infer<typeof stepThreeSchema>) {
        try {
            const result = await handleFormSubmit(values);

            if (result.status === "success") {
                console.log('Result:', values)
                router.push(AddProjectRoutes.REVIEW);
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
                <FormField control={form.control} name="apiKeyName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>API Key Name</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField
                    control={form.control}
                    name="enabled"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enable API Key</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Enable this API key
                                    </label>
                                </div>
                            </FormControl>
                            <FormDescription>You can enable or disable this key at any time.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={!form.formState.isValid}>Submit</Button>
            </form>
        </Form>

    )
}