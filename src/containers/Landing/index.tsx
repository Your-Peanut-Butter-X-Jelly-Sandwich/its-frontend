"use client";
import React from "react";
import HeaderLanding from "@/components/Header/HeaderLanding";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/redux";

const LandingContainer: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const t = useTranslations("Landing");
  return (
    <div>
      <HeaderLanding />
      <div className="text-4xl font-bold flex justify-center">
        LANDING PAGE: <strong>{t("title")}</strong> ! {user.email}
      </div>
    </div>
  );
};

export default LandingContainer;
