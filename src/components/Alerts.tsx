import React from "react";
import { Alert } from "antd";
import Styles from "@/styles/app/components/alerts.module.scss";

type AlertProps = {
  type: string;
  message: string;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const Alerts = ({ type, message, setState }: AlertProps) => {
  return type === "success" ? (
    <Alert
      className={Styles.alert}
      type="success"
      message={message}
      onClose={() =>
        setState((prevState: any) => {
          const currentState = { ...prevState, isClose: false };
          return currentState;
        })
      }
      showIcon
      closable
    />
  ) : type === "warning" ? (
    <Alert
      className={Styles.alert}
      type="warning"
      message={message}
      onClose={() =>
        setState((prevState: any) => {
          const currentState = { ...prevState, isClose: false };
          return currentState;
        })
      }
      showIcon
      closable
    />
  ) : (
    <Alert
      className={Styles.alert}
      type="error"
      message={message}
      onClose={() =>
        setState((prevState: any) => {
          const currentState = { ...prevState, isClose: false };
          return currentState;
        })
      }
      showIcon
      closable
    />
  );
};

export default React.memo(Alerts);
