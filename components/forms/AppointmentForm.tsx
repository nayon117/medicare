/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.action";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKLETON = "skleton",
}

const AppointmentForm = ({
  type,
  userId,
  patientId,
}: {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
     primaryPhysician: "",
        schedule: new Date(),
        reason: "",
        note: "",
        cancellationReason: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
        case 'schedule':
            status = "scheduled"
            break;
        case 'cancel':
            status = "cancelled"
            break;
        default:
            status = "pending"
            break;
    }

    try {
      if(type ==='create' && patientId){
        const appointmentData = {
            userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule:new Date(values.schedule),
            reason: values.reason!,
            note: values.note,
            status: status as Status, 
        }
        const appointment = await createAppointment(appointmentData);
        if(appointment){
            form.reset();
            router.push(`/patients/${userId}/new-appoinment/success?appointmentId=${appointment.$id}`)
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel ;
  switch (type) {
    case 'cancel':
        buttonLabel = "Cancel Appointment"
        break;
    case 'create':
        buttonLabel = "Create Appointment"
        break;
    case 'schedule':
        buttonLabel = "Schedule Appointment"
        break;
  
    default:
        break;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6 "
      >
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appoinment</h1>
          <p className="text-dark-700">
            Request a new appoinment in 10 seconds{" "}
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="schedule"
            label="Expected Appointment Date"
            showTimeSelect
            dateFormat="MM/dd/yyyy - h:mm aa"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="reason"
            label="Reason for appointment"
            placeholder="Enter a reason for the appointment"
          />
           <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="note"
            label="Notes"
            placeholder="Enter any notes for the doctor"
          />
          </div>
          </>
        )}

        {type === "cancel" && (
             <CustomFormField
             control={form.control}
             fieldType={FormFieldType.TEXTAREA}
             name="cancellationReason"
             label="Reason for cancellation"
             placeholder="Enter a reason for the cancellation"
           />
        )}

        <SubmitButton 
        isLoading={isLoading} 
        className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full `}
        >{buttonLabel}</SubmitButton>
      </form>
    </Form>
  );
};
export default AppointmentForm;
