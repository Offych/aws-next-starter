'use server';

import { stepOneSchema } from "@/lib/schemas";
import { z } from "zod";


export async function createProjectStepOne(values: z.infer<typeof stepOneSchema>) {
  
    const result = await stepOneSchema.safeParse(values);

    if (!result.success) {
        return {
            status: "error",
            message: result.error.message,
        }
    }

    return {
        status: "success",
        message: "Step one passed successfully",
    }
    
}

export async function handleFormSubmit(values: z.infer<typeof stepOneSchema>) {
    const result = await createProjectStepOne(values)
  
    if (result.status === "success") {
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