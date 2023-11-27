import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const UserArrowIcon = props => {
  const {width = 20, height = 20} = props;

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        stroke="#1C274C"
        strokeLinecap="round"
        strokeWidth={2}
        d="M12 18.473c-.25 0-.5.061-.73.184l-5.903 3.152c-1.388.74-2.87-.81-2.202-2.306l7.362-16.51C10.823 2.33 11.412 2 12 2"
      />
      <Path
        stroke="#1C274C"
        strokeWidth={2}
        d="M12 18.473c.25 0 .5.061.73.184l5.903 3.152c1.388.74 2.87-.81 2.202-2.306l-7.363-16.51C13.178 2.33 12.59 2 12 2"
        opacity={0.5}
      />
    </Svg>
  );
};

export default UserArrowIcon;
