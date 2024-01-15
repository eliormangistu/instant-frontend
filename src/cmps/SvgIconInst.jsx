import React from 'react';
import { svgService } from '../services/svg.service';

function SvgIconInst({ iconName }) {
    
    const svg = svgService.getInstSvg(iconName);

    return (
        <span dangerouslySetInnerHTML={{ __html: svg }} className='svg-icon'></span>
    );
}

export default SvgIconInst;