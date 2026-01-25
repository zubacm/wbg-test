/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useRef } from "react";
import { FormWrapper } from "./style";
import TextInput from "../text-input";
import ButtonSecondary from "../buttons/button-secondary";
import { useTranslations } from "next-intl";
import ButtonTransparent from "../buttons/button-transparent";
import { useToken } from "@/app/api/auth/queries";
import { ClipLoader } from "react-spinners";
import { storeCredentials } from "@/app/api/auth/indexdb";

const LoginModalContent = forwardRef(({ onClose = () => {}, onSetUser = () => {} }, ref) => {
  const tGeneral = useTranslations("general");

  const dataRef = useRef({
    username: "",
    password: "",
  });

  const successLogin = async () => {
    await storeCredentials(
      dataRef?.current?.username,
      dataRef?.current?.password,
    );
    onSetUser({
      username: dataRef?.current?.username,
      password: dataRef?.current?.password,
    });
    onClose();
  };

  const { mutate, isLoading } = useToken(
    () => successLogin(),
    () => {
      toast.error(tGeneral("wrongCredentials"));
    },
  );

  const onSubmit = (e) => {
    e?.preventDefault();
    mutate(dataRef?.current);
  };

  return (
    <FormWrapper>
      <div className="titl">
        <div />
        <div>{tGeneral("login")?.toUpperCase()}</div>
        <ButtonTransparent type="button" size="small" onClick={onClose}>
          <i className="fi fi-rs-cross i-16" />
        </ButtonTransparent>
      </div>
      <TextInput
        onChange={(e) => {
          dataRef.current = {
            ...dataRef?.current,
            username: e?.target?.value,
          };
        }}
        tabIndex={2}
        autoFocus
        placeholder={tGeneral("username")}
        icon="fi-rs-user"
      />
      <TextInput
        onChange={(e) => {
          dataRef.current = {
            ...dataRef?.current,
            password: e?.target?.value,
          };
        }}
        type="password"
        icon="fi-rs-key"
        placeholder={tGeneral("password")}
      />
      <ButtonSecondary
        className="center-content-btn"
        disabled={isLoading}
        onClick={() => {
          onSubmit();
        }}
        type="button"
      >
        {/* <i className="fi fi-rs-disk i-16" /> */}
        {/* <div>{tGeneral("save")}</div> */}
        <div>{tGeneral("confirm")}</div>
        <ClipLoader
          color="var(--white)"
          loading={isLoading === true}
          size={"20px"}
        />
      </ButtonSecondary>
    </FormWrapper>
  );
});

export default LoginModalContent;
