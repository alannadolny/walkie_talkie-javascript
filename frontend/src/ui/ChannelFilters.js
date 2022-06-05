import * as _ from "lodash";
import { useEffect, useState } from "react";

function ChannelFilters({ channels, filters, setFilters }) {
  const [activeUsers, setActiveUsers] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    setActiveUsers(
      _.uniq(_.flatten(channels.map((el) => el.activeUsers))).map(
        (el) => el.login
      )
    );
  }, [channels]);

  useEffect(() => {
    setOwners(_.uniq(channels.map((channel) => channel.owner[0].login)));
  }, [channels]);

  return (
    <div className="channel-filters-container">
      <label id="channel-filters-container-title"> Find channel: </label>
      <input
        id="channel-filters-input"
        name="channel"
        type="text"
        placeholder="Write channel name:"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <label id="channel-filters-label-f"> Filters: </label>

      <span id="filter-name">
        {" "}
        <strong> Filter by active users: </strong>{" "}
      </span>
      <div className="filter-list">
        {activeUsers.map((el) => {
          return (
            <div id="filter-list-container" key={el}>
              <input
                type="checkbox"
                onChange={() => {
                  if (filters.activeUsers.includes(el))
                    setFilters({
                      ...filters,
                      activeUsers: [
                        ...filters.activeUsers.filter((el2) => el2 !== el),
                      ],
                    });
                  else
                    setFilters({
                      ...filters,
                      activeUsers: [...filters.activeUsers, el],
                    });
                }}
              />{" "}
              <span id="filter-list-container span"> {el} </span>
            </div>
          );
        })}
      </div>

      <span id="filter-name">
        {" "}
        <strong> Filter by owners: </strong>{" "}
      </span>
      <div className="filter-list">
        {owners.map((owner) => {
          return (
            <div id="filter-list-container" key={owner}>
              <input
                type="checkbox"
                onChange={() => {
                  if (filters.owners.includes(owner))
                    setFilters({
                      ...filters,
                      owners: [
                        ...filters.owners.filter((el2) => el2 !== owner),
                      ],
                    });
                  else
                    setFilters({
                      ...filters,
                      owners: [...filters.owners, owner],
                    });
                }}
              />{" "}
              <span id="filter-list-container span"> {owner} </span>
            </div>
          );
        })}
      </div>

      <div className="sort">
        <label id="channel-filters-label-s"> Sort: </label>
        <select
          onChange={(e) => {
            setFilters({ ...filters, sort: e.target.value });
          }}
        >
          <option value="channel asc"> A-Z channel </option>
          <option value="channel desc"> Z-A channel </option>
          <option value="owner asc"> A-Z owner </option>
          <option value="owner desc"> Z-A owner </option>
          <option value="users asc"> Active users asc </option>
          <option value="users desc"> Active users desc </option>
        </select>
      </div>
    </div>
  );
}

export default ChannelFilters;
