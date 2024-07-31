"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JoinMeetingFields, JoinMeetingValidationSchema } from "@/types/forms";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function JoinMeetingWidget() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<JoinMeetingFields>({
    mode: "onBlur",
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(JoinMeetingValidationSchema),
  });
  const watchCode = watch("code");
  const router = useRouter();
  const onSubmit: SubmitHandler<JoinMeetingFields> = async (data) => {
    router.push(data.code);
  };
  const onError: SubmitErrorHandler<JoinMeetingFields> = async (data) => {
    toast.error(data.code?.message || "");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid gap-3 sm:grid-cols-[3fr,1fr]"
      >
        <Input
          {...register("code")}
          className="h-14 sm:rounded-2xl"
          placeholder="Enter code"
          maxLength={18}
        />
        <Button type="submit" className="sm:rounded-2xl">
          {isSubmitting ? "Validating" : "Join"}
        </Button>
      </form>
      <div className="ml-2 mt-1">{watchCode.length}/18</div>
    </>
  );
}
