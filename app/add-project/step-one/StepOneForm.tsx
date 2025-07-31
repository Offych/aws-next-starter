'use client';

//import SubmitButton from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema, EnvironmentEnum } from "@/lib/schemas";
import { handleFormSubmit } from "./actions";
import { AddProjectRoutes } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function StepOneForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      team: "",
      link: "",
      projectDescription: "",
      environment: "test",
    },
  });

  async function onSubmit(values: z.infer<typeof stepOneSchema>) {
    try {
      const result = await handleFormSubmit(values);

      if (result.status === "success") {
        console.log('Result:', values)
        router.push(AddProjectRoutes.STEP_TWO);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <FormField control={form.control} name="projectName" render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="team" render={({ field }) => (
          <FormItem>
            <FormLabel>Team Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="link" render={({ field }) => (
          <FormItem>
            <FormLabel>Gira Link</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField
          control={form.control}
          name="environment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Environment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an environment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="preprod">Preprod</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Please select your environment</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter your project description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          }
        />
        <Button disabled={!form.formState.isValid}>Submit</Button>
      </form>
    </Form>

  )
}