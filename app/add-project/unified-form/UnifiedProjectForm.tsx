'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newProjectSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription, FormFieldWithValidation } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { handleProjectFormSubmit } from "./actions";
import { toast } from "sonner";

const prefilledValues: z.infer<typeof newProjectSchema> = {
    projectName: "Api Key Test",
    team: "Test Team",
    link: "https://example.com",
    projectDescription: "Test Description",
    environment: "test",
    modelName: "GPT-4",
    provider: "Google",
    modelType: "Test Model Type",
    modelFamily: "Test Model Family",
    launchDate: "2026-01-01",
    discontinuationDate: "2026-10-01",
    contextWindow: "8192",
    params: JSON.stringify({
        temperature: 0.7,
        max_tokens: 1000
    }),
    priceMlnInput: "0.00",
    priceMlnOutput: "0.00",
    apiKeyName: "8d8dc0f9-98f7-4fe3-b442-83865105519c",
    enabled: true,

}


export default function UnifiedProjectForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof newProjectSchema>>({
        resolver: zodResolver(newProjectSchema),
        mode: "onChange",
        defaultValues: {
            // Step One - Project Information
            projectName: "",
            team: "",
            link: "",
            projectDescription: "",
            environment: "test",

            // Step Two - Model Information
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

            // Step Three - API Configuration
            apiKeyName: "",
            enabled: true,
        },
    });

    async function onSubmit(values: z.infer<typeof newProjectSchema>) {
        try {


           /*  const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Project created successfully!', {
                    description: 'You can now use this project in your dashboard.',
                    duration: 2000,
                });
                console.log('Project data:', result.data);

                // Redirect to a dashboard
                router.push('/dashboard');
            } else {
                toast.error(`Error: ${result.message || 'Failed to create project'}`);
                console.error('API Error:', result);
            } */
           const result = await handleProjectFormSubmit(values);

           if (result.status === "success") {
            console.log('Result:', values)
            toast.success("Project created successfully", {
                duration: 2000,
                position: 'bottom-center',
                richColors: true
            }
            );
            router.push('/dashboard');
          } else {
            // Handle validation errors - they should be displayed in form fields
            // The form will automatically show validation errors from Zod
          }

/*            if (result.status === "success") {
            toast.success(result.message, {
                description: "Project created successfully",
                duration: 2000,
            });
            router.push('/dashboard');
           } else {
            toast.error(result.message);
           } */

        } catch (error) {
            console.error("Form submission error:", error);
            alert('An unexpected error occurred. Please try again.');
        }
    }

    return (
        <>
        <Button className="mb-4" onClick={() => form.reset(prefilledValues)}>Populate Form</Button>
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Step One - Project Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Project Information</CardTitle>
                        <CardDescription>Basic details about your project</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Project Name</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 5 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="Enter project name" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="team"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Team</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="Enter team name" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="link"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>Project Link</FormLabel>
                                            <FormFieldWithValidation
                                                isValid={field.value.length > 0 && !fieldState.error}
                                                showValidation={field.value.length > 0}
                                            >
                                                <FormControl>
                                                    <Input {...field} placeholder="https://example.com" />
                                                </FormControl>
                                            </FormFieldWithValidation>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="environment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Environment</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select environment" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="test">Test</SelectItem>
                                                        <SelectItem value="development">Development</SelectItem>
                                                        <SelectItem value="staging">Staging</SelectItem>
                                                        <SelectItem value="preprod">Pre-production</SelectItem>
                                                        <SelectItem value="production">Production</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex-1">
                                <FormField
                                    control={form.control}
                                    name="projectDescription"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe your project (optional)"
                                                    rows={5}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Step Two - Model Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Model Information</CardTitle>
                        <CardDescription>Details about the AI model you&apos;re using</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="modelName"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Model Name</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="Enter model name" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="provider"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Provider</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., OpenAI, Anthropic" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="modelType"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Model Type</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 5 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., GPT-4, Claude-3" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="modelFamily"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Model Family</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., GPT, Claude" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="launchDate"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Launch Date</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} type="date" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discontinuationDate"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Discontinuation Date (Optional)</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={!fieldState.error}
                                            showValidation={!!field.value && field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} type="date" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="contextWindow"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Context Window</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., 8192" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="priceMlnInput"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Price per Mln (Input)</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="0.00" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="priceMlnOutput"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Price per Mln (Output)</FormLabel>
                                        <FormFieldWithValidation
                                            isValid={field.value.length >= 1 && !fieldState.error}
                                            showValidation={field.value.length > 0}
                                        >
                                            <FormControl>
                                                <Input {...field} placeholder="0.00" />
                                            </FormControl>
                                        </FormFieldWithValidation>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="params"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Model Parameters (JSON)</FormLabel>
                                    <FormFieldWithValidation
                                        isValid={field.value.length >= 1 && !fieldState.error}
                                        showValidation={field.value.length > 0}
                                    >
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder='{"temperature": 0.7, "max_tokens": 1000}'
                                                rows={4}
                                            />
                                        </FormControl>
                                    </FormFieldWithValidation>
                                    <FormDescription>
                                        Enter model parameters in valid JSON format
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Step Three - API Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle>API Configuration</CardTitle>
                        <CardDescription>API key settings and configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="apiKeyName"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>API Key Name</FormLabel>
                                    <FormFieldWithValidation
                                        isValid={field.value.length >= 1 && !fieldState.error}
                                        showValidation={field.value.length > 0}
                                    >
                                        <FormControl>
                                            <Input {...field} placeholder="Enter API key name" />
                                        </FormControl>
                                    </FormFieldWithValidation>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                    <FormDescription>
                                        You can enable or disable this key at any time.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Submitting..." : "Create Project"}
                    </Button>
                </div>
            </form>
        </Form>
        </>
    );
} 