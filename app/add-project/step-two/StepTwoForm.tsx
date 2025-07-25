'use client';

import { FormInput } from "@/components/ui/form-input";
import SubmitButton from "@/components/submit-button";

export default function StepTwoForm() {
    return (
        <form className="flex flex-1 flex-col items-center">
        <div className="flex flex-col gap-2 w-full lg:max-w-[700px]">
            <FormInput label="Model" id="Model" type="text" required />
            <FormInput 
                label="Provider"
                id="provider"
                type="text"
                required
                 />
            <FormInput label="Type" id="type" type="text" required minLength={5} maxLength={100}/>
            <FormInput label="Family" id="family" type="text" required />
            <FormInput label="Launch Date" id="launchDate" type="text" required />
            <FormInput label="Discontinuation Data" id="discontinuationDate" type="date" required />
            <FormInput label="Context Window" id="contextWindow" type="text" required />
            <FormInput label="JSON Params" id="params" type="text" required />
            <FormInput 
                label="Price per Mln token input" 
                id="priceMlnInput" 
                type="number" 
                min={1} 
                max={10000}
                required />
            <FormInput 
                label="Price per Mln token output" 
                id="priceMlnOutput" 
                type="number" 
                min={1} 
                max={10000}
                required />

            <SubmitButton text="Submit"/>
        </div>
    </form>
    )
}