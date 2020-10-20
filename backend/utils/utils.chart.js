const filterByCommonArtists = (data) => {
  let commonArrays = [];
  let flatData = data.flat();

  // compares each users songs to every other user and collects the songs by the artists they have in common
  do {
    let compare = data.shift();
    for (let user of data) {
      let compareArtists = compare.map((song) => song.artist);
      let userArtists = user.map((song) => song.artist);
      let common = compareArtists.filter((item) => userArtists.includes(item));
      commonArrays.push(common);
    }
  } while (data.length > 1);

  // filters duplicate artist names for filtration
  let commonArtists = Array.from(new Set(commonArrays.flat()));

  // filters the raw data set down to only the songs that are shared
  let filteredData = flatData.filter((song) =>
    commonArtists.includes(song.artist)
  );

  // sorts the output playlist by artist alphabetically
  let sortedData = filteredData.sort(function (a, b) {
    let artistA = a.artist.toUpperCase();
    let artistB = b.artist.toUpperCase();
    if (artistA < artistB) return -1;
    if (artistA > artistB) return 1;
    return 0;
  });

  // this bit filters the dupes that are caused by two people having the same song in their playlist
  // and also the duplicates that arise from on person having the same song twice in their playlist
  sortedData.forEach((song, i, data) => {
    for (let s of data) {
      if (data.indexOf(s) !== i && Object.values(s).indexOf(song.name) > -1) {
        data.splice(data.indexOf(s), 1);
      }
    }
  });

  console.log(sortedData);
  return sortedData;
};

// this was an idea i had to have like one monolith function the returns an object with all the datasets for all charts
const processData = async (apiCall) => {
  let data = await apiCall;
  // dataProcessingFunctions(data) go here
  // another one,
};

const getAvgPopularity = (data) => {
  // data = data.flat();
  let sumPopular = data
    .map((el) => el.popularity)
    .reduce((acc, val) => acc + val, 0);
  return sumPopular / data.length;
};

const getAvgPopularityByUser = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  // data = filterByCommonArtists(data);
  let dataSet = [];
  // let userNames = Array.from(new Set(data.flat().map((el) => el.username)));
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let usersSongs = data.filter((song) => song.username === user);
    let usersPopularity = usersSongs
      .map((el) => el.popularity)
      .reduce((acc, val) => acc + val, 0);
    let truncate =
      Math.floor((usersPopularity / usersSongs.length) * 100) / 100;
    dataSet.push(truncate);
  }
  return [userNames, dataSet];
};

const getNumTracksByUser = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  let dataSet = [];
  // let userNames = Array.from(new Set(data.flat().map((el) => el.username)));
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let contributed = data.flat().filter((song) => song.username === user);
    dataSet.push(contributed.length);
  }
  return [userNames, dataSet];
};

const getDecadesByUser = (data) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  // find ratios for weighted average
  const contributedData = getNumTracksByUser(data);
  let totalTracks = contributedData[1].reduce((acc, val) => acc + val);
  let weights = [];
  for (let amount of contributedData[1]) {
    weights.push(totalTracks / amount);
  }

  let dataSet = [];
  let userNames = Array.from(new Set(data.map((el) => el.username)));
  for (let user of userNames) {
    let usersSongs = data.filter((song) => song.username === user);
    let dates = {
      "50s": 0,
      "60s": 0,
      "70s": 0,
      "80s": 0,
      "90s": 0,
      "00s": 0,
      "10s": 0,
      "20s": 0,
    };
    for (let song of usersSongs) {
      switch (true) {
        case /\d{2}2\d-\d{2}-\d{2}/.test(song.release_date):
          dates["20s"]++;
          break;
        case /\d{2}1\d-\d{2}-\d{2}/.test(song.release_date):
          dates["10s"]++;
          break;
        case /\d{2}0\d-\d{2}-\d{2}/.test(song.release_date):
          dates["00s"]++;
          break;
        case /\d{2}9\d-\d{2}-\d{2}/.test(song.release_date):
          dates["90s"]++;
          break;
        case /\d{2}8\d-\d{2}-\d{2}/.test(song.release_date):
          dates["80s"]++;
          break;
        case /\d{2}7\d-\d{2}-\d{2}/.test(song.release_date):
          dates["70s"]++;
          break;
        case /\d{2}6\d-\d{2}-\d{2}/.test(song.release_date):
          dates["60s"]++;
          break;
        case /\d{2}5\d-\d{2}-\d{2}/.test(song.release_date):
          dates["50s"]++;
          break;
        // skip songs with missing date data
        default:
          break;
      }
    }
    let userWeight = weights[userNames.indexOf(user)];
    console.log({ userWeight });
    dataSet.push(Object.values(dates).map((el) => Math.round(el * userWeight)));
  }
  return [userNames, dataSet];
};

const getNumTracksByArtist = (data, amount = 6) => {
  //TODO: filterByCommonArtists doesn't account for if both userA and userB add the same song to their lists
  let dataSet = [];
  let artists = Array.from(new Set(data.map((el) => el.artist)));
  for (let artist of artists) {
    dataSet.push(data.filter((el) => el.artist === artist).length);
  }
  let artistObject = {};
  artists.forEach((artist, index) => (artistObject[artist] = dataSet[index]));

  let sortable = [];
  for (let a in artistObject) {
    sortable.push([a, artistObject[a]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  let filteredArtists = [];
  let filteredDataSet = [];
  for (let pair of sortable) {
    filteredArtists.push(pair[0]);
    filteredDataSet.push(pair[1]);
  }
  return [filteredArtists.slice(0, amount), filteredDataSet.slice(0, amount)];
};

var globalColorStrings = {
  blue: "rgba(0, 0, 255, 1)",
  blueviolet: "rgba(138, 43, 226, 1)",
  brown: "rgba(165, 42, 42, 1)",
  cadetblue: "rgba(95, 158, 160, 1)",
  coral: "rgba(255, 127, 80, 1)",
  cornflowerblue: "rgba(100, 149, 237, 1)",
  crimson: "rgba(220, 20, 60, 1)",
  darkblue: "rgba(0, 0, 139, 1)",
  darkcyan: "rgba(0, 139, 139, 1)",
  darkgoldenrod: "rgba(184, 134, 11, 1)",
  darkgreen: "rgba(0, 100, 0, 1)",
  darkmagenta: "rgba(139, 0, 139, 1)",
  darkorange: "rgba(255, 140, 0, 1)",
  darkorchid: "rgba(153, 50, 204, 1)",
  darkred: "rgba(139, 0, 0, 1)",
  darkslateblue: "rgba(72, 61, 139, 1)",
  darkviolet: "rgba(148, 0, 211, 1)",
  deeppink: "rgba(255, 20, 147, 1)",
  dodgerblue: "rgba(30, 144, 255, 1)",
  firebrick: "rgba(178, 34, 34, 1)",
  forestgreen: "rgba(34, 139, 34, 1)",
  fuchsia: "rgba(255, 0, 255, 1)",
  goldenrod: "rgba(218, 165, 32, 1)",
  green: "rgba(0, 128, 0, 1)",
  hotpink: "rgba(255, 105, 180, 1)",
  indianred: "rgba(205, 92, 92, 1)",
  indigo: "rgba(75, 0, 130, 1)",
  lightcoral: "rgba(240, 128, 128, 1)",
  magenta: "rgba(255, 0, 255, 1)",
  maroon: "rgba(128, 0, 0, 1)",
  mediumblue: "rgba(0, 0, 205, 1)",
  mediumpurple: "rgba(147, 112, 219, 1)",
  mediumslateblue: "rgba(123, 104, 238, 1)",
  mediumvioletred: "rgba(199, 21, 133, 1)",
  midnightblue: "rgba(25, 25, 112, 1)",
  navy: "rgba(0, 0, 128, 1)",
  olive: "rgba(128, 128, 0, 1)",
  orange: "rgba(255, 165, 0, 1)",
  orangered: "rgba(255, 69, 0, 1)",
  orchid: "rgba(218, 112, 214, 1)",
  purple: "rgba(128, 0, 128, 1)",
  rebeccapurple: "rgba(102, 51, 153, 1)",
  red: "rgba(255, 0, 0, 1)",
  royalblue: "rgba(65, 105, 225, 1)",
  saddlebrown: "rgba(139, 69, 19, 1)",
  salmon: "rgba(250, 128, 114, 1)",
  seagreen: "rgba(46, 139, 87, 1)",
  sienna: "rgba(160, 82, 45, 1)",
  slateblue: "rgba(106, 90, 205, 1)",
  slategrey: "rgba(112, 128, 144, 1)",
  steelblue: "rgba(70, 130, 180, 1)",
  teal: "rgba(0, 128, 128, 1)",
  tomato: "rgba(255, 99, 71, 1)",
  violet: "rgba(238, 130, 238, 1)",
  yellow: "rgba(255, 255, 0, 1)",
};

function getPieChartOptions() {
  return {
    responsive: true,
    title: {
      display: false,
      text: "Pie Chart",
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: null,
    },
  };
}

function getBarChartOptions() {
  return {
    hover: { mode: null },
    responsive: true,
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
}

function getLineChartOptions() {
  return {
    responsive: true,
    title: {
      display: false,
      text: "Line Chart",
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Decade",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Preferences",
          },
        },
      ],
    },
  };
}

function getRadarChartOptions() {
  return {
    plugins: {
      filler: {
        propagate: true,
      },
    },
    scale: {
      ticks: {
        beginAtZero: true,
      },
    },
  };
}

function getChartColor(num) {
  let opacity = 0.4;
  let colorStrings = globalColorStrings;
  let count = 0;
  let backgroundColors = [];
  let borderColors = [];
  let borderWidth = 1;

  while (count < num) {
    let keys = Object.keys(colorStrings);
    let border = colorStrings[keys[(keys.length * Math.random()) << 0]];

    if (!borderColors.includes(border)) {
      borderColors.push(border);
      const regex = /, 1\)/g;
      let background = border.replace(regex, `, ${opacity}`);
      backgroundColors.push(background);
    }

    count++;
  }

  return { backgroundColors, borderColors, borderWidth };
}

function getPieChartData(data) {
  let pieData = getNumTracksByUser(data);
  console.log({ pieData });

  let amountOfColors = pieData[0].length > 10 ? pieData[0].length : 10;
  let colors = getChartColor(amountOfColors);
  let dataLabel = pieData[0];
  let dataSet = pieData[1];

  let pieChartData = {
    datasets: [
      {
        label: "Pie Chart",
        data: dataSet,
        highlight: colors.backgroundColors,
        backgroundColor: colors.backgroundColors,
        borderWidth: colors.borderWidth,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: dataLabel,
  };
  return pieChartData;
}

function getLineChartData(data) {
  let lineData = getDecadesByUser(data);
  let amountOfColors = lineData[0].length > 10 ? lineData[0].length : 10;
  let colors = getChartColor(amountOfColors);
  let dataLabels = lineData[0];
  let dataSets = lineData[1];

  let dataSetArray = [];

  for (let i = 0; i < dataLabels.length; i++) {
    const label = dataLabels[i];
    const set = dataSets[i];
    const border = colors.borderColors[i];
    const width = colors.borderWidth[i];

    let obj = {
      label: label,
      data: set,
      borderColor: border,
      borderWidth: width,
      fill: false,
      lineTension: 0.4,
    };
    dataSetArray.push(obj);
  }

  let lineChartData = {
    datasets: dataSetArray,
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["50s", "60s", "70s", "80s", "90s", "00s", "10s", "20s"],
  };

  return lineChartData;
}

function getBarChartData(data) {
  let barData = getNumTracksByArtist(data);
  let amountOfColors = barData[0].length > 10 ? barData[0].length : 10;
  let colors = getChartColor(amountOfColors);
  let dataLabel = barData[0];
  let dataSet = barData[1];

  let barChartData = {
    datasets: [
      {
        label: "Banger Playlist",
        data: dataSet,
        backgroundColor: colors.backgroundColors,
        borderColor: colors.borderColors,
        borderWidth: colors.borderWidth,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: dataLabel,
  };
  return barChartData;
}

function getRadarChartData(data) {
  let radarData = getAvgPopularityByUser(data);
  let amountOfColors = radarData[0].length > 10 ? radarData[0].length : 10;
  let colors = getChartColor(amountOfColors);
  let dataLabel = radarData[0];
  let dataSet = radarData[1];
  let radarChartData = {
    datasets: [
      {
        label: "Your Banger Playlist",
        data: dataSet,
        backgroundColor: colors.backgroundColors[0],
        borderColor: colors.borderColors[0],
        borderWidth: colors.borderWidth,
        fill: true,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: dataLabel,
  };
  return radarChartData;
}

module.exports = {
  filterByCommonArtists,
  getPieChartOptions,
  getBarChartOptions,
  getLineChartOptions,
  getRadarChartOptions,
  getChartColor,
  getPieChartData,
  getBarChartData,
  getLineChartData,
  getRadarChartData,
};
