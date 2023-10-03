import React from 'react';
import { svgService } from '../services/svg.service';

function SvgIconInst({ iconName }) {
    //  console.log('iconName:', iconName);
    const svg = svgService.getInstSvg(iconName);

    return (
        <i dangerouslySetInnerHTML={{ __html: svg }} className='svg-icon'></i>
    );
}

export default SvgIconInst;