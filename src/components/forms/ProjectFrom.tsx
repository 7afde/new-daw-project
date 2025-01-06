"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState } from "react-dom";
import { createProject } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as z from "zod";

// Define the validation schema for project
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  domain: z.string().min(1, "Domain is required"),
  technologies: z.string().min(1, "Technologies are required"),
  keywords: z.string().min(1, "Keywords are required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED"]),
  teacherId: z.string().min(1, "Teacher ID is required"),
});

export type ProjectSchema = z.infer<typeof projectSchema>;

const ProjectForm = ({
  type,
  data,
  setOpen,
  relatedData = { teachers: [] },
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { teachers: { id: string; name: string; surname: string }[] };
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      domain: data?.domain || "",
      technologies: data?.technologies || "",
      keywords: data?.keywords || "",
      status: data?.status || "OPEN",
      teacherId: data?.teacherId || "",
    },
  });

  const [state, formAction] = useFormState(createProject, {
    success: false,
    error: false,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Project has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers = [] } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new project" : "Update the project"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />

        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />

        <InputField
          label="Domain"
          name="domain"
          defaultValue={data?.domain}
          register={register}
          error={errors?.domain}
        />

        <InputField
          label="Technologies"
          name="technologies"
          defaultValue={data?.technologies}
          register={register}
          error={errors?.technologies}
        />

        <InputField
          label="Keywords"
          name="keywords"
          defaultValue={data?.keywords}
          register={register}
          error={errors?.keywords}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Status</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("status")}
            defaultValue={data?.status || "OPEN"}
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          {errors.status?.message && (
            <p className="text-xs text-red-400">{errors.status.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Teacher</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("teacherId")}
            defaultValue={data?.teacherId}
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name} {teacher.surname}
              </option>
            ))}
          </select>
          {errors.teacherId?.message && (
            <p className="text-xs text-red-400">{errors.teacherId.message}</p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ProjectForm;
