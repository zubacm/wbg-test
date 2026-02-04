/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useRef, useState } from "react";
import { FormWrapper } from "./style";
import TextInput from "../text-input";
import ButtonSecondary from "../buttons/button-secondary";
import { useTranslations } from "next-intl";
import ButtonTransparent from "../buttons/button-transparent";
import { useToken } from "@/app/api/auth/queries";
import { ClipLoader } from "react-spinners";
import { storeCredentials } from "@/app/api/auth/indexdb";
import { toast } from "react-toastify";

const LoginModalContent = forwardRef(
  ({ onClose = () => {}, onSetUser = () => {} }, ref) => {
    const tGeneral = useTranslations("general");

    const [errorText, setErrorText] = useState("");

    const dataRef = useRef({
      username: "",
      password: "",
    });

    const successLogin = async (token) => {
      await storeCredentials(
        dataRef?.current?.username,
        dataRef?.current?.password,
        token
      );
      onSetUser({
        username: dataRef?.current?.username,
        password: dataRef?.current?.password,
        token
      });
      onClose();
    };

    const { mutate, isLoading } = useToken(
      (res) => {
        console.log("rs", res?.token)
        successLogin(res?.token);
        setErrorText("")
      },
      (e) => {
        setErrorText(
          e?.response?.data?.message || tGeneral("wrongCredentials"),
        );
        // toast.error(tGeneral("wrongCredentials"));
      },
    );

    const onSubmit = (e) => {
      e?.preventDefault();
      setErrorText("");
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
          tabIndex={3}
          placeholder={tGeneral("password")}
        />
        <div
          className="error-text"
          dangerouslySetInnerHTML={{
            __html: errorText?.toString(),
          }}
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
  },
);

export default LoginModalContent;
