import '../styles/App.css';


export const Header = ({ search, setSearch }) => (
  <header className="header">
    <h1>MindTeams</h1>
    <div className="filters-actions-container">
      <input
        type="text"
        placeholder="Search..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
    </div>
  </header>
);