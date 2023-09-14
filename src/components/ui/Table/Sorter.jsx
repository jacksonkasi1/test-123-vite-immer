import React from 'react'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Sorter = ({sort}) => {
	const themeConfig = useSelector((state) => state.themeConfigs);

	const color = `text-${themeConfig.themeColor}-${themeConfig.colorLevel}`

	const renderSort = () => {
		if ( typeof sort !== 'boolean') {
			return <FaSort />
		}
		return sort ? <FaSortDown className={color} /> : <FaSortUp className={color} />
	}

	return (
		<div className="inline-flex">
			{renderSort()}
		</div>
	)
}

export default Sorter
