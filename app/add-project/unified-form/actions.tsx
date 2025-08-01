'use server';

import { newProjectSchema } from "@/lib/schemas";
import { z } from "zod";

export async function createNewProject(values: z.infer<typeof newProjectSchema>) {

    const result = await newProjectSchema.safeParse(values);

    if (!result.success) {
        return {
            status: "error",
            message: result.error.message,
        }
    }

    return {
        status: "success",
        message: "Project created successfully",
    }
    
}

export async function handleProjectFormSubmit(values: z.infer<typeof newProjectSchema>) {
    const result = await createNewProject(values)
  
    if (result.status === "success") {
      console.log('Result:', values)
      return {
        status: "success",
        message: result.message,
        
      }
    } else {
      return {
        status: "error",
        message: result.message,
      }
    }
  }