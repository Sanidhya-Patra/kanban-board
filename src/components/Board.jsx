import React, { useState, useEffect } from "react";
import Column from "./Column";
import { Icon } from "@iconify/react";
import "../styles/Board.css";

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState({});
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();

        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Function to group tickets based on selected criterion
    const groupTickets = (criterion) => {
      let grouped = {};
      if (criterion === "status") {
        grouped = tickets.reduce((acc, ticket) => {
          const key = ticket.status;
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      } else if (criterion === "userId") {
        grouped = tickets.reduce((acc, ticket) => {
          const user =
            users.find((user) => user.id === ticket.userId)?.name || "Unknown";
          if (!acc[user]) acc[user] = [];
          acc[user].push(ticket);
          return acc;
        }, {});
      } else if (criterion === "priority") {
        grouped = tickets.reduce((acc, ticket) => {
          const key = `Priority ${ticket.priority}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(ticket);
          return acc;
        }, {});
      }
      return grouped;
    };

    const sortGroupedTickets = (groupedTickets, sortBy) => {
      const sortedGrouped = {};
      Object.keys(groupedTickets).forEach((key) => {
        const sortedTickets = [...groupedTickets[key]].sort((a, b) => {
          if (sortBy === "priority") {
            return a.priority - b.priority;
          } else if (sortBy === "title") {
            return a.title.localeCompare(b.title);
          }
          return 0;
        });
        sortedGrouped[key] = sortedTickets;
      });
      return sortedGrouped;
    };

    const grouped = groupTickets(groupBy);
    const sortedColumns = sortGroupedTickets(grouped, sortBy);
    setColumns(sortedColumns);
  }, [tickets, groupBy, sortBy, users]);

  const handleGroupChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="container">
      <div className="dropdown-container">
        <button className="dropdown-button" onClick={toggleDropdown}>
          <Icon icon="mingcute:settings-6-fill" /> Display{" "}
          <Icon icon="iconamoon:arrow-down-2" />
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown">
              <label htmlFor="group-by">Group By: </label>
              <select
                id="group-by"
                value={groupBy}
                onChange={handleGroupChange}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown">
              <label htmlFor="sort-by">Sort By: </label>
              <select id="sort-by" value={sortBy} onChange={handleSortChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="kanban-board">
        {Object.keys(columns).map((key) => (
          <Column key={key} title={key} items={columns[key]} />
        ))}
      </div>
    </div>
  );
};

export default Board;
