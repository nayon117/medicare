/* eslint-disable no-undef */
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";

const NewAppoinment =async ({params:{userId}}:SearchParamProps) => {
    const patient = await getPatient(userId);
  return (
    <div className="flex h-screen min-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container  max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-icon.svg"
            width={1000}
            height={1000}
            alt="illustration"
            className="mb-12 h-10 w-fit"
          />

         <AppointmentForm
          type="create" 
          userId={userId}
          patientId={patient?.$id}
          />

            <p className="copyright py-12">
              ©2024 Medicare
            </p>
         
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};
export default NewAppoinment;
