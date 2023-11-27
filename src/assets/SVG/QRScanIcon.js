import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const QRScanIcon = props => {
  const {width = 40, height = 40 } = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
      />
      <G
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        opacity={0.4}>
        <Path d="M17 9.5v5c0 2-1 3-3 3h-4c-2 0-3-1-3-3v-5c0-2 1-3 3-3h4c2 0 3 1 3 3ZM19 12H5" />
      </G>
    </Svg>
  );
};

export default QRScanIcon;
