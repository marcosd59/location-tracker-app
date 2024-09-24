import React, { useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import "../styles/Principal.css";
import MapContainer from "./MapContainer";
const { Header, Content, Footer } = Layout;

const Principal = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleMenuClick = (item) => {
    switch (item.key) {
      case "1":
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        } else {
          alert("La geolocalización no está disponible en tu navegador.");
        }
        break;
      case "2":
        setCoordinates({ lat: 21.160184, lng: -86.832918 });
        break;
      case "3":
        setCoordinates({ lat: 21.042066, lng: -86.872649 });
        break;
      case "4":
        const randomLat = Math.random() * 180 - 90;
        const randomLng = Math.random() * 360 - 180;
        setCoordinates({ lat: randomLat, lng: randomLng });
        break;
      default:
        setCoordinates({ lat: 0, lng: 0 });
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          onClick={handleMenuClick}
          items={[
            { key: "1", label: "Live" },
            { key: "2", label: "Home" },
            { key: "3", label: "Work" },
            { key: "4", label: "Random" },
          ]}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Google</Breadcrumb.Item>
          <Breadcrumb.Item>Maps</Breadcrumb.Item>
          <Breadcrumb.Item>API</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <h2>Mi ubicación</h2>
          <MapContainer coordinates={coordinates} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024</Footer>
    </Layout>
  );
};

export default Principal;
