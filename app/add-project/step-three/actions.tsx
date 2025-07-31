'use server';

import { stepThreeSchema } from "@/lib/schemas";
import { z } from "zod";

export async function createProjectStepThree(values: z.infer<typeof stepThreeSchema>) {

  const result = await stepThreeSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: result.error.message,
    }
  }

  return {
    status: "success",
    message: "Step three passed successfully",
  }

}

export async function handleFormSubmit(values: z.infer<typeof stepThreeSchema>) {
  const result = await createProjectStepThree(values)

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