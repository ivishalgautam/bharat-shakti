"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { faqSchema } from "@/utils/schema/faq.schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../ui/spinner";
import ErrorMessage from "../ui/error";
import { Trash2, Plus } from "lucide-react";
import {
  useCreateFAQ,
  useGetFAQ,
  useUpdateFAQ,
} from "@/mutations/faq-mutation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function FAQForm({ id, type = "create" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      faqs: [{ question: "", answer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const router = useRouter();

  const handleSuccess = () => {
    reset();
    router.replace("/faqs?limit=10");
  };

  const createMutation = useCreateFAQ(handleSuccess);
  const updateMutation = useUpdateFAQ(id);
  const { data, isLoading, isError, error } = useGetFAQ(id);

  const onSubmit = async (data) => {
    if (type === "create") {
      createMutation.mutate(data);
    }
    if (type === "edit") {
      updateMutation.mutate(data);
    }
  };

  useEffect(() => {
    if (data) {
      setValue(
        "faqs",
        data.faqs.length > 0 ? data.faqs : [{ question: "", answer: "" }]
      );
    }
  }, [data, setValue]);

  if (type === "edit" && isLoading) return <Spinner />;
  if (type === "edit" && isError) return <ErrorMessage error={error} />;

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="sr-only">Tender Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                Frequently Asked Questions
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ question: "", answer: "" })}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Add FAQ
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">FAQ Item {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor={`faqs.${index}.question`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Question
                  </Label>
                  <Input
                    id={`faqs.${index}.question`}
                    type="text"
                    className={cn({
                      "border-red-500": errors.faqs?.[index]?.question,
                    })}
                    {...register(`faqs.${index}.question`)}
                    placeholder="Enter question"
                  />
                  {errors.faqs?.[index]?.question && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.faqs[index].question.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor={`faqs.${index}.answer`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Answer
                  </Label>
                  <Textarea
                    id={`faqs.${index}.answer`}
                    className={cn({
                      "border-red-500": errors.faqs?.[index]?.answer,
                    })}
                    {...register(`faqs.${index}.answer`)}
                    placeholder="Enter answer"
                    rows={4}
                  />
                  {errors.faqs?.[index]?.answer && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.faqs[index].answer.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-end">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Submitting..."
                : type === "create"
                  ? "Create"
                  : "Update"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
