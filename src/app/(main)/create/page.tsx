"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { PhotoStep } from "@/components/profile/photo-step";
import { BasicInfoStep } from "@/components/profile/basic-info-step";
import { PreferencesStep } from "@/components/profile/preferences-step";
import { createProfile } from "@/app/(main)/create/actions";
import { useToast } from "@/components/ui/toaster";
import type { ProfileFormData } from "@/lib/validations/profile";

const steps = [
  { id: 1, title: "사진", description: "친구의 사진을 올려주세요", motivation: "💡 좋은 사진이 조회수를 3배 높여요!" },
  { id: 2, title: "기본 정보", description: "친구에 대해 알려주세요", motivation: "✨ 솔직한 소개가 매칭 확률을 높여요" },
  { id: 3, title: "취향", description: "친구의 취향을 선택해주세요", motivation: "🎉 거의 다 왔어요!" },
];

export default function CreateProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ProfileFormData>>({});

  const handleStepComplete = (stepData: Partial<ProfileFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (finalData: Partial<ProfileFormData>) => {
    const completeData = { ...formData, ...finalData } as ProfileFormData;

    setIsSubmitting(true);

    try {
      const result = await createProfile(completeData);

      if (result.error) {
        toast({
          title: "오류",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "성공",
        description: "프로필 링크가 생성되었어요!",
        variant: "success",
      });

      router.push(`/create/complete?id=${result.profileId}`);
    } catch {
      toast({
        title: "오류",
        description: "프로필 생성에 실패했어요. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-muted pb-8">
        {/* Progress bar */}
        <div className="sticky top-14 z-30 bg-white px-4 py-3 shadow-soft">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${currentStep > step.id
                        ? "bg-primary text-white"
                        : currentStep === step.id
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-0.5 w-12 sm:w-20 transition-colors ${currentStep > step.id ? "bg-primary" : "bg-muted"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start justify-between">
              <div>
                <h2 className="font-bold">{steps[currentStep - 1].title}</h2>
                <p className="text-sm text-muted-foreground">
                  {steps[currentStep - 1].description}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>⏱️</span>
                <span>약 2분</span>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-primary">
              {steps[currentStep - 1].motivation}
            </p>
          </div>
        </div>

        {/* Form steps */}
        <div className="mx-auto max-w-lg px-4 pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <PhotoStep
                  defaultValues={formData}
                  onNext={handleStepComplete}
                />
              )}
              {currentStep === 2 && (
                <BasicInfoStep
                  defaultValues={formData}
                  onNext={handleStepComplete}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <PreferencesStep
                  defaultValues={formData}
                  onSubmit={handleSubmit}
                  onBack={handleBack}
                  isSubmitting={isSubmitting}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
