import React from "react";

import "./style.css";

const ProductRow = ({displayName}) => {
	const logoName = displayName.length > 2 && `${displayName[0]}${displayName[1]}`.toUpperCase();
	return (
		<tr className="product-row">
			<td className="product-row__logo">{logoName}</td>
			<td className="product-row__text">{displayName}</td>
		</tr>
	);
};

export default ProductRow;
