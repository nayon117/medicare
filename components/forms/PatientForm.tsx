"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKLETON = "skleton",
}



const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
 async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
   setIsLoading(true);
   try {
    // const userData = {name,email,phone};

    // const user = await createUser(userData);

    // if(user) router.push(`/patients/${user.$id}/register`)

   } catch (error) {
    console.log(error);
   }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 "
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi,there </h1>
          <p className="text-dark-700">Schedule your first Appoinment </p>
        </section>

        {/* name */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* email */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="john@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        {/* phone number */}
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="(666) 123 4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
export default PatientForm;
