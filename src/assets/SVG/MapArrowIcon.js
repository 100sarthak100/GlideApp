import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MapArrowIcon = props => {
  const {width = 25, height = 25, color = '#1C274C', strokeWidth = 1.5} = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="m7.403 10 3.125-7.007c.59-1.324 2.354-1.324 2.944 0l7.363 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306l2.119-4.752"
      />
    </Svg>
  );
};

export default MapArrowIcon;
