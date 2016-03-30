/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
//, '#99b4ce', '#d7f0f8'
/**
 * 渲染图表
 */
function renderChart() {
  var show_title = document.getElementById("aqi-chart-title");
  show_title.innerHTML = pageState.nowSelectCity+"市空气质量报告";
  var showDiv = document.getElementById("aqi-chart-wrap");
  showDiv.innerHTML = "";
  var fragment = document.createDocumentFragment();
  var data = chartData[pageState.nowSelectCity][pageState.nowGraTime];
  var divWidth,marWidth;     //柱子的宽度
  switch(pageState.nowGraTime) {
    case "day":
      divWidth = "8px";
      marWidth = "4px";
      break;
    case "week":
      divWidth = "30px";
      marWidth = "20px";
      break;
    case "month":
      divWidth = "80px";
      marWidth = "40px";
      break;
  }
  for(var i=0;i<data.length;i++) {
    var aqiDiv = document.createElement("div");
    aqiDiv.className = "aqi-div";
    aqiDiv.style.width = divWidth;
    aqiDiv.style.marginRight = marWidth;
    aqiDiv.style.height = data[i].aqi+"px";
    var divColor = checkColor(data[i].aqi);
    aqiDiv.style.backgroundColor = divColor;
    aqiDiv.title = data[i].date+"\naqi:"+data[i].aqi;
    fragment.appendChild(aqiDiv);
  }
  showDiv.appendChild(fragment);
}

function checkColor(data) {
  var colors=['#16324a','#24385e','#393f65','#4e4a67','#5a4563', 
              '#b38e95','#edae9e','#c1b9c2','#bec3cb','#9ea7bb'];
  for(var i=0;i<10;i++) {
    if(data>50*i && data<=50*(i+1)) {
      return colors[i];
    }
  }
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var choForm = document.getElementById("form-gra-time");
  choForm.addEventListener("click",function(ev) {
    var ev = ev || window.ev;
    var target = ev.target || ev.srcElement;
    if(target.id !== "city-select") {
      var nowTime = target.value;     //当前的选择
    }
    
    if(nowTime && nowTime != pageState.nowGraTime) {
      pageState.nowGraTime = nowTime;
      renderChart();
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select = document.getElementById("city-select");
  var fragment = document.createDocumentFragment();
  for(var city in aqiSourceData) {
    var new_option = document.createElement("option");
    new_option.innerHTML = city;
    if(pageState.nowSelectCity === -1) {
      pageState.nowSelectCity = city;
    }
    fragment.appendChild(new_option);
  }
  city_select.appendChild(fragment);
  //change本身就可以确保select的值是改变了的
  city_select.addEventListener("change",function() {
    if(this.value !== pageState.nowSelectCity){
        pageState.nowSelectCity = this.value;
        renderChart();      //调用渲染函数
    }
  });
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var byDay = [],
      byWeek = [],
      byMon = [],
      weekNum = 0,
      dayNum = 0,
      weekData = 0;
  for(var city in aqiSourceData) {
    var dataByCity = aqiSourceData[city];
    for(var date in dataByCity) {
      var dayChart = {
        "date": date,
        "aqi": dataByCity[date]
      };
      byDay.push(dayChart);

      var nowMon = new Date(date);
      if(weekNum === 7 || byDay.length === 91) {
        var res = weekData/weekNum;
        nowMon.setDate(nowMon.getDate() - weekNum);
        var weekChart = {
          "date": getDateStr(nowMon)+"~"+getDateStr(new Date(date)),
          "aqi": res.toFixed(2)
        };
        byWeek.push(weekChart);
        weekNum = 1;
        weekData = 0;
      }else {
        weekNum++;
        weekData += dataByCity[date];
      }
      var nowDate = new Date(date);
      var month;
      if(!month) {      //如果值未定义，说明是第一条记录
        month = nowDate.getMonth()+1;
        var monData = dataByCity[date];
      }else if( month!==(nowDate.getMonth()+1) || byDay.length === 91){ //上一个月统计结束
        var res = monData/dayNum;
        nowDate.setDate(nowDate.getDate()-1);
        var monChart = {
          "date": getDateStr(nowDate).slice(0,-3),
          "aqi": res.toFixed(2)
        }
        byMon.push(monChart);
        monData = 0;
        dayNum = 0;
        month = nowDate.getMonth()+2;
      } else {   //当前月的记录统计
        monData += dataByCity[date];
        dayNum++;
      }
    }
    var byDate = {
      "day": byDay,
      "week": byWeek,
      "month": byMon
    }
    chartData[city] = byDate;
    byDay = [];
    byWeek = [];
    byMon = [];
    month = undefined;
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  
  renderChart();
}
init();