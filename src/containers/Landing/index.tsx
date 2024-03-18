"use client";
import React from "react";
import HeaderLanding from "@/components/Header/HeaderLanding";
import { useTranslations } from "next-intl";

const LandingContainer: React.FC = () => {
  const t = useTranslations("Landing");
  return (
    <div className="h-screen flex flex-col">
      <HeaderLanding />
      <div className="h-full text-4xl font-bold flex justify-center">
        <div className="flex flex-col justify-center">
          <div>
            <strong>{t("title")}</strong> !
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContainer;
