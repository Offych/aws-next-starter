'use client';

import { FormInput } from "@/components/ui/form-input";
import SubmitButton from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function StepOneForm() {
    return (
        <form className="flex flex-1 flex-col items-center">
            <div className="flex flex-col gap-8 w-full lg:max-w-[700px]">
                <FormInput label="Project Name" id="name" type="text" required />
                <FormInput label="Team" id="team" type="text" required />
                <FormInput 
                    label="Gira Link"
                    id="link"
                    type="text"
                    required
                    /* description="Must start with http:// or https://" */
                    /* pattern={linkRegex} */ />

                <div className="grid w-full">
                    <Label htmlFor="message">Description</Label>
                    <Textarea placeholder="Type your message here." id="message" />
                </div>
                <SubmitButton text="Submit"/>
            </div>
        </form>
    )
}