// src/components/Column.jsx
import React from "react";
import Card from "./Card";
import { Icon } from "@iconify/react";
import "../styles/Column.css";

const Column = ({ title, items }) => {
  return (
    <div className="column">
      <div className="title-cont">
        <h2>{title}</h2>
        <div>
          <Icon icon="ic:baseline-plus" />
          <Icon icon="solar:menu-dots-bold" />
        </div>
      </div>
      {items.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description || ""}
          type="Featured Request"
          priority={item.priority}
          userName={item.userId}
        />
      ))}
    </div>
  );
};

export default Column;
