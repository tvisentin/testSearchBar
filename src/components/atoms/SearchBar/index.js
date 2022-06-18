import React, {useState} from "react";

import {ReactComponent as Search} from "../../../assets/search.svg";
import {ReactComponent as Cross} from "../../../assets/cross.svg";

import "./style.css";

const SearchBar = ({placeholder, search, onSearch}) => {
	const [value, setValue] = useState(search);

	const onClear = () => {
		onSearch("");
		setValue("");
	};

	// We could use a debounce here to prevent re-rendering when user typing
	const onChange = (e) => {
		setValue(e.target.value);
		onSearch(e.target.value);
	};

	return (
		<div className="search-bar">
			<input className="search-bar__input" type="text" placeholder={placeholder} value={value} onChange={onChange} />
			{search === "" ? (
				<Search className="search-bar__logo" />
			) : (
				<Cross className="search-bar__logo" onClick={onClear} />
			)}
		</div>
	);
};

export default SearchBar;
