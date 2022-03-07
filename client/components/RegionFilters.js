import React from 'react';
import { useSelector } from 'react-redux';

function RegionMap(props) {
  return props.regions.map((region) => {
    return (
      <label
        key={region.id}
        className={props.regionFilter == region.id ? 'selected-filter' : ''}
      >
        <input
          type="radio"
          name="region-filter"
          value={region.id}
          onChange={(evt) => {
            if (evt.target.checked) {
              props.setRegionFilter(Number(evt.target.value));
            }
          }}
        />
        {region.name}
      </label>
    );
  });
}

export default RegionMap;
