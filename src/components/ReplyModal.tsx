import { Modal, List, Avatar } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import React from "react";
import { ModalProps } from "@/utils/propTypes";
import dummy_data from "@/utils/reply_dummy.json";

const ReplyModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(!isOpen)}
      footer={null}
      width={800}
    >
      <List
        dataSource={dummy_data}
        renderItem={(item, index) => (
          <>
            <List.Item style={{ borderBottom: 0, marginTop: 20 }}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.nick_name}</a>}
                description={item.content}
              />
            </List.Item>
            <span style={{ marginLeft: 50, color: "gray" }}>
              {item.comment.length
                ? `답글 ${item.comment.length}개`
                : "답글달기"}
            </span>
            &nbsp;
            {item.comment.length ? (
              <>
                <CaretDownOutlined style={{ color: "gray" }} />
                <List
                  dataSource={item.comment}
                  renderItem={(commentItem, index) => (
                    <List.Item style={{ borderBottom: 0 }}>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                          />
                        }
                        title={
                          <a href="https://ant.design">
                            {commentItem.nick_name}
                          </a>
                        }
                        description={commentItem.content}
                      />
                    </List.Item>
                  )}
                  style={{ marginLeft: 50 }}
                />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      />
    </Modal>
  );
};

export default React.memo(ReplyModal);
