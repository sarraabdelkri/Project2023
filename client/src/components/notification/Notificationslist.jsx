import notificationStore from "@/store/notificationStore";
import { AppLayout } from "@/widgets/layout";
import { Card } from "@material-tailwind/react";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { TrashIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';

export default function Notificationslist() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [notifications, setNotifications] = useState([]);
  const userId = user ? user._id : null;
  const getUserNotifications = notificationStore(
    (state) => state.getUserNotifications
  );
  const clearNotifications = notificationStore(
    (state) => state.clearNotifications
  );
  const deleteHistory = async () => {
    clearNotifications(userId);
    window.location.reload();
  };
  const getnotifications = async () => {
    const response = await getUserNotifications(userId);
    setNotifications(response.data);
    console.log(notifications);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
    getnotifications();
  }, []);

  if (!notifications) {
    return (
      <div className="flex h-screen items-center justify-center">
        <BeatLoader color="#1E9645" size={20} />
      </div>
    );
  }
  return (
    <>
      <AppLayout>
        <AppLayout.Header>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>History</div>
            <div>
              <button onClick={deleteHistory}>
                {" "}
                <TrashIcon className="h-6 w-6 mt-2" style={{ marginLeft: 515 }} />
              </button>
            </div>
          </div>
        </AppLayout.Header>
        <AppLayout.Content>
          <Container className="mt-2">
            <Row>
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#F8F8F8",
                    }}
                    className="mb-3"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                        color: "#454545",
                      }}
                    >
                      <p style={{ fontWeight: 550 }}> {notification.message}</p>
                      <p style={{ textAlign: "right" }}>
                        <small>
                          {new Date(notification.createdAt)
                            .toISOString()
                            .slice(0, 16)
                            .replace("T", " ")}
                        </small>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-center items-center h-full mt-6">
                    <div className="flex flex-col items-center">
                      <p style={{ color: "#D2D2D2" }}>No history found</p>
                      <NoSymbolIcon style={{ color: "#D2D2D2" }} className="h-10 w-10" />
                    </div>
                  </div></>
              )}
            </Row>
          </Container>
        </AppLayout.Content>
      </AppLayout>
    </>
  );
}
