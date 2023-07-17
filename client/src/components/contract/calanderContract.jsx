import React, { useState, useEffect } from "react";
import moment from "moment";
import { AppLayout } from "@/widgets/layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import useContractStore from "@/store/contractStore";
const localizer = momentLocalizer(moment);
import { useNavigate, useParams } from "react-router-dom";
function ContractsCalendar() {
  const localizer = momentLocalizer(moment);
  const fetchContracts = useContractStore((state) => state.fetchContracts);
  const contracts = useContractStore((state) => state.contracts);
  useEffect(() => {
    fetchContracts();
  }, []);

  const events = contracts.map((contract) => ({

    title: ` employment contract for ${contract.user.name}`,
    start: new Date(contract.startDate),
    end: new Date(contract.endDate),
  }));
  console.log("events", events);
  console.log("contracts", contracts);

  return (
    <AppLayout>
      <AppLayout.Header>Contracts Calendar</AppLayout.Header>
      <AppLayout.Content>
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={(event, start, end, isSelected) => {
              const backgroundColor = "#f0ad4e";
              return {
                style: { backgroundColor },

                start: event.start,
                end: event.end,
              };
            }}
            onSelectEvent={() => (window.location.href = "/contract")}
          />
        </div>
      </AppLayout.Content>
    </AppLayout>
  );
}

export default ContractsCalendar;