import React, {useState, useEffect} from "react";

import SearchBar from "./components/atoms/SearchBar/index.js";
import ProductRow from "./components/molecules/ProductRow/index.js";

import {normalizeWord, splitRegexChars} from "./utils.js";
import data from "./data/data.json";

import "./SearchApp.css";

const SearchApp = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		if (!allProducts.length) {
			const productsReferences = data.data?.allProductReference || [];

			// Init products array
			const products = productsReferences
				.map(({display_name}) => {
					const arrayWords = [];
					// Normalize and split display_name + set occurence of same word in object
					const normalizedWords = display_name.split(splitRegexChars).reduce((acc, word) => {
						if (word === "") return acc;
						const normalizedWord = normalizeWord(word);
						arrayWords.push(normalizedWord);

						return {...acc, [normalizedWord]: acc[normalizedWord] ? acc[normalizedWord] + 1 : 1};
					}, {});

					return {displayName: display_name, normalizedWords, arrayWords};
				})
				.sort((a, b) => a.displayName.localeCompare(b.displayName));

			setAllProducts(products);
		}
	}, [allProducts, setAllProducts]);

	useEffect(() => {
		if (search === "") {
			setFilteredProducts([]);
		} else {
			const normalizedSearch = [];

			const searchCounter = search.split(splitRegexChars).reduce((acc, word) => {
				if (word === "") return acc;
				const normalizedWord = normalizeWord(word);
				normalizedSearch.push(normalizedWord);

				return {...acc, [normalizedWord]: acc[normalizedWord] ? acc[normalizedWord] + 1 : 1};
			}, {});

			// Filters with all products
			const products = allProducts.filter(({normalizedWords, arrayWords}) =>
				// Get all searched words inside products
				normalizedSearch.every((searchWord) => {
					let keywordToCheck;
					const includesWords = arrayWords.some((word) => {
						// Check if the beginning of product matches with search
						if (word.startsWith(searchWord)) {
							keywordToCheck = word;
							return true;
						}
						return false;
					});

					// Specific check for multiple iteration of same words
					if (keywordToCheck && normalizedWords[keywordToCheck] < searchCounter[searchWord]) {
						return false;
					}

					return includesWords;
				})
			);
			setFilteredProducts(products);
		}
	}, [allProducts, search]);

	return (
		<div className="search-app">
			<SearchBar placeholder="Recherchez un produit" search={search} onSearch={setSearch} />
			<table className="search-app__table">
				<tbody>
					{filteredProducts.map(({displayName}) => (
						<ProductRow key={displayName} displayName={displayName} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SearchApp;
