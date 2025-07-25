'use client';

import { FormInput } from "@/components/ui/form-input";
import SubmitButton from "@/components/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";



export default function StepThreeForm() {
    return (
        <form className="flex flex-1 flex-col items-center">
            <div className="flex flex-col gap-8 w-full lg:max-w-[700px]">
                <FormInput label="Api key" id="name" type="text" required />
                <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        
      </div>
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox
                id="toggle-2"
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                    Status of API KEY (enabled or disabled)
                </p>
                <p className="text-muted-foreground text-sm">
                    You can enable or disable this key at any time.
                </p>
                </div>
            </Label>
            </div>
                <SubmitButton text="Submit" />
            </div>
        </form>
    )
}