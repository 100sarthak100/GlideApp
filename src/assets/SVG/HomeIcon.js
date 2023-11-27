import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

const HomeIcon = props => {
  const {width = 25, height = 25, color = '#000', strokeWidth = 1.5} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <G clipPath="url(#a)">
        <Path fill="#fff" d="M0 0h24v24H0z" />
        <Path
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          d="M9 21H4a1 1 0 0 1-1-1v-7.586a1 1 0 0 1 .293-.707l8-8a1 1 0 0 1 1.414 0l8 8a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1h-5m-6 0h6m-6 0v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill={'#fff'} d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default HomeIcon;
