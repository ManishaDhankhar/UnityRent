import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

function SearchBar({ query, setQuery }) {
  return (
    <div className="search-bar-wrapper">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search rental items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default SearchBar;