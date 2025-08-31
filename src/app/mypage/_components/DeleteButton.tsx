"use client";

import React from "react";
import { Button } from "@/app/_global/components/Buttons";

import useAlertDialog from "@/app/_global/hooks/useAlertDialog";

export default function DeleteButton() {
  const alertDialog = useAlertDialog();

  const doDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/member/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({
          message: "회원 탈퇴가 완료되었습니다.",
        }));
        alertDialog({
          title: "탈퇴 완료",
          text: data.message,
          icon: "success",
          callback: () => {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          },
        });
        return;
      }

      if (res.status === 401) {
        alertDialog({
          title: "인증 만료",
          text: "로그인 세션이 만료되었습니다. 다시 로그인해주세요.",
          icon: "warning",
          callback: () => {
            localStorage.removeItem("accessToken");
            window.location.href = "/member/login";
          },
        });
        return;
      }

      if (res.status === 403) {
        alertDialog({
          title: "권한 없음",
          text: "탈퇴 권한이 없습니다. 관리자에게 문의해주세요.",
          icon: "error",
        });
        return;
      }

      const err = await res.json().catch(() => ({}));
      alertDialog({
        title: "탈퇴 실패",
        text: err.message ?? "회원 탈퇴에 실패했습니다.",
        icon: "error",
      });
    } catch {
      alertDialog({
        title: "에러",
        text: "서버 연결 오류가 발생했습니다.",
        icon: "error",
      });
    }
  };

  const handleDelete = () => {
    alertDialog({
      title: "회원 탈퇴",
      text: "정말 회원 탈퇴를 진행하시겠습니까?",
      icon: "warning",
      callback: doDelete,
    });
  };

  return (
    <Button onClick={handleDelete}>
      회원 탈퇴
    </Button>
  );
}
