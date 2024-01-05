"use client";
import { Suspense, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Button, theme, notification } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Styles from "@/styles/app/dashboard/layout.module.scss";
import Loading from "@/components/Loading";

type MenuItem = Required<MenuProps>["items"][number];

type NotificationType = "success" | "info" | "warning" | "error";

const { Header, Sider, Content } = Layout;

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  theme?: "light" | "dark"
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    theme,
  } as MenuItem;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("top_rated");
  const [api, contextHolder] = notification.useNotification();

  // Notifications Handler
  // const openNotificationWithIcon = (type: NotificationType) => {
  //   api[type]({
  //     message: "Logout",
  //     description: "Do you really want to Logout?",
  //   });
  // };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem(
      <span className={Styles.item_icon_style}>top rated</span>,
      "top_rated",
      listName === "top_rated" ? (
        <VideoCameraOutlined style={{ fontSize: 18 }} />
      ) : null
    ),
    getItem(
      <span className={Styles.item_icon_style}>Popular</span>,
      "popular",
      listName === "popular" ? (
        <VideoCameraOutlined style={{ fontSize: 18 }} />
      ) : null
    ),
    getItem(
      <span className={Styles.item_icon_style}>Upcoming</span>,
      "upcoming",
      listName === "upcoming" ? (
        <VideoCameraOutlined style={{ fontSize: 18 }} />
      ) : null
    ),
  ];

  const logoutHandler = () => {
    Cookies.remove("mvdb_name");
    router.push("/");
  };

  return (
    <Layout className={Styles.layout}>
      {contextHolder}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={230}
        style={{
          zIndex: 2,
          position: "fixed",
          height: "100%",
          boxShadow: "0.5px 0.5px 20px lightgrey",
          background: colorBgContainer,
        }}
      >
        <div className={Styles.logo_wrapper} onClick={() => router.push("/")}>
          <HomeOutlined className={Styles.logo_icon} />
          {!collapsed && <span className={Styles.logo_txt}>Movie App</span>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[listName]}
          items={items}
          inlineIndent={60}
          onSelect={(data) => {
            setListName(data.selectedKeys[0]);
          }}
          onClick={(e) => {
            router.push(`/${e.key}`);
          }}
        />
      </Sider>
      <Layout>
        <Header
          className={Styles.header}
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            className={`${Styles.collapse_btn} ${
              collapsed && Styles.btn_after
            }`}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <Button
            className={Styles.logout_btn}
            type="text"
            icon={
              <UserOutlined
                style={{ fontSize: 26 }}
                onClick={() => logoutHandler()}
              />
            }
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          style={{
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}
