const obj = {val: -1, metaData: {}};
const emptySpot = {val: -2, metaData: {}};
const parkingSpot = {val: 1, metaData: {}};

export const mockData = [
  [obj, obj, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, parkingSpot, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, obj, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, parkingSpot, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, obj, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, parkingSpot, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, obj, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, parkingSpot, obj, obj, obj, obj, obj, obj, obj, emptySpot, emptySpot],
  [obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj],
  [obj, parkingSpot, obj, obj, obj, obj, obj, obj, obj, obj, obj],
  [obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj],
];

let w = 50;
let h = 50;

let emptySlot = {
  val: 0,
  metaData: {
    x: -1,
    y: -1,
    id: '',
    width: w,
    height: h,
    color: 'yellow',
  },
};

let b1 = {
  val: 1,
  metaData: {
    x: -1,
    y: -1,
    id: '10:97:BD:8E:7F:EE',
    width: w,
    height: h,
    color: '#787276',
  },
};

let b2 = {
  val: 1,
  metaData: {
    x: -1,
    y: -1,
    id: '16:17:CB:E5:B1:82',
    width: w,
    height: h,
    color: '#787276',
    
  },
};

let b3 = {
  val: 1,
  metaData: {
    x: -1,
    y: -1,
    id: '03:D1:5E:01:E2:A7',
    width: w,
    height: h,
    color: '#787276',
  },
};

let obstacle = {
  val: -1,
  metaData: {
    x: -1,
    y: -1,
    id: '',
    width: w,
    height: h,
    color: 'gray',
  },
};

export const beaconCoords = [
  [obstacle, emptySlot, emptySlot, b3, emptySlot, emptySlot],
  [obstacle, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot],
  [obstacle, b1, emptySlot, emptySlot, b2, emptySlot],
  [obstacle, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot],
  [obstacle, emptySlot, emptySlot, emptySlot, emptySlot, emptySlot],
  [obstacle, obstacle, obstacle, obstacle, obstacle, obstacle],
];


export const trilaterate = (beacons) => {
  // console.log("b", beacons)
  // Extract beacon information
  const positions = beacons?.map((beacon) => ({
    x: beacon.x,
    y: beacon.y,
    distance: beacon.distance,
  }));

  // Check if there are at least three beacons
  if (positions.length < 3) {
    // console.error('Trilateration requires at least three beacons.');
    return null;
  }

  // Trilateration algorithm
  const A = 2 * (positions[1].x - positions[0].x);
  const B = 2 * (positions[1].y - positions[0].y);
  const C =
    Math.pow(positions[0].distance, 2) -
    Math.pow(positions[1].distance, 2) -
    Math.pow(positions[0].x, 2) +
    Math.pow(positions[1].x, 2) -
    Math.pow(positions[0].y, 2) +
    Math.pow(positions[1].y, 2);

  const D = 2 * (positions[2].x - positions[1].x);
  const E = 2 * (positions[2].y - positions[1].y);
  const F =
    Math.pow(positions[1].distance, 2) -
    Math.pow(positions[2].distance, 2) -
    Math.pow(positions[1].x, 2) +
    Math.pow(positions[2].x, 2) -
    Math.pow(positions[1].y, 2) +
    Math.pow(positions[2].y, 2);

  // Calculate user position
  const x = (C * E - F * B) / (E * A - B * D);
  const y = (C * D - A * F) / (B * D - A * E);

  return { x, y };
}

// Example usage
// const beacons = [
//   { x: 0, y: 0, dist: 10 },    // Beacon 1
//   { x: 10, y: 0, dist: 7 },    // Beacon 2
//   { x: 0, y: 10, dist: 8 },    // Beacon 3
// ];

// const userPosition = trilaterate(beacons);
// console.log(userPosition);


export const addCoordinatesToGrid = (grid, devices) => {
  let deviceMap = {};

  const updatedGrid = grid?.map((row, rowIndex) => {
    return row?.map((cell, colIndex) => {
      let m = grid?.[rowIndex]?.[colIndex];
      let w = m?.metaData?.width;
      let h = m?.metaData?.height;

      const x = colIndex * w;
      const y = rowIndex * h;

      if (m?.metaData?.id) {
        const device = devices.find(dev => dev.id === m.metaData.id);
        deviceMap[m.metaData.id] = {
          distance: device?.dist ?? -1,
          x,
          y,
        };
      }

      return {
        ...cell,
        metaData: {
          ...cell.metaData,
          x,
          y,
        },
      };
    });
  });

  return { updatedGrid, deviceMap };
};
