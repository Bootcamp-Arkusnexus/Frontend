import '../styles/Filters.css';


export const Filters = ({ users, filterRole, setFilterRole, filterLevel, setFilterLevel, filterResidence, setFilterResidence }) => (
  <div className="filters-container">
    <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
      <option value="">All Roles</option>
      {[...new Set(users.map((user) => user.role))].map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
    <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
      <option value="">All Levels</option>
      {[...new Set(users.map((user) => user.level))].map((level) => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
    <select value={filterResidence} onChange={(e) => setFilterResidence(e.target.value)}>
      <option value="">All residences</option>
      {[...new Set(users.map((user) => user.city_of_residence))].map((city_of_residence) => (
        <option key={city_of_residence} value={city_of_residence}>
          {city_of_residence}
        </option>
      ))}
    </select>
  </div>
);
