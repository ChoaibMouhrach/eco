import Button from "@/components/Button";
import Input from "@/components/Input";
import { CgSpinnerTwoAlt } from "react-icons/cg"
import { MdCheck, MdOutlineSmsFailed } from "react-icons/md"

export default function ConfirmEmail() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div
        className="w-full max-w-sm flex flex-col gap-2 "
      >
        <div className="flex flex-col space-y-4 text-center py-4 ">
          <h1 className="font-bold text-4xl">QM</h1>
          <h2 className="text-2xl tracking-light font-semibold">
            Email Address Confirmation
          </h2>
          <h3 className="text-sm text-slate-500">
            We are confirming your email address
          </h3>
        </div>
        <div className="py-4 flex items-center justify-center flex-col gap-4 text-center" >
          {/* <CgSpinnerTwoAlt className="w-10 animate-spin h-10" /> */}
          {/*  <span className="text-neutral-600 font-semibold tracking-wide " >Confirming...</span>  */}
          {/*  <MdCheck className="w-10 fill-green-700 h-10" />  */}
          {/* <span className="text-green-700 font-semibold tracking-wide"  >Confirmed</span> */}
          <MdOutlineSmsFailed className="w-10 fill-red-700 h-10" />
          <span className="text-red-700 font-semibold tracking-wide"  >Confirmation failed<br /> try again later</span>
        </div>

        <Button href="/" variation="text" >{"<-  Home"}</Button>
      </div>
    </main>
  )
}
