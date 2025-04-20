"use client";
import Link from "next/link";
import { NavbarItemWrapper } from "./style";
import React from "react";

export default function NavbarItem({ isActive, children }) {
  return (
    <NavbarItemWrapper className="tab-item" isActive={isActive}>
      <div>{children}</div>
      <div className="item-underline"></div>
    </NavbarItemWrapper>
  );
}
