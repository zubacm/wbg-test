/* eslint-disable react/display-name */
"use client";

/* eslint-disable react/jsx-key */
import { forwardRef, useRef } from "react";
import { FormWrapper } from "./style";
import TextInput from "../text-input";
import ButtonSecondary from "../buttons/button-secondary";
import { useTranslations } from "next-intl";
import ButtonTransparent from "../buttons/button-transparent";

const LoginModalContent = forwardRef(({ onClose = () => {} }, ref) => {
  const tGeneral = useTranslations("general");

  const dataRef = useRef({
    username: "",
    password: "",
  });

  return (
    <FormWrapper>
      <div className="titl">
        <div />
        <div>LOGIN</div>
        <ButtonTransparent size="small" onClick={onClose}>
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
        placeholder="username"
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
        placeholder="password"
      />
      <ButtonSecondary
        className="center-content-btn"
        onClick={() => {
          onSubmit();
        }}
      >
        {/* <i className="fi fi-rs-disk i-16" /> */}
        {/* <div>{tGeneral("save")}</div> */}
        <div>Confirm</div>
      </ButtonSecondary>
    </FormWrapper>
  );
});

export default LoginModalContent;
