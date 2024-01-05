"use client";
import { List, Avatar } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import React, { useState } from "react";

export const ReplyModalList = (item: any) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return toggle ? (
    <>
      <CaretUpOutlined
        style={{ color: "gray" }}
        onClick={() => setToggle(!toggle)}
      />
      <List
        dataSource={item.comment}
        renderItem={(commentItem: any, index: number) => (
          <List.Item style={{ borderBottom: 0 }}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{commentItem.nick_name}</a>}
              description={commentItem.content}
            />
          </List.Item>
        )}
        style={{ marginLeft: 50 }}
      />
    </>
  ) : (
    <CaretDownOutlined
      style={{ color: "gray" }}
      onClick={() => setToggle(!toggle)}
    />
  );
};
