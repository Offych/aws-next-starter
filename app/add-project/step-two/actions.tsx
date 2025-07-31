'use server';

import { stepTwoSchema } from "@/lib/schemas";
import { z } from "zod";

export async function createProjectStepTwo(values: z.infer<typeof stepTwoSchema>) {

    const result = await stepTwoSchema.safeParse(values);

    if (!result.success) {
        return {
            status: "error",
            message: result.error.message,
        }
    }

    return {
        status: "success",
        message: "Step two passed successfully",
    }
    
}

export async function handleFormSubmit(values: z.infer<typeof stepTwoSchema>) {
    const result = await createProjectStepTwo(values)
  
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